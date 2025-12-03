/* eslint-disable react-hooks/exhaustive-deps */ import { LoadingOutlined } from '@ant-design/icons';
import {
  get,
  warning as rcWarning,
  set,
  useMergedState,
} from '@rc-component/util';
import type { FormInstance, FormProps } from 'antd';
import { Form, Popconfirm, message } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import type { NamePath } from 'antd/lib/form/interface';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import type { GetRowKey } from 'antd/lib/table/interface';
import React, {
  createRef,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounceFn, useRefFunction } from '..';
import { useIntl } from '../../provider';
import { ProFormContext } from '../components/ProFormContext';
import { useDeepCompareEffectDebounce } from '../hooks/useDeepCompareEffect';
import { usePrevious } from '../hooks/usePrevious';
import { merge } from '../merge';
import { useMountMergeState } from '../useMountMergeState';
const { noteOnce } = rcWarning;

/**
 * 显示警告信息
 * @param messageStr
 */
const warning = (messageStr: React.ReactNode) => {
  return message.warning(messageStr);
};

export type RowEditableType = 'single' | 'multiple';

export type RecordKey = React.Key | React.Key[];

export const recordKeyToString = (rowKey: RecordKey): React.Key => {
  if (Array.isArray(rowKey)) return rowKey.join(',');
  return rowKey;
};

export type AddLineOptions = {
  position?: 'top' | 'bottom';
  recordKey?: RecordKey;
  newRecordType?: 'dataSource' | 'cache';
  /** 要增加到哪个节点下，一般用于多重嵌套表格 */
  parentKey?: RecordKey;
};

export type NewLineConfig<T> = {
  defaultValue?: T;
  options: AddLineOptions;
};

export type ActionRenderFunction<T> = (
  row: T,
  config: ActionRenderConfig<T, NewLineConfig<T>>,
  defaultDoms: {
    save: React.ReactNode;
    delete: React.ReactNode;
    cancel: React.ReactNode;
  },
) => React.ReactNode[];

export type RowEditableConfig<DataType> = {
  /** @name 控制可编辑表格的 From的设置 */
  formProps?: Omit<
    FormProps<DataType> & {
      formRef?: React.Ref<FormInstance | undefined>;
      onInit?: (values: DataType, form: FormInstance) => void;
    },
    'onFinish'
  >;
  /** @name 控制可编辑表格的 form */
  form?: FormInstance;
  /**
   * @type single | multiple
   * @name 编辑的类型，支持单选和多选
   */
  type?: RowEditableType;
  /** @name 正在编辑的列 */
  editableKeys?: React.Key[];
  /** 正在编辑的列修改的时候 */
  onChange?: (
    editableKeys: React.Key[],
    editableRows: DataType[] | DataType,
  ) => void;
  /** 正在编辑的列修改的时候 */
  onValuesChange?: (record: DataType, dataSource: DataType[]) => void;
  /** @name 自定义编辑的操作 */
  actionRender?: ActionRenderFunction<DataType>;
  /** 行保存的时候 */
  onSave?: (
    /** 行 id，一般是唯一id */
    key: RecordKey,
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: DataType & { index?: number },
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & { index?: number },
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>,
  ) => Promise<any | void>;

  /** 行取消的时候 */
  onCancel?: (
    /** 行 id，一般是唯一id */
    key: RecordKey,
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: DataType & { index?: number },
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & { index?: number },
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>,
  ) => Promise<any | void>;
  /** 行删除的时候 */
  onDelete?: (
    key: RecordKey,
    row: DataType & { index?: number },
  ) => Promise<any | void>;
  /** 删除行时的确认消息 */
  deletePopconfirmMessage?: React.ReactNode;
  /** 只能编辑一行的的提示 */
  onlyOneLineEditorAlertMessage?: React.ReactNode;
  /** 同时只能新增一行的提示 */
  onlyAddOneLineAlertMessage?: React.ReactNode;
  /** Table 上设置的name，用于拼接name来获取数据 */
  tableName?: NamePath;
  /** 保存一行的文字 */
  saveText?: React.ReactNode;
  /** 取消编辑一行的文字 */
  cancelText?: React.ReactNode;
  /** 删除一行的文字 */
  deleteText?: React.ReactNode;
  /**
   * 解决分页带来的 FormItem namePath 使用错误的 index 作为路径
   * @link https://github.com/ant-design/pro-components/issues/7790
   */
  getRealIndex?: (record: DataType) => number;
};
export type ActionTypeText<T> = {
  deleteText?: React.ReactNode;
  cancelText?: React.ReactNode;
  saveText?: React.ReactNode;
  editorType?: 'Array' | 'Map';
  addEditRecord?: (row: T, options?: AddLineOptions) => boolean;
};

export type ActionRenderConfig<T, LineConfig = NewLineConfig<T>> = {
  editableKeys?: RowEditableConfig<T>['editableKeys'];
  recordKey: RecordKey;
  preEditRowRef: React.MutableRefObject<T | null>;
  index?: number;
  cancelEditable: (key: RecordKey) => void;
  onSave: RowEditableConfig<T>['onSave'];
  onCancel: RowEditableConfig<T>['onCancel'];
  onDelete?: RowEditableConfig<T>['onDelete'];
  deletePopconfirmMessage: RowEditableConfig<T>['deletePopconfirmMessage'];
  setEditableRowKeys: (value: React.Key[]) => void;
  newLineConfig?: LineConfig;
  tableName?: NamePath;

  children?: React.ReactNode;
} & ActionTypeText<T>;

