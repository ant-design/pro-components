import React, { useCallback, useMemo, useState } from 'react';
import { GetRowKey } from 'antd/lib/table/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { FormInstance } from 'antd/lib/form';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import { LoadingOutlined } from '@ant-design/icons';

export type RowEditorType = 'singe' | 'multiple';

export type ActionRenderFunction<T> = (row: T, config: ActionRenderConfig<T>) => React.ReactNode[];

export interface TableRowEditor<T> {
  /**
   * @name 编辑的类型，暂时只支持单选
   */
  type?: RowEditorType;
  /**
   * @name 正在编辑的列
   */
  editorRowKeys?: React.Key[];
  /**
   * @name 自定义编辑的操作
   */
  actionRender?: ActionRenderFunction<T>;

  /**
   * 行保存的时候
   */
  onRowSave?: (key: React.Key, row: T & { index: number }) => Promise<void>;
  /**
   * 正在编辑的列修改的时候
   */
  onChange?: (editorRowKeys: React.Key[], editorRows: T[]) => void;
}

export type ActionRenderConfig<T> = {
  editorRowKeys?: TableRowEditor<T>['editorRowKeys'];
  rowKey: React.Key;
  index: number;
  form: FormInstance<any>;
  cancelEditor: (key: React.Key) => void;
  onRowSave: TableRowEditor<T>['onRowSave'];
  setEditorRowKeys: (value: React.Key[]) => void;
};

function editorRowByKey<RecordType>(params: {
  data: RecordType[];
  childrenColumnName: string;
  getRowKey: GetRowKey<RecordType>;
  key: React.Key;
  row: RecordType;
}) {
  const { getRowKey, key, row, data, childrenColumnName } = params;
  const kvMap = new Map<React.Key, RecordType>();

  /* eslint-disable no-inner-declarations */
  function dig(records: RecordType[]) {
    records.forEach((record, index) => {
      const rowKey = getRowKey(record, index);
      kvMap.set(rowKey, record);

      if (record && typeof record === 'object' && childrenColumnName in record) {
        dig((record as any)[childrenColumnName] || []);
      }
    });
  }
  dig(data);
  kvMap.set(key, row);

  const source: RecordType[] = [];
  kvMap.forEach((value) => source.push(value));
  return source;
}

const SaveEditorAction: React.FC<ActionRenderConfig<any> & { row: any }> = ({
  rowKey,
  onRowSave,
  form,
  row,
  cancelEditor,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <a
      key="save"
      onClick={async () => {
        try {
          setLoading(true);
          await form.validateFields([rowKey]);
          const fields = form.getFieldValue([rowKey]);
          onRowSave?.(rowKey, { ...row, ...fields });
          form.resetFields([rowKey]);
          cancelEditor(rowKey);
          setLoading(false);
        } catch {
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

const defaultActionRender: ActionRenderFunction<any> = (row, config) => {
  const { rowKey, cancelEditor } = config;
  return [
    <SaveEditorAction key="save" {...config} row={row} />,
    <a
      key="cancel"
      onClick={() => {
        cancelEditor(rowKey);
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
function useEditor<RecordType>(
  props: TableRowEditor<RecordType> & {
    getRowKey: GetRowKey<RecordType>;
    dataSource: RecordType[];
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType[]) => void;
  },
) {
  const editorType = props.type || 'singe';
  const [getRecordByKey] = useLazyKVMap(props.dataSource, 'children', props.getRowKey);

  const [editorRowKeys, setEditorRowKeys] = useMergedState<React.Key[]>([], {
    value: props.editorRowKeys,
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
  const editorRowKeysSet = useMemo(() => {
    const keys = editorType === 'singe' ? editorRowKeys.slice(0, 1) : editorRowKeys;
    return new Set(keys);
  }, [editorRowKeys.join(','), editorType]);

  /**
   * 这行是不是编辑状态
   */
  const isEditor = useCallback(
    (row: RecordType & { index: number }) => {
      const rowKey = props.getRowKey(row, row.index);
      if (editorRowKeys.includes(rowKey))
        return {
          rowKey,
          isEditor: true,
        };
      return {
        rowKey,
        isEditor: false,
      };
    },
    [editorRowKeys.join(',')],
  );

  /**
   * 进入编辑状态
   * @param rowKey
   */
  const setEditor = (rowKey: React.Key) => {
    editorRowKeysSet.add(rowKey);
    setEditorRowKeys(Array.from(editorRowKeysSet));
  };
  /**
   * 退出编辑状态
   * @param rowKey
   */
  const cancelEditor = (rowKey: React.Key) => {
    editorRowKeysSet.delete(rowKey);
    setEditorRowKeys(Array.from(editorRowKeysSet));
  };

  const actionRender = useCallback(
    (row: RecordType & { index: number; form: FormInstance<any> }) => {
      const key = props.getRowKey(row, row.index);
      const dom = (props.actionRender || defaultActionRender)(row, {
        rowKey: key,
        cancelEditor,
        index: row.index,
        onRowSave: async (
          rowKey: React.Key,
          saveRow: RecordType & {
            index: number;
          },
        ) => {
          props.setDataSource(
            editorRowByKey({
              data: props.dataSource,
              getRowKey: props.getRowKey,
              row: saveRow,
              key: rowKey,
              childrenColumnName: props.childrenColumnName || 'children',
            }),
          );
          return props?.onRowSave?.(rowKey, saveRow);
        },
        form: row.form,
        editorRowKeys,
        setEditorRowKeys,
      });
      return dom;
    },
    [editorRowKeys.join(',')],
  );

  return { editorRowKeys, setEditorRowKeys, isEditor, actionRender, setEditor, cancelEditor };
}

type UseEditorType = typeof useEditor;

export type UseEditorUtilType = ReturnType<UseEditorType>;

export default useEditor;
