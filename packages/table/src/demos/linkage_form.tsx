/* eslint-disable no-console */
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

interface GithubIssueItem {
  key: number;
  name: string;
  createdAt: number;
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
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
    dataIndex: 'direction',
    filters: true,
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
    renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
      console.group(['item', 'config']);
      console.log(_);
      console.log({ type, defaultRender, ...rest });
      console.groupEnd();
      const status = form.getFieldValue('state');
      if (type === 'form') {
        return null;
      }
      if (status === 'open') {
        return <Input placeholder="请输入" />;
      }
      if (status === 'all' || status === undefined) {
        return false;
      }
      return defaultRender(_);
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
  },
];

export default () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    request={async () => {
      return {
        data: [
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
            state: 'closed',
          },
        ],
        success: true,
      };
    }}
    rowKey="key"
    form={{
      onValuesChange: (values, all) => {
        console.log(values, all);
      },
    }}
    tableLayout="fixed"
    dateFormatter="string"
    headerTitle="动态自定义搜索栏"
    search={{
      defaultCollapsed: false,
      optionRender: ({ searchText, resetText }, { form }) => [
        <Button
          key="search"
          type="primary"
          onClick={() => {
            form?.submit();
          }}
        >
          {searchText}
        </Button>,
        <Button
          key="rest"
          onClick={() => {
            form?.resetFields();
          }}
        >
          {resetText}
        </Button>,
        <Button key="out">导出</Button>,
      ],
    }}
    toolBarRender={() => [
      <Button key="3" type="primary">
        <PlusOutlined />
        新建
      </Button>,
    ]}
  />
);
