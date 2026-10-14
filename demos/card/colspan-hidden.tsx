import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={() => setShow((current) => !current)}>
        {show ? '隐藏设计卡片' : '显示设计卡片'}
      </Button>
      <ProCard gutter={8} style={{ marginBlockStart: 12 }}>
        <ProCard colSpan={show ? 12 : 0} variant="outlined">
          设计
        </ProCard>
        <ProCard colSpan={12} variant="outlined">
          开发
        </ProCard>
      </ProCard>
    </div>
  );
};
