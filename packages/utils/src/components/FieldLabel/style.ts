import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

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
      padding: '0 4px',
      fontSize: '@font-size-base',
      lineHeight: '30px',
      borderRadius: '2px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)',
      },
      '&-active': {
        padding: '0 12px',
        backgroundColor: 'rgba(0,0,0,0.04)',
        [`&${token.componentCls}-allow-clear:hover:not(${token.componentCls}-disabled)`]: {
          [`${token.componentCls}-arrow`]: {
            display: 'none',
          },
          [`${token.componentCls}-close`]: {
            display: 'inline-block',
          },
        },
        '&-icon': {
          height: '12px',
          padding: '1px',
          color: token.colorIcon,
          fontSize: '12px',
          verticalAlign: 'middle',
          [`&${token.componentCls}-close`]: {
            display: 'none',
            height: '14px',
            padding: '3px',
            color: token.colorBgBase,
            fontSize: '8px',
            backgroundColor: token.colorTextPlaceholder,
            borderRadius: '50%',
            '&:hover': {
              color: token.colorIcon,
            },
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
        padding: '0 4px',
        fontSize: token.fontSizeSM,
        lineHeight: '24px',
        [`&${token.componentCls}-active`]: { padding: '0 8px' },
        [`${token.componentCls}-icon`]: {
          padding: 0,
        },
        [`${token.componentCls}-close`]: { marginTop: '-2px', padding: '3px', fontSize: '6px' },
      },
      '&-bordered': {
        height: '32px',
        padding: '0 12px',
        border: `${token.controlLineWidth} solid ${token.colorBorder}`,
        borderRadius: '@border-radius-base',
      },
      '&-bordered&-small': { height: '24px', padding: '0 8px' },
      '&-bordered&-active': {
        backgroundColor: token.colorBgBase,
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
