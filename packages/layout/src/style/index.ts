import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { version } from 'antd';
import { useContext } from 'react';
import type { LayoutDesignToken } from '../context/ProLayoutContext';
import { ProLayoutContext } from '../context/ProLayoutContext';

export interface ProLayoutToken extends ProAliasToken {
  componentCls: string;
}

/**
 * 主要区别：
 * 需要手动引入 import 'antd/dist/antd.css';
 * 需要重置 menu 的样式
 * @param token
 * @returns
 */
const compatibleStyle: GenerateStyle<ProLayoutToken & LayoutDesignToken> = (token) => {
  if (version.startsWith('5')) {
    return {};
  }
  return {
    [token.proComponentsCls]: { width: '100%', height: '100%' },
    [token.componentCls]: {
      width: '100%',
      height: '100%',
      [`${token.proComponentsCls}-base-menu`]: {
        color: token.sider.colorTextMenu,
        [`${token.antCls}-menu-sub`]: {
          color: token.sider.colorTextMenu,
        },
        [`& ${token.antCls}-layout`]: {
          backgroundColor: 'transparent',
        },
        [`${token.antCls}-menu-submenu-expand-icon, ${token.antCls}-menu-submenu-arrow`]: {
          color: 'inherit',
        },
        [`&${token.antCls}-menu`]: {
          color: token.sider.colorTextMenu,
          [`${token.antCls}-menu-item a`]: {
            color: 'inherit',
          },
        },
        [`&${token.antCls}-menu-inline`]: {
          [`${token.antCls}-menu-selected::after,${token.antCls}-menu-item-selected::after`]: {
            display: 'none',
          },
        },
        [`${token.antCls}-menu-sub ${token.antCls}-menu-inline`]: {
          backgroundColor: 'transparent!important',
        },
        [`${token.antCls}-menu-item:active, 
        ${token.antCls}-menu-submenu-title:active`]: {
          backgroundColor: 'transparent!important',
        },
        [`&${token.antCls}-menu-light`]: {
          [`${token.antCls}-menu-item:hover, 
            ${token.antCls}-menu-item-active,
            ${token.antCls}-menu-submenu-active, 
            ${token.antCls}-menu-submenu-title:hover`]: {
            color: token.sider.colorTextMenuActive,
            borderRadius: token.radiusBase,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: token.sider.colorTextMenuActive,
            },
          },
        },
        [`&${token.antCls}-menu:not(${token.antCls}-menu-horizontal)`]: {
          [`${token.antCls}-menu-item-selected`]: {
            backgroundColor: token.sider.colorBgMenuItemSelected,
            borderRadius: token.radiusBase,
          },
          [`${token.antCls}-menu-item:hover, 
            ${token.antCls}-menu-item-active,
            ${token.antCls}-menu-submenu-title:hover`]: {
            color: token.sider.colorTextMenuActive,
            borderRadius: token.radiusBase,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: token.sider.colorTextMenuActive,
            },
          },
        },
        [`${token.antCls}-menu-item-selected`]: {
          color: token.sider.colorTextMenuSelected,
        },
        [`${token.antCls}-menu-submenu-selected`]: {
          color: token.sider.colorTextMenuSelected,
        },
        [`&${token.antCls}-menu:not(${token.antCls}-menu-inline) ${token.antCls}-menu-submenu-open`]:
          {
            color: token.sider.colorTextMenuSelected,
          },

        [`&${token.antCls}-menu-vertical`]: {
          [`${token.antCls}-menu-submenu-selected`]: {
            borderRadius: token.radiusBase,
            color: token.sider.colorTextMenuSelected,
          },
        },

        [`${token.antCls}-menu-submenu:hover > ${token.antCls}-menu-submenu-title > ${token.antCls}-menu-submenu-arrow`]:
          {
            color: token.sider.colorTextMenuActive,
          },

        [`&${token.antCls}-menu-horizontal`]: {
          [`${token.antCls}-menu-item:hover,
          ${token.antCls}-menu-submenu:hover,
          ${token.antCls}-menu-item-active,
          ${token.antCls}-menu-submenu-active`]: {
            borderRadius: 4,
            color: token.header.colorTextMenuActive,
          },

          [`${token.antCls}-menu-item-open,
          ${token.antCls}-menu-submenu-open,
          ${token.antCls}-menu-item-selected,
          ${token.antCls}-menu-submenu-selected`]: {
            backgroundColor: token.header.colorBgMenuItemSelected,
            borderRadius: token.radiusBase,
            color: token.header.colorTextMenuSelected,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: token.header.colorTextMenuSelected,
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

      [`${token.proComponentsCls}-top-nav-header-base-menu`]: {
        [`&${token.antCls}-menu`]: {
          color: token.header.colorTextMenu,
          [`${token.antCls}-menu-item a`]: {
            color: 'inherit',
          },
        },
        [`&${token.antCls}-menu-light`]: {
          [`${token.antCls}-menu-item:hover, 
            ${token.antCls}-menu-item-active,
            ${token.antCls}-menu-submenu-active, 
            ${token.antCls}-menu-submenu-title:hover`]: {
            color: token.header.colorTextMenuActive,
            borderRadius: token.radiusBase,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: token.header.colorTextMenuActive,
            },
          },
        },
      },
    },
    [`${token.antCls}-menu-sub${token.antCls}-menu-inline`]: {
      backgroundColor: 'transparent!important',
    },
    [`${token.antCls}-menu-submenu-popup`]: {
      backgroundColor: 'rgba(255, 255, 255, 0.42)',
      '-webkit-backdrop-filter': 'blur(8px)',
      backdropFilter: 'blur(8px)',
      [`${token.antCls}-menu`]: {
        background: 'transparent !important',
        backgroundColor: 'transparent !important',
        [`${token.antCls}-menu-item:active, 
        ${token.antCls}-menu-submenu-title:active`]: {
          backgroundColor: 'transparent!important',
        },
      },
      [`${token.antCls}-menu-item-selected`]: {
        color: token.sider.colorTextMenuSelected,
      },
      [`${token.antCls}-menu-submenu-selected`]: {
        color: token.sider.colorTextMenuSelected,
      },
      [`${token.antCls}-menu:not(${token.antCls}-menu-horizontal)`]: {
        [`${token.antCls}-menu-item-selected`]: {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          borderRadius: token.radiusBase,
          color: token.sider.colorTextMenuSelected,
        },
        [`${token.antCls}-menu-item:hover, 
          ${token.antCls}-menu-item-active,
          ${token.antCls}-menu-submenu-title:hover`]: {
          color: token.sider.colorTextMenuActive,
          borderRadius: token.radiusBase,
          [`${token.antCls}-menu-submenu-arrow`]: {
            color: token.sider.colorTextMenuActive,
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
