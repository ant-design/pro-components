import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface LightFilterToken extends ProAliasToken {
  componentCls: string;
}

const genLightFilterStyle: GenerateStyle<LightFilterToken> = (token) => {
  return {
    [token.componentCls]: {
      lineHeight: '30px',
      // @see https://yuque.antfin-inc.com/tech-ui/topics/523
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
        gap: 8,
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
  return useAntdStyle('LightFilter', (token) => {
    const proCardToken: LightFilterToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genLightFilterStyle(proCardToken)];
  });
}
