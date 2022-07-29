import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface LoginFormToken extends ProAliasToken {
  componentCls: string;
}

const genLoginFormStyle: GenerateStyle<LoginFormToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundSize: 'contain',
      '&-notice': {
        display: 'flex',
        flex: '1',
        alignItems: 'flex-end',
        '&-activity': {
          margin: '24px',
          padding: '24px',
          '&-title': { fontWeight: '500', fontSize: '28px' },
          '&-subTitle': { marginTop: '8px', fontSize: '16px' },
          '&-action': { marginTop: '24px' },
        },
      },
      '&-container': {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        maxWidth: '550px',
        height: '100%',
        padding: '32px 0',
        overflow: 'auto',
        background: token.colorBgContainer,
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
        width: '328px',
        margin: '0 auto',
        '&-other': { marginTop: '24px', lineHeight: '22px', textAlign: 'left' },
      },
    },
    [`@media (max-width: ${token.screenMDMin}`]: {
      [token.componentCls]: {
        flexDirection: 'column-reverse',
        background: 'none !important',
        '&-notice': {
          display: 'flex',
          flex: 'none',
          alignItems: 'flex-start',
          width: '100%',
          '> div': {
            width: '100%',
          },
        },
      },
    },
    [`@media (min-width: ${token.screenMDMin}`]: {
      [token.componentCls]: {
        '&-container': {
          padding: '128px 0 24px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 110px',
          backgroundSize: '100%',
        },
      },
    },
    [`@media (max-width: ${token.screenSM}`]: {
      [token.componentCls]: {
        '&-main': { width: '95%', maxWidth: '328px' },
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
