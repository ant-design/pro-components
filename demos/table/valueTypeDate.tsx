import { ProTable } from '@ant-design/pro-components';

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
  percent: number | string;
  createdAtRange: number[];
  code: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      Date.now() - Math.floor(Math.random() * 2000),
      Date.now() - Math.floor(Math.random() * 2000),
    ],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

const Demo = () => (
  <>
    <ProTable<TableListItem>
      columns={[
        {
          title: '创建时间',
          key: 'since',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
        },
        {
          title: '日期区间',
          key: 'dateRange',
          dataIndex: 'createdAtRange',
          valueType: 'dateRange',
        },
        {
          title: '时间范围',
          key: 'dateTimeRangeCustom',
          dataIndex: 'dateTimeRange',
          hideInTable: true,
          valueType: 'dateTimeRange',
          fieldProps: {
            // placeholder: ['1', '2']
          },
          formItemRender: (_, { type, defaultRender }) => {
            if (type === 'form') {
              return null;
            }
            return defaultRender(_);
          },
        },
        {
          title: '时间区间',
          key: 'dateTimeRange',
          dataIndex: 'createdAtRange',
          valueType: 'dateTimeRange',
          search: {
            transform: (value: any) => ({
              startTime: value[0],
              endTime: value[1],
            }),
          },
        },
        {
          title: '更新时间',
          key: 'since2',
          dataIndex: 'createdAt',
          valueType: 'date',
        },
        {
          title: '更新时间',
          key: 'since4',
          dataIndex: 'createdAt',
          valueType: 'fromNow',
        },
        {
          title: '关闭时间',
          key: 'since3',
          dataIndex: 'updatedAt',
          valueType: 'time',
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
      headerTitle="日期类"
    />
    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>ProTable 值类型日期 Props 说明：</h4>
      <ul>
        <li>
          <strong>ProTable</strong>: 专业表格组件
        </li>
        <li>
          <strong>值类型日期</strong>: 展示值类型日期功能
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
      <h4>值类型日期特点：</h4>
      <ul>
        <li>
          <strong>日期时间</strong>: 支持日期时间
        </li>
        <li>
          <strong>日期区间</strong>: 支持日期区间
        </li>
        <li>
          <strong>时间范围</strong>: 支持时间范围
        </li>
        <li>
          <strong>时间区间</strong>: 支持时间区间
        </li>
        <li>
          <strong>日期</strong>: 支持日期
        </li>
        <li>
          <strong>相对时间</strong>: 支持相对时间
        </li>
        <li>
          <strong>时间</strong>: 支持时间
        </li>
        <li>
          <strong>搜索转换</strong>: 支持搜索转换
        </li>
      </ul>
      <h4>使用场景：</h4>
      <ul>
        <li>
          <strong>日期类</strong>: 日期类数据展示
        </li>
        <li>
          <strong>时间筛选</strong>: 时间筛选功能
        </li>
        <li>
          <strong>时间范围</strong>: 时间范围查询
        </li>
      </ul>
    </div>
  </>
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
