import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Input, Tooltip } from 'antd';
import { useState } from 'react';

import { DEMO_APP_NAMES, DEMO_CREATORS, FIXED_BASE_TIMESTAMP } from '../mockData';

const valueEnum: Record<string, string> = {
  0: 'close',
  1: 'running',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
  statusText: string;
};

const tableListDataSource: TableListItem[] = Array.from(
  { length: 5 },
  (_, i) => ({
    key: i,
    name: DEMO_APP_NAMES[i % DEMO_APP_NAMES.length],
    containers: (i * 3 + 2) % 12 + 1,
    creator: DEMO_CREATORS[i % DEMO_CREATORS.length],
    status: valueEnum[String(i % 2)],
    createdAt: FIXED_BASE_TIMESTAMP - i * 86400000,
    money: ((i * 3456 + 7890) % 50000) * 100,
    progress: ((i * 17 + 23) % 100) + 1,
    memo:
      i % 2 === 1
        ? '核心服务，承载全站用户登录与鉴权，高峰期需要关注性能指标'
        : '日常运维中，当前运行状态正常',
    statusText: i % 2 === 0 ? '已关闭，等待重新部署' : '运行中，CPU 占用 35%',
  }),
);

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 188, marginBottom: 8, display: 'block' }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'close',
    valueType: 'radioButton',
    valueEnum: {
      close: { text: '已关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
    },
  },
  {
    title: (
      <>
        部署时间
        <Tooltip placement="top" title="最近一次部署的时间">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
];

const Demo = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('close');

  const closeColumns: ProColumns<TableListItem>[] = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '停机信息',
      dataIndex: 'statusText',
    },
    ...columns,
  ];

  const runningColumns: ProColumns<TableListItem>[] = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '运行信息',
      dataIndex: 'statusText',
    },
    ...columns,
  ];
  return (
    <ProTable<TableListItem>
      columns={currentStatus === 'close' ? closeColumns : runningColumns}
      request={() => {
        return Promise.resolve({
          data: tableListDataSource,
          total: tableListDataSource.length,
          success: true,
        });
      }}
      rowKey="key"
      search={{
        layout: 'vertical',
        defaultCollapsed: false,
      }}
      onSubmit={({ status }) => {
        setCurrentStatus(status);
      }}
      columnsState={{
        persistenceKey: `table_dynamic_status_${currentStatus}`,
        persistenceType: 'sessionStorage',
      }}
      dateFormatter="string"
      toolbar={{
        title: '动态列状态',
        tooltip: '根据状态切换动态显示不同列',
      }}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
