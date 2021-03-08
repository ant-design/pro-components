import React, { useRef } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { useSize } from 'ahooks';
import MiniColumn from './charts/MiniColumn';
import MiniRing from './charts/MiniRing';

const { Divider, Statistic } = StatisticCard;

export default () => {
  const ref = useRef();
  const size = useSize(ref);

  const isResponsive = size.width < 640;

  return (
    <div ref={ref}>
      <StatisticCard.Group
        title="分组指标带图表-横向"
        direction={isResponsive ? 'column' : undefined}
      >
        <StatisticCard
          statistic={{
            title: '冻结金额',
            value: 1102,
            precision: 2,
            suffix: '万元',
            description: <Statistic title="周同比" value="64.7%" trend="up" />,
          }}
          chart={<MiniColumn height={80} />}
          chartPlacement="right"
        />
        <Divider type={isResponsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '信息完成度',
            value: 5,
            suffix: '/ 100',
            description: <Statistic title="月同比" value="64.7%" trend="up" />,
          }}
          chart={<MiniRing percent={0.8} width={80} height={80} />}
          chartPlacement="right"
        />
      </StatisticCard.Group>
    </div>
  );
};
