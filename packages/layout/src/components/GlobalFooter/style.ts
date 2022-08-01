import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface GlobalFooterToken extends ProAliasToken {
  componentCls: string;
  proLayoutBgColor?: string;
}

const genFooterToolBarStyle: GenerateStyle<GlobalFooterToken> = (token) => {
  return {
    [token.componentCls]: {
      margin: '48px 0 24px 0',
      padding: '0 16px',
      textAlign: 'center',
      '&-links': {
        marginBottom: '8px',
        color: token.colorTextSecondary,
        '> *:not(:last-child)': {
          marginRight: 8,
          '&:hover': {
            color: token.colorText,
          },
        },
      },
      '&-copyright': { fontSize: '14px', color: token.colorText },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('pro-layout-footer', (token) => {
    const proCardToken: GlobalFooterToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genFooterToolBarStyle(proCardToken)];
  });
}
