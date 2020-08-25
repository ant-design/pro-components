import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <ProCard title="复杂切分" extra="2019年9月28日" split="vertical" bordered headerBordered>
      <ProCard split="horizontal">
        <ProCard split="horizontal">
          <ProCard split="vertical">
            <ProCard title="昨日全部流量">123</ProCard>
            <ProCard title="本月累计流量">234</ProCard>
            <ProCard title="今年累计流量">345</ProCard>
          </ProCard>
          <ProCard split="vertical">
            <ProCard title="运行中试验">12/56</ProCard>
            <ProCard title="历史试验总数">134 个</ProCard>
          </ProCard>
        </ProCard>
        <ProCard title="流量趋势">
          <div>图表</div>
          <div>图表</div>
          <div>图表</div>
          <div>图表</div>
          <div>图表</div>
        </ProCard>
      </ProCard>
      <ProCard title="流量占用情况">右侧内容</ProCard>
    </ProCard>
  );
};
