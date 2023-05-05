import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
import { version } from 'antd';

export interface ProLayoutToken extends ProAliasToken {
  componentCls: string;
}

const getVersion = () => {
  if (typeof process === 'undefined') return version;
  return process?.env?.ANTD_VERSION || version;
};

/**
 * 主要区别：
 * 需要手动引入 import 'antd/dist/antd.css';
 * 需要重置 menu 的样式
 * @param token
 * @returns
 */
const compatibleStyle: GenerateStyle<ProLayoutToken> = (token) => {
  if (getVersion()?.startsWith('5')) {
    return {};
  }
  return {
    [token.componentCls]: {
      width: '100%',
      height: '100%',
      [`${token.proComponentsCls}-base-menu`]: {
        color: token?.layout?.sider?.colorTextMenu,
        [`${token.antCls}-menu-sub`]: {
          backgroundColor: 'transparent!important',
          color: token?.layout?.sider?.colorTextMenu,
        },
        [`& ${token.antCls}-layout`]: {
          backgroundColor: 'transparent',
          width: '100%',
        },
        [`${token.antCls}-menu-submenu-expand-icon, ${token.antCls}-menu-submenu-arrow`]:
          {
            color: 'inherit',
          },
        [`&${token.antCls}-menu`]: {
          color: token?.layout?.sider?.colorTextMenu,
          [`${token.antCls}-menu-item`]: {
            '*': {
              transition: 'none !important',
            },
          },
          [`${token.antCls}-menu-item a`]: {
            color: 'inherit',
          },
        },
        [`&${token.antCls}-menu-inline`]: {
          [`${token.antCls}-menu-selected::after,${token.antCls}-menu-item-selected::after`]:
            {
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
            color: token?.layout?.sider?.colorTextMenuActive,
            borderRadius: token.borderRadius,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: token?.layout?.sider?.colorTextMenuActive,
            },
          },
        },
        [`&${token.antCls}-menu:not(${token.antCls}-menu-horizontal)`]: {
          [`${token.antCls}-menu-item-selected`]: {
            backgroundColor: token?.layout?.sider?.colorBgMenuItemSelected,
            borderRadius: token.borderRadius,
          },
          [`${token.antCls}-menu-item:hover, 
            ${token.antCls}-menu-item-active,
            ${token.antCls}-menu-submenu-title:hover`]: {
            color: token?.layout?.sider?.colorTextMenuActive,
            borderRadius: token.borderRadius,
            backgroundColor: `${token?.layout?.header?.colorBgMenuItemHover} !important`,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: token?.layout?.sider?.colorTextMenuActive,
            },
          },
        },
        [`${token.antCls}-menu-item-selected`]: {
          color: token?.layout?.sider?.colorTextMenuSelected,
        },
        [`${token.antCls}-menu-submenu-selected`]: {
          color: token?.layout?.sider?.colorTextMenuSelected,
        },
        [`&${token.antCls}-menu:not(${token.antCls}-menu-inline) ${token.antCls}-menu-submenu-open`]:
          {
            color: token?.layout?.sider?.colorTextMenuSelected,
          },

        [`&${token.antCls}-menu-vertical`]: {
          [`${token.antCls}-menu-submenu-selected`]: {
            borderRadius: token.borderRadius,
            color: token?.layout?.sider?.colorTextMenuSelected,
          },
        },

        [`${token.antCls}-menu-submenu:hover > ${token.antCls}-menu-submenu-title > ${token.antCls}-menu-submenu-arrow`]:
          {
            color: token?.layout?.sider?.colorTextMenuActive,
          },

        [`&${token.antCls}-menu-horizontal`]: {
          [`${token.antCls}-menu-item:hover,
          ${token.antCls}-menu-submenu:hover,
          ${token.antCls}-menu-item-active,
          ${token.antCls}-menu-submenu-active`]: {
            borderRadius: 4,
            transition: 'none',
            color: token?.layout?.header?.colorTextMenuActive,
            backgroundColor: `${token?.layout?.header?.colorBgMenuItemHover} !important`,
          },

          [`${token.antCls}-menu-item-open,
          ${token.antCls}-menu-submenu-open,
          ${token.antCls}-menu-item-selected,
          ${token.antCls}-menu-submenu-selected`]: {
            backgroundColor: token?.layout?.header?.colorBgMenuItemSelected,
            borderRadius: token.borderRadius,
            transition: 'none',
            color: `${token?.layout?.header?.colorTextMenuSelected} !important`,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: `${token?.layout?.header?.colorTextMenuSelected} !important`,
            },
          },
          [`> ${token.antCls}-menu-item, > ${token.antCls}-menu-submenu`]: {
            paddingInline: 16,
            marginInline: 4,
          },
          [`> ${token.antCls}-menu-item::after, > ${token.antCls}-menu-submenu::after`]:
            {
              display: 'none',
            },
        },
      },

      [`${token.proComponentsCls}-top-nav-header-base-menu`]: {
        [`&${token.antCls}-menu`]: {
          color: token?.layout?.header?.colorTextMenu,
          [`${token.antCls}-menu-item a`]: {
            color: 'inherit',
          },
        },
        [`&${token.antCls}-menu-light`]: {
          [`${token.antCls}-menu-item:hover, 
            ${token.antCls}-menu-item-active,
            ${token.antCls}-menu-submenu-active, 
            ${token.antCls}-menu-submenu-title:hover`]: {
            color: token?.layout?.header?.colorTextMenuActive,
            borderRadius: token.borderRadius,
            transition: 'none',
            backgroundColor: token?.layout?.header?.colorBgMenuItemSelected,
            [`${token.antCls}-menu-submenu-arrow`]: {
              color: token?.layout?.header?.colorTextMenuActive,
            },
          },

          [`${token.antCls}-menu-item-selected`]: {
            color: token?.layout?.header?.colorTextMenuSelected,
            borderRadius: token.borderRadius,
            backgroundColor: token?.layout?.header?.colorBgMenuItemSelected,
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
        color: token?.layout?.sider?.colorTextMenuSelected,
      },
      [`${token.antCls}-menu-submenu-selected`]: {
        color: token?.layout?.sider?.colorTextMenuSelected,
      },
      [`${token.antCls}-menu:not(${token.antCls}-menu-horizontal)`]: {
        [`${token.antCls}-menu-item-selected`]: {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          borderRadius: token.borderRadius,
          color: token?.layout?.sider?.colorTextMenuSelected,
        },
        [`${token.antCls}-menu-item:hover, 
          ${token.antCls}-menu-item-active,
          ${token.antCls}-menu-submenu-title:hover`]: {
          color: token?.layout?.sider?.colorTextMenuActive,
          borderRadius: token.borderRadius,
          [`${token.antCls}-menu-submenu-arrow`]: {
            color: token?.layout?.sider?.colorTextMenuActive,
          },
        },
      },
    },
  };
};

