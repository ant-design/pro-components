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

/** 主导航语义 token，统一在根 `nav` 上注入，子选择器只用 `var(--pro-layout-nav-*)` */
const navVar = {
  colorText: '--pro-layout-nav-color-text',
  colorBgHover: '--pro-layout-nav-color-bg-hover',
  colorTextHover: '--pro-layout-nav-color-text-hover',
  colorBgSelected: '--pro-layout-nav-color-bg-selected',
  colorTextSelected: '--pro-layout-nav-color-text-selected',
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
  itemPadBlock: '--pro-layout-nav-item-padding-block',
  itemPadInline: '--pro-layout-nav-item-padding-inline',
  stackGap: '--pro-layout-nav-stack-gap',
  groupTitleFontSize: '--pro-layout-nav-group-title-font-size',
  groupTitleLineHeight: '--pro-layout-nav-group-title-line-height',
  iconBox: '--pro-layout-nav-icon-box-size',
} as const;

function layoutNavCssVars(surface: 'sider' | 'header'): Record<string, string> {
  const padInline = 8;
  const stackGap = 4;
  const itemH = 32;
  /** 侧栏主导航：浅灰底上的字色 / 交互；可通过覆盖 `--pro-layout-nav-*` 调整 */
  const siderNavText = 'rgba(9, 30, 66, 0.86)';
  const siderNavIcon = 'rgba(9, 30, 66, 0.31)';
  const siderNavSection = 'rgba(9, 30, 66, 0.49)';
  const siderNavHoverBg = 'rgba(0, 0, 0, 0.04)';
  const siderNavSelectedBg = 'rgba(29, 122, 252, 0.23)';
  const siderNavSelectedText = '#0055cc';
  if (surface === 'sider') {
    return {
      [navVar.colorText]: siderNavText,
      [navVar.colorBgHover]: siderNavHoverBg,
      [navVar.colorTextHover]: siderNavText,
      [navVar.colorBgSelected]: siderNavSelectedBg,
      [navVar.colorTextSelected]: siderNavSelectedText,
      [navVar.colorDivider]: 'var(--ant-color-split)',
      [navVar.popupBg]: 'var(--ant-color-bg-elevated)',
      [navVar.indent]: '16px',
      [navVar.colorIcon]: siderNavIcon,
      [navVar.colorSection]: siderNavSection,
      [navVar.itemHeight]: `${itemH}px`,
      [navVar.itemRadius]: '6px',
      [navVar.itemGap]: '8px',
      [navVar.itemFontSize]: '14px',
      [navVar.itemFontWeight]: '500',
      [navVar.itemPadBlock]: '6px',
      [navVar.itemPadInline]: `${padInline}px`,
      [navVar.stackGap]: `${stackGap}px`,
      [navVar.groupTitleFontSize]: 'calc(var(--ant-font-size, 14px) - 1px)',
      [navVar.groupTitleLineHeight]: '20px',
      [navVar.iconBox]: '16px',
    };
  }
  return {
    [navVar.colorText]: 'var(--ant-color-text-secondary)',
    [navVar.colorBgHover]: 'var(--ant-color-fill-secondary)',
    [navVar.colorTextHover]: 'var(--ant-color-text)',
    [navVar.colorBgSelected]: 'var(--ant-color-fill-tertiary)',
    [navVar.colorTextSelected]: 'var(--ant-color-text)',
    [navVar.colorDivider]: 'var(--ant-color-split)',
    [navVar.popupBg]: 'var(--ant-color-bg-elevated)',
    [navVar.indent]: '16px',
    [navVar.colorIcon]: 'var(--ant-color-text-secondary)',
    [navVar.colorSection]: 'var(--ant-color-text-description)',
    [navVar.itemHeight]: `${itemH}px`,
    [navVar.itemRadius]: '6px',
    [navVar.itemGap]: '8px',
    [navVar.itemFontSize]: 'var(--ant-font-size)',
    [navVar.itemFontWeight]: '500',
    [navVar.itemPadBlock]: '6px',
    [navVar.itemPadInline]: `${padInline}px`,
    [navVar.stackGap]: `${stackGap}px`,
    [navVar.groupTitleFontSize]: 'var(--ant-font-size-sm)',
    [navVar.groupTitleLineHeight]: '20px',
    [navVar.iconBox]: '16px',
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
      ...(isHorizontal ? layoutNavCssVars('header') : layoutNavCssVars('sider')),
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

      [`${c}-item`]: {
        listStyle: 'none',
        ...rowItem,
        /** 只对标题根节点拉伸，避免 Tooltip 等外包层占满一行导致收起态比图标大 */
        [`> ${c}-item-title`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
        /** `menuItemRender` 常见为 `<Link><defaultDom/></Link>` */
        [`> a`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
          color: 'inherit',
          textDecoration: 'none',
        },
        [`> [data-pro-layout-menu-item-title-wrap]`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
        /** `menuItemRender` 常见用 `role="button"` 扩大点击区域 */
        [`> [role="button"]`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
        },
        '&:hover:not(&--disabled)': {
          backgroundColor: v('colorBgHover'),
          color: v('colorTextHover'),
        },
        '&--selected': {
          backgroundColor: v('colorBgSelected'),
          color: v('colorTextSelected'),
        },
        '&--disabled': {
          cursor: 'not-allowed',
          opacity: 0.45,
        },
      },

      [`${c}-submenu`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'relative',
      },

      /** 内联子菜单展开/收起：grid 0fr→1fr，无需量高 */
      [`${c}-submenu-expand-wrap`]: {
        display: 'grid',
        gridTemplateRows: '0fr',
        transition: `grid-template-rows var(--ant-motion-duration-mid, 0.2s) cubic-bezier(0.2, 0, 0, 1)`,
      },
      [`${c}-submenu-open > ${c}-submenu-expand-wrap`]: {
        gridTemplateRows: '1fr',
      },
      [`${c}-submenu-expand-wrap-inner`]: {
        minHeight: 0,
        overflow: 'hidden',
      },

      [`${c}-submenu-title`]: {
        ...rowItem,
        font: 'inherit',
        /** 文案区（含 icon+文本）；右侧为展开指示器 */
        [`${c}-submenu-title-inner`]: {
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: v('itemGap'),
          [`> *`]: {
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: v('itemGap'),
          },
        },
        [`${c}-submenu-expand-icon`]: {
          display: 'inline-flex',
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
          marginInlineStart: 'auto',
          color: v('colorIcon'),
          fontSize: 10,
          lineHeight: 0,
          transition: 'transform 0.2s ease',
          '& > span': { lineHeight: 0 },
        },
        [`${c}-submenu-expand-icon${c}-submenu-expand-icon--sider${c}-submenu-expand-icon--open`]:
          {
            transform: 'rotate(90deg)',
          },
        [`${c}-submenu-expand-icon${c}-submenu-expand-icon--popup-vertical${c}-submenu-expand-icon--open`]:
          {
            transform: 'rotate(90deg)',
          },
        '&:hover': {
          backgroundColor: v('colorBgHover'),
          color: v('colorTextHover'),
        },
      },

      /** 侧栏内联展开的子菜单列表 */
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

      [`${c}-submenu-popup`]: {
        position: 'fixed',
        margin: 0,
        minWidth: 160,
        maxHeight: 'calc(100vh - 32px)',
        overflowY: 'auto',
        padding: 'var(--ant-padding-xxs, 4px)',
        zIndex: `var(--ant-z-index-popup-base)`,
        boxShadow: `var(--ant-box-shadow-secondary)`,
        borderRadius: `var(--ant-border-radius-lg)`,
        backgroundColor: v('popupBg'),
        ...stack,
      },

      [`${c}-group`]: {
        ...stack,
      },

      /** 分组之间约 12px，组内项仍用 stackGap（4px） */
      [`${c}-group + ${c}-group`]: {
        marginBlockStart: 12,
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
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: v('iconBox'),
        height: v('iconBox'),
        color: v('colorIcon'),
        fontSize: v('iconBox'),
        lineHeight: 0,
        /** 图标区常见外包一层 span */
        '> span': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'inherit',
          lineHeight: 0,
          '& > svg': {
            width: '1em',
            height: '1em',
            display: 'block',
          },
        },
        '> svg': {
          width: v('iconBox'),
          height: v('iconBox'),
          display: 'block',
        },
        img: {
          width: v('iconBox'),
          height: v('iconBox'),
          display: 'block',
          objectFit: 'contain',
        },
      },

      [`${c}-item--selected ${c}-item-icon`]: {
        color: v('colorTextSelected'),
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
      [`${c}-item`]: {
        width: 'auto',
        minHeight: 'auto',
        height: 'auto',
        whiteSpace: 'nowrap',
        paddingInline: 'var(--ant-padding-sm, 12px)',
      },
      [`${c}-submenu`]: { display: 'inline-block' },
      [`${c}-submenu-title`]: {
        width: 'auto',
        minHeight: 'auto',
        height: 'auto',
      },
      [`${c}-submenu-popup`]: {
        [`${c}-item-title`]: { alignItems: 'flex-start' },
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
  } as CSSInterpolation;
};

export function useStyle(prefixCls: string, mode: MenuMode | undefined) {
  return useAntdStyle('ProLayoutBaseMenu' + mode, () => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken, mode || 'vertical')];
  });
}
