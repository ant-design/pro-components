import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../provider';
import { useStyle as useAntdStyle } from '../../provider';
export interface ProLayoutToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutStyle: GenerateStyle<ProLayoutToken> = (token) => {
  return {
    [`${token.antCls}-layout`]: {
      backgroundColor: 'transparent !important',
    },
    [token.componentCls]: {
      boxSizing: 'border-box',
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      [`& ${token.antCls}-layout`]: {
        display: 'flex',
        backgroundColor: 'transparent',
        width: '100%',
      },
      [`${token.componentCls}-content`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor:
          token.layout?.pageContainer?.colorBgPageContainer || 'transparent',
        position: 'relative',
        paddingBlock:
          token.layout?.pageContainer?.paddingBlockPageContainerContent,
        paddingInline:
          token.layout?.pageContainer?.paddingInlinePageContainerContent,
        '&-has-page-container': {
          padding: 0,
        },
      },
      [`${token.componentCls}-container`]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: 0,
        backgroundColor: 'transparent',
      },
      [`${token.componentCls}-bg-list`]: {
        pointerEvents: 'none',
        position: 'fixed',
        overflow: 'hidden',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 0,
        height: '100%',
        width: '100%',
        background: token.layout?.bgLayout,
      },
    },
  } as CSSInterpolation;
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayout', (token) => {
    const proLayoutToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    } as ProLayoutToken;

    return [genProLayoutStyle(proLayoutToken)];
  });
}
