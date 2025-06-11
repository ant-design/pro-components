import { ProCard } from '@ant-design/pro-components';
import { Button, Space, Steps } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(0);
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        style={{ height: 320 }}
      >
        <ProCard colSpan={responsive ? 24 : 6}>
          <Steps
            direction={responsive ? 'horizontal' : 'vertical'}
            size="small"
            current={current}
            style={{ height: '100%' }}
            items={[
              { title: 'Fill in Basic Information' },
              { title: 'Configure Template' },
              { title: 'Configure Access' },
              { title: 'Configure Deployment and Scheduling' },
              { title: 'Preview' },
            ]}
          />
        </ProCard>
        <ProCard title="Traffic Usage" colSpan={responsive ? 24 : 18}>
          <Space>
            <Button
              key="primary"
              type="primary"
              onClick={() => setCurrent(current + 1)}
              disabled={current === 5}
            >
              Next
            </Button>
            <Button
              key="pre"
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
            >
              Previous
            </Button>
          </Space>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
