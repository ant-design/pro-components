import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../provider';
import { useStyle as useAntdStyle } from '../../provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

export const techUiListActive = new Keyframes('techUiListActive', {
  '0%': { backgroundColor: 'unset' },
  '30%': { background: '#fefbe6' },
  '100%': { backgroundColor: 'unset' },
}) as any;

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      backgroundColor: 'transparent',
      [`${token.proComponentsCls}-table-alert`]: { marginBlockEnd: '16px' },
      [`${token.proComponentsCls}-list-items`]: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: token.marginSM,
        [`${token.proComponentsCls}-list-item`]: {
          padding: token.paddingSM,
          display: 'flex',
          borderRadius: token.borderRadius,
          listStyle: 'none',
          flex: 1,
          minWidth: 0,
        },
      },
      [`${token.proComponentsCls}-list-item`]: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        padding: token.paddingSM,
        alignItems: 'flex-start',
        '& > *:first-child': {
          flex: 1,
          minWidth: 0,
        },
      },
      [`${token.proComponentsCls}-list-item-meta`]: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: 0,
        gap: '8px',
      },
      [`${token.proComponentsCls}-list-item-meta-title`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px',
        borderBlockEnd: 'none',
        margin: 0,
        minWidth: 0,
      },
      [`${token.proComponentsCls}-list-item-action,
        ${token.proComponentsCls}-card-extra,
        ${token.proComponentsCls}-card-actions`]: {
        display: 'flex',
        alignItems: 'center',
        gap: token.marginSM,
        flexShrink: 0,
      },
      '&-row': {
        [`${token.proComponentsCls}-list-item-meta`]: {
          display: 'flex',
          flex: '1',
          flexDirection: 'row',
          alignItems: 'flex-start',
          minWidth: 0,
        },
        [`${token.proComponentsCls}-list-item-meta-content`]: {
          flex: '1',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        },
        [`${token.proComponentsCls}-list-item-meta-title`]: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          borderBlockEnd: 'none',
          margin: 0,
        },
        '&:last-child': {
          borderBlockEnd: 'none',
          [`${token.proComponentsCls}-list-item`]: {
            borderBlockEnd: 'none',
          },
        },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          transition: 'background-color 0.3s',
          [`${token.proComponentsCls}-list-item-action`]: {
            display: 'flex',
            alignItems: 'center',
            gap: token.marginSM,
            flexShrink: 0,
          },
          [`${token.proComponentsCls}-list-item-action-item`]: {
            display: 'inline-flex',
            alignItems: 'center',
          },
          [`${token.proComponentsCls}-list-item-extra`]: {
            display: 'flex',
          },
          [`${token.componentCls}-row-extra`]: {
            display: 'flex',
          },
          [`${token.componentCls}-row-subheader-actions`]: {
            display: 'flex',
          },
        },
        '&-card': {
          marginBlock: 8,
          marginInline: 0,
          paddingBlock: 0,
          paddingInline: 8,
          '&:hover': {
            backgroundColor: 'transparent',
          },
          [`${token.proComponentsCls}-list-item-meta-title`]: {
            flexShrink: 9,
            marginBlock: 0,
            marginInline: 0,
            lineHeight: '22px',
          },
        },
        [`&${token.componentCls}-row-editable`]: {
          [`${token.proComponentsCls}-list-item`]: {
            '&-meta': {
              '&-avatar,&-description,&-title': {
                paddingBlock: 6,
                paddingInline: 0,
                '&-editable': {
                  paddingBlock: 0,
                },
              },
            },
            '&-action': {
              display: 'flex',
              alignItems: 'center',
              gap: token.marginSM,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            },
          },
        },
        [`&${token.componentCls}-row-selected`]: {
          backgroundColor: token.colorPrimaryBgHover,
          '&:hover': {
            backgroundColor: token.colorPrimaryBgHover,
          },
        },
        [`&${token.componentCls}-row-type-new`]: {
          animationName: techUiListActive,
          animationDuration: '3s',
        },
        [`&${token.componentCls}-row-type-inline`]: {
          [`${token.componentCls}-row-title`]: {
            fontWeight: 'normal',
          },
        },
        [`&${token.componentCls}-row-type-top`]: {
          backgroundImage:
            "url('https://gw.alipayobjects.com/zos/antfincdn/DehQfMbOJb/icon.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top',
          backgroundSize: '12px 12px',
        },
        '&-show-action-hover': {
          [`${token.proComponentsCls}-list-item-action,
            ${token.proComponentsCls}-card-extra,
            ${token.proComponentsCls}-card-actions`]: {
            display: 'none',
          },
          '&:hover': {
            [`${token.proComponentsCls}-list-item-action,
              ${token.proComponentsCls}-card-extra,
              ${token.proComponentsCls}-card-actions`]: {
              display: 'flex',
              alignItems: 'center',
              gap: token.marginSM,
            },
          },
        },
        '&-show-extra-hover': {
          [`${token.proComponentsCls}-list-item-extra`]: {
            display: 'none',
          },
        },
        '&-extra': {
          display: 'none',
        },
        '&-subheader': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '44px',
          paddingInline: 24,
          paddingBlock: 0,
          color: token.colorTextSecondary,
          lineHeight: '44px',
          background: 'rgba(0, 0, 0, 0.02)',
          '&-actions': {
            display: 'none',
          },
          '&-actions *': {
            marginInlineEnd: 8,
            '&:last-child': {
              marginInlineEnd: 0,
            },
          },
        },
        '&-expand-icon': {
          marginInlineEnd: 8,
          display: 'flex',
          fontSize: 12,
          cursor: 'pointer',
          height: '24px',
          marginRight: 4,
          color: token.colorTextSecondary,
          '> .anticon > svg': {
            transition: '0.3s',
          },
        },
        '&-expanded': {
          ' > .anticon > svg': {
            transform: 'rotate(90deg)',
          },
        },
        '&-title': {
          flexShrink: 0,
          marginInlineEnd: 0,
          wordBreak: 'break-word',
          cursor: 'pointer',
          '&-editable': {
            paddingBlock: 8,
          },
          '&:hover': {
            color: token.colorPrimary,
          },
        },
        '&-content': {
          position: 'relative',
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          marginBlock: 0,
        },
        '&-subTitle': {
          display: 'inline-flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4px',
          color: 'rgba(0, 0, 0, 0.45)',
          '&-editable': {
            paddingBlock: 8,
          },
        },
        '&-description': {
          marginBlockStart: '4px',
          wordBreak: 'break-all',
          flexShrink: 0,
        },
        '&-avatar': {
          display: 'flex',
          flexShrink: 0,
          alignItems: 'flex-start',
        },
        '&-header': {
          display: 'flex',
          flex: '1',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          minWidth: 0,
          h4: {
            margin: 0,
            padding: 0,
            display: 'flex',
            flex: '1',
            minWidth: 0,
          },
        },
        '&-header-container': {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          flex: '1',
          minWidth: 0,
        },
        '&-header-option': {
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
        },
        '&-checkbox': { width: '16px', marginInlineEnd: '12px' },
        '&-no-split': {
          [`${token.componentCls}-row`]: { borderBlockEnd: 'none' },
          [`${token.proComponentsCls}-list ${token.proComponentsCls}-list-item`]:
            {
              borderBlockEnd: 'none',
            },
        },
        '&-bordered': {
          [`${token.componentCls}-toolbar`]: {
            borderBlockEnd: `1px solid ${token.colorSplit}`,
          },
        },
        [`${token.proComponentsCls}-list-vertical`]: {
          [`${token.componentCls}-row`]: {
            borderBlockEnd: '12px 18px 12px 24px',
          },
          '&-header-title': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
          '&-content': { marginBlock: 0, marginInline: 0 },
          '&-subTitle': { marginBlockStart: 8 },
          [`${token.proComponentsCls}-list-item-extra`]: {
            display: 'flex',
            alignItems: 'center',
            [`${token.componentCls}-row-description`]: {
              marginBlockStart: 16,
            },
          },
          [`${token.proComponentsCls}-list-bordered ${token.proComponentsCls}-list-item`]:
            {
              paddingInline: 0,
            },
          [`${token.componentCls}-row-show-extra-hover`]: {
            [`${token.proComponentsCls}-list-item-extra `]: {
              display: 'none',
            },
          },
        },

        [`${token.proComponentsCls}-list-pagination`]: {
          marginBlockStart: token.margin,
          marginBlockEnd: token.margin,
        },
        [`${token.proComponentsCls}-list-list`]: {
          '&-item': { cursor: 'pointer', paddingBlock: 12, paddingInline: 12 },
        },
        [`${token.proComponentsCls}-list-vertical ${token.proComponentsCls}-list-row`]:
          {
            '&-header': {
              paddingBlock: 0,
              paddingInline: 0,
              borderBlockEnd: 'none',
            },
            [`${token.proComponentsCls}-list-item`]: {
              width: '100%',
              paddingBlock: 12,
              paddingInlineStart: 24,
              paddingInlineEnd: 18,
              [`${token.proComponentsCls}-list-item-meta-avatar`]: {
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 8,
              },
              [`${token.proComponentsCls}-list-item-meta-title`]: {
                marginBlock: 0,
                marginInline: 0,
              },
            },
          },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProList', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProListStyle(proListToken)];
  });
}
