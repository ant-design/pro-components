import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface LightFilterToken extends ProAliasToken {
  componentCls: string;
}

const genLightFilterStyle: GenerateStyle<LightFilterToken> = (token) => {
  return {
    [token.componentCls]: {
      lineHeight: '30px',
      // 防止 &-container 负 margin 溢出影响外部布局
      // @see https://yuque.antfin-inc.com/tech-ui/topics/523
      '&::before': { display: 'block', height: '0', visibility: 'hidden', content: "'.'" },
      '&-small': {
        lineHeight: token.lineHeight,
      },
      '&-container': {
        display: 'flex',
        flexWrap: 'wrap',
        marginBlockStart: '-8px',
        marginInlineEnd: '-4px',
      },
      '&-item': {
        '&:not(:last-child)': { marginInlineEnd: 8 },
        marginBlockStart: 8,
        whiteSpace: 'nowrap',
      },
      '&-line': { minWidth: '198px' },
      '&-line:not(:first-child)': { marginBlockStart: '16px', marginBlockEnd: 8 },
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
          backgroundColor: 'rgba(0,0,0,0.04)',
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
