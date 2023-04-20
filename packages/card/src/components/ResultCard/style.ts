import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  const { componentCls, antCls = '.ant' } = token;
  return {
    [componentCls]: {
      '&&': {
        width: 'fit-content',
        minWidth: '700px',
        overflow: 'hidden',
        backgroundColor: '#F9F9FC',
      },
      '&-contant': {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',

        [`${token.componentCls}-contant-steps`]: {
          width: '289px',
          borderRadius: `${token.borderRadius} 0 0 ${token.borderRadius}`,
          margin: '40px 0',
          padding: '0 20px',
          height: '360px',
          overflow: 'auto',
        },
      },
      [`${antCls}-result`]: {
        flex: 1,
        [`${antCls}-result-title`]: {
          height: '22px',
          fontSize: token.fontSize,
          color: token.colorTextSecondary,
        },
        [`${antCls}-result-subtitle`]: {
          fontSize: token.fontSizeLG,
          height: '26px',
          color: token.colorText,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ResultCard', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
