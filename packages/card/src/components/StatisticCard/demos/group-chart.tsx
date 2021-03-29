import React, { useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

const { Divider } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 640);
      }}
    >
      <StatisticCard.Group title="分组指标带图表" direction={responsive ? 'column' : undefined}>
        <StatisticCard
          statistic={{
            title: '冻结金额',
            value: 20190102,
            precision: 2,
            suffix: '元',
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/tmA61DliU/zhibiaoka-zhifangtu.svg"
              alt="直方图"
              width="100%"
            />
          }
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '设计资源数',
            value: 234,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/9xNnfyIOU/zhibiaoka-zhifangtu2.svg"
              alt="直方图"
              width="100%"
            />
          }
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '信息完成度',
            value: 5,
            suffix: '/ 100',
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/9xNnfyIOU/zhibiaoka-zhifangtu2.svg"
              alt="直方图"
              width="100%"
            />
          }
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
