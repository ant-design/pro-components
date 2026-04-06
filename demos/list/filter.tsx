import { ProList } from '@ant-design/pro-components';
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

const Demo = () => (
  <ProList<GithubIssueItem>
    toolBarRender={() => {
      return [
        <Button key="3" type="primary">
          新建
        </Button>,
      ];
    }}
    search={{
      filterType: 'light',
    }}
    rowKey="name"
    headerTitle="基础列表"
    request={async (params = {} as Record<string, any>) =>
      request<{
        data: GithubIssueItem[];
      }>('https://proapi.azurewebsites.net/github/issues', {
        params,
      })
    }
    pagination={{
      pageSize: 5,
    }}
    columns={[
      { dataIndex: 'user', listSlot: 'title', title: '用户' },
      { dataIndex: 'avatar', listSlot: 'avatar', search: false },
      { dataIndex: 'title', listSlot: 'description', search: false },
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
        render: (text, row) => [
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="link"
          >
            详情
          </a>,
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
            查看
          </a>,
        ],
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          open: { text: '未解决', status: 'Error' },
          closed: { text: '已解决', status: 'Success' },
          processing: { text: '解决中', status: 'Processing' },
        },
      },
    ]}
  />
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
