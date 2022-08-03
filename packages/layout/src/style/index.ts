import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProLayoutToken extends ProAliasToken {
  componentCls: string;
  proLayoutBg: string;
}

const genProLayoutStyle: GenerateStyle<ProLayoutToken> = (token) => {
  return {
    body: {
      paddingBlock: 0,
      paddingInline: 0,
      marginBlock: 0,
      marginInline: 0,
      fontFamily: token.fontFamily,
    },
    [token.componentCls]: {
      [`${token.componentCls}-content`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'transparent',
        position: 'relative',
        '*': { boxSizing: 'border-box', fontFamily: token.fontFamily },
        '&-content-has-margin': {
          marginBlock: 16,
          marginInline: 24,
        },
      },
      [`${token.componentCls}-bg-list`]: {
        pointerEvents: 'none',
        position: 'fixed',
        overflow: 'hidden',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 0,
        height: '100%',
        width: '100%',
        background: token.proLayoutBg,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('pro-layout', (token) => {
    const proLayoutToken: ProLayoutToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutBg: 'transparent',
    };

    return [genProLayoutStyle(proLayoutToken)];
  });
}
