import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { GetRowKey } from 'antd/lib/table/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { FormInstance } from 'antd';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import { LoadingOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { message, Popconfirm } from 'antd';
import ReactDOM from 'react-dom';
import set from 'rc-util/lib/utils/set';
import useMountMergeState from '../useMountMergeState';

export type RowEditableType = 'single' | 'multiple';

export type RecordKey = React.Key | React.Key[];

export const toNumber = (recordKey: string) => {
  if (recordKey.startsWith('0')) {
    return recordKey;
  }
  return Number.isNaN((recordKey as unknown) as number) ? recordKey : Number(recordKey);
};

export const recordKeyToString = (rowKey: RecordKey): React.Key => {
  if (Array.isArray(rowKey)) return rowKey.join(',');
  return rowKey;
};

export type AddLineOptions = {
  position?: 'top' | 'bottom';
  recordKey?: RecordKey;
  newRecordType?: 'dataSource' | 'cache';
};

export type NewLineConfig<T> = {
  defaultValue: T | undefined;
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

export type RowEditableConfig<T> = {
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
  onChange?: (editableKeys: React.Key[], editableRows: T[] | T) => void;
  /** 正在编辑的列修改的时候 */
  onValuesChange?: (record: T, dataSource: T[]) => void;
  /** @name 自定义编辑的操作 */
  actionRender?: ActionRenderFunction<T>;
  /** 行保存的时候 */
  onSave?: (
    key: RecordKey,
    row: T & { index?: number },
    newLineConfig?: NewLineConfig<T>,
  ) => Promise<any | void>;

  /** 行保存的时候 */
  onCancel?: (
    key: RecordKey,
    row: T & { index?: number },
    newLineConfig?: NewLineConfig<T>,
  ) => Promise<any | void>;

  /** 行删除的时候 */
  onDelete?: (key: RecordKey, row: T & { index?: number }) => Promise<any | void>;
  /** 删除行时的确认消息 */
  deletePopconfirmMessage?: React.ReactNode;
  /** 只能编辑一行的的提示 */
  onlyOneLineEditorAlertMessage?: React.ReactNode;
  /** 同时只能新增一行的提示 */
  onlyAddOneLineAlertMessage?: React.ReactNode;
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
  index?: number;
  form: FormInstance<any>;
  cancelEditable: (key: RecordKey) => void;
  onSave: RowEditableConfig<T>['onSave'];
  onCancel: RowEditableConfig<T>['onCancel'];
  onDelete?: RowEditableConfig<T>['onDelete'];
  deletePopconfirmMessage: RowEditableConfig<T>['deletePopconfirmMessage'];
  setEditableRowKeys: (value: React.Key[]) => void;
  newLineConfig?: LineConfig;
} & ActionTypeText<T>;

/**
 * 使用map 来删除数据，性能一般 但是准确率比较高
 *
 * @param params
 * @param action
 */
function editableRowByKey<RecordType>(
  params: {
    data: RecordType[];
    childrenColumnName: string;
    getRowKey: GetRowKey<RecordType>;
    key: RecordKey;
    row: RecordType;
  },
  action: 'update' | 'delete',
) {
  const { getRowKey, row, data, childrenColumnName } = params;
  const key = recordKeyToString(params.key);
  const kvMap = new Map<React.Key, RecordType & { parentKey?: React.Key }>();

  /**
   * 打平这个数组
   *
   * @param records
   * @param parentKey
   */
  function dig(records: RecordType[], map_row_parentKey?: React.Key) {
    records.forEach((record, index) => {
      const recordKey = getRowKey(record, index);
      // children 取在前面方便拼的时候按照反顺序放回去
      if (record && typeof record === 'object' && childrenColumnName in record) {
        dig(record[childrenColumnName] || [], recordKey);
      }
      const newRecord = {
        ...record,
        map_row_key: recordKey,
        children: undefined,
        map_row_parentKey,
      };
      delete newRecord.children;
      if (!map_row_parentKey) {
        delete newRecord.map_row_parentKey;
      }
      kvMap.set(recordKey, newRecord);
    });
  }

  dig(data);

  if (action === 'update') {
    kvMap.set(key, {
      ...kvMap.get(key),
      ...row,
    });
  }
  if (action === 'delete') {
    kvMap.delete(key);
  }
  const fill = (map: Map<React.Key, RecordType & { map_row_parentKey?: React.Key }>) => {
    const kvArrayMap = new Map<React.Key, RecordType[]>();
    const kvSource: RecordType[] = [];
    map.forEach((value) => {
      if (value.map_row_parentKey) {
        // @ts-ignore
        const { map_row_parentKey, map_row_key, ...reset } = value;
        if (kvArrayMap.has(map_row_key)) {
          reset[childrenColumnName] = kvArrayMap.get(map_row_key);
        }

        kvArrayMap.set(map_row_parentKey, [
          ...(kvArrayMap.get(map_row_parentKey) || []),
          reset as RecordType,
        ]);
        return;
      }

      if (!value.map_row_parentKey) {
        // @ts-ignore
        const { map_row_key, ...rest } = value;
        if (kvArrayMap.has(map_row_key)) {
          const item = {
            ...rest,
            [childrenColumnName]: kvArrayMap.get(map_row_key),
          };
          kvSource.push(item as RecordType);
          return;
        }
        kvSource.push(rest as RecordType);
      }
    });
    return kvSource;
  };
  const source = fill(kvMap);
  return source;
}

/**
 * 保存按钮的dom
 *
 * @param ActionRenderConfig
 */
export const SaveEditableAction: React.FC<ActionRenderConfig<any> & { row: any }> = ({
  recordKey,
  onSave,
  form,
  row,
  children,
  newLineConfig,
  editorType,
}) => {
  const [loading, setLoading] = useMountMergeState<boolean>(false);
  return (
    <a
      key="save"
      onClick={async () => {
        try {
          const isMapEditor = editorType === 'Map';
          const namePath = Array.isArray(recordKey) ? recordKey : [recordKey];
          setLoading(true);
          // @ts-expect-error
          await form.validateFields(namePath, {
            recursive: true,
          });

          const fields = form.getFieldValue(namePath);
          const record = isMapEditor ? set(row, namePath, fields) : { ...row, ...fields };
          const res = await onSave?.(recordKey, record, newLineConfig);
          setLoading(false);
          return res;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          setLoading(false);
          return null;
        }
      }}
    >
      {loading ? (
        <LoadingOutlined
          style={{
            marginRight: 8,
          }}
        />
      ) : null}
      {children || '保存'}
    </a>
  );
};

/**
 * 删除按钮 dom
 *
 * @param ActionRenderConfig
 */
export const DeleteEditableAction: React.FC<ActionRenderConfig<any> & { row: any }> = ({
  recordKey,
  onDelete,
  row,
  children,
  deletePopconfirmMessage,
  cancelEditable,
}) => {
  const [loading, setLoading] = useMountMergeState<boolean>(false);
  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await onDelete?.(recordKey, row);
      setLoading(false);
      setTimeout(() => {
        cancelEditable(recordKey);
      }, 0);
      return res;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      setLoading(false);
      return null;
    }
  };
  return children !== false ? (
    <Popconfirm key="delete" title={deletePopconfirmMessage} onConfirm={onConfirm}>
      <a>
        {loading ? (
          <LoadingOutlined
            style={{
              marginRight: 8,
            }}
          />
        ) : null}
        {children || '删除'}
      </a>
    </Popconfirm>
  ) : null;
};

