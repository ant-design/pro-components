import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-mask': {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1001,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
      },
      '&-container': {
        '.ant-popover-open': {
          'box-shadow': 'var(--boxShadow)',
          transition: '300ms box-shadow ease-in-out',
        },
      },
      '&-content-box': {
        position: 'relative',
        '.footer-container': {
          position: 'relative',
          marginTop: '5px',
          overflow: 'hidden',
          '.btn-group': {
            float: 'right',
          },
        },
        '.pagination-box': {
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'translateY(-50%)',
          '.pagination': {
            display: 'flex',
            'align-items': 'center',
            height: '100%',
            '.pagination-item': {
              cursor: 'pointer',
            },
            '&.theme-dot': {
              '.pagination-item': {
                width: '5px',
                height: '5px',
                marginRight: '5px',
                background: '#ccc',
                borderRadius: '50%',
                '&:nth-last-child(1)': {
                  marginRight: 0,
                },
                '&.cur': {
                  background: token.colorPrimary,
                },
              },
            },
            '&.theme-index': {
              '.pagination-item': {
                width: '20px',
                height: '20px',
                marginRight: '5px',
                color: '#333',
                fontSize: '12px',
                lineHeight: '20px',
                textAlign: 'center',
                background: '#ccc',
                borderRadius: '3px',
                '&:nth-last-child(1)': {
                  marginRight: 0,
                },
                '&.cur': {
                  color: token.colorTextLightSolid,
                  background: token.colorPrimary,
                },
              },
            },
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('pro-action-guide', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
