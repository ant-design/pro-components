import React, { useRef } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { useSize } from 'ahooks';

const { Divider } = StatisticCard;

export default () => {
  const ref = useRef();
  const size = useSize(ref);

  const isResponsive = size.width < 640;

  return (
    <div ref={ref}>
      <StatisticCard.Group title="核心指标" direction={isResponsive ? 'column' : undefined}>
        <StatisticCard
          statistic={{
            title: '今日UV',
            tip: '供应商信息',
            value: 79,
            precision: 2,
          }}
        />
        <Divider type={isResponsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '冻结金额',
            value: 112893,
            precision: 2,
            suffix: '元',
          }}
        />
        <Divider type={isResponsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '信息完整度',
            value: 92,
            suffix: '/ 100',
          }}
        />
        <StatisticCard
          statistic={{
            title: '冻结金额',
            value: 112893,
            precision: 2,
            suffix: '元',
          }}
        />
      </StatisticCard.Group>
    </div>
  );
};
