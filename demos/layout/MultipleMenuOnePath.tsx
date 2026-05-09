import { PageContainer, ProLayout } from '@ant-design/pro-components';

const Demo = () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/product/template/new',
      }}
      menu={{
        hideMenuWhenCollapsed: true,
      }}
      route={{
        /**
         * 本 demo 核心：演示「多个菜单项指向相近 path（new/edit/detail 复用）」的场景。
         * 数据换成电商业务（商品中心/订单中心/会员中心/系统管理/工具），
         * 但保留 new / edit / detail / :id 这种同名子路径复用关系。
         */
        routes: [
          {
            path: '/product',
            name: '商品中心',
            routes: [
              {
                path: 'list',
                name: '商品列表',
                indexRoute: {
                  component: 'ProductList/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ProductList/New',
                  },
                  {
                    path: 'edit/:productKey',
                    component: 'ProductList/Edit',
                  },
                  {
                    path: 'detail/:productKey',
                    component: 'ProductList/Detail',
                  },
                ],
              },
              {
                path: 'manage',
                name: '上下架管理',
                indexRoute: {
                  component: 'ProductManage/index',
                },
                routes: [
                  {
                    path: 'detail/:productKey',
                    component: 'ProductManage/Detail',
                  },
                ],
              },
              {
                path: 'template',
                name: '商品模板管理',
                indexRoute: {
                  component: 'ProductTemplate/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ProductTemplate/New',
                  },
                  {
                    path: 'edit/:templateKey',
                    component: 'ProductTemplate/Edit',
                  },
                  {
                    path: 'detail/:templateKey',
                    component: 'ProductTemplate/Detail',
                  },
                ],
              },
              {
                path: 'attribute',
                name: '属性模板管理',
                indexRoute: {
                  component: 'ProductAttribute/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ProductAttribute/New',
                  },
                  {
                    path: 'edit/:productKey',
                    component: 'ProductAttribute/Edit',
                  },
                  {
                    path: 'detail/:productKey',
                    component: 'ProductAttribute/Detail',
                  },
                ],
              },
              {
                path: 'category',
                name: '商品分类',
                component: 'ProductCategory',
              },
            ],
          },
          {
            path: 'order',
            name: '订单中心',
            routes: [
              {
                path: 'sales',
                name: '销售订单',
                component: 'OrderSales',
              },
              {
                path: 'refund',
                name: '退款售后',
                component: 'OrderRefund',
              },
            ],
          },
          {
            path: 'finance',
            name: '财务结算',
            routes: [
              {
                path: 'invoice',
                name: '发票管理',
                component: 'FinanceInvoice',
              },
              {
                path: 'bill',
                name: '对账单',
                component: 'FinanceBill',
              },
              {
                path: 'billItem',
                name: '对账明细',
                component: 'FinanceBillItem',
              },
            ],
          },
          {
            path: 'member',
            name: '会员中心',
            routes: [
              {
                path: 'bankAccount',
                name: '会员银行卡',
                component: 'MemberBankAccount',
              },
              {
                path: 'userGroup',
                name: '会员分组',
                component: 'MemberGroup',
              },
              {
                path: 'userId',
                name: '会员查询',
                component: 'MemberSearch',
              },
              {
                path: 'register',
                name: '新会员注册',
                indexRoute: {
                  component: 'MemberRegister/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'MemberRegister/Apply',
                  },
                  {
                    path: 'bind/:id',
                    component: 'MemberRegister/BindAccount',
                  },
                ],
              },
            ],
          },
          {
            path: 'tools',
            name: '小工具',
            routes: [
              {
                path: 'excel-importer',
                name: 'Excel 批量导入',
                component: 'ToolExcel',
              },
            ],
          },
        ],
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
