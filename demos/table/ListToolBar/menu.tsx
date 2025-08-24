import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';

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
    valueType: 'option',
    width: 120,
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
        search: {
          onSearch: (value) => {
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
            key="primary"
            type="primary"
            onClick={() => {
              alert('add');
            }}
          >
            添加
          </Button>,
        ],
        menu: {
          type: 'tab',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
            {
              key: 'tab1',
              label: <span>应用</span>,
            },
            {
              key: 'tab2',
              label: <span>项目</span>,
            },
            {
              key: 'tab3',
              label: <span>文章</span>,
            },
            {
              key: 'tab4',
              label: <span>文章1</span>,
            },
            {
              key: 'tab5',
              label: <span>文章2</span>,
            },
            {
              key: 'tab6',
              label: <span>文章3</span>,
            },
          ],
          onChange: (activeKey) => {
            console.log('activeKey', activeKey);
          },
        },
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
    <h4>ProTable 菜单工具栏 Props 说明：</h4>
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
        <strong>菜单工具栏</strong>: 展示菜单工具栏功能
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
    <h4>菜单工具栏特点：</h4>
    <ul>
      <li>
        <strong>标签菜单</strong>: 支持标签菜单
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
        <strong>菜单切换</strong>: 支持菜单切换
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>分类管理</strong>: 分类管理系统
      </li>
      <li>
        <strong>标签切换</strong>: 标签切换功能
      </li>
      <li>
        <strong>多视图展示</strong>: 多视图展示需求
      </li>
    </ul>
  </div>;
};
