import { theme } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import useResponsive from '../../utils/useResponsive';
import { getCustomToken } from '../../styles/customToken';
import { getCustomStylish } from '../../styles/customStylish';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const responsive = useResponsive();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const styleId = 'hero-styles';

  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);
  const stylish = useMemo(() => getCustomStylish(siteToken, token, isDarkMode), [siteToken, token, isDarkMode]);

  const classNames = useMemo(
    () => ({
      container: 'dumi-hero-container',
      titleContainer: 'dumi-hero-title-container',
      title: 'dumi-hero-title',
      titleShadow: 'dumi-hero-title-shadow',
      desc: 'dumi-hero-desc',
      actions: 'dumi-hero-actions',
      canvas: 'dumi-hero-canvas',
    }),
    [],
  );

  useEffect(() => {
    if (!styleRef.current) {
      const style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    const style = styleRef.current;
    const heroGradient = stylish.heroGradient.backgroundImage || '';
    const heroTextShadow = stylish.heroTextShadow.textShadow || '';
    const heroBlurBall = {
      filter: stylish.heroBlurBall.filter || '',
      background: stylish.heroBlurBall.background || '',
      backgroundSize: stylish.heroBlurBall.backgroundSize || '',
    };

    style.textContent = `
      @keyframes flow {
        0% { background-position: 0 0; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0 0; }
      }
      @keyframes glow {
        0% { background-position: 0 -100%; }
        50% { background-position: 200% 50%; }
        100% { background-position: 0 -100%; }
      }
      .dumi-hero-container {
        position: relative;
        text-align: center;
        box-sizing: border-box;
      }
      .dumi-hero-container + * {
        position: relative;
      }
      .dumi-hero-container > p {
        margin: 32px;
        color: ${token.colorTextSecondary};
        font-size: 20px;
        line-height: 1.6;
      }
      .dumi-hero-title-container {
        position: relative;
      }
      .dumi-hero-title {
        font-size: 68px;
        z-index: 10;
        color: transparent;
        margin: 0;
        font-family: AliPuHui, ${token.fontFamily};
      }
      .dumi-hero-title b {
        position: relative;
        z-index: 5;
        background-image: ${heroGradient};
        background-size: 300% 300%;
        animation: flow 5s ease infinite;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .dumi-hero-title-shadow {
        position: absolute;
        z-index: 0;
        color: ${isDarkMode ? token.colorWhite : token.colorTextBase};
        top: 0;
        left: 0;
        font-size: 68px;
        font-family: AliPuHui, ${token.fontFamily};
        font-weight: bold;
        text-shadow: ${heroTextShadow};
      }
      .dumi-hero-title-shadow b {
        color: transparent;
      }
      .dumi-hero-desc {
        font-size: ${token.fontSizeHeading3}px;
        color: ${token.colorTextSecondary};
      }
      .dumi-hero-actions {
        margin-top: 48px;
        display: flex;
        justify-content: center;
      }
      .dumi-hero-canvas {
        z-index: 10;
        pointer-events: none;
        position: absolute;
        top: -250px;
        left: 50%;
        transform: translateX(-50%) scale(1.5);
        width: 600px;
        height: 400px;
        opacity: 0.2;
        filter: ${heroBlurBall.filter};
        background: ${heroBlurBall.background};
        background-size: ${heroBlurBall.backgroundSize};
        animation: glow 10s ease infinite;
      }
      @media (max-width: 768px) {
        .dumi-hero-container > p {
          font-size: 16px;
        }
        .dumi-hero-title {
          font-size: 40px;
        }
        .dumi-hero-title-shadow {
          font-size: 40px;
        }
        .dumi-hero-desc {
          font-size: ${token.fontSizeHeading5}px;
          margin: 24px 16px;
        }
        .dumi-hero-actions {
          margin-top: 24px;
        }
        .dumi-hero-canvas {
          width: 200px;
          height: 300px;
        }
      }
    `;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [token, stylish, isDarkMode, styleId]);

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
