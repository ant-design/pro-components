import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      marginBlockEnd: 16,
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderRadius: '4px',
      border: 'none',
      '&-container': {
        paddingBlock: token.paddingSM,
        paddingInline: token.paddingLG,
      },
      '&-info': {
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
        color: token.colorTextTertiary,
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
