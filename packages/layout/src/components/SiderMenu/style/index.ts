import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { resetComponent } from 'antd/es/style';
import type { GenerateStyle } from 'antd/es/theme';

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
  proLayoutCls: string;
  proLayoutCollapsedWidth: number;
  proLayoutHeaderHeight: number;
  proLayoutMenuTextColor: string;
  proLayoutMenuTextSecondaryColor: string;
  proLayoutMenuItemDividerColor: string;
  proLayoutMenuTitleTextColor: string;
}

const genSiderMenuStyle: GenerateStyle<SiderMenuToken> = (token) => {
  return {
    [token.proLayoutCls]: {
      [token.componentCls]: {
        position: 'relative',
        background: 'transparent',
        boxSizing: 'border-box',
        ...resetComponent?.(token),
        '&-menu': {
          position: 'relative',
          zIndex: 10,
          minHeight: '100%',
        },
        '&-fixed': {
          position: 'fixed',
          insetBlockStart: 0,
          insetInlineStart: 0,
          zIndex: '100',
          height: '100%',
        },
        [`${token.antCls}-layout-sider-children`]: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingInline: 6,
          paddingBlock: 6,
          borderInlineEnd: `1px solid ${token.colorSplit}`,
        },

        '&-logo': {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 16,
          paddingBlock: 16,
          color: token.proLayoutMenuTextColor,
          cursor: 'pointer',
          borderBottom: `1px solid ${token.proLayoutMenuItemDividerColor}`,
          '> a': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 22,
            fontSize: 22,
          },
          img: {
            display: 'inline-block',
            height: 22,
            verticalAlign: 'middle',
          },
          h1: {
            display: 'inline-block',
            height: 22,
            marginBlock: 0,
            marginInlineEnd: 0,
            marginInlineStart: 6,
            color: token.proLayoutMenuTitleTextColor,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '22px',
            verticalAlign: 'middle',
          },
          '&-collapsed': {
            flexDirection: 'column',
            [`${token.proComponentsCls}-layout-apps-icon`]: {
              marginBlockEnd: 8,
            },
          },
        },
        '&-actions': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBlock: 4,
          marginInline: 16,
          color: token.proLayoutMenuTextColor,
          '&-collapsed': {
            flexDirection: 'column-reverse',
            paddingBlock: 0,
            paddingInline: 8,
            fontSize: 16,
            transition: 'font-size 0.3s ease-in-out',
          },
          '&-list': {
            color: token.proLayoutMenuTextSecondaryColor,
            '&-collapsed': {
              marginBlockEnd: 8,
              animation: 'none',
            },
            '&-item': {
              paddingInline: 6,
              paddingBlock: 6,
              lineHeight: '16px',
              fontSize: 16,
              cursor: 'pointer',
              borderRadius: token.radiusBase,
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.018)',
              },
            },
          },
          '&-avatar': {
            fontSize: 14,
            paddingInline: 8,
            paddingBlock: 8,
            borderRadius: token.radiusBase,
            '& *': {
              cursor: 'pointer',
            },
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.018)',
            },
          },
        },
        '&-hide-menu-collapsed': {
          insetInlineStart: `-${token.proLayoutCollapsedWidth - 12}px`,
          position: 'absolute',
        },
        '&-mix': {
          height: `calc(100% - ${token.proLayoutHeaderHeight}px)`,
          insetBlockStart: `${token.proLayoutHeaderHeight}px`,
        },
        '&-extra': {
          marginBlockEnd: 16,
          marginBlock: 0,
          marginInline: 16,
          '&-no-logo': {
            marginBlockStart: 16,
          },
        },
        '&-links': {
          width: '100%',
          ul: {
            height: 'auto',
          },
        },
        '&-link-menu': {
          border: 'none',
          boxShadow: 'none',
          background: 'transparent',
        },
        '&-footer': {
          color: token.colorTextDisabled,
          paddingBlockEnd: 16,
          fontSize: token.fontSize,
        },
      },
    },
  };
};

export function useStyle(
  prefixCls: string,
  {
    proLayoutCls,
    proLayoutHeaderHeight,
    proLayoutCollapsedWidth,
  }: {
    proLayoutCls: string;
    proLayoutHeaderHeight: number;
    proLayoutCollapsedWidth: number;
  },
) {
  return useAntdStyle('sider-menu', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutCls: `.${proLayoutCls}`,
      proLayoutHeaderHeight,
      proLayoutCollapsedWidth,
      proLayoutMenuTextSecondaryColor: token.colorTextSecondary,
      proLayoutMenuTitleTextColor: token.colorTextHeading,
      proLayoutMenuTextColor: token.colorText,
      proLayoutMenuItemDividerColor: token.colorSplit,
    };

    return [genSiderMenuStyle(siderMenuToken)];
  });
}
