import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

const { Operation } = StatisticCard;

const Demo = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver onResize={({ width }) => setResponsive(width < 600)}>
      <div style={{ width: '100%' }}>
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: 'Service Mesh Count',
              value: 500,
            }}
          />
          <Operation>=</Operation>
          <StatisticCard
            statistic={{
              title: 'Unpublished',
              value: 234,
            }}
          />
          <Operation>+</Operation>
          <StatisticCard
            statistic={{
              title: 'Publishing',
              value: 112,
            }}
          />
          <Operation>+</Operation>
          <StatisticCard
            statistic={{
              title: 'Published',
              value: 255,
            }}
          />
        </StatisticCard.Group>
      </div>
    </RcResizeObserver>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
