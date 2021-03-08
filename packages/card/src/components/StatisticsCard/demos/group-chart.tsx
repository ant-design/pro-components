import React, { useRef } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { useSize } from 'ahooks';

import MiniArea from './charts/MiniArea';
import MiniColumn from './charts/MiniColumn';
import MiniProgress from './charts/MiniProgress';

const { Divider } = StatisticCard;

export default () => {
  const ref = useRef();
  const size = useSize(ref);

  const isResponsive = size.width < 640;

  return (
    <div ref={ref}>
      <StatisticCard.Group title="分组指标带图表" direction={isResponsive ? 'column' : undefined}>
        <StatisticCard
          statistic={{
            title: '冻结金额',
            value: 20190102,
            precision: 2,
            suffix: '元',
          }}
          chart={<MiniColumn height={50} />}
        />
        <Divider type={isResponsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '设计资源数',
            value: 234,
          }}
          chart={<MiniArea height={50} />}
        />
        <Divider type={isResponsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '信息完成度',
            value: 5,
            suffix: '/ 100',
          }}
          chart={<MiniProgress />}
        />
      </StatisticCard.Group>
    </div>
  );
};
