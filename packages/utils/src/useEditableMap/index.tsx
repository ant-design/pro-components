/* eslint-disable react-hooks/exhaustive-deps */
import { useIntl } from '@ant-design/pro-provider';
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
 * 兼容antd@4 和 antd@5 的warning
 * @param messageStr
 */
const warning = (messageStr: React.ReactNode) => {
  // @ts-ignore
  return (message.warn || message.warning)(messageStr);
};
/**
 * 使用map 来删除数据，性能一般 但是准确率比较高
 *
 * @param params
 * @param action
 */
function editableRowByKey<RecordType>({
  data,
  row,
}: {
  data: RecordType;
  row: RecordType;
}) {
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
export function useEditableMap<RecordType>(
  props: RowEditableConfig<RecordType> & {
    dataSource: RecordType;
    childrenColumnName?: string;
    setDataSource: (dataSource: RecordType) => void;
  },
) {
  const editableType = props.type || 'single';

  // Internationalization
  const intl = useIntl();

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
    const keys =
      editableType === 'single' ? editableKeys?.slice(0, 1) : editableKeys;
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
      warning(
        props.onlyOneLineEditorAlertMessage ||
          intl.getMessage(
            'editableTable.onlyOneLineEditor',
            '只能同时编辑一行',
          ),
      );
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
    const success = await props?.onCancel?.(
      recordKey,
      editRow,
      originRow,
      newLine,
    );
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

  const saveText = intl.getMessage('editableTable.action.save', '保存');
  const deleteText = intl.getMessage('editableTable.action.delete', '删除');
  const cancelText = intl.getMessage('editableTable.action.cancel', '取消');

  const actionRender = useCallback(
    (key: RecordKey, config?: ActionTypeText<RecordType>) => {
      const renderConfig: ActionRenderConfig<
        RecordType,
        NewLineConfig<RecordType>
      > = {
        recordKey: key,
        cancelEditable,
        onCancel,
        onSave,
        editableKeys,
        setEditableRowKeys,
        saveText,
        cancelText,
        deleteText,
        deletePopconfirmMessage: `${intl.getMessage(
          'deleteThisLine',
          '删除此行',
        )}?`,
        editorType: 'Map',
        ...config,
      };

      const renderResult = defaultActionRender(props.dataSource, renderConfig);
      if (props.actionRender) {
        return props.actionRender(props.dataSource, renderConfig, {
          save: renderResult.save,
          delete: renderResult.delete,
          cancel: renderResult.cancel,
        });
      }
      return [renderResult.save, renderResult.delete, renderResult.cancel];
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
