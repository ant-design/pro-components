import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { AliasToken, GenerateStyle } from 'antd/es/theme';

interface ProCardDividerToken extends AliasToken {
  componentCls: string;
}

const genDividerStyle: GenerateStyle<ProCardDividerToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&-divider': {
        flex: 'none',
        width: token.lineWidth,
        margin: `${token.marginLG}px ${token.marginXS}px`,
        backgroundColor: token.colorSplit,

        '&-horizontal': {
          width: 'initial',
          height: token.lineWidth,
          margin: `${token.marginXS}px ${token.marginLG}px`,
        },
      },

      '&&-size-small &-divider': {
        margin: `${token.marginLG}px ${token.marginXS}px`,
        '&-horizontal': {
          margin: `${token.marginXS}px ${token.marginLG}px`,
        },
      },
    },
  };
};

export default function useStyle(prefixCls: string) {
  return useAntdStyle('ProCardDivider', (token) => {
    const proCardDividerToken: ProCardDividerToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genDividerStyle(proCardDividerToken)];
  });
}
