import React, { useMemo } from 'react';
import type { StatisticsConfig } from '../../typing';

export interface StatisticsChartProps {
  /** The key/dataIndex of the column */
  columnKey: string | number;
  /** Column title for display */
  columnTitle?: React.ReactNode;
  /** Data array for the column */
  data: any[];
  /** Statistics configuration */
  statsConfig?: StatisticsConfig;
}

/**
 * Calculate numeric statistics for a dataset
 */
const calculateNumericStats = (data: any[], key: string | number) => {
  const values = data.map((item) => Number(item[key])).filter((val) => !isNaN(val));

  if (values.length === 0) return null;

  // Sort values for median calculation
  const sortedValues = [...values].sort((a, b) => a - b);
  const midIndex = Math.floor(sortedValues.length / 2);

  return {
    average: values.reduce((sum, val) => sum + val, 0) / values.length,
    median:
      sortedValues.length % 2 === 0
        ? (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2
        : sortedValues[midIndex],
    min: Math.min(...values),
    max: Math.max(...values),
    count: values.length,
  };
};

/**
 * Calculate categorical statistics (frequency distribution)
 */
const calculateCategoricalStats = (data: any[], key: string | number) => {
  const frequencies: Record<string, number> = {};
  let totalCount = 0;

  data.forEach((item) => {
    const value = String(item[key]);
    frequencies[value] = (frequencies[value] || 0) + 1;
    totalCount++;
  });

  return {
    frequencies,
    totalCount,
    mode: Object.entries(frequencies).sort(([, a], [, b]) => b - a)[0]?.[0],
  };
};

const StatisticsChart: React.FC<StatisticsChartProps> = ({ columnKey, columnTitle, data }) => {
  // Memoize statistics calculations to optimize performance
  const stats = useMemo(() => {
    // Sample first few values to determine if numeric
    const sampleSize = Math.min(10, data.length);
    const sample = data.slice(0, sampleSize);
    const isNumeric = sample.every(
      (item) => !isNaN(Number(item[columnKey])) && item[columnKey] !== '',
    );

    return isNumeric
      ? calculateNumericStats(data, columnKey)
      : calculateCategoricalStats(data, columnKey);
  }, [data, columnKey]);

  if (!stats) {
    return <div>No valid data available for analysis</div>;
  }

  return (
    <div>
      <h3>{columnTitle || columnKey}</h3>

      {'average' in stats ? (
        // Numeric statistics
        <div>
          <div>Average: {stats.average.toFixed(2)}</div>
          <div>Median: {stats.median.toFixed(2)}</div>
          <div>
            Range: {stats.min.toFixed(2)} - {stats.max.toFixed(2)}
          </div>
          <div>Sample size: {stats.count}</div>
          {/* TODO: Add chart visualization when @ant-design/charts is available */}
          <div style={{ height: 200, background: '#f0f0f0', margin: '16px 0' }}>
            Chart placeholder - Will use @ant-design/charts for visualization
          </div>
        </div>
      ) : (
        // Categorical statistics
        <div>
          <div>Most common: {stats.mode}</div>
          <div>Total categories: {Object.keys(stats.frequencies).length}</div>
          <div>Sample size: {stats.totalCount}</div>
          {/* TODO: Add chart visualization when @ant-design/charts is available */}
          <div style={{ height: 200, background: '#f0f0f0', margin: '16px 0' }}>
            Chart placeholder - Will use @ant-design/charts for visualization
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsChart;
