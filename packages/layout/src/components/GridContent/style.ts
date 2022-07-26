import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface GridContentToken extends ProAliasToken {
  componentCls: string;
}

const genGridContentStyle: GenerateStyle<GridContentToken> = (token) => {
  return {
    [token.componentCls]: {
      width: '100%',
      '&-wide': {
        maxWidth: 1152,
        margin: '0 auto',
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('pro-layout-grid-content', (token) => {
    const GridContentToken: GridContentToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genGridContentStyle(GridContentToken)];
  });
}
