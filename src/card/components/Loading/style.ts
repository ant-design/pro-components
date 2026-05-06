import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

export const cardLoading = new Keyframes('card-loading', {
  '0%': { backgroundPosition: '0 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0 50%' },
});

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '&-loading': {
        overflow: 'hidden',
      },
      '&-loading &-body': {
        userSelect: 'none',
      },
      [`${token.componentCls}-loading-content`]: {
        width: '100%',
        p: {
          marginBlock: 0,
          marginInline: 0,
        },
      },
      [`${token.componentCls}-loading-block`]: {
        height: 14,
        marginBlock: token.marginXXS,
        // 用 token.colorFill* 系列色，跟随主题（含 dark 模式）自动反色
        background: `linear-gradient(90deg, ${token.colorFillSecondary}, ${token.colorFillTertiary}, ${token.colorFillSecondary})`,
        backgroundSize: '600% 600%',
        borderRadius: token.borderRadius,
        animationName: cardLoading as unknown as string,
        animationDuration: '1.4s',
        animationTimingFunction: 'ease',
        animationIterationCount: 'infinite',
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProCardLoading', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
