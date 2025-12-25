import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
  });
}

const timeAwait = (waitTime: number): Promise<void> =>
  new Promise((res) =>
    window.setTimeout(() => {
      res();
    }, waitTime),
  );

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '进度',
    key: 'progress',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: item.status !== 'error' ? 'active' : 'exception',
    }),
  },
  {
    title: '时间',
    key: 'since',
    children: [
      {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        valueType: 'date',
      },
      {
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        valueType: 'date',
      },
    ],
  },
];

const Demo = () => {
  const [time, setTime] = useState(() => Date.now());
  const [polling, setPolling] = useState<number>(2000);
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      polling={polling}
      request={async () => {
        await timeAwait(2000);
        setTime(Date.now());
        return {
          data: tableListDataSource,
          success: true,
          total: tableListDataSource.length,
        };
      }}
      dateFormatter="string"
      headerTitle={`上次更新时间：${dayjs(time).format('HH:mm:ss')}`}
      toolBarRender={() => [
        <Button
          key="3"
          type="primary"
          onClick={() => {
            if (polling) {
              setPolling(0);
              return;
            }
            setPolling(2000);
          }}
        >
          {polling ? <LoadingOutlined /> : <ReloadOutlined />}
          {polling ? '停止轮询' : '开始轮询'}
        </Button>,
      ]}
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
    <h4>ProTable 轮询 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>Button</strong>: 按钮组件
      </li>
      <li>
        <strong>轮询</strong>: 展示轮询功能
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
        <strong>polling</strong>: 轮询配置
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
      <li>
        <strong>toolBarRender</strong>: 工具栏渲染
      </li>
    </ul>
    <h4>轮询特点：</h4>
    <ul>
      <li>
        <strong>自动轮询</strong>: 支持自动轮询
      </li>
      <li>
        <strong>手动控制</strong>: 支持手动控制
      </li>
      <li>
        <strong>状态管理</strong>: 支持状态管理
      </li>
      <li>
        <strong>进度显示</strong>: 支持进度显示
      </li>
      <li>
        <strong>时间更新</strong>: 支持时间更新
      </li>
      <li>
        <strong>动态配置</strong>: 支持动态配置
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>实时数据</strong>: 实时数据更新
      </li>
      <li>
        <strong>监控系统</strong>: 监控系统需求
      </li>
      <li>
        <strong>状态跟踪</strong>: 状态跟踪功能
      </li>
    </ul>
  </div>;
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
