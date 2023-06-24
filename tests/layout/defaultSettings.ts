export type ContentWidth = 'Fluid' | 'Fixed';

export type RenderSetting = {
  /** @name false 时不展示顶栏 */
  headerRender?: false;
  /** @name false 时不展示页脚 */
  footerRender?: false;
  /** @name false 时不展示菜单 */
  menuRender?: false;
  /** @name false 时不展示菜单顶栏 */
  menuHeaderRender?: false;
};
export type PureSettings = {
  /**
   * @name theme for nav menu
   * @name 导航菜单的主题
   */
  navTheme?: 'light' | 'realDark';
  /**
   * Side 为正常模式，top菜单显示在顶部，mix 两种兼有
   *
   * @name nav menu position: `side` or `top`
   * @name 导航菜单的位置
   */
  layout: 'side' | 'top' | 'mix';
  /** Layout of content: `Fluid` or `Fixed`, only works when layout is top */
  contentWidth: ContentWidth;

  /** Sticky header */
  fixedHeader: boolean;
  /** Sticky siderbar */
  fixSiderbar: boolean;
  menu: {
    locale?: boolean;
    defaultOpenAll?: boolean;
    ignoreFlatMenu?: boolean;
  };
  title: string;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorPrimary: string;
  colorWeak?: boolean;
  splitMenus?: boolean;
};

export type ProSettings = PureSettings & RenderSetting;

const defaultSettings: ProSettings = {
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  menu: {
    locale: true,
  },
  title: 'Ant Design Pro',
  iconfontUrl: '',
  colorPrimary: '#1677FF',
};

export { defaultSettings };
