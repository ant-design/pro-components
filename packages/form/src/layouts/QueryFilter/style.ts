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
        [`&${token.antCls}-form-horizontal`]: {
          paddingInline: 0,
        },
        [`${token.antCls}-form-item`]: {
          marginBlock: 0,
        },
        [`${token.proComponentsCls}-form-group-title`]: {
          marginBlock: 0,
        },
        '&-row': {
          rowGap: 24,
          '&-split-line': {
            '&:after': {
              position: 'absolute',
              width: '100%',
              content: '""',
              height: 1,
              insetBlockEnd: -12,
              borderBlockEnd: '1px dashed ' + token.colorSplit,
            },
          },
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
