import React, { useCallback, useMemo, useState } from 'react';
import { GetRowKey } from 'antd/lib/table/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { FormInstance } from 'antd/lib/form';
import { LoadingOutlined } from '@ant-design/icons';

export type RowEditorType = 'singe' | 'multiple';

export type ActionRenderConfig<T> = {
  editorRowKeys?: React.Key[];
  rowKey: React.Key;
  form: FormInstance<any>;
  cancelEditor: (key: React.Key) => void;
  onRowSave?: (row: T) => Promise<void>;
  setEditorRowKeys: (value: React.Key[]) => void;
};
export type ActionRenderFunction<T> = (row: T, config: ActionRenderConfig<T>) => React.ReactNode[];

export interface TableRowEditor<T> {
  type?: RowEditorType;
  editorRowKeys?: React.Key[];
  actionRender?: ActionRenderFunction<T>;
  onRowSave?: (row: T) => Promise<void>;
  onChange?: (editorRowKeys: React.Key[], editorRows: T[]) => void;
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
          const fields = await form.validateFields();
          onRowSave?.({ ...row, ...fields });
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
  props: TableRowEditor<RecordType> & { getRowKey: GetRowKey<RecordType> },
) {
  const editorType = props.type || 'singe';
  const [editorRowKeys, setEditorRowKeys] = useMergedState<React.Key[]>([], {
    value: props.editorRowKeys,
    onChange: props.onChange
      ? (keys) => {
          props?.onChange?.(keys, []);
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
      const key = props.getRowKey(row, row.index);
      if (editorRowKeys.includes(key)) return true;
      return false;
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
        onRowSave: props.onRowSave,
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
