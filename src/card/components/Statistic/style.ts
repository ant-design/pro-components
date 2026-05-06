import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface StatisticToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<StatisticToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      display: 'flex',
      fontSize: token.fontSize,
      '& + &': {
        marginBlockStart: 4,
      },
      '&-tip': {
        marginInlineStart: 4,
      },
      '&-wrapper': {
        display: 'flex',
        width: '100%',
        [`${token.componentCls}-status`]: {
          width: '14px',
        },
      },
      '&-icon': {
        marginInlineEnd: 16,
      },
      '&-trend-icon': {
        width: 0,
        height: 0,
        borderInlineEnd: '3.5px solid transparent',
        borderBlockEnd: '9px solid #000',
        borderInlineStart: '3.5px solid transparent',
        '&-up': { transform: 'rotate(0deg)' },
        '&-down': { transform: 'rotate(180deg)' },
      },
      '&-content': {
        width: '100%',
      },
      '&-description': {
        width: '100%',
      },
      [`${token.antCls}-statistic-title`]: {
        color: token.colorText,
      },
      // 趋势上涨：默认接 antd 的 colorError（中国金融语义：红涨）
      // 海外业务可通过 ConfigProvider 覆盖 token.colorError 或自定义类名覆盖
      '&-trend-up': {
        [`${token.antCls}-statistic-content`]: {
          color: token.colorError,
          [`${token.componentCls}-trend-icon`]: {
            borderBlockEndColor: token.colorError,
          },
        },
      },
      // 趋势下降：默认接 antd 的 colorSuccess（中国金融语义：绿跌）
      '&-trend-down': {
        [`${token.antCls}-statistic-content`]: {
          color: token.colorSuccess,
          [`${token.componentCls}-trend-icon`]: {
            borderBlockEndColor: token.colorSuccess,
          },
        },
      },
      '& &-layout-horizontal': {
        display: 'flex',
        justifyContent: 'space-between',
        [`${token.antCls}-statistic-title`]: {
          marginBlockEnd: 0,
        },
        [`${token.antCls}-statistic-content-value`]: {
          fontWeight: 500,
        },
        [`${token.antCls}-statistic-title,${token.antCls}-statistic-content,${token.antCls}-statistic-content-suffix,${token.antCls}-statistic-content-prefix,${token.antCls}-statistic-content-value-decimal`]:
          {
            fontSize: token.fontSize,
          },
      },
      '& &-layout-inline': {
        display: 'inline-flex',
        color: token.colorTextSecondary,
        [`${token.antCls}-statistic-title`]: {
          marginInlineEnd: '6px',
          marginBlockEnd: 0,
        },
        [`${token.antCls}-statistic-content`]: {
          color: token.colorTextSecondary,
        },
        [`${token.antCls}-statistic-title,${token.antCls}-statistic-content,${token.antCls}-statistic-content-suffix,${token.antCls}-statistic-content-prefix,${token.antCls}-statistic-content-value-decimal`]:
          {
            fontSize: token.fontSizeSM,
          },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('Statistic', (token) => {
    const statisticToken: StatisticToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(statisticToken)];
  });
}