export function defaultActionRender<T>(row: T, config: ActionRenderConfig<T, NewLineConfig<T>>) {
  const {
    recordKey,
    newLineConfig,
    form,
    onCancel,
    cancelEditable,
    saveText,
    cancelText,
    deleteText,
  } = config;
  return [
    <SaveEditableAction key="save" {...config} row={row}>
      {saveText}
    </SaveEditableAction>,
    newLineConfig?.options.recordKey !== recordKey ? (
      <DeleteEditableAction key="delete" {...config} row={row}>
        {deleteText}
      </DeleteEditableAction>
    ) : null,
    <a
      key="cancel"
      onClick={async () => {
        const namePath = Array.isArray(recordKey) ? recordKey : [recordKey];
        const fields = form.getFieldValue(namePath);
        const res = await onCancel?.(recordKey, fields, newLineConfig);
        cancelEditable(recordKey);
        return res;
      }}
    >
      {cancelText || '取消'}
    </a>,
  ];
}

/**
 * 一个方便的hooks 用于维护编辑的状态
 *
 * @param props
 */
function useEditableArray<RecordType>(
  props: RowEditableConfig<RecordType> & {
    getRowKey: GetRowKey<RecordType>;
    dataSource: RecordType[];
    onValuesChange?: (record: RecordType, dataSource: RecordType[]) => void;
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType[]) => void;
  },
) {
  const [newLineRecord, setNewLineRecord] = useState<NewLineConfig<RecordType> | undefined>(
    undefined,
  );
  const newLineRecordRef = useRef<NewLineConfig<RecordType> | undefined>(undefined);

  // 这里这么做是为了存上次的状态，不然每次存一下再拿
  newLineRecordRef.current = newLineRecord;

  const editableType = props.type || 'single';
  const [getRecordByKey] = useLazyKVMap(props.dataSource, 'children', props.getRowKey);

  const [editableKeys, setEditableRowKeys] = useMergedState<React.Key[]>([], {
    value: props.editableKeys,
    onChange: props.onChange
      ? (keys) => {
          props?.onChange?.(
            // 计算编辑的key
            keys,
            // 计算编辑的行
            keys.map((key) => getRecordByKey(key)),
          );
        }
      : undefined,
  });
  /** 一个用来标志的set 提供了方便的 api 来去重什么的 */
  const editableKeysSet = useMemo(() => {
    const keys = editableType === 'single' ? editableKeys.slice(0, 1) : editableKeys;
    return new Set(keys);
  }, [editableKeys.join(','), editableType]);

  /** 这行是不是编辑状态 */
  const isEditable = useCallback(
    (row: RecordType & { index: number }) => {
      const recordKey = props.getRowKey(row, row.index);
      if (editableKeys.includes(recordKey))
        return {
          recordKey,
          isEditable: true,
        };
      return {
        recordKey,
        isEditable: false,
      };
    },
    [editableKeys.join(',')],
  );

  /**
   * 进入编辑状态
   *
   * @param recordKey
   */
  const startEditable = (recordKey: React.Key) => {
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'single') {
      message.warn(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行');
      return false;
    }
    editableKeysSet.add(recordKey);
    setEditableRowKeys(Array.from(editableKeysSet));
    return true;
  };

  /**
   * 退出编辑状态
   *
   * @param recordKey
   */
  const cancelEditable = (recordKey: RecordKey) => {
    // 防止多次渲染
    ReactDOM.unstable_batchedUpdates(() => {
      /** 如果这个是 new Line 直接删除 */
      if (newLineRecord && newLineRecord.options.recordKey === recordKey) {
        setNewLineRecord(undefined);
      }
      editableKeysSet.delete(recordKeyToString(recordKey));
      setEditableRowKeys(Array.from(editableKeysSet));
    });
    return true;
  };

  const onValuesChange = (value: RecordType, values: RecordType) => {
    if (!props.onValuesChange) {
      return;
    }
    let { dataSource } = props;
    // 这里是把正在编辑中的所有表单数据都修改掉
    // 不然会用 props 里面的 dataSource，数据只有正在编辑中的
    Object.keys(values).forEach((recordKey) => {
      const editRow = values[recordKey];
      dataSource = editableRowByKey(
        {
          data: dataSource,
          getRowKey: props.getRowKey,
          row: editRow,
          key: toNumber(recordKey),
          childrenColumnName: props.childrenColumnName || 'children',
        },
        'update',
      );
    });
    const recordKey = toNumber(Object.keys(value).pop() as string);
    if (recordKey === newLineRecord?.options.recordKey) {
      cancelEditable(recordKey);
      startEditable(recordKey);
    }
    const editRow = dataSource.find((item, index) => {
      const key = props.getRowKey(item, index);
      return key === recordKey;
    }) || {
      ...newLineRecord?.defaultValue,
      ...values[recordKey],
    };

    props.onValuesChange(editRow, dataSource);
  };

  /**
   * 同时只能支持一行,取消之后数据消息，不会触发 dataSource
   *
   * @param row
   * @param options
   * @name 增加新的行
   */
  const addEditRecord = (row: RecordType, options?: AddLineOptions) => {
    // 暂时不支持多行新增
    if (newLineRecordRef.current) {
      message.warn(props.onlyAddOneLineAlertMessage || '只能新增一行');
      return false;
    }
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'single') {
      message.warn(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行');
      return false;
    }

    // 防止多次渲染
    ReactDOM.unstable_batchedUpdates(() => {
      const recordKey = props.getRowKey(row, props.dataSource.length);
      editableKeysSet.add(recordKey);
      setEditableRowKeys(Array.from(editableKeysSet));
      if (options?.newRecordType === 'dataSource') {
        props.setDataSource?.([...props.dataSource, row]);
      } else {
        setNewLineRecord({
          defaultValue: row,
          options: {
            ...options,
            recordKey,
          },
        });
      }
    });
    return true;
  };

  // Internationalization
  const intl = useIntl();
  const saveText = intl.getMessage('editableTable.action.save', '保存');
  const deleteText = intl.getMessage('editableTable.action.delete', '删除');
  const cancelText = intl.getMessage('editableTable.action.cancel', '取消');

  const actionRender = (row: RecordType & { index: number }, form: FormInstance<any>) => {
    const key = props.getRowKey(row, row.index);
    const config = {
      saveText,
      cancelText,
      deleteText,
      addEditRecord,
      recordKey: key,
      cancelEditable,
      index: row.index,
      newLineConfig: newLineRecord,
      onCancel: async (
        recordKey: RecordKey,
        editRow: RecordType & {
          index?: number;
        },
        isNewLine?: NewLineConfig<RecordType>,
      ) => {
        const res = await props?.onCancel?.(recordKey, editRow, isNewLine);
        return res;
      },
      onDelete: async (
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
        props.setDataSource(editableRowByKey(actionProps, 'delete'));
        return res;
      },
      onSave: async (
        recordKey: RecordKey,
        editRow: RecordType & {
          index?: number;
        },
        isNewLine?: NewLineConfig<RecordType>,
      ) => {
        const { options } = isNewLine || {};
        const res = await props?.onSave?.(recordKey, editRow, isNewLine);
        cancelEditable(recordKey);
        if (isNewLine) {
          if (options?.position === 'top') {
            props.setDataSource([editRow, ...props.dataSource]);
          } else {
            props.setDataSource([...props.dataSource, editRow]);
          }
          return res;
        }
        const actionProps = {
          data: props.dataSource,
          getRowKey: props.getRowKey,
          row: editRow,
          key: recordKey,
          childrenColumnName: props.childrenColumnName || 'children',
        };
        props.setDataSource(editableRowByKey(actionProps, 'update'));
        return res;
      },
      form,
      editableKeys,
      setEditableRowKeys,
      deletePopconfirmMessage: props.deletePopconfirmMessage || '删除此行？',
    };
    const defaultDoms = defaultActionRender<RecordType>(row, config);

    if (props.actionRender)
      return props.actionRender(row, config, {
        save: defaultDoms[0],
        delete: defaultDoms[1],
        cancel: defaultDoms[2],
      });
    return defaultDoms;
  };

  return {
    editableKeys,
    setEditableRowKeys,
    isEditable,
    actionRender,
    startEditable,
    cancelEditable,
    addEditRecord,
    newLineRecord,
    onValuesChange,
  };
}

export type UseEditableType = typeof useEditableArray;

export type UseEditableUtilType = ReturnType<UseEditableType>;

export default useEditableArray;
