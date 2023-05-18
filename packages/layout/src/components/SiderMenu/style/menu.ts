import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
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
      },
      [`${token.antCls}-menu-title-content`]: {
        '&:first-child': {
          width: '100%',
        },
      },
      [`&&-collapsed`]: {
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

      [`${token.componentCls}-item-icon`]: {
        height: '14px',
        width: '14px',
        opacity: '0.85',
        lineHeight: '14px',
        '> span.anticon': {
          lineHeight: '14px!important',
          height: '14px',
        },
      },
      '& &-item-title': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        '&-collapsed': {
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 40,
          height: 40,
          [`${token.componentCls}-item-icon`]: {
            height: '16px',
            width: '16px',
            lineHeight: '16px !important',
            '.anticon': {
              lineHeight: '16px',
              height: '16px',
            },
          },
          [`${token.componentCls}-item-text`]: {
            maxWidth: '100%',
          },
          [`${token.componentCls}-item-text-has-icon`]: {
            display: 'none !important',
          },
        },
        [`&${token.componentCls}-group-item-title`]: {
          gap: 4,
          height: 18,
          overflow: 'hidden',
        },
        [`&${token.componentCls}-item-collapsed-show-title`]: {
          lineHeight: '16px',
          height: '48px',
          [`&${token.componentCls}-item-title-collapsed`]: {
            display: 'flex',
            [`${token.componentCls}-item-icon`]: {
              height: '16px',
              width: '16px',
              lineHeight: '16px !important',
              '.anticon': {
                lineHeight: '16px',
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
