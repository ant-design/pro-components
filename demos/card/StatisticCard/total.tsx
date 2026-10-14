import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

const { Statistic, Divider } = StatisticCard;

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
                title: 'Total Traffic (Visits)',
                value: 601986875,
              }}
            />
            <Divider orientation={responsive ? 'horizontal' : 'vertical'} />
            <StatisticCard
              statistic={{
                title: 'Paid Traffic',
                value: 3701928,
                description: <Statistic title="Proportion" value="61.5%" />,
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                  alt="Percentage"
                  width="100%"
                />
              }
              chartPlacement="left"
            />
            <StatisticCard
              statistic={{
                title: 'Free Traffic',
                value: 1806062,
                description: <Statistic title="Proportion" value="38.5%" />,
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                  alt="Percentage"
                  width="100%"
                />
              }
              chartPlacement="left"
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
