import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';

import {
  DEMO_APP_NAMES,
  DEMO_CREATORS,
  DEMO_CREATOR_VALUE_ENUM,
  FIXED_BASE_TIMESTAMP,
} from '../mockData';

export type Status = {
  color: string;
  text: string;
};

const statusMap: Record<string, Status> = {
  0: {
    color: 'blue',
    text: '部署中',
  },
  1: {
    color: 'green',
    text: '运行正常',
  },
  2: {
    color: 'volcano',
    text: '性能告警',
  },
  3: {
    color: 'red',
    text: '运行异常',
  },
  4: {
    color: '',
    text: '待部署',
  },
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};

const tableListDataSource: TableListItem[] = Array.from(
  { length: 5 },
  (_, i) => ({
    key: i,
    name: DEMO_APP_NAMES[i % DEMO_APP_NAMES.length],
    containers: ((i * 3 + 2) % 12) + 1,
    creator: DEMO_CREATORS[i % DEMO_CREATORS.length],
    status: statusMap[String(i % 5)],
    createdAt: FIXED_BASE_TIMESTAMP - i * 86400000,
  }),
);

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    width: 140,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'status',
    render: (_, record) => (
      <Tag color={record.status.color}>{record.status.text}</Tag>
    ),
  },
  {
    title: '容器数量',
    width: 100,
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '负责人',
    width: 100,
    dataIndex: 'creator',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
];

const expandedRowRender = () => {
  const data = [
    {
      key: 0,
      date: '2024-01-15 08:30:00',
      name: '版本发布 v2.3.1',
      upgradeNum: '已更新 3 个实例',
    },
    {
      key: 1,
      date: '2024-01-14 16:20:00',
      name: '配置变更 - 数据库连接池',
      upgradeNum: '已更新 5 个实例',
    },
    {
      key: 2,
      date: '2024-01-13 10:15:00',
      name: '扩容 - 新增 2 个节点',
      upgradeNum: '已更新 2 个实例',
    },
  ];
  return (
    <ProTable
      columns={[
        { title: '操作时间', dataIndex: 'date', key: 'date' },
        { title: '变更内容', dataIndex: 'name', key: 'name' },
        { title: '更新状态', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="rollback">回滚</a>, <a key="detail">详情</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

const Demo = () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          total: tableListDataSource.length,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
      headerTitle="应用部署记录"
      options={false}
      toolBarRender={() => [
        <Button key="log">查看日志</Button>,
        <Button key="export">
          导出数据
          <DownOutlined />
        </Button>,
        <Button key="primary" type="primary">
          部署应用
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
