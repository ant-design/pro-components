import { theme } from 'antd';
import chroma from 'chroma-js';
import { useEffect, useMemo, useRef } from 'react';
import { getCustomToken } from '../../styles/customToken';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const styleId = 'burger-styles';
  const prefixCls = 'ant';
  const offset = 6;

  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);
  const headerHeight = siteToken.headerHeight;

  const classNames = useMemo(
    () => ({
      icon: 'site-burger-icon dumi-burger-icon',
      active: 'dumi-burger-active',
      container: 'dumi-burger-container',
      drawerRoot: 'dumi-burger-drawer-root',
      drawer: 'dumi-burger-drawer',
      menu: 'dumi-burger-menu',
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
    style.textContent = `
      .dumi-burger-icon,
      .dumi-burger-icon::before,
      .dumi-burger-icon::after {
        display: inline-block;
        height: 2px;
        background: ${token.colorTextSecondary};
        width: 16px;
        transition: all 150ms ease;
      }
      .dumi-burger-icon {
        position: relative;
      }
      .dumi-burger-icon::before,
      .dumi-burger-icon::after {
        position: absolute;
        left: 0;
        content: '';
      }
      .dumi-burger-icon::before {
        top: ${offset}px;
      }
      .dumi-burger-icon::after {
        top: -${offset}px;
      }
      .dumi-burger-active::before,
      .dumi-burger-active::after {
        background: ${token.colorText};
      }
      .dumi-burger-active {
        background: transparent;
      }
      .dumi-burger-active::before {
        top: 0;
        transform: rotate(-135deg);
      }
      .dumi-burger-active::after {
        top: 0;
        transform: rotate(135deg);
      }
      .dumi-burger-container {
        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
        border-radius: ${token.borderRadius}px;
        cursor: pointer;
      }
      .dumi-burger-drawer-root {
        top: ${headerHeight + 1}px;
      }
      .dumi-burger-drawer-root:focus-visible {
        outline: none;
      }
      .dumi-burger-drawer-root .${prefixCls}-drawer-mask {
        background: transparent;
        backdrop-filter: blur(7px);
        background: ${chroma(token.colorBgBase).alpha(0.5).hex()};
      }
      .dumi-burger-drawer-root .${prefixCls}-drawer-content-wrapper {
        box-shadow: none;
      }
      .dumi-burger-drawer.${prefixCls}-drawer-content {
        background: transparent;
      }
      .dumi-burger-menu {
        background: transparent;
        border-inline-end: transparent !important;
      }
      .dumi-burger-menu .${prefixCls}-menu-sub.${prefixCls}-menu-inline {
        background: ${chroma(token.colorBgLayout).alpha(0.8).hex()} !important;
      }
    `;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [token, prefixCls, offset, headerHeight, styleId]);

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
