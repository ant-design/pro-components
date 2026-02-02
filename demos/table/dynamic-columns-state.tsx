import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Input, Tooltip } from 'antd';
import { useState } from 'react';

import { DEMO_CREATORS, FIXED_BASE_TIMESTAMP } from '../mockData';

const valueEnum: Record<string, string> = {
  0: 'close',
  1: 'running',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
  statusText: string;
};

const tableListDataSource: TableListItem[] = Array.from(
  { length: 5 },
  (_, i) => ({
    key: i,
    name: `AppName-${i}`,
    containers: (i * 3 + 5) % 20,
    creator: DEMO_CREATORS[i % DEMO_CREATORS.length],
    status: valueEnum[String(i % 2)],
    createdAt: FIXED_BASE_TIMESTAMP - (i * 1000 + 500),
    money: ((i * 111 + 222) % 2000) * (i + 1),
    progress: ((i * 17 + 23) % 100) + 1,
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
    statusText: '这是一段很随意的文字',
  }),
);

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 188, marginBottom: 8, display: 'block' }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'close',
    valueType: 'radioButton',
    valueEnum: {
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
    },
  },
  {
    title: (
      <>
        创建时间
        <Tooltip placement="top" title="这是一段描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
];

const Demo = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('close');

  const closeColumns: ProColumns<TableListItem>[] = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '关闭时字段',
      dataIndex: 'statusText',
    },
    ...columns,
  ];

  const runningColumns: ProColumns<TableListItem>[] = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '运行时字段',
      dataIndex: 'statusText',
    },
    ...columns,
  ];
  return (
    <>
      <ProTable<TableListItem>
        columns={currentStatus === 'close' ? closeColumns : runningColumns}
        request={() => {
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        onSubmit={({ status }) => {
          setCurrentStatus(status);
        }}
        columnsState={{
          persistenceKey: `table_dynamic_status_${currentStatus}`,
          persistenceType: 'sessionStorage',
        }}
        dateFormatter="string"
        toolbar={{
          title: '高级表格',
          tooltip: '动态列持久化',
        }}
      />
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 动态列状态 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>Tooltip</strong>: 提示组件
          </li>
          <li>
            <strong>动态列状态</strong>: 展示动态列状态功能
          </li>
        </ul>
        <h4>ProTable 配置：</h4>
        <ul>
          <li>
            <strong>columns</strong>: 列配置
          </li>
          <li>
            <strong>request</strong>: 请求函数
          </li>
          <li>
            <strong>rowKey</strong>: 行键
          </li>
          <li>
            <strong>search</strong>: 搜索配置
          </li>
          <li>
            <strong>onSubmit</strong>: 提交事件
          </li>
          <li>
            <strong>columnsState</strong>: 列状态配置
          </li>
          <li>
            <strong>dateFormatter</strong>: 日期格式化
          </li>
          <li>
            <strong>toolbar</strong>: 工具栏配置
          </li>
        </ul>
        <h4>动态列状态特点：</h4>
        <ul>
          <li>
            <strong>状态持久化</strong>: 支持状态持久化
          </li>
          <li>
            <strong>动态列配置</strong>: 支持动态列配置
          </li>
          <li>
            <strong>条件渲染</strong>: 支持条件渲染
          </li>
          <li>
            <strong>自定义筛选</strong>: 支持自定义筛选
          </li>
          <li>
            <strong>状态管理</strong>: 支持状态管理
          </li>
          <li>
            <strong>会话存储</strong>: 支持会话存储
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>个性化配置</strong>: 个性化配置需求
          </li>
          <li>
            <strong>状态保持</strong>: 状态保持功能
          </li>
          <li>
            <strong>用户体验</strong>: 用户体验优化
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
