import { theme } from 'antd';
import { lighten, rgba } from 'polished';
import { useEffect, useMemo, useRef } from 'react';
import useResponsive from '../../utils/useResponsive';
import { getCustomToken } from '../../styles/customToken';
import { getCustomStylish } from '../../styles/customStylish';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = (rowNum: number, prefixCls: string = 'site') => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const responsive = useResponsive();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const styleId = `features-item-${prefixCls}-${rowNum}`;
  const prefix = `${prefixCls}-features`;

  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);
  const stylish = useMemo(() => getCustomStylish(siteToken, token, isDarkMode), [siteToken, token, isDarkMode]);

  const scaleUnit = 20;
  const coverCls = `${prefix}-cover`;
  const descCls = `${prefix}-description`;
  const titleCls = `${prefix}-title`;
  const imgCls = `${prefix}-img`;

  const classNames = useMemo(
    () => ({
      cell: 'dumi-features-item-cell',
      container: 'dumi-features-item-container',
      title: `${titleCls} dumi-features-item-title`,
      desc: `${descCls} dumi-features-item-desc`,
      imgContainer: `${coverCls} dumi-features-item-img-container`,
      img: `${imgCls} dumi-features-item-img`,
      link: 'dumi-features-item-link',
      blur: 'dumi-features-item-blur',
    }),
    [titleCls, descCls, coverCls, imgCls],
  );

  useEffect(() => {
    if (!styleRef.current) {
      const style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    const style = styleRef.current;
    const heroBlurBall = stylish.heroBlurBall;
    style.textContent = `
      .dumi-features-item-cell {
        overflow: hidden;
      }
      .dumi-features-item-container {
        transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
        z-index: 1;
        padding: 24px;
        border-radius: 24px;
        background: linear-gradient(135deg, ${token.colorFillContent}, ${token.colorFillQuaternary});
        position: relative;
      }
      .dumi-features-item-container:hover {
        scale: 1.03;
        background: linear-gradient(135deg, ${lighten(0.5, token.colorFillContent)}, ${lighten(0.5, token.colorFillQuaternary)});
        box-shadow: inset 0 0 0 1px ${token.colorBorder}, ${token.boxShadowSecondary};
      }
      .dumi-features-item-container:hover .${coverCls} {
        height: ${scaleUnit * rowNum}px;
        width: 100%;
        padding: 0;
      }
      .dumi-features-item-container:hover .${imgCls} {
        width: 100px;
        height: 100px;
      }
      .dumi-features-item-container:hover .${descCls} {
        position: absolute;
        visibility: hidden;
        opacity: 0;
      }
      .dumi-features-item-container:hover .${titleCls} {
        font-size: 14px;
      }
      .dumi-features-item-title {
        transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
        font-size: 20px;
        line-height: ${token.lineHeightHeading3};
        margin: 16px 0;
        color: ${token.colorText};
      }
      .dumi-features-item-desc {
        transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
        color: ${token.colorTextSecondary};
      }
      .dumi-features-item-desc quotient {
        color: ${token.colorTextDescription};
        display: block;
        margin: 12px 0;
        padding-left: 12px;
        position: relative;
      }
      .dumi-features-item-desc quotient:before {
        position: absolute;
        content: '';
        left: 0;
        display: block;
        border-radius: 2px;
        width: 4px;
        height: 100%;
        background: ${isDarkMode ? token.colorPrimary : token.colorPrimaryBgHover};
      }
      .dumi-features-item-img-container {
        transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
        background: ${token.colorFillContent};
        border-radius: 8px;
        opacity: 0.8;
        width: 24px;
        height: 24px;
        padding: 4px;
      }
      .dumi-features-item-img-container[image-style='primary'] {
        background: linear-gradient(135deg, ${siteToken.gradientColor1}, ${siteToken.gradientColor2});
      }
      .dumi-features-item-img-container[image-style='light'] {
        background: ${token.colorBgContainer};
      }
      .dumi-features-item-img-container[image-style='soon'] {
        opacity: 0.5;
        background: linear-gradient(135deg, ${rgba(siteToken.gradientColor2, 0.3)}, ${rgba(siteToken.gradientColor2, 0.3)} 50%, ${rgba(siteToken.gradientColor1, 0.3)});
      }
      .dumi-features-item-img {
        transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
        width: 20px;
        height: 20px;
        color: ${token.colorWhite};
      }
      .dumi-features-item-link {
        transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
        margin-top: 24px;
      }
      .dumi-features-item-link a {
        color: inherit;
        transition: all 0.3s;
      }
      .dumi-features-item-link a:hover,
      .dumi-features-item-link a:active {
        color: inherit;
      }
      .dumi-features-item-link a {
        color: ${token.colorTextDescription};
      }
      .dumi-features-item-link a:hover {
        color: ${token.colorPrimaryHover};
      }
      .dumi-features-item-blur {
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        filter: ${heroBlurBall.filter};
        background: ${heroBlurBall.background};
        background-size: ${heroBlurBall.backgroundSize};
        animation: glow 10s ease infinite;
        scale: 2;
        opacity: ${isDarkMode ? 0.05 : 0.08};
      }
      @keyframes glow {
        0% { background-position: 0 -100%; }
        50% { background-position: 200% 50%; }
        100% { background-position: 0 -100%; }
      }
      @media (max-width: 768px) {
        .dumi-features-item-blur {
          display: none;
        }
      }
    `;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [token, siteToken, stylish, isDarkMode, rowNum, scaleUnit, coverCls, descCls, titleCls, imgCls, styleId]);

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
    const prefix = `${prefixCls}-features`;

    const coverCls = `${prefix}-cover`;
    const descCls = `${prefix}-description`;
    const titleCls = `${prefix}-title`;
    const imgCls = `${prefix}-img`;

    // 通过简单估计，缩放值乘以 rowNum 就可以得到合适的尺寸
    const scaleUnit = 20;

    // 尺寸工具
    const genSize = (size: number) => css`
      width: ${size}px;
      height: ${size}px;
    `;

    const withTransition = css`
      transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
    `;

    return {
      cell: css`
        overflow: hidden;
      `,

      container: css`
        ${withTransition};

        z-index: 1;
        padding: 24px;
        border-radius: 24px;

        background: linear-gradient(
          135deg,
          ${token.colorFillContent},
          ${token.colorFillQuaternary}
        );

        position: relative;

        &:hover {
          scale: 1.03;

          background: linear-gradient(
            135deg,
            ${lighten(0.5, token.colorFillContent)},
            ${lighten(0.5, token.colorFillQuaternary)}
          );

          box-shadow: inset 0 0 0 1px ${token.colorBorder}, ${token.boxShadowSecondary};

          .${coverCls} {
            height: ${scaleUnit * rowNum}px;
            width: 100%;
            padding: 0;
          }

          .${imgCls} {
            ${genSize(100)};
          }

          .${descCls} {
            position: absolute;
            visibility: hidden;
            opacity: 0;
          }

          .${titleCls} {
            font-size: 14px;
          }
        }
      `,
      title: cx(
        titleCls,
        withTransition,
        css`
          font-size: 20px;
          line-height: ${token.lineHeightHeading3};
          margin: 16px 0;
          color: ${token.colorText};
        `,
      ),
      desc: cx(
        descCls,
        withTransition,
        css`
          color: ${token.colorTextSecondary};

          quotient {
            color: ${token.colorTextDescription};
            display: block;
            margin: 12px 0;
            padding-left: 12px;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              display: block;
              border-radius: 2px;
              width: 4px;
              height: 100%;
              background: ${isDarkMode ? token.colorPrimary : token.colorPrimaryBgHover};
            }
          }
        `,
      ),

      imgContainer: cx(
        coverCls,
        withTransition,
        css`
          background: ${token.colorFillContent};
          border-radius: 8px;
          opacity: 0.8;

          ${genSize(24)};
          padding: 4px;

          &[image-style='primary'] {
            background: linear-gradient(135deg, ${token.gradientColor1}, ${token.gradientColor2});
          }

          &[image-style='light'] {
            background: ${token.colorBgContainer};
          }

          &[image-style='soon'] {
            opacity: 0.5;
            background: linear-gradient(
              135deg,
              ${rgba(token.gradientColor2, 0.3)},
              ${rgba(token.gradientColor2, 0.3)} 50%,
              ${rgba(token.gradientColor1, 0.3)}
            );
          }
        `,
      ),

      img: cx(
        imgCls,
        withTransition,
        css`
          width: 20px;
          height: 20px;
          color: ${token.colorWhite};
        `,
      ),

      link: css`
        ${withTransition};

        margin-top: 24px;

        a {
          ${stylish.resetLinkColor};

          color: ${token.colorTextDescription};
          &:hover {
            color: ${token.colorPrimaryHover};
          }
        }
      `,

      blur: css`
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        ${stylish.heroBlurBall};
        scale: 2;
        opacity: ${isDarkMode ? 0.05 : 0.08};
        ${responsive.mobile} {
          display: none;
        }
      `,
    };
  },
);
