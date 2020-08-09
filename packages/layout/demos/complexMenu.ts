export default [
  {
    path: '/home',
    name: '首页',
    locale: 'menu.home',
    children: [
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
    children: [
      {
        collapsed: true,
        menuName: '域买家维度交易',
        name: '域买家维度交易',
        children: [
          {
            id: 2,
            name: '_交易_买家_月表',
            path: '/data_hui2',
          },
          {
            name: '_航旅交易_买家_日表',
            path: '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
          },
        ],
      },
      {
        name: '域买家维度交易2',
        path: '/',
        children: [
          {
            name: '_交易_买家_月表',
            path: '/data_hui3',
          },
          {
            name: '_航旅交易_买家_日表',
            key: 'tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
            path: '/data_hui4',
          },
        ],
      },
    ],
  },
  {
    path: '/data_ming',
    name: '明细数据',
    locale: 'menu.data_ming',
    children: [
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
    children: [
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
