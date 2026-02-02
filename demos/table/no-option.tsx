import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

import { createTableDataSource, DEMO_STATUS_VALUE_ENUM } from '../mockData';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

const tableListDataSource = createTableDataSource({
  count: 5,
  namePrefix: 'AppName',
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    width: 80,
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
    title: '状态',
    width: 80,
    dataIndex: 'status',
    initialValue: 'all',
    valueEnum: DEMO_STATUS_VALUE_ENUM,
  },
  {
    title: '创建时间',
    tooltip: '这是一段描述',
    width: 140,
    key: 'since',
    search: false,
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
];

const Demo = () => {
  return (
    <>
      <ProTable<TableListItem>
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
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
        dateFormatter="string"
        headerTitle="表格标题"
        toolBarRender={() => [
          <Button key="show">查看日志</Button>,
          <Button key="out">
            导出数据
            <DownOutlined />
          </Button>,
          <Button type="primary" key="primary">
            创建应用
          </Button>,
        ]}
      />
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 无选项 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>Button</strong>: 按钮组件
          </li>
          <li>
            <strong>无选项</strong>: 展示无选项功能
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
            <strong>pagination</strong>: 分页配置
          </li>
          <li>
            <strong>search</strong>: 搜索配置
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
        <h4>无选项特点：</h4>
        <ul>
          <li>
            <strong>optionRender</strong>: 禁用选项渲染
          </li>
          <li>
            <strong>折叠控制</strong>: 支持折叠控制
          </li>
          <li>
            <strong>工具栏操作</strong>: 支持工具栏操作
          </li>
          <li>
            <strong>搜索功能</strong>: 支持搜索功能
          </li>
          <li>
            <strong>排序功能</strong>: 支持排序功能
          </li>
          <li>
            <strong>状态过滤</strong>: 支持状态过滤
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>简洁界面</strong>: 简洁界面需求
          </li>
          <li>
            <strong>只读展示</strong>: 只读展示功能
          </li>
          <li>
            <strong>数据查看</strong>: 数据查看需求
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
