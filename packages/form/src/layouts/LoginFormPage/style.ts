import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

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
          marginBlock: 24,
          marginInline: 24,
          paddingInline: 24,
          paddingBlock: 24,
          '&-title': { fontWeight: '500', fontSize: '28px' },
          '&-subTitle': { marginBlockStart: 8, fontSize: '16px' },
          '&-action': { marginBlockStart: '24px' },
        },
      },
      '&-container': {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        maxWidth: '550px',
        height: '100%',
        paddingInline: 0,
        paddingBlock: 32,
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
        tinsetBlockStartop: '2px',
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
        '&-container': {
          paddingInline: 0,
          paddingBlockStart: 128,
          paddingBlockEnd: 24,
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
