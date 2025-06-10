import { StatisticCard } from '@ant-design/pro-components";
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Divider } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group
        title="Core Metrics"
        direction={responsive ? 'column' : 'row'}
      >
        <StatisticCard
          statistic={{
            title: "Today's UV",
            tip: 'Supplier Information',
            value: 79,
            precision: 2,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Frozen Amount',
            value: 112893,
            precision: 2,
            suffix: 'Yuan',
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Information Completeness',
            value: 92,
            suffix: '/ 100',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Frozen Amount',
            value: 112893,
            precision: 2,
            suffix: 'Yuan',
          }}
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
