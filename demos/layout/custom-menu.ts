/**
 * 动态菜单示例数据（被 dynamic-menu.tsx 用 `menu.request` 模拟远程拉取）：
 * 保留嵌套三层结构以演示嵌套路由，但把原先的 one/two 占位名换成电商业务语义，
 * 让 demo 一眼能看懂「从服务端请求到菜单数据后，渲染出的就是真实业务菜单」。
 */
export default [
  {
    path: '/',
    name: '工作台',
    routes: [
      {
        path: '/welcome',
        name: '欢迎页',
        routes: [
          {
            path: '/welcome/welcome',
            name: '业务概览',
            exact: true,
          },
        ],
      },
    ],
  },
  {
    path: '/demo',
    name: '示例中心',
  },
];
