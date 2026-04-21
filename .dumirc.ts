import path from 'path';

import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'ProComponents',
  exportStatic: {},
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
    docDirs: ['site'],
  },
  plugins: [path.join(__dirname, 'site-dumi-plugin')],
  styles: [
    `.markdown table{table-layout: fixed;}`,
    // 组件文档：标题层级与示例块节奏（dumi 默认 previewer 已有 margin，此处补足文内排版）
    `.markdown > h2 { margin-top: 40px; margin-bottom: 16px; font-weight: 600; }`,
    `.markdown > h2:first-child { margin-top: 0; }`,
    `.markdown > h3 { margin-top: 28px; margin-bottom: 12px; font-weight: 600; }`,
    `.markdown > h4 { margin-top: 22px; margin-bottom: 8px; font-weight: 600; }`,
    `.markdown > p { margin: 12px 0; line-height: 1.75; max-width: 960px; }`,
    `.markdown > ul, .markdown > ol { margin: 12px 0 16px; padding-left: 1.25em; line-height: 1.75; }`,
    `.dumi-default-previewer { margin: 28px 0 36px !important; }`,
    `.markdown .dumi-default-previewer:first-of-type { margin-top: 20px !important; }`,
  ],
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  // ssr: {},
  themeConfig: {
    name: 'ProComponents',
    footer:
      'Powered by <a href="https://d.umijs.org" target="_blank" rel="noreferrer">dumi</a>',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    socialLinks: {
      github: 'https://github.com/ant-design/pro-components',
    },
    lastUpdated: true,
    hero: {
      title: 'ProComponents',
      description: '🏆 让中后台开发更简单',
      actions: {
        text: '🏮🏮 快速开始 →',
        link: '/components',
      },
    },

    hash: true,
    ignoreMomentLocale: true,
    features: {
      'zh-CN': [
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
          description:
            '与 Ant Design 设计体系一脉相承，无缝对接 Ant Design 项目',
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
      'en-US': [
        {
          image:
            'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/q48YQ5X4ytAAAAAAAAAAAAAAFl94AQBr',
          title: 'Easy to Use',
          description:
            'Built on top of Ant Design with extra encapsulations for better usability',
        },
        {
          image:
            'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          title: 'Ant Design',
          description:
            'Aligned with Ant Design design system for seamless integration',
        },
        {
          image:
            'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/UKqDTIp55HYAAAAAAAAAAAAAFl94AQBr',
          title: 'Internationalization',
          description:
            'Provides full i18n support integrated with Ant Design—no extra config needed',
        },
        {
          image:
            'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Y_NMQKxw7OgAAAAAAAAAAAAAFl94AQBr',
          title: 'Preset Styles',
          description:
            'Styling aligned with Ant Design—ready-to-use themes without heavy customization',
        },
        {
          image:
            'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/U3XjS5IA1tUAAAAAAAAAAAAAFl94AQBr',
          title: 'Preset Behaviors',
          description: 'Less code, fewer bugs, more built-in functionality',
        },
        {
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg',
          title: 'TypeScript',
          description:
            'Developed with TypeScript and ships full type definitions for a better DX',
        },
      ],
    },
    nav: {
      'zh-CN': [
        { title: '文档', link: '/docs' },
        { title: '组件', link: '/components' },
        { title: 'Changelog', link: '/changelog' },
        { title: 'Playground', link: '/playground' },
        {
          title: '国内镜像',
          link: 'https://pro-components.antdigital.dev',
        },
      ],
      'en-US': [
        { title: 'Docs', link: '/en-US/docs' },
        { title: 'Components', link: '/en-US/components' },
        { title: 'Changelog', link: '/en-US/changelog' },
        { title: 'Playground', link: '/en-US/playground' },
      ],
    },
    sidebar: {
      '/en-US/components': [
        {
          title: 'Architecture Design',
          children: [
            {
              title: 'Component Design',
              link: '/en-US/components',
            },
          ],
        },
        {
          title: 'Layout',
          children: [
            {
              title: 'ProLayout',
              link: '/en-US/components/layout',
            },
            {
              title: 'PageContainer',
              link: '/en-US/components/page-container',
            },
            {
              title: 'ProCard',
              link: '/en-US/components/card',
            },

            {
              title: 'StatisticCard',
              link: '/en-US/components/statistic-card',
            },
            {
              title: 'CheckCard',
              link: '/en-US/components/check-card',
            },
          ],
        },
        {
          title: 'Data Entry',
          children: [
            {
              title: 'ProForm',
              link: '/en-US/components/form',
            },
            {
              title: 'ProFormFields',
              link: '/en-US/components/field-set',
            },
            {
              title: 'ProFormList',
              link: '/en-US/components/group',
            },
            {
              title: 'ProFormDependency',
              link: '/en-US/components/dependency',
            },
            {
              title: 'Schema Form',
              link: '/en-US/components/schema-form',
            },
            {
              title: 'Query/LightFilter',
              link: '/en-US/components/query-filter',
            },
            {
              title: 'StepsForm',
              link: '/en-US/components/steps-form',
            },
            {
              title: 'Modal/Drawer Form',
              link: '/en-US/components/modal-form',
            },
            {
              title: 'LoginForm/LoginPageForm',
              link: '/en-US/components/login-form',
            },
          ],
        },
        {
          title: 'Data Display',
          children: [
            {
              title: 'ProTable',
              link: '/en-US/components/table',
            },
            {
              title: 'EditableProTable',
              link: '/en-US/components/editable-table',
            },
            {
              title: 'DragSortTable',
              link: '/en-US/components/drag-sort-table',
            },
            {
              title: 'ProList',
              link: '/en-US/components/list',
            },
            {
              title: 'ProDescriptions',
              link: '/en-US/components/descriptions',
            },
          ],
        },
        {
          title: 'Universal',
          children: [
            {
              title: 'ProSkeleton',
              link: '/en-US/components/skeleton',
            },
            {
              title: 'ProField',
              link: '/en-US/components/field',
            },
          ],
        },
      ],
      '/components': [
        {
          title: '架构设计',
          children: [
            {
              title: 'Components - 组件设计',
              link: '/components',
            },
          ],
        },
        {
          title: '布局',
          children: [
            {
              title: 'ProLayout - 高级布局',
              link: '/components/layout',
            },
            {
              title: 'PageContainer - 页容器',
              link: '/components/page-container',
            },
            {
              title: 'ProCard - 高级卡片',
              link: '/components/card',
            },

            {
              title: 'StatisticCard - 指标卡',
              link: '/components/statistic-card',
            },
            {
              title: 'CheckCard - 多选卡片',
              link: '/components/check-card',
            },
          ],
        },
        {
          title: '数据录入',
          children: [
            {
              title: 'ProForm - 高级表单',
              link: '/components/form',
            },
            {
              title: 'ProFormFields - 表单项',
              link: '/components/field-set',
            },
            {
              title: 'ProFormList - 数据结构化',
              link: '/components/group',
            },
            {
              title: 'ProFormDependency - 数据联动',
              link: '/components/dependency',
            },
            {
              title: 'Schema Form - JSON 表单',
              link: '/components/schema-form',
            },
            {
              title: ' Query/LightFilter - 筛选表单',
              link: '/components/query-filter',
            },
            {
              title: 'StepsForm - 分步表单',
              link: '/components/steps-form',
            },
            {
              title: 'Modal/Drawer - 浮层表单',
              link: '/components/modal-form',
            },
            {
              title: 'LoginForm/Page - 登录表单',
              link: '/components/login-form',
            },
          ],
        },
        {
          title: '数据展示',
          children: [
            {
              title: 'ProTable - 高级表格',
              link: '/components/table',
            },
            {
              title: 'EditableProTable - 可编辑表格',
              link: '/components/editable-table',
            },
            {
              title: ' DragSortTable - 拖动排序表格',
              link: '/components/drag-sort-table',
            },
            {
              title: 'ProList - 高级列表',
              link: '/components/list',
            },
            {
              title: 'ProDescriptions - 定义列表',
              link: '/components/descriptions',
            },
          ],
        },
        {
          title: '通用',
          children: [
            {
              title: 'ProSkeleton - 骨架屏',
              link: '/components/skeleton',
            },
            {
              title: 'ProField - 原子组件',
              link: '/components/field',
            },
          ],
        },
      ],
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
});
