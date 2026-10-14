import { PageContainer, ProLayout } from '@ant-design/pro-components';

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/dashboard' }}
      route={{ routes: [{ path: '/dashboard', name: '工作台' }] }}
      menuRender={(_, menu) => (
        <div style={{ borderRight: '3px solid #1677ff' }}>{menu}</div>
      )}
    >
      <PageContainer title="自定义菜单容器">
        侧栏右侧的蓝色边框由 menuRender 添加。
      </PageContainer>
    </ProLayout>
  </div>
);
