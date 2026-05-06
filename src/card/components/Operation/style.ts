import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginBlock: token.marginLG,
      marginInline: 0,
      color: token.colorText,
      fontWeight: token.fontWeightStrong,
      // 对齐 antd 的 H4 标题字号（默认 20px），与 Card title 视觉层级一致
      fontSize: token.fontSizeHeading4,
      lineHeight: token.lineHeightHeading4,
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProCardOperation', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
