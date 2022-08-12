import type { CSSObject } from '@ant-design/cssinjs';
import type { ProAliasToken } from '@ant-design/pro-utils';
import { operationUnit, resetComponent, useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';
export interface PageHeaderToken extends ProAliasToken {
  componentCls: string;
  pageHeaderPadding: number;
  pageHeaderPaddingVertical: number;
  pageHeaderBgGhost: string;
  pageHeaderPaddingBreadCrumb: number;
  pageHeaderColorBack: string;
  pageHeaderFontSizeHeaderTitle: number;
  pageHeaderFontSizeHeaderSubTitle: number;
  pageHeaderPaddingContentPadding: number;
}

const textOverflowEllipsis = (): CSSObject => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
const genPageHeaderStyle: GenerateStyle<PageHeaderToken> = (token) => {
  return {
    [token.componentCls]: {
      ...resetComponent?.(token),
      position: 'relative',
      backgroundColor: token.colorBgContainer,
      paddingBlock: token.pageHeaderPaddingVertical,
      paddingInline: token.pageHeaderPadding,
      '&-ghost': {
        backgroundColor: token.pageHeaderBgGhost,
      },

      '&-has-breadcrumb': {
        paddingBlockStart: token.pageHeaderPaddingBreadCrumb,
      },
      '&-has-footer': {
        paddingBlockEnd: 0,
      },
      '&-back': {
        marginInlineEnd: token.margin,
        fontSize: 16,
        lineHeight: 1,
        '&-button': {
          ...operationUnit?.(token),
          color: token.pageHeaderColorBack,
          cursor: 'pointer',
        },
        [`${token.componentCls}-rlt &`]: {
          float: 'right',
          marginInlineEnd: 0,
          marginInlineStart: 0,
        },
      },
      [`${'ant'}-divider-vertical`]: {
        height: 14,
        marginBlock: 0,
        marginInline: token.marginSM,
        verticalAlign: 'middle',
      },

      [`&-breadcrumb + &-heading`]: {
        marginBlockStart: token.marginXS,
      },
      '&-heading': {
        display: 'flex',
        justifyContent: 'space-between',
        '&-left': {
          display: 'flex',
          alignItems: 'center',
          marginBlock: token.marginXS / 2,
          marginInlineEnd: 0,
          marginInlineStart: 0,
          overflow: 'hidden',
        },
        '&-title': {
          marginInlineEnd: token.marginSM,
          marginBlockEnd: 0,
          color: token.colorTextHeading,
          fontWeight: 600,
          fontSize: token.pageHeaderFontSizeHeaderTitle,
          lineHeight: token.controlHeight + 'px',
          ...textOverflowEllipsis(),
          [`${token.componentCls}-rlt &`]: {
            marginInlineEnd: 0,
            marginInlineStart: token.marginSM,
          },
        },
        '&-avatar': {
          marginInlineEnd: token.marginSM,
          [`${token.componentCls}-rlt &`]: {
            float: 'right',
            marginInlineEnd: 0,
            marginInlineStart: token.marginSM,
          },
        },
        '&-tags': {
          [`${token.componentCls}-rlt &`]: {
            float: 'right',
          },
        },
        '&-sub-title': {
          marginInlineEnd: token.marginSM,
          color: token.colorTextSecondary,
          fontSize: token.pageHeaderFontSizeHeaderSubTitle,
          lineHeight: token.lineHeight,
          ...textOverflowEllipsis(),
          [`${token.componentCls}-rlt &`]: {
            float: 'right',
            marginInlineEnd: 0,
            marginInlineStart: 12,
          },
        },
        '&-extra': {
          marginBlock: token.marginXS / 2,
          marginInlineEnd: 0,
          marginInlineStart: 0,
          whiteSpace: 'nowrap',
          '> *': {
            'white-space': 'unset',
            [`${token.componentCls}-rlt &`]: {
              marginInlineEnd: token.marginSM,
              marginInlineStart: 0,
            },
          },
          [`${token.componentCls}-rlt &`]: {
            float: 'left',
          },
          '*:first-child': {
            [`${token.componentCls}-rlt &`]: {
              marginInlineEnd: 0,
            },
          },
        },
      },
      '&-content': {
        paddingBlockStart: token.pageHeaderPaddingContentPadding,
      },
      '&-footer': {
        marginBlockStart: token.margin,
      },
      '&-compact &-heading': {
        flexWrap: 'wrap',
      },

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

export default function useStyle(prefixCls: string) {
  return useAntdStyle('page-header', (token) => {
    const proCardToken: PageHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      pageHeaderBgGhost: 'transparent',
      pageHeaderPadding: 16,
      pageHeaderPaddingVertical: 8,
      pageHeaderPaddingBreadCrumb: token.paddingSM,
      pageHeaderColorBack: token.colorIcon,
      pageHeaderFontSizeHeaderTitle: token.fontSizeHeading4,
      pageHeaderFontSizeHeaderSubTitle: 14,
      pageHeaderPaddingContentPadding: token.paddingSM,
    };

    return [genPageHeaderStyle(proCardToken)];
  });
}
