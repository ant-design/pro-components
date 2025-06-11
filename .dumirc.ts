import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  sitemap: { hostname: 'https://procomponents.ant.design' },
  alias: {
    '@ant-design/pro-components': path.resolve(__dirname, 'src'),
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
  analytics: {
    ga_v2: 'G-RMBLDHGL1N',
  },
  favicons: [
    'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
  ],
  resolve: {
    docDirs: ['docs', 'docs/components/**'],
  },
  styles: [`.markdown table{table-layout: fixed;}`],
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  // ssr: {},
  themeConfig: {
    lastUpdated: true,
    hero: {
      title: 'ProComponents',
      description: '🏆 让中后台开发更简单',
      actions: {
        text: '🏮🏮 快速开始 →',
        link: '/docs/intro',
      },
    },
    features: [
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/q48YQ5X4ytAAAAAAAAAAAAAAFl94AQBr',
        title: '简单易用',
        description: '在 Ant Design 上进行了自己的封装，更加易用',
      },
      {
        image:
          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        description: '与 Ant Design 设计体系一脉相承，无缝对接 Ant Design 项目',
      },
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/UKqDTIp55HYAAAAAAAAAAAAAFl94AQBr',
        title: '国际化',
        description: '提供完备的国际化，与 Ant Design 体系打通，无需多余配置',
      },

      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Y_NMQKxw7OgAAAAAAAAAAAAAFl94AQBr',
        title: '预设样式',
        description:
          '样式风格与 Ant Design 一脉相承，无需魔改，浑然天成。默认好用的主题系统',
      },
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/U3XjS5IA1tUAAAAAAAAAAAAAFl94AQBr',
        title: '预设行为',
        description: '更少的代码，更少的 Bug，更多的功能',
      },

      {
        image:
          'https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg',
        title: 'TypeScript',
        description:
          '使用 TypeScript 开发，提供完整的类型定义文件，无需频繁打开官网',
      },
    ],
    siteToken: { demoInheritSiteTheme: true },
    name: 'ProComponents',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    socialLinks: {
      github: 'https://github.com/ant-design/pro-components',
    },
    apiHeader: false,
  },
  hash: true,
  ignoreMomentLocale: true,
});
