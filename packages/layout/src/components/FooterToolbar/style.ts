import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { resetComponent } from 'antd/es/style';
import type { GenerateStyle } from 'antd/es/theme';

export interface AppsLogoComponentsToken extends ProAliasToken {
  componentCls: string;
  proLayoutBgColor?: string;
}

const genFooterToolBarStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
  return {
    [token.componentCls]: {
      ...resetComponent?.(token),
      position: 'fixed',
      right: 0,
      bottom: 0,
      zIndex: 99,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '0 24px',
      boxSizing: 'border-box',
      lineHeight: '64px',
      /* A way to reset the style of the component. */
      backgroundColor: token.proLayoutBgColor || 'rgba(255, 255, 255, 0.58)',
      borderTop: `1px solid ${token.colorSplit}`,
      '-webkit-backdrop-filter': 'blur(8px)',
      backdropFilter: 'blur(8px)',
      '&-left': {
        flex: 1,
      },
      '&-right': {
        '> *': {
          marginRight: 8,
          '&:last-child': {
            margin: 0,
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('footer-toolbar', (token) => {
    const proCardToken: AppsLogoComponentsToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genFooterToolBarStyle(proCardToken)];
  });
}
