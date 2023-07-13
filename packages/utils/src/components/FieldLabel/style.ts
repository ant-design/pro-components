import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'inline-flex',
      gap: token.marginXXS,
      alignItems: 'center',
      height: '30px',
      paddingBlock: 0,
      paddingInline: 8,
      fontSize: token.fontSize,
      lineHeight: '30px',
      borderRadius: '2px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
      '&-active': {
        paddingBlock: 0,
        paddingInline: 8,
        backgroundColor: token.colorBgTextHover,
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
      '&-bordered': {
        height: '32px',
        paddingBlock: 0,
        paddingInline: 8,
        border: `${token.lineWidth}px solid ${token.colorBorder}`,
        borderRadius: '@border-radius-base',
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
