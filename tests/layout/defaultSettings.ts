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
  colorPrimary: string;
  colorWeak?: boolean;
  splitMenus?: boolean;
};

export type ProSettings = PureSettings & RenderSetting;

const defaultSettings: ProSettings = {
  layout: 'side',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: false,
  menu: {
    locale: true,
  },
  title: 'Ant Design Pro',
  colorPrimary: '#1677FF',
};

export { defaultSettings };
