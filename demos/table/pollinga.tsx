import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import {
  DEMO_STATUS_VALUE_ENUM,
  DEMO_VALUE_ENUM,
  FIXED_BASE_TIMESTAMP,
} from '../mockData';

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
};

const tableListDataSource: TableListItem[] = Array.from(
  { length: 2 },
  (_, i) => ({
    key: i,
    name: i === 0 ? '用户认证服务' : '支付网关',
    status: DEMO_VALUE_ENUM[(i % 4) as keyof typeof DEMO_VALUE_ENUM],
    updatedAt: FIXED_BASE_TIMESTAMP - (i * 500 + 100),
    createdAt: FIXED_BASE_TIMESTAMP - (i * 1000 + 200),
    money: ((i * 3456 + 7890) % 50000) * 100,
    progress: ((i * 17 + 23) % 100) + 1,
  }),
);

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
    valueEnum: DEMO_STATUS_VALUE_ENUM,
  },
  {
    title: '部署进度',
    key: 'progress',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: item.status !== 'error' ? 'active' : 'exception',
    }),
  },
  {
    title: '时间',
    key: 'since',
    children: [
      {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        valueType: 'date',
      },
      {
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        valueType: 'date',
      },
    ],
  },
];

const Demo = () => {
  const [time, setTime] = useState(() => FIXED_BASE_TIMESTAMP);
  const [polling, setPolling] = useState<number>(2000);
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      polling={polling}
      request={async () => {
        await timeAwait(2000);
        setTime(FIXED_BASE_TIMESTAMP);
        return {
          data: tableListDataSource,
          success: true,
          total: tableListDataSource.length,
        };
      }}
      dateFormatter="string"
      headerTitle={`上次更新时间：${dayjs(time).format('HH:mm:ss')}`}
      toolBarRender={() => [
        <Button
          key="polling"
          type="primary"
          onClick={() => {
            if (polling) {
              setPolling(0);
              return;
            }
            setPolling(2000);
          }}
        >
          {polling ? <LoadingOutlined /> : <ReloadOutlined />}
          {polling ? '停止轮询' : '开始轮询'}
        </Button>,
      ]}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
