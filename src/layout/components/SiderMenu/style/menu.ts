/**
 * ProLayout Menu 样式
 *
 * 样式方案：CSS 变量（`--pro-layout-sider-*` / `--pro-layout-nav-*`）。
 *
 * 为什么菜单走 CSS 变量而非纯 token？
 * 1. 菜单需要支持外部 CSS 覆盖（暗色侧栏、品牌色定制等），CSS var 允许用户
 *    在任意祖先层通过 `style` 或自定义 CSS 覆写，无需侵入 JS；
 * 2. Popup 浮层挂在 document.body，与 nav 无祖先关系，CSS var 通过
 *    `applyDocMenuTokenToNavVars` 在 popup 根上重新注入，比 token 更灵活；
 * 3. 所有 var 的默认值直接取 antd `GlobalToken`，跟随主题/暗色模式自动切换。
 *
 * 与 Header 的设计差异：Header 大部分视觉直接用 cssinjs token，仅一个
 * `--pro-layout-fixed-header-start` 做跨组件几何同步。两者各有适用场景，
 * 不刻意统一。
 */
import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GlobalToken } from 'antd/lib/theme/interface';
import type { CSSProperties } from 'react';
import type { ProAliasToken } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
import type {
  DeepPartial,
  LayoutDesignToken,
} from '../../../../provider/typing/layoutToken';
import type { MenuMode } from '../types';

/** 仅保留类名前缀；菜单视觉全部走 CSS 变量，避免再依赖 ProProvider token 字段 */
export interface ProLayoutBaseMenuToken {
  componentCls: string;
}

/** 侧栏壳层（Sider / Drawer body）与文档站覆盖用 */
export const proLayoutSiderVar = {
  bg: '--pro-layout-sider-bg',
  colorText: '--pro-layout-sider-color-text',
  colorTextTitle: '--pro-layout-sider-color-text-title',
  colorTextSecondary: '--pro-layout-sider-color-text-secondary',
  paddingInlineMenu: '--pro-layout-sider-padding-inline-menu',
  paddingBlockMenu: '--pro-layout-sider-padding-block-menu',
  borderRadius: '--pro-layout-sider-border-radius',
  colorBgHover: '--pro-layout-sider-color-bg-hover',
  fontSize: '--pro-layout-sider-font-size',
  /** thumb 填充色 */
  scrollbarThumb: '--pro-layout-sider-scrollbar-color-thumb',
  scrollbarThumbHover: '--pro-layout-sider-scrollbar-color-thumb-hover',
  /** 轨道背景色 */
  scrollbarTrack: '--pro-layout-sider-scrollbar-color-track',
  scrollbarTrackThickness: '--pro-layout-sider-scrollbar-track-thickness',
  scrollbarThumbRadius: '--pro-layout-sider-scrollbar-thumb-radius',
} as const;

/**
 * 侧栏壳层 CSS 变量：`token.layout.sider` 可配项与变量对齐。
 * 滚动条不设为 `token` 字段，由 `--pro-layout-sider-scrollbar-*` 注入默认值（与 antd 语义色一致），业务可覆盖变量定制。
 * `antdToken` 须为 `theme.useToken()` 解析结果，避免写死 `var(--ant-*)` 与自定义 `prefixCls` 不一致。
 */
export function getProLayoutSiderCssVarsStyle(
  layout: DeepPartial<LayoutDesignToken> | undefined,
  antdToken: GlobalToken,
): CSSProperties {
  const s = layout?.sider;
  return {
    [proLayoutSiderVar.bg]: s?.colorMenuBackground ?? antdToken.colorBgElevated,
    [proLayoutSiderVar.colorText]:
      s?.colorTextMenu ?? antdToken.colorTextSecondary,
    [proLayoutSiderVar.colorTextTitle]:
      s?.colorTextMenuTitle ?? antdToken.colorText,
    [proLayoutSiderVar.colorTextSecondary]:
      s?.colorTextMenuSecondary ?? antdToken.colorTextTertiary,
    [proLayoutSiderVar.paddingInlineMenu]:
      s?.paddingInlineLayoutMenu != null
        ? `${s.paddingInlineLayoutMenu}px`
        : '8px',
    [proLayoutSiderVar.paddingBlockMenu]:
      s?.paddingBlockLayoutMenu != null
        ? `${s.paddingBlockLayoutMenu}px`
        : '12px',
    [proLayoutSiderVar.borderRadius]: `${antdToken.borderRadius}px`,
    [proLayoutSiderVar.colorBgHover]:
      s?.colorBgMenuItemHover ?? antdToken.colorFillSecondary,
    [proLayoutSiderVar.fontSize]: `${antdToken.fontSize}px`,
    [proLayoutSiderVar.scrollbarThumb]: antdToken.colorFillTertiary,
    [proLayoutSiderVar.scrollbarThumbHover]: antdToken.colorFillSecondary,
    [proLayoutSiderVar.scrollbarTrack]: 'transparent',
    [proLayoutSiderVar.scrollbarTrackThickness]: '4px',
    [proLayoutSiderVar.scrollbarThumbRadius]: `${antdToken.borderRadiusSM}px`,
  } as CSSProperties;
}

