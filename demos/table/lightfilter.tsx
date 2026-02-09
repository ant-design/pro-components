import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import {
  createTableDataSource,
  DEMO_CREATOR_VALUE_ENUM,
  FIXED_BASE_DATE,
} from '../mockData';

export type TableListItem = {
  key: number;
  name: string;
  creator: string;
  createdAt: number;
};

const tableListDataSource = createTableDataSource({
  count: 1,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    formItemProps: {
      lightProps: {
        labelFormatter: (value) => `应用: ${value}`,
      },
    },
  },
  {
    title: '日期范围',
    dataIndex: 'startTime',
    valueType: 'dateRange',
    hideInTable: true,
    initialValue: [FIXED_BASE_DATE, FIXED_BASE_DATE.add(1, 'day')],
  },
  {
    title: '负责人',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
];

const Demo = () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      headerTitle="轻量筛选"
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
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
