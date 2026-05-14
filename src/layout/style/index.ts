import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../provider';
import { useStyle as useAntdStyle } from '../../provider';

/**
 * ProLayout 全局 CSS 变量。
 * 业务可通过 CSS 覆盖对应变量自行调整。
 */
export const proLayoutVar = {
  /** 顶栏 `top` + `contentWidth=Fixed` 时的内容区最大宽度 */
  contentFixedMaxWidth: '--pro-layout-content-fixed-max-width',
  /** Header 高度 */
  headerHeight: '--pro-layout-header-height',
  /** fixed header 左侧偏移（跨组件几何同步用） */
  fixedHeaderStart: '--pro-layout-fixed-header-start',
} as const;

export interface ProLayoutToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutStyle: GenerateStyle<ProLayoutToken> = (token) => {
  return {
    [`${token.antCls}-layout`]: {
      backgroundColor: 'transparent',
    },
    [token.componentCls]: {
      [proLayoutVar.contentFixedMaxWidth]: '1152px',
      [proLayoutVar.headerHeight]: `${token.layout?.header?.heightLayoutHeader || 56}px`,
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
