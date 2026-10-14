import {
  PageContainer,
  ProBreadcrumb,
  ProLayout,
} from '@ant-design/pro-components';

const routes = [
  {
    path: '/projects',
    name: '项目',
    routes: [{ path: '/projects/detail', name: '项目详情' }],
  },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      layout="mix"
      location={{ pathname: '/projects/detail' }}
      route={{ routes }}
      headerContentRender={() => <ProBreadcrumb />}
    >
      <PageContainer title="项目详情" breadcrumbRender={false}>
        面包屑由顶栏中的 ProBreadcrumb 显示。
      </PageContainer>
    </ProLayout>
  </div>
);
