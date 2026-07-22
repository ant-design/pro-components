import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Switch } from 'antd';
import React, { useRef, useState } from 'react';

const valueEnum: Record<number, string> = {
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

for (let i = 0; i < 5; i += 1) {
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
    title: '名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
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
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '进度',
    dataIndex: 'progress',
    valueType: 'progress',
  },
  {
    title: '金额',
    dataIndex: 'money',
    valueType: 'money',
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="link2">报警</a>,
      <a key="link3">监控</a>,
    ],
  },
];

const Demo = () => {
  const actionRef = useRef<ActionType>();
  const [bordered, setBordered] = useState(false);

  return (
    <>
      <Space style={{ marginBlockEnd: 16 }}>
        <span>卡片边框:</span>
        <Switch checked={bordered} onChange={setBordered} />
      </Space>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered={bordered}
        request={async () => {
          return {
            data: tableListDataSource,
            success: true,
          };
        }}
        rowKey="key"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="基础表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </>
  );
};

export default Demo;
