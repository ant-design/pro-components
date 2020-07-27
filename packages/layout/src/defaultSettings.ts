import { MenuTheme } from 'antd/es/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

export interface RenderSetting {
  headerRender?: false;
  footerRender?: false;
  menuRender?: false;
  menuHeaderRender?: false;
}
export interface PureSettings {
  /**
   * theme for nav menu
   */
  navTheme: MenuTheme | 'realDark' | undefined;
  /**
   * nav menu position: `side` or `top`
   */
  headerHeight?: number;
  /**
   * customize header height
   */
  layout: 'side' | 'top' | 'mix';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is top
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale?: boolean; defaultOpenAll?: boolean };
  title: string;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  primaryColor: string;
  colorWeak?: boolean;
  splitMenus?: boolean;
}

export type ProSettings = PureSettings & RenderSetting;

const defaultSettings: ProSettings = {
  navTheme: 'dark',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  menu: {
    locale: true,
  },
  headerHeight: 48,
  title: 'Ant Design Pro',
  iconfontUrl: '',
  primaryColor: '#1890ff',
};
export default defaultSettings;
