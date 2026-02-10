/**
 * columns API 配合 request 和搜索表单
 */
import { ProList } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import request from 'umi-request';

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

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '用户',
    dataIndex: 'user',
    listSlot: 'title',
  },
  {
    dataIndex: 'avatar',
    listSlot: 'avatar',
    search: false,
  },
  {
    dataIndex: 'title',
    listSlot: 'description',
    search: false,
  },
  {
    dataIndex: 'labels',
    listSlot: 'subTitle',
    search: false,
    render: (_, row) => (
      <Space size={8}>
        {row.labels?.map((label: { name: string }) => (
          <Tag color="blue" key={label.name}>
            {label.name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    listSlot: 'actions',
    search: false,
    render: (_, row) => [
      <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
        链路
      </a>,
      <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: { text: '未解决', status: 'Error' },
      closed: { text: '已解决', status: 'Success' },
    },
  },
];

const Demo = () => (
  <ProList<GithubIssueItem>
    toolBarRender={() => [
      <Button key="add" type="primary">
        新建
      </Button>,
    ]}
    search={{ filterType: 'light' }}
    rowKey="id"
    headerTitle="搜索列表（columns API）"
    request={async (params = {} as Record<string, any>) =>
      request<{ data: GithubIssueItem[] }>(
        'https://proapi.azurewebsites.net/github/issues',
        { params },
      )
    }
    pagination={{ pageSize: 5 }}
    columns={columns}
  />
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
