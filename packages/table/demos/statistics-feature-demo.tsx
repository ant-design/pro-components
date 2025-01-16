import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';

interface DataItem {
  id: number;
  name: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  score: number;
  joinDate: string;
}

const demoData: DataItem[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: Math.floor(Math.random() * 40) + 20, // Random age between 20-60
  status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as DataItem['status'],
  score: Math.round((Math.random() * 100 + Number.EPSILON) * 100) / 100, // Random score with 2 decimal places
  joinDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
}));

const columns: ProColumns<DataItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 48,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80,
    statistics: {
      average: true,
      median: true,
      distribution: true,
      chartType: 'bar',
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    statistics: {
      mode: true,
      distribution: true,
      chartType: 'pie',
    },
  },
  {
    title: 'Score',
    dataIndex: 'score',
    width: 100,
    statistics: {
      average: true,
      median: true,
      distribution: true,
      chartType: 'line',
    },
  },
  {
    title: 'Join Date',
    dataIndex: 'joinDate',
    width: 120,
  },
  {
    title: 'Custom Column',
    dataIndex: 'score',
    width: 150,
    render: (score) => (
      <div style={{ color: score > 50 ? 'green' : 'red' }}>
        {score > 50 ? 'High Score' : 'Low Score'}
      </div>
    ),
    statistics: true, // This won't show statistics icon due to custom render
  },
];

export default () => {
  return (
    <ProTable<DataItem>
      columns={columns}
      dataSource={demoData}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="Statistics Feature Demo"
      toolBarRender={false}
    />
  );
};
