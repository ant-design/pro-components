import { theme } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import { useThemeMode } from '../../../utils/useThemeMode';

export const useStyles = (prefixCls: string) => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const styleId = `native-select-item-${prefixCls}`;

  const classNames = useMemo(
    () => ({
      item: `${prefixCls}-item dumi-native-select-item`,
      selected: `${prefixCls}-item-selected dumi-native-select-item-selected`,
      active: `${prefixCls}-item-active dumi-native-select-item-active`,
    }),
    [prefixCls],
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
      .dumi-native-select-item {
        display: block;
        all: unset;
        width: 100%;
        padding: 12px 10px;
        border-radius: 5px;
        box-sizing: inherit;
        user-select: none;
        line-height: 1;
        scroll-margin: 50px;
        font-weight: normal;
        font-family: ${token.fontFamily};
        color: ${token.colorText};
        background: transparent;
      }
      .dumi-native-select-item:hover {
        background: ${token.colorFillTertiary};
      }
      .dumi-native-select-item-selected {
        color: ${token.colorPrimaryText};
        background: ${token.colorPrimaryBg};
        font-weight: bold;
      }
      .dumi-native-select-item-selected:hover {
        color: ${token.colorPrimaryTextHover};
        background: ${token.colorPrimaryBgHover};
      }
      .dumi-native-select-item-active {
        background: ${token.colorFillTertiary};
      }
    `;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [token, styleId]);

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
