import { PageContainer, ProLayout } from '@ant-design/pro-components';

const outerRoutes = [
  { path: '/workspace', name: '工作空间' },
  { path: '/settings', name: '设置' },
];
const innerRoutes = [
  { path: '/workspace/overview', name: '概览' },
  { path: '/workspace/members', name: '成员' },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      title="示例系统"
      location={{ pathname: '/workspace' }}
      route={{ routes: outerRoutes }}
      fixSiderbar={false}
    >
      <ProLayout
        title="工作空间"
        layout="top"
        location={{ pathname: '/workspace/overview' }}
        route={{ routes: innerRoutes }}
        style={{ minHeight: 360 }}
      >
        <PageContainer title="工作空间概览">
          外层侧栏选择工作空间，内层顶栏显示当前空间的页面。
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);
