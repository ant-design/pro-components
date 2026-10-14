import { PageContainer, ProLayout } from '@ant-design/pro-components';

const topRoutes = [
  { path: '/projects', name: '项目' },
  { path: '/reports', name: '报表' },
];
const sideRoutes = [
  { path: '/projects/overview', name: '概览' },
  { path: '/projects/tasks', name: '任务' },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      title="示例系统"
      layout="top"
      location={{ pathname: '/projects' }}
      route={{ routes: topRoutes }}
    >
      <ProLayout
        menuHeaderRender={false}
        location={{ pathname: '/projects/overview' }}
        route={{ routes: sideRoutes }}
        fixSiderbar={false}
        style={{ minHeight: 360 }}
      >
        <PageContainer title="项目概览">
          顶部切换模块，内层侧栏展示模块内页面。
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);
