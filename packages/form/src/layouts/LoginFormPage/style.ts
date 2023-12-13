import {
  GenerateStyle,
  ProAliasToken,
  setAlpha,
  useStyle as useAntdStyle,
} from '@ant-design/pro-provider';

export interface LoginFormToken extends ProAliasToken {
  componentCls: string;
}

const genLoginFormStyle: GenerateStyle<LoginFormToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      '&-notice': {
        display: 'flex',
        flex: '1',
        zIndex: 99,
        alignItems: 'flex-end',
        '&-activity': {
          marginBlock: 24,
          marginInline: 24,
          paddingInline: 24,
          paddingBlock: 24,
          '&-title': { fontWeight: '500', fontSize: '28px' },
          '&-subTitle': { marginBlockStart: 8, fontSize: '16px' },
          '&-action': { marginBlockStart: '24px' },
        },
      },
      '&-left': {
        display: 'flex',
        flex: '1',
        zIndex: 99,
        flexDirection: 'column',
        maxWidth: '550px',
        paddingInline: 0,
        paddingBlock: 32,
        overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        height: 'max-content',
        margin: 'auto',
      },
      '&-container': {
        borderRadius: token.borderRadius,
        backgroundSize: '100%',
        backgroundPosition: 'top',
        backdropFilter: 'blur(10px)',
        backgroundColor: setAlpha(token.colorBgContainer, 0.8),
        backgroundImage:
          'radial-gradient(circle at 93% 1e+02%, rgba(22,119,255,0.17) 0%, rgba(255,255,255,0.05) 23%, rgba(255,255,255,0.03) 87%, rgba(22,119,255,0.12) 109%)',
        padding: 32,
        boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.1)',
      },
      '&-top': {
        textAlign: 'center',
      },
      '&-header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '44px',
        lineHeight: '44px',
        a: {
          textDecoration: 'none',
        },
      },
      '&-title': {
        position: 'relative',
        tinsetBlockStartop: '2px',
        color: token.colorTextHeading,
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
        width: '328px',
        margin: '0 auto',
        '&-other': {
          marginBlockStart: '24px',
          lineHeight: '22px',
          textAlign: 'start',
        },
      },
    },
    [`@media (max-width: ${token.screenMDMin}px)`]: {
      [token.componentCls]: {
        flexDirection: 'column-reverse',
        background: 'none !important',
        '&-container': {
          padding: 24,
          boxShadow: 'none',
          backgroundImage: 'none',
          borderRadius: '0px',
        },
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
    [`@media (min-width: ${token.screenMDMin}px)`]: {
      [token.componentCls]: {
        '&-left': {
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 110px',
          backgroundSize: '100%',
        },
      },
    },
    [`@media (max-width: ${token.screenSM}px)`]: {
      [token.componentCls]: {
        '&-main': { width: '95%', maxWidth: '328px' },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LoginFormPage', (token) => {
    const loginFormToken: LoginFormToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genLoginFormStyle(loginFormToken)];
  });
}
