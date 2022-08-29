import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { useContext } from 'react';
import type { BaseLayoutDesignToken } from '../../context/ProLayoutContext';
import { ProLayoutContext } from '../../context/ProLayoutContext';

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
}

const genSiderMenuStyle: GenerateStyle<SiderMenuToken & BaseLayoutDesignToken['sider']> = (
  token,
) => {
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
      color: token.colorTextCollapsedButton,
      backgroundColor: token.colorBgCollapsedButton,
      boxShadow:
        '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
      '&:hover': {
        color: token.colorTextCollapsedButtonHover,
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
  const { sider } = useContext(ProLayoutContext);
  return useAntdStyle('sider-menu-collapsed-icon', (token) => {
    const siderMenuToken: SiderMenuToken & BaseLayoutDesignToken['sider'] = {
      ...token,
      componentCls: `.${prefixCls}`,
      ...sider,
    };
    return [genSiderMenuStyle(siderMenuToken)];
  });
}
