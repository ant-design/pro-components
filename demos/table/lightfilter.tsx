import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export type TableListItem = {
  key: number;
  name: string;
  creator: string;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 1; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    creator: creators[Math.floor(Math.random() * creators.length)],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    formItemProps: {
      lightProps: {
        labelFormatter: (value) => `app-${value}`,
      },
    },
  },
  {
    title: '日期范围',
    dataIndex: 'startTime',
    valueType: 'dateRange',
    hideInTable: true,
    initialValue: [dayjs(), dayjs().add(1, 'day')],
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
];

const Demo = () => {
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
      headerTitle="Light Filter"
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      options={false}
      search={{
        filterType: 'light',
      }}
      dateFormatter="string"
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
    <h4>ProTable 轻量过滤器 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>轻量过滤器</strong>: 展示轻量过滤器功能
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
        <strong>headerTitle</strong>: 表格标题
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>pagination</strong>: 分页配置
      </li>
      <li>
        <strong>options</strong>: 选项配置
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
      <li>
        <strong>dateFormatter</strong>: 日期格式化
      </li>
    </ul>
    <h4>轻量过滤器特点：</h4>
    <ul>
      <li>
        <strong>轻量设计</strong>: 轻量级设计
      </li>
      <li>
        <strong>标签格式化</strong>: 支持标签格式化
      </li>
      <li>
        <strong>日期范围</strong>: 支持日期范围
      </li>
      <li>
        <strong>选择器</strong>: 支持选择器
      </li>
      <li>
        <strong>初始值</strong>: 支持初始值
      </li>
      <li>
        <strong>隐藏列</strong>: 支持隐藏列
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>快速筛选</strong>: 快速筛选需求
      </li>
      <li>
        <strong>简洁界面</strong>: 简洁界面需求
      </li>
      <li>
        <strong>轻量应用</strong>: 轻量应用场景
      </li>
    </ul>
  </div>;
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
