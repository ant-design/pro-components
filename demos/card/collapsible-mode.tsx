import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard title="仅图标可触发" collapsible="icon" defaultCollapsed>
      点击图标后才会展开。
    </ProCard>
  </div>
);
