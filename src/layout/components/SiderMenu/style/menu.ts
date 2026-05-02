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
      [navVar.colorTextSelected]:
        'var(--color-primary-text-default, #0055cc)',
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
      [navVar.itemFontWeight]: '500',
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
    [navVar.itemFontWeight]: '500',
    [navVar.itemFont]:
      'var(--font-text-body-emphasized-base, 500 var(--ant-font-size) / var(--ant-line-height) var(--ant-font-family))',
    [navVar.itemPadBlock]: '6px',
    [navVar.itemPadInline]: `${padInline}px`,
    [navVar.stackGap]: `${stackGap}px`,
    [navVar.groupGap]: '12px',
    [navVar.groupTitleFontSize]: 'var(--ant-font-size-sm)',
    [navVar.groupTitleLineHeight]: '20px',
    [navVar.iconBox]: '24px',
    [navVar.iconSvgSize]: '18px',
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
        /** 标题区（icon+文案）直接作为子节点，省一层 wrapper */
        [`> *`]: {
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

      [`${c}-submenu-title`]: {
        ...rowItem,
        font: 'inherit',
        /** 子菜单标题内联 DOM（与 leaf 一致） */
        [`> *`]: {
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
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: v('iconBox'),
        height: v('iconBox'),
        color: v('colorIcon'),
        /**
         * 图标实际渲染尺寸（svg）独立于容器尺寸；
         * 容器 24px、svg 18px 与 SidebarMenu 一致，避免一级图标过小。
         */
        fontSize: v('iconSvgSize'),
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
          width: v('iconSvgSize'),
          height: v('iconSvgSize'),
          display: 'block',
        },
        img: {
          width: v('iconSvgSize'),
          height: v('iconSvgSize'),
          display: 'block',
          objectFit: 'contain',
        },
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
  const resolvedMode = mode ?? 'vertical';
  const styleRegisterName = `ProLayoutBaseMenu-${prefixCls}-${resolvedMode}`;
  return useAntdStyle(styleRegisterName, () => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken, resolvedMode)];
  });
}
