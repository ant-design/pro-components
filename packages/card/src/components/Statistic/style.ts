import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      '@font-face': {
        fontFamily: 'AlipayNumber-Regular',
        src: "url('https://gw.alipayobjects.com/as/g/antui/antui-static/1.0.3/fonts/AlipayNumber-Regular.ttf')",
        fontWeight: 'normal',
        fontStyle: 'normal',
      },

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
        [`${token.antCls}-statistic-content`]: {
          '&-value-int': {
            fontSize: token.fontSizeHeading3,
            fontFamily: `AlipayNumber-Regular,${token.fontFamily}`,
          },
        },
      },
      '&-description': {
        width: '100%',
        [`${token.antCls}-statistic-content`]: {
          '&-value': {
            fontFamily: `AlipayNumber-Regular,${token.fontFamily}`,
          },
        },
      },
      [`${token.antCls}-statistic-title`]: {
        color: token.colorText,
      },
      '&-trend-up': {
        [`${token.antCls}-statistic-content`]: {
          color: '#f5222d',
          [`${token.componentCls}-trend-icon`]: {
            borderBlockEndColor: '#f5222d',
          },
        },
      },
      '&-trend-down': {
        [`${token.antCls}-statistic-content`]: {
          color: '#389e0d',
          [`${token.componentCls}-trend-icon`]: {
            borderBlockEndColor: '#52c41a',
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
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proListToken)];
  });
}
