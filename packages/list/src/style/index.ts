import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

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
      '&-row': {
        borderBlockEnd: `1px solid ${token.colorSplit}`,
        [`${token.antCls}-list-item-meta-title`]: {
          borderBlockEnd: 'none',
          margin: 0,
        },
        '&:last-child': {
          borderBlockEnd: 'none',
          [`${token.antCls}-list-item`]: {
            borderBlockEnd: 'none',
          },
        },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          transition: 'background-color 0.3s',
          [`${token.antCls}-list-item-action`]: {
            display: 'block',
          },
          [`${token.antCls}-list-item-extra`]: {
            display: 'flex',
          },
          [`${token.componentCls}-row-extra`]: {
            display: 'block',
          },
          [`${token.componentCls}-row-subheader-actions`]: {
            display: 'block',
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
          [`${token.antCls}-list-item-meta-title`]: {
            flexShrink: 9,
            marginBlock: 0,
            marginInline: 0,
            lineHeight: '22px',
          },
        },
        [`&${token.componentCls}-row-editable`]: {
          [`${token.componentCls}-list-item`]: {
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
              display: 'block',
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
          [`${token.antCls}-list-item-action,
            ${token.proComponentsCls}-card-extra,
            ${token.proComponentsCls}-card-actions`]: {
            display: 'flex',
          },
        },
        '&-show-extra-hover': {
          [`${token.antCls}-list-item-extra`]: {
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
          marginInlineEnd: '16px',
          wordBreak: 'break-all',
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
          marginInline: 32,
        },
        '&-subTitle': {
          color: 'rgba(0, 0, 0, 0.45)',
          '&-editable': {
            paddingBlock: 8,
          },
        },
        '&-description': { marginBlockStart: '4px', wordBreak: 'break-all' },
        '&-avatar': { display: 'flex' },
        '&-header': {
          display: 'flex',
          flex: '1',
          justifyContent: 'flex-start',
          h4: {
            margin: 0,
            padding: 0,
          },
        },
        '&-header-container': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        '&-header-option': { display: 'flex' },
        '&-checkbox': { width: '16px', marginInlineEnd: '12px' },
        '&-no-split': {
          [`${token.componentCls}-row`]: { borderBlockEnd: 'none' },
          [`${token.antCls}-list ${token.antCls}-list-item`]: {
            borderBlockEnd: 'none',
          },
        },
        '&-bordered': {
          [`${token.componentCls}-toolbar`]: {
            borderBlockEnd: `1px solid ${token.colorSplit}`,
          },
        },
        [`${token.antCls}-list-vertical`]: {
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
          [`${token.antCls}-list-item-extra`]: {
            display: 'flex',
            alignItems: 'center',
            marginInlineStart: '32px',
            [`${token.componentCls}-row-description`]: {
              marginBlockStart: 16,
            },
          },
          [`${token.antCls}-list-bordered ${token.antCls}-list-item`]: {
            paddingInline: 0,
          },
          [`${token.componentCls}-row-show-extra-hover`]: {
            [`${token.antCls}-list-item-extra `]: {
              display: 'none',
            },
          },
        },

        [`${token.antCls}-list-pagination`]: {
          marginBlockStart: token.margin,
          marginBlockEnd: token.margin,
        },
        [`${token.antCls}-list-list`]: {
          '&-item': { cursor: 'pointer', paddingBlock: 12, paddingInline: 12 },
        },
        [`${token.antCls}-list-vertical ${token.proComponentsCls}-list-row`]: {
          '&-header': {
            paddingBlock: 0,
            paddingInline: 0,
            borderBlockEnd: 'none',
          },
          [`${token.antCls}-list-item`]: {
            width: '100%',
            paddingBlock: 12,
            paddingInlineStart: 24,
            paddingInlineEnd: 18,
            [`${token.antCls}-list-item-meta-avatar`]: {
              display: 'flex',
              alignItems: 'center',
              marginInlineEnd: 8,
            },
            [`${token.antCls}-list-item-action-split`]: {
              display: 'none',
            },
            [`${token.antCls}-list-item-meta-title`]: {
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
