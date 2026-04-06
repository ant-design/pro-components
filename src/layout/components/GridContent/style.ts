import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface GridContentToken extends ProAliasToken {
  componentCls: string;
}

const genGridContentStyle: GenerateStyle<GridContentToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      width: '100%',
      '&-wide': {
        maxWidth: 1152,
        margin: '0 auto',
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutGridContent', (token) => {
    const GridContentToken: GridContentToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genGridContentStyle(GridContentToken)];
  });
}
