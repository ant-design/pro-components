import type React from 'react';
import type { ParamsType } from '../../../provider';
import { useRefFunction } from '../../../utils';
import type { GetRowKey } from '../../../utils/antdTypes';
import { resolveEditingPayloadForRowEditableOnChange } from '../../utils';
import type { EditableProTableProps } from './index';

export function useEditableKeysChange<
  DataType extends Record<string, any>,
  Params extends ParamsType,
  ValueType,
>(
  props: EditableProTableProps<DataType, Params, ValueType>,
  getRowKey: GetRowKey<DataType>,
  setEditableRowKeys: (keys: React.Key[]) => void,
) {
  return useRefFunction((keys: React.Key[]) => {
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
}
