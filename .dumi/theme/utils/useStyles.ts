import { theme } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import useResponsive from './useResponsive';
import { useThemeMode } from './useThemeMode';
import { getCustomToken } from '../styles/customToken';
import { getCustomStylish } from '../styles/customStylish';

type StyleFunction = (params: {
  token: ReturnType<typeof theme.useToken>['token'];
  prefixCls?: string;
  responsive: ReturnType<typeof useResponsive>;
  isDarkMode: boolean;
  siteToken: ReturnType<typeof getCustomToken>;
  stylish: ReturnType<typeof getCustomStylish>;
}) => Record<string, string | React.CSSProperties>;

export const useStyles = (styleFn: StyleFunction, styleId: string) => {
  const { token } = theme.useToken();
  const responsive = useResponsive();
  const { isDarkMode } = useThemeMode();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const prefixCls = 'ant';

  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);
  const stylish = useMemo(() => getCustomStylish(siteToken, token, isDarkMode), [siteToken, token, isDarkMode]);

  const styles = useMemo(() => {
    const styleObj = styleFn({ token, prefixCls, responsive, isDarkMode, siteToken, stylish });
    const classNames: Record<string, string> = {};
    const cssRules: string[] = [];

    Object.entries(styleObj).forEach(([key, value]) => {
      const className = `dumi-${styleId}-${key}`;
      classNames[key] = className;

      if (typeof value === 'string') {
        // CSS 字符串，直接使用
        cssRules.push(`.${className} { ${value} }`);
      } else {
        // CSS 对象，转换为字符串
        const cssText = Object.entries(value)
          .map(([prop, val]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${cssProp}: ${val};`;
          })
          .join(' ');
        cssRules.push(`.${className} { ${cssText} }`);
      }
    });

    return { classNames, cssRules };
  }, [token, responsive, isDarkMode, siteToken, stylish, styleFn, styleId]);

  useEffect(() => {
    if (!styleRef.current) {
      const style = document.createElement('style');
      style.id = `dumi-styles-${styleId}`;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    const style = styleRef.current;
    style.textContent = styles.cssRules.join('\n');

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [styles.cssRules, styleId]);

  return {
    styles: styles.classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
    token,
  };
};
