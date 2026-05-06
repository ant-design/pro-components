import type { GenerateStyle } from '../../../../provider';
import { resetComponent } from '../../../../utils';
import type { AppsLogoComponentsToken } from './index';
import { easeOut, motionDuration } from './index';

/**
 * Default（含描述）列表的视觉参数。抽成常量而不是散落的数字，
 * 业务侧若要整体调 item 尺寸、hover 幅度，只改这里即可。
 */
const layout = {
  /** Popover 可视区最大高度：视口减去顶部 logo + 边距（约 48px）的经验值 */
  contentMaxOffset: 48,
  listMaxWidth: 720,
  itemWidth: 328,
  itemMaxHeight: 72,
  itemPadding: 16,
  groupMarginBottom: 16,
  groupTitleMargin: '16px 0 8px 12px',
  groupTitleFirstChildMarginTop: 12,
  /** 卡片 hover 浮起幅度 */
  hoverTranslateY: -2,
  /** icon hover 轻微放大倍数 */
  imgHoverScale: 1.04,
  imgSize: 40,
  linkFontSize: 12,
  linkGap: 14,
  linkDescLineHeight: '20px',
  linkTitleLineHeight: '22px',
};

/** 标题行（group-title）视觉，与 `index.ts` 中 `-item-title` 语义一致，就近保留避免跨文件耦合 */
const groupTitle = {
  fontWeight: 600,
  fontSize: 16,
  opacity: 0.85,
  lineHeight: 1.5,
};

const genAppsLogoComponentsDefaultListStyle: GenerateStyle<
  AppsLogoComponentsToken
> = (token) => {
  /**
   * 行 hover 过渡：transform / bg / box-shadow 三轨并发，共享 easeOut + mid duration。
   * 用数组 join 表达多 property transition，避免一长串字面量里的 bezier 魔法字符串。
   */
  const rowTransition = [
    `transform ${motionDuration.mid} ${easeOut}`,
    `background-color ${motionDuration.fast} ${easeOut}`,
    `box-shadow ${motionDuration.mid} ${easeOut}`,
  ].join(', ');

  return {
    '&-content': {
      maxHeight: `calc(100vh - ${layout.contentMaxOffset}px)`,
      overflow: 'auto',
      '&-list': {
        boxSizing: 'content-box',
        maxWidth: layout.listMaxWidth,
        marginBlock: 0,
        marginInline: 0,
        paddingBlock: 0,
        paddingInline: 0,
        listStyle: 'none',
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          width: layout.itemWidth,
          maxHeight: layout.itemMaxHeight,
          paddingInline: layout.itemPadding,
          paddingBlock: layout.itemPadding,
          verticalAlign: 'top',
          listStyleType: 'none',
          /**
           * Item 交互过渡：transform / background / box-shadow 三轨并发，
           * hover 时整张卡轻微浮起 + 阴影，active 下按；曲线 `easeOut` 与根样式统一。
           */
          transition: rowTransition,
          borderRadius: token.borderRadius,
          cursor: 'pointer',
          '&-group': {
            marginBottom: layout.groupMarginBottom,
            '&-title': {
              margin: layout.groupTitleMargin,
              fontWeight: groupTitle.fontWeight,
              color: token.colorTextHeading,
              fontSize: groupTitle.fontSize,
              opacity: groupTitle.opacity,
              lineHeight: groupTitle.lineHeight,
              '&:first-child': {
                marginTop: layout.groupTitleFirstChildMarginTop,
              },
            },
          },

          '&:hover': {
            backgroundColor: token.colorBgTextHover,
            transform: `translateY(${layout.hoverTranslateY}px)`,
            /** 用 antd 标准阴影 token，避免硬编码两层 rgba */
            boxShadow: token.boxShadowSecondary,
            /** icon 伴随轻微放大，与卡片浮起协调 */
            '& > a > img': { transform: `scale(${layout.imgHoverScale})` },
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: 'none',
          },
          '* div': resetComponent?.(token),
          a: {
            display: 'flex',
            height: '100%',
            fontSize: layout.linkFontSize,
            textDecoration: 'none',
            '& > img': {
              width: layout.imgSize,
              height: layout.imgSize,
              transition: `transform ${motionDuration.mid} ${easeOut}`,
            },
            '& > div': {
              marginInlineStart: layout.linkGap,
              color: token.colorTextHeading,
              fontSize: token.fontSize,
              lineHeight: layout.linkTitleLineHeight,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
            '& > div > span': {
              color: token.colorTextSecondary,
              fontSize: layout.linkFontSize,
              lineHeight: layout.linkDescLineHeight,
            },
          },
        },
      },
    },
  };
};

export { genAppsLogoComponentsDefaultListStyle };
