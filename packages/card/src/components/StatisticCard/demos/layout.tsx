import React, { useState } from 'react';
import { StatisticCard, ProCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import Ring from './charts/Ring';
import Line from './charts/Line';
import ChartTable from './charts/ChartTable';

const { Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 640);
      }}
    >
      <ProCard
        title="数据概览"
        extra="2019年9月28日 星期五"
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日全部流量',
                  value: 234,
                  description: <Statistic title="较本月平均流量" value="8.04%" trend="down" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月累计流量',
                  value: 234,
                  description: <Statistic title="月同比" value="8.04%" trend="up" />,
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '运行中实验',
                  value: '12/56',
                  suffix: '个',
                }}
              />
              <StatisticCard
                statistic={{
                  title: '历史实验总数',
                  value: '134',
                  suffix: '个',
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard title="流量走势" chart={<Line height={250} />} />
        </ProCard>
        <StatisticCard
          title="流量占用情况"
          chart={
            <>
              <Ring />
              <ChartTable />
            </>
          }
        />
      </ProCard>
    </RcResizeObserver>
  );
};
