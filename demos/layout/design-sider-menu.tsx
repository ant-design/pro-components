import { ProLayout } from '@ant-design/pro-components';

export default () => (
  <div style={{ height: 560, overflow: 'auto' }}>
    <ProLayout
      title="侧栏宽度"
      siderWidth={256}
      route={{ routes: [{ path: '/dashboard', name: '工作台' }] }}
      location={{ pathname: '/dashboard' }}
    >
      <div style={{ padding: 24 }}>siderWidth：256px</div>
    </ProLayout>
  </div>
);
