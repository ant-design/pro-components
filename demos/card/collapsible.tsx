import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={() => setCollapsed((current) => !current)}>
        {collapsed ? '展开卡片' : '收起卡片'}
      </Button>
      <ProCard
        title="受控折叠"
        collapsed={collapsed}
        style={{ marginBlockStart: 12 }}
      >
        只有展开后才显示此内容。
      </ProCard>
    </div>
  );
};
