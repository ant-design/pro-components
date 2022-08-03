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
        marginInline: token.marginXS,
        marginBlock: token.marginLG,
        backgroundColor: token.colorSplit,
        '&-horizontal': {
          width: 'initial',
          height: token.lineWidth,
          marginInline: token.marginLG,
          marginBlock: token.marginXS,
        },
      },

      '&&-size-small &-divider': {
        marginBlock: token.marginLG,
        marginInline: token.marginXS,
        '&-horizontal': {
          marginBlock: token.marginXS,
          marginInline: token.marginLG,
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
