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
 * 主导航 CSS 变量名表（值在根 `nav` 上由 `layoutNavCssVars` 注入）。
 * 覆盖主题时在祖先上写 `--pro-layout-nav-*` 即可，无需改组件类名。
 */
export const proLayoutNavVar = {
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
  /** 顶栏横向菜单项左右内边距（较松） */
  itemPadInlineLoose: '--pro-layout-nav-item-padding-inline-loose',
  stackGap: '--pro-layout-nav-stack-gap',
  groupGapBlock: '--pro-layout-nav-group-gap-block',
  groupTitleFontSize: '--pro-layout-nav-group-title-font-size',
  groupTitleLineHeight: '--pro-layout-nav-group-title-line-height',
  groupItemTitleHeight: '--pro-layout-nav-group-item-title-height',
  iconBox: '--pro-layout-nav-icon-box-size',
  motionDuration: '--pro-layout-nav-motion-duration',
  focusRingColor: '--pro-layout-nav-focus-ring-color',
  itemDisabledOpacity: '--pro-layout-nav-item-disabled-opacity',
  collapsedItemMarginBlock: '--pro-layout-nav-collapsed-item-margin-block',
  collapsedTitleTrackWidth: '--pro-layout-nav-collapsed-title-track-width',
  collapsedShowTitleLineHeight: '--pro-layout-nav-collapsed-show-title-line-height',
  collapsedShowTitleTextFontSize: '--pro-layout-nav-collapsed-show-title-text-font-size',
  collapsedShowTitleTextMaxHeight: '--pro-layout-nav-collapsed-show-title-text-max-height',
  collapsedShowTitleTextLineHeight: '--pro-layout-nav-collapsed-show-title-text-line-height',
  collapsedShowTitleTextMarginBlockStart:
    '--pro-layout-nav-collapsed-show-title-text-margin-block-start',
  groupDividerFontSize: '--pro-layout-nav-group-divider-font-size',
  groupDividerLineHeight: '--pro-layout-nav-group-divider-line-height',
  popupMinWidth: '--pro-layout-nav-popup-min-width',
  popupMaxHeight: '--pro-layout-nav-popup-max-height',
  popupPadding: '--pro-layout-nav-popup-padding',
} as const;

