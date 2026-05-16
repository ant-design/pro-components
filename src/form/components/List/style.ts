import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

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
      boxSizing: 'border-box',
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
        alignItems: 'center',
        height: token.controlHeight,
        marginBlockEnd: token.marginLG,
        lineHeight: token.controlHeight + 'px',
        '&-small': {
          height: token.controlHeightSM,
          lineHeight: token.controlHeightSM,
        },
      },
      '&-action-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInlineStart: token.marginXS,
        padding: token.paddingXXS,
        color: token.colorTextSecondary,
        lineHeight: 1,
        cursor: 'pointer',
        borderRadius: token.borderRadiusSM,
        transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
        '&:hover': {
          color: token.colorText,
          backgroundColor: token.colorBgTextHover,
        },
        '&:active': {
          backgroundColor: token.colorBgTextActive,
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
