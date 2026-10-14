import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  {
    path: '/projects',
    name: '项目管理',
    routes: [
      { path: '/projects/active', name: '进行中' },
      { path: '/projects/archive', name: '已归档' },
    ],
  },
  {
    path: '/reports',
    name: '报表中心',
    routes: [
      { path: '/reports/daily', name: '日报' },
      { path: '/reports/monthly', name: '月报' },
    ],
  },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/projects/active' }}
      route={{ routes }}
      menu={{ type: 'group' }}
    >
      <PageContainer title="分组菜单">
        项目管理与报表中心以菜单分组显示。
      </PageContainer>
    </ProLayout>
  </div>
);
