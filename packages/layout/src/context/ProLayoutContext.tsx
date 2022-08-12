import { useToken } from '@ant-design/pro-utils';
import type { GlobalToken } from 'antd/es/theme/interface';
import React from 'react';

export type BaseLayoutDesignToken = {
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
   * layout 的背景
   */
  bgLayout: string;
  /**
   * layout 的背景颜色
   */
  colorBgLayout: string;

  /**
   * 侧边side的 token 配置
   */
  sider: {
    colorBgCollapsedButton: string;
    colorTextCollapsedButtonHover: string;
    colorTextCollapsedButton: string;
    marginHorizontalMenuItem: string;
    paddingHorizontalMenuItem: string;
    colorMenuBackground: string;
    colorBgMenuItemCollapsedHover: string;
    colorBgMenuItemCollapsedSelected: string;
    colorMenuItemDivider: string;
    colorBgMenuItemHover: string;
    colorBgMenuItemSelected: string;
    colorTextMenuSelected: string;
    colorTextMenuActive: string;
    colorTextMenu: string;
    colorTextMenuSecondary: string;
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
    marginHorizontalMenuItem: string;
    paddingHorizontalMenuItem: string;
    colorBgMenuItemCollapsedHover: string;
    colorBgMenuItemCollapsedSelected: string;
    colorBgMenuItemHover: string;
    colorBgMenuItemSelected: string;
    colorTextMenuSelected: string;
    colorTextMenuActive: string;
    colorTextMenu: string;
    colorTextMenuSecondary: string;
    colorBgRightActionsItemHover: string;
    colorTextRightActionsItem: string;
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
     */
    marginInlinePageContainerContent: number;
    /**
     * pageContainer 自带的 margin block
     */
    marginBlockPageContainerContent: number;
    /**
     * pageContainer 被固定时的背景颜色
     */
    colorBgPageContainerFixed: string;
  };
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LayoutDesignToken = BaseLayoutDesignToken & GlobalToken;

// DesignToken 的默认样式
export const DefaultDesignToken: BaseLayoutDesignToken = {
  colorBgAppListIconHover: 'rgba(0, 0, 0, 0.04)',
  colorTextAppListIconHover: 'rgba(0, 0, 0, 0.85)',
  colorTextAppListIcon: '#666',
  header: {
    colorBgHeader: 'rgba(240, 242, 245, 0.4)',
    colorHeaderTitle: 'rgba(0, 0, 0, 0.85)',
    marginHorizontalMenuItem: '0 4px',
    paddingHorizontalMenuItem: '0 16px',
    colorBgMenuItemCollapsedHover: 'rgba(90, 75, 75, 0.03)',
    colorBgMenuItemCollapsedSelected: 'rgba(0, 0, 0, 0.04)',
    colorBgMenuItemHover: 'rgba(90, 75, 75, 0.03)',
    colorBgMenuItemSelected: 'rgba(0, 0, 0, 0.04)',
    colorTextMenuSelected: 'rgb(0,0,0,0.95)',
    colorTextMenu: 'rgba(0, 0, 0, 0.85)',
    colorTextMenuSecondary: 'rgba(0, 0, 0, 0.45)',
    colorBgRightActionsItemHover: 'rgba(0, 0, 0, 0.03)',
    colorTextRightActionsItem: 'rgba(0, 0, 0, 0.45)',
    colorTextMenuActive: 'rgb(0,0,0,0.85)',
  },
  bgLayout: 'linear-gradient(#fff, #f7f8fa 28%)',
  colorBgLayout: '#f7f8fa',
  pageContainer: {
    colorBgPageContainer: 'transparent',
    marginBlockPageContainerContent: 40,
    marginInlinePageContainerContent: 24,
    colorBgPageContainerFixed: '#fff',
  },
  sider: {
    colorBgCollapsedButton: '#fff',
    colorTextCollapsedButtonHover: 'rgba(0, 0, 0, 0.85)',
    colorTextCollapsedButton: 'rgba(0, 0, 0, 0.45)',
    marginHorizontalMenuItem: '0 4px',
    paddingHorizontalMenuItem: '0 16px',
    colorMenuBackground: 'transparent',
    colorBgMenuItemCollapsedHover: 'rgba(90, 75, 75, 0.03)',
    colorBgMenuItemCollapsedSelected: 'rgba(0, 0, 0, 0.04)',
    colorMenuItemDivider: 'rgba(0, 0, 0, 0.06)',
    colorBgMenuItemHover: 'rgba(90, 75, 75, 0.03)',
    colorBgMenuItemSelected: 'rgba(0, 0, 0, 0.04)',
    colorTextMenuSelected: 'rgb(0,0,0,0.95)',
    colorTextMenuActive: 'rgba(0, 0, 0, 0.85)',
    colorTextMenu: 'rgba(0, 0, 0, 0.85)',
    colorTextMenuSecondary: 'rgba(0, 0, 0, 0.45)',
    colorTextMenuTitle: 'rgba(0, 0, 0, 0.85)',
    colorTextSubMenuSelected: 'rgb(0,0,0,0.95)',
  },
};

function decamelize(word: string) {
  const separator = '_';
  const split = /(?=[A-Z])/;
  return word.split(split).join(separator).toLowerCase().split(separator);
}
function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
function sortKey(key: string) {
  return decamelize(key)
    .sort((a, b) => {
      if (['color', 'padding', 'margin', 'radius'].includes(a)) {
        return -10;
      }
      if (['color', 'padding', 'margin', 'radius'].includes(b)) {
        return 10;
      }

      if (['bg', 'text', 'border'].includes(a)) {
        return -9;
      }
      if (['bg', 'text', 'border'].includes(b)) {
        return 9;
      }
      return 0;
    })
    .map((item, index) => {
      if (index === 0) return item;
      return firstUpperCase(item);
    })
    .join('');
}
function sortToken(token: Record<string, any>) {
  const newToken = {};
  Object.keys(token)
    .sort()
    .forEach((key) => {
      if (key && typeof token[key] !== 'object') {
        newToken[sortKey(key)] = token[key];
      }
      if (key && typeof token[key] === 'object') {
        newToken[sortKey(key)] = sortToken(token[key]);
      }
    });

  return newToken;
}

export const getLayoutDesignToken: (
  baseDesignTokens: DeepPartial<LayoutDesignToken>,
  antdToken: Record<string, any>,
) => LayoutDesignToken = (designTokens, antdToken) => {
  const finalDesignTokens = { ...designTokens };

  return sortToken({
    ...DefaultDesignToken,
    layoutBgColor: '#f7f8fa',
    layoutBg: 'linear-gradient(#fff, #f7f8fa 28%)',
    appListIconTextColor: '#666',
    appListIconHoverTextColor: antdToken.colorText,
    appListIconHoverBgColor: finalDesignTokens?.sider?.colorBgMenuItemSelected,
    ...finalDesignTokens,
    header: {
      ...DefaultDesignToken.header,
      ...finalDesignTokens.header,
    } as LayoutDesignToken['header'],
    sider: {
      ...DefaultDesignToken.sider,
      ...finalDesignTokens.sider,
    } as LayoutDesignToken['sider'],
    pageContainer: {
      ...DefaultDesignToken.pageContainer,
      ...finalDesignTokens.pageContainer,
    },
  } as LayoutDesignToken) as LayoutDesignToken;
};

const defaultToken = getLayoutDesignToken(DefaultDesignToken, {});

export const ProLayoutContext = React.createContext<LayoutDesignToken>(defaultToken);

export type ProLayoutProviderProps = {
  token?: DeepPartial<LayoutDesignToken>;
  children?: React.ReactNode;
};

export const ProLayoutProvider: React.FC<ProLayoutProviderProps> = (props) => {
  const { token } = useToken();
  return (
    <ProLayoutContext.Provider
      value={{
        ...getLayoutDesignToken(props?.token || {}, token),
      }}
    >
      {props.children}
    </ProLayoutContext.Provider>
  );
};
