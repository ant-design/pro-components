import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';
import Line from './charts/Line';

export default () => {
  return (
    <StatisticCard title="大盘趋势" tip="大盘说明" extra={<EllipsisOutlined />} chart={<Line />} />
  );
};
