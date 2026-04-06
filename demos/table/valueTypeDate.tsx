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
    name: i === 0 ? '用户认证服务' : '支付网关',
    status: DEMO_VALUE_ENUM[(i % 4) as keyof typeof DEMO_VALUE_ENUM],
    updatedAt: FIXED_BASE_TIMESTAMP - (i * 500 + 100),
    createdAt: FIXED_BASE_TIMESTAMP - (i * 1000 + 200),
    createdAtRange: [
      FIXED_BASE_TIMESTAMP - (i * 1000 + 300),
      FIXED_BASE_TIMESTAMP - (i * 1000 + 400),
    ],
    money: ((i * 3456 + 7890) % 50000) * 100,
    progress: ((i * 17 + 23) % 100) + 1,
    percent:
      i % 2 === 0
        ? ((i + 1) * 10 + 0.123).toFixed(3)
        : -((i + 1) * 10 + 0.456).toFixed(2),
    code: `const healthCheck = async (host) => {
  const res = await fetch(host + '/health');
  return { status: res.status };
};`,
  }),
);

const Demo = () => (
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
        fieldProps: {},
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
        title: '更新日期',
        key: 'since2',
        dataIndex: 'createdAt',
        valueType: 'date',
      },
      {
        title: '更新距今',
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
            key="edit"
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
    headerTitle="日期类型展示"
  />
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
