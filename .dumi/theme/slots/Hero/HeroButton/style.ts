import { theme } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import { getCustomToken } from '../../../styles/customToken';
import { getCustomStylish } from '../../../styles/customStylish';
import { useThemeMode } from '../../../utils/useThemeMode';

export const useStyles = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const styleId = 'hero-button-styles';

  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);
  const stylish = useMemo(() => getCustomStylish(siteToken, token, isDarkMode), [siteToken, token, isDarkMode]);

  const classNames = useMemo(
    () => ({
      button: 'dumi-hero-button',
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
    const heroButtonGradient = stylish.heroButtonGradient.background || '';
    style.textContent = `
      @keyframes flow {
        0% { background-position: 0 0; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0 0; }
      }
      .dumi-hero-button {
        border: none;
        ${heroButtonGradient}
        background-size: 200% 100%;
        animation: flow 5s ease infinite;
      }
      .dumi-hero-button:hover {
        animation: none;
      }
    `;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [stylish, styleId]);

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
