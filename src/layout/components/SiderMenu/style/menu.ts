import type { GenerateStyle, ProAliasToken } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
import type { MenuMode } from '../BaseMenu';

export interface ProLayoutBaseMenuToken extends ProAliasToken {
  componentCls: string;
}

const navVar = {
  colorText: '--pro-layout-nav-color-text',
  colorBgHover: '--pro-layout-nav-color-bg-hover',
  colorTextHover: '--pro-layout-nav-color-text-hover',
  colorBgSelected: '--pro-layout-nav-color-bg-selected',
  colorTextSelected: '--pro-layout-nav-color-text-selected',
  colorDivider: '--pro-layout-nav-color-divider',
  popupBg: '--pro-layout-nav-popup-bg',
  indent: '--pro-layout-nav-indent',
  iconSize: '--pro-layout-nav-icon-size',
} as const;

const genProLayoutBaseMenuStyle: GenerateStyle<ProLayoutBaseMenuToken> = (
  token,
  mode,
) => {
  const sider = token.layout?.sider;
  const header = token.layout?.header;

  const siderVars: Record<string, string> = {
    [navVar.colorText]: sider?.colorTextMenu ?? 'var(--ant-color-text)',
    [navVar.colorBgHover]: sider?.colorBgMenuItemHover ?? 'var(--ant-color-fill-secondary)',
    [navVar.colorTextHover]:
      sider?.colorTextMenuActive ?? 'var(--ant-color-text)',
    [navVar.colorBgSelected]:
      sider?.colorBgMenuItemSelected ?? 'var(--ant-color-fill-secondary)',
    [navVar.colorTextSelected]:
      sider?.colorTextMenuSelected ?? 'var(--ant-color-text)',
    [navVar.colorDivider]:
      sider?.colorMenuItemDivider ?? 'var(--ant-color-split)',
    [navVar.popupBg]:
      header?.colorBgMenuElevated ?? 'var(--ant-color-bg-elevated)',
    [navVar.indent]: '16px',
    [navVar.iconSize]: '16px',
  };

  const headerVars: Record<string, string> = {
    [navVar.colorText]: header?.colorTextMenu ?? 'var(--ant-color-text-secondary)',
    [navVar.colorBgHover]:
      header?.colorBgMenuItemHover ?? 'var(--ant-color-fill-secondary)',
    [navVar.colorTextHover]:
      header?.colorTextMenuActive ?? 'var(--ant-color-text)',
    [navVar.colorBgSelected]:
      header?.colorBgMenuItemSelected ?? 'var(--ant-color-fill-tertiary)',
    [navVar.colorTextSelected]:
      header?.colorTextMenuSelected ?? 'var(--ant-color-text)',
    [navVar.colorDivider]: 'var(--ant-color-split)',
    [navVar.popupBg]:
      header?.colorBgMenuElevated ?? 'var(--ant-color-bg-elevated)',
    [navVar.indent]: '16px',
    [navVar.iconSize]: '16px',
  };

  const isHorizontal = mode.includes('horizontal');

  return {
    [`${token.componentCls}`]: {
      ...(!isHorizontal ? siderVars : headerVars),
      background: 'transparent',
      color: `var(${navVar.colorText})`,
      border: 'none',
      width: '100%',

      [`${token.antCls}-menu-title-content`]: {
        width: '100%',
        height: '100%',
        display: 'inline-flex',
        '&:first-child': {
          width: '100%',
        },
      },

      [`${token.componentCls}-list`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },

      [`${token.componentCls}-item`]: {
        listStyle: 'none',
        margin: 0,
        paddingBlock: token.marginXXS,
        paddingInlineEnd: token.paddingSM,
        cursor: 'pointer',
        color: `var(${navVar.colorText})`,
        borderRadius: `var(--ant-border-radius-lg)`,
        outline: 'none',
        transition: `background-color var(--ant-motion-duration-mid)`,

        '&:focus-visible': {
          outline: `var(--ant-line-width-focus) solid var(--ant-color-primary)`,
          outlineOffset: 1,
        },

        '&:hover:not(&--disabled)': {
          backgroundColor: `var(${navVar.colorBgHover})`,
          color: `var(${navVar.colorTextHover})`,
        },

        '&--selected': {
          backgroundColor: `var(${navVar.colorBgSelected})`,
          color: `var(${navVar.colorTextSelected})`,
        },

        '&--disabled': {
          cursor: 'not-allowed',
          opacity: 0.45,
        },
      },

      [`${token.componentCls}-submenu`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'relative',
      },

      [`${token.componentCls}-submenu-title`]: {
        width: '100%',
        margin: 0,
        paddingBlock: token.marginXXS,
        paddingInlineEnd: token.paddingSM,
        border: 'none',
        background: 'transparent',
        textAlign: 'inherit',
        cursor: 'pointer',
        color: `var(${navVar.colorText})`,
        borderRadius: `var(--ant-border-radius-lg)`,
        font: 'inherit',
        display: 'block',

        '&:focus-visible': {
          outline: `var(--ant-line-width-focus) solid var(--ant-color-primary)`,
          outlineOffset: 1,
        },

        '&:hover': {
          backgroundColor: `var(${navVar.colorBgHover})`,
          color: `var(${navVar.colorTextHover})`,
        },
      },

      [`${token.componentCls}-submenu-title-wrap`]: {
        width: '100%',
      },

      [`${token.componentCls}-submenu-inline`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },

      [`${token.componentCls}-submenu-popup`]: {
        position: 'fixed',
        margin: 0,
        minWidth: 160,
        maxHeight: `calc(100vh - 32px)`,
        overflowY: 'auto',
        padding: token.paddingXXS,
        zIndex: `var(--ant-z-index-popup-base)`,
        boxShadow: `var(--ant-box-shadow-secondary)`,
        borderRadius: `var(--ant-border-radius-lg)`,
        backgroundColor: `var(${navVar.popupBg})`,
      },

      [`${token.componentCls}-group-title`]: {
        fontSize: token.fontSizeSM,
        color: `var(${navVar.colorText})`,
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXXS,
      },

      [`${token.componentCls}-group-list`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },

      [`${token.componentCls}-divider`]: {
        listStyle: 'none',
        height: 1,
        margin: 0,
        borderBlockEnd: `1px solid var(${navVar.colorDivider})`,
      },

      '&-item-title': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: `var(--ant-margin-xs)`,
        width: '100%',
        [`${token.componentCls}-item-text`]: {
          maxWidth: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-all',
          whiteSpace: 'nowrap',
        },
        '&-collapsed': {
          minWidth: 40,
          height: 40,
          [`${token.componentCls}-item-icon`]: {
            height: `var(${navVar.iconSize})`,
            width: `var(${navVar.iconSize})`,
            lineHeight: `var(${navVar.iconSize})`,
            '.anticon': {
              lineHeight: `var(${navVar.iconSize})`,
              height: `var(${navVar.iconSize})`,
            },
          },

          [`${token.componentCls}-item-text-has-icon`]: {
            display: 'none',
          },
        },
        '&-collapsed-level-0': {
          flexDirection: 'column',
          justifyContent: 'center',
        },
        [`&${token.componentCls}-group-item-title`]: {
          gap: `var(--ant-margin-xs)`,
          height: 18,
          overflow: 'hidden',
        },
        [`&${token.componentCls}-item-collapsed-show-title`]: {
          lineHeight: '16px',
          gap: 0,
          [`&${token.componentCls}-item-title-collapsed`]: {
            display: 'flex',
            [`${token.componentCls}-item-icon`]: {
              height: `var(${navVar.iconSize})`,
              width: `var(${navVar.iconSize})`,
              lineHeight: `var(${navVar.iconSize})`,
              '.anticon': {
                lineHeight: `var(${navVar.iconSize})`,
                height: `var(${navVar.iconSize})`,
              },
            },

            [`${token.componentCls}-item-text`]: {
              opacity: 1,
              display: 'inline',
              textAlign: 'center',
              fontSize: token.fontSizeSM,
              height: 12,
              lineHeight: '12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
              margin: 0,
              padding: 0,
              marginBlockStart: 4,
            },
          },
        },
      },

      [`${token.componentCls}-item-icon`]: {
        display: 'flex',
        alignItems: 'center',
      },

      [`${token.componentCls}-group`]: {
        [`${token.componentCls}-group-title`]: {
          '.anticon': {
            marginInlineEnd: 8,
          },
        },
      },

      [`${token.componentCls}-group-divider`]: {
        color: `var(--ant-color-text-secondary)`,
        fontSize: token.fontSizeSM,
        lineHeight: 20,
      },

      [`&${token.componentCls}--collapsed`]: {
        [`${token.componentCls}-item`]: {
          paddingInline: '0 !important',
          marginBlock: `${token.marginXXS} !important`,
        },
        [`${token.componentCls}-submenu-title-wrap`]: {
          paddingInline: '0 !important',
        },
        [`${token.componentCls}-item-title`]: {
          width: '100%',
          maxWidth: '100%',
          opacity: 1,
          overflow: 'visible',
        },
        [`${token.componentCls}-submenu-open > ${token.componentCls}-submenu-title-wrap ${token.componentCls}-submenu-title`]:
          {
            backgroundColor: `var(${navVar.colorBgSelected})`,
            borderRadius: `var(--ant-border-radius-lg)`,
          },
        [`${token.componentCls}-group`]: {
          [`${token.componentCls}-group-title`]: {
            paddingInline: 0,
          },
        },
      },
    },

    [`${token.componentCls}--horizontal`]: {
      ...headerVars,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      [`> ${token.componentCls}-list`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: token.marginXXS,
      },

      [`${token.componentCls}-item`]: {
        paddingInline: token.paddingSM,
        whiteSpace: 'nowrap',
      },

      [`${token.componentCls}-submenu`]: {
        display: 'inline-block',
        position: 'relative',
      },

      [`${token.componentCls}-submenu-title-wrap`]: {
        paddingInlineStart: 0,
      },

      [`${token.componentCls}-submenu-popup`]: {
        [`${token.componentCls}-item-title`]: {
          alignItems: 'flex-start',
        },
      },
    },

    [`${token.componentCls}-link-list`]: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },

    [`${token.componentCls}-link-item`]: {
      listStyle: 'none',
      paddingBlock: token.marginXXS,
      paddingInlineStart: `var(${navVar.indent})`,
    },

    [`${token.componentCls}-link`]: {
      display: 'block',
    },
  };
};

export function useStyle(prefixCls: string, mode: MenuMode | undefined) {
  return useAntdStyle('ProLayoutBaseMenu' + mode, (token) => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken, mode || 'inline')];
  });
}
