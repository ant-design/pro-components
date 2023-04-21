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
        overflow: 'hidden',
      },
      '&&-pages-mode': {
        width: '100%',
      },
      '&&-card-mode': {
        width: 'fit-content',
        minWidth: '700px',
      },
      '&-result': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

        '&-extra': {
          padding: '20px',
          alignSelf: 'flex-end',
        },
      },
      '&-contant': {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',

        [`${token.componentCls}-pipeline`]: {
          width: '289px',
          backgroundColor: '#F9F9FC',
          height: '360px',
          overflow: 'hidden',
          borderRadius: `${token.borderRadius} 0 0 ${token.borderRadius}`,
        },

        [`${token.componentCls}-pipeline-steps`]: {
          marginTop: '40px',
          padding: '0 20px',
          height: 'calc(100% - 80px)',
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
