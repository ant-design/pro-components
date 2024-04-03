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

export default () => (
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
          renderFormItem: (_, { type, defaultRender }) => {
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
  </>
);
