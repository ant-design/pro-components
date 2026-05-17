import type { GenerateStyle, ProAliasToken } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
import { genAppsLogoComponentsDefaultListStyle } from './default';
import { genAppsLogoComponentsSimpleListStyle } from './simple';

export interface AppsLogoComponentsToken extends ProAliasToken {
  componentCls: string;
}

/**
 * 缓动曲线统一常量（与 SiderMenu/style/menu.ts 保持同一套，便于跨组件对齐节奏）：
 * - `easeOut`：Material "Emphasized Decelerate"，标准入场/微交互；
 * - `easeSpring`：轻微超调，给 hover 浮起 / active 按下一点"手感"。
 * 导出给同目录子样式（default.ts / simple.ts）复用，避免重复字面量。
 */
export const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const easeSpring = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

/** 动画时长：使用命名常量表达语义，而不是散落一堆 `0.2s / 0.22s / 0.28s` 的魔法时长 */
export const motionDuration = {
  /** 触发按钮 hover/active 的颜色与背景变换 */
  fast: '0.2s',
  /** 列表项 hover 浮起、阴影跟随 */
  mid: '0.22s',
  /** svg 旋转、头像轻微放大这种"更显眼"的 motion，略慢收尾 */
  slow: '0.28s',
  /** Popover 面板整体入场 */
  popover: '0.24s',
};

/** 触发按钮（九宫格 icon）尺寸 & 关键交互参数 */
const triggerBtn = {
  size: 28,
  paddingInline: 4,
  hoverScale: 1.06,
  activeScale: 0.94,
  /** 展开态 svg 旋转角度 */
  activeSvgRotate: '90deg',
};

/** `-item-title`：分组标题行的视觉参数 */
const itemTitle = {
  marginInlineStart: 16,
  marginInlineEnd: 8,
  marginBlockEnd: 12,
  firstChildMarginBlockStart: 12,
  fontWeight: 600,
  fontSize: 16,
  /** 让标题整体文字观感稍柔和 */
  opacity: 0.85,
  lineHeight: 1.5,
};

/** Popover 入场 keyframes 的起始位移/缩放 */
const popoverIn = {
  fromTranslateY: 8,
  fromScale: 0.98,
};

const genAppsLogoComponentsStyle: GenerateStyle<AppsLogoComponentsToken> = (
  token,
) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },

      /**
       * 触发按钮（九宫格 icon）：
       * - 整体过渡统一走 `easeOut`，hover 背景 + 轻微放大，active 下沉
       * - 内部 svg 在 `-active` 下旋转 90°，给"已展开"更强视觉反馈
       * - 选中态用 `colorBorderSecondary` 做 inset 描边（代替硬编码 rgba(0,0,0,0.06)）
       */
      '&-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: triggerBtn.paddingInline,
        paddingBlock: 0,
        fontSize: token.fontSize,
        lineHeight: `${token.fontSize}px`,
        height: triggerBtn.size,
        width: triggerBtn.size,
        cursor: 'pointer',
        color: token.layout?.colorTextAppListIcon,
        borderRadius: token.borderRadius,
        transition: [
          `color ${motionDuration.fast} ${easeOut}`,
          `background-color ${motionDuration.fast} ${easeOut}`,
          `transform ${motionDuration.fast} ${easeSpring}`,
          `box-shadow ${motionDuration.fast} ${easeOut}`,
        ].join(', '),
        /** 触发按钮里的 svg 单独给旋转过渡，独立于父级 transform */
        svg: {
          transition: `transform ${motionDuration.slow} ${easeOut}`,
        },
        '&:hover': {
          color: token.layout?.colorTextAppListIconHover,
          backgroundColor: token.layout?.colorBgAppListIconHover,
          transform: `scale(${triggerBtn.hoverScale})`,
        },
        '&:active': {
          transform: `scale(${triggerBtn.activeScale})`,
        },
        '&-active': {
          borderRadius: token.borderRadius,
          color: token.layout?.colorTextAppListIconHover,
          backgroundColor: token.layout?.colorBgAppListIconHover,
          boxShadow: `inset 0 0 0 1px ${token.colorBorderSecondary}`,
          svg: {
            transform: `rotate(${triggerBtn.activeSvgRotate})`,
          },
        },
      },
      '&-item-title': {
        marginInlineStart: itemTitle.marginInlineStart,
        marginInlineEnd: itemTitle.marginInlineEnd,
        marginBlockStart: 0,
        marginBlockEnd: itemTitle.marginBlockEnd,
        fontWeight: itemTitle.fontWeight,
        color: token.colorTextHeading,
        fontSize: itemTitle.fontSize,
        opacity: itemTitle.opacity,
        lineHeight: itemTitle.lineHeight,
        '&:first-child': {
          marginBlockStart: itemTitle.firstChildMarginBlockStart,
        },
      },
      /**
       * Popover 入场动画：`opacity 0 → 1` + `translateY` + 微缩放。
       * 只在进入阶段跑；离开由 antd 内置过渡负责，以避免两套动画打架。
       * transform-origin 设为 top-right，与 `placement=bottomRight` 对齐，
       * 视觉上就像从触发按钮"掉"下来。
       */
      '&-popover': {
        [`${token.antCls}-popover-arrow`]: {
          display: 'none',
        },
        [`${token.antCls}-popover-inner`]: {
          transformOrigin: 'top right',
          animationName: `${token.componentCls}-popover-in`.replace(/^\./, ''),
          animationDuration: motionDuration.popover,
          animationTimingFunction: easeOut,
          animationFillMode: 'both',
        },
      },

      /**
       * 全局 keyframes（挂在根 componentCls 下，命名带前缀避免与业务冲突）
       * - popover-in：面板入场
       */
      [`@keyframes ${token.componentCls}-popover-in`.replace(/\./, '')]: {
        '0%': {
          opacity: 0,
          transform: `translateY(${popoverIn.fromTranslateY}px) scale(${popoverIn.fromScale})`,
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        },
      },

      '&-simple': genAppsLogoComponentsSimpleListStyle(token),
      '&-default': genAppsLogoComponentsDefaultListStyle(token),
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('AppsLogoComponents', (token) => {
    const proCardToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    } as AppsLogoComponentsToken;

    return [genAppsLogoComponentsStyle(proCardToken)];
  });
}
