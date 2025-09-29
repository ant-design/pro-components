import type { GetRowKey } from 'antd/es/table/interface';
import React from 'react';
import type { ParamsType } from '../../../provider';
import type { ProColumns } from '../../typing';
import type { EditableProTableProps } from './index';
import EditableProTable from './index';

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
  return (
    <EditableProTable
      bordered
      pagination={false}
      {...props}
      columns={
        (props?.columns?.map((item) => {
          return {
            ...item,
            onCell: (record: any, rowIndex: any) => {
              return {
                onDoubleClick: () => {
                  setEditableRowKeys([getRowKey(record, rowIndex)]);
                },
                onBlur: () => {
                  setEditableRowKeys([]);
                },
              };
            },
          };
        }) as ProColumns<any, ValueType>[]) || []
      }
      editable={{
        editableKeys,
        ...props.editable,
      }}
    />
  );
}
