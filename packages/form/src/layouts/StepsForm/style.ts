import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface StepsFormToken extends ProAliasToken {
  componentCls: string;
}

const genStepsFormStyle: GenerateStyle<StepsFormToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-container': {
        width: 'max-content',
        minWidth: '520px',
        maxWidth: '100%',
        margin: 'auto',
      },
      '&-steps-container': {
        maxWidth: '1160px',
        margin: 'auto',
        [`${token.antCls}-steps-vertical`]: { height: '100%' },
      },
      '&-step': {
        display: 'none',
        marginBlockStart: '32px',
        '&-active': {
          display: 'block',
        },
        '> form': { maxWidth: '100%' },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('StepsForm', (token) => {
    const loginFormToken: StepsFormToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genStepsFormStyle(loginFormToken)];
  });
}
