import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
  {
    title: 'Created Time',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
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
          },
        ],
        success: true,
      };
    }}
    rowKey="key"
    dateFormatter="string"
    headerTitle="查询 Table"
    search={{
      defaultCollapsed: false,
      labelWidth: 'auto',
      optionRender: (searchConfig, formProps, dom) => [
        ...dom.reverse(),
        <Button key="out">导出</Button>,
      ],
    }}
    toolBarRender={() => [
      <Button key="primary" type="primary">
        <PlusOutlined />
        新建
      </Button>,
    ]}
  />
);
