import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { Button, Space, Steps } from 'antd';
import { useState } from 'react';

const Demo = () => {
  const [current, setCurrent] = useState(0);
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
          split={responsive ? 'horizontal' : 'vertical'}
          variant="outlined"
          style={{ height: 320 }}
        >
          <ProCard colSpan={responsive ? 24 : 6}>
            <Steps
              orientation={responsive ? 'horizontal' : 'vertical'}
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
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
