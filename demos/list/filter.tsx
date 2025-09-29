import { ProList } from '@xxlabs/pro-components';
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

export default () => (
  <ProList<GithubIssueItem>
    headerTitle="基础列表"
    metas={{
      title: {
        dataIndex: 'user',
        title: '用户',
      },
      avatar: {
        dataIndex: 'avatar',
        search: false,
      },
      description: {
        dataIndex: 'title',
        search: false,
      },
      subTitle: {
        dataIndex: 'labels',
        render: (_, row) => {
          return (
            <Space size={0}>
              {row.labels?.map((label: { name: string }) => (
                <Tag key={label.name} color="blue">
                  {label.name}
                </Tag>
              ))}
            </Space>
          );
        },
        search: false,
      },
      actions: {
        render: (text, row) => [
          <a key="link" href={row.url} rel="noopener noreferrer" target="_blank">
            链路
          </a>,
          <a key="warning" href={row.url} rel="noopener noreferrer" target="_blank">
            报警
          </a>,
          <a key="view" href={row.url} rel="noopener noreferrer" target="_blank">
            查看
          </a>,
        ],
        search: false,
      },
      status: {
        // 自己扩展的字段，主要用于筛选，不在列表中显示
        title: '状态',
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
          processing: {
            text: '解决中',
            status: 'Processing',
          },
        },
      },
    }}
    pagination={{
      pageSize: 5,
    }}
    request={async (params: Record<string, any> = {}) =>
      request<{
        data: GithubIssueItem[];
      }>('https://proapi.azurewebsites.net/github/issues', {
        params,
      })
    }
    rowKey="name"
    search={{
      filterType: 'light',
    }}
    showActions="hover"
    toolBarRender={() => {
      return [
        <Button key="3" type="primary">
          新建
        </Button>,
      ];
    }}
  />
);
