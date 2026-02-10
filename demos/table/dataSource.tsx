import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';

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
  progress: number;
  money: number;
  memo: string;
};

const tableListDataSource = createTableDataSource({
  count: 5,
  withProgress: true,
  withMoney: true,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: '负责人',
    dataIndex: 'creator',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
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
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
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
      search={{
        layout: 'vertical',
        defaultCollapsed: false,
      }}
      dateFormatter="string"
      toolbar={{
        title: '应用管理',
        tooltip: '管理所有已部署的微服务应用',
      }}
      toolBarRender={() => [
        <Button key="danger" danger>
          批量下线
        </Button>,
        <Button key="log">查看日志</Button>,
        <Button type="primary" key="primary">
          部署应用
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              { label: '导入配置', key: 'import' },
              { label: '导出配置', key: 'export' },
              { label: '批量更新', key: 'batch' },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
