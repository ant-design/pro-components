import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface TopNavHeaderToken extends ProAliasToken {
  componentCls: string;
}

const genTopNavHeaderStyle: GenerateStyle<TopNavHeaderToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      '.anticon': {
        color: 'inherit',
      },
      '&-main': {
        display: 'flex',
        height: '100%',
        paddingInlineStart: '16px',
        '&-left': {
          display: 'flex',
          alignItems: 'center',
          [`${token.proComponentsCls}-layout-apps-icon`]: {
            marginInlineEnd: 16,
            marginInlineStart: -8,
          },
        },
      },
      '&-wide': {
        maxWidth: 1152,
        margin: '0 auto',
      },
      '&-logo': {
        position: 'relative',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        overflow: 'hidden',
        '> *:first-child': {
          display: 'flex',
          alignItems: 'center',
          minHeight: '22px',
          fontSize: '22px',
        },
        '> *:first-child > img': {
          display: 'inline-block',
          height: '32px',
          verticalAlign: 'middle',
        },
        '> *:first-child > h1': {
          display: 'inline-block',
          marginBlock: 0,
          marginInline: 0,
          lineHeight: '24px',
          marginInlineStart: 6,
          fontWeight: '600',
          fontSize: '16px',
          color: token?.layout?.header?.colorHeaderTitle,
          verticalAlign: 'top',
        },
      },
      '&-menu': {
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        paddingInline: 6,
        paddingBlock: 6,
        lineHeight: `${Math.max(
          (token?.layout?.header?.heightLayoutHeader || 56) - 12,
          40,
        )}px`,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutTopNavHeader', (token) => {
    const topNavHeaderToken: TopNavHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genTopNavHeaderStyle(topNavHeaderToken)];
  });
}
