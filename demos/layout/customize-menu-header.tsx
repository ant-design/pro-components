import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [{ path: '/dashboard', name: '工作台' }];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/dashboard' }}
      route={{ routes }}
      title="示例系统"
      menuHeaderRender={(_, title) => (
        <div style={{ padding: '0 12px', fontWeight: 600 }}>{title}</div>
      )}
    >
      <PageContainer title="菜单头部">
        “示例系统”由 menuHeaderRender 绘制。
      </PageContainer>
    </ProLayout>
  </div>
);
