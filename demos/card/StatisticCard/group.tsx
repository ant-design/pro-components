import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

const { Divider } = StatisticCard;

export default () => {
  const [narrow, setNarrow] = useState(false);

  return (
    <RcResizeObserver onResize={({ width }) => setNarrow(width < 500)}>
      <StatisticCard.Group
        title="订单指标"
        direction={narrow ? 'column' : 'row'}
      >
        <StatisticCard statistic={{ title: '待处理', value: 24 }} />
        <Divider orientation={narrow ? 'horizontal' : 'vertical'} />
        <StatisticCard statistic={{ title: '已完成', value: 86 }} />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
