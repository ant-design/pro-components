import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

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
        padding: '32px 0',
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
        top: '2px',
        color: '@heading-color',
        fontWeight: '600',
        fontSize: '33px',
      },
      '&-logo': {
        width: '44px',
        height: '44px',
        marginRight: '16px',
        verticalAlign: 'top',
        img: {
          width: '100%',
        },
      },
      '&-desc': {
        marginTop: '12px',
        marginBottom: '40px',
        color: token.colorTextSecondary,
        fontSize: token.fontSize,
      },
      '&-main': {
        minWidth: '328px',
        maxWidth: '500px',
        margin: '0 auto',
        '&-other': { marginTop: '24px', lineHeight: '22px', textAlign: 'left' },
      },
    },
    '@media (min-width: @screen-md-min)': {
      [`${token.componentCls}-container`]: {
        padding: '32px 0 24px',
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
