import type { GetRowKey } from 'antd/lib/table/interface';
import React, { useMemo } from 'react';
import { ParamsType } from '../../../provider';
import { ProColumns } from '../../typing';
import EditableProTable, { EditableProTableProps } from './index';

export function RowEditorTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: EditableProTableProps<DataType, Params, ValueType>) {
  const [editableKeys, setEditableRowKeys] = React.useState<React.Key[]>([]);

  const rowKey = props.rowKey || 'id';

  // ============================ RowKey ============================
  const getRowKey = React.useMemo<GetRowKey<any>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: DataType, index?: number) => {
      if (index === -1) {
        return (record as any)?.[rowKey as string];
      }
      // 如果 props 中有name 的话，用index 来做行号，这样方便转化为 index
      if (props.name) {
        return index?.toString();
      }
      return (record as any)?.[rowKey as string] ?? index?.toString();
    };
  }, [props.name, rowKey]);

  // 缓存 columns 避免每次 render 生成全新数组触发 antd Table 大面积 diff
  const columns = useMemo(
    () =>
      (props?.columns?.map((item) => ({
        ...item,
        onCell: (record: any, rowIndex: any) => ({
          onDoubleClick: () => {
            setEditableRowKeys([getRowKey(record, rowIndex)]);
          },
          onBlur: () => {
            setEditableRowKeys([]);
          },
        }),
      })) as ProColumns<any, ValueType>[]) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.columns, getRowKey],
  );

  return (
    <EditableProTable
      bordered
      pagination={false}
      {...props}
      editable={{
        editableKeys,
        ...props.editable,
      }}
      columns={columns}
    />
  );
}
