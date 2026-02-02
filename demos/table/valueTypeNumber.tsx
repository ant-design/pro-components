import { ProTable } from '@ant-design/pro-components';

import { DEMO_VALUE_ENUM, FIXED_BASE_TIMESTAMP } from '../mockData';

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: number[];
  code: string;
};

const tableListDataSource: TableListItem[] = Array.from(
  { length: 2 },
  (_, i) => ({
    key: i,
    name: `TradeCode ${i}`,
    status: DEMO_VALUE_ENUM[(i % 4) as keyof typeof DEMO_VALUE_ENUM],
    updatedAt: FIXED_BASE_TIMESTAMP - (i * 500 + 100),
    createdAt: FIXED_BASE_TIMESTAMP - (i * 1000 + 200),
    createdAtRange: [
      FIXED_BASE_TIMESTAMP - (i * 1000 + 300),
      FIXED_BASE_TIMESTAMP - (i * 1000 + 400),
    ],
    money: ((i * 111 + 222) % 2000) * (i + 1),
    progress: ((i * 17 + 23) % 100) + 1,
    percent:
      i % 2 === 0
        ? ((i + 1) * 10 + 0.123).toFixed(3)
        : -((i + 1) * 10 + 0.456).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  }),
);

const ValueTypeNumberTable = () => (
  <ProTable<TableListItem>
    columns={[
      {
        title: '进度',
        key: 'progress',
        dataIndex: 'progress',
        valueType: (item) => ({
          type: 'progress',
          status: item.status !== 'error' ? 'active' : 'exception',
        }),
        width: 200,
      },
      {
        title: '金额',
        dataIndex: 'money',
        valueType: 'money',
        width: 150,
      },
      {
        title: '数字',
        dataIndex: 'money',
        key: 'digit',
        valueType: 'digit',
        width: 150,
      },
      {
        title: '数字',
        dataIndex: 'money',
        key: 'second',
        valueType: 'second',
        width: 150,
      },
      {
        title: '百分比',
        key: 'percent',
        width: 120,
        dataIndex: 'percent',
        valueType: () => ({
          type: 'percent',
        }),
      },
      {
        title: '操作',
        key: 'option',
        width: 120,
        valueType: 'option',
        render: (_, row, index, action) => [
          <a
            key="a"
            onClick={() => {
              action?.startEditable(row.key);
            }}
          >
            编辑
          </a>,
        ],
      },
    ]}
    request={() => {
      return Promise.resolve({
        total: 200,
        data: tableListDataSource,
        success: true,
      });
    }}
    rowKey="key"
    headerTitle="数字类"
  />
);

const ValueTypeNumberWithDocs = () => {
  return (
    <>
      {ValueTypeNumberTable()}
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 值类型数字 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>值类型数字</strong>: 展示值类型数字功能
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
            <strong>headerTitle</strong>: 表格标题
          </li>
        </ul>
        <h4>值类型数字特点：</h4>
        <ul>
          <li>
            <strong>进度条</strong>: 支持进度条
          </li>
          <li>
            <strong>金额</strong>: 支持金额
          </li>
          <li>
            <strong>数字</strong>: 支持数字
          </li>
          <li>
            <strong>秒数</strong>: 支持秒数
          </li>
          <li>
            <strong>百分比</strong>: 支持百分比
          </li>
          <li>
            <strong>动态状态</strong>: 支持动态状态
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数字类</strong>: 数字类数据展示
          </li>
          <li>
            <strong>统计展示</strong>: 统计展示功能
          </li>
          <li>
            <strong>进度监控</strong>: 进度监控需求
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <ValueTypeNumberWithDocs />
  </div>
);
