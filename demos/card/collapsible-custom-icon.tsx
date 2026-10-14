import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard
      title="自定义折叠图标"
      collapsible="icon"
      defaultCollapsed
      collapsibleIconRender={({ collapsed }) => (
        <span>{collapsed ? '展开' : '收起'}</span>
      )}
    >
      自定义图标随折叠状态变化。
    </ProCard>
  </div>
);
