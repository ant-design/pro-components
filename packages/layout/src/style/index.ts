import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { version } from 'antd';
import type { GenerateStyle } from 'antd/es/theme';
import { useContext } from 'react';
import type { LayoutDesignToken } from '../context/ProLayoutContext';
import { ProLayoutContext } from '../context/ProLayoutContext';

export interface ProLayoutToken extends ProAliasToken {
  componentCls: string;
}
const defaultMenuToken = {
  colorItemBg: 'transparent',
  colorSubItemBg: 'transparent',
  radiusItem: 4,
  colorItemBgSelected: 'rgba(0, 0, 0, 0.04)',
  colorItemBgActive: 'rgba(0, 0, 0, 0.04)',
  colorItemBgSelectedHorizontal: 'rgba(0, 0, 0, 0.04)',
  colorActiveBarWidth: 0,
  colorActiveBarHeight: 0,
  colorActiveBarBorderSize: 0,
  colorItemText: 'rgba(0, 0, 0, 0.65)',
  colorItemTextHover: 'rgba(0, 0, 0, 0.85)',
  colorItemTextSelected: 'rgba(0, 0, 0, 1)',
};
/**
 * 主要区别：
 * 需要手动引入 import 'antd/dist/antd.css';
 * 需要重置 menu 的样式
 * @param token
 * @returns
 */
const compatibleStyle: GenerateStyle<ProLayoutToken> = (token) => {
  if (version.startsWith('5')) {
    return {};
  }
  return {
    [token.proComponentsCls]: { width: '100%', height: '100%' },
    [token.componentCls]: {
      width: '100%',
      height: '100%',
      [token.antCls]: {
        '&-menu': {
          color: defaultMenuToken.colorItemText,
        },
        '&-menu-inline': {
          [`${token.antCls}-menu-selected::after,${token.antCls}-menu-item-selected::after`]: {
            display: 'none',
          },
        },
        [`&-menu-sub${token.antCls}-menu-inline`]: {
          backgroundColor: 'transparent!important',
        },
        [`&-menu:not(&-menu-horizontal)`]: {
          [`${token.antCls}-menu-item-selected`]: {
            backgroundColor: defaultMenuToken.colorItemBgSelected,
            borderRadius: 4,
          },
        },
        [`&-menu-item-selected`]: {
          color: defaultMenuToken.colorItemTextSelected,
        },
        [`&-menu-submenu-selected`]: {
          color: defaultMenuToken.colorItemTextSelected,
        },
        [`&-menu-light`]: {
          [`${token.antCls}-menu-item:hover, 
            ${token.antCls}-menu-item-active,
            ${token.antCls}-menu-submenu-active, 
            ${token.antCls}-menu-submenu-title:hover`]: {
            color: defaultMenuToken.colorItemTextHover,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: defaultMenuToken.colorItemTextHover,
            },
          },
        },
        [`${token.antCls}-menu:not(${token.antCls}-menu-inline) ${token.antCls}-menu-submenu-open`]:
          {
            color: defaultMenuToken.colorItemTextHover,
          },
        [`&-menu-vertical`]: {
          [`${token.antCls}-menu-submenu-selected`]: {
            backgroundColor: defaultMenuToken.colorItemBgSelected,
            borderRadius: 4,
            color: defaultMenuToken.colorItemTextHover,
          },
        },

        [`&-menu-horizontal`]: {
          [`${token.antCls}-menu-item:hover,
          ${token.antCls}-menu-submenu:hover,
          ${token.antCls}-menu-item-active,
          ${token.antCls}-menu-submenu-active`]: {
            backgroundColor: defaultMenuToken.colorItemBgSelected,
            borderRadius: 4,
            color: defaultMenuToken.colorItemTextHover,
          },

          [`${token.antCls}-menu-item-open,
          ${token.antCls}-menu-submenu-open,
          ${token.antCls}-menu-item-selected,
          ${token.antCls}-menu-submenu-selected`]: {
            backgroundColor: defaultMenuToken.colorItemBgSelected,
            color: defaultMenuToken.colorItemTextSelected,
            borderRadius: 4,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: defaultMenuToken.colorItemTextHover,
            },
          },
          [`> ${token.antCls}-menu-item, > ${token.antCls}-menu-submenu`]: {
            paddingInline: 16,
            marginInline: 4,
          },
          [`> ${token.antCls}-menu-item::after, > ${token.antCls}-menu-submenu::after`]: {
            display: 'none',
          },
        },
      },
    },
  };
};

const genProLayoutStyle: GenerateStyle<ProLayoutToken & LayoutDesignToken> = (token) => {
  return {
    body: {
      paddingBlock: 0,
      paddingInline: 0,
      marginBlock: 0,
      marginInline: 0,
      fontFamily: token.fontFamily,
    },
    [token.componentCls]: {
      [`& ${token.antCls}-layout`]: {
        backgroundColor: 'transparent',
      },
      [`${token.componentCls}-content`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'transparent',
        position: 'relative',
        '*': { boxSizing: 'border-box' },
        '&-content-has-margin': {
          marginBlock: token.pageContainer.marginBlockPageContainerContent,
          marginInline: token.pageContainer.marginInlinePageContainerContent,
        },
      },
      [`${token.componentCls}-bg-list`]: {
        pointerEvents: 'none',
        position: 'fixed',
        overflow: 'hidden',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 0,
        height: '100%',
        width: '100%',
        background: token.bgLayout,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  const proToken = useContext(ProLayoutContext);
  return useAntdStyle('pro-layout', (token) => {
    const proLayoutToken: ProLayoutToken & LayoutDesignToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      ...proToken,
    };

    return [genProLayoutStyle(proLayoutToken), compatibleStyle(proLayoutToken)];
  });
}
