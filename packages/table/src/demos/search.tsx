import React from 'react';
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
    width: 72,
  },
  {
    title: '标题',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
  },
];

export default () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    request={async (params) => {
      console.log(params);
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
    search={false}
    rowKey="id"
    options={{
      search: true,
    }}
    headerTitle="toolbar 中搜索"
  />
);
