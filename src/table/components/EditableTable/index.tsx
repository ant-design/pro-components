import { PlusOutlined } from '@ant-design/icons';
import { get, set, useMergedState } from '@rc-component/util';
import type { ButtonProps, FormItemProps, TablePaginationConfig } from 'antd';
import { Button, Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { GetRowKey } from 'antd/lib/table/interface';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import ProForm, { ProFormDependency, ProFormInstance } from '../../../form';
import type { ParamsType } from '../../../provider';
import { useIntl } from '../../../provider';
import {
  isDeepEqualReact,
  runFunction,
  useDeepCompareEffect,
  useRefFunction,
} from '../../../utils';
import {
  editableRowByKey,
  recordKeyToString,
} from '../../../utils/useEditableArray';
import ProTable from '../../Table';
import type { ActionType, ProTableProps } from '../../typing';

export type EditableFormInstance<T = any> = ProFormInstance<T> & {
  /**
   * 获取一行数据的
   * @param rowIndex
   * @returns T | undefined
   *
   * @example getRowData(1)  可以传入第几行的数据
   * @example getRowData("id")  也可以传入 rowKey，根据你列的唯一key 来获得。
   */
  getRowData?: (rowIndex: string | number) => T | undefined;
  /**
   * 获取整个 table 的数据
   * @returns T[] | undefined
   */
  getRowsData?: () => T[] | undefined;
  /**
   * 设置一行的数据，会将数据进行简单的 merge
   *
   * {title:"old", decs:"old",id:"old"} -> set {title:"new"} -> {title:"new", decs:"old",id:"old"}
   *
   * @description 只会做最第一层对象的 merge 哦。
   * {title:"old", decs:{name:"old",key:"old"},id:"old"} -> set {decs:{name:"new"}} -> {title:"old", decs:{name:"new"},id:"old"} -> set {decs:{name:"old"}}
   *
   * @param rowIndex
   * @param data
   * @returns void
   *
   * 根据行号设置
   * @example setRowData(1, { title:"new" })  可以传入修改第几行
   *
   * 根据行 id 设置
   * @example setRowData("id", { title:"new" })  也可以传入 rowKey，根据你列的唯一 key 来设置。
   *
   * 清空原有数据
   * @example setRowData(1, { title:undefined })
   *
   */
  setRowData?: (rowIndex: string | number, data: Partial<T>) => void;
};

type CreatorButtonResult = {
  creatorButtonDom: React.ReactNode | false;
  buttonRenderProps: Record<string, any>;
};

export type RecordCreatorProps<DataSourceType> = {
  record:
    | DataSourceType
    | ((index: number, dataSource: DataSourceType[]) => DataSourceType);
  position?: 'top' | 'bottom';
  /**
   * 新增一行的类型
   *
   * @augments dataSource 将会新增一行数据到 dataSource 中，不支持取消，只能删除
   * @augments cache 将会把数据放到缓存中，取消后消失
   */
  newRecordType?: 'dataSource' | 'cache';
  /** 要增加到哪个节点下，一般用于多重嵌套表格 */
  parentKey?:
    | React.Key
    | ((index: number, dataSource: DataSourceType[]) => React.Key);
};

export type EditableProTableProps<
  T,
  U extends ParamsType,
  ValueType = 'text',
> = Omit<ProTableProps<T, U, ValueType>, 'onChange'> & {
  defaultValue?: readonly T[];
  value?: readonly T[];
  onChange?: (value: readonly T[]) => void;
  /** @name 原先的 table OnChange */
  onTableChange?: ProTableProps<T, U>['onChange'];

  /**
   *@name 可编辑表格，列配置的form，可以操作表格里面的数据
   */
  editableFormRef?: React.Ref<EditableFormInstance<T> | undefined>;

  /** @name 新建按钮的设置 */
  recordCreatorProps?:
    | (RecordCreatorProps<T> &
        ButtonProps & {
          creatorButtonText?: React.ReactNode;
        })
    | false;
  /** 最大行数 */
  maxLength?: number;
  /** Table 的值发生改变，为了适应 Form 调整了顺序 */
  onValuesChange?: (values: T[], record: T) => void;
  /** 是否受控，如果为 true，每次 value 更新都会重置表单 */
  controlled?: boolean;
  /** FormItem 的设置 */
  formItemProps?: Omit<FormItemProps, 'children' | 'name'>;
};

const EditableTableActionContext = React.createContext<
  React.MutableRefObject<ActionType | undefined> | undefined
>(undefined);

/** 可编辑表格的按钮 */
function RecordCreator<T = Record<string, any>>(
  props: RecordCreatorProps<T> & { children: JSX.Element },
) {
  const { children, record, position, newRecordType, parentKey } = props;
  const actionRef = useContext(EditableTableActionContext);

  return React.cloneElement(children, {
    ...children.props,
    onClick: async (e: any) => {
      // 如果返回了false，接触掉默认行为
      const isOk = await children.props.onClick?.(e);
      if (isOk === false) return;

      if (actionRef?.current) {
        actionRef.current.addEditRecord(record as any, {
          position,
          newRecordType,
          parentKey: parentKey as React.Key,
        });
      }
    },
  });
}

/**
 * 处理嵌套行的新增
 */
function handleNestedRowInsert<DataType>(
  baseData: DataType[],
  defaultValue: DataType,
  newLineOptions: {
    parentKey?: React.Key;
    recordKey?: React.Key;
    position?: 'top' | 'bottom' | string;
  },
  getRowKey: GetRowKey<any>,
  childrenColumnName: string,
): DataType[] {
  if (!newLineOptions.recordKey) {
    return baseData;
  }

  const actionProps = {
    data: baseData,
    getRowKey,
    row: {
      ...defaultValue,
      map_row_parentKey: recordKeyToString(
        newLineOptions.parentKey!,
      )?.toString(),
    },
    key: newLineOptions.recordKey,
    childrenColumnName,
  };

  return editableRowByKey(
    actionProps,
    newLineOptions.position === 'top' ? 'top' : 'update',
  );
}

/**
 * 处理分页场景下的新增
 */
function handlePaginationInsert<DataType>(
  baseData: DataType[],
  defaultValue: DataType,
  pageConfig: TablePaginationConfig,
): DataType[] {
  if (pageConfig.pageSize! > baseData.length) {
    return [...baseData, defaultValue];
  }
  const insertIndex = pageConfig.current! * pageConfig.pageSize! - 1;
  const result = [...baseData];
  result.splice(insertIndex, 0, defaultValue);
  return result;
}

function useEditableDataSource<DataType>({
  actionDataSource,
  editableUtils,
  pagination,
  getRowKey,
  childrenColumnName,
}: {
  actionDataSource: readonly DataType[] | undefined;
  editableUtils: {
    newLineRecord?: {
      options?: {
        position?: 'top' | 'bottom' | string;
        parentKey?: React.Key;
        recordKey?: React.Key;
      };
      defaultValue?: DataType;
    };
  };
  pagination: false | TablePaginationConfig | undefined;
  getRowKey: GetRowKey<any>;
  childrenColumnName?: string;
}): DataType[] {
  return useMemo(() => {
    const newLineConfig = editableUtils?.newLineRecord;
    const baseData = Array.isArray(actionDataSource)
      ? [...actionDataSource]
      : [];

    if (!newLineConfig?.defaultValue) {
      return baseData;
    }

    const { options: newLineOptions, defaultValue } = newLineConfig;

    if (newLineOptions?.parentKey) {
      return handleNestedRowInsert(
        baseData,
        defaultValue,
        newLineOptions,
        getRowKey,
        childrenColumnName || 'children',
      );
    }

    if (newLineOptions?.position === 'top') {
      return [defaultValue, ...baseData];
    }

    const pageConfig =
      pagination && typeof pagination === 'object' ? pagination : undefined;

    if (pageConfig?.current && pageConfig?.pageSize) {
      return handlePaginationInsert(baseData, defaultValue, pageConfig);
    }

    return [...baseData, defaultValue];
  }, [
    actionDataSource,
    childrenColumnName,
    editableUtils?.newLineRecord,
    getRowKey,
    pagination,
  ]);
}

/**
 * 检查是否应该显示创建按钮
 */
function shouldShowCreatorButton(
  maxLength: number | undefined,
  valueLength: number,
  recordCreatorProps: EditableProTableProps<any, any>['recordCreatorProps'],
): boolean {
  if (typeof maxLength === 'number' && maxLength <= valueLength) {
    return false;
  }
  return recordCreatorProps !== false;
}

/**
 * 创建按钮 DOM
 */
function createButtonDom<DataType>(
  recordCreatorProps: Exclude<
    EditableProTableProps<DataType, any>['recordCreatorProps'],
    false | undefined
  >,
  value: readonly DataType[] | undefined,
  intl: ReturnType<typeof useIntl>,
): React.ReactNode {
  const {
    record,
    position,
    creatorButtonText,
    newRecordType,
    parentKey,
    style,
    ...restButtonProps
  } = recordCreatorProps;

  return (
    <RecordCreator
      record={runFunction(record, value?.length, value) || {}}
      position={position}
      parentKey={runFunction(parentKey, value?.length, value)}
      newRecordType={newRecordType}
    >
      <Button
        type="dashed"
        style={{
          display: 'block',
          margin: '10px 0',
          width: '100%',
          ...style,
        }}
        icon={<PlusOutlined />}
        {...restButtonProps}
      >
        {creatorButtonText ||
          intl.getMessage('editableTable.action.add', '添加一行数据')}
      </Button>
    </RecordCreator>
  );
}

/**
 * 创建顶部按钮的渲染属性
 */
function createTopButtonProps(
  creatorButtonDom: React.ReactNode,
  columnsLength: number | undefined,
) {
  return {
    components: {
      header: {
        wrapper: ({
          className,
          children,
        }: {
          className: string;
          children: React.ReactNode;
        }) => (
          <thead className={className}>
            {children}
            <tr style={{ position: 'relative' }}>
              <td colSpan={0} style={{ visibility: 'hidden' }}>
                {creatorButtonDom}
              </td>
              <td
                style={{ position: 'absolute', left: 0, width: '100%' }}
                colSpan={columnsLength}
              >
                {creatorButtonDom}
              </td>
            </tr>
          </thead>
        ),
      },
    },
  };
}

/**
 * 创建底部按钮的渲染属性
 */
function createBottomButtonProps(
  creatorButtonDom: React.ReactNode,
  tableViewRender: ProTableProps<any, any>['tableViewRender'],
) {
  return {
    tableViewRender: (_: any, dom: any) => (
      <>
        {tableViewRender?.(_, dom) ?? dom}
        {creatorButtonDom}
      </>
    ),
  };
}

function useCreatorButton<DataType>({
  recordCreatorProps,
  maxLength,
  value,
  intl,
  isTop,
  columnsLength,
  tableViewRender,
}: {
  recordCreatorProps: EditableProTableProps<
    DataType,
    any
  >['recordCreatorProps'];
  maxLength: EditableProTableProps<DataType, any>['maxLength'];
  value: readonly DataType[] | undefined;
  intl: ReturnType<typeof useIntl>;
  isTop: boolean;
  columnsLength: number | undefined;
  tableViewRender: ProTableProps<DataType, any>['tableViewRender'];
}): CreatorButtonResult {
  const creatorButtonDom = useMemo(() => {
    if (
      !shouldShowCreatorButton(
        maxLength,
        value?.length || 0,
        recordCreatorProps,
      )
    ) {
      return false;
    }

    if (!recordCreatorProps) {
      return false;
    }

    return createButtonDom(recordCreatorProps, value, intl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLength, recordCreatorProps, value?.length, intl]);

  const buttonRenderProps = useMemo(() => {
    if (!creatorButtonDom) {
      return {};
    }

    return isTop
      ? createTopButtonProps(creatorButtonDom, columnsLength)
      : createBottomButtonProps(creatorButtonDom, tableViewRender);
  }, [columnsLength, creatorButtonDom, isTop, tableViewRender]);

  return { creatorButtonDom, buttonRenderProps };
}

/**
 * 可以直接放到 Form 中的可编辑表格
 * A React component that is used to create a table.
 * @param props
 */
function EditableTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: EditableProTableProps<DataType, Params, ValueType>) {
  const intl = useIntl();
  const {
    onTableChange,
    maxLength,
    formItemProps,
    recordCreatorProps,
    rowKey,
    controlled,
    defaultValue,
    onChange,
    editableFormRef,
    ...rest
  } = props;

  const preData = useRef<readonly DataType[] | undefined>(undefined);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  // 设置 ref
  useImperativeHandle(rest.actionRef, () => actionRef.current, [
    actionRef.current,
  ]);

  const [value, setValue] = useMergedState<readonly DataType[]>(
    () => props.value || defaultValue || [],
    {
      value: props.value,
      onChange: props.onChange,
    },
  );

  const getRowKey = React.useMemo<
    GetRowKey<DataType>
  >((): GetRowKey<DataType> => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: DataType, index?: number) =>
      (record as any)[rowKey as string] || index;
  }, [rowKey]);

  /**
   * 创建编辑 keys 的 Set，用于快速查找
   */
  const createEditingKeysSet = useRefFunction(
    (editingKeys: React.Key[] | undefined): Set<string> => {
      return new Set((editingKeys || []).map((key) => String(key)));
    },
  );

  /**
   * 同步表单值，排除正在编辑的行
   */
  const syncFormValuesExcludingEditing = useRefFunction(
    (
      dataSource: readonly DataType[],
      editingKeysSet: Set<string>,
      namePath?: string[],
    ): void => {
      if (!formRef.current) return;

      try {
        if (namePath && namePath.length > 0) {
          // name 模式：需要保留正在编辑的行
          const currentFormValues = formRef.current.getFieldsValue() || {};
          const currentList = get(currentFormValues, namePath) as
            | DataType[]
            | undefined;

          if (currentList && Array.isArray(currentList)) {
            // 构建新的表单值，保留正在编辑的行
            // 使用 Map 优化查找性能，将 O(n²) 降低到 O(n)
            const currentListMap = new Map<string, DataType>();
            currentList.forEach((item, idx) => {
              const key = getRowKey(item, idx);
              currentListMap.set(String(key), item);
            });

            const newList = dataSource.map((item, index) => {
              const key = getRowKey(item, index);
              const keyStr = String(key);

              // 如果该行正在编辑，保留表单中的值
              if (editingKeysSet.has(keyStr)) {
                return currentListMap.get(keyStr) || item;
              }

              return item;
            });

            const newValue = set({}, namePath, newList);
            formRef.current.setFieldsValue(newValue);
          } else {
            const newValue = set({}, namePath, dataSource);
            formRef.current.setFieldsValue(newValue);
          }
        } else {
          // 非 name 模式：直接设置值
          const formValues: Record<string, DataType> = {};
          dataSource.forEach((current, index) => {
            const key = getRowKey(current, index);
            const keyStr = String(key);

            if (!editingKeysSet.has(keyStr)) {
              formValues[keyStr] = current;
            }
          });

          if (Object.keys(formValues).length > 0) {
            formRef.current.setFieldsValue(formValues);
          }
        }
      } catch (error) {
        console.warn('Failed to sync form values:', error);
      }
    },
  );

  /**
   * 将数字索引转换为实际的 rowKey（非 name 模式）
   */
  const convertIndexToRowKey = useRefFunction(
    (index: number): string | number => {
      const dataLength = value?.length ?? 0;
      if (index >= dataLength) return index;
      const rowData = value?.[index];
      return getRowKey?.(rowData!, index) as string | number;
    },
  );

  /**
   * 将 rowKey 转换为数字索引（name 模式）
   */
  const convertRowKeyToIndex = useRefFunction(
    (rowKey: string | number): number | string | number => {
      const dataLength = value?.length ?? 0;
      if (typeof rowKey === 'string' || rowKey >= dataLength) {
        const rowIndex = value.findIndex((item, index) => {
          return getRowKey?.(item, index)?.toString() === rowKey?.toString();
        });
        if (rowIndex !== -1) return rowIndex;
      }
      return rowKey;
    },
  );

  /**
   * 根据不同的情况返回不同的 rowKey
   */
  const coverRowKey = useRefFunction(
    (finlayRowKey: number | string): string | number => {
      if (typeof finlayRowKey === 'number' && !props.name) {
        return convertIndexToRowKey(finlayRowKey);
      }

      if (props.name) {
        return convertRowKeyToIndex(finlayRowKey);
      }

      return finlayRowKey;
    },
  );

  /**
   * 构建表单字段路径
   */
  const buildFormFieldPath = useRefFunction(
    (rowKey: string | number): NamePath => {
      return [props.name, rowKey?.toString() ?? '']
        .flat(1)
        .filter(Boolean) as NamePath;
    },
  );

  /**
   * 获取一行数据
   */
  const getRowData = useRefFunction(
    (rowIndex: string | number): DataType | undefined => {
      if (rowIndex == null) {
        throw new Error('rowIndex is required');
      }

      const finlayRowKey = coverRowKey(rowIndex);
      const rowKeyName = buildFormFieldPath(finlayRowKey);
      return formRef.current?.getFieldValue(rowKeyName) as DataType;
    },
  );

  /**
   * 获取整个表格的数据
   */
  const getRowsData = useRefFunction((): DataType[] | undefined => {
    const rowKeyName = [props.name].flat(1).filter(Boolean) as NamePath;
    if (Array.isArray(rowKeyName) && rowKeyName.length === 0) {
      const rowData = formRef.current?.getFieldsValue();
      if (Array.isArray(rowData)) return rowData;
      return Object.keys(rowData).map((key) => rowData[key]);
    }
    return formRef.current?.getFieldValue(rowKeyName) as DataType[];
  });

  /**
   * 设置一行数据
   */
  const setRowData = useRefFunction(
    (rowIndex: string | number, data: Partial<DataType>): boolean => {
      if (rowIndex == null) {
        throw new Error('rowIndex is required');
      }

      const finlayRowKey = coverRowKey(rowIndex);
      const rowKeyName = buildFormFieldPath(finlayRowKey) as string[];

      const currentRowData = getRowData(rowIndex);
      const newRowData = {
        ...currentRowData,
        ...(data || {}),
      };

      const updateValues = set({}, rowKeyName, newRowData);
      formRef.current?.setFieldsValue(updateValues);
      return true;
    },
  );

  // 设置 editableFormRef
  useImperativeHandle(editableFormRef, () => {
    return {
      ...formRef.current,
      getRowData,
      getRowsData,
      setRowData,
    } as EditableFormInstance<DataType>;
  }, [coverRowKey, props.name, getRowData, getRowsData, setRowData]);

  /**
   * 受控模式下同步表单值
   * 注意：不会覆盖正在编辑的行，避免用户编辑内容丢失
   * 使用深度比较优化性能，避免频繁的序列化操作
   */
  useDeepCompareEffect(() => {
    if (!props.controlled || !formRef.current) return;

    const editingKeys = props.editable?.editableKeys;
    const editingKeysSet = createEditingKeysSet(editingKeys);

    syncFormValuesExcludingEditing(value || [], editingKeysSet);
  }, [value, props.controlled, props.editable?.editableKeys, getRowKey]);

  /**
   * 同步表单实例引用
   * 只在 name 模式下且 form 存在时更新
   */
  useEffect(() => {
    if (props.name && props?.editable?.form) {
      formRef.current = props.editable.form;
    }
  }, [props.editable?.form, props.name]);

  const { position } = recordCreatorProps || {};
  const isTop = position === 'top';

  const { creatorButtonDom, buttonRenderProps } = useCreatorButton<DataType>({
    recordCreatorProps,
    maxLength,
    value,
    intl,
    isTop,
    columnsLength: rest.columns?.length,
    tableViewRender: props.tableViewRender,
  });

  /**
   * 处理值变化回调
   * 注意：受控模式下不调用 onChange，避免循环更新
   * onChange 应该由外部控制，而不是在内部触发
   */
  const handleValuesChange = useRefFunction(
    (r: DataType, dataSource: DataType[]) => {
      props.editable?.onValuesChange?.(r, dataSource);
      props.onValuesChange?.(dataSource, r);

      // 只有在非受控模式下才调用 onChange
      // 受控模式下，onChange 应该由外部控制，避免循环更新
      if (!props.controlled) {
        props?.onChange?.(dataSource);
      }
    },
  );

  /**
   * 构建可编辑属性
   * 使用 useMemo 优化性能，避免不必要的重新创建
   */
  const editableProps = useMemo(() => {
    const baseProps = { ...props.editable };
    const hasOnValuesChange =
      Boolean(props?.onValuesChange) ||
      Boolean(props.editable?.onValuesChange) ||
      Boolean(props.controlled && props?.onChange);

    if (hasOnValuesChange) {
      baseProps.onValuesChange = handleValuesChange;
    }

    return baseProps;
  }, [
    props.editable,
    props.onValuesChange,
    props.controlled,
    props.onChange,
    handleValuesChange,
  ]);

  return (
    <>
      <EditableTableActionContext.Provider value={actionRef}>
        <ProTable<DataType, Params, ValueType>
          search={false}
          options={false}
          pagination={false}
          rowKey={rowKey}
          revalidateOnFocus={false}
          {...rest}
          {...buttonRenderProps}
          tableLayout="fixed"
          actionRef={actionRef}
          onChange={onTableChange}
          editable={{
            ...editableProps,
            formProps: {
              formRef,
              ...editableProps.formProps,
            },
          }}
          dataSource={value}
          onDataSourceChange={(dataSource: readonly DataType[]) => {
            setValue(dataSource);

            /**
             * 如果是 name 模式，需要同步表单值
             * 避免表单值和数据源不一致
             * 注意：不会覆盖正在编辑的行
             */
            if (props.name && formRef.current) {
              const editingKeys = props.editable?.editableKeys;
              const editingKeysSet = createEditingKeysSet(editingKeys);
              const namePath = [props.name].flat(1).filter(Boolean);

              syncFormValuesExcludingEditing(
                dataSource,
                editingKeysSet,
                namePath,
              );
            }
          }}
        />
      </EditableTableActionContext.Provider>
      {/* 模拟 onValuesChange - 用于 name 模式下的值变化监听 */}
      {props.name ? (
        <ProFormDependency name={[props.name!]}>
          {(changeValue) => {
            // 初始化 preData
            if (!preData.current) {
              preData.current = value;
              return null;
            }

            const namePath = [props.name].flat(1) as string[];
            const list = get(changeValue, namePath) as DataType[] | undefined;

            // 添加空值检查，避免后续操作出错
            if (!list || !Array.isArray(list)) {
              preData.current = value;
              return null;
            }

            // 在更新 preData 之前找到变化的项
            // 使用 findIndex 可以同时获取变化的项和索引
            const changeIndex = list.findIndex((item, index) => {
              return !isDeepEqualReact(item, preData.current?.[index]);
            });

            // 只有在找到变化项时才触发回调
            if (changeIndex !== -1) {
              const changeItem = list[changeIndex];
              props?.editable?.onValuesChange?.(changeItem, list);
            }

            // 在找到 changeItem 之后再更新 preData，确保后续比较正确
            preData.current = value;

            return null;
          }}
        </ProFormDependency>
      ) : null}
    </>
  );
}

/**
 * 可以直接放到 Form 中的可编辑表格
 * A React component that is used to create a table.
 * @param props
 */
function FieldEditableTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: EditableProTableProps<DataType, Params, ValueType>) {
  const form = ProForm.useFormInstance();

  if (!props.name)
    return (
      <EditableTable<DataType, Params, ValueType>
        tableLayout="fixed"
        scroll={{
          x: 'max-content',
        }}
        {...props}
      />
    );

  return (
    <Form.Item
      style={{
        maxWidth: '100%',
      }}
      shouldUpdate={(prev, next) => {
        const name = [props.name].flat(1) as string[];
        try {
          return (
            JSON.stringify(get(prev, name)) !== JSON.stringify(get(next, name))
          );
        } catch (error) {
          return true;
        }
      }}
      {...props?.formItemProps}
      name={props.name}
    >
      <EditableTable<DataType, Params, ValueType>
        tableLayout="fixed"
        scroll={{
          x: 'max-content',
        }}
        {...props}
        editable={{
          ...props.editable,
          form: form as ProFormInstance,
        }}
      />
    </Form.Item>
  );
}

FieldEditableTable.RecordCreator = RecordCreator;

export default FieldEditableTable;