const genProLayoutStyle: GenerateStyle<ProLayoutToken> = (token) => {
  return {
    [`${token.antCls}-layout`]: {
      backgroundColor: 'transparent !important',
    },
    [token.componentCls]: {
      [`& ${token.antCls}-layout`]: {
        display: 'flex',
        backgroundColor: 'transparent',
        width: '100%',
      },
      [`${token.componentCls}-content`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor:
          token?.layout?.pageContainer?.colorBgPageContainer || 'transparent',
        position: 'relative',
        paddingBlock:
          token?.layout?.pageContainer?.paddingBlockPageContainerContent,
        paddingInline:
          token?.layout?.pageContainer?.paddingInlinePageContainerContent,
        '&-has-page-container': {
          padding: 0,
        },
      },
      [`${token.componentCls}-container`]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: 0,
        backgroundColor: 'transparent',
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
        background: token?.layout?.bgLayout,
      },
    },
    [`${token.antCls}-menu-submenu-popup`]: {
      backgroundColor: 'rgba(255, 255, 255, 0.42)',
      '-webkit-backdrop-filter': 'blur(8px)',
      backdropFilter: 'blur(8px)',
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayout', (token) => {
    const proLayoutToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    } as ProLayoutToken;

    return [genProLayoutStyle(proLayoutToken), compatibleStyle(proLayoutToken)];
  });
}
