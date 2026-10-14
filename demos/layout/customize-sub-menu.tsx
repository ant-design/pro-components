import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  {
    path: '/projects',
    name: '项目',
    routes: [
      { path: '/projects/active', name: '进行中' },
      { path: '/projects/archive', name: '已归档' },
    ],
  },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/projects/active' }}
      route={{ routes }}
      subMenuItemRender={(_, dom) => <span>分组：{dom}</span>}
    >
      <PageContainer title="子菜单标题">
        项目分组前的文字由 subMenuItemRender 添加。
      </PageContainer>
    </ProLayout>
  </div>
);
