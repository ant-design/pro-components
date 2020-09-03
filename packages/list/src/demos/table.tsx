import React from 'react';
import { Button, Tag, Divider } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { ListToolBar } from '@ant-design/pro-list';

interface ColumnItem {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ProColumns<ColumnItem>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, record) => (
      <span>
        {record.tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default () => (
  <div style={{ border: '1px solid #eee' }}>
    <ListToolBar
      title="这里是标题"
      subTitle="这里是子标题"
      description="这是一个段描述"
      search={{
        placeholder: '请输入订单号',
        onSearch: (value) => {
          alert(value);
        },
      }}
      actions={[<Button type="primary">批量导入</Button>]}
    />
    <ProTable
      rowSelection={{ onChange: () => {} }}
      columns={columns}
      options={false}
      search={false}
      dataSource={data}
      pagination={false}
    />
  </div>
);
