import React, { useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable, { ProColumns, zhCNIntl, ActionType, ConfigProvider } from '@ant-design/pro-table';

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
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: item.status !== 'error' ? 'active' : 'exception',
    }),
    width: 200,
  },
  {
    title: '更新时间',
    key: 'since2',
    width: 120,
    dataIndex: 'createdAt',
    valueType: 'date',
  },
];

export default () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  useEffect(() => {
    let id = 0;
    const loop = () => {
      id = window.setTimeout(() => {
        const { current } = actionRef;
        if (current) {
          current.reload();
        }
      }, 1000);
    };
    loop();
    return () => {
      window.clearTimeout(id);
    };
  }, []);

  return (
    <ConfigProvider
      value={{
        intl: zhCNIntl,
        postData: (data) => {
          console.log(data);
          return {
            data: data?.list || [],
            success: true,
            total: data?.list?.length,
          };
        },
      }}
    >
      <ProTable<TableListItem>
        columns={columns}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        actionRef={actionRef}
        // @ts-expect-error
        request={async () => {
          return {
            list: tableListDataSource as any,
          };
        }}
        dateFormatter="string"
        headerTitle="ConfigProvider"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />

      <ProTable<TableListItem>
        columns={columns}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        actionRef={actionRef}
        // @ts-expect-error
        request={async () => {
          return {
            list: tableListDataSource as any,
          };
        }}
        headerTitle="ConfigProvider"
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};
