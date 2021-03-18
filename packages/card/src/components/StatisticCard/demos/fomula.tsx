import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';

const { Operation } = StatisticCard;

export default () => {
  return (
    <StatisticCard.Group>
      <StatisticCard
        statistic={{
          title: '服务网格数',
          value: 500,
        }}
      />
      <Operation>=</Operation>
      <StatisticCard
        statistic={{
          title: '未发布',
          value: 234,
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: '发布中',
          value: 112,
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: '已发布',
          value: 255,
        }}
      />
    </StatisticCard.Group>
  );
};
