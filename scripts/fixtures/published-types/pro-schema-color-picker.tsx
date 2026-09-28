import React from 'react';
import type { AggregationColor } from 'antd/es/color-picker/color';
import type { ProColumns } from '../../../src';
import { BetaSchemaForm, ProForm } from '../../../src';
import type { ProFormColumnsType } from '../../../src';

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
