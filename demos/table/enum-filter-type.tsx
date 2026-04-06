import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

import {
  createTableDataSource,
  DEMO_CREATOR_VALUE_ENUM,
  DEMO_STATUS_VALUE_ENUM,
  FIXED_BASE_DATE,
} from '../mockData';

type TableListItem = {
  key: number;
  name: string;
  creator: string;
  status: string;
  createdAt: number;
};

const tableListDataSource = createTableDataSource({
  count: 5,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '负责人',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: DEMO_STATUS_VALUE_ENUM,
  },
  {
    title: '日期范围',
    dataIndex: 'startTime',
    valueType: 'dateRange',
    hideInTable: true,
    initialValue: [FIXED_BASE_DATE, FIXED_BASE_DATE.add(7, 'day')],
  },
];

const Demo = () => {
  const [filterType, setFilterType] = useState<'query' | 'light'>('query');

  return (
    <div>
      <div style={{ marginBlockEnd: 16 }}>
        <span>search.filterType 搜索栏类型：</span>
        <Segmented
          value={filterType}
          onChange={(v) => setFilterType(v as any)}
          options={[
            { label: '查询表单 query', value: 'query' },
            { label: '轻量筛选 light', value: 'light' },
          ]}
        />
      </div>
      <ProTable<TableListItem>
        columns={columns}
        request={() =>
          Promise.resolve({
            data: tableListDataSource,
            total: tableListDataSource.length,
            success: true,
          })
        }
        rowKey="key"
        search={{ filterType }}
        dateFormatter="string"
        headerTitle="搜索栏类型切换"
      />
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
