import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      display: 'inline-flex',
      gap: token.marginXXS,
      alignItems: 'center',
      height: '30px',
      paddingBlock: 0,
      paddingInline: 8,
      fontSize: token.fontSize,
      lineHeight: '30px',
      borderRadius: token.borderRadius,
      cornerShape: 'squircle',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
      '&-active': {
        paddingBlock: 0,
        paddingInline: 8,
        [`&${token.componentCls}-allow-clear:hover:not(${token.componentCls}-disabled)`]:
          {
            [`${token.componentCls}-arrow`]: {
              display: 'none',
            },
            [`${token.componentCls}-close`]: {
              display: 'inline-flex',
            },
          },
      },
      [`${token.antCls}-select`]: {
        [`${token.antCls}-select-clear`]: {
          borderRadius: '50%',
        },
      },
      [`${token.antCls}-picker`]: {
        [`${token.antCls}-picker-clear`]: {
          borderRadius: '50%',
        },
      },
      '&-icon': {
        color: token.colorIcon,
        transition: 'color 0.3s',
        fontSize: 12,
        verticalAlign: 'middle',
        [`&${token.componentCls}-close`]: {
          display: 'none',
          fontSize: 12,
          alignItems: 'center',
          justifyContent: 'center',
          color: token.colorTextPlaceholder,
          borderRadius: '50%',
        },
        '&:hover': {
          color: token.colorIconHover,
        },
      },
      '&-disabled': {
        color: token.colorTextPlaceholder,
        cursor: 'not-allowed',
        [`${token.componentCls}-icon`]: {
          color: token.colorTextPlaceholder,
        },
      },
      '&-small': {
        height: '24px',
        paddingBlock: 0,
        paddingInline: 4,
        fontSize: token.fontSizeSM,
        lineHeight: '24px',
        [`&${token.componentCls}-active`]: {
          paddingBlock: 0,
          paddingInline: 8,
        },
        [`${token.componentCls}-icon`]: {
          paddingBlock: 0,
          paddingInline: 0,
        },
        [`${token.componentCls}-close`]: {
          marginBlockStart: '-2px',
          paddingBlock: 4,
          paddingInline: 4,
          fontSize: '6px',
        },
      },
      '&-outlined': {
        height: '32px',
        paddingBlock: 0,
        paddingInline: 8,
        border: `${token.lineWidth}px solid ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        '&-active': {
          backgroundColor: 'none',
        },
      },
      '&-borderless': {
        height: '32px',
        '&-active': {
          backgroundColor: token.colorBgTextHover,
        },
      },
      '&-filled': {
        height: '32px',
        backgroundColor: token.colorBgTextHover,
        border: `${token.lineWidth}px solid transparent`,
        '&:hover': {
          border: `${token.lineWidth}px solid ${token.colorPrimary}`,
          backgroundColor: token.colorBgTextHover,
        },
      },
      '&-underlined': {
        height: '32px',
        borderRadius: 0,
        borderBottom: `${token.lineWidth}px solid ${token.colorSplit}`,
        '&:hover': {
          borderBottom: `${token.lineWidth}px solid ${token.colorPrimary}`,
          backgroundColor: token.colorBgTextHover,
        },
      },
      '&-bordered&-small': {
        height: '24px',
        paddingBlock: 0,
        paddingInline: 8,
      },
      '&-bordered&-active': {
        backgroundColor: token.colorBgContainer,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('FieldLabel', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
