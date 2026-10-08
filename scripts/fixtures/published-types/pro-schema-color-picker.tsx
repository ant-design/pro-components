import type { ProColumns, ProFormColumnsType } from '../../../src';
import { BetaSchemaForm } from '../../../src';
import type { AggregationColor } from '../../../src/utils/antdTypes';

/**
 * #8740:valueType="color" 路径(ProColumns / BetaSchemaForm columns)
 * 的 fieldProps.onChange 也应兼容 AggregationColor 签名。
 */
const columns: ProFormColumnsType<any>[] = [
  {
    title: '颜色',
    dataIndex: 'color',
    valueType: 'color',
    fieldProps: {
      disabledAlpha: true,
      onChange: (color: AggregationColor) => {
        console.log(color.toHexString());
      },
    },
  },
];

export function SchemaColorTyped() {
  return <BetaSchemaForm columns={columns} />;
}

const tableColumns: ProColumns<any>[] = [
  {
    title: '颜色',
    dataIndex: 'color',
    valueType: 'color',
    fieldProps: {
      onChange: (color: AggregationColor) => {
        console.log(color.toHexString());
      },
    },
  },
];

export function useTableColumns() {
  return tableColumns;
}
