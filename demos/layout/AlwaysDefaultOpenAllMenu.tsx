import { PageContainer, ProLayout } from '@ant-design/pro-components';

const Demo = () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/product/list/on-sale',
      }}
      collapsed={false}
      collapsedButtonRender={false}
      route={{
        /** 演示 `defaultOpenAll + ignoreFlatMenu`：所有子菜单默认展开，
         *  数据统一改用电商业务语义，便于阅读示例。 */
        routes: [
          {
            path: '/dashboard',
            name: '工作台',
            locale: 'menu.dashboard',
            routes: [
              {
                path: '/dashboard/overview',
                name: '业务概览',
                hideInMenu: true,
                locale: 'menu.dashboard.overview',
              },
              {
                path: '/dashboard/search',
                name: '搜索结果',
                hideInMenu: true,
                locale: 'menu.dashboard.search',
              },
            ],
          },
          {
            path: '/product',
            name: '商品中心',
            locale: 'menu.product',
            routes: [
              {
                collapsed: true,
                menuName: '商品列表',
                name: '商品列表',
                path: '/product/list',
                routes: [
                  {
                    id: 2,
                    name: '在售商品',
                    path: '/product/list/on-sale',
                  },
                  {
                    name: '已下架商品',
                    path: '/product/list/off-shelf?category=electronics&source=manual',
                  },
                ],
              },
              {
                name: '商品分类',
                path: '/product/category',
                routes: [
                  {
                    name: '一级分类',
                    path: '/product/category/level-1',
                  },
                  {
                    name: '二级分类',
                    key: 'level=2&parent=root',
                    path: '/product/category/level-2',
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

export default () => (
  <div>
    <Demo />
  </div>
);
