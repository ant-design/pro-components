import type { GenerateStyle, ProAliasToken } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
import type { MenuMode } from '../types';

export interface ProLayoutBaseMenuToken extends ProAliasToken {
  componentCls: string;
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

function layoutNavCssVars(
  token: ProLayoutBaseMenuToken,
  surface: 'sider' | 'header',
): Record<string, string> {
  const s = token.layout?.sider;
  const h = token.layout?.header;
  const padInline = 8;
  const stackGap = 4;
  const itemH = 32;
  /** 侧栏主导航：浅灰底条上的字色 / 交互（对齐常见产品侧栏，仍可通过 layout.sider / token 覆盖） */
  const siderNavText = 'rgba(9, 30, 66, 0.86)';
  const siderNavIcon = 'rgba(9, 30, 66, 0.31)';
  const siderNavSection = 'rgba(9, 30, 66, 0.49)';
  const siderNavHoverBg = 'rgba(0, 0, 0, 0.04)';
  const siderNavSelectedBg = 'rgba(29, 122, 252, 0.23)';
  const siderNavSelectedText = '#0055cc';
  if (surface === 'sider') {
    return {
      [navVar.colorText]: s?.colorTextMenu ?? siderNavText,
      [navVar.colorBgHover]: s?.colorBgMenuItemHover ?? siderNavHoverBg,
      [navVar.colorTextHover]: s?.colorTextMenuActive ?? siderNavText,
      [navVar.colorBgSelected]: s?.colorBgMenuItemSelected ?? siderNavSelectedBg,
      [navVar.colorTextSelected]: s?.colorTextMenuSelected ?? siderNavSelectedText,
      [navVar.colorDivider]:
        s?.colorMenuItemDivider ?? 'var(--ant-color-split)',
      [navVar.popupBg]:
        h?.colorBgMenuElevated ?? 'var(--ant-color-bg-elevated)',
      [navVar.indent]: '16px',
      [navVar.colorIcon]: siderNavIcon,
      [navVar.colorSection]: siderNavSection,
      [navVar.itemHeight]: `${itemH}px`,
      [navVar.itemRadius]: '6px',
      [navVar.itemGap]: '8px',
      [navVar.itemFontSize]: `${token.fontSizeSM + 1}px`,
      [navVar.itemFontWeight]: '500',
      [navVar.itemPadBlock]: '6px',
      [navVar.itemPadInline]: `${padInline}px`,
      [navVar.stackGap]: `${stackGap}px`,
      [navVar.groupTitleFontSize]: `${token.fontSizeSM}px`,
      [navVar.groupTitleLineHeight]: '20px',
      [navVar.iconBox]: '16px',
    };
  }
  return {
    [navVar.colorText]: h?.colorTextMenu ?? 'var(--ant-color-text-secondary)',
    [navVar.colorBgHover]:
      h?.colorBgMenuItemHover ?? 'var(--ant-color-fill-secondary)',
    [navVar.colorTextHover]: h?.colorTextMenuActive ?? 'var(--ant-color-text)',
    [navVar.colorBgSelected]:
      h?.colorBgMenuItemSelected ?? 'var(--ant-color-fill-tertiary)',
    [navVar.colorTextSelected]:
      h?.colorTextMenuSelected ?? 'var(--ant-color-text)',
    [navVar.colorDivider]: 'var(--ant-color-split)',
    [navVar.popupBg]: h?.colorBgMenuElevated ?? 'var(--ant-color-bg-elevated)',
    [navVar.indent]: '16px',
    [navVar.colorIcon]: 'var(--ant-color-text-secondary)',
    [navVar.colorSection]: 'var(--ant-color-text-description)',
    [navVar.itemHeight]: `${itemH}px`,
    [navVar.itemRadius]: '6px',
    [navVar.itemGap]: '8px',
    [navVar.itemFontSize]: `${token.fontSize}px`,
    [navVar.itemFontWeight]: '500',
    [navVar.itemPadBlock]: '6px',
    [navVar.itemPadInline]: `${padInline}px`,
    [navVar.stackGap]: `${stackGap}px`,
    [navVar.groupTitleFontSize]: `${token.fontSizeSM}px`,
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
    transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
    '&:focus-visible': {
      outline: `${token.lineWidthFocus}px solid var(--ant-color-primary)`,
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
      ...(isHorizontal ? layoutNavCssVars(token, 'header') : layoutNavCssVars(token, 'sider')),
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

      [`${c}-submenu-anchor`]: {
        display: 'block',
        position: 'relative',
        width: '100%',
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

      [`${c}-submenu-inline`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingBlockStart: v('stackGap'),
        ...stack,
        /** 嵌套子菜单行：子 `li` 在 flex 列中仍须显式去掉 marker */
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
        padding: token.paddingXXS,
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

      /** 收起侧栏：分组标题仍展示，避免内层 `group-item-title` 固定高度把文字裁没 */
      [`${c}--collapsed ${c}-group ${c}-group-title`]: {
        width: '100%',
        textAlign: 'center',
        overflow: 'visible',
      },
      [`${c}--collapsed ${c}-group ${c}-group-title ${c}-item-title`]: {
        height: 'auto',
        minHeight: 'auto',
        maxHeight: 'none',
        overflow: 'visible',
        width: '100%',
        maxWidth: '100%',
      },
      [`${c}--collapsed ${c}-group ${c}-group-title ${c}-item-text`]: {
        whiteSpace: 'normal',
        overflow: 'visible',
        textOverflow: 'clip',
        lineHeight: 1.25,
        maxHeight: 'none',
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
          height: 18,
          overflow: 'hidden',
        },
        [`&${c}-item-collapsed-show-title`]: {
          lineHeight: '16px',
          gap: 0,
          [`&${c}-item-title-collapsed`]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [`${c}-item-text`]: {
              display: 'inline',
              textAlign: 'center',
              fontSize: token.fontSizeSM,
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
        fontSize: token.fontSizeSM,
        lineHeight: 20,
      },

      [`${c}--collapsed`]: {
        [`${c}-item`]: {
          paddingBlock: 0,
          paddingInlineStart: v('itemPadInline'),
          paddingInlineEnd: 0,
          marginBlock: token.marginXXS,
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
        [`${c}-group ${c}-group-title`]: { paddingInline: 0 },
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
          [`${c}--collapsed ${c}-item-title-collapsed`]: {
            width: 20,
            minWidth: 20,
            maxWidth: 20,
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
      [`> ${c}-list`]: {
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
        paddingInline: token.paddingSM,
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
  };
};

export function useStyle(prefixCls: string, mode: MenuMode | undefined) {
  return useAntdStyle('ProLayoutBaseMenu' + mode, (token) => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken, mode || 'inline')];
  });
}
