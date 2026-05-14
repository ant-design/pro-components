import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
}

const genSiderMenuStyle: GenerateStyle<SiderMenuToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      position: 'absolute',
      insetBlockStart: '18px',
      zIndex: '102',
      width: '24px',
      height: '24px',
      fontSize: ['14px', '16px'],
      textAlign: 'center',
      borderRadius: '40px',
      insetInlineEnd: '-13px',
      transition: 'transform 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: token.layout?.sider?.colorTextCollapsedButton,
      backgroundColor: token.layout?.sider?.colorBgCollapsedButton,
      boxShadow: token.boxShadowTertiary,
      '&:hover': {
        color: token.layout?.sider?.colorTextCollapsedButtonHover,
        boxShadow: token.boxShadow,
      },
      '& > svg': {
        transition: 'transform  0.3s',
        transform: 'rotate(90deg)',
      },
      '&-collapsed': {
        '& > svg': {
          transform: 'rotate(-90deg)',
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('SiderMenuCollapsedIcon', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genSiderMenuStyle(siderMenuToken)];
  });
}
