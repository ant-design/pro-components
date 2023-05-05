import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

export const turn = new Keyframes('turn', {
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(90deg)' },
  '50%': { transform: 'rotate(180deg)' },
  '75%': { transform: 'rotate(270deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      zIndex: 1,
      [`${token.antCls}-table-wrapper ${token.antCls}-table-pagination${token.antCls}-pagination`]:
        {
          marginBlockEnd: 0,
        },
      '&:not(:root):fullscreen': {
        minHeight: '100vh',
        overflow: 'auto',
        background: token.colorBgContainer,
      },
      '&-extra': {
        marginBlockEnd: 16,
      },
      '&-polling': {
        [`${token.componentCls}-list-toolbar-setting-item`]: {
          '.anticon.anticon-reload': {
            transform: 'rotate(0deg)',
            animationName: turn,
            animationDuration: '1s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          },
        },
      },
      [`td${token.antCls}-table-cell`]: {
        '>a': {
          fontSize: token.fontSize,
        },
      },
      [`${token.antCls}-table${token.antCls}-table-tbody${token.antCls}-table-wrapper:only-child${token.antCls}-table`]:
        {
          marginBlock: 0,
          marginInline: 0,
        },
      [`${token.antCls}-table${token.antCls}-table-middle ${token.componentCls}`]:
        {
          marginBlock: 0,
          marginInline: -8,
          [`${token.proComponentsCls}-card`]: {
            backgroundColor: 'initial',
          },
        },

      '& &-search': {
        marginBlockEnd: '16px',
        background: token.colorBgContainer,
        '&-ghost': {
          background: 'transparent',
        },
        [`&${token.componentCls}-form`]: {
          marginBlock: 0,
          marginInline: 0,
          paddingBlock: 0,
          paddingInline: 16,
          overflow: 'unset',
        },

        '&-light-filter': {
          marginBlockEnd: 0,
          paddingBlock: 0,
          paddingInline: 0,
        },

        '&-form-option': {
          [`${token.antCls}-form-item`]: {},
          [`${token.antCls}-form-item-label`]: {},
          [`${token.antCls}-form-item-control-input`]: {},
        },
        '@media (max-width: 575px)': {
          [token.componentCls]: {
            height: 'auto !important',
            paddingBlockEnd: '24px',
            [`${token.antCls}-form-item-label`]: {
              minWidth: '80px',
              textAlign: 'start',
            },
          },
        },
      },
      '&-toolbar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        paddingInline: 24,
        paddingBlock: 0,
        '&-option': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        '&-title': {
          flex: '1',
          color: token.colorTextLabel,
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '24px',
          opacity: '0.85',
        },
      },
    },

    [`@media (max-width: ${token.screenXS})`]: {
      [token.componentCls]: {
        [`${token.antCls}-table`]: {
          width: '100%',
          overflowX: 'auto',
          '&-thead > tr,&-tbody > tr': {
            '> th,> td': {
              whiteSpace: 'pre',
              '>span': {
                display: 'block',
              },
            },
          },
        },
      },
    },
    '@media (max-width: 575px)': {
      [`${token.componentCls}-toolbar`]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 'auto',
        marginBlockEnd: '16px',
        marginInlineStart: '16px',
        paddingBlock: 8,
        paddingInline: 8,
        paddingBlockStart: '16px',
        lineHeight: 'normal',
        '&-title': {
          marginBlockEnd: 16,
        },
        '&-option': {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        },
        '&-default-option': {
          display: 'flex',
          flex: '1',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProTable', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProListStyle(proListToken)];
  });
}
