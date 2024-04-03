import { ProCard } from '@ant-design/pro-components';
import { Button, Space, Steps } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Step } = Steps;

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
          >
            <Step title="填写基本信息" />
            <Step title="配置模板" />
            <Step title="配置访问" />
            <Step title="配置部署和调度" />
            <Step title="预览" />
          </Steps>
        </ProCard>
        <ProCard title="流量占用情况" colSpan={responsive ? 24 : 18}>
          <Space>
            <Button
              key="primary"
              type="primary"
              onClick={() => setCurrent(current + 1)}
              disabled={current === 5}
            >
              下一步
            </Button>
            <Button
              key="pre"
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
            >
              上一步
            </Button>
          </Space>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
