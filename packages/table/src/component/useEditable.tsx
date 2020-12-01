import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GetRowKey } from 'antd/lib/table/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { FormInstance } from 'antd/lib/form';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import { LoadingOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';
import ReactDOM from 'react-dom';

export type RowEditableType = 'single' | 'multiple';

export type ActionRenderFunction<T> = (row: T, config: ActionRenderConfig<T>) => React.ReactNode[];

export interface TableRowEditable<T> {
  /**
   * @name 编辑的类型，暂时只支持单选
   */
  type?: RowEditableType;
  /**
   * @name 正在编辑的列
   */
  editableKeys?: React.Key[];
  /**
   * 正在编辑的列修改的时候
   */
  onChange?: (editableKeys: React.Key[], editableRows: T[]) => void;
  /**
   * @name 自定义编辑的操作
   */
  actionRender?: ActionRenderFunction<T>;

  /**
   * 行保存的时候
   */
  onSave?: (key: React.Key, row: T & { index: number }) => Promise<void>;

  /**
   * 行删除的时候
   */
  onDelete?: (key: React.Key, row: T & { index: number }) => Promise<void>;

  /**
   * 删除行时的确认消息
   */
  deletePopconfirmMessage?: React.ReactNode;
}

export type ActionRenderConfig<T> = {
  editableKeys?: TableRowEditable<T>['editableKeys'];
  recordKey: React.Key;
  index: number;
  form: FormInstance<any>;
  cancelEditable: (key: React.Key) => void;
  onSave: TableRowEditable<T>['onSave'];
  onDelete: TableRowEditable<T>['onDelete'];
  deletePopconfirmMessage: TableRowEditable<T>['deletePopconfirmMessage'];
  setEditableRowKeys: (value: React.Key[]) => void;
  isNewLine: boolean;
};

/**
 * 使用map 来删除数据，性能一般
 * 但是准确率比较高
 * @param params
 * @param action
 */
