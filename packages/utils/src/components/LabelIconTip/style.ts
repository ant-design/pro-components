import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'inline-flex',
      alignItems: 'center',
      maxWidth: '100%',
      '&-icon': {
        display: 'block',
        marginInlineStart: '4px',
        cursor: 'pointer',
        '&:hover': {
          color: token.colorPrimary,
        },
      },
      '&-title': { display: 'inline-flex', flex: '1' },
      '&-subtitle ': {
        marginInlineStart: 8,
        color: token.colorTextSecondary,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        whiteSpace: 'nowrap',
      },
      '&-title-ellipsis': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'keep-all',
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LabelIconTip', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
