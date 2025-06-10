import { StatisticCard } from '../../../../components';
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
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: 'Frozen Amount',
            value: 20190102,
            precision: 2,
            suffix: 'Yuan',
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
              alt="Histogram"
              width="100%"
            />
          }
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Design Resources',
            value: 234,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
              alt="Histogram"
              width="100%"
            />
          }
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Information Completeness',
            value: 5,
            suffix: '/ 100',
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
              alt="Histogram"
              width="100%"
            />
          }
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
