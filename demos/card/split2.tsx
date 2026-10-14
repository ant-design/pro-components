import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

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
        <ProCard
          title="Left and Right Columns with Title"
          extra="September 28, 2019"
          split={responsive ? 'horizontal' : 'vertical'}
          variant="outlined"
          headerBordered
        >
          <ProCard title="Left Details" colSpan="50%">
            <div style={{ height: 360 }}>Left Content</div>
          </ProCard>
          <ProCard title="Traffic Usage">
            <div style={{ height: 360 }}>Right Content</div>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