function layoutNavCssVars(surface: 'sider' | 'header'): Record<string, string> {
  const padInline = 8;
  const stackGap = 4;
  const itemH = 32;
  /** 侧栏与顶栏共用的布局/动效默认值，避免在两套分支里复制粘贴 */
  const layoutNavSharedDefaults: Record<string, string> = {
    [proLayoutNavVar.itemPadInlineLoose]: 'var(--ant-padding-sm, 12px)',
    [proLayoutNavVar.groupGapBlock]: '12px',
    [proLayoutNavVar.groupItemTitleHeight]: '18px',
    [proLayoutNavVar.motionDuration]: 'var(--ant-motion-duration-mid, 0.2s)',
    [proLayoutNavVar.focusRingColor]: 'var(--ant-color-primary)',
    [proLayoutNavVar.itemDisabledOpacity]: '0.45',
    [proLayoutNavVar.collapsedItemMarginBlock]: 'var(--ant-margin-xxs, 4px)',
    [proLayoutNavVar.collapsedTitleTrackWidth]: '20px',
    [proLayoutNavVar.collapsedShowTitleLineHeight]: '16px',
    [proLayoutNavVar.collapsedShowTitleTextFontSize]:
      'calc(var(--ant-font-size, 14px) - 1px)',
    [proLayoutNavVar.collapsedShowTitleTextMaxHeight]: '12px',
    [proLayoutNavVar.collapsedShowTitleTextLineHeight]: '12px',
    [proLayoutNavVar.collapsedShowTitleTextMarginBlockStart]: '4px',
    [proLayoutNavVar.groupDividerFontSize]:
      'calc(var(--ant-font-size, 14px) - 1px)',
    [proLayoutNavVar.groupDividerLineHeight]: '20px',
    [proLayoutNavVar.popupMinWidth]: '160px',
    [proLayoutNavVar.popupMaxHeight]: 'calc(100vh - 32px)',
    [proLayoutNavVar.popupPadding]: 'var(--ant-padding-xxs, 4px)',
  };
  /** 侧栏主导航：浅灰底上的字色 / 交互；可通过覆盖 `--pro-layout-nav-*` 调整 */
  const siderNavText = 'rgba(9, 30, 66, 0.86)';
  const siderNavIcon = 'rgba(9, 30, 66, 0.31)';
  const siderNavSection = 'rgba(9, 30, 66, 0.49)';
  const siderNavHoverBg = 'rgba(0, 0, 0, 0.04)';
  const siderNavSelectedBg = 'rgba(29, 122, 252, 0.23)';
  const siderNavSelectedText = '#0055cc';
  if (surface === 'sider') {
    return {
      ...layoutNavSharedDefaults,
      [proLayoutNavVar.colorText]: siderNavText,
      [proLayoutNavVar.colorBgHover]: siderNavHoverBg,
      [proLayoutNavVar.colorTextHover]: siderNavText,
      [proLayoutNavVar.colorBgSelected]: siderNavSelectedBg,
      [proLayoutNavVar.colorTextSelected]: siderNavSelectedText,
      [proLayoutNavVar.colorDivider]: 'var(--ant-color-split)',
      [proLayoutNavVar.popupBg]: 'var(--ant-color-bg-elevated)',
      [proLayoutNavVar.indent]: '16px',
      [proLayoutNavVar.colorIcon]: siderNavIcon,
      [proLayoutNavVar.colorSection]: siderNavSection,
      [proLayoutNavVar.itemHeight]: `${itemH}px`,
      [proLayoutNavVar.itemRadius]: '6px',
      [proLayoutNavVar.itemGap]: '8px',
      [proLayoutNavVar.itemFontSize]: '14px',
      [proLayoutNavVar.itemFontWeight]: '500',
      [proLayoutNavVar.itemPadBlock]: '6px',
      [proLayoutNavVar.itemPadInline]: `${padInline}px`,
      [proLayoutNavVar.stackGap]: `${stackGap}px`,
      [proLayoutNavVar.groupTitleFontSize]: 'calc(var(--ant-font-size, 14px) - 1px)',
      [proLayoutNavVar.groupTitleLineHeight]: '20px',
      [proLayoutNavVar.iconBox]: '16px',
    };
  }
  return {
    ...layoutNavSharedDefaults,
    [proLayoutNavVar.colorText]: 'var(--ant-color-text-secondary)',
    [proLayoutNavVar.colorBgHover]: 'var(--ant-color-fill-secondary)',
    [proLayoutNavVar.colorTextHover]: 'var(--ant-color-text)',
    [proLayoutNavVar.colorBgSelected]: 'var(--ant-color-fill-tertiary)',
    [proLayoutNavVar.colorTextSelected]: 'var(--ant-color-text)',
    [proLayoutNavVar.colorDivider]: 'var(--ant-color-split)',
    [proLayoutNavVar.popupBg]: 'var(--ant-color-bg-elevated)',
    [proLayoutNavVar.indent]: '16px',
    [proLayoutNavVar.colorIcon]: 'var(--ant-color-text-secondary)',
    [proLayoutNavVar.colorSection]: 'var(--ant-color-text-description)',
    [proLayoutNavVar.itemHeight]: `${itemH}px`,
    [proLayoutNavVar.itemRadius]: '6px',
    [proLayoutNavVar.itemGap]: '8px',
    [proLayoutNavVar.itemFontSize]: 'var(--ant-font-size)',
    [proLayoutNavVar.itemFontWeight]: '500',
    [proLayoutNavVar.itemPadBlock]: '6px',
    [proLayoutNavVar.itemPadInline]: `${padInline}px`,
    [proLayoutNavVar.stackGap]: `${stackGap}px`,
    [proLayoutNavVar.groupTitleFontSize]: 'var(--ant-font-size-sm)',
    [proLayoutNavVar.groupTitleLineHeight]: '20px',
    [proLayoutNavVar.iconBox]: '16px',
  };
}

