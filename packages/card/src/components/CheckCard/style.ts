import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';

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

const genProStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      display: 'inline-block',
      width: '320px',
      marginInlineEnd: '16px',
      marginBlockEnd: '16px',
      color: token.colorText,
      fontSize: token.fontSizeBase,
      lineHeight: token.lineHeight,
      verticalAlign: 'top',
      backgroundColor: token.colorBgBase,
      borderRadius: token.radiusBase,
      cursor: 'pointer',
      transition: `all 0.3s`,
      '&:last-child': {
        marginInlineEnd: 0,
      },
      '& + &': {
        marginInlineStart: '0 !important',
      },
      '&-bordered': {
        border: `${token.lineWidth} solid ${token.colorBorder}`,
      },
      '&-group': {
        display: 'inline-block',
      },
      '&-loading': {
        overflow: 'hidden',
        userSelect: 'none',
        '&-content': {
          paddingInline: token.padding,
          paddingBlock: token.paddingSM,
          p: {
            marginBlock: 0,
            marginInline: 0,
          },
          '&-block': {
            height: '14px',
            marginBlock: '4px',
            background: `linear-gradient(90deg, rgba(54, 61, 64, 0.2), rgba(54, 61, 64, 0.4), rgba(54, 61, 64, 0.2))`,
          },
          '@keyframes card-loading': {
            '0%': { backgroundPosition: '0 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0 50%' },
          },
        },
      },
      '&:focus': proCheckCardActive(token),
      '&-checked': proCheckCardActive(token),
      '&-disabled': proCheckCardDisabled(token),
      '&[disabled]': proCheckCardDisabled(token),
      '&-lg': {
        width: 440,
      },
      '&-sm': {
        width: 212,
      },
      '&-cover': {
        paddingInline: token.paddingXXS,
        paddingBlock: token.paddingXXS,
        img: { width: '100%', height: '100%', overflow: 'hidden', borderRadius: token.radiusBase },
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
        '> div:not(:last-child)': {
          marginBlockEnd: 4,
        },
      },
      '&-header': { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
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
      [`${token.componentCls}-checked`]: {
        '&::after': {
          position: 'absolute',
          insetBlockStart: 2,
          insetInlineEnd: 2,
          width: 0,
          height: 0,
          border: `6px solid ${token.colorPrimary}`,
          borderBlockEnd: '6px solid transparent',
          borderInlineStart: '6px solid transparent',
          borderBlockStartRightRadius: '2px',
          content: "''",
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
