import React, { useState } from 'react';
import { Steps, Button, Space } from 'antd';
import ProCard from '@ant-design/pro-card';

const { Step } = Steps;

export default () => {
  const [current, setCurrent] = useState(0);
  return (
    <ProCard split="vertical" bordered>
      <ProCard colSpan="25%">
        <Steps direction="vertical" size="small" current={current} style={{ height: 320 }}>
          <Step title="填写基本信息" />
          <Step title="配置模板" />
          <Step title="配置访问" />
          <Step title="配置部署和调度" />
          <Step title="预览" />
        </Steps>
      </ProCard>
      <ProCard title="流量占用情况">
        <Space>
          <Button type="primary" onClick={() => setCurrent(current + 1)} disabled={current === 5}>
            下一步
          </Button>
          <Button onClick={() => setCurrent(current - 1)} disabled={current === 0}>
            上一步
          </Button>
        </Space>
      </ProCard>
    </ProCard>
  );
};
