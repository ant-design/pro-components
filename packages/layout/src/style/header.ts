import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProLayoutHeaderToken extends ProAliasToken {
  componentCls: string;
  ProLayoutHeaderHeaderHeight: number;
  proLayoutCls: string;
}

const genProLayoutHeaderStyle: GenerateStyle<ProLayoutHeaderToken> = (token) => {
  return {
    [token.proLayoutCls]: {
      [token.componentCls]: {
        height: token.ProLayoutHeaderHeaderHeight,
        lineHeight: `${token.ProLayoutHeaderHeaderHeight}px`,
        zIndex: '9',
        width: '100%',
        padding: '0 8px',
        borderBottom: `1px solid ${token.colorSplit}`,
        backgroundColor: 'rgba(255, 255, 255, 0.58)',
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        '&-fixed-header': {
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 100,
          right: 0,
        },
        '&-header-actions': {
          display: 'flex',
          alignItems: 'center',
          fontSize: '16',
          cursor: 'pointer',
          '&-item': {
            padding: '0 8px',
            '&:hover': {
              color: token.colorText,
            },
          },
        },
        '&-header-realDark': { boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 65%)' },
        '&--header-actions-header-action': {
          transition: 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        },
      },
    },
  };
};

export function useStyle(prefixCls: string, props: { proLayoutCls: string }) {
  return useAntdStyle('pro-layout-header', (token) => {
    const ProLayoutHeaderToken: ProLayoutHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutCls: `.${props.proLayoutCls}`,
      ProLayoutHeaderHeaderHeight: 56,
    };

    return [genProLayoutHeaderStyle(ProLayoutHeaderToken)];
  });
}
