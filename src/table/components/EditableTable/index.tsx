import { PlusOutlined } from '@ant-design/icons';
import { get, set, useMergedState } from '@rc-component/util';
import type { ButtonProps, FormItemProps } from 'antd';
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
  stringify,
  useRefFunction,
} from '../../../utils';
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
      actionRef?.current?.addEditRecord(record as any, {
        position,
        newRecordType,
        parentKey: parentKey as React.Key,
      });
    },
  });
}

type CreatorButtonResult = {
  creatorButtonDom: React.ReactNode | false;
  buttonRenderProps: Record<string, any>;
};

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
      const actionProps = {
        data: baseData,
        getRowKey,
        row: {
          ...defaultValue,
          map_row_parentKey: recordKeyToString(
            newLineOptions.parentKey,
          )?.toString(),
        },
        key: newLineOptions?.recordKey,
        childrenColumnName: childrenColumnName || 'children',
      };

      return editableRowByKey(
        actionProps,
        newLineOptions?.position === 'top' ? 'top' : 'update',
      );
    }

    if (newLineOptions?.position === 'top') {
      return [defaultValue, ...baseData];
    }

    const pageConfig =
      pagination && typeof pagination === 'object' ? pagination : undefined;

    if (pageConfig?.current && pageConfig?.pageSize) {
      if (pageConfig.pageSize > baseData.length) {
        baseData.push(defaultValue);
        return baseData;
      }
      const insertIndex = pageConfig.current * pageConfig.pageSize - 1;
      baseData.splice(insertIndex, 0, defaultValue);
      return baseData;
    }

    baseData.push(defaultValue);
    return baseData;
  }, [
    actionDataSource,
    childrenColumnName,
    editableUtils?.newLineRecord,
    getRowKey,
    pagination,
  ]);
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
    if (typeof maxLength === 'number' && maxLength <= (value?.length || 0)) {
      return false;
    }
    if (recordCreatorProps === false) return false;
    const {
      record,
      position,
      creatorButtonText,
      newRecordType,
      parentKey,
      style,
      ...restButtonProps
    } = recordCreatorProps || {};

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLength, recordCreatorProps, value?.length]);

  const buttonRenderProps = useMemo(() => {
    if (!creatorButtonDom) {
      return {};
    }
    if (isTop) {
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
    return {
      tableViewRender: (_: any, dom: any) => {
        return (
          <>
            {tableViewRender?.(_, dom) ?? dom}
            {creatorButtonDom}
          </>
        );
      },
    };
  }, [columnsLength, creatorButtonDom, isTop, tableViewRender]);

  return { creatorButtonDom, buttonRenderProps };
}

function useTableCardBodyStyle({
  propsCardProps,
  notNeedCardDom,
  name,
  hideToolbar,
  toolbarDom,
  pagination,
}: {
  propsCardProps: ProTableProps<any, any, any>['cardProps'];
  notNeedCardDom: boolean;
  name: ProTableProps<any, any, any>['name'];
  hideToolbar: boolean;
  toolbarDom: React.ReactNode;
  pagination: ProTableProps<any, any, any>['pagination'];
}): React.CSSProperties {
  return useMemo(() => {
    if (propsCardProps === false || notNeedCardDom || !!name) {
      return {};
    }

    if (hideToolbar) {
      return {
        padding: 0,
      };
    }

    if (toolbarDom) {
      return {
        paddingBlockStart: 0,
      };
    }

    if (toolbarDom && pagination === false) {
      return {
        paddingBlockStart: 0,
      };
    }

    return {
      padding: 0,
    };
  }, [hideToolbar, name, notNeedCardDom, pagination, propsCardProps, toolbarDom]);
}

