import type { MenuDataItem } from '@umijs/route-utils';
import type { MenuTheme } from 'antd/lib/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

export type RenderSetting = {
  headerRender?: false;
  footerRender?: false;
  menuRender?: false;
  menuHeaderRender?: false;
};
export type PureSettings = {
  /** @name theme for nav menu */
  navTheme?: MenuTheme | 'realDark' | undefined;

  /** @name 顶部菜单的颜色，mix 模式下生效 */
  headerTheme?: MenuTheme;
  /** @name nav menu position: `side` or `top` */
  headerHeight?: number;
  /** @name customize header height */
  layout?: 'side' | 'top' | 'mix';
  /** @name layout of content: `Fluid` or `Fixed`, only works when layout is top */
  contentWidth?: ContentWidth;
  /** @name sticky header */
  fixedHeader?: boolean;
  /** @name sticky siderbar */
  fixSiderbar?: boolean;
  /** @name menu 相关的一些配置 */
  menu?: {
    locale?: boolean;
    defaultOpenAll?: boolean;
    ignoreFlatMenu?: boolean; // 是否忽略用户手动折叠过的菜单状态，如选择忽略，折叠按钮切换之后也可实现展开所有菜单
    loading?: boolean;
    onLoadingChange?: (loading?: boolean) => void;
    params?: Record<string, any>;
    request?: (
      params: Record<string, any>,
      defaultMenuData: MenuDataItem[],
    ) => Promise<MenuDataItem[]>;
    type?: 'sub' | 'group';
    autoClose?: false;
  };
  /**
   * 设置为 false，在 layout 中只展示 pageName，而不是 pageName - title
   *
   * @name Layout 的 title，也会显示在浏览器标签上
   */
  title?: string | false;
  /**
   * Your custom iconfont Symbol script Url eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
   * 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理 Usage: https://github.com/ant-design/ant-design-pro/pull/3517
   */
  iconfontUrl?: string;
  /** @name 主色，需要配合 umi 使用 */
  primaryColor?: string;
  /** @name 全局增加滤镜 */
  colorWeak?: boolean;
  /**
   * 只在 mix 模式下生效
   *
   * @name 切割菜单
   */
  splitMenus?: boolean;
};

export type ProSettings = PureSettings & RenderSetting;

const defaultSettings: ProSettings = {
  navTheme: 'dark',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  headerHeight: 48,
  iconfontUrl: '',
  primaryColor: 'daybreak',
  splitMenus: false,
};
export default defaultSettings;
