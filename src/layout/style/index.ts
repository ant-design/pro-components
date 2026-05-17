import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../provider';
import { useStyle as useAntdStyle } from '../../provider';

/**
 * 全局滚动条 CSS 变量。
 * 业务可在任意祖先层覆盖这些变量来定制主内容区的滚动条外观。
 * 侧边栏有独立的 `--pro-layout-sider-scrollbar-*` 系列。
 */
export const proLayoutScrollbarVar = {
  thumb: '--pro-layout-scrollbar-thumb',
  thumbHover: '--pro-layout-scrollbar-thumb-hover',
  track: '--pro-layout-scrollbar-track',
  size: '--pro-layout-scrollbar-size',
  radius: '--pro-layout-scrollbar-radius',
} as const;

function sv(k: keyof typeof proLayoutScrollbarVar) {
  return `var(${proLayoutScrollbarVar[k]})`;
}

export function getLayoutScrollbar(): Record<string, unknown> {
  return {
    scrollbarWidth: 'thin',
    scrollbarColor: 'transparent transparent',
    '&:hover': {
      scrollbarColor: `${sv('thumb')} transparent`,
    },
    '&::-webkit-scrollbar': {
      width: sv('size'),
      height: sv('size'),
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: sv('track'),
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      borderRadius: sv('radius'),
      transition: 'background-color 0.3s ease',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: sv('thumb'),
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: sv('thumbHover'),
    },
    '@media (pointer: coarse)': {
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
    },
  };
}

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
      [proLayoutScrollbarVar.thumb]: token.colorFill,
      [proLayoutScrollbarVar.thumbHover]: token.colorFillSecondary,
      [proLayoutScrollbarVar.track]: 'transparent',
      [proLayoutScrollbarVar.size]: '4px',
      [proLayoutScrollbarVar.radius]: `${token.borderRadiusSM}px`,
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
      [`&${token.componentCls}-fixed-header ${token.componentCls}-container`]: {
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...getLayoutScrollbar(),
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
