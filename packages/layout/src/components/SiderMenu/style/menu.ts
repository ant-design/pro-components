import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProLayoutBaseMenuToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutBaseMenuStyle: GenerateStyle<ProLayoutBaseMenuToken> = (token) => {
  return {
    [`${token.componentCls}`]: {
      background: 'transparent',
      border: 'none',
      [`${token.componentCls}-menu-item`]: {
        transition: 'none !important',
      },
      [`${token.componentCls}-submenu-has-icon`]: {
        [`> ${token.antCls}-menu-sub`]: {
          paddingInlineStart: 10,
        },
      },
      [`&&-collapsed`]: {
        [`${token.antCls}-menu-item, 
        ${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-item, 
        ${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-submenu > ${token.antCls}-menu-submenu-title, 
        ${token.antCls}-menu-submenu > ${token.antCls}-menu-submenu-title`]: {
          paddingInline: '0 !important',
          height: 'auto !important',
          marginBlock: '8px !important',
        },
        [`${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-submenu-selected > ${token.antCls}-menu-submenu-title, 
        ${token.antCls}-menu-submenu-selected > ${token.antCls}-menu-submenu-title`]: {
          backgroundColor: token.layout?.sider?.colorBgMenuItemSelected,
          borderRadius: token.borderRadius,
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
        '.anticon': {
          lineHeight: '14px',
          height: '14px',
        },
      },
      '& &-item-title': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '&-collapsed': {
          flexDirection: 'column',
          justifyContent: 'center',
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

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutBaseMenu', (token) => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken)];
  });
}
