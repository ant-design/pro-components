import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
import { proLayoutSiderVar } from './menu';
export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
  proLayoutCollapsedWidth: number;
}

export const proLayoutTitleHide = new Keyframes('antBadgeLoadingCircle', {
  '0%': { display: 'none', opacity: 0, overflow: 'hidden' },
  '80%': {
    overflow: 'hidden',
  },
  '100%': {
    display: 'unset',
    opacity: 1,
  },
}) as any;

/**
 * Sider 内部视觉常量：把散落在文件里的像素/动效/层级魔法值集中到顶部，
 * 只保留"语义"命名，真要调参时一眼能找到改哪里。
 *
 * 说明：
 * - 能用 antd 原生 token 的（如 colorBgHover / colorText）已通过 `proLayoutSiderVar`
 *   走 CSS 变量，不在这里重复；
 * - 这里的常量都是 **Sider 私有语义**，既不适合抽到 antd token，也不适合抽到
 *   `--pro-layout-nav-*`，只是为了把魔法数字替换成可读的名字。
 */
const MENU_STACK_GAP = 12; // sider-children 内 logo/actions/menu 三块之间的纵向间距
const SIDER_COLLAPSED_PAD_INLINE = 4; // 收起态 sider-children 水平内边距（配合 28×28 按钮居中）
const MENU_Z_INDEX = 10; // sider 菜单区 z-index：压过相邻滚动阴影即可，不与 popup(1000+) 冲突
/** fixed 侧栏整体层级须高于顶栏（header.ts 为 101），否则收起按钮 absolute 伸出侧栏时会被顶栏盖住 */
const FIXED_SIDER_Z_INDEX = 105;

/** Logo 块尺寸规范（与一级菜单 42px 行高对齐） */
const LOGO = {
  minHeight: 42,
  paddingInline: 8,
  paddingBlock: 8,
  linkSize: 22, // <a>/<img>/<h1> 高度，img 的宽高、标题行高统一
  titleMarginInlineStart: 6,
  titleFontSize: 16,
  titleFontWeight: 600,
  titleLineHeight: '22px',
  collapsedIconSize: 16,
  collapsedIconMarginBlockEnd: 8,
} as const;

/** Actions 区（avatar/action list）尺寸规范 */
const ACTIONS = {
  marginBlock: 4,
  iconSize: 16,
  itemPadding: 6,
  itemLineHeight: '16px',
  avatarPaddingInline: 8,
  avatarPaddingBlock: 8,
  avatarFontSize: 14,
  collapsedPaddingInline: 8,
  collapsedMarginBlockEnd: 8,
} as const;

/** Extra 区外边距 */
const EXTRA_MARGIN = 16;
/** Footer 区底部内边距 */
const FOOTER_PADDING_BLOCK_END = 16;

/** 折叠态 hide-menu 按钮向 sider 外偏移量：让按钮半压在 sider 边缘上 */
const HIDE_MENU_COLLAPSED_OFFSET = 12;

/**
 * Sider 内部 motion 规范：title 淡入 / icon 尺寸过渡统一走这套常量。
 */
const MOTION = {
  titleHideDuration: '.4s',
  titleHideTiming: 'ease',
  iconTransition: 'font-size 0.2s ease-in-out, color 0.2s ease-in-out',
  /** actions 收起态 icon 尺寸切换稍慢，避免"抖动"感 */
  actionsCollapsedTransition: 'font-size 0.3s ease-in-out',
} as const;

function getSiderMenuScrollbar(token: ProAliasToken): Record<string, unknown> {
  const thumb = `var(${proLayoutSiderVar.scrollbarThumb}, ${token.colorFillTertiary})`;
  const thumbHover = `var(${proLayoutSiderVar.scrollbarThumbHover}, ${token.colorFillSecondary})`;
  const track = `var(${proLayoutSiderVar.scrollbarTrack}, transparent)`;
  const trackSize = `var(${proLayoutSiderVar.scrollbarTrackThickness}, 6px)`;
  const thumbRadius = `var(${proLayoutSiderVar.scrollbarThumbRadius}, 3px)`;

  return {
    scrollbarWidth: 'thin',
    scrollbarColor: `transparent ${track}`,
    transition: 'scrollbar-color 0.3s ease',
    '&::-webkit-scrollbar': {
      width: trackSize,
      height: trackSize,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: track,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      borderRadius: thumbRadius,
      transition: 'background-color 0.3s ease',
    },
    '&:hover': {
      scrollbarColor: `${thumb} ${track}`,
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: thumb,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: thumbHover,
      },
    },
  };
}