/**
 * 扁平化记录树结构为 Map
 */
function flattenRecordsToMap<RecordType>(
  records: RecordType[],
  getRowKey: GetRowKey<RecordType>,
  childrenColumnName: string,
  parentKey?: React.Key,
  parentIndex?: number,
): Map<
  string,
  RecordType & { map_row_key?: string; map_row_parentKey?: React.Key }
> {
  const kvMap = new Map<
    string,
    RecordType & { map_row_key?: string; map_row_parentKey?: React.Key }
  >();

  records.forEach((record, index) => {
    const eachIndex = (parentIndex || 0) * 10 + index;
    const recordKey = getRowKey(record, eachIndex).toString();

    const hasChildren =
      record && typeof record === 'object' && childrenColumnName in record;

    if (hasChildren) {
      const children = (record as any)[childrenColumnName] || [];
      const childrenMap = flattenRecordsToMap(
        children,
        getRowKey,
        childrenColumnName,
        recordKey,
        eachIndex,
      );
      childrenMap.forEach((value, key) => kvMap.set(key, value));
    }

    const newRecord = {
      ...record,
      map_row_key: recordKey,
      map_row_parentKey: parentKey,
    };
    delete (newRecord as any).children;
    if (!parentKey) {
      delete newRecord.map_row_parentKey;
    }
    kvMap.set(recordKey, newRecord);
  });

  return kvMap;
}

/**
 * 重建树结构
 */
function rebuildTreeStructure<RecordType>(
  map: Map<
    string,
    RecordType & { map_row_parentKey?: React.Key; map_row_key?: string }
  >,
  childrenColumnName: string,
  action: 'update' | 'top' | 'delete',
): RecordType[] {
  const childrenMap = new Map<string, RecordType[]>();
  const result: RecordType[] = [];

  const addNewRecordToChildren = (fillChildren: boolean) => {
    map.forEach((value) => {
      if (value.map_row_parentKey != null && !value.map_row_key) {
        const { map_row_parentKey, ...rest } = value;
        const parentKeyStr = String(map_row_parentKey);
        if (!childrenMap.has(parentKeyStr)) {
          childrenMap.set(parentKeyStr, []);
        }
        if (fillChildren) {
          childrenMap.get(parentKeyStr)?.push(rest as unknown as RecordType);
        }
      }
    });
  };

  addNewRecordToChildren(action === 'top');

  // 第一步：将所有有 parentKey 的节点添加到 childrenMap
  // 这一步不获取 children，只是添加节点到对应的父节点下
  map.forEach((value) => {
    if (value.map_row_parentKey != null && value.map_row_key) {
      const { map_row_parentKey, map_row_key, isNewRecord, ...rest } =
        value as any;
      const record = { ...rest, map_row_key } as any;
      // 确保 parentKey 的类型转换与 flattenRecordsToMap 中的 recordKey 一致
      // 在 flattenRecordsToMap 中，recordKey 被转换为字符串：getRowKey(record, eachIndex).toString()
      // 所以这里也需要确保 parentKey 被转换为字符串，并且类型一致
      const parentKeyStr =
        map_row_parentKey != null ? String(map_row_parentKey) : null;

      if (!parentKeyStr) {
        return;
      }

      if (!childrenMap.has(parentKeyStr)) {
        childrenMap.set(parentKeyStr, []);
      }

      // 如果是新记录且 action 为 'top'，添加到数组开头；否则添加到末尾
      if (isNewRecord && action === 'top') {
        childrenMap.get(parentKeyStr)?.unshift(record as RecordType);
      } else {
        childrenMap.get(parentKeyStr)?.push(record as RecordType);
      }
    }
  });

  // 第二步：为所有节点获取 children
  // 这一步确保所有子节点都已经被添加到 childrenMap，所以可以正确获取 children
  map.forEach((value) => {
    if (value.map_row_parentKey != null && value.map_row_key) {
      const { map_row_parentKey, map_row_key } = value as any;
      const parentKeyStr =
        map_row_parentKey != null ? String(map_row_parentKey) : null;

      if (!parentKeyStr) {
        return;
      }

      const children = childrenMap.get(parentKeyStr);
      if (children && children.length > 0) {
        // 找到对应的 record 并添加 children
        const recordIndex = children.findIndex((r: any) => {
          // 比较时需要确保类型一致
          const recordKey = (r as any).map_row_key || (r as any).id;
          return String(recordKey) === String(map_row_key);
        });

        if (recordIndex >= 0 && childrenMap.has(map_row_key)) {
          children[recordIndex] = {
            ...children[recordIndex],
            [childrenColumnName]: childrenMap.get(map_row_key),
          } as RecordType;
        }
      }
    }
  });

  addNewRecordToChildren(action === 'update');

  map.forEach((value) => {
    if (!value.map_row_parentKey) {
      const { map_row_key, ...rest } = value;
      const record =
        map_row_key && childrenMap.has(map_row_key)
          ? { ...rest, [childrenColumnName]: childrenMap.get(map_row_key) }
          : rest;
      result.push(record as RecordType);
    }
  });

  return result;
}

/**
 * 使用map 来删除数据，性能一般 但是准确率比较高
 */
