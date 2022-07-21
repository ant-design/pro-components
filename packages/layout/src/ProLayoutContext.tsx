import React from 'react';

export type BaseDesignToken = {
  /**
   * 主色
   */
  primaryColor: string;

  /**
   *错误色
   */
  errorColor: string;

  /**
   * 成功色
   */
  successColor: string;

  /**
   *通知色
   */
  infoColor: string;

  /**
   *警告色
   */

  warningColor: string;

  /**
   * 正文色
   */
  colorText: string;
  /**
   * 次级色
   */
  colorTextSecondary: string;
  /**
   * 禁用的颜色
   */
  colorTextDisable: string;
  /**
   * 标题色
   */
  colorHeading: string;

  /**
   * 边框基本色
   */
  borderColorBase: string;

  /**
   * 分隔边框的颜色
   */
  borderColorSplit: string;

  /**
   * 默认阴影
   */
  boxShadowBase: string;

  /**
   * 默认圆角
   */
  borderRadiusBase: string;
};

export const baseDesignTokens: BaseDesignToken = {
  /**
   * 主色
   */
  primaryColor: '#1677FF',

  /**
   *错误色
   */
  errorColor: '#ff4d4f',

  /**
   * 成功色
   */
  successColor: '#1677FF',

  /**
   *通知色
   */
  infoColor: '#1677FF',

  /**
   *警告色
   */
  warningColor: '#faad14',

  /**
   * 正文色
   */
  colorText: 'rgba(0, 0, 0, 0.65)',
  /**
   * 标题色
   */
  colorHeading: 'rgba(0, 0, 0, 0.85)',
  /**
   * 次级色
   */
  colorTextSecondary: 'rgba(0, 0, 0, 0.45)',

  /**
   * 禁用的文本颜色
   */
  colorTextDisable: 'rgba(0, 0, 0, 0.25)',

  /**
   * 边框基本色
   */
  borderColorBase: '#d9d9d9',

  /**
   * 分隔边框的颜色
   */
  borderColorSplit: 'rgba(0, 0, 0, 0.06)',

  /**
   * 默认阴影
   */
  boxShadowBase: '',

  /**
   * 默认圆角
   */
  borderRadiusBase: '4px',
};

type BaseLayoutMenuDesignToken = {
  /**
   * menuItem 的字体颜色
   */
  menuTextColor: string;

  /**
   * menu 的二级字体颜色，比如 footer 和 action 的 icon
   */
  menuTextColorSecondary: string;
  /**
   * menuItem 的选中字体颜色
   */
  menuSelectedTextColor: string;

  /**
   * 顶部 MenuItem 的 padding 设置
   */
  horizontalMenuItemPadding: string;
  /**
   * subMenuItem 的选中字体颜色
   */
  subMenuSelectedTextColor: string;
  /**
   * menuItem 的 hover 背景颜色
   */
  menuItemHoverBgColor: string;
  /**
   * menuItem 的选中背景颜色
   */
  menuItemSelectedBgColor: string;

  /**
   * 收起 menuItem 的 hover 背景颜色
   */
  menuItemCollapsedHoverBgColor: string;
  /**
   * 收起 menuItem 的选中背景颜色
   */
  menuItemCollapsedSelectedBgColor: string;
};

