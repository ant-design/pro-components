import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      marginBlockEnd: 16,
      [`${token.antCls}-alert${token.antCls}-alert-no-icon`]: {
        paddingBlock: token.paddingSM,
        paddingInline: token.paddingLG,
      },
      '$-info': {
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
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
  return useAntdStyle('CheckCard', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
