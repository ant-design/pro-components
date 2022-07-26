import chalk from 'chalk';
import { readdirSync } from 'fs';
import { join } from 'path';

const theme = require('./default-theme');

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@ant-design/pro-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList
  .map((path) => [join('packages', path, 'src')])
  .reduce((acc, val) => acc.concat(val), []);

const isProduction = process.env.NODE_ENV === 'production';

const isDeploy = process.env.SITE_DEPLOY === 'TRUE';

export default {
  title: 'ProComponents',
  mode: 'site',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  sitemap: { hostname: 'https://procomponents.ant.design' },
  antd: {
    disableBabelPluginImport: true,
  },
  metas: [
    {
      property: 'og:site_name',
      content: 'ProComponents',
    },
    {
      'data-rh': 'keywords',
      property: 'og:image',
      content: 'https://procomponents.ant.design/icon.png',
    },
    {
      property: 'og:description',
      content: '🏆 让中后台开发更简单',
    },
    {
      name: 'keywords',
      content: '中后台,admin,Ant Design,ant design,Table,react,alibaba',
    },
    {
      name: 'description',
      content: '🏆 让中后台开发更简单 包含 table form 等多个组件。',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'theme-color',
      content: '#1890ff',
    },
    {
      name: 'google-site-verification',
      content: '9LDp--DeEC-xOggsHl_t1MlR_1_2O972JpSUu8NZKMU',
    },
  ],
  alias,
  resolve: {
    includes: [...tailPkgList, 'docs'],
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  navs: {
    'en-US': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ant-design/pro-components',
      },
    ],
    'zh-CN': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ant-design/pro-components',
      },
    ],
  },
  hash: true,
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  theme: {
    '@ant-prefix': 'ant',
    ...theme,
    '@s-site-menu-width': '258px',
    '@root-entry-name': 'variable',
    '@border-radius-base': '4px',
    '@primary-color': '#1677FF',
    '@error-color': '#ff4d4',
    '@info-color': '#52c41a',
    '@warning-color': '#faad14',
  },
  extraBabelPlugins: ['@emotion'],
  ignoreMomentLocale: true,
  menus: {
    '/components': [
      {
        title: '架构设计',
        children: ['components.md', 'schema.md'],
      },
      {
        title: '布局',
        children: [
          'layout',
          'components/PageContainer/index',
          'card',
          'components/WaterMark/index',
          'components/StatisticCard/index',
          'components/CheckCard/index',
        ],
      },
      {
        title: '数据录入',
        children: [
          'form',
          'components/FieldSet/index',
          'components/Group/index',
          'components/Dependency/index',
          'components/SchemaForm/index',
          'components/QueryFilter/index',
          'components/StepsForm/index',
          'components/ModalForm/index',
          'components/LoginForm/index',
        ],
      },
      {
        title: '数据展示',
        children: [
          'table',
          'components/EditableTable/index',
          'components/DragSortTable/index',
          'list',
          'description',
        ],
      },
      {
        title: '通用',
        children: ['skeleton', 'field'],
      },
    ],
    '/en-US/components': [
      {
        title: 'Architecture Design',
        children: ['components.en-US.md'],
      },
      {
        title: 'Layout',
        children: [
          'layout',
          'components/PageContainer/index',
          'components/DragSortTable/index',
          'list',
          'card',
        ],
      },
      {
        title: 'Data entry',
        children: [
          'form',
          'components/FieldSet/index',
          'components/Group/index',
          'components/Dependency/index',
          'components/SchemaForm/index',
          'components/QueryFilter/index',
          'components/StepsForm/index',
          'components/ModalForm/index',
          'components/LoginForm/index',
        ],
      },
      {
        title: 'Data Display',
        children: ['table', 'components/EditableTable/index', 'list', 'description'],
      },
      {
        title: 'General',
        children: ['skeleton', 'field'],
      },
    ],
  },
  ssr: isDeploy ? {} : undefined,
  webpack5: {},
  exportStatic: {},
  mfsu: !isDeploy ? {} : undefined,
};
