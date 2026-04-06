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
        title: '部署进度',
        key: 'progress',
        dataIndex: 'progress',
        valueType: (item) => ({
          type: 'progress',
          status: item.status !== 'error' ? 'active' : 'exception',
        }),
        width: 200,
      },
      {
        title: '合同金额',
        dataIndex: 'money',
        valueType: 'money',
        width: 150,
      },
      {
        title: '请求量',
        dataIndex: 'money',
        key: 'digit',
        valueType: 'digit',
        width: 150,
      },
      {
        title: '响应时间',
        dataIndex: 'money',
        key: 'second',
        valueType: 'second',
        width: 150,
      },
      {
        title: 'CPU 占用',
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
    headerTitle="数值类型展示"
  />
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
