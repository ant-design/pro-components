import React, { useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import MiniRing from './charts/MiniRing';

const { Statistic, Divider } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 640);
      }}
    >
      <StatisticCard.Group title="核心指标" direction={responsive ? 'column' : undefined}>
        <StatisticCard
          colSpan={{}}
          statistic={{
            title: '总流量(人次)',
            value: 601986875,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '付费流量',
            value: 3701928,
            description: <Statistic title="占比" value="61.5%" />,
          }}
          chart={
            <MiniRing
              percent={0.615}
              bgColor="#6d96f3"
              ringProps={{
                statistic: {
                  content: false,
                },
                innerRadius: 0.7,
              }}
            />
          }
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: '免费流量',
            value: 1806062,
            description: <Statistic title="占比" value="38.5%" />,
          }}
          chart={
            <MiniRing
              percent={0.385}
              bgColor="#30BF78"
              ringProps={{
                statistic: {
                  content: false,
                },
                innerRadius: 0.7,
              }}
            />
          }
          chartPlacement="left"
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
