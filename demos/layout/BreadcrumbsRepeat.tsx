import { PageContainer, ProLayout } from '@ant-design/pro-components';

const Demo = () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/order/sales/edit/123',
      }}
      breadcrumbRender={(routes) => [
        {
          path: '/',
          title: '首页',
        },
        ...(routes || []),
      ]}
      menuDataRender={() => [
        {
          path: '/workbench',
          name: '工作台',
        },
        {
          path: '/order',
          name: '订单中心',
          children: [
            {
              name: '销售订单',
              path: '/order/sales',
            },
            {
              name: '订单详情',
              path: '/order/sales/detail/:id',
              hideInMenu: true,
            },
            {
              name: '编辑订单',
              path: '/order/sales/edit/:id',
              hideInMenu: true,
            },
            {
              name: '新建订单',
              path: '/order/sales/add',
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

export default () => (
  <div>
    <Demo />
  </div>
);
