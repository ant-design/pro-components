import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { resetComponent, useStyle as useAntdStyle } from '../../../utils';

interface ProCardToken extends ProAliasToken {
  componentCls: string;
}

const genActiveStyle = (token: ProCardToken) => ({
  backgroundColor: token.controlItemBgActive,
  borderColor: token.controlOutline,
});

export const genProCardStyle: GenerateStyle<ProCardToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      width: '100%',
      marginBlock: 0,
      marginInline: 0,
      paddingBlock: 0,
      paddingInline: 0,

      [`&${componentCls}-legacy`]: {
        ...resetComponent?.(token),
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
        transition: 'all 0.3s',
      },

      [`&${componentCls}-legacy${componentCls}-box-shadow`]: {
        boxShadow: token.boxShadowTertiary,
        borderColor: 'transparent',
      },
      '&-col': {
        width: '100%',
      },

      // 分割线样式：col 之间的分割线
      [` ${componentCls}-col${componentCls}-split-vertical`]: {
        borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },
      [` ${componentCls}-col${componentCls}-split-horizontal`]: {
        borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },

      // Divider 分割线组件样式
      [`${componentCls}-divider`]: {
        flex: 'none',
        alignSelf: 'stretch',
        width: token.lineWidth,
        marginInline: token.marginXS,
        marginBlock: token.marginLG,
        backgroundColor: token.colorSplit,
        [`&${componentCls}-divider-horizontal`]: {
          width: 'auto',
          alignSelf: 'auto',
          height: token.lineWidth,
          marginInline: token.marginLG,
          marginBlock: token.marginXS,
        },
      },

      [`&${componentCls}-legacy${componentCls}-border`]: {
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
      },

      [`&${componentCls}-legacy${componentCls}-hoverable`]: {
        cursor: 'pointer',
        transition: 'box-shadow 0.3s, border-color 0.3s',

        '&:hover': {
          borderColor: 'transparent',
          boxShadow: token.boxShadowTertiary,
        },

        [`&${componentCls}-checked:hover`]: {
          borderColor: token.controlOutline,
        },
      },

      [`&${componentCls}-legacy${componentCls}-checked`]: {
        ...genActiveStyle(token),
        '&::after': {
          visibility: 'visible',
          position: 'absolute',
          insetBlockStart: 2,
          insetInlineEnd: 2,
          opacity: 1,
          width: 0,
          height: 0,
          border: `6px solid ${token.colorPrimary}`,
          borderBlockEnd: '6px solid transparent',
          borderInlineStart: '6px solid transparent',
          borderStartEndRadius: 2,
          content: '""',
        },
      },

      [`&${componentCls}-legacy:focus`]: {
        ...genActiveStyle(token),
      },

      [`&&${componentCls}-legacy${componentCls}-ghost`]: {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',

        [`> ${componentCls}`]: {
          '&-header': {
            paddingInlineEnd: 0,
            paddingBlockEnd: token.padding,
            paddingInlineStart: 0,
          },

          '&-body': {
            paddingBlock: 0,
            paddingInline: 0,
            backgroundColor: 'transparent',
          },
        },
      },

      // 布局样式：AntdCard 与 legacy 共用
      [`&&${componentCls}-split > ${componentCls}-body`]: {
        paddingBlock: 0,
        paddingInline: 0,
      },

      [`&&${componentCls}-contain-card > ${componentCls}-body`]: {
        display: 'flex',
      },

      [`& ${componentCls}-body-direction-column`]: {
        flexDirection: 'column',
      },

      [`& ${componentCls}-body-wrap`]: {
        flexWrap: 'wrap',
      },

      [`&&${componentCls}-legacy${componentCls}-collapse`]: {
        [`> ${componentCls}`]: {
          '&-header': {
            paddingBlockEnd: token.padding,
            borderBlockEnd: 0,
          },
        },
      },

      // 内容区折叠：grid 0fr/1fr + motion token。
      // 动画过程保持 overflow:hidden；完全展开后再 resting 放开裁剪。
      [` ${componentCls}-collapse-panel`]: {
        display: 'grid',
        gridTemplateRows: '0fr',
        transition: `grid-template-rows ${token.motionDurationMid} ${token.motionEaseInOut}`,
        [`&${componentCls}-collapse-panel-active`]: {
          gridTemplateRows: '1fr',
        },
        [`> ${componentCls}-collapse-panel-content`]: {
          overflow: 'hidden',
          minHeight: 0,
        },
        [`&${componentCls}-collapse-panel-resting > ${componentCls}-collapse-panel-content`]:
          {
            overflow: 'visible',
          },
        [`> ${componentCls}-collapse-panel-content-padded`]: {
          paddingInline: token.paddingLG,
          paddingBlock: token.padding,
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      },

      [`&&${componentCls}-size-small ${componentCls}-collapse-panel-content-padded`]:
        {
          paddingInline: token.paddingSM,
          paddingBlock: token.paddingSM,
        },

      // legacy 折叠时同步去掉 body 内边距（padding 已在 panel-content）
      [`&&${componentCls}-collapsible${componentCls}-legacy > ${componentCls}-body`]:
        {
          paddingBlock: 0,
          paddingInline: 0,
        },

      [`&${componentCls}-legacy > ${componentCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: token.paddingLG,
        paddingBlock: token.padding,
        paddingBlockEnd: 0,
        borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
        '&-border': {
          '&': {
            paddingBlockEnd: token.padding,
          },
          borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
        },

        '&-collapsible': {
          cursor: 'pointer',
        },
      },

      [`&${componentCls}-legacy > ${componentCls}-header ${componentCls}-title`]:
        {
          color: token.colorText,
          fontWeight: token.fontWeightStrong,
          fontSize:
            (token.components?.Card?.headerFontSize as number | undefined) ??
            token.fontSizeLG,
          lineHeight: token.lineHeight,
        },

      [`&${componentCls}-legacy > ${componentCls}-header ${componentCls}-extra`]:
        {
          color: token.colorText,
        },

      [`&${componentCls}-legacy${componentCls}-type-inner`]: {
        [`> ${componentCls}-header`]: {
          backgroundColor: token.colorFillAlter,
        },
      },

      // 折叠图标：AntdCard / legacy 共用
      [` ${componentCls}-collapsible-icon`]: {
        marginInlineEnd: token.marginXS,
        color: token.colorIconHover,
        ':hover': {
          color: token.colorPrimaryHover,
        },

        '& svg': {
          transition: `transform ${token.motionDurationMid}`,
        },
      },

      [`&${componentCls}-legacy > ${componentCls}-cover`]: {
        overflow: 'hidden',
        borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
        '& > *': {
          width: '100%',
          display: 'block',
        },
        '& img': {
          verticalAlign: 'middle',
        },
      },

      [`&${componentCls}-legacy > ${componentCls}-body`]: {
        display: 'block',
        boxSizing: 'border-box',
        height: '100%',
        paddingInline: token.paddingLG,
        paddingBlock: token.padding,
        borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
        '&-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },

      [`&&${componentCls}-legacy${componentCls}-size-small`]: {
        [`> ${componentCls}-header`]: {
          paddingInline: token.paddingSM,
          paddingBlock: token.paddingXS,
          paddingBlockEnd: 0,

          [`&${componentCls}-header-border`]: {
            paddingBlockEnd: token.paddingXS,
          },
        },
        [`> ${componentCls}-header ${componentCls}-title`]: {
          fontSize: token.fontSize,
        },
        [`> ${componentCls}-body`]: {
          paddingInline: token.paddingSM,
          paddingBlock: token.paddingSM,
        },
        [` ${componentCls}-divider`]: {
          marginBlock: token.marginLG,
          marginInline: token.marginXS,
          [`&${componentCls}-divider-horizontal`]: {
            marginBlock: token.marginXS,
            marginInline: token.marginLG,
          },
        },
        [`${componentCls}-header${componentCls}-header-collapsible`]: {
          paddingBlock: token.paddingXS,
        },
      },
    },

    [`${componentCls}-tabs`]: {
      [`&${componentCls}-tabs-ghost`]: {
        // #9052 ghost 模式下 tab 内容区不再保留 padding
        [`> ${token.antCls}-tabs-body-holder`]: {
          [`${token.antCls}-tabs-content`]: {
            padding: 0,
          },
        },
      },
      [`&${token.antCls}-tabs-top`]: {
        [`> ${token.antCls}-tabs-nav`]: {
          marginBlockEnd: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            paddingInlineStart: token.paddingLG,
          },
        },
        [`> ${token.antCls}-tabs-body-holder`]: {
          [`${token.antCls}-tabs-content`]: {
            padding: token.paddingLG,
          },
        },
      },
      [`&${token.antCls}-tabs-bottom`]: {
        [`> ${token.antCls}-tabs-nav`]: {
          marginBlockEnd: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            paddingInlineStart: token.paddingLG,
          },
        },
        [`> ${token.antCls}-tabs-body-holder`]: {
          [`${token.antCls}-tabs-content`]: {
            padding: token.paddingLG,
          },
        },
      },
      [`&${token.antCls}-tabs-left`]: {
        [`> ${token.antCls}-tabs-nav`]: {
          marginInlineEnd: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            paddingBlockStart: token.padding,
          },
        },
        [`> ${token.antCls}-tabs-body-holder`]: {
          [`${token.antCls}-tabs-content`]: {
            padding: token.paddingLG,
          },
        },
      },
      [`&${token.antCls}-tabs-right`]: {
        [`> ${token.antCls}-tabs-nav`]: {
          [`${token.antCls}-tabs-nav-list`]: {
            paddingBlockStart: token.padding,
          },
        },
        [`> ${token.antCls}-tabs-body-holder`]: {
          [`${token.antCls}-tabs-content`]: {
            padding: token.paddingLG,
          },
        },
      },
    },
  };
};

const GRID_COLUMNS = 24;

/**
 * 生成单列的栅格样式。仅依赖 componentCls（前缀类名），不依赖任何 token 数值，
 * 因此入参从完整 token 简化为字符串，函数本身可被缓存或在编译期推导。
 */
const genColStyle = (index: number, componentCls: string) => {
  if (index === 0) {
    return {
      [`${componentCls}-col-0`]: {
        display: 'none',
      },
    };
  }

  return {
    [`${componentCls}-col-${index}`]: {
      flexShrink: 0,
      width: `${(index / GRID_COLUMNS) * 100}%`,
    },
  };
};

/**
 * 25 个列宽规则与 token 数值无关，按 prefixCls 缓存，避免每个 useStyle
 * 实例重复构造数组与对象。绝大多数应用 prefixCls 唯一，命中缓存稳定。
 */
const gridStyleCache = new Map<string, ReturnType<typeof genColStyle>[]>();
const getGridStyleByCls = (componentCls: string) => {
  const cached = gridStyleCache.get(componentCls);
  if (cached) return cached;
  const result = Array.from({ length: GRID_COLUMNS + 1 }, (_, index) =>
    genColStyle(index, componentCls),
  );
  gridStyleCache.set(componentCls, result);
  return result;
};

export default function useStyle(prefixCls: string) {
  return useAntdStyle('ProCard', (token) => {
    const proCardToken: ProCardToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [
      genProCardStyle(proCardToken),
      getGridStyleByCls(proCardToken.componentCls),
    ];
  });
}
