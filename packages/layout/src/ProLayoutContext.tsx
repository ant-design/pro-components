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
type BaseLayoutDesignToken = {
  /**
   * menu 的背景颜色
   */
  menuBackgroundColor: string;
  /**
   * menuItem 的字体颜色
   */
  menuSelectedTextColor: string;
  /**
   * menuItem 的 hover 字体颜色
   */
  menuItemHoverBgColor: string;
  /**
   * menuItem 的选中字体颜色
   */
  menuItemSelectedBgColor: string;
  /**
   * 收起 menuItem 的 hover 字体颜色
   */
  menuItemCollapsedHoverBgColor: string;
  /**
   * 收起 menuItem 的选中字体颜色
   */
  menuItemCollapsedSelectedBgColor: string;
  /**
   * menuItem 的箭头颜色
   */
  menuSubArrowColor: string;
  /**
   * 右上角字体颜色
   */
  rightActionsItemTextColor: string;
  /**
   * 右上角选中的hover 颜色
   */
  rightActionsItemHoverBgColor: string;
};

export type LayoutDesignToken = BaseLayoutDesignToken & BaseDesignToken;

export const getLayoutDesignToken: (
  baseDesignTokens: Partial<LayoutDesignToken>,
) => LayoutDesignToken = (designTokens) => {
  const finalDesignTokens = { ...baseDesignTokens, ...designTokens };
  return {
    ...designTokens,
    menuBackgroundColor: 'transparent',
    menuSelectedTextColor: 'rgb(0,0,0)',
    menuItemHoverBgColor: 'rgba(90, 75, 75, 0.03)',
    menuItemSelectedBgColor: 'rgba(0, 0, 0, 0.04)',
    menuItemCollapsedHoverBgColor: 'rgba(0, 145, 255, 0.08)',
    menuItemCollapsedSelectedBgColor: 'rgba(0, 145, 255, 0.1)',
    menuSubArrowColor: 'rgba(0, 0, 0, 0.25)',
    rightActionsItemTextColor: finalDesignTokens.textColorSecondary,
    rightActionsItemHoverBgColor: 'rgba(0, 0, 0, 0.03)',
    ...finalDesignTokens,
  } as LayoutDesignToken;
};

const defaultToken = getLayoutDesignToken(baseDesignTokens);

export const ProLayoutContext = React.createContext<LayoutDesignToken>(defaultToken);

export type ProLayoutProviderProps = { token?: Partial<LayoutDesignToken> };

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
