import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <StatisticCard
      chartPlacement="left"
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
      style={{ maxWidth: 584 }}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/snEBTn9ax/zhexiantuchang.svg"
          alt="折线图"
          width="100%"
        />
      }
    />
  );
};
