import React, { useState } from 'react';
import { Input } from 'antd';
import ProTable, { ProColumns, ColumnsState } from '@ant-design/pro-table';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export interface TableListItem {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
}
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    width: 100,
    filters: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    width: 200,
    valueType: 'dateTime',
  },
  {
    title: '更新时间',
    key: 'since2',
    width: 120,
    dataIndex: 'createdAt',
    valueType: 'date',
  },

  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [<a key="1">操作</a>, <a key="2">删除</a>],
  },
];

export default () => {
  const [columnsStateMap, setColumnsStateMap] = useState<{
    [key: string]: ColumnsState;
  }>({
    name: {
      show: false,
    },
  });
  return (
    <>
      <code>{JSON.stringify(columnsStateMap)}</code>
      <ProTable<TableListItem, { keyWord?: string }>
        columns={columns}
        request={(params) =>
          Promise.resolve({
            data: tableListDataSource.filter((item) => {
              if (!params?.keyWord) {
                return true;
              }
              if (item.name.includes(params?.keyWord) || item.status.includes(params?.keyWord)) {
                return true;
              }
              return false;
            }),
            success: true,
          })
        }
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        search={false}
        dateFormatter="string"
        headerTitle="受控模式"
        toolBarRender={() => [<Input.Search placeholder="请输入" />]}
      />
    </>
  );
};
