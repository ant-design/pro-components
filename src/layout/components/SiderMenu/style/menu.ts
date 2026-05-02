import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { CSSProperties } from 'react';
import type { GenerateStyle } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
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
} as const;

export function getProLayoutSiderCssVarsStyle(): CSSProperties {
  return {
    [proLayoutSiderVar.bg]: '#f7f8f9',
    [proLayoutSiderVar.colorText]: 'var(--ant-color-text-secondary)',
    [proLayoutSiderVar.colorTextTitle]: 'var(--ant-color-text)',
    [proLayoutSiderVar.colorTextSecondary]: 'var(--ant-color-text-tertiary)',
    [proLayoutSiderVar.paddingInlineMenu]: '8px',
    [proLayoutSiderVar.paddingBlockMenu]: '12px',
    [proLayoutSiderVar.borderRadius]: 'var(--ant-border-radius)',
    [proLayoutSiderVar.colorBgHover]: 'var(--ant-color-fill-secondary)',
    [proLayoutSiderVar.fontSize]: 'var(--ant-font-size)',
  } as CSSProperties;
}

/**
 * 主导航语义 token，统一在根 `nav` 上注入，子选择器只用 `var(--pro-layout-nav-*)`
 *
 * 设计原则：
 * 1. 所有视觉值都暴露为 `--pro-layout-nav-*` CSS 变量；
 * 2. 默认值优先映射到外部「业务语义 token」（如 `--color-gray-text-default`、
 *    `--color-primary-control-fill-ghost-active`、`--font-text-body-emphasized-base`），
 *    业务侧只要在外层注入这套语义 token，菜单视觉就会自动对齐；
 * 3. 业务语义 token 缺失时，再 fallback 到 antd token 或硬编码值，保证 pro-components
 *    单跑文档站时仍然可用。
 */
const navVar = {
  colorText: '--pro-layout-nav-color-text',
  colorBgHover: '--pro-layout-nav-color-bg-hover',
  colorTextHover: '--pro-layout-nav-color-text-hover',
  colorBgSelected: '--pro-layout-nav-color-bg-selected',
  colorTextSelected: '--pro-layout-nav-color-text-selected',
  /** 选中态的图标颜色，与选中态字色解耦（SidebarMenu 使用 primary-text-secondary） */
  colorIconSelected: '--pro-layout-nav-color-icon-selected',
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
  /** 图标容器尺寸，默认 24px（svg 自身按 18px 渲染） */
  iconBox: '--pro-layout-nav-icon-box-size',
  iconSvgSize: '--pro-layout-nav-icon-svg-size',
  /** submenu 右侧指示器（chevron）尺寸，默认 12px */
  arrowSize: '--pro-layout-nav-arrow-size',
} as const;

