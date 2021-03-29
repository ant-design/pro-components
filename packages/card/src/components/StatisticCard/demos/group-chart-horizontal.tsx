import React, { useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

const { Divider, Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 640);
      }}
    >
      <StatisticCard.Group
        title="分组指标带图表-横向"
        direction={responsive ? 'column' : undefined}
      >
        <StatisticCard
          statistic={{
            title: '冻结金额',
            value: 1102,
            precision: 2,
            suffix: '万元',
            description: <Statistic title="周同比" value="64.7%" trend="up" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/snEBTn9ax/zhexiantuchang.svg"
              alt="折线图"
              width="100%"
            />
          }
          chartPlacement="right"
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '信息完成度',
            value: 5,
            suffix: '/ 100',
            description: <Statistic title="月同比" value="64.7%" trend="up" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/-2IRXw8jb/huan.svg"
              alt="环"
              width="100%"
            />
          }
          chartPlacement="right"
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
