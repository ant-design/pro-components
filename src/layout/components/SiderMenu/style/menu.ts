import type { GenerateStyle, ProAliasToken } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
import type { MenuMode } from '../BaseMenu';

export interface ProLayoutBaseMenuToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutBaseMenuStyle: GenerateStyle<ProLayoutBaseMenuToken> = (
  token,
  mode,
) => {
  const menuToken = mode.includes('horizontal')
    ? token.layout?.header
    : token.layout?.sider;

  return {
    [`${token.componentCls}`]: {
      background: 'transparent',
      color: menuToken?.colorTextMenu,
      border: 'none',
      [`${token.componentCls}-menu-item`]: {
        transition: 'none !important',
      },
      [`${token.componentCls}-submenu-has-icon`]: {
        [`> ${token.antCls}-menu-sub`]: {
          paddingInlineStart: 10,
        },
      },
      [`${token.antCls}-menu-title-content`]: {
        width: '100%',
        height: '100%',
        display: 'inline-flex',
        '&:first-child': {
          width: '100%',
        },
      },
      [`${token.componentCls}-item-icon`]: {
        display: 'flex',
        alignItems: 'center',
      },
      [`&&-collapsed`]: {
        // antd ≥6.3.4 折叠 Menu 对 title-content 隐藏更彻底（如 #57360）；Pro 图标在 label 内，需恢复可见（布局仍由 *-item-title-collapsed 控制）
        [`&${token.antCls}-menu-inline-collapsed`]: {
          [`> ${token.antCls}-menu-item > ${token.antCls}-menu-title-content,
            > ${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-item > ${token.antCls}-menu-title-content,
            > ${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-submenu > ${token.antCls}-menu-submenu-title > ${token.antCls}-menu-title-content,
            > ${token.antCls}-menu-submenu > ${token.antCls}-menu-submenu-title > ${token.antCls}-menu-title-content`]:
            {
              width: '100% !important',
              maxWidth: '100%',
              opacity: '1 !important',
              overflow: 'visible !important',
            },
        },
        [`${token.antCls}-menu-item, 
        ${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-item, 
        ${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-submenu > ${token.antCls}-menu-submenu-title, 
        ${token.antCls}-menu-submenu > ${token.antCls}-menu-submenu-title`]: {
          paddingInline: '0 !important',
          marginBlock: '4px !important',
        },
        [`${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-submenu-selected > ${token.antCls}-menu-submenu-title, 
        ${token.antCls}-menu-submenu-selected > ${token.antCls}-menu-submenu-title`]:
          {
            backgroundColor: menuToken?.colorBgMenuItemSelected,
            borderRadius: token.borderRadiusLG,
          },
        [`${token.componentCls}-group`]: {
          [`${token.antCls}-menu-item-group-title`]: {
            paddingInline: 0,
          },
        },
      },

      '&-item-title': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: token.marginXS,
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
            height: '16px',
            width: '16px',
            lineHeight: '16px !important',
            '.anticon': {
              lineHeight: '16px !important',
              height: '16px',
            },
          },

          [`${token.componentCls}-item-text-has-icon`]: {
            display: 'none !important',
          },
        },
        '&-collapsed-level-0': {
          flexDirection: 'column',
          justifyContent: 'center',
        },
        [`&${token.componentCls}-group-item-title`]: {
          gap: token.marginXS,
          height: 18,
          overflow: 'hidden',
        },
        [`&${token.componentCls}-item-collapsed-show-title`]: {
          lineHeight: '16px',
          gap: 0,
          [`&${token.componentCls}-item-title-collapsed`]: {
            display: 'flex',
            [`${token.componentCls}-item-icon`]: {
              height: '16px',
              width: '16px',
              lineHeight: '16px !important',
              '.anticon': {
                lineHeight: '16px!important',
                height: '16px',
              },
            },

            [`${token.componentCls}-item-text`]: {
              opacity: '1 !important',
              display: 'inline !important',
              textAlign: 'center',
              fontSize: 12,
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
      '&-group': {
        [`${token.antCls}-menu-item-group-title`]: {
          fontSize: 12,
          color: token.colorTextLabel,
          '.anticon': {
            marginInlineEnd: 8,
          },
        },
      },

      '&-group-divider': {
        color: token.colorTextSecondary,
        fontSize: 12,
        lineHeight: 20,
      },
    },
    ...(mode.includes('horizontal')
      ? {}
      : {
          [`${token.antCls}-menu-submenu${token.antCls}-menu-submenu-popup`]: {
            [`${token.componentCls}-item-title`]: {
              alignItems: 'flex-start',
            },
          },
        }),
    [`${token.antCls}-menu-submenu-popup`]: {
      backgroundColor: 'rgba(255, 255, 255, 0.42)',
      '-webkit-backdrop-filter': 'blur(8px)',
      backdropFilter: 'blur(8px)',
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
