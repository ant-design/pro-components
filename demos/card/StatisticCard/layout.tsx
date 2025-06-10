import { ProCard, StatisticCard } from '@ant-design/pro-components";
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="Data Overview"
        extra="Friday, September 28, 2019"
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Total Traffic Yesterday',
                  value: 234,
                  description: (
                    <Statistic
                      title="Compared to Monthly Average Traffic"
                      value="8.04%"
                      trend="down"
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Total Traffic This Month',
                  value: 234,
                  description: (
                    <Statistic
                      title="Month-on-Month"
                      value="8.04%"
                      trend="up"
                    />
                  ),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Ongoing Experiments',
                  value: '12/56',
                  suffix: 'items',
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Total Historical Experiments',
                  value: '134',
                  suffix: 'items',
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard
            title="Traffic Trends"
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                width="100%"
                alt="Bar Chart"
              />
            }
          />
        </ProCard>
        <StatisticCard
          title="Traffic Usage"
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
              alt="Dashboard"
              width="100%"
            />
          }
        />
      </ProCard>
    </RcResizeObserver>
  );
};
