import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface StatisticCardToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<StatisticCardToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '&-chart': {
        display: 'flex',
        flexDirection: 'column',
        marginBlockStart: 8,
        marginBlockEnd: 8,
        '&-left': { marginBlockStart: 0, marginInlineEnd: '16px' },
        '&-right': { marginBlockStart: 0, marginInlineStart: '16px' },
      },
      '&-content': {
        display: 'flex',
        flexDirection: 'column',
        '&-horizontal': {
          flexDirection: 'row',
          [`${token.componentCls}-chart`]: {
            alignItems: 'center',
            alignSelf: 'flex-start',
          },
        },
      },
      '&-footer': {
        marginBlockStart: token.marginXS,
        paddingBlockStart: token.padding,
        borderBlockStart: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('StatisticCard', (token) => {
    const statisticCardToken: StatisticCardToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(statisticCardToken)];
  });
}