export function editableRowByKey<RecordType>(
  keyProps: {
    data: RecordType[];
    childrenColumnName: string;
    getRowKey: GetRowKey<RecordType>;
    key: RecordKey;
    row: RecordType;
  },
  action: 'update' | 'top' | 'delete',
) {
  const { getRowKey, row, data, childrenColumnName = 'children' } = keyProps;
  const key = recordKeyToString(keyProps.key)?.toString();

  const kvMap = flattenRecordsToMap(data, getRowKey, childrenColumnName);

  if (action === 'delete') {
    kvMap.delete(key);
  } else if (action === 'top' || action === 'update') {
    const existingRecord = kvMap.get(key);
    if (existingRecord) {
      kvMap.set(key, {
        ...existingRecord,
        ...row,
      } as any);
    } else {
      // 如果记录不存在，创建一个新记录（用于新增场景）
      // 保留 map_row_parentKey 以便正确处理嵌套子节点
      // 添加标记以便在 rebuildTreeStructure 中识别新记录
      kvMap.set(key, {
        ...row,
        map_row_key: key,
        map_row_parentKey: (row as any).map_row_parentKey,
        isNewRecord: true,
      } as any);
    }
  }

  return rebuildTreeStructure(kvMap, childrenColumnName, action);
}

/**
 * 保存按钮的dom
 *
 * @param ActionRenderConfig
 */
export function SaveEditableAction<T>(
  {
    recordKey,
    onSave,
    row,
    children,
    newLineConfig,
    editorType,
    tableName,
  }: ActionRenderConfig<T> & { row: any; children: any },
  ref: React.Ref<SaveEditableActionRef<T>>,
) {
  const context = useContext(ProFormContext);
  const form = Form.useFormInstance();
  const [loading, setLoading] = useMountMergeState<boolean>(false);
  const save = useRefFunction(async () => {
    try {
      const isMapEditor = editorType === 'Map';
      // 为了兼容类型为 array 的 dataIndex,当 recordKey 是一个数组时，用于获取表单值的 key 只取第一项，
      // 从表单中获取回来之后，再根据 namepath 获取具体的某个字段并设置
      const namePath = [
        tableName,
        Array.isArray(recordKey) ? recordKey[0] : recordKey,
      ]
        .map((key) => key?.toString())
        .flat(1)
        .filter(Boolean) as string[];
      setLoading(true);
      try {
        await form.validateFields(namePath, {
          recursive: true,
        });
      } catch (error: any) {
        setLoading(false);
        // 重新抛出验证错误，让表单显示错误信息
        // validateFields 抛出错误时，表单会自动设置错误状态并显示错误
        // 错误对象包含 errorFields，表单会根据这些字段显示错误
        // 确保错误被正确传播，这样表单可以正确显示验证错误
        throw error;
      }

      const fields =
        context?.getFieldFormatValue?.(namePath) ||
        form.getFieldValue(namePath);
      // 处理 dataIndex 为数组的情况
      if (Array.isArray(recordKey) && recordKey.length > 1) {
        // 获取 namepath
        const [, ...recordKeyPath] = recordKey;
        // 将目标值获取出来并设置到 fields 当中
        const curValue = get(fields, recordKeyPath as string[]);
        set(fields, recordKeyPath as (number | string)[], curValue);
      }
      const data = isMapEditor ? set({}, namePath, fields) : fields;

      // 获取数据并保存
      const res = await onSave?.(
        recordKey,
        // 如果是 map 模式，fields 就是一个值，所以需要set 到对象中
        // 数据模式 fields 是一个对象，所以不需要
        merge({}, row, data),
        row,
        newLineConfig,
      );
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  });

  // 保存数据
  useImperativeHandle(
    ref,
    () => ({
      save,
    }),
    [save],
  );

  return (
    <a
      key="save"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
          await save();
        } catch {
          // 验证错误会被 form.validateFields 抛出，这里不需要处理
          // 错误会被表单自动显示
        }
      }}
    >
      {loading ? (
        <LoadingOutlined
          style={{
            marginInlineEnd: 8,
          }}
        />
      ) : null}
      {children || '保存'}
    </a>
  );
}
export type SaveEditableActionRef<T = any> = {
  /**
   * 直接触发保存动作
   *
   * @throws 如果校验失败，会抛出异常
   *  */
  save: () =>
    | ReturnType<NonNullable<RowEditableConfig<T>['onSave']>>
    | Promise<void>;
};

/**
 * 删除按钮 dom
 *
 * @param ActionRenderConfig
 */
export const DeleteEditableAction: React.FC<
  ActionRenderConfig<any> & { row: any }
> = ({
  recordKey,
  onDelete,
  preEditRowRef,
  row,
  children,
  deletePopconfirmMessage,
}) => {
  const [loading, setLoading] = useMountMergeState<boolean>(() => false);

  const onConfirm = useRefFunction(async () => {
    try {
      setLoading(true);
      const res = await onDelete?.(recordKey, row);
      setLoading(false);
      // 如果返回 false，阻止删除操作
      if (res === false) {
        return false;
      }
      return res;
    } catch {
      setLoading(false);

      return null;
    } finally {
      if (preEditRowRef) preEditRowRef.current = null;
    }
  });
  return children !== false ? (
    <Popconfirm
      key="delete"
      title={deletePopconfirmMessage || '确定要删除这条记录吗？'}
      onConfirm={onConfirm}
      getPopupContainer={(triggerNode) =>
        triggerNode.parentElement || document.body
      }
    >
      <a>
        {loading ? (
          <LoadingOutlined
            style={{
              marginInlineEnd: 8,
            }}
          />
        ) : null}
        {children || '删除'}
      </a>
    </Popconfirm>
  ) : null;
};

