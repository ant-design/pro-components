import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import MiniColumn from './charts/MiniColumn';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <StatisticCard
      chartPlacement="right"
      statistic={{
        title: '冻结金额',
        value: 112893,
        precision: 2,
        suffix: '元',
        description: (
          <>
            <Statistic title="周同比" value="6.47%" trend="up" />
            <Statistic title="月同比" value="6.47%" trend="down" />
          </>
        ),
      }}
      style={{ width: 420 }}
      chart={<MiniColumn />}
    />
  );
};