const genProLayoutBaseMenuStyle: GenerateStyle<ProLayoutBaseMenuToken> = (
  token,
  mode,
) => {
  const c = token.componentCls;
  const isHorizontal = mode.includes('horizontal');
  const v = (name: keyof typeof proLayoutNavVar) => `var(${proLayoutNavVar[name]})`;

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
    transition: `background-color ${v('motionDuration')}, color ${v('motionDuration')}`,
    '&:focus-visible': {
      outline: `2px solid ${v('focusRingColor')}`,
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
          opacity: v('itemDisabledOpacity'),
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
        minWidth: v('popupMinWidth'),
        maxHeight: v('popupMaxHeight'),
        overflowY: 'auto',
        padding: v('popupPadding'),
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
        marginBlockStart: v('groupGapBlock'),
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
          minWidth: v('itemHeight'),
          height: v('itemHeight'),
          flexDirection: 'column',
          justifyContent: 'center',
          [`${c}-item-icon`]: {
            width: v('iconBox'),
            height: v('iconBox'),
          },
          [`${c}-item-text-has-icon`]: { display: 'none' },
        },
        '&-collapsed-level-0': {
          flexDirection: 'column',
          justifyContent: 'center',
        },
        [`&${c}-group-item-title`]: {
          gap: v('itemGap'),
          height: v('groupItemTitleHeight'),
          overflow: 'hidden',
        },
        [`&${c}-item-collapsed-show-title`]: {
          lineHeight: v('collapsedShowTitleLineHeight'),
          gap: 0,
          [`&${c}-item-title-collapsed`]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [`${c}-item-text`]: {
              display: 'inline',
              textAlign: 'center',
              fontSize: v('collapsedShowTitleTextFontSize'),
              maxHeight: v('collapsedShowTitleTextMaxHeight'),
              lineHeight: v('collapsedShowTitleTextLineHeight'),
              marginBlockStart: v('collapsedShowTitleTextMarginBlockStart'),
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
        fontSize: v('groupDividerFontSize'),
        lineHeight: v('groupDividerLineHeight'),
      },

      /** `--collapsed` 与根 `nav` 同元素，须用 `&--collapsed` 复合选择器，勿写成后代 `${c} ${c}--collapsed` */
      '&--collapsed': {
        [`${c}-item`]: {
          paddingBlock: 0,
          paddingInlineStart: v('itemPadInline'),
          paddingInlineEnd: 0,
          marginBlock: v('collapsedItemMarginBlock'),
        },
        [`${c}-submenu-title`]: {
          paddingBlock: 0,
          paddingInlineStart: v('itemPadInline'),
          paddingInlineEnd: 0,
        },
        [`${c}-item-title`]: {
          width: '100%',
          maxWidth: '100%',
          overflow: 'visible',
        },
        [`${c}-submenu${c}-submenu-open > ${c}-submenu-title`]: {
          backgroundColor: v('colorBgSelected'),
          borderRadius: v('itemRadius'),
        },
        /** 侧栏收起：不展示分组标题，仅保留图标型菜单项 */
        [`${c}-group ${c}-group-title`]: {
          display: 'none',
        },
      },
    },

    [`${c}:not(${c}--horizontal)`]: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      /** 根 `nav` 下多个顶级 `li`/片段之间的纵向间距（扁平 DOM 无外包 `ul`） */
      gap: v('stackGap'),
    },

    /** vertical（侧栏收起）下标题区收窄为 20px 宽，便于在窄侧栏内居中 */
    ...(mode === 'vertical'
      ? {
          [`&--collapsed ${c}-item-title-collapsed`]: {
            width: v('collapsedTitleTrackWidth'),
            minWidth: v('collapsedTitleTrackWidth'),
            maxWidth: v('collapsedTitleTrackWidth'),
            marginInline: 'auto',
            alignSelf: 'center',
          },
        }
      : {}),

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
        paddingInline: v('itemPadInlineLoose'),
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
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken, mode || 'inline')];
  });
}