function layoutNavCssVars(surface: 'sider' | 'header'): Record<string, string> {
  const padInline = 8;
  const stackGap = 4;
  const itemH = 32;
  if (surface === 'sider') {
    return {
      [navVar.colorText]:
        'var(--color-gray-text-default, rgba(9, 30, 66, 0.86))',
      [navVar.colorBgHover]:
        'var(--color-gray-control-fill-hover, rgba(0, 0, 0, 0.04))',
      [navVar.colorTextHover]:
        'var(--color-gray-text-default, rgba(9, 30, 66, 0.86))',
      [navVar.colorBgSelected]:
        'var(--color-primary-control-fill-ghost-active, rgba(29, 122, 252, 0.23))',
      [navVar.colorTextSelected]: 'var(--color-primary-text-default, #0055cc)',
      [navVar.colorIconSelected]:
        'var(--color-primary-text-secondary, var(--color-primary-text-default, #0055cc))',
      [navVar.colorDivider]: 'var(--ant-color-split)',
      [navVar.popupBg]: 'var(--ant-color-bg-elevated)',
      [navVar.indent]: '16px',
      [navVar.colorIcon]:
        'var(--color-gray-text-disabled, rgba(9, 30, 66, 0.31))',
      [navVar.colorSection]:
        'var(--color-gray-text-light, rgba(9, 30, 66, 0.49))',
      [navVar.itemHeight]: `${itemH}px`,
      [navVar.itemRadius]: '6px',
      [navVar.itemGap]: '8px',
      [navVar.itemFontSize]: '14px',
      [navVar.itemFontWeight]: 'normal',
      [navVar.itemFont]:
        'var(--font-text-body-emphasized-base, 500 14px / 22px var(--ant-font-family))',
      [navVar.itemPadBlock]: '6px',
      [navVar.itemPadInline]: `${padInline}px`,
      [navVar.stackGap]: `${stackGap}px`,
      [navVar.groupGap]: '12px',
      [navVar.groupTitleFontSize]: 'calc(var(--ant-font-size, 14px) - 1px)',
      [navVar.groupTitleLineHeight]: '20px',
      [navVar.iconBox]: '24px',
      [navVar.iconSvgSize]: '18px',
      [navVar.arrowSize]: '12px',
    };
  }
  return {
    [navVar.colorText]:
      'var(--color-gray-text-default, var(--ant-color-text-secondary))',
    [navVar.colorBgHover]:
      'var(--color-gray-control-fill-hover, var(--ant-color-fill-secondary))',
    [navVar.colorTextHover]:
      'var(--color-gray-text-default, var(--ant-color-text))',
    [navVar.colorBgSelected]:
      'var(--color-primary-control-fill-ghost-active, var(--ant-color-fill-tertiary))',
    [navVar.colorTextSelected]:
      'var(--color-primary-text-default, var(--ant-color-text))',
    [navVar.colorIconSelected]:
      'var(--color-primary-text-secondary, var(--color-primary-text-default, var(--ant-color-text)))',
    [navVar.colorDivider]: 'var(--ant-color-split)',
    [navVar.popupBg]: 'var(--ant-color-bg-elevated)',
    [navVar.indent]: '16px',
    [navVar.colorIcon]:
      'var(--color-gray-text-light, var(--ant-color-text-secondary))',
    [navVar.colorSection]:
      'var(--color-gray-text-light, var(--ant-color-text-description))',
    [navVar.itemHeight]: `${itemH}px`,
    [navVar.itemRadius]: '6px',
    [navVar.itemGap]: '8px',
    [navVar.itemFontSize]: 'var(--ant-font-size)',
    [navVar.itemFontWeight]: 'normal',
    [navVar.itemFont]:
      'var(--font-text-body-emphasized-base, normal var(--ant-font-size) / var(--ant-line-height) var(--ant-font-family))',
    [navVar.itemPadBlock]: '6px',
    [navVar.itemPadInline]: `${padInline}px`,
    [navVar.stackGap]: `${stackGap}px`,
    [navVar.groupGap]: '12px',
    [navVar.groupTitleFontSize]: 'var(--ant-font-size-sm)',
    [navVar.groupTitleLineHeight]: '20px',
    [navVar.iconBox]: '24px',
    [navVar.iconSvgSize]: '18px',
    [navVar.arrowSize]: '12px',
  };
}

