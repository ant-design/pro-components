import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import React from 'react';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export interface TableListItem {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
}
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    renameKey: 'state',
    width: 100,
    filters: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '进度',
    key: 'progress',
    renameKey: 'schedule',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: item.status !== 'error' ? 'active' : 'exception',
    }),
    width: 200,
  },
  {
    title: '更新时间',
    key: 'since',
    width: 120,
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    renameKey: ['startTime', 'endTime'],
  },
  {
    title: '更新时间2',
    hideInTable: true,
    key: 'since2',
    valueType: 'time',
    renameKey: 'createdAt2',
  },
  {
    title: '更新时间3',
    hideInTable: true,
    key: 'since3',
    valueType: 'dateTime',
    renameKey: ['createdAt3'],
  },
  {
    title: '更新时间4',
    hideInTable: true,
    key: 'since4',
    valueType: 'dateTimeRange',
    renameKey: ['createStartTime', 'createEndTime'],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      request={() =>
        Promise.resolve({
          data: tableListDataSource,
          success: true,
        })
      }
      pagination={{
        showSizeChanger: true,
      }}
      onSubmit={(values) => {
        console.log('onSubmit values:', values);
      }}
      dateFormatter="string"
      headerTitle="重命名查询表单字段"
      toolBarRender={() => [
        <Button key="3" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />
  );
};
