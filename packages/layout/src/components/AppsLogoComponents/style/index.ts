import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';
import { useContext } from 'react';
import type { BaseLayoutDesignToken } from '../../../context/ProLayoutContext';
import { ProLayoutContext } from '../../../context/ProLayoutContext';
import { genAppsLogoComponentsDefaultListStyle } from './default';
import { genAppsLogoComponentsSimpleListStyle } from './simple';

export interface AppsLogoComponentsToken extends ProAliasToken {
  componentCls: string;
}

const genAppsLogoComponentsStyle: GenerateStyle<AppsLogoComponentsToken & BaseLayoutDesignToken> = (
  token,
) => {
  return {
    [token.componentCls]: {
      '&-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: 4,
        paddingBlock: 0,
        fontSize: 14,
        lineHeight: '14px',
        height: 28,
        width: 28,
        cursor: 'pointer',
        color: token.colorTextAppListIcon,
        '&:hover': {
          color: token.colorTextAppListIconHover,
          backgroundColor: token.colorBgAppListIconHover,
        },
      },
      '&-popover': {
        '*': {
          boxSizing: 'border-box',
          fontFamily: token.fontFamily,
        },
      },
      '&-simple': genAppsLogoComponentsSimpleListStyle(token),
      '&-default': genAppsLogoComponentsDefaultListStyle(token),
    },
  };
};

export function useStyle(prefixCls: string) {
  const proToken = useContext(ProLayoutContext);
  return useAntdStyle('apps-logo-components', (token) => {
    const proCardToken: AppsLogoComponentsToken & BaseLayoutDesignToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      ...proToken,
    };

    return [genAppsLogoComponentsStyle(proCardToken)];
  });
}