type BaseLayoutDesignToken = {
  /**
   * layout 的背景颜色
   */
  layoutBgColor: string;
  /**
   * layout 的背景
   */
  layoutBg: string;
  /**
   * 跨站点应用的图标颜色
   */
  appListIconTextColor: string;
  /**
   * 跨站点应用的图标hover颜色
   */
  appListIconHoverTextColor: string;
  /**
   * 跨站点应用的图标hover背景颜色
   */
  appListIconHoverBgColor: string;

  /**
   * 侧边side的 token 配置
   */
  sider: BaseLayoutMenuDesignToken & {
    /**
     * menu 顶部 title 的字体颜色
     */
    menuTitleTextColor: string;
    /**
     * menu 的背景颜色
     */
    menuBackgroundColor: string;

    /**
     * 展开 menuItem 分割线的颜色
     */
    menuItemDividerColor: string;
    /**
     * menuItem 的箭头颜色
     */
    menuSubArrowColor: string;
    /**
     * 展开收起按钮背景颜色
     */
    collapsedButtonBgColor: string;
    /**
     *  展开收起按钮 hover 时字体颜色
     */
    collapsedButtonHoverTextColor: string;
    /**
     * 展开收起按钮字体颜色
     */
    collapsedButtonTextColor: string;
  };
  /**
   * header 的 token 设置
   */
  header: BaseLayoutMenuDesignToken & {
    /**
     * header 的标题颜色
     */
    headerTitleColor: string;
    /**
     * header 的背景颜色
     */
    headerBgColor: string;
    /**
     * 右上角字体颜色
     */
    rightActionsItemTextColor: string;
    /**
     * 右上角选中的 hover 颜色
     */
    rightActionsItemHoverBgColor: string;
  };

  /**
   * pageContainer
   */
  pageContainer: {
    /**
     * pageContainer 自带的 margin
     */
    pageContainerContentMargin: string;
    /**
     * pageContainer 的背景颜色
     */
    pageContainerBgColor: string;
    /**
     * pageContainer 被固定时的背景颜色
     */
    pageContainerFixedBgColor: string;
  };
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LayoutDesignToken = BaseLayoutDesignToken & BaseDesignToken;

// DesignToken 的默认样式
export const DefaultDesignToken = {
  layoutBgColor: '#f7f8fa',
  layoutBg: 'linear-gradient(#fff, #f7f8fa 28%)',
  appListIconTextColor: '#666',
  menuToken: {
    menuItemHoverBgColor: 'rgba(90, 75, 75, 0.03)',
    menuItemSelectedBgColor: 'rgba(0, 0, 0, 0.04)',
    menuItemCollapsedHoverBgColor: 'rgba(90, 75, 75, 0.03)',
    menuItemCollapsedSelectedBgColor: 'rgba(0, 0, 0, 0.04)',
    menuSelectedTextColor: 'rgb(0,0,0,0.95)',
    subMenuSelectedTextColor: 'rgb(0,0,0,0.95)',
    horizontalMenuItemPadding: '0 20px',
  },
  header: {
    headerBgColor: 'rgba(240, 242, 245, 0.4)',
    rightActionsItemHoverBgColor: 'rgba(0, 0, 0, 0.03)',
  },
  sider: {
    menuBackgroundColor: 'transparent',
    menuSubArrowColor: 'rgba(0, 0, 0, 0.25)',
    collapsedButtonBgColor: '#fff',
  },
  pageContainer: {
    pageContainerBgColor: 'transparent',
    pageContainerFixedBgColor: '#fff',
    pageContainerContentMargin: '0px 40px 0px 40px',
  },
};

export const getLayoutDesignToken: (
  baseDesignTokens: DeepPartial<LayoutDesignToken>,
) => LayoutDesignToken = (designTokens) => {
  const finalDesignTokens = { ...baseDesignTokens, ...designTokens };
  const menuToken = {
    menuTextColor: finalDesignTokens.colorText,
    menuTextColorSecondary: finalDesignTokens.colorTextSecondary,
    ...DefaultDesignToken.menuToken,
  };
  return {
    ...designTokens,
    layoutBgColor: '#f7f8fa',
    layoutBg: 'linear-gradient(#fff, #f7f8fa 28%)',
    appListIconTextColor: '#666',
    appListIconHoverTextColor: finalDesignTokens.colorText,
    appListIconHoverBgColor: menuToken.menuItemSelectedBgColor,
    ...finalDesignTokens,
    header: {
      ...menuToken,
      headerTitleColor: finalDesignTokens.colorHeading,
      rightActionsItemTextColor: finalDesignTokens.colorTextSecondary,
      ...DefaultDesignToken.header,
      ...finalDesignTokens.header,
    },
    sider: {
      ...menuToken,
      menuItemDividerColor: finalDesignTokens.borderColorSplit,
      menuTitleTextColor: finalDesignTokens.colorHeading,
      collapsedButtonTextColor: menuToken?.menuTextColorSecondary,
      collapsedButtonHoverTextColor: menuToken?.menuTextColor,
      ...DefaultDesignToken.sider,
      ...finalDesignTokens.sider,
    },
    pageContainer: {
      ...DefaultDesignToken.pageContainer,
      ...finalDesignTokens.pageContainer,
    },
  } as LayoutDesignToken;
};

const defaultToken = getLayoutDesignToken(baseDesignTokens);

export const ProLayoutContext = React.createContext<LayoutDesignToken>(defaultToken);

export type ProLayoutProviderProps = {
  token?: DeepPartial<LayoutDesignToken>;
  children?: React.ReactNode;
};

export const ProLayoutProvider: React.FC<ProLayoutProviderProps> = (props) => {
  return (
    <ProLayoutContext.Provider
      value={{
        ...getLayoutDesignToken(props?.token || {}),
      }}
    >
      {props.children}
    </ProLayoutContext.Provider>
  );
};
