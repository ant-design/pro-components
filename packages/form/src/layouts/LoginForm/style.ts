import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface LoginFormToken extends ProAliasToken {
  componentCls: string;
}

const genLoginFormStyle: GenerateStyle<LoginFormToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-container': {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        height: '100%',
        paddingInline: 32,
        paddingBlock: 24,
        overflow: 'auto',
        background: 'inherit',
      },
      '&-top': {
        textAlign: 'center',
      },
      '&-header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '44px',
        lineHeight: '44px',
        a: {
          textDecoration: 'none',
        },
      },
      '&-title': {
        position: 'relative',
        insetBlockStart: '2px',
        color: '@heading-color',
        fontWeight: '600',
        fontSize: '33px',
      },
      '&-logo': {
        width: '44px',
        height: '44px',
        marginInlineEnd: '16px',
        verticalAlign: 'top',
        img: {
          width: '100%',
        },
      },
      '&-desc': {
        marginBlockStart: '12px',
        marginBlockEnd: '40px',
        color: token.colorTextSecondary,
        fontSize: token.fontSize,
      },
      '&-main': {
        minWidth: '328px',
        maxWidth: '580px',
        margin: '0 auto',
        '&-other': {
          marginBlockStart: '24px',
          lineHeight: '22px',
          textAlign: 'start',
        },
      },
    },
    '@media (min-width: @screen-md-min)': {
      [`${token.componentCls}-container`]: {
        paddingInline: 0,
        paddingBlockStart: 32,
        paddingBlockEnd: 24,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 110px',
        backgroundSize: '100%',
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LoginForm', (token) => {
    const loginFormToken: LoginFormToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genLoginFormStyle(loginFormToken)];
  });
}
