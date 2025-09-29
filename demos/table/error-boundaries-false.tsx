﻿import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="warn">报警</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      ErrorBoundary={false}
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      search={false}
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
    <h4>ProTable 错误边界 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>错误边界</strong>: 展示错误边界功能
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
        <strong>ErrorBoundary</strong>: 错误边界配置
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
    </ul>
    <h4>错误边界特点：</h4>
    <ul>
      <li>
        <strong>错误捕获</strong>: 支持错误捕获
      </li>
      <li>
        <strong>错误处理</strong>: 支持错误处理
      </li>
      <li>
        <strong>容错机制</strong>: 支持容错机制
      </li>
      <li>
        <strong>禁用边界</strong>: 支持禁用错误边界
      </li>
      <li>
        <strong>异常处理</strong>: 支持异常处理
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>错误处理</strong>: 错误处理需求
      </li>
      <li>
        <strong>稳定性保证</strong>: 稳定性保证
      </li>
      <li>
        <strong>用户体验</strong>: 用户体验优化
      </li>
    </ul>
  </div>;
};
