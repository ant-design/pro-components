import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      marginBlockEnd: 16,
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderRadius: token.radiusBase,
      border: '0.5px solid #BFBFBF',
      '&-container': {
        paddingBlock: token.paddingSM,
        paddingInline: token.paddingLG,
      },
      '&-info': {
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
        color: token.colorTextSecondary,
        '&-content': {
          flex: 1,
        },
        '&-option': {
          minWidth: 48,
          paddingInlineStart: 16,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProTableAlert', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
