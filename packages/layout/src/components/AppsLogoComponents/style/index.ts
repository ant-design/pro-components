import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
import { genAppsLogoComponentsDefaultListStyle } from './default';
import { genAppsLogoComponentsSimpleListStyle } from './simple';

export interface AppsLogoComponentsToken extends ProAliasToken {
  componentCls: string;
}

const genAppsLogoComponentsStyle: GenerateStyle<AppsLogoComponentsToken> = (
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
        color: token?.layout?.colorTextAppListIcon,
        borderRadius: token.borderRadius,
        '&:hover': {
          color: token?.layout?.colorTextAppListIconHover,
          backgroundColor: token?.layout?.colorBgAppListIconHover,
        },
        '&-active': {
          color: token?.layout?.colorTextAppListIconHover,
          backgroundColor: token?.layout?.colorBgAppListIconHover,
        },
      },
      '&-item-title': {
        marginInlineStart: '16px',
        marginInlineEnd: '8px',
        marginBlockStart: 0,
        marginBlockEnd: '12px',
        fontWeight: 600,
        color: 'rgba(0, 0, 0, 0.88)',
        fontSize: 16,
        opacity: 0.85,
        lineHeight: 1.5,
        '&:first-child': {
          marginBlockStart: 12,
        },
      },
      '&-popover': {
        [`${token.antCls}-popover-arrow`]: {
          display: 'none',
        },
      },
      '&-simple': genAppsLogoComponentsSimpleListStyle(token),
      '&-default': genAppsLogoComponentsDefaultListStyle(token),
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('AppsLogoComponents', (token) => {
    const proCardToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    } as AppsLogoComponentsToken;

    return [genAppsLogoComponentsStyle(proCardToken)];
  });
}
