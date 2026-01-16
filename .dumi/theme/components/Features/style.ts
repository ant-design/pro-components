import { theme } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import useResponsive from '../../utils/useResponsive';
import { getCustomToken } from '../../styles/customToken';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = (prefixCls: string = 'site') => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const responsive = useResponsive();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const styleId = `features-${prefixCls}`;
  const prefix = `${prefixCls}-features`;

  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);
  const contentMaxWidth = siteToken.contentMaxWidth;

  const classNames = useMemo(
    () => ({
      container: `${prefix} dumi-features-container`,
    }),
    [prefix],
  );

  useEffect(() => {
    if (!styleRef.current) {
      const style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    const style = styleRef.current;
    style.textContent = `
      .dumi-features-container {
        max-width: ${contentMaxWidth}px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;
      }
      @media (max-width: 768px) {
        .dumi-features-container {
          flex-direction: column;
          display: flex;
        }
      }
      @media (min-width: 769px) and (max-width: 1024px) {
        .dumi-features-container {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [contentMaxWidth, styleId]);

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
