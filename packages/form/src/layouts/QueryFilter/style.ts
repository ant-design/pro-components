import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.proComponentsCls]: {
      [token.componentCls]: {
        padding: 24,
        [`${token.antCls}-form-item`]: {
          marginBlock: 0,
        },
        '&-row': {
          rowGap: 24,
        },
        '&-collapse-button': {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('QueryFilter', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
