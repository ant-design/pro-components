import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface CheckCardToken extends ProAliasToken {
  componentCls: string;
}

const proCheckCardActive = (token: CheckCardToken) => ({
  backgroundColor: token.colorPrimaryBg,
  borderColor: token.colorPrimary,
});
const proCheckCardDisabled = (token: CheckCardToken) => ({
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

/**
 * 选中态右上角小三角的公共形态：宽高 0、定位、圆角等所有 3 个状态共用的部分。
 * 颜色 / 透明度由调用方覆盖。
 */
const genCheckedAfterBase = (token: CheckCardToken) => ({
  position: 'absolute' as const,
  insetBlockStart: 2,
  insetInlineEnd: 2,
  width: 0,
  height: 0,
  borderStartEndRadius: token.borderRadius,
  content: "''",
});

export const cardLoading = new Keyframes('card-loading', {
  '0%': { backgroundPosition: '0 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0 50%' },
});

const genProStyle: GenerateStyle<CheckCardToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      width: 320,
      marginInlineEnd: token.margin,
      marginBlockEnd: token.margin,
      color: token.colorText,
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      verticalAlign: 'top',
      backgroundColor: token.colorBgContainer,
      borderRadius: token.borderRadius,
      overflow: 'auto',
      cursor: 'pointer',
      transition: `all 0.3s`,
      '&:after': {
        ...genCheckedAfterBase(token),
        opacity: 0,
        transition: `all 0.3s ${token.motionEaseInOut}`,
        borderBlockEnd: `${token.borderRadius + 4}px solid transparent`,
        borderInlineStart: `${token.borderRadius + 4}px solid transparent`,
      },

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
        '&-sub-check-card': {
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          '&-title': {
            cursor: 'pointer',
            paddingBlock: token.paddingXS,
            display: 'flex',
            gap: 4,
            alignItems: 'center',
          },
          '&-panel': {
            visibility: 'initial',
            transition: 'all 0.3s',
            opacity: 1,
            '&-collapse': {
              display: 'none',
              visibility: 'hidden',
              opacity: 0,
            },
          },
        },
      },
      [`${token.componentCls}-loading`]: {
        overflow: 'hidden',
        userSelect: 'none',
        '&-content': {
          padding: token.paddingMD,
        },
      },
      '&:focus': proCheckCardActive(token),
      '&-checked': {
        ...proCheckCardActive(token),
        '&:after': {
          opacity: 1,
          border: `${token.borderRadius + 4}px solid ${token.colorPrimary}`,
          borderBlockEnd: `${token.borderRadius + 4}px solid transparent`,
          borderInlineStart: `${token.borderRadius + 4}px solid transparent`,
        },
      },
      '&-disabled': proCheckCardDisabled(token),
      '&[disabled]': proCheckCardDisabled(token),
      '&-checked&-disabled': {
        '&:after': {
          ...genCheckedAfterBase(token),
          border: `${token.borderRadius + 4}px solid ${token.colorTextDisabled}`,
          borderBlockEnd: `${token.borderRadius + 4}px solid transparent`,
          borderInlineStart: `${token.borderRadius + 4}px solid transparent`,
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
      '&-body': {
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
        lineHeight: token.lineHeight,
        '&-left': {
          display: 'flex',
          alignItems: 'center',
          gap: token.sizeSM,
          minWidth: 0,
        },
      },
      '&-title': {
        overflow: 'hidden',
        color: token.colorTextHeading,
        fontWeight: '500',
        fontSize: token.fontSize,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&-with-ellipsis': {
          display: 'inline-block',
        },
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
    const checkCardToken: CheckCardToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(checkCardToken)];
  });
}
