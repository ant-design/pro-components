import { PlusOutlined } from '@ant-design/icons';
import type {
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProDescriptions,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, Space, Tabs, Tag, message } from 'antd';
import { useState } from 'react';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const MOCK_ISSUES: GithubIssueItem[] = [
  {
    url: 'https://github.com/ant-design/pro-components/issues/1',
    id: 1,
    number: 1,
    title: 'ProTable 查询表单与可编辑表格联动',
    labels: [
      { name: 'bug', color: 'error' },
      { name: 'table', color: 'processing' },
    ],
    state: 'open',
    comments: 3,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-16T12:00:00Z',
  },
  {
    url: 'https://github.com/ant-design/pro-components/issues/2',
    id: 2,
    number: 2,
    title: 'ProForm 布局切换与只读模式',
    labels: [{ name: 'feature', color: 'success' }],
    state: 'closed',
    comments: 8,
    created_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-15T18:00:00Z',
    closed_at: '2024-01-15T18:00:00Z',
  },
  {
    url: 'https://github.com/ant-design/pro-components/issues/3',
    id: 3,
    number: 3,
    title: 'ProDescriptions 支持节点编辑',
    labels: [
      { name: 'docs', color: 'default' },
      { name: 'descriptions', color: 'processing' },
    ],
    state: 'open',
    comments: 1,
    created_at: '2024-01-13T08:00:00Z',
    updated_at: '2024-01-14T11:00:00Z',
  },
  {
    url: 'https://github.com/ant-design/pro-components/issues/4',
    id: 4,
    number: 4,
    title: 'Playground CRUD 三视图切换示例',
    labels: [{ name: 'demo', color: 'warning' }],
    state: 'closed',
    comments: 5,
    created_at: '2024-01-12T07:00:00Z',
    updated_at: '2024-01-13T16:00:00Z',
    closed_at: '2024-01-13T16:00:00Z',
  },
  {
    url: 'https://github.com/ant-design/pro-components/issues/5',
    id: 5,
    number: 5,
    title: 'LightFilter 工具栏扁平布局',
    labels: [{ name: 'bug', color: 'error' }],
    state: 'open',
    comments: 2,
    created_at: '2024-01-11T06:00:00Z',
    updated_at: '2024-01-12T10:00:00Z',
  },
];

async function fetchIssues(params: Record<string, any> = {}) {
  const state = params.state;
  const keyword = String(params.keyword ?? params.title ?? '')
    .trim()
    .toLowerCase();
  let data = MOCK_ISSUES;
  if (state && state !== 'all') {
    data = data.filter((item) => item.state === state);
  }
  if (keyword) {
    data = data.filter((item) => item.title.toLowerCase().includes(keyword));
  }
  return {
    data,
    success: true,
    total: data.length,
  };
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 64,
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    title: (_, type) => (type === 'table' ? '状态' : '列表状态'),
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '排序方式',
    key: 'direction',
    hideInTable: true,
    hideInDescriptions: true,
    dataIndex: 'direction',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: 180,
    search: false,
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    render: (text, row) => [
      <a href={row.url} key="show" target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        key="more"
        onSelect={(key) => message.info(key)}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const Demo = () => {
  const [type, setType] = useState('table');
  return (
    <ProCard>
      <Tabs
        activeKey={type}
        onChange={(e) => setType(e)}
        items={[
          { key: 'table', label: '表格视图' },
          { key: 'form', label: '表单视图' },
          { key: 'descriptions', label: '详情视图' },
        ]}
      />
      {['table', 'form'].includes(type) && (
        <ProTable<GithubIssueItem>
          columns={columns}
          type={type as 'table'}
          request={async (params = {} as Record<string, any>) =>
            fetchIssues(params)
          }
          pagination={{
            pageSize: 5,
          }}
          rowKey="id"
          dateFormatter="string"
          headerTitle="Issue 管理"
          toolBarRender={() => [
            <Button key="new" type="primary">
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />
      )}
      {type === 'descriptions' && (
        <ProDescriptions
          style={{
            background: '#fff',
          }}
          columns={columns as ProDescriptionsItemProps<GithubIssueItem>[]}
          request={async () => {
            const msg = await fetchIssues();
            return {
              ...msg,
              data: msg.data[0],
            };
          }}
        />
      )}
    </ProCard>
  );
};

export default () => (
  <div
    style={{
      padding: 24,
      minHeight: 520,
      background: 'var(--ant-color-bg-layout, #f5f5f5)',
    }}
  >
    <Demo />
  </div>
);
