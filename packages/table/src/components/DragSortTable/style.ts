import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-visible-cell': { display: 'flex', alignItems: 'center' },
      '&-icon': { marginRight: '8px', color: '#999', cursor: 'grab' },
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
