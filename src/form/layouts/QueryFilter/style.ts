import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '&&': {
        padding: token.paddingLG,
      },
      [`${token.antCls}-form-item`]: {
        marginBlock: 0,
      },
      [`${token.proComponentsCls}-form-group-title`]: {
        marginBlock: 0,
      },
      '&-row': {
        rowGap: token.paddingLG,
        '&-split': {
          [`${token.proComponentsCls}-form-group`]: {
            display: 'flex',
            alignItems: 'center',
            gap: token.marginXS,
          },
          '&:last-child': {
            marginBlockEnd: token.paddingSM,
          },
        },
        '&-split-line': {
          '&:after': {
            position: 'absolute',
            width: '100%',
            content: '""',
            height: 1,
            insetBlockEnd: -token.paddingSM,
            borderBlockEnd: `1px dashed ${token.colorSplit}`,
          },
        },
      },
      '&-collapse-button': {
        display: 'flex',
        alignItems: 'center',
        padding: token.paddingXXS,
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
