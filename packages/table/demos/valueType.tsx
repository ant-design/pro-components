import React from 'react';
import moment from 'moment';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Space } from 'antd';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export interface TableListItem {
  key: number;
  name: string;
  status: string | number;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: number[];
  code: string;
  avatar: string;
}
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: moment('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 1000),
    createdAt: moment('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      moment('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
      moment('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
    ],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

tableListDataSource.push({
  key: 3,
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  name: `TradeCode ${3}`,
  status: 0,
  updatedAt: Date.now() - Math.floor(Math.random() * 1000),
  createdAt: Date.now() - Math.floor(Math.random() * 2000),
  createdAtRange: [
    Date.now() - Math.floor(Math.random() * 2000),
    Date.now() - Math.floor(Math.random() * 2000),
  ],
  money: Math.floor(Math.random() * 2000) * 3,
  progress: Math.ceil(Math.random() * 100) + 1,
  percent:
    Math.random() > 0.5
      ? ((3 + 1) * 10 + Math.random()).toFixed(3)
      : -((3 + 1) * 10 + Math.random()).toFixed(2),
  code: `const getData = async params => {
const data = await getData(params);
return { list: data.data, ...data };
};`,
});

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 72,
  },
  {
    title: 'border 序号',
    dataIndex: 'index',
    key: 'indexBorder',
    valueType: 'indexBorder',
    width: 72,
    // @ts-ignore
    sorter: {
      multiple: 3,
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: ['all'],
    // @ts-ignore
    sorter: {
      multiple: 3,
    },
    width: 100,
    ellipsis: true,
    filters: true,
    fieldProps: {
      mode: 'tags',
      onChange: (value: string) => console.log(value),
    },
    formItemProps: {
      rules: [{ required: true }],
    },
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
      0: { text: '0异常', status: 'Error' },
    },
  },
  {
    title: '代码',
    key: 'code',
    width: 120,
    dataIndex: 'code',
    valueType: 'code',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    valueType: 'avatar',
    width: 150,
    render: (dom) => (
      <Space>
        <span>{dom}</span>
        <a href="https://github.com/chenshuai2144" target="_blank" rel="noopener noreferrer">
          chenshuai2144
        </a>
      </Space>
    ),
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [<a key="a">操作</a>, <a key="b">删除</a>],
  },
];

export default () => (
  <>
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          total: 200,
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      headerTitle="样式类"
    />
  </>
);