function useTableContent<DataType>({
  editable,
  name,
  toolbarDom,
  alertDom,
  tableDom,
  dateFormatter,
  editableOnValuesChange,
}: {
  editable: ProTableProps<DataType, any, any>['editable'];
  name: ProTableProps<DataType, any, any>['name'];
  toolbarDom: React.ReactNode;
  alertDom: React.ReactNode;
  tableDom: React.ReactNode;
  dateFormatter: ProTableProps<DataType, any, any>['dateFormatter'];
  editableOnValuesChange:
    | ((record: DataType, dataSource: DataType[]) => void)
    | undefined;
}): React.ReactNode {
  return useMemo(() => {
    if (editable && !name) {
      return (
        <>
          {toolbarDom}
          {alertDom}
          <ProForm
            {...editable.formProps}
            formRef={editable.formProps?.formRef as any}
            component={false}
            form={editable.form}
            onValuesChange={editableOnValuesChange}
            key="table"
            submitter={false}
            omitNil={false}
            dateFormatter={dateFormatter}
          >
            {tableDom}
          </ProForm>
        </>
      );
    }

    return (
      <>
        {toolbarDom}
        {alertDom}
        {tableDom}
      </>
    );
  }, [
    alertDom,
    dateFormatter,
    editable,
    editableOnValuesChange,
    name,
    tableDom,
    toolbarDom,
  ]);
}

function useRowKey<T>({
  rowKey,
  name,
}: {
  rowKey: ProTableProps<T, any, any>['rowKey'];
  name: ProTableProps<T, any, any>['name'];
}): GetRowKey<any> {
  return useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: T, index?: number) => {
      if (index === -1) {
        return (record as any)?.[rowKey as string];
      }
      if (name) {
        return index?.toString();
      }
      return (record as any)?.[rowKey as string] ?? index?.toString();
    };
  }, [name, rowKey]);
}

function useMergedPagination<T>({
  propsPagination,
  action,
  intl,
  request,
  type,
}: {
  propsPagination: ProTableProps<T, any, any>['pagination'];
  action: UseFetchDataAction<T>;
  intl: ReturnType<typeof useIntl>;
  request: ProTableProps<T, any, any>['request'];
  type: ProTableProps<T, any, any>['type'];
}): ProTableProps<T, any, any>['pagination'] {
  return useMemo(() => {
    const newPropsPagination =
      propsPagination === false ? false : { ...(propsPagination || {}) };
    const pageConfig = {
      ...action.pageInfo,
      setPageInfo: ({ pageSize, current }: PageInfo) => {
        const { pageInfo } = action;
        if (pageSize === pageInfo.pageSize || pageInfo.current === 1) {
          action.setPageInfo({ pageSize, current });
          return;
        }

        if (request) action.setDataSource([]);
        action.setPageInfo({
          pageSize,
          current: type === 'list' ? current : 1,
        });
      },
    };
    if (request && newPropsPagination) {
      delete newPropsPagination.onChange;
      delete newPropsPagination.onShowSizeChange;
    }
    return mergePagination<T>(
      newPropsPagination as TablePaginationConfig | false | undefined,
      pageConfig,
      intl,
    );
  }, [action, intl, propsPagination, request, type]);
}

