import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
}

const genSiderMenuStyle: GenerateStyle<SiderMenuToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'absolute',
      insetBlockStart: '18px',
      zIndex: '101',
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
      boxShadow:
        '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
      '&:hover': {
        color: token.layout?.sider?.colorTextCollapsedButtonHover,
        boxShadow:
          '0 4px 16px -4px rgba(0,0,0,0.05), 0 2px 8px -2px rgba(25,15,15,0.07), 0 1px 2px 0 rgba(0,0,0,0.08)',
      },
      '.anticon': {
        fontSize: '14px',
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
