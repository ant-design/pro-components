import React, { useState } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import MiniProgress from './charts/MiniProgress';
import SmoothArea from './charts/SmoothArea';

const { Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 640);
      }}
    >
      <ProCard split="vertical">
        <StatisticCard
          colSpan={responsive ? 12 : 7}
          title="财年业绩目标"
          statistic={{
            value: 82.6,
            suffix: '亿',
            description: <Statistic title="日同比" value="6.47%" trend="up" />,
          }}
          chart={
            <div style={{ margin: '24px 0' }}>
              <MiniProgress />
            </div>
          }
          footer={
            <>
              <Statistic value="70.98%" title="财年业绩完成率" layout="horizontal" />
              <Statistic value="86.98%" title="去年同期业绩完成率" layout="horizontal" />
              <Statistic value="88.98%" title="前年同期业绩完成率" layout="horizontal" />
            </>
          }
        />
        <StatisticCard.Group
          gutter={12}
          colSpan={responsive ? 12 : 17}
          direction={responsive ? 'column' : undefined}
        >
          <StatisticCard
            statistic={{
              title: '财年总收入',
              value: 601987768,
              description: <Statistic title="日同比" value="6.15%" trend="up" />,
            }}
            chart={<SmoothArea />}
          >
            <Statistic
              title="大盘总收入"
              value={1982312}
              layout="vertical"
              description={<Statistic title="日同比" value="6.15%" trend="down" />}
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: '当日排名',
              value: 6,
              description: <Statistic title="日同比" value="3.85%" trend="down" />,
            }}
            chart={<SmoothArea />}
          >
            <Statistic
              title="近7日收入"
              value={17458}
              layout="vertical"
              description={<Statistic title="日同比" value="6.47%" trend="up" />}
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: '财年业绩收入排名',
              value: 2,
              description: <Statistic title="日同比" value="6.47%" trend="up" />,
            }}
            chart={<SmoothArea />}
          >
            <Statistic
              title="月付费个数"
              value={601}
              layout="vertical"
              description={<Statistic title="日同比" value="6.47%" trend="down" />}
            />
          </StatisticCard>
        </StatisticCard.Group>
      </ProCard>
    </RcResizeObserver>
  );
};
