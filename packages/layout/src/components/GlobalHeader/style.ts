import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface GlobalHeaderToken extends ProAliasToken {
  componentCls: string;
}

const genGlobalHeaderStyle: GenerateStyle<GlobalHeaderToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      marginBlock: 0,
      marginInline: 16,
      height: token.layout?.header?.heightLayoutHeader || 56,
      boxSizing: 'border-box',
      '> a': {
        height: '100%',
      },
      [`${token.proComponentsCls}-layout-apps-icon`]: {
        marginInlineEnd: 16,
      },
      '&-collapsed-button': {
        minHeight: '22px',
        color: token?.layout?.header?.colorHeaderTitle,
        fontSize: '18px',
        marginInlineEnd: '16px',
      },
      '&-logo': {
        position: 'relative',
        marginInlineEnd: '16px',
        a: {
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          minHeight: '22px',
          fontSize: '20px',
        },
        img: { height: '28px' },
        h1: {
          height: '32px',
          marginBlock: 0,
          marginInline: 0,
          marginInlineStart: 8,
          fontWeight: '600',
          color:
            token.layout?.header?.colorHeaderTitle || token.colorTextHeading,
          fontSize: '18px',
          lineHeight: '32px',
        },
        '&-mix': {
          display: 'flex',
          alignItems: 'center',
        },
      },
      '&-logo-mobile': {
        minWidth: '24px',
        marginInlineEnd: 0,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutGlobalHeader', (token) => {
    const GlobalHeaderToken: GlobalHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genGlobalHeaderStyle(GlobalHeaderToken)];
  });
}
