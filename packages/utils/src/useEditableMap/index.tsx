/* eslint-disable react-hooks/exhaustive-deps */
import { useIntl } from '@ant-design/pro-provider';
import type { FormInstance } from 'antd';
import { message } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import type {
  ActionRenderConfig,
  ActionTypeText,
  NewLineConfig,
  RecordKey,
  RowEditableConfig,
} from '../useEditableArray';
import { defaultActionRender, recordKeyToString } from '../useEditableArray';

/**
 * 使用map 来删除数据，性能一般 但是准确率比较高
 *
 * @param params
 * @param action
 */
function editableRowByKey<RecordType>({ data, row }: { data: RecordType; row: RecordType }) {
  return { ...data, ...row };
}

export type AddLineOptions = {
  position?: 'top' | 'bottom';
  recordKey?: React.Key;
};

/**
 * 一个方便的hooks 用于维护编辑的状态
 *
 * @param props
 */
function useEditableMap<RecordType>(
  props: RowEditableConfig<RecordType> & {
    dataSource: RecordType;
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType) => void;
  },
) {
  const editableType = props.type || 'single';

  const [editableKeys, setEditableRowKeys] = useMergedState<React.Key[]>([], {
    value: props.editableKeys,
    onChange: props.onChange
      ? (keys) => {
          props?.onChange?.(
            // 计算编辑的key
            keys,
            props.dataSource,
          );
        }
      : undefined,
  });
  /** 一个用来标志的set 提供了方便的 api 来去重什么的 */
  const editableKeysSet = useMemo(() => {
    const keys = editableType === 'single' ? editableKeys?.slice(0, 1) : editableKeys;
    return new Set(keys);
  }, [(editableKeys || []).join(','), editableType]);

  /** 这行是不是编辑状态 */
  const isEditable = useCallback(
    (recordKey: RecordKey) => {
      if (editableKeys?.includes(recordKeyToString(recordKey))) return true;
      return false;
    },
    [(editableKeys || []).join(',')],
  );

  /**
   * 进入编辑状态
   *
   * @param recordKey
   */
  const startEditable = (recordKey: RecordKey) => {
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'single') {
      message.warning(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行');
      return false;
    }
    editableKeysSet.add(recordKeyToString(recordKey));
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
    editableKeysSet.delete(recordKeyToString(recordKey));
    setEditableRowKeys(Array.from(editableKeysSet));
    return true;
  };

  const onCancel = async (
    recordKey: RecordKey,
    editRow: RecordType & {
      index?: number;
    },
    originRow: RecordType & { index?: number },
    newLine?: NewLineConfig<any>,
  ) => {
    const success = await props?.onCancel?.(recordKey, editRow, originRow, newLine);
    if (success === false) {
      return false;
    }
    return true;
  };

  const onSave = async (
    recordKey: RecordKey,
    editRow: RecordType & {
      index?: number;
    },
    originRow: RecordType & {
      index?: number;
    },
  ) => {
    const success = await props?.onSave?.(recordKey, editRow, originRow);
    if (success === false) {
      return false;
    }
    cancelEditable(recordKey);
    const actionProps = {
      data: props.dataSource,
      row: editRow,
      key: recordKey,
      childrenColumnName: props.childrenColumnName || 'children',
    };
    props.setDataSource(editableRowByKey(actionProps));
    return true;
  };

  // Internationalization
  const intl = useIntl();
  const saveText = intl.getMessage('editableTable.action.save', '保存');
  const deleteText = intl.getMessage('editableTable.action.delete', '删除');
  const cancelText = intl.getMessage('editableTable.action.cancel', '取消');

  const actionRender = useCallback(
    (key: RecordKey, form: FormInstance<any>, config?: ActionTypeText<RecordType>) => {
      const renderConfig: ActionRenderConfig<RecordType, NewLineConfig<RecordType>> = {
        recordKey: key,
        cancelEditable,
        onCancel,
        onSave,
        editableKeys,
        setEditableRowKeys,
        form,
        saveText,
        cancelText,
        deleteText,
        deletePopconfirmMessage: '删除此行？',
        editorType: 'Map',
        ...config,
      };

      const defaultDoms = defaultActionRender(props.dataSource, renderConfig);
      if (props.actionRender) {
        return props.actionRender(props.dataSource, renderConfig, {
          save: defaultDoms[0],
          delete: defaultDoms[1],
          cancel: defaultDoms[2],
        });
      }
      return defaultDoms;
    },
    [editableKeys && editableKeys.join(','), props.dataSource],
  );

  return {
    editableKeys,
    setEditableRowKeys,
    isEditable,
    actionRender,
    startEditable,
    cancelEditable,
  };
}

export type UseEditableMapType = typeof useEditableMap;

export type UseEditableMapUtilType = ReturnType<UseEditableMapType>;

export default useEditableMap;
