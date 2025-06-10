import { ProCard, StatisticCard } from '@ant-design/pro-components;
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
      <ProCard split={responsive ? 'horizontal' : 'vertical'}>
        <StatisticCard
          colSpan={responsive ? 24 : 6}
          title="Fiscal Year Performance Target"
          statistic={{
            value: 82.6,
            suffix: 'Billion',
            description: (
              <Statistic title="Daily Comparison" value="6.47%" trend="up" />
            ),
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
              alt="Progress Bar"
              width="100%"
            />
          }
          footer={
            <>
              <Statistic
                value="70.98%"
                title="Fiscal Year Performance Completion Rate"
                layout="horizontal"
              />
              <Statistic
                value="86.98%"
                title="Performance Completion Rate Same Period Last Year"
                layout="horizontal"
              />
              <Statistic
                value="88.98%"
                title="Performance Completion Rate Same Period Year Before Last"
                layout="horizontal"
              />
            </>
          }
        />
        <StatisticCard.Group
          colSpan={responsive ? 24 : 18}
          direction={responsive ? 'column' : undefined}
        >
          <StatisticCard
            statistic={{
              title: 'Total Revenue for the Fiscal Year',
              value: 601987768,
              description: (
                <Statistic title="Daily Comparison" value="6.15%" trend="up" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="Line Chart"
                width="100%"
              />
            }
          >
            <Statistic
              title="Total Market Revenue"
              value={1982312}
              layout="vertical"
              description={
                <Statistic
                  title="Daily Comparison"
                  value="6.15%"
                  trend="down"
                />
              }
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: 'Daily Ranking',
              value: 6,
              description: (
                <Statistic
                  title="Daily Comparison"
                  value="3.85%"
                  trend="down"
                />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="Line Chart"
                width="100%"
              />
            }
          >
            <Statistic
              title="Revenue in the Last 7 Days"
              value={17458}
              layout="vertical"
              description={
                <Statistic title="Daily Comparison" value="6.47%" trend="up" />
              }
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: 'Fiscal Year Performance Revenue Ranking',
              value: 2,
              description: (
                <Statistic title="Daily Comparison" value="6.47%" trend="up" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="Line Chart"
                width="100%"
              />
            }
          >
            <Statistic
              title="Monthly Payment Count"
              value={601}
              layout="vertical"
              description={
                <Statistic
                  title="Daily Comparison"
                  value="6.47%"
                  trend="down"
                />
              }
            />
          </StatisticCard>
        </StatisticCard.Group>
      </ProCard>
    </RcResizeObserver>
  );
};
