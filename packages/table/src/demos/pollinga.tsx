import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
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

const timeAwait = (waitTime: number): Promise<void> =>
  new Promise((res) =>
    window.setTimeout(() => {
      res();
    }, waitTime),
  );

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
    filters: true,
    onFilter: true,
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
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: item.status !== 'error' ? 'active' : 'exception',
    }),
  },
  {
    title: '更新时间',
    key: 'since2',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '创建时间',
    key: 'since2',
    dataIndex: 'createdAt',
    valueType: 'dateMonth',
  },
];

export default () => {
  const [time, setTime] = useState(() => Date.now());
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      polling={2000}
      request={async () => {
        await timeAwait(500);
        setTime(Date.now());
        return {
          data: tableListDataSource,
          success: true,
          total: tableListDataSource.length,
        };
      }}
      dateFormatter="string"
      headerTitle={`上次更新时间：${moment(time).format('HH:mm:ss')}`}
      toolBarRender={() => [
        <Button key="3" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />
  );
};
