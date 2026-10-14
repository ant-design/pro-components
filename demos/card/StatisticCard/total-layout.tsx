import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

export default () => {
  const [narrow, setNarrow] = useState(false);

  return (
    <RcResizeObserver onResize={({ width }) => setNarrow(width < 560)}>
      <ProCard split={narrow ? 'horizontal' : 'vertical'}>
        <StatisticCard
          statistic={{ title: '年度业绩目标', value: 800, suffix: '万元' }}
          colSpan={narrow ? 24 : 12}
        />
        <StatisticCard
          statistic={{ title: '已完成', value: 620, suffix: '万元' }}
          colSpan={narrow ? 24 : 12}
        />
      </ProCard>
    </RcResizeObserver>
  );
};
