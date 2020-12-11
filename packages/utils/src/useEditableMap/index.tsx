import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GetRowKey } from 'antd/lib/table/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { FormInstance } from 'antd/lib/form';
import { message } from 'antd';
import ReactDOM from 'react-dom';
import {
  ActionTypeText,
  defaultActionRender,
  NewLineConfig,
  RecordKey,
  recordKeyToString,
  RowEditableConfig,
} from '../useEditableArray';

/**
 * 使用map 来删除数据，性能一般
 * 但是准确率比较高
 * @param params
 * @param action
 */
function editableRowByKey<RecordType>(
  params: {
    data: RecordType;
    key: RecordKey;
    row: RecordType;
  },
  action: 'update' | 'delete',
) {
  const { row, data } = params;
  const key = recordKeyToString(params.key);
  const kvMap = new Map<React.Key, RecordType & { parentKey?: React.Key }>(
    Object.entries({ ...data, ...row }),
  );

  if (action === 'delete') {
    kvMap.delete(key);
  }
  return (Object.fromEntries(kvMap) as unknown) as RecordType;
}

export type AddLineOptions = {
  position?: 'top' | 'end';
  recordKey?: React.Key;
};

/**
 * 一个方便的hooks 用于维护编辑的状态
 * @param props
 */
function useEditableMap<RecordType>(
  props: RowEditableConfig<RecordType> & {
    getRowKey: GetRowKey<RecordType>;
    dataSource: RecordType;
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType) => void;
  },
) {
  const [newLineRecord, setNewLineRecord] = useState<NewLineConfig<any> | undefined>(undefined);
  const newLineRecordRef = useRef<NewLineConfig<any> | undefined>(undefined);

  // 这里这么做是为了存上次的状态，不然每次存一下再拿
  newLineRecordRef.current = newLineRecord;

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
    (recordKey: RecordKey) => {
      if (editableKeys.includes(recordKeyToString(recordKey))) return true;
      return false;
    },
    [editableKeys.join(',')],
  );

  /**
   * 进入编辑状态
   * @param recordKey
   */
  const startEditable = (recordKey: RecordKey) => {
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'single') {
      message.warn(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行！');
      return false;
    }
    editableKeysSet.add(recordKeyToString(recordKey));
    setEditableRowKeys(Array.from(editableKeysSet));
    return true;
  };

  /**
   * 退出编辑状态
   * @param recordKey
   */
  const cancelEditable = (recordKey: RecordKey) => {
    // 防止多次渲染
    ReactDOM.unstable_batchedUpdates(() => {
      /**
       * 如果这个是 new Line 直接删除
       */
      if (newLineRecord && newLineRecord.options.recordKey === recordKey) {
        setNewLineRecord(undefined);
      }
      editableKeysSet.delete(recordKeyToString(recordKey));
      setEditableRowKeys(Array.from(editableKeysSet));
    });
    return true;
  };

  const onCancel = async (
    recordKey: RecordKey,
    editRow: RecordType & {
      index: number;
    },
    isNewLine?: NewLineConfig<any>,
  ) => {
    const success = await props?.onCancel?.(recordKey, editRow, isNewLine);
    if (success === false) {
      return false;
    }
    return true;
  };

  const onDelete = async (
    recordKey: RecordKey,
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
    const success = await props?.onDelete?.(recordKey, editRow);
    if (success === false) {
      return false;
    }
    props.setDataSource(editableRowByKey(actionProps, 'delete'));
    return true;
  };

  const onSave = async (
    recordKey: RecordKey,
    editRow: RecordType & {
      index: number;
    },
    isNewLine?: NewLineConfig<any>,
  ) => {
    const { options } = isNewLine || {};
    const success = await props?.onSave?.(recordKey, editRow, isNewLine);
    if (success === false) {
      return false;
    }
    cancelEditable(recordKey);
    if (isNewLine) {
      if (options?.position === 'top') {
        props.setDataSource({ ...editRow, ...props.dataSource });
      } else {
        props.setDataSource({ ...props.dataSource, ...editRow });
      }
      return true;
    }
    const actionProps = {
      data: props.dataSource,
      row: editRow,
      key: recordKey,
      childrenColumnName: props.childrenColumnName || 'children',
    };
    props.setDataSource(editableRowByKey(actionProps, 'update'));
    return true;
  };

  const actionRender = useCallback(
    (key: RecordKey, form: FormInstance<any>, config?: ActionTypeText) =>
      (props.actionRender || defaultActionRender)(props.dataSource, {
        recordKey: recordKeyToString(key),
        cancelEditable,
        newLineConfig: newLineRecord,
        onCancel,
        onDelete,
        onSave,
        editableKeys,
        setEditableRowKeys,
        form,
        deletePopconfirmMessage: props.deletePopconfirmMessage || '删除此行？',
        editorType: 'Map',
        ...config,
      }),
    [editableKeys.join(',')],
  );

  /**
   * @name 增加新的行
   * @description 同时只能支持一行,取消之后数据消息，不会触发 dataSource
   * @param row
   * @param options
   */
  const addEditRecord = (
    recordKey: React.ReactText,
    defaultValue: any,
    options?: AddLineOptions,
  ) => {
    // 暂时不支持多行新增
    if (newLineRecordRef.current) {
      message.warn(props.onlyAddOneLineAlertMessage || '只能新增一行！');
      return false;
    }
    // 如果是单行的话，不允许多行编辑
    if (editableKeysSet.size > 0 && editableType === 'single') {
      message.warn(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行！');
      return false;
    }

    // 防止多次渲染
    ReactDOM.unstable_batchedUpdates(() => {
      editableKeysSet.add(recordKey);
      setEditableRowKeys(Array.from(editableKeysSet));
      setNewLineRecord({
        defaultValue,
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

export type UseEditableMapType = typeof useEditableMap;

export type UseEditableMapUtilType = ReturnType<UseEditableMapType>;

export default useEditableMap;
