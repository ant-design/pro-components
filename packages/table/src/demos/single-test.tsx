import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Input } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
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

const nestedColumns = [
  {
    title: 'col without dataIndex',
    key: 'expand',
  },
  {
    title: 'normal col',
    dataIndex: 'key',
  },
];

const nestedData = [
  {
    key: 1,
    children: [
      {
        key: 11,
      },
    ],
  },
];

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'title',
    fixed: 'left',
    order: 1,
    copyable: true,
    ellipsis: true,
    hideInForm: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'all',
    onFilter: true,
    order: 2,
    fieldProps: {
      noStyle: true,
    },
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
    title: '动态表单',
    key: 'direction',
    hideInTable: true,
    dataIndex: 'direction',
    formItemProps: {
      noStyle: true,
    },
    renderFormItem: () => {
      return <Input />;
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: '10%',
    order: -1,
    colSize: 1.5,
    formItemProps: {
      noStyle: true,
    },
    renderFormItem: (_, { defaultRender }) => defaultRender(_),
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: '20%',
    render: (value) => {
      return {
        children: value,
        props: { colSpan: 2 },
      };
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    // @ts-ignore
    valueType: () => undefined,
    width: '20%',
  },
  {
    title: '操作',
    valueType: 'option',
    fixed: 'right',
    render: (text, record, _, action) => [
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        pagination={{
          showQuickJumper: true,
        }}
        actionRef={actionRef}
        request={async () => ({
          data: [],
        })}
        type="form"
        rowKey="id"
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
      <ProTable columns={nestedColumns} dataSource={nestedData} />
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={(ref) => console.log(ref)}
        request={async (params = {}) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        pagination={{
          pageSize: 5,
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </>
  );
};
