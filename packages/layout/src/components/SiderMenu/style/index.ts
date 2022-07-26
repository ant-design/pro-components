import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
  proLayoutCollapsedWidth: number;
  proLayoutHeaderHeight: number;
  proLayoutMenuTextColor: string;
  proLayoutMenuTextSecondaryColor: string;
  proLayoutMenuItemDividerColor: string;
  proLayoutMenuTitleTextColor: string;
}

const genSiderMenuStyle: GenerateStyle<SiderMenuToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      background: 'transparent',
      boxSizing: 'border-box',
      '*': { boxSizing: 'border-box' },
      '&-menu': {
        position: 'relative',
        zIndex: 10,
        minHeight: '100%',
      },
      '&-fixed': {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: '100',
        height: '100%',
      },
      '&-logo': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
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
          margin: '0 0 0 6px',
          color: token.proLayoutMenuTitleTextColor,
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '22px',
          verticalAlign: 'middle',
        },
        '&-collapsed': {
          flexDirection: 'column',
          'ant-pro-layout-apps-icon': {
            marginBottom: 8,
          },
        },
      },
      '&-actions': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '4px 0',
        padding: '0 16px',
        color: token.proLayoutMenuTextColor,
        '&-collapsed': {
          flexDirection: 'column-reverse',
          padding: '0 8px',
          fontSize: 16,
          transition: 'font-size 0.3s ease-in-out',
        },
        '&-list': {
          color: token.proLayoutMenuTextSecondaryColor,
          '&-collapsed': {
            marginBottom: 8,
            animation: 'none',
          },
          '&-item': {
            padding: 6,
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
          padding: 8,
          borderRadius: token.radiusBase,
          '& > *': {
            cursor: 'pointer',
          },
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.018)',
          },
        },
      },
      '&-hide-menu-collapsed': {
        left: `-${token.proLayoutCollapsedWidth - 12}px`,
        position: 'absolute',
      },
      '&-mix': {
        height: `calc(100% - ${token.proLayoutHeaderHeight}px)`,
        top: `${token.proLayoutHeaderHeight}px`,
      },
      '&-extra': {
        marginBottom: 16,
        padding: '0 16px',
        '&-no-logo': {
          marginTop: 16,
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
        paddingBottom: 16,
        fontSize: token.fontSize,
      },
    },
  };
};

export function useStyle(
  prefixCls: string,
  {
    proLayoutHeaderHeight,
    proLayoutCollapsedWidth,
  }: {
    proLayoutHeaderHeight: number;
    proLayoutCollapsedWidth: number;
  },
) {
  return useAntdStyle('sider-menu', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
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
