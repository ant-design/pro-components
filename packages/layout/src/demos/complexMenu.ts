export default [
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
  {
    path: '/data_ming',
    name: '明细数据',
    locale: 'menu.data_ming',
    routes: [
      {
        path: '/other/outLoadMenu',
        name: '菜单导出',
        locale: 'menu.other.outLoadMenu',
        hideInMenu: true,
      },
      {
        path: '/other/homeEdit',
        name: '概述导出',
        locale: 'menu.other.outHomeEdit',
      },
    ],
  },
  {
    path: '/other',
    name: '其他',
    locale: 'menu.other',
    routes: [
      {
        path: '/other/upLoad',
        name: 'odps同步导入',
        locale: 'menu.other.upLoad',
      },
      {
        path: '/other/upLoadMenu',
        name: '菜单导入',
        locale: 'menu.other.upLoadMenu',
      },
      {
        path: '/other/homeEdit',
        name: '概述编辑',
        locale: 'menu.other.homeEdit',
        hideInMenu: true,
      },
    ],
  },
];
