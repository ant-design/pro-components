import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginBlock: token.marginLG,
      marginInline: 0,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '38px',
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('Operation', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
