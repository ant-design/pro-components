import {
  CrownFilled,
  ShopOutlined,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '工作台',
        icon: <SmileFilled />,
        component: './Welcome',
      },
      {
        path: '/product',
        name: '商品管理',
        icon: <ShopOutlined />,
        component: './Product',
        routes: [
          {
            path: '/product/list',
            name: '商品列表',
            routes: [
              {
                path: 'on-sale',
                name: '在售商品',
                component: './Welcome',
              },
              {
                path: 'draft',
                name: '草稿箱',
                component: './Welcome',
              },
              {
                path: 'off-shelf',
                name: '已下架',
                component: './Welcome',
              },
            ],
          },
          {
            path: '/product/category',
            name: '商品分类',
            component: './Welcome',
          },
          {
            path: '/product/brand',
            name: '品牌管理',
            component: './Welcome',
          },
          {
            path: '/product/inventory',
            name: '库存管理',
            component: './Welcome',
          },
        ],
      },
      {
        path: '/order',
        name: '订单中心',
        icon: <TabletFilled />,
        component: './Order',
        routes: [
          {
            path: '/order/sales',
            name: '销售订单',
            routes: [
              {
                path: 'pending',
                name: '待付款',
                component: './Welcome',
              },
              {
                path: 'paid',
                name: '已付款',
                component: './Welcome',
              },
              {
                path: 'shipped',
                name: '已发货',
                component: './Welcome',
              },
              {
                path: 'completed',
                name: '已完成',
                component: './Welcome',
              },
            ],
          },
          {
            path: '/order/refund',
            name: '退款售后',
            component: './Welcome',
          },
          {
            path: '/order/invoice',
            name: '发票申请',
            component: './Welcome',
          },
        ],
      },
      {
        path: '/admin',
        name: '系统管理',
        icon: <CrownFilled />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/users',
            name: '用户管理',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: './Welcome',
          },
          {
            path: '/admin/roles',
            name: '角色权限',
            component: './Welcome',
          },
          {
            path: '/admin/menu',
            name: '菜单管理',
            component: './Welcome',
          },
          {
            path: '/admin/audit-logs',
            name: '操作日志',
            component: './Welcome',
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
  appList: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Ant Design',
      desc: '杭州市较知名的 UI 设计语言',
      url: 'https://ant.design',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      title: 'AntV',
      desc: '蚂蚁集团全新一代数据可视化解决方案',
      url: 'https://antv.vision/',
      target: '_blank',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
      title: 'Pro Components',
      desc: '专业级 UI 组件库',
      url: 'https://procomponents.ant.design/',
    },
    {
      icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
      title: 'umi',
      desc: '插件化的企业级前端应用框架。',
      url: 'https://umijs.org/zh-CN/docs',
    },

    {
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
      title: 'qiankun',
      desc: '可能是你见过最完善的微前端解决方案🧐',
      url: 'https://qiankun.umijs.org/',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      title: '知识库',
      desc: '团队知识创作与分享工具',
      url: 'https://www.yuque.com/',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
      title: 'Kitchen ',
      desc: 'Sketch 工具集',
      url: 'https://kitchen.alipay.com/',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
      title: 'dumi',
      desc: '为组件开发场景而生的文档工具',
      url: 'https://d.umijs.org/zh-CN',
    },
  ],
};
