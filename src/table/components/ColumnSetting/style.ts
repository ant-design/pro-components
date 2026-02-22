import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      width: 'auto',
      '&-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
      },
      '&-overlay': {
        [`${token.antCls}-popover-inner-content`]: {
          width: '200px',
          paddingBlock: 0,
          paddingInline: 0,
          paddingBlockEnd: 8,
        },
      },
      '&-list-item-wrapper': {
        display: 'flex',
        alignItems: 'center',
        minHeight: 24,
        gap: 4,
        '&:hover': {
          [`${token.componentCls}-list-item-option`]: {
            display: 'block',
          },
        },
      },
      '&-list-item-drag-handle': {
        cursor: 'grab',
        color: token.colorTextSecondary,
        marginInlineStart: 'auto',
      },
      '&-list-items': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    [`${token.componentCls}-action-rest-button`]: {
      color: token.colorPrimary,
    },
    [`${token.componentCls}-list`]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBlockStart: 8,
      [`&${token.componentCls}-list-group`]: {
        paddingBlockStart: 0,
      },
      '&-title': {
        marginBlockStart: '6px',
        marginBlockEnd: '6px',
        paddingInlineStart: '24px',
        color: token.colorTextSecondary,
        fontSize: '12px',
      },

      '&-item': {
        display: 'flex',
        alignItems: 'center',
        maxHeight: 24,
        justifyContent: 'space-between',
        '&-title': {
          flex: 1,
          maxWidth: 80,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-all',
          whiteSpace: 'nowrap',
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
            marginInlineStart: 4,
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ColumnSetting', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
