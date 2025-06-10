import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.antCls}-pro`]: {
      [`${token.antCls}-form:not(${token.antCls}-form-horizontal)`]: {
        [token.componentCls]: {
          [`&-item:not(${token.componentCls}-item-show-label)`]: {
            [`${token.antCls}-form-item-label`]: {
              display: 'none',
            },
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
        '&&-default:first-child': {
          'div:first-of-type': {
            [`${token.antCls}-form-item`]: {
              [`${token.antCls}-form-item-label`]: {
                display: 'inline-block',
              },
            },
          },
        },
        '&&-default:not(:first-child)': {
          'div:first-of-type': {
            [`${token.antCls}-form-item`]: {
              [`${token.antCls}-form-item-label`]: {
                display: 'none',
              },
            },
          },
        },
      },
      '&-action': {
        display: 'flex',
        height: token.controlHeight,
        marginBlockEnd: token.marginLG,
        lineHeight: token.controlHeight + 'px',
        '&-small': {
          height: token.controlHeightSM,
          lineHeight: token.controlHeightSM,
        },
      },
      '&-action-icon': {
        marginInlineStart: 8,
        cursor: 'pointer',
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
          color: token.colorPrimaryTextHover,
        },
      },
      [`${token.proComponentsCls}-card ${token.proComponentsCls}-card-extra`]: {
        [token.componentCls]: {
          '&-action': {
            marginBlockEnd: 0,
          },
        },
      },
      '&-creator-button-top': {
        marginBlockEnd: 24,
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
