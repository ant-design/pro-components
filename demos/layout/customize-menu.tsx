import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  { path: '/dashboard', name: '工作台' },
  { path: '/projects', name: '项目列表' },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/dashboard' }}
      route={{ routes }}
      menuItemRender={(_, dom) => <span>• {dom}</span>}
    >
      <PageContainer title="菜单项内容">
        每个菜单项前的圆点由 menuItemRender 添加。
      </PageContainer>
    </ProLayout>
  </div>
);
