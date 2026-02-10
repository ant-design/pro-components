import { MailOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Descriptions, Menu } from 'antd';
import { useState } from 'react';

import { FIXED_BASE_TIMESTAMP } from '../mockData';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export type TableListItem = {
  key: number;
  name: string;
  createdAt: number;
  progress: number;
};

const tableListDataSource: TableListItem[] = Array.from(
  { length: 2 },
  (_, i) => ({
    key: i,
    name: i === 0 ? '用户认证服务' : '支付网关',
    createdAt: FIXED_BASE_TIMESTAMP - (i * 1000 + 200),
    progress: ((i * 17 + 23) % 100) + 1,
  }),
);

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
    title: '部署进度',
    dataIndex: 'progress',
    valueType: 'progress',
  },
];

const Demo = () => {
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
            items={[
              {
                key: 'sub1',
                label: (
                  <span>
                    <MailOutlined />
                    <span>服务管理</span>
                  </span>
                ),
                children: [
                  {
                    type: 'group',
                    key: 'g1',
                    label: '核心服务',
                    children: [
                      { key: '1', label: '用户认证服务' },
                      { key: '2', label: '订单处理中心' },
                    ],
                  },
                  {
                    type: 'group',
                    key: 'g2',
                    label: '基础设施',
                    children: [
                      { key: '3', label: '支付网关' },
                      { key: '4', label: '消息推送平台' },
                    ],
                  },
                ],
              },
            ]}
          />
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
            <Descriptions.Item label="实例数">{data.length}</Descriptions.Item>
            <Descriptions.Item label="负责人">书琰</Descriptions.Item>
            <Descriptions.Item label="关联项目">
              <a>智慧零售平台</a>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">2024-01-10</Descriptions.Item>
            <Descriptions.Item label="上线时间">2024-01-15</Descriptions.Item>
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
      headerTitle="自定义表格主体"
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
