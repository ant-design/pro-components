import { PageContainer, ProLayout } from '@ant-design/pro-components';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/admin/process/edit/123',
      }}
      breadcrumbRender={(routes) => [
        {
          path: '/',
          title: '主页',
        },
        ...(routes || []),
      ]}
      menuDataRender={() => [
        {
          path: '/welcome',
          name: '欢迎',
        },
        {
          path: '/admin',
          name: '管理',
          children: [
            {
              name: '申请单列表',
              path: '/admin/process',
            },
            {
              name: '申请单详情',
              path: '/admin/process/detail/:id',
              hideInMenu: true,
            },
            {
              name: '编辑申请单',
              path: '/admin/process/edit/:id',
              hideInMenu: true,
            },
            {
              name: '添加申请单',
              path: '/admin/process/add',
              hideInMenu: true,
            },
          ],
        },
      ]}
    >
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