const genProLayoutBaseMenuStyle: GenerateStyle<ProLayoutBaseMenuToken> = (
  token,
  mode,
) => {
  const c = token.componentCls;
  const isHorizontal = mode.includes('horizontal');
  const v = (name: keyof typeof navVar) => `var(${navVar[name]})`;

  const rowItem: Record<string, unknown> = {
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
    transition: `background-color var(--ant-motion-duration-mid, 0.2s), color var(--ant-motion-duration-mid, 0.2s)`,
    '&:focus-visible': {
      outline: `2px solid var(--ant-color-primary)`,
      outlineOffset: 1,
    },
  };

  const stack: Record<string, unknown> = {
    display: 'flex',
    flexDirection: 'column',
    gap: v('stackGap'),
    width: '100%',
  };

  return {
    [c]: {
      ...(isHorizontal
        ? layoutNavCssVars('header')
        : layoutNavCssVars('sider')),
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

      /** 真正承载点击/键盘交互与视觉的 `<button>`：完整 reset 浏览器默认样式 */
      [`${c}-item-button`]: {
        ...rowItem,
        /** 显式 reset：避免 UA 默认 `button` 的浅灰背景 / 1px border / 字体继承差异 */
        appearance: 'none',
        WebkitAppearance: 'none',
        font: v('itemFont'),
        fontFamily: 'inherit',
        /** 标题区（icon+文案）直接作为子节点，省一层 wrapper */
        [`> *`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
        '&:hover:not(:disabled)': {
          backgroundColor: v('colorBgHover'),
          color: v('colorTextHover'),
        },
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.45,
        },
      },

      /** Firefox 旧版本：button 内部的虚线焦点框 */
      [`${c}-item-button::-moz-focus-inner, ${c}-submenu-title::-moz-focus-inner`]:
        {
          border: 0,
          padding: 0,
        },

      /** 选中态：作用在外层 li 的修饰符上，组合选中 button */
      [`${c}-item--selected ${c}-item-button`]: {
        backgroundColor: v('colorBgSelected'),
        color: v('colorTextSelected'),
      },

      /** 禁用 li 的兼容（部分场景外层 li 也带 disabled 修饰） */
      [`${c}-item--disabled ${c}-item-button`]: {
        cursor: 'not-allowed',
        opacity: 0.45,
      },

      [`${c}-submenu`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'relative',
      },

      /**
       * Submenu 标题本身就是 `<button>`：与 `${c}-item-button` 一样需要完整 reset 浏览器
       * 默认样式，否则会出现外层灰边框（即图中的问题）。
       *
       * DOM：`<button> [item-title] [submenu-arrow] </button>`
       * - `[item-title]`（第一个子节点）拿走剩余空间，承载 icon + label；
       * - `[submenu-arrow]` 自然贴右，不参与 flex 拉伸。
       */
      [`${c}-submenu-title`]: {
        ...rowItem,
        appearance: 'none',
        WebkitAppearance: 'none',
        font: v('itemFont'),
        fontFamily: 'inherit',
        /** 第一个子节点（item-title）拿走剩余空间；其它子节点（如 arrow）自适应 */
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
      },

      /**
       * Submenu 右侧指示器（chevron）。
       * - 容器尺寸跟随 `--pro-layout-nav-arrow-size`（默认 12px）；
       * - 颜色继承父级（与文字色一致），选中态会自动跟随；
       * - 朝向：
       *   * 默认（垂直 inline）：朝右（rotate(0deg)），展开时旋转 90deg 朝下；
       *   * 水平顶栏：默认朝下（rotate(90deg)），展开时旋转 -90deg 收回为朝上；
       *   * popup 模式（侧栏 collapsed 一级、horizontal 顶栏一级 popup）：始终朝右
       *     提示「点击会弹出浮层」，由各自上下文规则覆盖。
       */
      [`${c}-submenu-arrow`]: {
        flex: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: v('arrowSize'),
        height: v('arrowSize'),
        marginInlineStart: v('itemGap'),
        color: 'currentColor',
        opacity: 0.6,
        transition: `transform var(--ant-motion-duration-mid, 0.2s)`,
        svg: {
          width: '100%',
          height: '100%',
          display: 'block',
        },
      },

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
              fontSize: 'calc(var(--ant-font-size, 14px) - 1px)',
              maxHeight: 12,
              lineHeight: '12px',
              marginBlockStart: 4,
            },
          },
        },
      },

      [`${c}-item-icon`]: {
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: v('colorIcon'),
        /**
         * 关键设计：icon 尺寸跟随**外层文本的 fontSize**，而不是强制 18px。
         * - 一级菜单（item-button 字号 14px → 用 `--pro-layout-nav-icon-svg-size` 单独放大到 18px）
         * - group-title（13px）下，svg 用 `1em` 自然跟随，视觉上与标题等高
         *
         * 因此：
         * 1. 容器自身宽高用 `1em`（跟随父级 fontSize），不再写死 24px；
         * 2. fontSize 设为 `inherit`（默认就是 inherit，显式写一遍提示语义）；
         * 3. svg/anticon 用 `1em`，让字号链路自然传导。
         *
         * 一级菜单想要 18px 的图标，由 `${c}-item-button ${c}-item-icon`、
         * `${c}-submenu-title ${c}-item-icon` 把 fontSize 单独放大到 `iconSvgSize`。
         */
        fontSize: 'inherit',
        lineHeight: 0,
        span: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'inherit',
          lineHeight: 0,
        },
        svg: {
          width: '1em',
          height: '1em',
          display: 'block',
        },
        img: {
          width: '1em',
          height: '1em',
          display: 'block',
          objectFit: 'contain',
        },
      },

      /**
       * 一级菜单与 submenu 标题：把 icon 的 fontSize 单独放大到 `iconSvgSize`（默认 18px）。
       * 这样：
       * - leaf / submenu 标题里 icon = 18px（与 SidebarMenu 一致）
       * - group-title 里 icon = 13px（继承 group title 字号，与标题等高）
       */
      [`${c}-item-button ${c}-item-icon, ${c}-submenu-title ${c}-item-icon`]: {
        fontSize: v('iconSvgSize'),
        width: v('iconBox'),
        height: v('iconBox'),
      },

      /** 选中态图标颜色单独走 token，保持与字色解耦（SidebarMenu 风格） */
      [`${c}-item--selected ${c}-item-icon`]: {
        color: v('colorIconSelected'),
      },

      [`${c}-divider`]: {
        listStyle: 'none',
        height: 1,
        margin: 0,
        borderBlockEnd: `1px solid ${v('colorDivider')}`,
      },

      [`${c}-group-divider`]: {
        color: `var(--ant-color-text-secondary)`,
        fontSize: 'calc(var(--ant-font-size, 14px) - 1px)',
        lineHeight: 20,
      },

      /** `--collapsed` 与根 `nav` 同元素，须用 `&--collapsed` 复合选择器，勿写成后代 `${c} ${c}--collapsed` */
      '&--collapsed': {
        [`${c}-item`]: {
          paddingBlock: 0,
          paddingInlineStart: v('itemPadInline'),
          paddingInlineEnd: 0,
          marginBlock: 'var(--ant-margin-xxs, 4px)',
        },
        [`${c}-submenu-title`]: {
          paddingBlock: 0,
          paddingInlineStart: v('itemPadInline'),
          paddingInlineEnd: 0,
        },
        [`${c}-item-title`]: {
          width: 'fit-content',
          maxWidth: '100%',
          overflow: 'visible',
        },
        [`${c}-submenu${c}-submenu-open > ${c}-submenu-title`]: {
          backgroundColor: v('colorBgSelected'),
          borderRadius: v('itemRadius'),
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
    },

    [`${c}--horizontal`]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: v('stackGap'),
      /** 水平顶栏：根 `nav` 同时带 `-list`，顶级项横向排布 */
      [`&${c}-list`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: v('stackGap'),
      },
      /** 顶部模式行高 28px（与常见顶栏菜单一致） */
      [`${c}-item`]: {
        width: 'auto',
        minHeight: 28,
        height: 28,
        whiteSpace: 'nowrap',
        paddingBlock: 0,
        paddingInline: 'var(--ant-padding-sm, 12px)',
        [`> *`]: {
          minHeight: 28,
          height: 28,
        },
      },
      [`${c}-submenu`]: { display: 'inline-block' },
      [`${c}-submenu-title`]: {
        width: 'auto',
        minHeight: 28,
        height: 28,
        paddingBlock: 0,
        paddingInline: 'var(--ant-padding-sm, 12px)',
        [`> *`]: {
          minHeight: 28,
          height: 28,
        },
      },
      [`${c}-item-title`]: {
        minHeight: 28,
        height: 28,
        lineHeight: '28px',
      },
      [`${c}-item-title ${c}-item-text`]: {
        lineHeight: '28px',
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

    /**
     * popup 模式（侧栏 collapsed 一级 / horizontal 顶栏一级）下，
     * 一级 submenu 触发器箭头朝右，提示「点击会向侧弹出浮层」。
     * 注意：horizontal 块上面已单独覆盖为朝下，这里仅对 collapsed 侧栏生效。
     */
    [`${c}--collapsed ${c}-submenu-title ${c}-submenu-arrow`]: {
      transform: 'rotate(0deg)',
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
    [`${c}-submenu-popup`]: {
      ...layoutNavCssVars('sider'),
      color: v('colorText'),

      /**
       * 视觉相关：
       * - 内层 padding / maxHeight / overflow 已通过 antd Popover 原生 API
       *   （`styles.container` / `styles.root`）配置，这里不再覆盖 `.ant-popover-inner`；
       * - 背景色 / 圆角走 antd Popover 自带 token（`colorBgElevated` /
       *   `borderRadiusLG`），与全局主题保持一致；
       * - 最小宽度 / 业务私有 token 通过 popup 容器的 `${c}-item-button` 等子规则
       *   生效，无需额外覆盖。
       */

      /**
       * 列表 reset：popup 内 `<ul>` / `<li>` 默认会带 disc 圆点 + 浏览器默认
       * `padding-inline-start: 40px`，必须手动清掉，否则一级 panel 会向右被
       * 推 40px、与 popover 内 padding 不对齐。
       */
      ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingInlineStart: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: v('stackGap'),
        width: '100%',
      },
      li: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },

      /** 子菜单 inline 展开（三级及以下）保持 stack */
      [`${c}-submenu-children`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingBlockStart: v('stackGap'),
        display: 'flex',
        flexDirection: 'column',
        gap: v('stackGap'),
        width: '100%',
      },

      /** Item 行（leaf）外层 li 仅承担布局/缩进 */
      [`${c}-item`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },

      /** Item button：完整 reset + rowItem 视觉 */
      [`${c}-item-button, ${c}-submenu-title`]: {
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
        font: v('itemFont'),
        fontFamily: 'inherit',
        fontSize: v('itemFontSize'),
        fontWeight: v('itemFontWeight'),
        color: v('colorText'),
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        background: 'transparent',
        appearance: 'none',
        WebkitAppearance: 'none',
        textAlign: 'start',
        transition: `background-color var(--ant-motion-duration-mid, 0.2s), color var(--ant-motion-duration-mid, 0.2s)`,
        /**
         * 第一个子节点（item-title）拿走剩余空间；后续子节点（如 submenu-arrow）
         * 自然贴右，不参与 flex 拉伸。这与主区 `${c}-submenu-title` 规则保持一致，
         * 否则 popup 内 arrow 会被 flex:1 撑大到与 title 等宽。
         */
        [`> :first-child`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
        '&:hover:not(:disabled)': {
          backgroundColor: v('colorBgHover'),
          color: v('colorTextHover'),
        },
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.45,
        },
      },

      /**
       * popup 内 submenu 指示器（chevron）。规则需在 popup 容器里独立写一份：
       * - popup 节点直接挂 `document.body`，吃不到主 nav 子树里的 `${c}-submenu-arrow`
       *   规则；
       * - popup 内的 submenu 都是 inline 展开（三级及以下），方向：默认朝右、
       *   展开时旋转 90deg 朝下，与主区垂直 inline 行为一致。
       */
      [`${c}-submenu-arrow`]: {
        flex: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: v('arrowSize'),
        height: v('arrowSize'),
        marginInlineStart: v('itemGap'),
        color: 'currentColor',
        opacity: 0.6,
        transition: `transform var(--ant-motion-duration-mid, 0.2s)`,
        svg: {
          width: '100%',
          height: '100%',
          display: 'block',
        },
      },
      [`${c}-submenu-title--open ${c}-submenu-arrow`]: {
        transform: 'rotate(90deg)',
      },

      [`${c}-item--selected ${c}-item-button`]: {
        backgroundColor: v('colorBgSelected'),
        color: v('colorTextSelected'),
      },

      /** Item title 行：icon + label 横向布局 */
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

      /** Icon 容器：默认跟随父字号；leaf/submenu-title 内单独放大到 18px */
      [`${c}-item-icon`]: {
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: v('colorIcon'),
        fontSize: 'inherit',
        lineHeight: 0,
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
      },
      [`${c}-item-button ${c}-item-icon, ${c}-submenu-title ${c}-item-icon`]: {
        fontSize: v('iconSvgSize'),
        width: v('iconBox'),
        height: v('iconBox'),
      },
      [`${c}-item--selected ${c}-item-icon`]: {
        color: v('colorIconSelected'),
      },

      /** Group 块：标题 + 列表 */
      [`${c}-group`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: v('stackGap'),
        width: '100%',
      },
      [`${c}-group + ${c}-group`]: {
        marginBlockStart: v('groupGap'),
      },
      /**
       * 用 `&&` 双类提升特异性，确保覆盖外层 `[c]` 内嵌套定义的 `${c}-group-title`
       * 旧规则 `paddingInline: itemPadInline`。
       *
       * 左缩进 = 基础 padding + icon 容器 + icon→label 的 gap，
       * 让 group title 的文字与下方 leaf 文字起始 x 对齐（"列表页面" 对齐 "二级列表页面"）。
       */
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
  return useAntdStyle(styleRegisterName, () => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken, resolvedMode)];
  });
}
