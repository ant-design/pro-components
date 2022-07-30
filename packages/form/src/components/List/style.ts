import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.antCls}-form:not(${token.antCls}-form-horizontal)`]: {
      [token.componentCls]: {
        [`&-item:not(${token.componentCls}-item-show-label)`]: {
          [`${token.antCls}-form-item-label`]: {
            display: 'none',
          },
        },
      },
    },
    [token.componentCls]: {
      maxWidth: '100%',
      '&-item': {
        '&&-show-label': {
          [`${token.antCls}-form-item-label`]: {
            display: 'inline-block',
          },
        },
        '&:first-of-type': {
          'div:first-of-type': {
            [`${token.antCls}-form-item`]: {
              [`${token.antCls}-form-item-label`]: {
                display: 'inline-block',
              },
            },
          },
        },
      },
      '&-action': { display: 'flex', height: '32px', marginBottom: '24px', lineHeight: '32px' },
      '&-action-icon': {
        marginLeft: '8px',
        cursor: 'pointer',
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
          color: token.colorPrimaryTextHover,
        },
      },
      [`${token.proComponentsCls}-card ${token.proComponentsCls}-card-extra`]: {
        [token.componentCls]: {
          '&-action': {
            marginBottom: 0,
          },
        },
      },
      '&-creator-button-top': {
        marginBottom: 24,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProFormList', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
