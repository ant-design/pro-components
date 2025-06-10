import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface GlobalFooterToken extends ProAliasToken {
  componentCls: string;
  probgLayout?: string;
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
      '&-list': {
        marginBlockEnd: 8,
        color: token.colorTextSecondary,
        '&-link': {
          color: token.colorTextSecondary,
          textDecoration: token.linkDecoration,
        },
        '*:not(:last-child)': {
          marginInlineEnd: 8,
        },
        '&:hover': {
          color: token.colorPrimary,
        },
      },
      '&-copyright': { fontSize: '14px', color: token.colorText },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutFooter', (token) => {
    const proCardToken: GlobalFooterToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genFooterToolBarStyle(proCardToken)];
  });
}