function editableRowByKey<RecordType>(
  params: {
    data: RecordType[];
    childrenColumnName: string;
    getRowKey: GetRowKey<RecordType>;
    key: React.Key;
    row: RecordType;
  },
  action: 'update' | 'delete',
) {
  const { getRowKey, key, row, data, childrenColumnName } = params;
  const kvMap = new Map<React.Key, RecordType & { parentKey?: React.Key }>();

  /**
   * 打平这个数组
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

const SaveEditableAction: React.FC<ActionRenderConfig<any> & { row: any }> = ({
  recordKey,
  onSave,
  form,
  row,
  cancelEditable,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <a
      key="save"
      onClick={async () => {
        try {
          setLoading(true);
          // @ts-expect-error
          await form.validateFields([recordKey], {
            recursive: true,
          });
          const fields = form.getFieldValue([recordKey]);
          await onSave?.(recordKey, { ...row, ...fields });
          form.resetFields([recordKey]);
          setLoading(false);
          setTimeout(() => {
            cancelEditable(recordKey);
          }, 0);
        } catch (e) {
          setLoading(false);
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
      保存
    </a>
  );
};

const DeleteEditableAction: React.FC<ActionRenderConfig<any> & { row: any }> = ({
  recordKey,
  onDelete,
  row,
  deletePopconfirmMessage,
  cancelEditable,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onConfirm = async () => {
    try {
      setLoading(true);
      await onDelete?.(recordKey, row);
      setLoading(false);
      setTimeout(() => {
        cancelEditable(recordKey);
      }, 0);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Popconfirm key="delete" title={deletePopconfirmMessage} onConfirm={onConfirm}>
      <a>
        {loading ? (
          <LoadingOutlined
            style={{
              marginRight: 8,
            }}
          />
        ) : null}
        删除
      </a>
    </Popconfirm>
  );
};

const defaultActionRender: ActionRenderFunction<any> = (row, config) => {
  const { recordKey, isNewLine, cancelEditable } = config;
  return [
    <SaveEditableAction key="save" {...config} row={row} />,
    !isNewLine && <DeleteEditableAction key="delete" {...config} row={row} />,
    <a
      key="cancel"
      onClick={() => {
        cancelEditable(recordKey);
      }}
    >
      取消
    </a>,
  ];
};

export type AddLineOptions = {
  position?: 'top' | 'end';
  recordKey?: React.Key;
};

/**
 * 一个方便的hooks 用于维护编辑的状态
 * @param props
 */
function useEditable<RecordType>(
  props: TableRowEditable<RecordType> & {
    getRowKey: GetRowKey<RecordType>;
    dataSource: RecordType[];
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType[]) => void;
  },
) {
  const [newLineRecord, setNewLineRecord] = useState<
    | {
        row: RecordType | undefined;
        options: AddLineOptions;
      }
    | undefined
  >(undefined);
  const newLineRecordRef = useRef<
    | {
        row: RecordType | undefined;
        options: AddLineOptions;
      }
    | undefined
  >(undefined);
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
  /**
   * 一个用来标志的set
   * 提供了方便的 api 来去重什么的
   */
  const editableKeysSet = useMemo(() => {
    const keys = editableType === 'single' ? editableKeys.slice(0, 1) : editableKeys;
    return new Set(keys);
  }, [editableKeys.join(','), editableType]);

  /**
   * 这行是不是编辑状态
   */
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
   * @param recordKey
   */
  const startEditable = (recordKey: React.Key) => {
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'single') {
      message.warn('只能同时编辑一行！');
      return false;
    }
    editableKeysSet.add(recordKey);
    setEditableRowKeys(Array.from(editableKeysSet));
    return true;
  };

  /**
   * 退出编辑状态
   * @param recordKey
   */
  const cancelEditable = (recordKey: React.Key) => {
    // 防止多次渲染
    ReactDOM.unstable_batchedUpdates(() => {
      /**
       * 如果这个是 new Line 直接删除
       */
      if (newLineRecord && newLineRecord.options.recordKey === recordKey) {
        setNewLineRecord(undefined);
      }
      editableKeysSet.delete(recordKey);
      setEditableRowKeys(Array.from(editableKeysSet));
    });
    return true;
  };

  const actionRender = useCallback(
    (row: RecordType & { index: number }, form: FormInstance<any>) => {
      const key = props.getRowKey(row, row.index);
      const dom = (props.actionRender || defaultActionRender)(row, {
        recordKey: key,
        cancelEditable,
        index: row.index,
        isNewLine: !!newLineRecord,
        onDelete: async (
          recordKey: React.Key,
          editRow: RecordType & {
            index: number;
          },
        ) => {
          const actionProps = {
            data: props.dataSource,
            getRowKey: props.getRowKey,
            row: editRow,
            key: recordKey,
            childrenColumnName: props.childrenColumnName || 'children',
          };
          await props?.onDelete?.(recordKey, editRow);
          props.setDataSource(editableRowByKey(actionProps, 'delete'));
        },
        onSave: async (
          recordKey: React.Key,
          editRow: RecordType & {
            index: number;
          },
        ) => {
          const { options } = newLineRecordRef.current || {};
          await props?.onSave?.(recordKey, editRow);
          if (newLineRecordRef.current && recordKey === options?.recordKey) {
            if (options?.position === 'top') {
              props.setDataSource([editRow, ...props.dataSource]);
            } else {
              props.setDataSource([...props.dataSource, editRow]);
            }
            return;
          }
          const actionProps = {
            data: props.dataSource,
            getRowKey: props.getRowKey,
            row: editRow,
            key: recordKey,
            childrenColumnName: props.childrenColumnName || 'children',
          };
          props.setDataSource(editableRowByKey(actionProps, 'update'));
        },
        form,
        editableKeys,
        setEditableRowKeys,
        deletePopconfirmMessage: props.deletePopconfirmMessage || '删除此行？',
      });
      return dom;
    },
    [editableKeys.join(',')],
  );

  /**
   * @name 增加新的行
   * @description 同时只能支持一行,取消之后数据消息，不会触发 dataSource
   * @param row
   * @param options
   */
  const addEditRecord = (row: RecordType, options?: AddLineOptions) => {
    // 暂时不支持多行新增
    if (newLineRecordRef.current) {
      message.warn('只能新增一行！');
      return false;
    }
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'single') {
      message.warn('只能同时编辑一行！');
      return false;
    }

    // 防止多次渲染
    ReactDOM.unstable_batchedUpdates(() => {
      const recordKey = props.getRowKey(row, props.dataSource.length);
      editableKeysSet.add(recordKey);
      setEditableRowKeys(Array.from(editableKeysSet));
      setNewLineRecord({
        row,
        options: {
          ...options,
          recordKey,
        },
      });
    });
    return true;
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
  };
}

export type UseEditableType = typeof useEditable;

export type UseEditableUtilType = ReturnType<UseEditableType>;

export default useEditable;
