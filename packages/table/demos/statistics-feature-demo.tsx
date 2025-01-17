import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Modal, Progress, Tooltip } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

interface DataItem {
  id: number;
  name: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  score: number;
  joinDate: string;
}

interface NumericStats {
  avg: number;
  median: number;
  min: number;
  max: number;
  buckets: number[];
  bucketSize: number;
}

interface CategoricalStats {
  frequencies: Record<string, number>;
}

type StatisticsResult = NumericStats | CategoricalStats;

// Helper function to calculate statistics
const calculateStatistics = (data: DataItem[], key: keyof DataItem): StatisticsResult => {
  const values = data.map((item) => item[key]);
  const isNumeric = typeof values[0] === 'number';

  if (isNumeric) {
    const numValues = values as number[];
    const avg = numValues.reduce((a, b) => a + b, 0) / numValues.length;
    const sorted = [...numValues].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const min = Math.min(...numValues);
    const max = Math.max(...numValues);

    // Create 5 buckets for distribution
    const bucketSize = (max - min) / 5;
    const buckets = Array(5).fill(0);
    numValues.forEach((val) => {
      const bucketIndex = Math.min(Math.floor((val - min) / bucketSize), 4);
      buckets[bucketIndex]++;
    });

    return { avg, median, min, max, buckets, bucketSize } as NumericStats;
  } else {
    const frequencies: Record<string, number> = {};
    values.forEach((val) => {
      frequencies[String(val)] = (frequencies[String(val)] || 0) + 1;
    });
    return { frequencies } as CategoricalStats;
  }
};

// Sample data
const demoData: DataItem[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: Math.floor(Math.random() * 40) + 20, // Random age between 20-60
  status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as DataItem['status'],
  score: Math.round((Math.random() * 100 + Number.EPSILON) * 100) / 100, // Random score with 2 decimal places
  joinDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    .toISOString()
    .split('T')[0],
}));

const showStatistics = (data: DataItem[], columnKey: keyof DataItem, title: string) => {
  const stats = calculateStatistics(data, columnKey);

  if ('avg' in stats) {
    const { avg, median, min, max, buckets, bucketSize } = stats as NumericStats;
    // Numeric data
    Modal.info({
      title: `Statistics for ${title}`,
      width: 600,
      content: (
        <div style={{ padding: '20px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <p>Average: {avg.toFixed(2)}</p>
            <p>Median: {median.toFixed(2)}</p>
            <p>
              Range: {min.toFixed(2)} - {max.toFixed(2)}
            </p>
          </div>
          <h4>Distribution</h4>
          {buckets.map((count, i) => {
            const start = min + i * bucketSize;
            const end = start + bucketSize;
            return (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    {start.toFixed(1)} - {end.toFixed(1)}
                  </span>
                  <span>
                    {count} ({((count / data.length) * 100).toFixed(1)}%)
                  </span>
                </div>
                <Progress percent={(count / Math.max(...buckets)) * 100} showInfo={false} />
              </div>
            );
          })}
        </div>
      ),
    });
  } else {
    // Categorical data
    Modal.info({
      title: `Statistics for ${title}`,
      width: 600,
      content: (
        <div style={{ padding: '20px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <p>Total categories: {Object.keys(stats.frequencies).length}</p>
            <p>
              Most common: {Object.entries(stats.frequencies).sort(([, a], [, b]) => b - a)[0][0]}
            </p>
          </div>
          <h4>Distribution</h4>
          {Object.entries(stats.frequencies).map(([value, count]) => (
            <div key={value} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{value}</span>
                <span>
                  {count} ({((count / data.length) * 100).toFixed(1)}%)
                </span>
              </div>
              <Progress
                percent={(count / Math.max(...Object.values(stats.frequencies))) * 100}
                showInfo={false}
              />
            </div>
          ))}
        </div>
      ),
    });
  }
};

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
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        Age
        <Tooltip title="Show statistics">
          <BarChartOutlined
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              showStatistics(demoData, 'age', 'Age');
            }}
          />
        </Tooltip>
      </div>
    ),
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
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        Status
        <Tooltip title="Show statistics">
          <BarChartOutlined
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              showStatistics(demoData, 'status', 'Status');
            }}
          />
        </Tooltip>
      </div>
    ),
    dataIndex: 'status',
    width: 100,
    statistics: {
      mode: true,
      distribution: true,
      chartType: 'pie',
    },
  },
  {
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        Score
        <Tooltip title="Show statistics">
          <BarChartOutlined
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              showStatistics(demoData, 'score', 'Score');
            }}
          />
        </Tooltip>
      </div>
    ),
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
    render: (score) => {
      const value = Number(score);
      return (
        <div style={{ color: value > 50 ? 'green' : 'red' }}>
          {value > 50 ? 'High Score' : 'Low Score'}
        </div>
      );
    },
    statistics: true, // This won't show statistics icon due to custom render
  },
];

export default () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>ProTable Statistics Feature Demo</h1>
      <p>Click the chart icon in column headers to view statistics and distribution analysis</p>
      <ProTable<DataItem>
        columns={columns}
        dataSource={demoData}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="Interactive Demo"
        toolBarRender={false}
      />
    </div>
  );
};
