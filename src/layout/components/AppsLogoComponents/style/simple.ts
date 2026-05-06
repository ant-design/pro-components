import type { GenerateStyle } from '../../../../provider';
import type { AppsLogoComponentsToken } from './index';
import { easeOut, motionDuration } from './index';

/**
 * Simple 模式（仅 icon + title）的视觉参数。
 * 单个 item 实际占位 = `itemSize + itemMargin × 2`（宽高都是 104 + 16 = 120）。
 */
const layout = {
  contentMaxOffset: 48,
  /** 两列固定宽度：`itemSize(104) + itemMargin(8)×2 = 120`, 两列 = 240 */
  listWidth: 240,
  itemSize: 104,
  itemMargin: 8,
  itemPadding: 24,
  groupMarginBottom: 16,
  groupTitleMargin: '16px 0 8px 12px',
  groupTitleFirstChildMarginTop: 12,
  hoverTranslateY: -2,
  avatarSize: 40,
  avatarFontSize: 22,
  avatarLineHeight: '40px',
  avatarHoverScale: 1.06,
  imgHoverScale: 1.06,
  linkFontSize: 12,
  linkTitleMarginBlockStart: 5,
  linkTitleLineHeight: '22px',
  linkDescLineHeight: '20px',
  /** 字符头像呼吸循环周期 */
  avatarPulseDuration: '1.6s',
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
    `transform ${motionDuration.mid} ${easeOut}`,
    `background-color ${motionDuration.fast} ${easeOut}`,
    `box-shadow ${motionDuration.mid} ${easeOut}`,
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
          width: layout.itemSize,
          height: layout.itemSize,
          marginBlock: layout.itemMargin,
          marginInline: layout.itemMargin,
          paddingInline: layout.itemPadding,
          paddingBlock: layout.itemPadding,
          verticalAlign: 'top',
          listStyleType: 'none',
          /** 与 default 列表共享的 hover 过渡：transform + 背景 + 阴影 */
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
            boxShadow: token.boxShadowSecondary,
            /** 字符 chip 头像：hover 时跑呼吸动画 */
            [`& > a > ${token.componentCls}-simple-avatar`]: {
              animationName: `${token.componentCls}-avatar-pulse`.replace(
                /^\./,
                '',
              ),
              animationDuration: layout.avatarPulseDuration,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            },
            '& > a > img': { transform: `scale(${layout.imgHoverScale})` },
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: 'none',
          },
          a: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
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
              transition: `transform ${motionDuration.slow} ${easeOut}`,
            },
            '& > img': {
              width: layout.avatarSize,
              height: layout.avatarSize,
              transition: `transform ${motionDuration.mid} ${easeOut}`,
            },
            '& > div': {
              marginBlockStart: layout.linkTitleMarginBlockStart,
              marginInlineStart: 0,
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

export { genAppsLogoComponentsSimpleListStyle };
