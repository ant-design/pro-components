import { useControlledState } from '@rc-component/util';
import React, { useCallback, useMemo, useRef } from 'react';
import { ParamsType } from '../../../provider';
import { useRefFunction } from '../../../utils';
import { ProColumns } from '../../typing';
import {
  buildEditableTableRowKey,
  resolveEditingPayloadForRowEditableOnChange,
} from '../../utils';
import EditableProTable, { EditableProTableProps } from './index';

export function RowEditorTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: EditableProTableProps<DataType, Params, ValueType>) {
  const [editableKeys, setEditableRowKeys] = useControlledState<React.Key[]>(
    () => props.editable?.editableKeys ?? [],
    props.editable?.editableKeys,
  );

  // 用于延迟退出编辑的定时器，避免 Tab 切换字段时误关编辑态
  const blurTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const rowKey = props.rowKey || 'id';

  // ============================ RowKey ============================
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRowKey = useMemo(
    () => buildEditableTableRowKey<DataType>(rowKey, props.name),
    [props.name, rowKey],
  );

  const handleEditableKeysChange = useRefFunction((keys: React.Key[]) => {
    const cleanKeys = keys.filter((key) => key !== undefined);
    setEditableRowKeys(cleanKeys);
    const editingPayload = resolveEditingPayloadForRowEditableOnChange(
      cleanKeys,
      props.value as readonly DataType[] | undefined,
      getRowKey,
      props.editable?.type,
    );
    props.editable?.onChange?.(cleanKeys, editingPayload);
  });

  const scheduleExitEditing = useCallback(() => {
    // 延迟退出编辑态：如果焦点在同一行内的字段间切换（Tab），
    // 新字段的 onFocus 会在 blur 的 setTimeout 回调之前触发，
    // 从而取消定时器、保持编辑态。
    blurTimerRef.current = setTimeout(() => {
      handleEditableKeysChange([]);
    }, 150);
  }, [handleEditableKeysChange]);

  const cancelExitEditing = useCallback(() => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = undefined;
    }
  }, []);

  // 缓存 columns 避免每次 render 生成全新数组触发 antd Table 大面积 diff
  const columns = useMemo(
    () =>
      (props?.columns?.map((item) => ({
        ...item,
        onCell: (record: any, rowIndex: any) => ({
          onDoubleClick: () => {
            cancelExitEditing();
            handleEditableKeysChange([getRowKey(record, rowIndex)]);
          },
          onBlur: scheduleExitEditing,
          onFocus: cancelExitEditing,
        }),
      })) as ProColumns<any, ValueType>[]) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      props.columns,
      getRowKey,
      scheduleExitEditing,
      cancelExitEditing,
      handleEditableKeysChange,
    ],
  );

  return (
    <EditableProTable
      bordered
      pagination={false}
      {...props}
      editable={{
        ...props.editable,
        editableKeys,
      }}
      columns={columns}
    />
  );
}
