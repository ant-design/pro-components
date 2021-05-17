import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

const valueEnumMap = {
  0: 'running',
  1: 'online',
  2: 'error',
};

export type TableListItem = {
  key: number;
  status: string | number;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    status: valueEnumMap[Math.floor(Math.random() * 10) % 3],
  });
}

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  running: { text: '运行中', status: 'Processing' },
  online: { text: '已上线', status: 'Success' },
  error: { text: '异常', status: 'Error' },
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '状态',
    key: 'select',
    valueType: 'select',
    dataIndex: 'status',
    initialValue: ['all'],
    width: 100,
    valueEnum,
  },
  {
    title: '单选状态',
    key: 'radio',
    dataIndex: 'status',
    valueType: 'radio',
    initialValue: 'all',
    width: 100,
    valueEnum,
  },
  {
    key: 'radioButton',
    title: '单选按钮状态',
    dataIndex: 'status',
    valueType: 'radioButton',
    initialValue: 'all',
    width: 100,
    valueEnum,
  },
  {
    key: 'status',
    title: '多选状态',
    dataIndex: 'status',
    initialValue: ['all'],
    width: 100,
    valueType: 'checkbox',
    valueEnum,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, row, index, action) => [
      <a
        key="a"
        onClick={() => {
          action?.startEditable(row.key);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => (
  <>
    <ProTable<TableListItem>
      columns={columns}
      request={() => {
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      search={{
        defaultCollapsed: false,
        span: 12,
        labelWidth: 'auto',
      }}
      rowKey="key"
      headerTitle="样式类"
    />
  </>
);
