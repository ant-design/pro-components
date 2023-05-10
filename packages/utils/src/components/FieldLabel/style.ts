import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'inline-flex',
      gap: '4px',
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
        paddingInline: 12,
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
      '&-icon': {
        paddingBlock: 1,
        paddingInline: 1,
        color: token.colorIcon,
        fontSize: '12px',
        verticalAlign: 'middle',
        [`&${token.componentCls}-close`]: {
          display: 'none',
          height: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: 12,
          color: token.colorBgContainer,
          fontSize: 8,
          backgroundColor: token.colorTextPlaceholder,
          borderRadius: '50%',
          '&:hover': {
            color: token.colorIcon,
          },
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
        paddingInline: 12,
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
