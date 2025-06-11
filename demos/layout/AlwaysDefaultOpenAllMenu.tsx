import { PageContainer, ProLayout } from '@ant-design/pro-components';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/data_hui/data_hui2',
      }}
      collapsed={false}
      collapsedButtonRender={false}
      route={{
        routes: [
          {
            path: '/home',
            name: '首页',
            locale: 'menu.home',
            routes: [
              {
                path: '/home/overview',
                name: '概述',
                hideInMenu: true,
                locale: 'menu.home.overview',
              },
              {
                path: '/home/search',
                name: '搜索',
                hideInMenu: true,
                locale: 'menu.home.search',
              },
            ],
          },
          {
            path: '/data_hui',
            name: '汇总数据',
            locale: 'menu.data_hui',
            routes: [
              {
                collapsed: true,
                menuName: '域买家维度交易',
                name: '域买家维度交易',
                path: '/xx',
                routes: [
                  {
                    id: 2,
                    name: '月表',
                    path: '/data_hui2',
                  },
                  {
                    name: '日表',
                    path: '/data_hui3?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                  },
                ],
              },
              {
                name: '维度交易',
                path: '/',
                routes: [
                  {
                    name: '月表',
                    path: '/data_hui4',
                  },
                  {
                    name: '日表',
                    key: 'tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                    path: '/data_hui5',
                  },
                ],
              },
            ],
          },
        ],
      }}
      menu={{
        defaultOpenAll: true,
        hideMenuWhenCollapsed: true,
        ignoreFlatMenu: true,
      }}
    >
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
