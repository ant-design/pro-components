import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import type { AnyObject } from '../../src/utils/antdTypes';

interface TableColumn {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const dataSource: TableColumn[] = [
  {
    key: '1',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园 1 号',
    tags: ['前端', '资深'],
  },
  {
    key: '2',
    name: '李大钊',
    age: 32,
    address: '西湖区湖底公园 1 号',
    tags: ['前端', '资深'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '西湖区湖底公园 2 号',
    tags: ['后端'],
  },
];

const columns: ProColumns<TableColumn, AnyObject>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    // 合并单元格：返回 colSpan/rowSpan，为 0 时该单元格不渲染
    onCell: (_, index = 0) => {
      // 第一行年龄向下合并一格
      if (index === 0) return { rowSpan: 2 };
      if (index === 1) return { rowSpan: 0 };
      return {};
    },
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    onCell: (_, index = 0) => {
      // 地址列整体合并为一列
      if (index === 0) return { rowSpan: 3 };
      return { rowSpan: 0 };
    },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: (_, record) => record.tags.join(' / '),
  },
];

export default () => (
  <ProTable<TableColumn>
    columns={columns}
    dataSource={dataSource}
    rowKey="key"
    search={false}
    options={false}
    pagination={false}
  />
);
