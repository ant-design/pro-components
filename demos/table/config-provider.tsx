import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@xxlabs/pro-components';
import { ProTable, TableDropdown } from '@xxlabs/pro-components';
import { Button, ConfigProvider, Space, Tag } from 'antd';
import { useRef } from 'react';
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
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
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
    width: '10%',
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: '10%',
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag key={name} color={color}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a key="link" href={row.url} rel="noopener noreferrer" target="_blank">
        链路
      </a>,
      <a key="warning" href={row.url} rel="noopener noreferrer" target="_blank">
        报警
      </a>,
      <a key="view" href={row.url} rel="noopener noreferrer" target="_blank">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
        onSelect={() => action?.reload()}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>(undefined);

  return (
    <ConfigProvider prefixCls="qixian">
      <ProTable<GithubIssueItem>
        actionRef={actionRef}
        columns={columns}
        dateFormatter="string"
        headerTitle="高级表格"
        pagination={{
          showQuickJumper: true,
        }}
        request={async (params: Record<string, any> = {}) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        rowKey="id"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};
