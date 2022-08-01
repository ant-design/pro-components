import type { GenerateStyle } from 'antd/es/theme';
import type { ProAliasToken } from '../../useStyle';
import { useStyle as useAntdStyle } from '../../useStyle';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 16px 16px 8px',
      borderTop: `1px solid ${token.colorSplit}`,
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('DropdownFooter', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
