import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <>
      <StatisticCard style={{ width: 160 }}>
        <Statistic title="日环比" value="7.60%" trend="up" />
        <Statistic title="周环比" value="7.60%" trend="down" />
        <Statistic title="周环比" value="0.00%" />
      </StatisticCard>
    </>
  );
};