function useSearchNode<T extends Record<string, any>, U, ValueType>({
  search,
  type,
  pagination,
  beforeSearchSubmit,
  actionRef,
  columns,
  onFormSearchSubmit,
  ghost,
  onReset,
  onSubmit,
  loading,
  manualRequest,
  form,
  formRef,
  cardBordered,
  dateFormatter,
  searchFormRender,
  proTableProps,
}: {
  search: ProTableProps<T, U, ValueType>['search'];
  type: ProTableProps<T, U, ValueType>['type'];
  pagination: ProTableProps<T, U, ValueType>['pagination'];
  beforeSearchSubmit: ProTableProps<T, U, ValueType>['beforeSearchSubmit'];
  actionRef: React.MutableRefObject<ActionType | undefined>;
  columns: ProTableProps<T, U, ValueType>['columns'];
  onFormSearchSubmit: <Y extends ParamsType>(values: Y) => any;
  ghost: ProTableProps<T, U, ValueType>['ghost'];
  onReset: ProTableProps<T, U, ValueType>['onReset'];
  onSubmit: ProTableProps<T, U, ValueType>['onSubmit'];
  loading: boolean;
  manualRequest: ProTableProps<T, U, ValueType>['manualRequest'];
  form: ProTableProps<T, U, ValueType>['form'];
  formRef: React.MutableRefObject<any>;
  cardBordered: ProTableProps<T, U, ValueType>['cardBordered'];
  dateFormatter: ProTableProps<T, U, ValueType>['dateFormatter'];
  searchFormRender: ProTableProps<T, U, ValueType>['searchFormRender'];
  proTableProps: ProTableProps<T, U, ValueType>;
}): React.ReactNode {
  return useMemo(() => {
    const node =
      search === false && type !== 'form' ? null : (
        <FormRender<T, U>
          pagination={pagination}
          beforeSearchSubmit={beforeSearchSubmit}
          action={actionRef}
          columns={columns}
          onFormSearchSubmit={(values) => {
            onFormSearchSubmit(values);
          }}
          ghost={ghost}
          onReset={onReset}
          onSubmit={onSubmit}
          loading={loading}
          manualRequest={manualRequest}
          search={search}
          form={form}
          formRef={formRef}
          type={type || 'table'}
          cardBordered={cardBordered}
          dateFormatter={dateFormatter}
        />
      );

    if (searchFormRender && node) {
      return <>{searchFormRender(proTableProps, node)}</>;
    }
    return node;
  }, [
    actionRef,
    beforeSearchSubmit,
    cardBordered,
    columns,
    dateFormatter,
    form,
    formRef,
    ghost,
    loading,
    manualRequest,
    onFormSearchSubmit,
    onReset,
    onSubmit,
    pagination,
    proTableProps,
    search,
    searchFormRender,
    type,
  ]);
}

function useToolbarDom<T extends Record<string, any>>({
  toolBarRender,
  headerTitle,
  hideToolbar,
  selectedRows,
  selectedRowKeys,
  tableColumn,
  tooltip,
  toolbar,
  isLightFilter,
  searchNode,
  options,
  optionsRender,
  actionRef,
  setFormSearch,
  formSearch,
}: {
  toolBarRender: ProTableProps<T, any, any>['toolBarRender'];
  headerTitle: ProTableProps<T, any, any>['headerTitle'];
  hideToolbar: boolean;
  selectedRows: T[];
  selectedRowKeys: (string | number | Key)[] | undefined;
  tableColumn: any[];
  tooltip: ProTableProps<T, any, any>['tooltip'];
  toolbar: ProTableProps<T, any, any>['toolbar'];
  isLightFilter: boolean;
  searchNode: React.ReactNode;
  options: ProTableProps<T, any, any>['options'];
  optionsRender: ProTableProps<T, any, any>['optionsRender'];
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setFormSearch: (value: Record<string, any> | undefined) => void;
  formSearch: Record<string, any> | undefined;
}): React.ReactNode {
  return useMemo(() => {
    if (toolBarRender === false) {
      return null;
    }
    return (
      <Toolbar<T>
        headerTitle={headerTitle}
        hideToolbar={hideToolbar}
        selectedRows={selectedRows}
        selectedRowKeys={selectedRowKeys!}
        tableColumn={tableColumn}
        tooltip={tooltip}
        toolbar={toolbar}
        onFormSearchSubmit={(newValues) => {
          setFormSearch({
            ...(formSearch || {}),
            ...newValues,
          });
        }}
        searchNode={isLightFilter ? searchNode : null}
        options={options}
        optionsRender={optionsRender}
        actionRef={actionRef}
        toolBarRender={toolBarRender}
      />
    );
  }, [
    actionRef,
    formSearch,
    headerTitle,
    hideToolbar,
    isLightFilter,
    options,
    optionsRender,
    searchNode,
    selectedRowKeys,
    selectedRows,
    setFormSearch,
    tableColumn,
    toolBarRender,
    tooltip,
    toolbar,
  ]);
}