function createSubmenuPopupScrollbar(): Record<string, unknown> {
  const thumb = `var(${proLayoutSiderVar.scrollbarThumb})`;
  const thumbHover = `var(${proLayoutSiderVar.scrollbarThumbHover})`;
  const track = `var(${proLayoutSiderVar.scrollbarTrack})`;
  const trackSize = `var(${proLayoutSiderVar.scrollbarTrackThickness})`;
  const thumbRadius = `var(${proLayoutSiderVar.scrollbarThumbRadius})`;

  return {
    scrollbarWidth: 'thin',
    scrollbarColor: `${thumb} ${track}`,
    '&::-webkit-scrollbar': { width: trackSize, height: trackSize },
    '&::-webkit-scrollbar-track': { backgroundColor: track },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: thumb,
      borderRadius: thumbRadius,
    },
    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: thumbHover },
  };
}

/**
 * 主导航语义 token，统一在根 `nav` 上注入，子选择器只用 `var(--pro-layout-nav-*)`。
 *
 * 设计原则：
 * 1. 所有视觉值暴露为 `--pro-layout-nav-*` CSS 变量，业务侧可通过 CSS 覆盖定制；
 * 2. 默认值直接取 antd `GlobalToken`（跟随主题/暗色模式自动切换）；
 * 3. `token.layout.sider` / `token.layout.header` 可选字段由 `applyDocMenuTokenToNavVars`
 *    在运行时覆盖对应变量值。
 */
export const navVar = {
  colorText: '--pro-layout-nav-color-text',
  colorBgHover: '--pro-layout-nav-color-bg-hover',
  colorTextHover: '--pro-layout-nav-color-text-hover',
  /** 与文档 `colorTextMenuActive` / 按下态对应 */
  colorTextActive: '--pro-layout-nav-color-text-active',
  colorBgSelected: '--pro-layout-nav-color-bg-selected',
  /** 选中 + hover 组合态的背景色：基于选中态同色系再深一档，避免被普通 hover 灰色覆盖 */
  colorBgSelectedHover: '--pro-layout-nav-color-bg-selected-hover',
  colorTextSelected: '--pro-layout-nav-color-text-selected',
  /** 选中态的图标颜色，与选中态字色解耦（SidebarMenu 使用 primary-text-secondary） */
  colorIconSelected: '--pro-layout-nav-color-icon-selected',
  /** 与文档 `colorBgMenuItemActive` / 按下态背景对应 */
  colorBgActive: '--pro-layout-nav-color-bg-active',
  colorDivider: '--pro-layout-nav-color-divider',
  popupBg: '--pro-layout-nav-popup-bg',
  indent: '--pro-layout-nav-indent',
  colorIcon: '--pro-layout-nav-color-icon',
  colorSection: '--pro-layout-nav-color-section',
  itemHeight: '--pro-layout-nav-item-height',
  itemRadius: '--pro-layout-nav-item-radius',
  itemGap: '--pro-layout-nav-item-gap',
  itemFontSize: '--pro-layout-nav-item-font-size',
  itemFontWeight: '--pro-layout-nav-item-font-weight',
  /** 单一字体 shorthand，业务侧可通过 `--font-text-body-emphasized-base` 一次性覆盖 */
  itemFont: '--pro-layout-nav-item-font',
  itemPadBlock: '--pro-layout-nav-item-padding-block',
  itemPadInline: '--pro-layout-nav-item-padding-inline',
  stackGap: '--pro-layout-nav-stack-gap',
  /** 分组之间的间距，默认 12px */
  groupGap: '--pro-layout-nav-group-gap',
  groupTitleFontSize: '--pro-layout-nav-group-title-font-size',
  groupTitleLineHeight: '--pro-layout-nav-group-title-line-height',
  /** 图标容器尺寸，默认 18px（svg 自身按 18px 渲染，容器与 svg 等宽） */
  iconBox: '--pro-layout-nav-icon-box-size',
  iconSvgSize: '--pro-layout-nav-icon-svg-size',
  /** submenu 右侧指示器（chevron）尺寸，默认 12px */
  arrowSize: '--pro-layout-nav-arrow-size',
  /** 收起态下一级 button 的整体方形尺寸，默认 28px（icon 居中显示） */
  collapsedItemSize: '--pro-layout-nav-collapsed-item-size',
  /** submenu 包含选中子项时标题文字色（对应文档 `colorTextSubMenuSelected`） */
  colorTextSubMenuSelected: '--pro-layout-nav-color-text-submenu-selected',
} as const;

