import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.componentCls}-label`]: { cursor: 'pointer' },
    [`${token.componentCls}-overlay`]: {
      minWidth: '200px',
      marginBlockStart: '4px',
    },
    [`${token.componentCls}-content`]: { paddingBlock: 16, paddingInline: 16 },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('FilterDropdown', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
