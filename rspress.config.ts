import path from 'path';

import { pluginPreview } from '@rspress/plugin-preview';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { defineConfig } from '@rspress/core';
import { pluginGoogleAnalytics } from 'rsbuild-plugin-google-analytics';

const SITE_URL = 'https://procomponents.ant.design';

// plugin-preview 会把代码块内容拷贝到 node_modules/.rspress/virtual-demo/，
// demos/ 里以下相对导入在虚拟模块中无法解析，需在构建层显式别名。
const DEMO_HELPER_ALIASES = {
  './_defaultProps': path.join(__dirname, 'demos/layout/_defaultProps.tsx'),
  './_demoHandlers': path.join(__dirname, 'demos/layout/_demoHandlers.ts'),
  './complex-menu': path.join(__dirname, 'demos/layout/complex-menu.ts'),
  './custom-menu': path.join(__dirname, 'demos/layout/custom-menu.ts'),
  './_modal-form-request-destroy': path.join(
    __dirname,
    'demos/form/modal-form/_modal-form-request-destroy.tsx',
  ),
  './_drawer-form-request-destroy': path.join(
    __dirname,
    'demos/form/modal-form/_drawer-form-request-destroy.tsx',
  ),
  '../mockData': path.join(__dirname, 'demos/mockData.ts'),
  '../../mockData': path.join(__dirname, 'demos/mockData.ts'),
};

export default defineConfig({
  root: 'site',
  themeDir: 'theme',
  // zh-CN 为默认语言：路由无 /zh-CN 前缀，与旧 dumi 站点 URL 完全一致
  lang: 'zh-CN',
  title: 'ProComponents',
  description: '🏆 让中后台开发更简单，包含 table form 等多个组件',
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
  locales: [
    {
      lang: 'zh-CN',
      label: '中文',
      title: 'ProComponents',
      description: '🏆 让中后台开发更简单',
    },
    {
      lang: 'en-US',
      label: 'English',
      title: 'ProComponents',
      description: '🏆 Making middle and back-end development easier',
    },
  ],
  outDir: 'dist',
  // 生产构建输出静态站点（对齐 dumi exportStatic）
  ssg: true,
  plugins: [
    // 组件 demo 预览：```tsx file="<root>/demos/xxx.tsx" preview
    pluginPreview({ previewLanguages: ['tsx', 'jsx'] }),
    pluginSitemap({ siteUrl: SITE_URL }),
  ],
  head: [
    '<meta property="og:site_name" content="ProComponents">',
    '<meta property="og:image" content="https://procomponents.ant.design/icon.png">',
    '<meta property="og:description" content="🏆 让中后台开发更简单">',
    '<meta name="keywords" content="中后台,admin,Ant Design,ant design,Table,react,alibaba">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
    '<meta name="theme-color" content="#1890ff">',
    '<meta name="google-site-verification" content="9LDp--DeEC-xOggsHl_t1MlR_1_2O972JpSUu8NZKMU">',
  ],
  globalStyles: path.join(__dirname, 'site/theme/site-defaults.css'),
  builderConfig: {
    resolve: { alias: DEMO_HELPER_ALIASES },
    plugins: [pluginGoogleAnalytics({ id: 'G-RMBLDHGL1N' })],
  },
  // logo/logoText 在 Rspress 2.x 属于顶层配置而非 themeConfig
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  logoText: 'ProComponents',
  themeConfig: {
    lastUpdated: true,
    footer: {
      // Rspress 2.x footer 支持 HTML 字符串（renderHtmlOrText 渲染）
      message: `Open-source MIT Licensed | © 2017-present, Powered by <a href="https://rspress.dev" target="_blank" rel="noreferrer">Rspress</a>`,
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/ant-design/pro-components',
      },
    ],
  },
});
