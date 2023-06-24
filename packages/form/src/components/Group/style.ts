import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-title': { marginBlockEnd: token.marginXL, fontWeight: 'bold' },
      '&-container': {
        flexWrap: 'wrap',
        maxWidth: '100%',
        [`> div${token.antCls}-space-item`]: {
          maxWidth: '100%',
        },
      },
      '&-twoLine': {
        display: 'block',
        width: '100%',
        [`${token.componentCls}-title`]: { width: '100%', margin: '8px 0' },
        [`${token.componentCls}-container`]: { paddingInlineStart: 16 },
        [`${token.antCls}-space-item,${token.antCls}-form-item`]: {
          width: '100%',
        },
        [`${token.antCls}-form-item`]: {
          '&-control': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            '&-input': {
              alignItems: 'center',
              justifyContent: 'flex-end',
              '&-content': {
                flex: 'none',
              },
            },
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProFormGroup', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
