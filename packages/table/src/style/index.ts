import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      zIndex: 1,
      '&:not(:root):fullscreen': {
        minHeight: '100vh',
        overflow: 'auto',
        background: '@component-background',
      },

      '&-extra': {
        marginBottom: 16,
      },
      '&-polling': {
        [`${token.componentCls}-list-toolbar-setting-item`]: {
          '.anticon.anticon-reload': {
            transform: 'rotate(0deg)',
            animation: 'turn 1s linear infinite',
          },
        },
      },
      'td${token.antCls}-table-cell': {
        '>a': {
          fontSize: token.fontSize,
        },
      },
      [`${token.antCls}-table${token.antCls}-table-tbody${token.antCls}-table-wrapper:only-child${token.antCls}-table`]:
        {
          margin: 0,
        },
      [`${token.antCls}-table${token.antCls}-table-middle ${token.componentCls}`]: {
        margin: '-12px -8px',
      },
    },
    '@keyframes turn': {
      '0%': { transform: 'rotate(0deg)' },
      '25%': { transform: 'rotate(90deg)' },
      '50%': { transform: 'rotate(180deg)' },
      '75%': { transform: 'rotate(270deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },

    '&-search': {
      marginBottom: '16px',
      padding: '24px',
      paddingBottom: '0',
      background: '@component-background',
      '&-ghost': {
        background: 'transparent',
      },
      [`&${token.componentCls}-form`]: { margin: '0', padding: '0 16px', overflow: 'unset' },
      '&-light': { marginBottom: '0', padding: '16px 0' },
      '&-form-option': {
        [`${token.antCls}-form-item`]: {},
        [`${token.antCls}-form-item-label`]: {},
        [`${token.antCls}-form-item-control-input`]: {},
      },
      '@media (max-width: 575px)': {
        [token.componentCls]: {
          height: 'auto !important',
          paddingBottom: '24px',
          [`${token.antCls}-form-item-label`]: { minWidth: '80px', textAlign: 'left' },
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
