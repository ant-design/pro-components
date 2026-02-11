import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../provider';
import { setAlpha, useStyle as useAntdStyle } from '../../provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genTechUiListActiveKeyframes = (token: ProListToken) =>
  new Keyframes('techUiListActive', {
    '0%': { backgroundColor: 'unset' },
    '30%': { background: token.colorWarningBg ?? setAlpha(token.colorWarning, 0.15) },
    '100%': { backgroundColor: 'unset' },
  }) as any;

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  const techUiListActive = genTechUiListActiveKeyframes(token);
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      backgroundColor: 'transparent',

      [`${token.proComponentsCls}-table-alert`]: { marginBlockEnd: token.margin },
      [`${token.proComponentsCls}-list-item`]: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        flex: 1,
        minWidth: 0,
        padding: token.paddingXS,
        alignItems: 'flex-start',
        borderRadius: token.borderRadius,
        listStyle: 'none',
        '& > *:first-child': {
          flex: 1,
          minWidth: 0,
        },
      },
      '&-filled': {
        backgroundColor: token.colorFillQuaternary,
        borderRadius: token.borderRadius,
        [`${token.componentCls}-toolbar`]: {
          borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },
      },
      '&-outlined': {
        border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        borderRadius: token.borderRadius,
      },
      '&-borderless': {
        [`${token.componentCls}-toolbar`]: {
          borderBlockEnd: 'none',
        },
      },
      [`${token.proComponentsCls}-list-item-meta`]: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: 0,
        gap: token.marginXS,
      },
      [`${token.proComponentsCls}-list-item-meta-title`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: token.marginXS,
        borderBlockEnd: 'none',
        margin: 0,
        minWidth: 0,
      },
      '&-split': {
        [`${token.componentCls}-row`]: {
          borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
          '&:last-child': {
            borderBlockEnd: 'none',
          },
        },
        [`${token.proComponentsCls}-list-item`]: {
          borderRadius: 0,
          borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
          '&:last-child': {
            borderBlockEnd: 'none',
          },
        },
      },

      '&-no-split': {
        [`${token.componentCls}-row`]: { borderBlockEnd: 'none' },
        [`${token.proComponentsCls}-list ${token.proComponentsCls}-list-item`]:
          {
            borderBlockEnd: 'none',
          },
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
          gap: token.marginXXS,
        },
        [`${token.proComponentsCls}-list-item-meta-title`]: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: token.marginXS,
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
          backgroundColor: setAlpha(token.colorTextBase, 0.02),
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
        [`&-card`]: {
          marginBlock: 0,
          marginInline: 0,
          paddingBlock: 0,
          paddingInline: 0,
        },
        '&-card-container': {
          marginBlock: 0,
          marginInline: 0,
          paddingBlock: 0,
          paddingInline: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },

          [`${token.proComponentsCls}-list-item-meta-title`]: {
            flexShrink: 9,
            marginBlock: 0,
            marginInline: 0,
            lineHeight: 22,
          },
        },
        [`&${token.componentCls}-row-editable`]: {
          [`${token.proComponentsCls}-list-item`]: {
            '&-meta': {
              '&-avatar,&-description,&-title': {
                paddingBlock: token.paddingSM,
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
          backgroundPosition: '0 0',
          backgroundSize: `${token.fontSizeSM}px ${token.fontSizeSM}px`,
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
          height: 44,
          paddingInline: token.paddingLG,
          paddingBlock: 0,
          color: token.colorTextSecondary,
          lineHeight: 44,
          background: setAlpha(token.colorTextBase, 0.02),
          '&-actions': {
            display: 'none',
          },
          '&-actions *': {
            marginInlineEnd: token.marginXS,
            '&:last-child': {
              marginInlineEnd: 0,
            },
          },
        },
        '&-expand-icon': {
          marginInlineEnd: token.marginXS,
          display: 'flex',
          fontSize: token.fontSizeSM,
          cursor: 'pointer',
          height: 24,
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
            paddingBlock: token.paddingSM,
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
          gap: token.marginXXS,
          color: token.colorTextSecondary,
          '&-editable': {
            paddingBlock: token.paddingSM,
          },
        },
        '&-description': {
          marginBlockStart: token.marginXXS,
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
          [`${token.proComponentsCls}-list-item-action`]: {
            alignSelf: 'center',
          },
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
          gap: token.marginXS,
          flex: '1',
          minWidth: 0,
        },
        '&-header-option': {
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
        },
        '&-checkbox': { width: 16, marginInlineEnd: token.marginSM },

        [`${token.proComponentsCls}-list-vertical`]: {
          [`${token.componentCls}-row`]: {
            marginBlockEnd: token.marginSM,
          },
          '&-header-title': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
          '&-content': { marginBlock: 0, marginInline: 0 },
          '&-subTitle': { marginBlockStart: token.marginXS },
          [`${token.proComponentsCls}-list-item-extra`]: {
            display: 'flex',
            alignItems: 'center',
            [`${token.componentCls}-row-description`]: {
              marginBlockStart: token.margin,
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
          '&-item': {
            cursor: 'pointer',
            paddingBlock: token.paddingSM,
            paddingInline: token.paddingSM,
          },
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
              paddingBlock: token.paddingSM,
              paddingInlineStart: token.paddingLG,
              paddingInlineEnd: token.paddingMD,
              [`${token.proComponentsCls}-list-item-meta-avatar`]: {
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: token.marginXS,
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
