import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';
import { genAppsLogoComponentsDefaultListStyle } from './default';
import { genAppsLogoComponentsSimpleListStyle } from './simple';

export interface AppsLogoComponentsToken extends ProAliasToken {
  componentCls: string;
  appListIconTextColor: string;
  appListIconHoverTextColor: string;
  appListIconHoverBgColor: string;
}

const genAppsLogoComponentsStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 4px',
        fontSize: 14,
        lineHeight: '14px',
        height: 28,
        width: 28,
        cursor: 'pointer',
        color: token.appListIconTextColor,
        '&:hover': {
          color: token.appListIconHoverTextColor,
          backgroundColor: token.appListIconHoverBgColor,
        },
      },
      '&-popover': {},
      '&-simple': genAppsLogoComponentsSimpleListStyle(token),
      '&-default': genAppsLogoComponentsDefaultListStyle(token),
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('apps-logo-components', (token) => {
    const proCardToken: AppsLogoComponentsToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      appListIconTextColor: token.colorTextSecondary,
      appListIconHoverTextColor: token.colorLinkHover,
      appListIconHoverBgColor: 'rgba(0, 0, 0, 0.04)',
    };

    return [genAppsLogoComponentsStyle(proCardToken)];
  });
}
