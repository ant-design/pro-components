import type { CSSObject } from '@ant-design/cssinjs';
import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { operationUnit, resetComponent } from 'antd/es/style';
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
      ...resetComponent(token),
      position: 'relative',
      backgroundColor: token.colorBgContainer,
      padding: `${token.pageHeaderPaddingVertical}px ${token.pageHeaderPadding}px`,
      '&-ghost': {
        backgroundColor: token.pageHeaderBgGhost,
      },

      '&-has-breadcrumb': {
        paddingTop: token.pageHeaderPaddingBreadCrumb,
      },
      '&-has-footer': {
        paddingBottom: 0,
      },
      '&-back': {
        marginRight: token.margin,
        fontSize: 16,
        lineHeight: 1,
        '&-button': {
          ...operationUnit(token),
          color: token.pageHeaderColorBack,
          cursor: 'pointer',
        },
        [`${token.componentCls}-rlt &`]: {
          float: 'right',
          marginRight: 0,
          marginLeft: 0,
        },
      },
      [`${'ant'}-divider-vertical`]: {
        height: 14,
        margin: `0 ${token.marginSM}px`,
        verticalAlign: 'middle',
      },

      [`&-breadcrumb + &-heading`]: {
        marginTop: token.marginXS,
      },
      '&-heading': {
        display: 'flex',
        justifyContent: 'space-between',
        '&-left': {
          display: 'flex',
          alignItems: 'center',
          margin: `${token.marginXS / 2}px 0`,
          overflow: 'hidden',
        },
        '&-title': {
          marginRight: token.marginSM,
          marginBottom: 0,
          color: token.colorTextHeading,
          fontWeight: 600,
          fontSize: token.pageHeaderFontSizeHeaderTitle,
          lineHeight: token.controlHeight + 'px',
          ...textOverflowEllipsis(),
          [`${token.componentCls}-rlt &`]: {
            marginRight: 0,
            marginLeft: token.marginSM,
          },
        },
        '&-avatar': {
          marginRight: token.marginSM,
          [`${token.componentCls}-rlt &`]: {
            float: 'right',
            marginRight: 0,
            marginLeft: token.marginSM,
          },
        },
        '&-tags': {
          [`${token.componentCls}-rlt &`]: {
            float: 'right',
          },
        },
        '&-sub-title': {
          marginRight: token.marginSM,
          color: token.colorTextSecondary,
          fontSize: token.pageHeaderFontSizeHeaderSubTitle,
          lineHeight: token.lineHeight,
          ...textOverflowEllipsis(),
          [`${token.componentCls}-rlt &`]: {
            float: 'right',
            marginRight: 0,
            marginLeft: 12,
          },
        },
        '&-extra': {
          margin: `${token.marginXS / 2}px 0`,
          whiteSpace: 'nowrap',
          '> *': {
            'white-space': 'unset',
            [`${token.componentCls}-rlt &`]: {
              marginRight: token.marginSM,
              marginLeft: 0,
            },
          },
          [`${token.componentCls}-rlt &`]: {
            float: 'left',
          },
          '*:first-child': {
            [`${token.componentCls}-rlt &`]: {
              marginRight: 0,
            },
          },
        },
      },
      '&-content': {
        paddingTop: token.pageHeaderPaddingContentPadding,
      },
      '&-footer': {
        marginTop: token.margin,
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
