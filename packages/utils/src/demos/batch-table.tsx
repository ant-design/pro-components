import React from 'react';
import { Button, Table, Divider, Dropdown, Menu, Card, message } from 'antd';
import { ListToolBar, BatchOperationBar } from '@ant-design/pro-utils';
import { EllipsisOutlined, DownOutlined } from '@ant-design/icons';

const columns = [
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
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
  },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState(['1', '2']);
  return (
    <Card>
      <ListToolBar
        style={{
          margin: '-24px -24px 0 -24px',
        }}
        title="这里是标题"
        subTitle="这里是子标题"
        description="这是一个段描述"
        search={{
          placeholder: '请输入订单号',
          onSearch: (value) => {
            message.info(value);
          },
        }}
        actions={[<Button type="primary">批量导入</Button>]}
      />
      <BatchOperationBar
        selectedCount={selectedRowKeys.length}
        style={{
          marginBottom: 16,
        }}
        onCancel={() => {
          setSelectedRowKeys([]);
        }}
        actions={[
          <Button
            danger
            onClick={() => {
              message.info('delete');
            }}
          >
            批量删除
          </Button>,
          <Dropdown
            overlay={
              <Menu onClick={() => message.info('menu click')}>
                <Menu.Item key="1">菜单</Menu.Item>
                <Menu.Item key="2">列表</Menu.Item>
                <Menu.Item key="3">表单</Menu.Item>
              </Menu>
            }
          >
            <Button>
              移动自
              <DownOutlined
                style={{
                  marginLeft: 8,
                }}
              />
            </Button>
          </Dropdown>,
          <Button
            onClick={() => {
              message.info('look');
            }}
          >
            批量查看
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              message.info('submit');
            }}
          >
            批量提交
          </Button>,
          <Dropdown
            overlay={
              <Menu onClick={() => message.info('menu click')}>
                <Menu.Item key="1">菜单</Menu.Item>
                <Menu.Item key="2">列表</Menu.Item>
                <Menu.Item key="3">表单</Menu.Item>
              </Menu>
            }
          >
            <span
              style={{ marginLeft: 8 }}
              onClick={() => {
                message.info('...');
              }}
            >
              <EllipsisOutlined />
            </span>
          </Dropdown>,
        ]}
      />
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => {
            setSelectedRowKeys(keys);
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Card>
  );
};
