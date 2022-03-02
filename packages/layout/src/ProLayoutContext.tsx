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
  textColor: string;
  /**
   * 次级色
   */
  textColorSecondary: string;
  /**
   * 标题色
   */
  headingColor: string;

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
  textColor: 'rgba(0, 0, 0, 0.65)',
  /**
   * 标题色
   */
  headingColor: 'rgba(0, 0, 0, 0.85)',
  /**
   * 次级色
   */
  textColorSecondary: 'rgba(0, 0, 0, 0.45)',

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

export const getLayoutDesignToken: (
  baseDesignTokens: DeepPartial<LayoutDesignToken>,
) => LayoutDesignToken = (designTokens) => {
  const finalDesignTokens = { ...baseDesignTokens, ...designTokens };
  const menuToken = {
    menuTextColor: finalDesignTokens.textColor,
    menuTextColorSecondary: finalDesignTokens.textColorSecondary,
    menuSelectedTextColor: 'rgb(0,0,0)',
    menuItemHoverBgColor: 'rgba(90, 75, 75, 0.03)',
    menuItemSelectedBgColor: 'rgba(0, 0, 0, 0.04)',
    menuItemCollapsedHoverBgColor: 'rgba(0, 145, 255, 0.1)',
    menuItemCollapsedSelectedBgColor: 'rgba(0, 145, 255, 0.08)',
  };
  return {
    ...designTokens,
    layoutBgColor: '#f0f2f5',
    appListIconTextColor: '#666',
    appListIconHoverTextColor: finalDesignTokens.textColor,
    appListIconHoverBgColor: menuToken.menuItemSelectedBgColor,
    ...finalDesignTokens,
    header: {
      ...menuToken,
      headerTitleColor: finalDesignTokens.headingColor,
      rightActionsItemTextColor: finalDesignTokens.textColorSecondary,
      rightActionsItemHoverBgColor: 'rgba(0, 0, 0, 0.03)',
      ...finalDesignTokens.header,
    },
    sider: {
      ...menuToken,
      menuBackgroundColor: 'transparent',
      menuItemDividerColor: finalDesignTokens.borderColorSplit,
      menuTitleTextColor: finalDesignTokens.headingColor,
      menuSubArrowColor: 'rgba(0, 0, 0, 0.25)',
      collapsedButtonTextColor: menuToken?.menuTextColorSecondary,
      collapsedButtonHoverTextColor: menuToken?.menuTextColor,
      collapsedButtonBgColor: '#fff',
      ...finalDesignTokens.sider,
    },
    pageContainer: {
      pageContainerBgColor: 'transparent',
      pageContainerFixedBgColor: '#fff',
      pageContainerContentMargin: '24px 24px 0',
      ...finalDesignTokens.pageContainer,
    },
  } as LayoutDesignToken;
};

const defaultToken = getLayoutDesignToken(baseDesignTokens);

export const ProLayoutContext = React.createContext<LayoutDesignToken>(defaultToken);

export type ProLayoutProviderProps = { token?: DeepPartial<LayoutDesignToken> };

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
