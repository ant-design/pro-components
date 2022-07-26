import type { MenuDataItem } from '@umijs/route-utils';
import type { MenuTheme } from 'antd/es/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

export type RenderSetting = {
  headerRender?: false;
  footerRender?: false;
  menuRender?: false;
  menuHeaderRender?: false;
};
export type PureSettings = {
  /**
   * @name theme for nav menu
   *
   * @type  "light" | "dark" | "realDark"
   */
  navTheme?: MenuTheme | 'realDark' | undefined;

  /**
   * @name 顶部菜单的颜色，mix 模式下生效
   * @type  "light" | "dark"
   */
  headerTheme?: MenuTheme;
  /**
   * @name customize header height
   * @example 顶栏高度修改为64 headerHeight={64}
   */
  headerHeight?: number;
  /**
   * @name layout 的布局方式
   * @type  'side' | 'top' | 'mix'
   *
   * @example 顶部菜单 layout="top"
   * @example 侧边菜单 layout="side"
   * @example 混合布局 既有顶部也有侧边 layout="mix"
   */
  layout?: 'side' | 'top' | 'mix';
  /** @name layout of content: `Fluid` or `Fixed`, only works when layout is top */
  contentWidth?: ContentWidth;
  /** @name sticky header */
  fixedHeader?: boolean;
  /** @name sticky siderbar */
  fixSiderbar?: boolean;
  /**
   * @name menu 相关的一些配置，可以配置菜单的行为
   *
   * @example 关闭菜单国际化  menu={{ locale: false }}
   * @example 默认打开所有的菜单 menu={{ defaultOpenAll:true }}
   * @example 让菜单处于loading 状态 menu={{ loading: true }}
   * @example 异步加载菜单数据 menu={{params:{ pathname } request: async (params) => { return [{name:"主页",path=params.pathname}]} }}
   * @example 使用 MenuGroup 来聚合菜单 menu={{ mode: 'group' }}
   * @example 取消自动关闭菜单 menu={{ autoClose: false }}
   * @example 忽略收起时自动关闭菜单 menu={{ ignoreFlatMenu: true }}
   */
  menu?: {
    /**
     * @name 菜单国际化的配置
     */
    locale?: boolean;
    hideMenuWhenCollapsed?: boolean;
    /**
     * 收起时也展示标题
     */
    collapsedShowTitle?: boolean;
    /**
     * 收起时也展示 分组菜单的标题
     */
    collapsedShowGroupTitle?: boolean;
    /**
     * @name 默认打开所有的菜单
     */
    defaultOpenAll?: boolean;
    /**
     * @name 是否忽略用户手动折叠过的菜单状态，如选择忽略，折叠按钮切换之后也可实现展开所有菜单
     */
    ignoreFlatMenu?: boolean;

    /**
     * @name 菜单的 loading 配置
     */
    loading?: boolean;
    /**
     * @name 菜单的 loading 发生改变
     */
    onLoadingChange?: (loading?: boolean) => void;

    /**
     * @name 菜单远程请求时用的参数，只有 params 变化才会重新触发 request
     *
     */
    params?: Record<string, any>;

    /**
     * @name 菜单远程请求的方法，只有 params 变化才会重新触发 request
     */
    request?: (
      params: Record<string, any>,
      defaultMenuData: MenuDataItem[],
    ) => Promise<MenuDataItem[]>;

    /**
     * @name 菜单聚合的模式
     */
    type?: 'sub' | 'group';
    /**
     * @name 取消自动关闭菜单
     */
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
  navTheme: 'light',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  headerHeight: 56,
  iconfontUrl: '',
  primaryColor: '#1677FF',
  splitMenus: false,
};
export { defaultSettings };
