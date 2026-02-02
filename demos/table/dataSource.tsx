import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';

import {
  createTableDataSource,
  DEMO_CREATOR_VALUE_ENUM,
  DEMO_STATUS_VALUE_ENUM,
} from '../mockData';

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
};

const tableListDataSource = createTableDataSource({
  count: 5,
  namePrefix: 'AppName',
  withProgress: true,
  withMoney: true,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: DEMO_STATUS_VALUE_ENUM,
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="link2">报警</a>,
      <a key="link3">监控</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
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
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '高级表格',
          tooltip: '这是一个标题提示',
        }}
        toolBarRender={() => [
          <Button key="danger" danger>
            危险按钮
          </Button>,
          <Button key="show">查看日志</Button>,
          <Button type="primary" key="primary">
            创建应用
          </Button>,

          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '2',
                },
                {
                  label: '3rd item',
                  key: '3',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
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
        <h4>ProTable 数据源 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>TableDropdown</strong>: 表格下拉菜单组件
          </li>
          <li>
            <strong>Dropdown</strong>: 下拉菜单组件
          </li>
          <li>
            <strong>数据源</strong>: 展示数据源功能
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
            <strong>toolbar</strong>: 工具栏配置
          </li>
          <li>
            <strong>toolBarRender</strong>: 工具栏渲染
          </li>
        </ul>
        <h4>数据源特点：</h4>
        <ul>
          <li>
            <strong>自定义筛选</strong>: 支持自定义筛选
          </li>
          <li>
            <strong>搜索功能</strong>: 支持搜索功能
          </li>
          <li>
            <strong>状态过滤</strong>: 支持状态过滤
          </li>
          <li>
            <strong>省略号显示</strong>: 支持省略号显示
          </li>
          <li>
            <strong>复制功能</strong>: 支持复制功能
          </li>
          <li>
            <strong>下拉操作</strong>: 支持下拉操作
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据展示</strong>: 数据展示系统
          </li>
          <li>
            <strong>内容管理</strong>: 内容管理平台
          </li>
          <li>
            <strong>应用管理</strong>: 应用管理系统
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