function defaultLayoutNavCssVars(
  surface: 'sider' | 'header',
  t: GlobalToken,
): Record<string, string> {
  const padInline = 8;
  const stackGap = 4;
  const itemH = 32;
  if (surface === 'sider') {
    return {
      [navVar.colorText]: t.colorText,
      [navVar.colorBgHover]: t.colorFillSecondary,
      [navVar.colorTextHover]: t.colorText,
      [navVar.colorTextActive]: t.colorText,
      [navVar.colorBgActive]: t.colorFillSecondary,
      [navVar.colorBgSelected]: t.colorFillTertiary,
      [navVar.colorBgSelectedHover]: t.colorFillSecondary,
      [navVar.colorTextSelected]: t.colorText,
      [navVar.colorIconSelected]: t.colorText,
      [navVar.colorDivider]: t.colorSplit,
      [navVar.popupBg]: t.colorBgElevated,
      [navVar.indent]: '16px',
      [navVar.colorIcon]: t.colorTextTertiary,
      [navVar.colorSection]: t.colorTextSecondary,
      [navVar.itemHeight]: '36px',
      [navVar.itemRadius]: `${t.borderRadiusLG}px`,
      [navVar.itemGap]: '8px',
      [navVar.itemFontSize]: '14px',
      [navVar.itemFontWeight]: 'normal',
      [navVar.itemFont]: `500 14px / 20px ${t.fontFamily}`,
      [navVar.itemPadBlock]: '8px',
      [navVar.itemPadInline]: '10px',
      [navVar.stackGap]: `${stackGap}px`,
      [navVar.groupGap]: '12px',
      [navVar.groupTitleFontSize]: '13px',
      [navVar.groupTitleLineHeight]: '20px',
      [navVar.iconBox]: '18px',
      [navVar.iconSvgSize]: '18px',
      [navVar.arrowSize]: '12px',
      [navVar.collapsedItemSize]: '32px',
      [navVar.colorTextSubMenuSelected]: t.colorText,
    };
  }
  return {
    [navVar.colorText]: t.colorTextSecondary,
    [navVar.colorBgHover]: t.colorFillSecondary,
    [navVar.colorTextHover]: t.colorText,
    [navVar.colorTextActive]: t.colorText,
    [navVar.colorBgActive]: t.colorFillSecondary,
    [navVar.colorBgSelected]: t.colorFillTertiary,
    [navVar.colorBgSelectedHover]: t.colorFillSecondary,
    [navVar.colorTextSelected]: t.colorText,
    [navVar.colorIconSelected]: t.colorText,
    [navVar.colorDivider]: t.colorSplit,
    [navVar.popupBg]: t.colorBgElevated,
    [navVar.indent]: '16px',
    [navVar.colorIcon]: t.colorTextSecondary,
    [navVar.colorSection]: t.colorTextDescription,
    [navVar.itemHeight]: `${itemH}px`,
    [navVar.itemRadius]: `${t.borderRadius}px`,
    [navVar.itemGap]: '8px',
    [navVar.itemFontSize]: `${t.fontSize}px`,
    [navVar.itemFontWeight]: 'normal',
    [navVar.itemFont]: `normal ${t.fontSize}px / ${t.lineHeight} ${t.fontFamily}`,
    [navVar.itemPadBlock]: '6px',
    [navVar.itemPadInline]: `${padInline}px`,
    [navVar.stackGap]: `${stackGap}px`,
    [navVar.groupGap]: '12px',
    [navVar.groupTitleFontSize]: `${t.fontSizeSM}px`,
    [navVar.groupTitleLineHeight]: '20px',
    [navVar.iconBox]: '18px',
    [navVar.iconSvgSize]: '18px',
    [navVar.arrowSize]: '12px',
    [navVar.collapsedItemSize]: '32px',
    [navVar.colorTextSubMenuSelected]: t.colorText,
  };
}

/**
 * 文档 `token.layout` 中 sider/header 的菜单字段 → `--pro-layout-nav-*`
 *（与站点 layout#token 说明一致，供自研 `ProLayoutNavMenu` 消费）
 */
function applyDocMenuTokenToNavVars(
  surface: 'sider' | 'header',
  layout: DeepPartial<LayoutDesignToken> | undefined,
  antdToken: GlobalToken,
): Record<string, string> {
  const base = defaultLayoutNavCssVars(surface, antdToken);
  if (!layout) return base;

  const out = { ...base };
  const set = (key: keyof typeof navVar, value: unknown) => {
    if (value === undefined || value === null) return;
    const str = String(value);
    if (str === '') return;
    out[navVar[key]] = str;
  };

  if (surface === 'sider') {
    const s = layout.sider;
    if (!s) return out;

    set('colorText', s.colorTextMenu);
    set('colorIcon', s.colorTextMenuSecondary);
    set('colorSection', s.colorTextMenuSecondary);
    set('colorTextSelected', s.colorTextMenuSelected);
    set('colorIconSelected', s.colorTextMenuSelected);
    set('colorTextHover', s.colorTextMenuItemHover);
    set('colorTextActive', s.colorTextMenuActive);
    set('colorBgHover', s.colorBgMenuItemHover);
    set('colorBgActive', s.colorBgMenuItemActive);
    set('colorBgSelected', s.colorBgMenuItemSelected);
    set('colorDivider', s.colorMenuItemDivider);
    set('popupBg', s.colorBgMenuItemCollapsedElevated);
    set('colorTextSubMenuSelected', s.colorTextSubMenuSelected);

    if (typeof s.menuHeight === 'number' && s.menuHeight > 0) {
      out[navVar.itemHeight] = `${s.menuHeight}px`;
    }
    return out;
  }

  const h = layout.header;
  if (!h) return out;

  set('colorText', h.colorTextMenu);
  set('colorIcon', h.colorTextMenuSecondary);
  set('colorSection', h.colorTextMenuSecondary);
  set('colorTextSelected', h.colorTextMenuSelected);
  set('colorIconSelected', h.colorTextMenuSelected);
  set('colorTextActive', h.colorTextMenuActive);
  set('colorTextHover', h.colorTextMenuActive);
  set('colorBgHover', h.colorBgMenuItemHover);
  set('colorBgSelected', h.colorBgMenuItemSelected);
  set('popupBg', h.colorBgMenuElevated);

  return out;
}

/**
 * 统一的缓动曲线：
 * - `easeStandard`：Material "Standard"（in-out），适合"切换式"视觉态（hover/selected 背景色、文字色）
 * - `easeOut`：Material "Emphasized Decelerate"，适合"入场/冒出"类 motion（如 icon scale）
 * 动效时长使用 antd `motionDurationMid`（与 `prefixCls` / CSS 变量前缀解耦）。
 */
