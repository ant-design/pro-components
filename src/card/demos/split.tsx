import { ProCard } from '../../components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

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
        title="Complex Split"
        extra="September 28, 2019"
        bordered
        headerBordered
        split={responsive ? 'horizontal' : 'vertical'}
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split={responsive ? 'horizontal' : 'vertical'}>
              <ProCard title="Yesterday's Total Traffic">123</ProCard>
              <ProCard title="Total Traffic This Month">234</ProCard>
              <ProCard title="Total Traffic This Year">345</ProCard>
            </ProCard>
            <ProCard split="vertical">
              <ProCard title="Ongoing Experiments">12/56</ProCard>
              <ProCard title="Total Historical Experiments">134</ProCard>
            </ProCard>
          </ProCard>
          <ProCard title="Traffic Trends">
            <div>Chart</div>
            <div>Chart</div>
            <div>Chart</div>
            <div>Chart</div>
            <div>Chart</div>
          </ProCard>
        </ProCard>
        <ProCard title="Traffic Usage">Right Side Content</ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
