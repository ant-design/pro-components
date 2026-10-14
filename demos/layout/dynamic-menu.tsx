import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  { path: '/dashboard', name: '工作台' },
  { path: '/projects', name: '项目列表' },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/dashboard' }}
      menu={{
        request: async () => {
          await new Promise((resolve) => setTimeout(resolve, 400));
          return routes;
        },
      }}
    >
      <PageContainer title="异步菜单" content="左侧菜单由 menu.request 加载。">
        工作台
      </PageContainer>
    </ProLayout>
  </div>
);