const CancelEditableAction: React.FC<ActionRenderConfig<any> & { row: any }> = (
  props,
) => {
  const {
    recordKey,
    tableName,
    newLineConfig,
    editorType,
    onCancel,
    cancelEditable,
    row,
    cancelText,
    preEditRowRef,
  } = props;
  const context = useContext(ProFormContext);
  const form = Form.useFormInstance();
  return (
    <a
      key="cancel"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const isMapEditor = editorType === 'Map';
        const namePath = [tableName, recordKey]
          .flat(1)
          .filter(Boolean) as string[];
        const fields =
          context?.getFieldFormatValue?.(namePath) ||
          form?.getFieldValue(namePath);
        const record = isMapEditor ? set({}, namePath, fields) : fields;
        const res = await onCancel?.(recordKey, record, row, newLineConfig);
        await cancelEditable(recordKey);
        /** 重置为默认值，不然编辑的行会丢掉 */
        if (preEditRowRef?.current !== null) {
          form.setFieldsValue(set({}, namePath, preEditRowRef?.current));
        } else {
          // 如果不存在历史值，说明是新的行，干掉他
          await props.onDelete?.(recordKey, row);
        }
        if (preEditRowRef) preEditRowRef.current = null;

        return res;
      }}
    >
      {cancelText || '取消'}
    </a>
  );
};

export function defaultActionRender<T>(
  row: T,
  config: ActionRenderConfig<T, NewLineConfig<T>>,
) {
  const { recordKey, newLineConfig, saveText, deleteText } = config;
  const SaveEditableActionRef = forwardRef(
    SaveEditableAction as typeof SaveEditableAction<T>,
  );
  const saveRef = createRef<SaveEditableActionRef<T>>();

  return {
    save: (
      <SaveEditableActionRef
        key={'save' + recordKey}
        {...config}
        row={row}
        ref={saveRef}
      >
        {saveText}
      </SaveEditableActionRef>
    ),
    saveRef,
    delete:
      newLineConfig?.options.recordKey !== recordKey ? (
        <DeleteEditableAction key={'delete' + recordKey} {...config} row={row}>
          {deleteText}
        </DeleteEditableAction>
      ) : undefined,
    cancel: (
      <CancelEditableAction key={'cancel' + recordKey} {...config} row={row} />
    ),
  };
}

/**
 * 一个方便的hooks 用于维护编辑的状态
 *
 * @param props
 */
