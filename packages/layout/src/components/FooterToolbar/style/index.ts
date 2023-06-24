import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { setAlpha, useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface FooterToolBarToken extends ProAliasToken {
  componentCls: string;
}

const genFooterToolBarStyle: GenerateStyle<FooterToolBarToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'fixed',
      insetInlineEnd: 0,
      bottom: 0,
      zIndex: 99,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      paddingInline: 24,
      paddingBlock: 0,
      boxSizing: 'border-box',
      lineHeight: '64px',
      /* A way to reset the style of the component. */
      backgroundColor: setAlpha(token.colorBgElevated, 0.6),
      borderBlockStart: `1px solid ${token.colorSplit}`,
      '-webkit-backdrop-filter': 'blur(8px)',
      backdropFilter: 'blur(8px)',
      color: token.colorText,
      transition: 'all 0.2s ease 0s',
      '&-left': {
        flex: 1,
        color: token.colorText,
      },
      '&-right': {
        color: token.colorText,
        '> *': {
          marginInlineEnd: 8,
          '&:last-child': {
            marginBlock: 0,
            marginInline: 0,
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutFooterToolbar', (token) => {
    const proCardToken: FooterToolBarToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genFooterToolBarStyle(proCardToken)];
  });
}
