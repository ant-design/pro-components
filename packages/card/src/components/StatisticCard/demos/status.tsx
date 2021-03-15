import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';

const { Divider } = StatisticCard;

export default () => {
  return (
    <StatisticCard.Group>
      <StatisticCard
        statistic={{
          title: '全部',
          tip: '帮助文字',
          value: 10,
        }}
      />
      <Divider />
      <StatisticCard
        statistic={{
          title: '未发布',
          value: 5,
          status: 'default',
        }}
      />
      <StatisticCard
        statistic={{
          title: '发布中',
          value: 3,
          status: 'processing',
        }}
      />
      <StatisticCard
        statistic={{
          title: '发布异常',
          value: 2,
          status: 'error',
        }}
      />
      <StatisticCard
        statistic={{
          title: '发布成功',
          value: '-',
          status: 'success',
        }}
      />
    </StatisticCard.Group>
  );
};