const easeStandard = 'cubic-bezier(0.4, 0, 0.2, 1)';
const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * 菜单专用语义常量：命名 > 数字。抽出来有两个好处：
 * 1. 主区 + popup 同一规则复用同一组常量，改一处两处生效；
 * 2. 把视觉参数集中在顶部声明，读文件时不需要在 300 行下面找某个 0.45 是在说啥。
 */
/** 选中态字重（搭配 antd 体系 strong 语义） */
const FONT_WEIGHT_SELECTED = 600;
/** 收起态首字 chip 字重：加强但不到选中强度 */
const FONT_WEIGHT_COLLAPSED = 500;
/** 禁用态透明度：与 antd `disabledAlpha` 节奏一致 */
const DISABLED_OPACITY = 0.45;
/** submenu chevron 视觉弱化：不与主文案抢注意力 */
const ARROW_OPACITY = 0.6;
/** 键盘焦点环：2px 主色描边 + 1px 偏移，满足 WCAG 可见焦点 */
const FOCUS_OUTLINE = {
  width: 2,
  offset: 1,
} as const;
/** 水平顶栏行高/按钮高（与 antd 顶栏菜单一致） */
const HORIZONTAL_ROW_HEIGHT = 28;

const genProLayoutBaseMenuStyle = (
  token: ProLayoutBaseMenuToken,
  mode: string,
  aliasToken: ProAliasToken,
): CSSInterpolation => {
  const c = token.componentCls;
  const isHorizontal = mode.includes('horizontal');
  const durationMid = aliasToken.motionDurationMid;
  const rowTransition = [
    `background-color ${durationMid} ${easeStandard}`,
    `color ${durationMid} ${easeStandard}`,
    `box-shadow ${durationMid} ${easeStandard}`,
    `transform ${durationMid} ${easeOut}`,
    `font-weight ${durationMid} ${easeStandard}`,
  ].join(', ');
  const iconTransition = [
    `color ${durationMid} ${easeStandard}`,
    `transform ${durationMid} ${easeOut}`,
  ].join(', ');
  const arrowTransition = `transform ${durationMid} ${easeOut}`;
  const horizontalItemPaddingInline =
    typeof aliasToken.paddingSM === 'number' &&
    Number.isFinite(aliasToken.paddingSM)
      ? `${aliasToken.paddingSM}px`
      : '12px';
  const v = (name: keyof typeof navVar) => `var(${navVar[name]})`;
  const navCssVars = applyDocMenuTokenToNavVars(
    isHorizontal ? 'header' : 'sider',
    aliasToken.layout,
    aliasToken,
  );

  const rowItem: Record<string, unknown> = {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: v('itemHeight'),
    height: v('itemHeight'),
    minWidth: 0,
    margin: 0,
    paddingBlock: v('itemPadBlock'),
    paddingInline: v('itemPadInline'),
    borderRadius: v('itemRadius'),
    /**
     * 字号字重统一走 `itemFont` shorthand，业务侧覆盖 `--font-text-body-emphasized-base`
     * 即可同时改写字号、字重、行高、字族；fontSize/fontWeight 作为兼容兜底。
     */
    font: v('itemFont'),
    fontSize: v('itemFontSize'),
    fontWeight: v('itemFontWeight'),
    color: v('colorText'),
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    background: 'transparent',
    textAlign: 'start',
    transition: rowTransition,
    '&:focus-visible': {
      outline: `${FOCUS_OUTLINE.width}px solid ${v('colorTextSelected')}`,
      outlineOffset: FOCUS_OUTLINE.offset,
    },
  };

  const stack: Record<string, unknown> = {
    display: 'flex',
    flexDirection: 'column',
    gap: v('stackGap'),
    width: '100%',
  };

  /** Shared: submenu arrow base (reused in popup) */
  const arrowBase: Record<string, unknown> = {
    flex: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v('arrowSize'),
    height: v('arrowSize'),
    marginInlineStart: v('itemGap'),
    color: 'currentColor',
    opacity: ARROW_OPACITY,
    transition: arrowTransition,
    svg: { width: '100%', height: '100%', display: 'block' },
  };

  /** Shared: item-icon base (reused in popup) */
  const iconBase: Record<string, unknown> = {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    color: v('colorIcon'),
    fontSize: 'inherit',
    lineHeight: 0,
    transition: iconTransition,
    span: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'inherit',
      lineHeight: 0,
    },
    svg: { width: '1em', height: '1em', display: 'block' },
    img: {
      width: '1em',
      height: '1em',
      display: 'block',
      objectFit: 'contain',
    },
  };

  /** Shared: item-button & submenu-title interactive states (reused in popup) */
  const interactiveStates: Record<string, unknown> = {
    '&:hover:not([aria-disabled="true"])': {
      backgroundColor: v('colorBgHover'),
      color: v('colorTextHover'),
    },
    '&:active:not([aria-disabled="true"])': {
      backgroundColor: v('colorBgActive'),
      color: v('colorTextActive'),
    },
    '&[aria-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: DISABLED_OPACITY,
    },
  };

  /** Shared: button-level reset (appearance + font) */
  const buttonReset: Record<string, unknown> = {
    appearance: 'none',
    WebkitAppearance: 'none',
    font: v('itemFont'),
    fontFamily: 'inherit',
  };

  /** Shared: selected item-button rule */
  const selectedButtonRule = (prefix: string) => ({
    [`${prefix}-item--selected ${prefix}-item-button`]: {
      backgroundColor: v('colorBgSelected'),
      color: v('colorTextSelected'),
      fontWeight: FONT_WEIGHT_SELECTED,
      '&:hover:not([aria-disabled="true"])': {
        backgroundColor: v('colorBgSelectedHover'),
        color: v('colorTextSelected'),
      },
    },
  });

  /** Shared: child-selected submenu rules */
  const childSelectedRule = (prefix: string) => ({
    [`${prefix}-submenu--child-selected ${prefix}-submenu-title`]: {
      color: v('colorTextSelected'),
      fontWeight: FONT_WEIGHT_SELECTED,
    },
    [`${prefix}-submenu--child-selected ${prefix}-submenu-title ${prefix}-item-icon`]:
      {
        color: v('colorIconSelected'),
      },
  });

  /** Shared: icon size in button/submenu-title context */
  const iconSizeInButton = (prefix: string) => ({
    [`${prefix}-item-button ${prefix}-item-icon, ${prefix}-submenu-title ${prefix}-item-icon`]:
      {
        fontSize: v('iconSvgSize'),
        width: v('iconBox'),
        height: v('iconBox'),
      },
  });

  /** Shared: selected icon rule */
  const selectedIconRule = (prefix: string) => ({
    [`${prefix}-item--selected ${prefix}-item-icon`]: {
      color: v('colorIconSelected'),
    },
  });

  return {
    [c]: {
      ...navCssVars,
      background: 'transparent',
      border: 'none',
      width: '100%',
      color: v('colorText'),

      [`${c}-list`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        ...(!isHorizontal ? stack : {}),
      },

      [`${c}-list--root`]: !isHorizontal ? { flex: 1, minHeight: 0 } : {},

      /**
       * 外层 `<li>` 仅承担布局/缩进角色：
       * - 视觉态（hover / selected / disabled）通过组合选择器作用到内层 `${c}-item-button`，
       *   确保浏览器默认 `button` 边框/背景被完全 reset；
       * - 缩进通过内联 `paddingInlineStart` 写在 `<li>` 上，避免与 `${c}-item-button` 的
       *   `paddingInline` shorthand 冲突。
       */
      [`${c}-item`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },

      [`${c}-item-button`]: {
        ...rowItem,
        ...buttonReset,
        cursor: 'pointer',
        [`> *`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
        ...interactiveStates,
      },

      /** Firefox 旧版本：button 内部的虚线焦点框 */
      [`${c}-item-button::-moz-focus-inner, ${c}-submenu-title::-moz-focus-inner`]:
        {
          border: 0,
          padding: 0,
        },

      ...selectedButtonRule(c),

      /** 禁用 li 的兼容（部分场景外层 li 也带 disabled 修饰） */
      [`${c}-item--disabled ${c}-item-button`]: {
        cursor: 'not-allowed',
        opacity: DISABLED_OPACITY,
      },

      [`${c}-submenu`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'relative',
      },

      [`${c}-submenu-title`]: {
        ...rowItem,
        ...buttonReset,
        [`> :first-child`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
        '&:hover': {
          backgroundColor: v('colorBgHover'),
          color: v('colorTextHover'),
        },
        '&:active:not(:disabled)': {
          backgroundColor: v('colorBgActive'),
          color: v('colorTextActive'),
        },
      },

      ...childSelectedRule(c),

      [`${c}-submenu-arrow`]: arrowBase,

      /** 展开态：inline 模式下旋转 90deg（chevron 朝下），与常见菜单组件一致 */
      [`${c}-submenu-title--open ${c}-submenu-arrow`]: {
        transform: 'rotate(90deg)',
      },

      /** 子菜单展开列表（原 submenu-inline，类名缩短避免与 li.submenu 语义重复） */
      [`${c}-submenu-children`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingBlockStart: v('stackGap'),
        ...stack,
        [`> li`]: {
          listStyle: 'none',
          display: 'block',
          width: '100%',
          minWidth: 0,
        },
      },

      [`${c}-group`]: {
        ...stack,
      },

      /** 分组之间默认 12px，组内项仍用 stackGap（4px）；通过 `--pro-layout-nav-group-gap` 覆盖 */
      [`${c}-group + ${c}-group`]: {
        marginBlockStart: v('groupGap'),
      },

      [`${c}-group-title`]: {
        margin: 0,
        paddingInline: v('itemPadInline'),
        paddingBlockStart: v('stackGap'),
        paddingBlockEnd: v('stackGap'),
        fontSize: v('groupTitleFontSize'),
        fontWeight: v('itemFontWeight'),
        lineHeight: v('groupTitleLineHeight'),
        color: v('colorSection'),
      },

      [`${c}-group-list`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        ...stack,
      },

      [`${c}-item-title`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: v('itemGap'),
        width: '100%',
        minWidth: 0,
        [`${c}-item-text`]: {
          flex: 1,
          minWidth: 0,
          textAlign: 'start',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        '&-collapsed': {
          width: 'fit-content',
          maxWidth: '100%',
          minWidth: v('iconBox'),
          height: 'auto',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          [`${c}-item-icon`]: {
            width: v('iconBox'),
            height: v('iconBox'),
          },
          [`${c}-item-text-has-icon`]: { display: 'none' },
        },
        '&-collapsed-level-0': {
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },
        [`&${c}-group-item-title`]: {
          gap: v('itemGap'),
          height: 18,
          overflow: 'hidden',
        },
        [`&${c}-item-collapsed-show-title`]: {
          lineHeight: '16px',
          gap: 0,
          [`&${c}-item-title-collapsed`]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            [`${c}-item-text`]: {
              display: 'inline',
              textAlign: 'start',
              fontSize: v('groupTitleFontSize'),
              maxHeight: 12,
              lineHeight: '12px',
              marginBlockStart: 4,
            },
          },
        },
      },

      [`${c}-item-icon`]: iconBase,
      ...iconSizeInButton(c),
      ...selectedIconRule(c),

      [`${c}-divider`]: {
        listStyle: 'none',
        height: 1,
        margin: 0,
        borderBlockEnd: `1px solid ${v('colorDivider')}`,
      },

      [`${c}-group-divider`]: {
        color: v('colorSection'),
        fontSize: v('groupTitleFontSize'),
        lineHeight: 20,
      },

      /** `--collapsed` 与根 `nav` 同元素，须用 `&--collapsed` 复合选择器，勿写成后代 `${c} ${c}--collapsed` */
      '&--collapsed': {
        /**
         * 收起态：button 仅展示 icon，整体收紧成 `collapsedItemSize × collapsedItemSize`
         * 的正方形（默认 28px，可通过 `--pro-layout-nav-collapsed-item-size` 覆盖）：
         * 1. 外层 `<li>`：宽度跟随 button，自身在 nav 里水平居中；
         * 2. button 自身：宽高都固定为 collapsedItemSize，padding 全部清零，
         *    内容用 `justifyContent: center` + `alignItems: center` 居中；
         * 3. `> :first-child`（item-title）不再 flex:1，自然收缩；
         * 4. icon 视觉尺寸仍跟随 `iconSvgSize`（默认 18px），被 button 包裹居中。
         */
        [`${c}-item, ${c}-submenu`]: {
          width: v('collapsedItemSize'),
          marginInline: 'auto',
          marginBlock: v('stackGap'),
          padding: 0,
        },

        [`${c}-item-button, ${c}-submenu-title`]: {
          width: v('collapsedItemSize'),
          height: v('collapsedItemSize'),
          minHeight: v('collapsedItemSize'),
          paddingBlock: 0,
          paddingInline: 0,
          justifyContent: 'center',
          alignItems: 'center',
          [`> :first-child`]: {
            flex: 'none',
            width: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        /**
         * 收起态渲染契约：**有 icon 展示 icon；无 icon 时退化为首字 chip**。
         * - 数据层（`menuTree.tsx`）已按 `hasIcon` 决定渲染 `iconNode` 还是 `fallbackLetter`，
         *   并给 label 打上 `-item-text-has-icon` 类名；
         * - CSS 这里只做两件事：
         *   1. 把 item-title 做成居中的 flex 容器，icon/首字都在 collapsedItemSize 正方形内居中；
         *   2. 有 icon 时隐藏 label（由 `-item-text-has-icon: display:none` 负责）。
         *   **不再**用 `width/overflow:hidden + nowrap` 暴力裁 label 做"首字 chip"，
         *   否则 icon 会被一起挤掉。
         */
        [`${c}-item-title`]: {
          width: v('collapsedItemSize'),
          maxWidth: v('collapsedItemSize'),
          height: v('collapsedItemSize'),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 0,
          fontWeight: FONT_WEIGHT_COLLAPSED,
          /** 无 icon 时展示首字（`collapsedTitleLetter` 已只返回 1 个字符），
           *  用 nowrap 保证不会在 28px 容器里换行；但**不**用 overflow:hidden，
           *  避免 svg 因定位/padding 在 1px 边缘被误裁。 */
          whiteSpace: 'nowrap',
          [`${c}-item-label`]: {
            /** 业务 label 里可能包含 icon 等复杂节点，限制成单行文本，
             *  配合父容器的 justify/align center 呈现首字 chip。 */
            overflow: 'hidden',
            textOverflow: 'clip',
            maxWidth: '100%',
          },
          /** 有 icon 的项：label 整块隐藏，仅展示 icon */
          [`${c}-item-text-has-icon`]: {
            display: 'none',
          },
        },
        [`${c}-submenu${c}-submenu-open > ${c}-submenu-title`]: {
          backgroundColor: v('colorBgSelected'),
          borderRadius: v('itemRadius'),
        },
        /**
         * 收起态：父级 submenu 含选中子项时，标题与 leaf 选中态对齐（背景 + 主色 + 字重），
         * 便于在窄方块内辨认；左侧竖线仍仅由最终选中的叶子 `item--selected` 展示。
         * 使用后代选择器：popup 模式下 trigger 与 `li.submenu` 之间还有 Popover 包装层。
         */
        [`${c}-submenu--child-selected ${c}-submenu-title`]: {
          backgroundColor: v('colorBgSelected'),
          color: v('colorTextSelected'),
          fontWeight: FONT_WEIGHT_SELECTED,
          borderRadius: v('itemRadius'),
          '&:hover:not(:disabled)': {
            backgroundColor: v('colorBgSelectedHover'),
            color: v('colorTextSelected'),
          },
        },
        [`${c}-submenu--child-selected ${c}-submenu-title ${c}-item-icon`]: {
          color: v('colorIconSelected'),
        },
        /**
         * 收起态隐藏 submenu 指示器：
         * - 收起时 button 仅显示 icon，没有文案，箭头会变成视觉噪点；
         * - popup 是否会弹出可由 hover 行为本身体现，不需要额外指示器。
         */
        [`${c}-submenu-arrow`]: {
          display: 'none',
        },
      },
    },

    /** 侧栏收起：不展示分组标题（完整选择器，避免嵌套编译差异） */
    [`${c}--collapsed ${c}-group ${c}-group-title`]: {
      display: 'none',
    },

    [`${c}:not(${c}--horizontal)`]: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      /** 根 `nav` 下多个顶级 `li`/片段之间的纵向间距（扁平 DOM 无外包 `ul`） */
      gap: v('stackGap'),
      /**
       * 根列表 / 分组列表下的 `li` 必须拉满行宽：`flex` 子项 `min-width:auto` 时
       * 可能按内容收缩，导致 `<button width:100%>` 仍只有「icon+文字」宽，整行右侧成死区。
       */
      [`&${c}-list > li`]: {
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
      },
      [`& ${c}-group-list > li`]: {
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
      },
    },

    [`${c}--collapsed:not(${c}--horizontal)`]: {
      [`&${c}-list > li, & ${c}-group-list > li`]: {
        width: v('collapsedItemSize'),
        marginInline: 'auto',
      },
    },

    [`${c}--horizontal`]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: v('stackGap'),
      minWidth: 0,
      overflowInline: 'hidden',
      overflowBlock: 'visible',
      /** 水平顶栏：根 `nav` 同时带 `-list`，顶级项单行排布；放不下的一级项收入「更多」Popover */
      [`&${c}-list`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        gap: v('stackGap'),
        minWidth: 0,
      },
      /** 离屏测量：不占布局、不参与交互 */
      '&[data-pro-layout-horizontal-measure]': {
        position: 'fixed',
        insetInlineStart: -10000,
        insetBlockStart: 0,
        zIndex: -1,
        visibility: 'hidden',
        pointerEvents: 'none',
        margin: 0,
        padding: 0,
        border: 'none',
        width: 'max-content',
        maxWidth: 'none',
        overflow: 'visible',
      },
      /**
       * 「更多」在子级 `li` 上（`nav` 才带 `--horizontal`），须用后代选择器，勿写 `&-overflow-more`
       * 否则会变成要求同一元素同时带 `--horizontal` 与 `-overflow-more`，规则永远不命中。
       */
      [`${c}-overflow-more`]: {
        display: 'inline-block',
        flexShrink: 0,
        listStyle: 'none',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        '&::marker': {
          content: 'none',
          display: 'none',
        },
      },
      /**
       * 顶部一级 leaf：`padding` 必须落在内层 `button` 上，不能写在外层 `li`。
       * 否则点到 `li` 的 padding 区时事件到不了 `button`，表现为「点了没反应」
       *（与 `ProLayoutNavMenu` 里「缩进只写 li」的注释同理，只是横向是左右死区）。
       */
      [`${c}-item`]: {
        width: 'auto',
        minHeight: HORIZONTAL_ROW_HEIGHT,
        height: HORIZONTAL_ROW_HEIGHT,
        whiteSpace: 'nowrap',
        paddingBlock: 0,
        paddingInline: 0,
        [`> *`]: {
          minHeight: HORIZONTAL_ROW_HEIGHT,
          height: HORIZONTAL_ROW_HEIGHT,
        },
      },
      [`${c}-item ${c}-item-button`]: {
        paddingInline: horizontalItemPaddingInline,
      },
      [`${c}-submenu`]: { display: 'inline-block' },
      [`${c}-submenu-title`]: {
        width: 'auto',
        minHeight: HORIZONTAL_ROW_HEIGHT,
        height: HORIZONTAL_ROW_HEIGHT,
        paddingBlock: 0,
        paddingInline: horizontalItemPaddingInline,
        [`> *`]: {
          minHeight: HORIZONTAL_ROW_HEIGHT,
          height: HORIZONTAL_ROW_HEIGHT,
        },
      },
      /**
       * 顶栏：一级 submenu 或「更多」在子树含选中项时，标题区与 antd Menu
       * overflowedIndicator 一致（浅色底 + 主色字），仅靠字色在固定行高内不明显。
       */
      [`${c}-submenu${c}-submenu--child-selected ${c}-submenu-title, ${c}-overflow-more${c}-submenu--child-selected ${c}-submenu-title`]:
        {
          backgroundColor: v('colorBgSelected'),
          color: v('colorTextSelected'),
          fontWeight: FONT_WEIGHT_SELECTED,
          borderRadius: v('itemRadius'),
          '&:hover:not(:disabled)': {
            backgroundColor: v('colorBgSelectedHover'),
            color: v('colorTextSelected'),
          },
        },
      [`${c}-overflow-more${c}-submenu--child-selected ${c}-submenu-title ${c}-item-title`]:
        {
          color: 'inherit',
        },
      [`${c}-submenu${c}-submenu--child-selected ${c}-submenu-title ${c}-item-icon`]:
        {
          color: v('colorIconSelected'),
        },
      [`${c}-item-title`]: {
        minHeight: HORIZONTAL_ROW_HEIGHT,
        height: HORIZONTAL_ROW_HEIGHT,
        lineHeight: `${HORIZONTAL_ROW_HEIGHT}px`,
      },
      [`${c}-item-title ${c}-item-text`]: {
        lineHeight: `${HORIZONTAL_ROW_HEIGHT}px`,
      },
      [`${c}-submenu-popup`]: {
        [`${c}-item-title`]: { alignItems: 'flex-start' },
      },

      /**
       * 顶栏 horizontal 模式下的一级 submenu 触发器：箭头默认朝下（rotate 90deg），
       * 提示「向下展开 popup」；popup 已展开时不旋转，避免出现指向反向的视觉。
       */
      [`${c}-submenu-title ${c}-submenu-arrow`]: {
        transform: 'rotate(90deg)',
      },
      [`${c}-submenu-title--open ${c}-submenu-arrow`]: {
        transform: 'rotate(90deg)',
      },
    },

    [`${c}-link-list`]: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },

    [`${c}-link-item`]: {
      listStyle: 'none',
      paddingBlock: v('stackGap'),
      paddingInlineStart: v('indent'),
    },

    [`${c}-link`]: { display: 'block' },

    /**
     * Popup 浮层（antd `Popover` 的 `overlayClassName`）。
     *
     * 关键点：
     * 1. 此选择器必须**位于顶级**（不嵌套在 `[c]` 内），因为 `Popover` 的 overlay 直接挂
     *    在 `document.body` 下，不在 nav 子树里，与 `[c]` 没有祖先关系；
     * 2. 主 nav 子树内的 reset/视觉规则（`list-style:none`、`item-button`、`submenu-title`、
     *    `item-icon`、`item-title` 等）popup 内**全部接收不到**，所以这里必须把 popup 内
     *    用到的规则原样补齐一份；
     * 3. 注入 `--pro-layout-nav-*` token 默认值（与 sider 一致），保证业务侧外层即使没
     *    透传 token，popup 内仍有合理的兜底。
     */
    /**
     * Popup 浮层（antd Popover overlayClassName）：挂在 document.body，
     * 不在 nav 子树内，须独立注入 nav CSS vars + 补齐视觉规则。
     */
    [`${c}-submenu-popup`]: {
      ...createSubmenuPopupScrollbar(),
      ...applyDocMenuTokenToNavVars(
        isHorizontal ? 'header' : 'sider',
        aliasToken.layout,
        aliasToken,
      ),
      color: v('colorText'),

      ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingInlineStart: 0,
        ...stack,
      },
      li: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
      },

      [`${c}-submenu-children`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingBlockStart: v('stackGap'),
        ...stack,
      },

      [`${c}-item`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },

      [`${c}-item-button, ${c}-submenu-title`]: {
        ...rowItem,
        ...buttonReset,
        ...interactiveStates,
        transition: rowTransition,
      },

      /**
       * Submenu 标题专属：第一个子节点拿走剩余空间，arrow 贴右。
       * 不可应用到 leaf item-button —— 纯文本节点会被 flex 塌缩。
       */
      [`${c}-submenu-title`]: {
        [`> :first-child`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
      },

      [`${c}-submenu-arrow`]: arrowBase,
      [`${c}-submenu-title--open ${c}-submenu-arrow`]: {
        transform: 'rotate(90deg)',
      },
      [`${c}-submenu${c}-submenu--overflow-vertical-flyout ${c}-submenu-title ${c}-submenu-arrow`]:
        { transform: 'none' },
      [`${c}-submenu${c}-submenu--overflow-vertical-flyout ${c}-submenu-title--open ${c}-submenu-arrow`]:
        { transform: 'none' },

      ...selectedButtonRule(c),
      ...childSelectedRule(c),

      [`${c}-submenu${c}-submenu--overflow-vertical-flyout${c}-submenu--child-selected ${c}-submenu-title`]:
        {
          backgroundColor: v('colorBgSelected'),
          color: v('colorTextSelected'),
          fontWeight: FONT_WEIGHT_SELECTED,
          borderRadius: v('itemRadius'),
          '&:hover:not(:disabled)': {
            backgroundColor: v('colorBgSelectedHover'),
            color: v('colorTextSelected'),
          },
        },
      [`${c}-submenu${c}-submenu--overflow-vertical-flyout${c}-submenu--child-selected ${c}-submenu-title ${c}-item-title`]:
        { color: 'inherit' },
      [`${c}-submenu${c}-submenu--overflow-vertical-flyout${c}-submenu--child-selected ${c}-submenu-title ${c}-item-icon`]:
        { color: v('colorIconSelected') },

      [`${c}-item-title`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: v('itemGap'),
        width: '100%',
        minWidth: 0,
      },

      [`${c}-item-label`]: {
        flex: 1,
        minWidth: 0,
        textAlign: 'start',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      [`${c}-item-icon`]: iconBase,
      ...iconSizeInButton(c),
      ...selectedIconRule(c),

      [`${c}-group`]: { ...stack },
      [`${c}-group + ${c}-group`]: { marginBlockStart: v('groupGap') },
      [`&& ${c}-group-title`]: {
        margin: 0,
        paddingInlineStart: `calc(${v('itemPadInline')} + ${v('iconBox')} + ${v('itemGap')})`,
        paddingInlineEnd: v('itemPadInline'),
        paddingBlockStart: v('stackGap'),
        paddingBlockEnd: v('stackGap'),
        fontSize: v('groupTitleFontSize'),
        fontWeight: v('itemFontWeight'),
        lineHeight: v('groupTitleLineHeight'),
        color: v('colorSection'),
      },
    },

    /** Firefox 旧版本：popup 内 button 焦点框 reset */
    [`${c}-submenu-popup ${c}-item-button::-moz-focus-inner, ${c}-submenu-popup ${c}-submenu-title::-moz-focus-inner`]:
      {
        border: 0,
        padding: 0,
      },
  } as CSSInterpolation;
};

export function useStyle(prefixCls: string, mode: MenuMode | undefined) {
  const resolvedMode = mode ?? 'vertical';
  const styleRegisterName = `ProLayoutBaseMenu-${prefixCls}-${resolvedMode}`;
  return useAntdStyle(styleRegisterName, (proToken: ProAliasToken) => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      componentCls: `.${prefixCls}`,
    };
    return [
      genProLayoutBaseMenuStyle(proLayoutMenuToken, resolvedMode, proToken),
    ];
  });
}
