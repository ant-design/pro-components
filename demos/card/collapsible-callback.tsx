import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBlockEnd: 12 }}>
        onCollapse 回调：{collapsed ? '已收起' : '已展开'}
      </div>
      <ProCard
        title="点击标题切换折叠"
        collapsible="header"
        defaultCollapsed
        onCollapse={setCollapsed}
      >
        这里是卡片内容。
      </ProCard>
    </div>
  );
};
