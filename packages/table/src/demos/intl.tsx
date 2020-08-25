import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Select } from 'antd';
import ProTable, {
  ProColumns,
  TableDropdown,
  ConfigProvider,
  zhCNIntl,
  enUSIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  ruRUIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
  ActionType,
} from '@ant-design/pro-table';
import request from 'umi-request';

const intlMap = {
  zhCNIntl,
  enUSIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  ruRUIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
};

interface GithubIssueItem {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: any;
  author_association: string;
  body: string;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    width: 200,
    hideInSearch: true,
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
  {
    title: 'Status',
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
    valueEnum: {
      all: { text: 'ALL', status: 'Default' },
      open: {
        text: 'Error',
        status: 'Error',
      },
      closed: {
        text: 'Success',
        status: 'Success',
      },
    },
  },
  {
    title: 'Labels',
    dataIndex: 'labels',
    width: 80,
    render: (_, row) =>
      row.labels.map(({ name, id, color }) => (
        <Tag
          color={color}
          key={id}
          style={{
            margin: 4,
          }}
        >
          {name}
        </Tag>
      )),
  },
  {
    title: 'Created Time',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
    render: (text, row, _, action) => [
      <a href={row.html_url} key="show" target="_blank" rel="noopener noreferrer">
        show
      </a>,
      <TableDropdown
        key="more"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: 'copy' },
          { key: 'delete', name: 'delete' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [intl, setIntl] = useState('zhCNIntl');
  return (
    <>
      <Select<string>
        style={{
          width: 200,
        }}
        value={intl}
        onChange={(value) => setIntl(value)}
        options={Object.keys(intlMap).map((value) => ({ value, label: value }))}
      />
      <ConfigProvider
        value={{
          intl: intlMap[intl],
        }}
      >
        <ProTable<GithubIssueItem>
          columns={columns}
          actionRef={actionRef}
          request={async (params = {}) =>
            request<{
              data: GithubIssueItem[];
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            })
          }
          rowKey="id"
          rowSelection={{}}
          pagination={{
            showSizeChanger: true,
          }}
          dateFormatter="string"
          headerTitle="Basic Table"
          toolBarRender={() => [
            <Button key="3" type="primary">
              <PlusOutlined />
              New
            </Button>,
          ]}
        />
      </ConfigProvider>
    </>
  );
};
