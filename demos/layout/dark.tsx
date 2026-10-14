import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';

export default () => (
  <ProConfigProvider dark>
    <div style={{ height: 540, overflow: 'auto' }}>
      <ProLayout
        title="暗色主题"
        route={{ routes: [{ path: '/demo', name: '示例页' }] }}
        location={{ pathname: '/demo' }}
      >
        <div style={{ minHeight: 360, padding: 24 }}>
          <h2>ProConfigProvider.dark</h2>
          <p>此布局使用 ProConfigProvider 的暗色主题。</p>
        </div>
      </ProLayout>
    </div>
  </ProConfigProvider>
);
