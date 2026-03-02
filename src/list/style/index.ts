import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../provider';
import { setAlpha, useStyle as useAntdStyle } from '../../provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genTechUiListActiveKeyframes = (token: ProListToken) =>
  new Keyframes('techUiListActive', {
    '0%': { backgroundColor: 'unset' },
    '30%': {
      background: token.colorWarningBg ?? setAlpha(token.colorWarning, 0.15),
    },
    '100%': { backgroundColor: 'unset' },
  }) as any;

const genProListResponsiveStyle: GenerateStyle<ProListToken> = (token) => {
  const { screenMD, screenSM, contentWidth } = token as ProListToken & {
    screenMD?: number;
    screenSM?: number;
    contentWidth?: number;
  };
  return {
    [`@media screen and (max-width: ${screenMD}px)`]: {
      [token.componentCls]: {
        [`${token.proComponentsCls}-list-item`]: {
          [`${token.proComponentsCls}-list-item-action`]: {
            marginInlineStart: token.marginLG,
          },
        },
        [`&${token.proComponentsCls}-list-vertical`]: {
          [`${token.proComponentsCls}-list-item`]: {
            [`${token.proComponentsCls}-list-item-extra`]: {
              marginInlineStart: token.marginLG,
            },
          },
        },
      },
    },
    [`@media screen and (max-width: ${screenSM}px)`]: {
      [token.componentCls]: {
        [`${token.proComponentsCls}-list-item`]: {
          flexWrap: 'wrap',
          [`${token.proComponentsCls}-list-item-action`]: {
            marginInlineStart: token.marginSM,
          },
        },
        [`&${token.proComponentsCls}-list-vertical`]: {
          [`${token.proComponentsCls}-list-item`]: {
            flexWrap: 'wrap-reverse',
            [`${token.proComponentsCls}-list-item-main`]: {
              minWidth: contentWidth,
            },
            [`${token.proComponentsCls}-list-item-extra`]: {
              marginBlockStart: 'auto',
              marginBlockEnd: token.margin,
              marginInline: 'auto',
            },
          },
        },
      },
    },
  };
};

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  const techUiListActive = genTechUiListActiveKeyframes(token);
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      backgroundColor: 'transparent',

      // 确保链接使用默认链接颜色，不被父元素的文本颜色覆盖
      a: {
        color: token.colorLink,
        '&:hover': {
          color: token.colorLinkHover,
        },
        '&:active': {
          color: token.colorLinkActive,
        },
      },
      [`${token.proComponentsCls}-table-alert`]: {
        marginBlockEnd: token.margin,
      },
      [`${token.proComponentsCls}-list-pagination`]: {
        marginBlockStart: token.margin,
        marginBlockEnd: 0,
        marginInline: 0,
      },
      [`${token.proComponentsCls}-list-item`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        cursor: 'pointer',
        flex: 1,
        minWidth: 0,
        padding: token.paddingXS,
        borderRadius: token.borderRadius,
        listStyle: 'none',
        '& > *:first-child': {
          flex: 1,
          minWidth: 0,
        },
        [`${token.proComponentsCls}-list-item-action`]: {
          flex: '0 0 auto',
          alignSelf: 'center',
          marginInlineStart: token.marginXXL,
        },
        [`${token.proComponentsCls}-list-item-extra`]: {
          alignSelf: 'center',
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
        color: token.colorText,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
      },
      [`${token.proComponentsCls}-list-item-meta-description`]: {
        color: token.colorTextDescription,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
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
        },
      },

      '&-no-split': {
        [`${token.componentCls}-row`]: { borderBlockEnd: 'none' },
        [`${token.proComponentsCls}-list ${token.proComponentsCls}-list-item`]:
          {
            borderBlockEnd: 'none',
          },
      },
      '&-grid': {
        [`${token.componentCls}-row`]: {
          borderBlockEnd: 'none',
        },
        [`${token.componentCls}-grid-container`]: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        [`${token.componentCls}-grid-col`]: {
          display: 'flex',
          '> *': {
            flex: 1,
            minWidth: 0,
          },
        },
        [`${token.proComponentsCls}-list-item`]: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          borderBlockEnd: 'none',
        },
      },
      // 垂直布局：样式必须在 list 根级别，因 vertical 类在 list 根节点上
      [`&${token.proComponentsCls}-list-vertical`]: {
        [`${token.proComponentsCls}-list-item`]: {
          alignItems: 'initial',
        },
        [`${token.proComponentsCls}-list-item-main`]: {
          display: 'block',
          flex: 1,
          [`${token.proComponentsCls}-list-item-meta`]: {
            marginBlockEnd: token.padding,
            [`${token.proComponentsCls}-list-item-meta-title`]: {
              marginBlockStart: 0,
              marginBlockEnd: token.paddingSM,
              color: token.colorText,
              fontSize: token.fontSizeLG,
              lineHeight: token.lineHeightLG,
            },
          },
          [`${token.proComponentsCls}-list-item-action`]: {
            marginBlockStart: token.padding,
            marginInlineStart: 'auto',
            '> *': {
              paddingBlock: 0,
              paddingInline: token.padding,
              '&:first-child': {
                paddingInlineStart: 0,
              },
            },
          },
        },
        [`${token.componentCls}-row`]: {
          marginBlockEnd: token.marginSM,
          '&-header-title': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
          '&-content': { marginBlock: 0, marginInline: 0 },
          '&-sub-title': { marginBlockStart: token.marginXS },
        },
        [`${token.proComponentsCls}-list-item-extra`]: {
          display: 'flex',
          alignItems: 'center',
          marginInlineStart: token.marginXL,
          [`${token.componentCls}-row-description`]: {
            marginBlockStart: token.margin,
          },
        },
        [`${token.proComponentsCls}-list-bordered ${token.proComponentsCls}-list-item`]:
          {
            paddingInline: 0,
          },
        [`${token.componentCls}-row-show-extra-hover`]: {
          [`${token.proComponentsCls}-list-item-extra`]: {
            display: 'none',
          },
        },
        [`${token.proComponentsCls}-list-list`]: {
          '&-item': {
            cursor: 'pointer',
            paddingBlock: token.paddingSM,
            paddingInline: token.paddingSM,
          },
        },
        [`${token.proComponentsCls}-list-row`]: {
          '&-header': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingBlock: 0,
            paddingInline: 0,
            borderBlockEnd: 'none',
          },
          '&-content': {
            marginBlockStart: token.marginSM,
            marginInlineStart: 0,
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
              marginBlockStart: 0,
              marginBlockEnd: token.paddingSM,
              marginInline: 0,
              fontSize: token.fontSizeLG,
              lineHeight: token.lineHeightLG,
            },
          },
        },
      },
      [`${token.proComponentsCls}-list-item-main`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
        width: '100%',
        '& > *:first-child': {
          flex: 1,
          minWidth: 0,
        },
        [`${token.proComponentsCls}-list-item-action`]: {
          alignSelf: 'center',
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
            lineHeight: token.lineHeightLG,
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
          height: token.controlHeightLG,
          paddingInline: token.paddingLG,
          paddingBlock: 0,
          color: token.colorTextSecondary,
          lineHeight: token.controlHeightLG,
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
          height: token.controlHeightSM,
          color: token.colorTextSecondary,
          '> .anticon > svg': {
            transition: '0.3s',
          },
        },
        '&-expanded': {
          '> .anticon > svg': {
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
          marginInlineStart: token.marginXL,
        },
        '&-sub-title': {
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
        '&-checkbox': {
          width: token.fontSizeLG,
          marginInlineEnd: token.marginSM,
        },
        [`${token.proComponentsCls}-list-list`]: {
          '&-item': {
            cursor: 'pointer',
            paddingBlock: token.paddingSM,
            paddingInline: token.paddingSM,
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

    return [
      genProListStyle(proListToken),
      genProListResponsiveStyle(proListToken),
    ];
  });
}