export function useEditableArray<RecordType extends AnyObject>(
  props: RowEditableConfig<RecordType> & {
    getRowKey: GetRowKey<RecordType>;
    dataSource: RecordType[];
    onValuesChange?: (record: RecordType, dataSource: RecordType[]) => void;
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType[]) => void;
  },
) {
  // Internationalization
  const intl = useIntl();

  /**
   * 点击开始编辑之前的保存数据用的
   */
  const preEditRowRef = useRef<RecordType | null>(null);

  const [newLineRecordCache, setNewLineRecordCache] = useState<
    NewLineConfig<RecordType> | undefined
  >(undefined);

  /**
   * 构建数据源 key 索引映射表
   */
  const buildDataSourceKeyIndexMap = useRefFunction(() => {
    const map = new Map<React.Key, React.Key>();

    const traverseRecords = (records: RecordType[], parentKey?: string) => {
      records?.forEach((record, index) => {
        const indexKey =
          parentKey == null ? index.toString() : `${parentKey}_${index}`;
        const recordKey = recordKeyToString(props.getRowKey(record, -1));

        // 如果 recordKey 是 undefined 或 null，跳过
        if (recordKey == null) {
          return;
        }

        map.set(indexKey, recordKey);
        map.set(recordKey.toString(), indexKey);

        const children =
          props.childrenColumnName &&
          (record as any)?.[props.childrenColumnName];
        if (children) {
          traverseRecords(children, indexKey);
        }
      });
    };

    traverseRecords(props.dataSource);
    return map;
  });
  const initDataSourceKeyIndexMap = useMemo(
    () => buildDataSourceKeyIndexMap(),
    [],
  );

  const dataSourceKeyIndexMapRef = useRef<Map<React.Key, React.Key>>(
    initDataSourceKeyIndexMap,
  );
  const newLineRecordRef = useRef<NewLineConfig<RecordType> | undefined>(
    undefined,
  );

  useDeepCompareEffectDebounce(() => {
    dataSourceKeyIndexMapRef.current = buildDataSourceKeyIndexMap();
  }, [props.dataSource]);

  // 这里这么做是为了存上次的状态，不然每次存一下再拿
  newLineRecordRef.current = newLineRecordCache;

  const editableType = props.type || 'single';
  const [getRecordByKey] = useLazyKVMap(
    props.dataSource,
    'children',
    props.getRowKey,
  );

  const [editableKeys, setEditableRowKeys] = useMergedState<
    React.Key[] | undefined
  >([], {
    value: props.editableKeys,
    onChange: props.onChange
      ? (keys) => {
          props?.onChange?.(
            // 计算编辑的key
            keys?.filter((key) => key !== undefined) ?? [],
            // 计算编辑的行
            keys
              ?.map((key) => getRecordByKey(key))
              .filter((key) => key !== undefined) ?? [],
          );
        }
      : undefined,
  });

  const editableKeysRef = usePrevious(editableKeys);

  /**
   * 检查 key 是否在编辑列表中
   */
  const checkKeyInEditableList = useRefFunction(
    (key: string, keysList: string[]): boolean => {
      return keysList.includes(key);
    },
  );

  /** 这行是不是编辑状态 */
  const isEditable = useRefFunction((row: RecordType & { index: number }) => {
    const recordKeyWithIndex = props.getRowKey(row, row.index)?.toString();
    const recordKey = props.getRowKey(row, -1)?.toString();
    const stringEditableKeys =
      editableKeys?.map((key) => key?.toString()) || [];
    const stringEditableKeysRef =
      editableKeysRef?.map((key) => key?.toString()) || [];

    const preIsEditable =
      checkKeyInEditableList(recordKey, stringEditableKeysRef) ||
      checkKeyInEditableList(recordKeyWithIndex, stringEditableKeysRef);

    return {
      recordKey,
      isEditable:
        checkKeyInEditableList(recordKey, stringEditableKeys) ||
        checkKeyInEditableList(recordKeyWithIndex, stringEditableKeys),
      preIsEditable,
    };
  });

  /**
   * 验证是否可以开始编辑
   */
  const validateCanStartEdit = useRefFunction((): boolean => {
    const hasEditableKeys = editableKeys && editableKeys.length > 0;
    if (
      hasEditableKeys &&
      editableType === 'single' &&
      props.onlyOneLineEditorAlertMessage !== false
    ) {
      warning(
        props.onlyOneLineEditorAlertMessage ||
          intl.getMessage(
            'editableTable.onlyOneLineEditor',
            '只能同时编辑一行',
          ),
      );
      return false;
    }
    return true;
  });

  /**
   * 查找记录
   */
  const findRecordByKey = useRefFunction(
    (recordKey: React.Key): RecordType | null => {
      return (
        props.dataSource?.find((recordData, index) => {
          return props.getRowKey(recordData, index) === recordKey;
        }) ?? null
      );
    },
  );

  /**
   * 进入编辑状态
   */
  const startEditable = useRefFunction(
    (recordKey: React.Key, record?: RecordType) => {
      if (!validateCanStartEdit()) {
        return false;
      }

      const isAlreadyEditable = editableKeys?.some(
        (key) => key === recordKey || key?.toString() === recordKey?.toString(),
      );

      if (!isAlreadyEditable) {
        const newKeys = editableKeys
          ? [...editableKeys, recordKey]
          : [recordKey];
        setEditableRowKeys(newKeys);
      }

      preEditRowRef.current = record ?? findRecordByKey(recordKey) ?? null;

      return true;
    },
  );

  /**
   * 清理编辑状态
   */
  const clearEditableState = useRefFunction((recordKey: RecordKey) => {
    const relayKey = recordKeyToString(recordKey);
    const relayKeyStr = relayKey != null ? relayKey.toString() : null;
    if (relayKeyStr == null) {
      return;
    }
    const newKeys =
      editableKeys?.filter(
        (key) => key?.toString() !== relayKeyStr && key !== relayKey,
      ) ?? [];
    setEditableRowKeys(newKeys);
  });

  /**
   * 退出编辑状态
   */
  const cancelEditable = useRefFunction(
    async (recordKey: RecordKey, needReTry?: boolean): Promise<boolean> => {
      const relayKey = recordKeyToString(recordKey);
      const relayKeyStr = relayKey != null ? relayKey.toString() : null;
      const mappedKey =
        relayKeyStr != null
          ? dataSourceKeyIndexMapRef.current.get(relayKeyStr)
          : undefined;

      const isInEditableSet = editableKeys?.some((key) => {
        if (relayKeyStr == null) return false;
        return key?.toString() === relayKeyStr || key === relayKey;
      });

      if (
        !isInEditableSet &&
        mappedKey &&
        (needReTry ?? true) &&
        props.tableName
      ) {
        return await cancelEditable(mappedKey, false);
      }

      // 如果提供了 onCancel，尝试调用它（用于测试场景）
      // 注意：在实际使用中，onCancel 应该在 CancelEditableAction 中被调用
      if (props.onCancel && isInEditableSet) {
        const keyForFind = Array.isArray(recordKey) ? recordKey[0] : recordKey;
        const record = findRecordByKey(keyForFind);
        const originRow = preEditRowRef.current;
        // 比较 recordKey 时需要考虑类型转换
        // newLineRecordCache.options.recordKey 是 addEditRecord 时设置的 recordKey
        // 而 recordKey 是 cancelEditable 的参数，需要确保它们匹配
        const cacheRecordKey = newLineRecordCache?.options?.recordKey;
        const cacheKey =
          cacheRecordKey != null ? recordKeyToString(cacheRecordKey) : null;
        const cacheKeyStr = cacheKey != null ? cacheKey.toString() : null;
        // 检查 newLineRecordCache 是否匹配当前的 recordKey
        const newLineConfig =
          newLineRecordCache != null &&
          cacheRecordKey != null &&
          (cacheRecordKey === recordKey ||
            (cacheKeyStr != null &&
              relayKeyStr != null &&
              cacheKeyStr === relayKeyStr) ||
            cacheRecordKey?.toString() === recordKey?.toString() ||
            String(cacheRecordKey) === String(recordKey))
            ? newLineRecordCache
            : undefined;

        // 调用 onCancel，即使找不到记录（新行编辑场景）
        // 对于新行编辑，record 可能为 null，但 newLineConfig 应该包含 defaultValue
        try {
          await props.onCancel(
            recordKey,
            record || (newLineConfig?.defaultValue as any) || ({} as any),
            originRow ||
              record ||
              (newLineConfig?.defaultValue as any) ||
              ({} as any),
            newLineConfig,
          );
        } catch (error) {
          // 如果 onCancel 抛出异常，仍然继续清理状态
          console.error('onCancel error:', error);
        }
      }

      // 清理 newLineRecordCache，需要比较 recordKey（考虑类型转换）
      if (newLineRecordCache) {
        const cacheRecordKey = newLineRecordCache.options.recordKey;
        // 重用之前计算的 relayKeyStr
        const cacheKeyStr =
          cacheRecordKey != null
            ? recordKeyToString(cacheRecordKey)?.toString()
            : null;
        if (
          cacheRecordKey === recordKey ||
          (cacheKeyStr != null &&
            relayKeyStr != null &&
            cacheKeyStr === relayKeyStr) ||
          cacheRecordKey?.toString() === recordKey?.toString() ||
          String(cacheRecordKey) === String(recordKey)
        ) {
          setNewLineRecordCache(undefined);
        }
      }

      // 先清理 preEditRowRef 并重置表单字段，然后再清除编辑状态
      // 这样在清除编辑状态前，表单字段已经被清除，表格重新渲染时就不会显示输入框
      const originRow = preEditRowRef.current;
      if (
        originRow &&
        props.getRowKey(originRow, -1) === recordKey &&
        isInEditableSet
      ) {
        try {
          // 尝试通过 formProps.formRef 访问 form
          const formRef = props.formProps?.formRef as any;
          const form = formRef?.current || props.form;

          if (form) {
            if (props.tableName) {
              // name 模式：重置为原始值
              const namePath = [props.tableName, recordKey]
                .flat(1)
                .filter(Boolean) as string[];
              form.setFieldsValue(set({}, namePath, originRow));
            } else {
              // 非 name 模式：清除该行的所有表单字段
              // 在非 name 模式下，表单字段路径是 [recordKey, columnDataIndex]
              // 如 [624748504, 'title']，需要清除所有以 recordKey 开头的字段
              const recordKeyStr = recordKeyToString(recordKey)?.toString();
              if (recordKeyStr) {
                try {
                  // 在非 name 模式下，表单字段以嵌套对象的形式存储
                  // 比如 { '624748504': { 'title': 'value', 'state': 'value' } }
                  // 需要清除整个嵌套对象
                  // 先使用 resetFields 清除字段状态
                  form.resetFields([[recordKeyStr]]);

                  // 然后使用 setFieldsValue 清除字段值
                  // 这样可以确保字段被完全清除，表格重新渲染时不会显示输入框
                  form.setFieldsValue({
                    [recordKeyStr]: undefined,
                  });
                } catch (error) {
                  // 如果清除失败，忽略错误
                  console.warn(
                    'Failed to clear form fields in cancelEditable:',
                    error,
                  );
                }
              }
            }
          }
        } catch (error) {
          // 如果访问 form 失败，忽略错误
          console.warn('Failed to reset form fields in cancelEditable:', error);
        }
        preEditRowRef.current = null;
      }

      // 最后清除编辑状态，这样表格会重新渲染，输入框会消失
      clearEditableState(recordKey);

      return true;
    },
  );

  const propsOnValuesChange = useDebounceFn(async (...rest: any[]) => {
    //@ts-ignore
    props.onValuesChange?.(...rest);
  }, 64);

  /**
   * 构建表单字段路径
   */
  const buildFormFieldPath = useRefFunction((recordKey: string): string[] => {
    return [props.tableName || '', recordKey]
      .flat(1)
      .filter((key) => key || key === 0) as string[];
  });

  /**
   * 更新数据源中的编辑行
   */
  const updateDataSourceWithEditableRows = useRefFunction(
    (dataSource: RecordType[], values: RecordType): RecordType[] => {
      let updatedDataSource = dataSource;

      editableKeys?.forEach((eachRecordKey) => {
        if (newLineRecordCache?.options.recordKey === eachRecordKey) {
          return;
        }

        const recordKey = eachRecordKey.toString();
        const fieldPath = buildFormFieldPath(recordKey);
        const editRow = get(values, fieldPath);

        if (!editRow) {
          return;
        }

        updatedDataSource = editableRowByKey(
          {
            data: updatedDataSource,
            getRowKey: props.getRowKey,
            row: editRow,
            key: recordKey,
            childrenColumnName: props.childrenColumnName || 'children',
          },
          'update',
        );
      });

      return updatedDataSource;
    },
  );

  /**
   * 获取当前编辑的行数据
   */
  const getCurrentEditRow = useRefFunction(
    (
      value: RecordType,
      values: RecordType,
      dataSource: RecordType[],
    ): RecordType => {
      const valueKeys = Object.keys(value || {});
      if (valueKeys.length === 0) {
        return newLineRecordCache?.defaultValue || ({} as RecordType);
      }

      const recordKey = valueKeys.pop()?.toString() || '';
      if (!recordKey) {
        return newLineRecordCache?.defaultValue || ({} as RecordType);
      }

      const fieldPath = buildFormFieldPath(recordKey);
      const newLineRecordData = {
        ...newLineRecordCache?.defaultValue,
        ...get(values, fieldPath),
      };

      const existsInDataSource = dataSourceKeyIndexMapRef.current.has(
        recordKeyToString(recordKey),
      );

      if (existsInDataSource) {
        const foundRow = dataSource.find((item, index) => {
          const key = props.getRowKey(item, index)?.toString();
          return key === recordKey;
        });
        return foundRow || newLineRecordData;
      }

      return newLineRecordData;
    },
  );

  const onValuesChange = useRefFunction(
    (value: RecordType, values: RecordType) => {
      if (!props.onValuesChange) {
        return;
      }

      const updatedDataSource = updateDataSourceWithEditableRows(
        props.dataSource,
        values,
      );
      const editRow = getCurrentEditRow(value, values, updatedDataSource);

      propsOnValuesChange.run(editRow, updatedDataSource);
    },
  );

  const saveRefsMap = useRef<
    Map<React.Key, React.RefObject<SaveEditableActionRef>>
  >(new Map<React.Key, React.RefObject<SaveEditableActionRef>>());

  useEffect(() => {
    const editableKeysSet = new Set(
      editableKeys?.map((key) => key?.toString()) ?? [],
    );
    saveRefsMap.current.forEach((ref, key) => {
      if (!editableKeysSet.has(key?.toString())) {
        saveRefsMap.current.delete(key);
      }
    });
  }, [editableKeys]);

  /**
   * 获取保存引用
   */
  const getSaveRef = useRefFunction((recordKey: RecordKey) => {
    const relayKey = recordKeyToString(recordKey);
    return (
      saveRefsMap.current.get(relayKey) ||
      saveRefsMap.current.get(relayKey.toString())
    );
  });

  /**
   * 保存编辑行
   */
  const saveEditable = useRefFunction(
    async (recordKey: RecordKey, needReTry?: boolean): Promise<boolean> => {
      const relayKey = recordKeyToString(recordKey);
      const relayKeyStr = relayKey.toString();
      const mappedKey = dataSourceKeyIndexMapRef.current.get(relayKeyStr);

      const isInEditableSet = editableKeys?.some(
        (key) => key?.toString() === relayKeyStr || key === relayKey,
      );

      if (
        !isInEditableSet &&
        mappedKey &&
        (needReTry ?? true) &&
        props.tableName
      ) {
        return await saveEditable(mappedKey, false);
      }

      const saveRef = getSaveRef(recordKey);
      if (!saveRef?.current) {
        return false;
      }

      await saveRef.current.save();
      clearEditableState(recordKey);
      return true;
    },
  );

  /**
   * 验证是否可以新增记录
   */
  const validateCanAddRecord = useRefFunction(
    (options?: AddLineOptions): boolean => {
      if (
        options?.parentKey &&
        !dataSourceKeyIndexMapRef.current.has(
          recordKeyToString(options?.parentKey).toString(),
        )
      ) {
        console.warn("can't find record by key", options?.parentKey);
        return false;
      }

      if (
        newLineRecordRef.current &&
        props.onlyAddOneLineAlertMessage !== false
      ) {
        warning(
          props.onlyAddOneLineAlertMessage ||
            intl.getMessage('editableTable.onlyAddOneLine', '只能新增一行'),
        );
        return false;
      }

      if (!validateCanStartEdit()) {
        return false;
      }

      return true;
    },
  );

  /**
   * 验证记录 key 是否有效
   */
  const validateRecordKey = useRefFunction((recordKey: React.Key): void => {
    if (recordKey == null && recordKey !== 0 && recordKey !== '') {
      noteOnce(
        false,
        '请设置 recordCreatorProps.record 并返回一个唯一的key  \n  https://procomponents.ant.design/components/editable-table#editable-%E6%96%B0%E5%BB%BA%E8%A1%8C',
      );
      throw new Error('请设置 recordCreatorProps.record 并返回一个唯一的key');
    }
  });

  /**
   * 增加新的行
   */
  const addEditRecord = useRefFunction(
    (row: RecordType, options?: AddLineOptions) => {
      if (!validateCanAddRecord(options)) {
        return false;
      }

      const recordKey = props.getRowKey(row, -1);
      validateRecordKey(recordKey);

      const isAlreadyEditable = editableKeys?.some(
        (key) => key === recordKey || key?.toString() === recordKey?.toString(),
      );

      if (!isAlreadyEditable) {
        const newKeys = editableKeys
          ? [...editableKeys, recordKey]
          : [recordKey];
        setEditableRowKeys(newKeys);
      }

      // 处理 parentKey：如果是函数，调用它
      const parentKeyValue =
        typeof options?.parentKey === 'function'
          ? (options.parentKey as any)()
          : options?.parentKey;

      const isDataSourceMode =
        options?.newRecordType === 'dataSource' ||
        (props.tableName && options?.newRecordType !== 'cache');
      if (isDataSourceMode) {
        const actionProps = {
          data: props.dataSource,
          getRowKey: props.getRowKey,
          row: {
            ...row,
            map_row_parentKey: parentKeyValue
              ? recordKeyToString(parentKeyValue)?.toString()
              : undefined,
          },
          key: recordKey,
          childrenColumnName: props.childrenColumnName || 'children',
        };
        props.setDataSource(
          editableRowByKey(
            actionProps,
            options?.position === 'top' ? 'top' : 'update',
          ),
        );
      } else {
        setNewLineRecordCache({
          defaultValue: row,
          options: {
            ...options,
            parentKey: parentKeyValue,
            recordKey,
          },
        });
      }
      return true;
    },
  );

  const saveText =
    props?.saveText || intl.getMessage('editableTable.action.save', '保存');
  const deleteText =
    props?.deleteText || intl.getMessage('editableTable.action.delete', '删除');
  const cancelText =
    props?.cancelText || intl.getMessage('editableTable.action.cancel', '取消');

  const actionSaveRef = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
      originRow: RecordType & {
        index?: number;
      },
      newLine?: NewLineConfig<RecordType>,
    ) => {
      const res = await props?.onSave?.(recordKey, editRow, originRow, newLine);

      const { options } = newLine || newLineRecordRef.current || {};
      const isNewLine = !options?.parentKey && options?.recordKey === recordKey;

      if (isNewLine) {
        if (options?.position === 'top') {
          props.setDataSource([editRow, ...props.dataSource]);
        } else {
          props.setDataSource([...props.dataSource, editRow]);
        }
      } else {
        const actionProps = {
          data: props.dataSource,
          getRowKey: props.getRowKey,
          row: options
            ? {
                ...editRow,
                map_row_parentKey: recordKeyToString(
                  options?.parentKey ?? '',
                )?.toString(),
              }
            : editRow,
          key: recordKey,
          childrenColumnName: props.childrenColumnName || 'children',
        };
        props.setDataSource(
          editableRowByKey(
            actionProps,
            options?.position === 'top' ? 'top' : 'update',
          ),
        );
      }

      // 保存时解除编辑模式，统一在这里调用一次
      await cancelEditable(recordKey);
      return res;
    },
  );

  const actionDeleteRef = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
    ) => {
      const actionProps = {
        data: props.dataSource,
        getRowKey: props.getRowKey,
        row: editRow,
        key: recordKey,
        childrenColumnName: props.childrenColumnName || 'children',
      };
      const res = await props?.onDelete?.(recordKey, editRow);
      // 如果 onDelete 返回 false，阻止删除操作
      if (res === false) {
        return false;
      }
      // 不传递 false时，重新form.setFieldsValue同一份静态数据，会导致该行始终处于不可编辑状态
      await cancelEditable(recordKey, false);
      props.setDataSource(editableRowByKey(actionProps, 'delete'));

      return res;
    },
  );

  const actionCancelRef = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
      originRow: RecordType & { index?: number },
      newLine?: NewLineConfig<RecordType>,
    ) => {
      const res = await props?.onCancel?.(
        recordKey,
        editRow,
        originRow,
        newLine,
      );
      return res;
    },
  );

  // 如果传入了自定义的actionRender，使用useRefFunction以确保内部的事件处理函数可以访问最新的state
  const existCustomActionRender =
    props.actionRender && typeof props.actionRender === 'function';
  const customActionRender = existCustomActionRender
    ? props.actionRender
    : () => {};
  const customActionRenderRef = useRefFunction(
    customActionRender as ActionRenderFunction<RecordType>,
  );

  const actionRender = (row: RecordType & { index: number }) => {
    const key = props.getRowKey(row, row.index);
    const config: ActionRenderConfig<any, NewLineConfig<any>> = {
      saveText,
      cancelText,
      deleteText,
      addEditRecord,
      recordKey: key,
      cancelEditable,
      index: row.index,
      tableName: props.tableName,
      newLineConfig: newLineRecordCache,
      onCancel: actionCancelRef,
      onDelete: actionDeleteRef,
      onSave: actionSaveRef,
      editableKeys,
      setEditableRowKeys,
      preEditRowRef,
      deletePopconfirmMessage:
        props.deletePopconfirmMessage ||
        `${intl.getMessage('deleteThisLine', '删除此项')}?`,
    };

    const renderResult = defaultActionRender<RecordType>(row, config);
    // 缓存一下saveRef
    if (props.tableName) {
      saveRefsMap.current.set(
        dataSourceKeyIndexMapRef.current.get(recordKeyToString(key)) ||
          recordKeyToString(key),
        renderResult.saveRef,
      );
    } else {
      saveRefsMap.current.set(recordKeyToString(key), renderResult.saveRef);
    }
    if (existCustomActionRender)
      return customActionRenderRef(row, config, {
        save: renderResult.save,
        delete: renderResult.delete,
        cancel: renderResult.cancel,
      });
    return [renderResult.save, renderResult.delete, renderResult.cancel];
  };

  return {
    editableKeys,
    setEditableRowKeys,
    isEditable,
    actionRender,
    startEditable,
    cancelEditable,
    addEditRecord,
    saveEditable,
    newLineRecord: newLineRecordCache,
    preEditableKeys: editableKeysRef,
    onValuesChange,
    getRealIndex: props.getRealIndex,
  };
}

export type UseEditableType = typeof useEditableArray;

export type UseEditableUtilType = ReturnType<UseEditableType>;
