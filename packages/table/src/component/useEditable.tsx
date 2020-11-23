import React, { useCallback, useMemo, useState } from 'react';
import { GetRowKey } from 'antd/lib/table/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { FormInstance } from 'antd/lib/form';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';

export type RowEditableType = 'singe' | 'multiple';

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
}

export type ActionRenderConfig<T> = {
  editableKeys?: TableRowEditable<T>['editableKeys'];
  rowKey: React.Key;
  index: number;
  form: FormInstance<any>;
  cancelEditable: (key: React.Key) => void;
  onSave: TableRowEditable<T>['onSave'];
  onDelete: TableRowEditable<T>['onDelete'];
  setEditableRowKeys: (value: React.Key[]) => void;
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
      const rowKey = getRowKey(record, index);
      // children 取在前面方便拼的时候按照反顺序放回去
      if (record && typeof record === 'object' && childrenColumnName in record) {
        dig(record[childrenColumnName] || [], rowKey);
      }
      const newRecord = {
        ...record,
        map_row_key: rowKey,
        children: undefined,
        map_row_parentKey,
      };
      delete newRecord.children;
      if (!map_row_parentKey) {
        delete newRecord.map_row_parentKey;
      }
      kvMap.set(rowKey, newRecord);
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
  rowKey,
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
          await form.validateFields([rowKey], {
            recursive: true,
          });
          const fields = form.getFieldValue([rowKey]);
          await onSave?.(rowKey, { ...row, ...fields });
          form.resetFields([rowKey]);
          setLoading(false);
          setTimeout(() => {
            cancelEditable(rowKey);
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
  rowKey,
  onDelete,
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
          await onDelete?.(rowKey, row);
          setLoading(false);
          setTimeout(() => {
            cancelEditable(rowKey);
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
      删除
    </a>
  );
};

const defaultActionRender: ActionRenderFunction<any> = (row, config) => {
  const { rowKey, cancelEditable } = config;
  return [
    <SaveEditableAction key="save" {...config} row={row} />,
    <DeleteEditableAction key="save" {...config} row={row} />,
    <a
      key="cancel"
      onClick={() => {
        cancelEditable(rowKey);
      }}
    >
      取消
    </a>,
  ];
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
  const editableType = props.type || 'singe';
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
    const keys = editableType === 'singe' ? editableKeys.slice(0, 1) : editableKeys;
    return new Set(keys);
  }, [editableKeys.join(','), editableType]);

  /**
   * 这行是不是编辑状态
   */
  const isEditable = useCallback(
    (row: RecordType & { index: number }) => {
      const rowKey = props.getRowKey(row, row.index);
      if (editableKeys.includes(rowKey))
        return {
          rowKey,
          isEditable: true,
        };
      return {
        rowKey,
        isEditable: false,
      };
    },
    [editableKeys.join(',')],
  );

  /**
   * 进入编辑状态
   * @param rowKey
   */
  const setEditable = (rowKey: React.Key) => {
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'singe') {
      message.warn('只能同时编辑一行！');
      return;
    }
    editableKeysSet.add(rowKey);
    setEditableRowKeys(Array.from(editableKeysSet));
  };
  /**
   * 退出编辑状态
   * @param rowKey
   */
  const cancelEditable = (rowKey: React.Key) => {
    editableKeysSet.delete(rowKey);
    setEditableRowKeys(Array.from(editableKeysSet));
  };

  const actionRender = useCallback(
    (row: RecordType & { index: number }, form: FormInstance<any>) => {
      const key = props.getRowKey(row, row.index);
      const dom = (props.actionRender || defaultActionRender)(row, {
        rowKey: key,
        cancelEditable,
        index: row.index,
        onDelete: async (
          rowKey: React.Key,
          editRow: RecordType & {
            index: number;
          },
        ) => {
          const actionProps = {
            data: props.dataSource,
            getRowKey: props.getRowKey,
            row: editRow,
            key: rowKey,
            childrenColumnName: props.childrenColumnName || 'children',
          };
          props.setDataSource(editableRowByKey(actionProps, 'delete'));
          return props?.onDelete?.(rowKey, editRow);
        },
        onSave: async (
          rowKey: React.Key,
          editRow: RecordType & {
            index: number;
          },
        ) => {
          const actionProps = {
            data: props.dataSource,
            getRowKey: props.getRowKey,
            row: editRow,
            key: rowKey,
            childrenColumnName: props.childrenColumnName || 'children',
          };
          props.setDataSource(editableRowByKey(actionProps, 'update'));
          return props?.onSave?.(rowKey, editRow);
        },
        form,
        editableKeys,
        setEditableRowKeys,
      });
      return dom;
    },
    [editableKeys.join(',')],
  );

  return {
    editableKeys,
    setEditableRowKeys,
    isEditable,
    actionRender,
    setEditable,
    cancelEditable,
  };
}

export type UseEditableType = typeof useEditable;

export type UseEditableUtilType = ReturnType<UseEditableType>;

export default useEditable;
