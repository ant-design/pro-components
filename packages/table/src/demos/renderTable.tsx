import React, { useState } from 'react';
import { Card, Menu, Descriptions } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const { SubMenu } = Menu;

export interface TableListItem {
  key: number;
  name: string;
  createdAt: number;
  progress: number;
}
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '更新时间',
    key: 'since2',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '执行进度',
    dataIndex: 'progress',
    valueType: 'progress',
  },
];

export default () => {
  const [key, setKey] = useState('1');

  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      tableRender={(_, dom) => (
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Menu
            onSelect={(e) => setKey(e.key as string)}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.SubMenu
              key="sub1"
              title={
                <span>
                  <MailOutlined />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.ItemGroup key="g1" title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <SettingOutlined />
                  <span>Navigation Three</span>
                </span>
              }
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
          <div
            style={{
              flex: 1,
            }}
          >
            {dom}
          </div>
        </div>
      )}
      tableExtraRender={(_, data) => (
        <Card>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="Remarks">
              Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      params={{
        key,
      }}
      request={async () => {
        await waitTime(200);
        return {
          success: true,
          data: tableListDataSource,
        };
      }}
      dateFormatter="string"
      headerTitle="自定义 table"
    />
  );
};
