import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';

import {
  createTableDataSource,
  DEMO_CREATOR_VALUE_ENUM,
  DEMO_STATUS_VALUE_ENUM,
} from '../mockData';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

const tableListDataSource = createTableDataSource({
  count: 5,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    width: 120,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '状态',
    width: 80,
    dataIndex: 'status',
    initialValue: 'all',
    valueEnum: DEMO_STATUS_VALUE_ENUM,
  },
  {
    title: '负责人',
    width: 80,
    dataIndex: 'creator',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="detail">详情</a>,
      <a key="log">日志</a>,
      <a key="monitor">监控</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'restart', name: '重启' },
          { key: 'delete', name: '下线' },
        ]}
      />,
    ],
  },
];

const Demo = () => {
  return (
    <ProTable<TableListItem>
      dataSource={tableListDataSource}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      headerTitle="微服务应用列表"
      toolBarRender={() => [
        <Button key="log">查看日志</Button>,
        <Button key="export">
          导出数据
          <DownOutlined />
        </Button>,
        <Button type="primary" key="primary">
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
