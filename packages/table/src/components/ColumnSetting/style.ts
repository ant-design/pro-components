import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      width: 'auto',
      '&-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
      },
      '&-overlay': {
        '*': {
          boxSizing: 'border-box',
        },
        [`${token.antCls}-popover-inner-content`]: {
          width: '200px',
          padding: '0px',
          paddingBottom: '8px',
        },
        [`${token.antCls}-tree-node-content-wrapper:hover`]: { backgroundColor: 'transparent' },
        [`${token.antCls}-tree-draggable-icon`]: { cursor: 'grab' },
        [`${token.antCls}-tree-treenode`]: {
          alignItems: 'center',
          '&:hover': {
            backgroundColor: token.controlItemBgActive,
            [`${token.componentCls}-list-item-option`]: {
              display: 'block',
            },
          },
          [`${token.antCls}-tree-checkbox`]: { top: '0', margin: '0', marginRight: '4px' },
        },
      },
    },
    [`${token.componentCls}-list`]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingTop: '8px',
      [`&${token.componentCls}-list-group`]: {
        paddingTop: 0,
      },
      '&-title': {
        marginTop: '6px',
        marginBottom: '6px',
        paddingLeft: '24px',
        color: token.colorTextSecondary,
        fontSize: '12px',
      },
      '&-item': {
        display: 'flex',
        alignItems: 'center',
        '&-title': {
          flex: 1,
        },
        '&-option': {
          display: 'none',
          float: 'right',
          cursor: 'pointer',
          '> span': {
            '> span.anticon': {
              color: token.colorPrimary,
            },
          },
          '> span + span': {
            marginLeft: 8,
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('CheckCard', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
