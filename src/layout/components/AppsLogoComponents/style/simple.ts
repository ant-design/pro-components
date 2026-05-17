import type { GenerateStyle } from '../../../../provider';
import type { AppsLogoComponentsToken } from './index';
import { easeOut, motionDuration } from './index';

/**
 * Simple 模式（仅 icon + title）的视觉参数。
 * 水平方向：`itemSize` 为每个格子的 border-box 宽度；外加左右 margin 各 `itemMargin`，
 * 即单格占宽 `itemSize + itemMargin × 2`（104 + 16 = 120），两列总宽 `listWidth` 240。
 * `li` 必须使用 border-box，否则 width 只包住 content、padding 外扩会破坏两列换行。
 */
const layout = {
  contentMaxOffset: 48,
  /** 两列固定宽度：`itemSize(104) + itemMargin(8)×2 = 120`, 两列 = 240 */
  listWidth: 240,
  itemSize: 104,
  itemMargin: 8,
  itemPaddingInline: 8,
  itemPaddingBlock: 8,
  groupMarginBottom: 16,
  groupTitleMargin: '16px 0 8px 12px',
  groupTitleFirstChildMarginTop: 12,
  avatarSize: 40,
  avatarFontSize: 22,
  avatarLineHeight: '40px',
  /** 与 img 一致略放大，避免无限 keyframes 抢视觉 */
  avatarHoverScale: 1.05,
  imgHoverScale: 1.05,
  linkFontSize: 12,
  linkTitleMarginBlockStart: 4,
  /** 单行标题与 12px 字号匹配；多行若以后加回需同步调大 */
  linkTitleLineHeight: 1.25,
  linkDescLineHeight: '20px',
  /** 字符头像背景渐变两端色（避免散落硬编码 hex） */
  avatarGradient: 'linear-gradient(180deg, #E8F0FB 0%, #F6F8FC 100%)',
};

const groupTitle = {
  fontWeight: 600,
  fontSize: 16,
  opacity: 0.85,
  lineHeight: 1.5,
};

const genAppsLogoComponentsSimpleListStyle: GenerateStyle<
  AppsLogoComponentsToken
> = (token) => {
  const rowTransition = [
    `background-color ${motionDuration.fast} ${easeOut}`,
    `box-shadow ${motionDuration.fast} ${easeOut}`,
  ].join(', ');

  return {
    '&-content': {
      maxHeight: `calc(100vh - ${layout.contentMaxOffset}px)`,
      overflow: 'auto',
      '&-list': {
        boxSizing: 'border-box',
        /**
         * 固定为"两列网格"：使用 `width` 而非 `maxWidth` 才能强制换行，
         * 避免 inline-block 子项把 popover 面板撑成一长排。
         * - 2 项 → 1 排 2 列；4 项 → 2 排 2 列（默认两排）；8 项 → 4 排 2 列。
         * 业务侧可覆盖 `${cls}-simple-content-list` 的 width 调整列数。
         */
        width: layout.listWidth,
        marginBlock: 0,
        marginInline: 0,
        paddingBlock: 0,
        paddingInline: 0,
        listStyle: 'none',
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          boxSizing: 'border-box',
          width: layout.itemSize,
          marginBlock: layout.itemMargin,
          marginInline: layout.itemMargin,
          paddingInline: layout.itemPaddingInline,
          paddingBlock: layout.itemPaddingBlock,
          verticalAlign: 'top',
          listStyleType: 'none',
          /** 紧凑格：只做背景 + inset 描边过渡，避免整格位移 + 外阴影裁切/发糊 */
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
            boxShadow: `inset 0 0 0 1px ${token.colorBorderSecondary}`,
            [`& > a > ${token.componentCls}-simple-avatar`]: {
              transform: `scale(${layout.avatarHoverScale})`,
            },
            '& > a > img': { transform: `scale(${layout.imgHoverScale})` },
          },
          '&:active': {
            backgroundColor: token.colorFillTertiary,
            boxShadow: `inset 0 0 0 1px ${token.colorBorder}`,
          },
          a: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            width: '100%',
            minWidth: 0,
            margin: 0,
            /** 与 `li` 内边距二选一：留白在 `li`，避免主题给 `a` 再叠一层 padding */
            padding: 0,
            fontSize: layout.linkFontSize,
            textDecoration: 'none',
            /**
             * 字符 chip 头像使用 className 而非 id（旧代码 `#avatarLogo` 会在列表里
             * 生成重复 id，见 `SimpleContent.renderLogo` 的重构）。
             */
            [`& > ${token.componentCls}-simple-avatar`]: {
              width: layout.avatarSize,
              height: layout.avatarSize,
              margin: '0 auto',
              color: token.colorPrimary,
              fontSize: layout.avatarFontSize,
              lineHeight: layout.avatarLineHeight,
              textAlign: 'center',
              backgroundImage: layout.avatarGradient,
              borderRadius: token.borderRadius,
              transform: 'scale(1)',
              transition: `transform ${motionDuration.mid} ${easeOut}`,
            },
            '& > img': {
              width: layout.avatarSize,
              height: layout.avatarSize,
              transition: `transform ${motionDuration.mid} ${easeOut}`,
            },
            '& > div': {
              marginBlockStart: layout.linkTitleMarginBlockStart,
              width: '100%',
              minWidth: 0,
            },
            /**
             * 标题：九宫格场景默认单行 + 省略，与图标居中对齐、格内更整齐；
             * 若业务名普遍很长需要折行，可改为两行 `line-clamp`（勿与 nowrap 同开）。
             */
            '& > div > div': {
              margin: 0,
              color: token.colorTextHeading,
              fontSize: layout.linkFontSize,
              lineHeight: layout.linkTitleLineHeight,
              textAlign: 'center',
              overflow: 'hidden',
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

export { genAppsLogoComponentsSimpleListStyle };