const genSiderMenuStyle: GenerateStyle<SiderMenuToken> = (token) => {
  const siderMenuScrollbar = getSiderMenuScrollbar(token);
  const sv = (k: keyof typeof proLayoutSiderVar) =>
    `var(${proLayoutSiderVar[k]})`;
  return {
    [`${token.proComponentsCls}-layout`]: {
      [`${token.antCls}-layout-sider${token.componentCls}`]: {
        background: sv('bg'),
      },
      /** antd Sider 收起：收紧内边距，内容区水平居中 */
      [`${token.antCls}-layout-sider${token.componentCls}${token.antCls}-layout-sider-collapsed`]:
        {
          [`& ${token.antCls}-layout-sider-children`]: {
            paddingInline: SIDER_COLLAPSED_PAD_INLINE,
            alignItems: 'center',
          },
          /** 收起态窄栏：`thin`/webkit 轨道仍会占位，主区改为不占位滚动条 */
          [`& ${token.componentCls}-menu-scroll`]: {
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              width: 0,
              height: 0,
            },
            '&:hover': {
              scrollbarColor: 'transparent transparent',
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      [token.componentCls]: {
        position: 'relative',
        boxSizing: 'border-box',
        '&-menu-scroll': {
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          ...siderMenuScrollbar,
        },
        '&-menu': {
          position: 'relative',
          zIndex: MENU_Z_INDEX,
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
        },
        [`& ${token.antCls}-layout-sider-children`]: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: MENU_STACK_GAP,
          paddingInline: sv('paddingInlineMenu'),
          paddingBlock: sv('paddingBlockMenu'),
          borderInlineEnd: 'none',
          marginInlineEnd: 0,
        },
        '&-logo': {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: LOGO.paddingInline,
          paddingBlock: LOGO.paddingBlock,
          minHeight: LOGO.minHeight,
          color: sv('colorText'),
          cursor: 'pointer',
          borderBlockEnd: 'none',
          '> a': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: LOGO.linkSize,
            fontSize: LOGO.linkSize,
            '> img': {
              display: 'inline-block',
              height: LOGO.linkSize,
              verticalAlign: 'middle',
            },
            '> h1': {
              display: 'inline-block',
              height: LOGO.linkSize,
              marginBlock: 0,
              marginInlineEnd: 0,
              marginInlineStart: LOGO.titleMarginInlineStart,
              color: sv('colorTextTitle'),
              animationName: proLayoutTitleHide,
              animationDuration: MOTION.titleHideDuration,
              animationTimingFunction: MOTION.titleHideTiming,
              fontWeight: LOGO.titleFontWeight,
              fontSize: LOGO.titleFontSize,
              lineHeight: LOGO.titleLineHeight,
              verticalAlign: 'middle',
            },
          },
          '&-collapsed': {
            flexDirection: 'column-reverse',
            margin: 0,
            /** 收起态 logo 不再加 padding，与菜单 28×28 正方形按钮在横向对齐 */
            padding: 0,
            [`${token.proComponentsCls}-layout-apps-icon`]: {
              marginBlockEnd: LOGO.collapsedIconMarginBlockEnd,
              fontSize: LOGO.collapsedIconSize,
              transition: MOTION.iconTransition,
            },
          },
        },
        '&-actions': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBlock: ACTIONS.marginBlock,
          marginInline: 0,
          color: sv('colorText'),
          '&-collapsed': {
            flexDirection: 'column-reverse',
            paddingBlock: 0,
            paddingInline: ACTIONS.collapsedPaddingInline,
            fontSize: ACTIONS.iconSize,
            transition: MOTION.actionsCollapsedTransition,
          },
          '&-list': {
            color: sv('colorTextSecondary'),
            '&-collapsed': {
              marginBlockEnd: ACTIONS.collapsedMarginBlockEnd,
              animationName: 'none',
            },
            '&-item': {
              paddingInline: ACTIONS.itemPadding,
              paddingBlock: ACTIONS.itemPadding,
              lineHeight: ACTIONS.itemLineHeight,
              fontSize: ACTIONS.iconSize,
              cursor: 'pointer',
              borderRadius: sv('borderRadius'),
              '&:hover': {
                background: sv('colorBgHover'),
              },
            },
          },
          '&-avatar': {
            fontSize: ACTIONS.avatarFontSize,
            paddingInline: ACTIONS.avatarPaddingInline,
            paddingBlock: ACTIONS.avatarPaddingBlock,
            display: 'flex',
            alignItems: 'center',
            gap: `${token.marginXS}px`,
            borderRadius: sv('borderRadius'),
            '& *': {
              cursor: 'pointer',
            },
            '&:hover': {
              background: sv('colorBgHover'),
            },
          },
        },
        '&-hide-menu-collapsed': {
          insetInlineStart: `-${token.proLayoutCollapsedWidth - HIDE_MENU_COLLAPSED_OFFSET}px`,
          position: 'absolute',
        },

        '&-extra': {
          marginBlockEnd: EXTRA_MARGIN,
          marginBlock: 0,
          marginInline: EXTRA_MARGIN,
          '&-no-logo': {
            marginBlockStart: EXTRA_MARGIN,
          },
        },
        '&-links': {
          width: '100%',
          ul: {
            height: 'auto',
          },
        },
        '&-link-menu': {
          border: 'none',
          boxShadow: 'none',
          background: 'transparent',
        },
        '&-footer': {
          color: sv('colorTextSecondary'),
          paddingBlockEnd: FOOTER_PADDING_BLOCK_END,
          fontSize: sv('fontSize'),
          animationName: proLayoutTitleHide,
          animationDuration: MOTION.titleHideDuration,
          animationTimingFunction: MOTION.titleHideTiming,
        },
      },
      [`${token.componentCls}${token.componentCls}-fixed`]: {
        position: 'fixed',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: FIXED_SIDER_Z_INDEX,
        height: '100%',
      },
    },
  };
};

export function useStyle(
  prefixCls: string,
  {
    proLayoutCollapsedWidth,
  }: {
    proLayoutCollapsedWidth: number;
  },
) {
  return useAntdStyle('ProLayoutSiderMenu', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutCollapsedWidth,
    };

    return [genSiderMenuStyle(siderMenuToken)];
  });
}
