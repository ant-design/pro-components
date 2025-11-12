/* eslint-disable react-hooks/exhaustive-deps */ import {
  get,
  useMergedState,
} from '@rc-component/util';
import { message } from 'antd';
import type React from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { useRefFunction } from '..';
import { useIntl } from '../../provider';
import type {
  ActionRenderConfig,
  ActionTypeText,
  NewLineConfig,
  RecordKey,
  RowEditableConfig,
} from '../useEditableArray';
import { defaultActionRender, recordKeyToString } from '../useEditableArray';

/**
 * 显示警告信息
 * @param messageStr
 */
const warning = (messageStr: React.ReactNode) => {
  return message.warning(messageStr);
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
  /**
   * 点击开始编辑之前的保存数据用的
   */
  const preEditRowRef = useRef<RecordType | null>(null);

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
      editableType === 'single'
        ? editableKeys?.slice(0, 1) || []
        : editableKeys || [];
    return new Set(keys.map((key) => String(key)));
  }, [editableKeys, editableType]);

  /**
   * 检查 key 是否在编辑列表中
   * 使用 editableKeysSet 进行快速查找，性能更好
   */
  const checkKeyInEditableList = useRefFunction(
    (recordKey: RecordKey): boolean => {
      const keyStr = String(recordKeyToString(recordKey));
      return editableKeysSet.has(keyStr);
    },
  );

  /** 这行是不是编辑状态 */
  const isEditable = useCallback(
    (recordKey: RecordKey) => {
      return checkKeyInEditableList(recordKey);
    },
    [checkKeyInEditableList],
  );

  /**
   * 验证是否可以开始编辑
   */
  const validateCanStartEdit = useRefFunction((): boolean => {
    // 如果是单行模式，检查是否已有编辑中的行
    if (editableType === 'single' && editableKeys && editableKeys.length > 0) {
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
   * 进入编辑状态
   *
   * @param recordKey
   * @param recordValue
   */
  const startEditable = useRefFunction(
    (recordKey: RecordKey, recordValue?: any): boolean => {
      // 验证是否可以开始编辑
      if (!validateCanStartEdit()) {
        return false;
      }

      const keyStr = String(recordKeyToString(recordKey));

      // 检查是否已经在编辑列表中，避免重复添加
      if (checkKeyInEditableList(recordKey)) {
        return true;
      }

      // 保存编辑前的数据
      preEditRowRef.current =
        recordValue ??
        get(
          props.dataSource,
          Array.isArray(recordKey)
            ? (recordKey as string[])
            : [recordKey as string],
        ) ??
        null;

      // 更新编辑 keys（不直接修改 editableKeysSet）
      const newKeys =
        editableType === 'single'
          ? [keyStr]
          : [...(editableKeys || []), keyStr];

      setEditableRowKeys(newKeys);
      return true;
    },
  );

  /**
   * 退出编辑状态
   *
   * @param recordKey
   */
  const cancelEditable = useRefFunction((recordKey: RecordKey): boolean => {
    const keyStr = String(recordKeyToString(recordKey));

    // 检查是否在编辑列表中
    if (!checkKeyInEditableList(recordKey)) {
      return true;
    }

    // 更新编辑 keys（不直接修改 editableKeysSet）
    const newKeys = (editableKeys || []).filter(
      (key) => String(key) !== keyStr,
    );

    setEditableRowKeys(newKeys);
    return true;
  });

  /**
   * 取消编辑的回调
   */
  const onCancel = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
      originRow: RecordType & { index?: number },
      newLine?: NewLineConfig<any>,
    ): Promise<boolean> => {
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
    },
  );

  /**
   * 保存编辑的回调
   */
  const onSave = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
      originRow: RecordType & {
        index?: number;
      },
    ): Promise<boolean> => {
      const success = await props?.onSave?.(recordKey, editRow, originRow);
      if (success === false) {
        return false;
      }

      // 先退出编辑状态
      await cancelEditable(recordKey);

      // 更新数据源
      const actionProps = {
        data: props.dataSource,
        row: editRow,
        key: recordKey,
        childrenColumnName: props.childrenColumnName || 'children',
      };
      props.setDataSource(editableRowByKey(actionProps));
      return true;
    },
  );

  const saveText = intl.getMessage('editableTable.action.save', '保存');
  const deleteText = intl.getMessage('editableTable.action.delete', '删除');
  const cancelText = intl.getMessage('editableTable.action.cancel', '取消');

  /**
   * 渲染操作按钮
   */
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
        preEditRowRef,
        deleteText,
        deletePopconfirmMessage: `${intl.getMessage(
          'deleteThisLine',
          '删除此项',
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
    [editableKeys, props.dataSource, cancelEditable, onCancel, onSave],
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
