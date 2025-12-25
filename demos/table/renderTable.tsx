import { MailOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Descriptions, Menu } from 'antd';
import { useState } from 'react';

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
            items={[
              {
                key: 'sub1',
                label: (
                  <span>
                    <MailOutlined />
                    <span>Navigation One</span>
                  </span>
                ),
                children: [
                  {
                    type: 'group',
                    key: 'g1',
                    label: 'Item 1',
                    children: [
                      {
                        key: '1',
                        label: 'Option 1',
                      },
                      {
                        key: '2',
                        label: 'Option 2',
                      },
                    ],
                  },
                  {
                    type: 'group',
                    key: 'g2',
                    label: 'Item 2',
                    children: [
                      {
                        key: '3',
                        label: 'Option 3',
                      },
                      {
                        key: '4',
                        label: 'Option 4',
                      },
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
            <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">
              2017-01-10
            </Descriptions.Item>
            <Descriptions.Item label="Effective Time">
              2017-10-10
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
      headerTitle="自定义表格主体"
    />
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 渲染表格 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>Card</strong>: 卡片组件
      </li>
      <li>
        <strong>Descriptions</strong>: 描述组件
      </li>
      <li>
        <strong>Menu</strong>: 菜单组件
      </li>
      <li>
        <strong>渲染表格</strong>: 展示渲染表格功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>pagination</strong>: 分页配置
      </li>
      <li>
        <strong>tableRender</strong>: 表格渲染
      </li>
      <li>
        <strong>tableExtraRender</strong>: 表格额外渲染
      </li>
      <li>
        <strong>params</strong>: 参数配置
      </li>
      <li>
        <strong>request</strong>: 请求函数
      </li>
      <li>
        <strong>dateFormatter</strong>: 日期格式化
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
    </ul>
    <h4>渲染表格特点：</h4>
    <ul>
      <li>
        <strong>自定义渲染</strong>: 支持自定义渲染
      </li>
      <li>
        <strong>侧边菜单</strong>: 支持侧边菜单
      </li>
      <li>
        <strong>额外内容</strong>: 支持额外内容
      </li>
      <li>
        <strong>布局控制</strong>: 支持布局控制
      </li>
      <li>
        <strong>状态管理</strong>: 支持状态管理
      </li>
      <li>
        <strong>参数传递</strong>: 支持参数传递
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>复杂布局</strong>: 复杂布局需求
      </li>
      <li>
        <strong>自定义界面</strong>: 自定义界面功能
      </li>
      <li>
        <strong>导航系统</strong>: 导航系统需求
      </li>
    </ul>
  </div>;
};
