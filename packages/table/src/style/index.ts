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
