import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const proCheckCardActive = (token: ProListToken) => ({
  backgroundColor: token.colorPrimaryBgHover,
  borderColor: token.colorPrimary,
});
const proCheckCardDisabled = (token: ProListToken) => ({
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  cursor: 'not-allowed',
  [token.componentCls]: {
    '&-description': { color: token.colorTextDisabled },
    '&-title': {
      color: token.colorTextDisabled,
    },
    '&-avatar': {
      opacity: '0.25',
    },
  },
});

export const cardLoading = new Keyframes('card-loading', {
  '0%': { backgroundPosition: '0 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0 50%' },
});

const genProStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      display: 'inline-block',
      width: '320px',
      marginInlineEnd: '16px',
      marginBlockEnd: '16px',
      color: token.colorText,
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      verticalAlign: 'top',
      backgroundColor: token.colorBgContainer,
      borderRadius: token.borderRadius,
      cursor: 'pointer',
      transition: `all 0.3s`,
      '&:last-child': {
        marginInlineEnd: 0,
      },
      '& + &': {
        marginInlineStart: '0 !important',
      },
      '&-bordered': {
        border: `${token.lineWidth}px solid ${token.colorBorder}`,
      },
      '&-group': {
        display: 'inline-block',
      },
      [`${token.componentCls}-loading`]: {
        overflow: 'hidden',
        userSelect: 'none',
        '&-content': {
          paddingInline: token.padding,
          paddingBlock: token.paddingSM,
          p: {
            marginBlock: 0,
            marginInline: 0,
          },
          [`${token.componentCls}-loading-block`]: {
            height: '14px',
            marginBlock: '4px',
            background: `linear-gradient(90deg, rgba(54, 61, 64, 0.2), rgba(54, 61, 64, 0.4), rgba(54, 61, 64, 0.2))`,
            animationName: cardLoading as unknown as string,
            animationDuration: '1.4s',
            animationTimingFunction: 'ease',
            animationIterationCount: 'infinite',
          },
        },
      },
      '&:focus': proCheckCardActive(token),
      '&-checked': {
        ...proCheckCardActive(token),
        '&:after': {
          position: 'absolute',
          insetBlockStart: 2,
          insetInlineEnd: 2,
          width: 0,
          height: 0,
          border: `6px solid ${token.colorPrimary}`,
          borderBlockEnd: '6px solid transparent',
          borderInlineStart: '6px solid transparent',
          borderStartEndRadius: '2px',
          content: "''",
        },
      },
      '&-disabled': proCheckCardDisabled(token),
      '&[disabled]': proCheckCardDisabled(token),
      '&-checked&-disabled': {
        '&:after': {
          position: 'absolute',
          insetBlockStart: 2,
          insetInlineEnd: 2,
          width: 0,
          height: 0,
          border: `6px solid ${token.colorTextDisabled}`,
          borderBlockEnd: '6px solid transparent',
          borderInlineStart: '6px solid transparent',
          borderStartEndRadius: '2px',
          content: "''",
        },
      },
      '&-lg': {
        width: 440,
      },
      '&-sm': {
        width: 212,
      },
      '&-cover': {
        paddingInline: token.paddingXXS,
        paddingBlock: token.paddingXXS,
        img: {
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: token.borderRadius,
        },
      },
      '&-content': {
        display: 'flex',
        paddingInline: token.paddingSM,
        paddingBlock: token.padding,
      },
      '&-avatar-header': { display: 'flex', alignItems: 'center' },
      '&-avatar': { paddingInlineEnd: 8 },
      '&-detail': {
        overflow: 'hidden',
        width: '100%',
        '> div:not(:last-child)': {
          marginBlockEnd: 4,
        },
      },
      '&-header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      '&-title': {
        overflow: 'hidden',
        color: token.colorTextHeading,
        fontWeight: '500',
        fontSize: token.fontSize,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '&-description': {
        color: token.colorTextSecondary,
      },
      [`&:not(${token.componentCls}-disabled)`]: {
        '&:hover': {
          borderColor: token.colorPrimary,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('CheckCard', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proListToken)];
  });
}
