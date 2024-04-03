import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-icon': {
        marginInlineEnd: 8,
        color: token.colorTextSecondary,
        cursor: 'grab !important',
        padding: 4,
        fontSize: 12,
        borderRadius: token.borderRadius,
        '&:hover': {
          color: token.colorText,
          backgroundColor: token.colorInfoBg,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('DragSortTable', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProListStyle(proListToken)];
  });
}
