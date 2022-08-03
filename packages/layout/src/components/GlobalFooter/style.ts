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
      marginBlock: 0,
      marginBlockStart: 48,
      marginBlockEnd: 24,
      marginInline: 0,
      paddingBlock: 0,
      paddingInline: 16,
      textAlign: 'center',
      '&-links': {
        marginBlockEnd: 8,
        color: token.colorTextSecondary,
        '> *:not(:last-child)': {
          marginInlineEnd: 8,
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