function useAlertDom<T extends Record<string, any>>({
  propsRowSelection,
  selectedRowKeys,
  selectedRows,
  onCleanSelected,
  tableAlertOptionRender,
  tableAlertRender,
}: {
  propsRowSelection: ProTableProps<T, any, any>['rowSelection'];
  selectedRowKeys: (string | number | Key)[] | undefined;
  selectedRows: T[];
  onCleanSelected: () => void;
  tableAlertOptionRender: ProTableProps<T, any, any>['tableAlertOptionRender'];
  tableAlertRender: ProTableProps<T, any, any>['tableAlertRender'];
}): React.ReactNode {
  return useMemo(() => {
    if (propsRowSelection === false) {
      return null;
    }
    return (
      <Alert<T>
        selectedRowKeys={selectedRowKeys!}
        selectedRows={selectedRows}
        onCleanSelected={onCleanSelected}
        alertOptionRender={tableAlertOptionRender}
        alertInfoRender={tableAlertRender}
        alwaysShowAlert={propsRowSelection?.alwaysShowAlert}
      />
    );
  }, [
    onCleanSelected,
    propsRowSelection,
    selectedRowKeys,
    selectedRows,
    tableAlertOptionRender,
    tableAlertRender,
  ]);
}


type CreatorButtonResult = {
  creatorButtonDom: React.ReactNode | false;
  buttonRenderProps: Record<string, any>;
};

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
    if (typeof maxLength === 'number' && maxLength <= (value?.length || 0)) {
      return false;
    }
    if (recordCreatorProps === false) return false;
    const {
      record,
      position,
      creatorButtonText,
      newRecordType,
      parentKey,
      style,
      ...restButtonProps
    } = recordCreatorProps || {};

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLength, recordCreatorProps, value?.length]);

  const buttonRenderProps = useMemo(() => {
    if (!creatorButtonDom) {
      return {};
    }
    if (isTop) {
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
    return {
      tableViewRender: (_: any, dom: any) => {
        return (
          <>
            {tableViewRender?.(_, dom) ?? dom}
            {creatorButtonDom}
          </>
        );
      },
    };
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
   * 根据不同的情况返回不同的 rowKey
   * @param finlayRowKey
   * @returns string | number
   */
  const coverRowKey = useRefFunction(
    (finlayRowKey: number | string): string | number => {
      /**
       * 如果是 prop.name 的模式，就需要把行号转化成具体的rowKey。
       */
      if (typeof finlayRowKey === 'number' && !props.name) {
        const dataLength = value?.length ?? 0;
        if (finlayRowKey >= dataLength) return finlayRowKey;
        const rowData = value?.[finlayRowKey];
        return getRowKey?.(rowData!, finlayRowKey) as string | number;
      }

      /**
       * 如果是 prop.name 的模式，就直接返回行号
       */
      if (
        (typeof finlayRowKey === 'string' ||
          finlayRowKey >= (value?.length ?? 0)) &&
        props.name
      ) {
        const rowIndex = value.findIndex((item, index) => {
          return (
            getRowKey?.(item, index)?.toString() === finlayRowKey?.toString()
          );
        });
        if (rowIndex !== -1) return rowIndex;
      }
      return finlayRowKey;
    },
  );

  // 设置 editableFormRef
  useImperativeHandle(editableFormRef, () => {
    /**
     * 获取一行数据的
     * @param rowIndex
     * @returns T | undefined
     */
    const getRowData = (rowIndex: string | number): DataType | undefined => {
      if (rowIndex == undefined) {
        throw new Error('rowIndex is required');
      }

      const finlayRowKey = coverRowKey(rowIndex);

      const rowKeyName = [props.name, finlayRowKey?.toString() ?? '']
        .flat(1)
        .filter(Boolean) as NamePath;
      return formRef.current?.getFieldValue(rowKeyName) as DataType;
    };

    /**
     * 获取整个 table 的数据
     * @returns T[] | undefined
     */
    const getRowsData = (): DataType[] | undefined => {
      const rowKeyName = [props.name].flat(1).filter(Boolean) as NamePath;
      if (Array.isArray(rowKeyName) && rowKeyName.length === 0) {
        const rowData = formRef.current?.getFieldsValue();
        if (Array.isArray(rowData)) return rowData;
        return Object.keys(rowData).map((key) => {
          return rowData[key];
        });
      }
      return formRef.current?.getFieldValue(rowKeyName) as DataType[];
    };
    return {
      ...formRef.current,
      getRowData,
      getRowsData,
      /**
       * 设置一行的数据，会将数据进行简单的 merge
       * @param rowIndex
       * @param data
       * @returns void
       */
      setRowData: (rowIndex, data) => {
        if (rowIndex == undefined) {
          throw new Error('rowIndex is required');
        }
        const finlayRowKey = coverRowKey(rowIndex);
        const rowKeyName = [props.name, finlayRowKey?.toString() ?? '']
          .flat(1)
          .filter(Boolean) as string[];

        const newRowData = Object.assign(
          {},
          {
            // 只是简单的覆盖，如果很复杂的话，需要自己处理
            ...getRowData(rowIndex),
            ...(data || {}),
          },
        );
        const updateValues = set({}, rowKeyName, newRowData);
        formRef.current?.setFieldsValue(updateValues);
        return true;
      },
    } as EditableFormInstance<DataType>;
  }, [coverRowKey, props.name, formRef.current]);

  useEffect(() => {
    if (!props.controlled) return;
    (value || []).forEach((current, index) => {
      formRef.current?.setFieldsValue({
        [`${getRowKey(current, index)}`]: current,
      });
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringify(value), props.controlled]);

  useEffect(() => {
    if (props.name) {
      formRef.current = props?.editable?.form;
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

  const editableProps = { ...props.editable };

  /**
   * 防止闭包的onchange
   *
   * >>>>>>为了性能好辛苦
   */
  const newOnValueChange = useRefFunction(
    (r: DataType, dataSource: DataType[]) => {
      props.editable?.onValuesChange?.(r, dataSource);
      props.onValuesChange?.(dataSource, r);
      if (props.controlled) {
        props?.onChange?.(dataSource);
      }
    },
  );

  if (
    props?.onValuesChange ||
    props.editable?.onValuesChange ||
    // 受控模式需要触发 onchange
    (props.controlled && props?.onChange)
  ) {
    editableProps.onValuesChange = newOnValueChange;
  }

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
             * 如果是top，需要重新设置一下 form，不然会导致 id 相同数据混淆
             */
            if (props.name && position === 'top') {
              const newValue = set(
                {},
                [props.name!].flat(1).filter(Boolean),
                dataSource,
              );
              formRef.current?.setFieldsValue(newValue);
            }
          }}
        />
      </EditableTableActionContext.Provider>
      {/* 模拟 onValuesChange */}
      {props.name ? (
        <ProFormDependency name={[props.name!]}>
          {(changeValue) => {
            if (!preData.current) {
              preData.current = value;
              return null;
            }
            const list = get(
              changeValue,
              [props.name].flat(1) as string[],
            ) as any[];
            const changeItem = list?.find((item, index) => {
              return !isDeepEqualReact(item, preData.current?.[index]);
            });
            preData.current = value;

            if (!changeItem) return null;
            // 如果不存在 preData 说明是初始化，此时不需要触发 onValuesChange
            props?.editable?.onValuesChange?.(changeItem, list);
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
