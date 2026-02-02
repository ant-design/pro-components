import {
  EllipsisOutlined,
  FullscreenOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';

import { createTableDataSource } from '../../mockData';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};

const tableListDataSource = createTableDataSource({
  count: 5,
  namePrefix: 'AppName',
}) as TableListItem[];

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
        toolbar={{
          title: '这里是标题',
          subTitle: '这里是子标题',
          tooltip: '这是一个段描述',
          search: {
            onSearch: (value: string) => {
              alert(value);
            },
          },
          filter: (
            <LightFilter>
              <ProFormDatePicker name="startdate" label="响应日期" />
            </LightFilter>
          ),
          actions: [
            <Button
              key="key"
              type="primary"
              onClick={() => {
                alert('add');
              }}
            >
              添加
            </Button>,
          ],
          settings: [
            {
              icon: <SettingOutlined />,
              tooltip: '设置',
            },
            {
              icon: <FullscreenOutlined />,
              tooltip: '全屏',
            },
          ],
        }}
        rowKey="key"
        search={false}
      />
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 基础工具栏 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>LightFilter</strong>: 轻量过滤器组件
          </li>
          <li>
            <strong>ProFormDatePicker</strong>: 专业表单日期选择器组件
          </li>
          <li>
            <strong>基础工具栏</strong>: 展示基础工具栏功能
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
            <strong>toolbar</strong>: 工具栏配置
          </li>
          <li>
            <strong>rowKey</strong>: 行键
          </li>
          <li>
            <strong>search</strong>: 搜索配置
          </li>
        </ul>
        <h4>基础工具栏特点：</h4>
        <ul>
          <li>
            <strong>标题和子标题</strong>: 支持标题和子标题
          </li>
          <li>
            <strong>搜索功能</strong>: 支持搜索功能
          </li>
          <li>
            <strong>过滤器</strong>: 支持过滤器
          </li>
          <li>
            <strong>操作按钮</strong>: 支持操作按钮
          </li>
          <li>
            <strong>设置选项</strong>: 支持设置选项
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据管理</strong>: 数据管理系统
          </li>
          <li>
            <strong>列表展示</strong>: 列表展示功能
          </li>
          <li>
            <strong>操作工具</strong>: 操作工具集合
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
