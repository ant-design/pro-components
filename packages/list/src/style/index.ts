import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      backgroundColor: 'transparent',
      [`${token.proComponentsCls}-table-alert`]: { marginBottom: '16px' },
      '&-row': {
        borderBottom: `1px solid ${token.colorSplit}`,
        '&:last-child': {
          borderBottom: 'none',
          [`${token.antCls}-list-item`]: {
            borderBottom: 'none',
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
          margin: '8px 0',
          padding: '0 8px',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          [`${token.antCls}-list-item-meta-title`]: {
            flexShrink: '9',
            margin: '0',
            lineHeight: '22px',
          },
        },
        [`&${token.componentCls}-row-editable`]: {
          [`${token.componentCls}-list-item`]: {
            '&-meta': {
              '&-avatar,&-description,&-title': {
                padding: '6px 0',
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
          animation: 'techUiListActive 3s',
        },
        [`&${token.componentCls}-row-type-inline`]: {
          [`${token.componentCls}-row-title`]: {
            fontWeight: 'normal',
          },
        },
        [`&${token.componentCls}-row-type-top`]: {
          backgroundImage: "url('https://gw.alipayobjects.com/zos/antfincdn/DehQfMbOJb/icon.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top',
          backgroundSize: '12px 12px',
        },
        '&-show-action-hover': {
          [`${token.antCls}-list-item-action,
            ${token.proComponentsCls}-card-extra,
            ${token.proComponentsCls}-card-actions`]: {
            display: 'none',
          },
          '&:hover': {
            [`${token.proComponentsCls}-card-extra,${token.proComponentsCls}-card-actions`]: {
              display: 'flex',
            },
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
          padding: '0 24px',
          color: token.colorTextSecondary,
          lineHeight: '44px',
          background: 'rgba(0, 0, 0, 0.02)',
          '&-actions': {
            display: 'none',
          },
          '&-actions > *': {
            marginInlineEnd: '8px',
            '&:last-child': {
              marginInlineEnd: 0,
            },
          },
        },
        '&-expand-icon': {
          marginRight: '8px',
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
          marginRight: '16px',
          wordBreak: 'break-all',
          cursor: 'pointer',
          '&:hover': {
            color: token.colorPrimary,
          },
        },
        '&-content': {
          position: 'relative',
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          margin: '0 32px',
        },
        '&-subTitle': { color: 'rgba(0, 0, 0, 0.45)' },
        '&-description': { marginTop: '4px', wordBreak: 'break-all' },
        '&-avatar': { display: 'flex' },
        '&-header': { display: 'flex', flex: '1', justifyContent: 'flex-start' },
        '&-header-title': { display: 'flex', alignItems: 'center', justifyContent: 'flex-start' },
        '&-header-option': { display: 'flex' },
        '&-checkbox': { width: '16px', marginRight: '12px' },
        '&-no-split': {
          [`${token.componentCls}-row`]: { borderBottom: 'none' },
          [`${token.antCls}-list ${token.antCls}-list-item`]: { borderBottom: 'none' },
        },
        '&-bordered': {
          [`${token.componentCls}-toolbar`]: {
            borderBottom: `1px solid ${token.colorSplit}`,
          },
        },
        [`${token.antCls}-list-vertical`]: {
          [`${token.componentCls}-row`]: {
            borderBottom: '12px 18px 12px 24px',
          },
          '&-header-title': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
          '&-content': { margin: '0' },
          '&-subTitle': { marginTop: '8px' },
          [`${token.antCls}-list-item-extra`]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '32px',
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
          marginBlockEnd: token.marginLG,
        },
        [`${token.antCls}-list-list`]: {
          '&-item': { padding: '12px', cursor: 'pointer' },
        },
        [`${token.antCls}-list-vertical .${token.proComponentsCls}-list-row ${token.antCls}-list`]:
          {
            '&-header': { padding: '0', borderBottom: 'none' },
            [`${token.antCls}-list-item`]: {
              width: '100%',
              padding: '12px 18px 12px 24px',
              '&-meta-avatar': { display: 'flex', alignItems: 'center', marginRight: '8px' },
              '&-action-split': {
                display: 'none',
              },
              '&-meta-title': { marginBlock: 0, marginInline: 0 },
            },
          },
        '@keyframes techUiListActive': {
          '0%': { backgroundColor: 'unset' },
          '30%': { background: '#fefbe6' },
          '100%': { backgroundColor: 'unset' },
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
