import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface GlobalHeaderToken extends ProAliasToken {
  componentCls: string;
  isMobile: boolean;
  proLayoutHeaderHeight: number;
}

const genGlobalHeaderStyle: GenerateStyle<GlobalHeaderToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      height: token.proLayoutHeaderHeight,
      boxSizing: 'border-box',
      '> a': {
        height: '100%',
      },
      [`${token.proComponentsCls}-layout-apps-icon`]: {
        marginRight: 16,
      },
      '&-collapsed-button': { minHeight: '22px', fontSize: '22px', marginLeft: '16px' },
      '&-logo': {
        position: 'relative',
        minWidth: token.isMobile ? '24px' : '154px',
        marginRight: token.isMobile ? '0' : '16px',
        a: {
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          minHeight: '22px',
          fontSize: '20px',
        },
        img: { height: '28px' },
        h1: {
          height: '32px',
          margin: '0 0 0 8px',
          fontWeight: '600',
          color: token.colorTextHeading,
          fontSize: '18px',
          lineHeight: '32px',
        },
      },
    },
  };
};

export function useStyle(prefixCls: string, props: { isMobile: boolean }) {
  return useAntdStyle('pro-layout-global-header', (token) => {
    const GlobalHeaderToken: GlobalHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutHeaderHeight: 56,
      ...props,
    };

    return [genGlobalHeaderStyle(GlobalHeaderToken)];
  });
}
