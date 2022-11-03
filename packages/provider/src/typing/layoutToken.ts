import { setAlpha } from '../useStyle';

export type BaseLayoutDesignToken = {
  hashId: string;
  colorPrimary: string;
  /**
   * 跨站点应用的图标hover颜色
   */
  colorBgAppListIconHover: string;
  /**
   * 跨站点应用的图标hover颜色
   */
  colorTextAppListIconHover: string;
  /**
   * 跨站点应用的图标hover颜色
   */
  colorTextAppListIcon: string;

  /**
   * layout 的背景颜色
   */
  bgLayout: string;

  /**
   * 侧边side的 token 配置
   */
  sider: {
    colorBgCollapsedButton: string;
    colorTextCollapsedButtonHover: string;
    colorTextCollapsedButton: string;
    colorMenuBackground: string;
    colorBgMenuItemCollapsedHover: string;
    colorBgMenuItemCollapsedSelected: string;
    colorMenuItemDivider: string;
    colorBgMenuItemHover: string;
    colorBgMenuItemSelected: string;
    colorTextMenuSelected: string;
    colorTextMenuItemHover: string;
    colorTextMenuActive: string;
    colorTextMenu: string;
    colorTextMenuSecondary: string;
    paddingInlineLayoutMenu: number;
    paddingBlockLayoutMenu: number;
    /**
     * menu 顶部 title 的字体颜色
     */
    colorTextMenuTitle: string;
    colorTextSubMenuSelected: string;
  };
  /**
   * header 的 token 设置
   */
  header: {
    colorBgHeader: string;
    colorHeaderTitle: string;
    colorBgMenuItemHover: string;
    colorBgMenuItemSelected: string;
    colorTextMenuSelected: string;
    colorTextMenuActive: string;
    colorTextMenu: string;
    colorTextMenuSecondary: string;
    colorBgRightActionsItemHover: string;
    colorTextRightActionsItem: string;
    heightLayoutHeader: number;
  };

  /**
   * pageContainer
   */
  pageContainer: {
    /**
     * pageContainer 的背景颜色
     */
    colorBgPageContainer: string;
    /**
     * pageContainer 自带的 margin inline
     * @deprecated 请使用 paddingInlinePageContainerContent
     */
    marginInlinePageContainerContent: number;
    /**
     * pageContainer 自带的 margin block
     * @deprecated 请使用 paddingBlockPageContainerContent
     */
    marginBlockPageContainerContent: number;
    /**
     * pageContainer 自带的 padding inline
     */
    paddingInlinePageContainerContent: number;
    /**
     * pageContainer 自带的 padding block
     */
    paddingBlockPageContainerContent: number;
    /**
     * pageContainer 被固定时的背景颜色
     */
    colorBgPageContainerFixed: string;
  };
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LayoutDesignToken = BaseLayoutDesignToken;

export const getLayoutDesignToken: (
  baseDesignTokens: DeepPartial<LayoutDesignToken>,
  antdToken: Record<string, any>,
) => LayoutDesignToken = (designTokens, antdToken) => {
  const finalDesignTokens = { ...designTokens };
  return {
    bgLayout: 'linear-gradient(#fff, #f7f8fa 28%)',
    colorTextAppListIcon: '#666',
    appListIconHoverBgColor: finalDesignTokens?.sider?.colorBgMenuItemSelected,
    colorBgAppListIconHover: 'rgba(0, 0, 0, 0.04)',
    colorTextAppListIconHover: antdToken.colorTextBase,
    ...finalDesignTokens,
    header: {
      colorBgHeader: 'rgba(240, 242, 245, 0.4)',
      colorHeaderTitle: antdToken.colorText,
      colorBgMenuItemHover: setAlpha(antdToken.colorTextBase, 0.03),
      colorBgMenuItemSelected: 'transparent',
      colorTextMenuSelected: setAlpha(antdToken.colorTextBase, 0.95),
      colorBgRightActionsItemHover: setAlpha(antdToken.colorTextBase, 0.03),
      colorTextRightActionsItem: antdToken.colorTextTertiary,
      heightLayoutHeader: 56,
      colorTextMenu: setAlpha(antdToken.colorTextBase, 0.65),
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      colorTextMenuTitle: antdToken.colorText,
      colorTextMenuActive: antdToken.colorText,
      ...finalDesignTokens.header,
    } as LayoutDesignToken['header'],
    sider: {
      paddingInlineLayoutMenu: 8,
      paddingBlockLayoutMenu: 0,
      colorBgCollapsedButton: '#fff',
      colorTextCollapsedButtonHover: antdToken.colorTextSecondary,
      colorTextCollapsedButton: setAlpha(antdToken.colorTextBase, 0.25),
      colorMenuBackground: 'transparent',
      colorBgMenuItemCollapsedHover: 'rgba(90, 75, 75, 0.03)',
      colorBgMenuItemCollapsedSelected: setAlpha(antdToken.colorTextBase, 0.04),
      colorMenuItemDivider: setAlpha(antdToken.colorTextBase, 0.06),
      colorBgMenuItemHover: setAlpha(antdToken.colorTextBase, 0.03),
      colorBgMenuItemSelected: setAlpha(antdToken.colorTextBase, 0.04),
      colorTextMenuItemHover: setAlpha(antdToken.colorTextBase, 0.88),
      colorTextMenuSelected: setAlpha(antdToken.colorTextBase, 0.95),
      colorTextMenuActive: antdToken.colorText,
      colorTextMenu: setAlpha(antdToken.colorTextBase, 0.65),
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      colorTextMenuTitle: antdToken.colorText,
      colorTextSubMenuSelected: setAlpha(antdToken.colorTextBase, 0.95),
      ...finalDesignTokens.sider,
    } as LayoutDesignToken['sider'],
    pageContainer: {
      colorBgPageContainer: 'transparent',
      paddingInlinePageContainerContent:
        finalDesignTokens.pageContainer?.marginInlinePageContainerContent || 40,
      paddingBlockPageContainerContent:
        finalDesignTokens.pageContainer?.marginBlockPageContainerContent || 24,
      colorBgPageContainerFixed: '#fff',
      ...finalDesignTokens.pageContainer,
    },
  } as LayoutDesignToken as LayoutDesignToken;
};

export type ProTokenType = {
  layout?: DeepPartial<LayoutDesignToken>;
};
