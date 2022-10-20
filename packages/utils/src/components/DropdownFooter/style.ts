﻿import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBlock: 16,
      paddingInlineStart: 8,
      paddingInlineEnd: 16,
      borderBlockStart: `1px solid ${token.colorSplit}`,
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
