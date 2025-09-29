import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';
import { Button } from 'antd';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
];

const SearchOptionTable = () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    dateFormatter="string"
    headerTitle="查询 Table"
    request={async () => {
      return {
        data: [
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
          },
        ],
        success: true,
      };
    }}
    rowKey="key"
    search={{
      defaultCollapsed: false,
      labelWidth: 'auto',
      optionRender: (searchConfig, formProps, dom) => [
        ...dom.reverse(),
        <Button key="out" onClick={() => {}}>
          导出
        </Button>,
      ],
    }}
    toolBarRender={() => [
      <Button key="primary" type="primary">
        <PlusOutlined />
        新建
      </Button>,
    ]}
  />
);

const SearchOptionTableWithDocs = () => {
  return (
    <>
      {SearchOptionTable()}
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 搜索选项 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>Button</strong>: 按钮组件
          </li>
          <li>
            <strong>搜索选项</strong>: 展示搜索选项功能
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
            <strong>dateFormatter</strong>: 日期格式化
          </li>
          <li>
            <strong>headerTitle</strong>: 表格标题
          </li>
          <li>
            <strong>search</strong>: 搜索配置
          </li>
          <li>
            <strong>toolBarRender</strong>: 工具栏渲染
          </li>
        </ul>
        <h4>搜索选项特点：</h4>
        <ul>
          <li>
            <strong>自定义选项</strong>: 支持自定义选项
          </li>
          <li>
            <strong>选项渲染</strong>: 支持选项渲染
          </li>
          <li>
            <strong>默认展开</strong>: 支持默认展开
          </li>
          <li>
            <strong>标签宽度</strong>: 支持标签宽度
          </li>
          <li>
            <strong>导出功能</strong>: 支持导出功能
          </li>
          <li>
            <strong>货币类型</strong>: 支持货币类型
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>高级搜索</strong>: 高级搜索需求
          </li>
          <li>
            <strong>自定义操作</strong>: 自定义操作功能
          </li>
          <li>
            <strong>复杂查询</strong>: 复杂查询需求
          </li>
        </ul>
      </div>
    </>
  );
};

export default SearchOptionTableWithDocs;
