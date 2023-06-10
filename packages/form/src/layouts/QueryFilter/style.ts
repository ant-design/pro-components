import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      '&&': {
        padding: 24,
      },
      [`${token.antCls}-form-item`]: {
        marginBlock: 0,
      },
      [`${token.proComponentsCls}-form-group-title`]: {
        marginBlock: 0,
      },
      '&-row': {
        rowGap: 24,
        '&-split': {
          [`${token.proComponentsCls}-form-group`]: {
            display: 'flex',
            alignItems: 'center',
            gap: token.marginXS,
          },
          '&:last-child': {
            marginBlockEnd: 12,
          },
        },
        '&-split-line': {
          '&:after': {
            position: 'absolute',
            width: '100%',
            content: '""',
            height: 1,
            insetBlockEnd: -12,
            borderBlockEnd: `1px dashed ${token.colorSplit}`,
          },
        },
      },
      '&-collapse-button': {
        display: 'flex',
        alignItems: 'center',
        color: token.colorPrimary,
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
