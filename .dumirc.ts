import chalk from 'chalk';
import { readdirSync } from 'fs';
import path, { join } from 'path';
import { defineConfig } from 'dumi';
const theme = require('@ant-design/antd-theme-variable');

const headPkgList: string[] = [];
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
  .map((path) => [
    {
      dir: `packages/${path}/src`,
      type: path,
    },
  ])
  .reduce((acc, val) => acc.concat(val), []);

export default defineConfig({
  sitemap: { hostname: 'https://procomponents.ant.design' },
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

  styles: [
    `
    .dumi-default-header-left {
      min-width: 230px;
      margin-right: 32px;
  }
  `,
  ],
  alias,
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src' }, // 默认值
      ...[tailPkgList[0]],
    ],
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  themeConfig: {
    name: 'ProComponents',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    nav: {
      'zh-CN': [
        { title: '文档', link: '/docs' },
        { title: '组件', link: '/components' },
        { title: 'Changelog', link: '/changelog' },
        { title: 'Playground', link: '/playground/curd' },
      ],
      'en-US': [{ title: 'Blog', link: '/en/blog' }],
    },
    sidebar: {
      '/components': [
        {
          title: '架构设计',
          children: [
            {
              title: 'Components',
              link: 'components',
            },
            {
              title: 'Schema',
              link: 'schema',
            },
          ],
        },
        {
          title: '布局',
          children: [
            {
              title: 'Layout',
              link: 'layout',
            },
            {
              title: 'PageContainer',
              link: 'components/PageContainer/index',
            },
            {
              title: 'Card',
              link: 'card',
            },
            {
              title: 'WaterMark',
              link: 'components/WaterMark/index',
            },
            {
              title: 'StatisticCard',
              link: 'components/StatisticCard/index',
            },
            {
              title: 'CheckCard',
              link: 'components/CheckCard/index',
            },
          ],
        },
        {
          title: '数据录入',
          children: [
            {
              title: 'Form',
              link: 'form',
            },
            {
              title: 'FieldSet',
              link: 'components/FieldSet/index',
            },
            {
              title: 'Group',
              link: 'components/Group/index',
            },
            {
              title: 'Dependency',
              link: 'components/Dependency/index',
            },
            {
              title: 'SchemaForm',
              link: 'components/SchemaForm/index',
            },
            {
              title: 'QueryFilter',
              link: 'components/QueryFilter/index',
            },
            {
              title: 'StepsForm',
              link: 'components/StepsForm/index',
            },
            {
              title: 'ModalForm',
              link: 'components/ModalForm/index',
            },
            {
              title: 'LoginForm',
              link: 'components/LoginForm/index',
            },
          ],
        },
        {
          title: '数据展示',
          children: [
            {
              title: 'Table',
              link: 'table',
            },
            {
              title: 'EditableTable',
              link: 'components/EditableTable/index',
            },
            {
              title: 'DragSortTable',
              link: 'components/DragSortTable/index',
            },
            {
              title: 'List',
              link: 'list',
            },
            {
              title: 'Description',
              link: 'description',
            },
          ],
        },
        {
          title: '通用',
          children: [
            {
              title: 'Skeleton',
              link: 'skeleton',
            },
            {
              title: 'Field',
              link: 'field',
            },
          ],
        },
      ],
      // '/en-US/components': [
      //   {
      //     title: 'Architecture Design',
      //     children: ['components.en-US'],
      //   },
      //   {
      //     title: 'Layout',
      //     children: [
      //       'layout',
      //       'components/PageContainer/index',
      //       'components/DragSortTable/index',
      //       'list',
      //       'card',
      //     ],
      //   },
      //   {
      //     title: 'Data entry',
      //     children: [
      //       'form',
      //       'components/FieldSet/index',
      //       'components/Group/index',
      //       'components/Dependency/index',
      //       'components/SchemaForm/index',
      //       'components/QueryFilter/index',
      //       'components/StepsForm/index',
      //       'components/ModalForm/index',
      //       'components/LoginForm/index',
      //     ],
      //   },
      //   {
      //     title: 'Data Display',
      //     children: ['table', 'components/EditableTable/index', 'list', 'description'],
      //   },
      //   {
      //     title: 'General',
      //     children: ['skeleton', 'field'],
      //   },
      // ],
    },
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
  },

  hash: true,
  theme: {
    '@s-site-menu-width': '258px',
    '@ant-prefix': 'ant',
    '@root-entry-name': 'variable',
    ...theme,
    '@primary-color': '#1677FF',
    '@warning-color': '#faad14',
    '@heading-color': 'rgba(0, 0, 0, 0.85)',
    '@text-color': 'rgba(0, 0, 0, 0.65)',
    '@text-color-secondary': 'rgba(0, 0, 0, 0.45)',
    '@border-color-base': '#d9d9d9',
    '@border-color-split': 'rgba(0, 0, 0, 0.06)',
    '@border-radius-base': '4px',
    '@card-radius': '6px',
    '@table-border-radius-base': '6px',
    '@box-shadow-base':
      '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
  },
  extraBabelPlugins: ['@emotion'],
  ignoreMomentLocale: true,
});
