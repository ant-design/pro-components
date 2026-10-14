import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

const { Divider } = StatisticCard;

const Demo = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <div style={{ width: '100%' }}>
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
            <Divider orientation={responsive ? 'horizontal' : 'vertical'} />
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
            <Divider orientation={responsive ? 'horizontal' : 'vertical'} />
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
        </div>
      </RcResizeObserver>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
