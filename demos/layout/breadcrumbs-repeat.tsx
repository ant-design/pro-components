import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  {
    path: '/projects',
    name: '项目',
    routes: [
      { path: '/projects/list', name: '项目列表' },
      { path: '/projects/detail', name: '项目详情', hideInMenu: true },
    ],
  },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/projects/detail' }}
      route={{ routes }}
      breadcrumbRender={(items) => [
        { path: '/', title: '首页' },
        ...(items || []),
      ]}
    >
      <PageContainer title="项目详情">
        面包屑最前面是自定义的“首页”。
      </PageContainer>
    </ProLayout>
  </div>
);
