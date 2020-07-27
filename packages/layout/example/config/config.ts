// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: false,
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  chainWebpack(memo) {
    memo.module.rule('ts-in-node_modules').include.clear();
    return memo;
  },
  history: {
    type: 'hash',
  },
  dynamicImport: false,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          layout: false,
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/admin',
          name: 'admin',
          icon: 'crown',
          access: 'canAdmin',
          component: './Admin',
          routes: [
            {
              path: '/admin/sub-page',
              name: 'sub-page',
              icon: 'crown',
              component: './Welcome',
            },
            {
              path: '/admin/sub-page2',
              name: 'sub-page2',
              icon: 'crown',
              component: './Welcome',
            },
            {
              path: '/admin/sub-page3',
              name: 'sub-page3',
              icon: 'crown',
              component: './Welcome',
            },
          ],
        },
        {
          name: 'list.table-list',
          icon: 'table',
          path: '/list',
          component: './ListTableList',
          routes: [
            {
              path: '/list/sub-page',
              name: 'sub-page',
              icon: 'crown',
              component: './Welcome',
            },
            {
              path: '/list/sub-page2',
              name: 'sub-page2',
              icon: 'crown',
              component: './Welcome',
            },
            {
              path: '/list/sub-page3',
              name: 'sub-page3',
              icon: 'crown',
              component: './Welcome',
            },
          ],
        },
        {
          path: '/',
          redirect: '/welcome',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
