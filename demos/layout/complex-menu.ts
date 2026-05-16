/**
 * 复杂菜单模板数据：覆盖多级嵌套、默认展开、相同子路径、hideInMenu 等典型 demo 需求。
 * 统一使用电商业务语义（工作台 / 商品中心 / 订单中心 / 系统管理），与 `_defaultProps.tsx` 对齐。
 *
 * 注意：本数据被多个 demo 共用（default-open-all-menu / menu-group-complex / nested-layout / top-menu-nested / search-menu），
 * 修改路径字段时需同步更新这些 demo 中的 `location.pathname` 以保持默认高亮项可见。
 */
export default [
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
  {
    path: '/order',
    name: '订单中心',
    locale: 'menu.order',
    routes: [
      {
        path: '/order/sales',
        name: '销售订单',
        locale: 'menu.order.sales',
      },
      {
        path: '/order/refund',
        name: '退款售后',
        locale: 'menu.order.refund',
      },
      {
        path: '/order/invoice',
        name: '发票申请',
        locale: 'menu.order.invoice',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    locale: 'menu.system',
    routes: [
      {
        path: '/system/users',
        name: '用户管理',
        locale: 'menu.system.users',
      },
      {
        path: '/system/roles',
        name: '角色权限',
        locale: 'menu.system.roles',
      },
      {
        path: '/system/audit-logs',
        name: '操作日志',
        locale: 'menu.system.auditLogs',
        hideInMenu: true,
      },
    ],
  },
];
