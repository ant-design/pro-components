import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface LightFormLayoutToken extends ProAliasToken {
  componentCls: string;
}

const genLightFormLayoutStyle: GenerateStyle<LightFormLayoutToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      lineHeight: '30px',
      '&::before': {
        display: 'block',
        height: 0,
        visibility: 'hidden',
        content: "'.'",
      },
      '&-small': {
        lineHeight: token.lineHeight,
      },
      '&-container': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: token.marginXS,
      },
      '&-item': {
        whiteSpace: 'nowrap',
        [`${token.antCls}-form-item`]: {
          marginBlock: 0,
        },
      },
      '&-line': { minWidth: '198px' },
      '&-line:not(:first-child)': {
        marginBlockStart: '16px',
        marginBlockEnd: 8,
      },
      '&-collapse-icon': {
        width: token.controlHeight,
        height: token.controlHeight,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '&-effective': {
        [`${token.componentCls}-collapse-icon`]: {
          backgroundColor: token.colorBgTextHover,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LightForm', (token) => {
    const layoutToken: LightFormLayoutToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genLightFormLayoutStyle(layoutToken)];
  });
}
