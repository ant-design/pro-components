import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface AppsLogoComponentsToken extends ProAliasToken {
  componentCls: string;
}

const genFooterToolBarStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
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
      backgroundColor: 'rgba(255, 255, 255, 0.58)',
      borderBlockStart: `1px solid ${token.colorSplit}`,
      '-webkit-backdrop-filter': 'blur(8px)',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.2s ease 0s',
      '&-left': {
        flex: 1,
      },
      '&-right': {
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
    const proCardToken: AppsLogoComponentsToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genFooterToolBarStyle(proCardToken)];
  });
}
