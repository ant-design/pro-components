export default [
  {
    path: '/home',
    name: '首页',
    icon: 'smile',
    locale: 'menu.home',
    children: [
      {
        path: '/home/overview',
        name: '概述',
        locale: 'menu.home.overview',
      },
      {
        path: '/home/search',
        name: '搜索',
        locale: 'menu.home.search',
      },
    ],
  },
  {
    path: '/data_hui',
    name: '汇总数据',
    icon: 'smile',
    locale: 'menu.data_hui',
    children: [
      {
        collapsed: true,
        menuName: '域&middot;买家维度交易',
        name: '域&middot;买家维度交易',
        icon: 'smile',
        children: [
          {
            id: 2,
            name: '_交易_买家_月表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
            icon: 'smile',
          },
          {
            name: '_航旅交易_买家_日表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
            icon: 'smile',
          },
        ],
      },
      {
        name: '域&middot;买家维度交易2',
        icon: 'smile',
        path: '/',
        children: [
          {
            name: '_交易_买家_月表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
            icon: 'smile',
          },
          {
            name: '_航旅交易_买家_日表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
            icon: 'smile',
          },
        ],
      },
      {
        name: '域&middot;买家维度交易2',
        icon: 'smile',
        path: '/',
        children: [
          {
            name: '_交易_买家_月表2',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
            icon: 'smile',
          },
          {
            name: '_航旅交易_买家_日表3',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
            icon: 'smile',
          },
        ],
      },
    ],
  },
  {
    path: '/data_ming',
    name: '明细数据',
    icon: 'smile',
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
    icon: 'smile',
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
