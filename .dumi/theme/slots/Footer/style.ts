import { theme } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import useResponsive from '../../utils/useResponsive';
import { getCustomToken } from '../../styles/customToken';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const responsive = useResponsive();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const styleId = 'slots-footer-styles';
  const prefix = 'rc-footer';

  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);
  const contentMaxWidth = siteToken.contentMaxWidth;

  const classNames = useMemo(
    () => ({
      container: 'dumi-slots-footer-container',
      footer: 'dumi-slots-footer-footer',
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
      .dumi-slots-footer-container {
        grid-area: footer;
        border-top: 1px solid ${token.colorSplit};
        color: ${token.colorTextDescription};
        text-align: center;
        align-self: stretch;
      }
      .dumi-slots-footer-footer {
        color: ${token.colorTextSecondary};
        font-size: 14px;
        line-height: 1.5;
        background-color: ${token.colorBgLayout};
      }
      .dumi-slots-footer-footer.${prefix} a {
        color: ${token.colorTextTertiary};
        text-decoration: none;
        transition: all 0.3s;
      }
      .dumi-slots-footer-footer.${prefix} a:hover {
        color: ${token.colorLinkHover};
      }
      .dumi-slots-footer-footer .${prefix}-container {
        width: 100%;
        max-width: ${contentMaxWidth}px;
        margin: auto;
        padding: 60px 0 20px;
      }
      .dumi-slots-footer-footer .${prefix}-columns {
        display: flex;
        justify-content: space-around;
      }
      .dumi-slots-footer-footer .${prefix}-column h2 {
        position: relative;
        margin: 0 auto;
        color: ${token.colorText};
        font-weight: 500;
        font-size: 16px;
      }
      .dumi-slots-footer-footer .${prefix}-column-icon {
        position: relative;
        top: -1px;
        display: inline-block;
        width: 22px;
        text-align: center;
        vertical-align: middle;
        margin-inline-end: 0.5em;
      }
      .dumi-slots-footer-footer .${prefix}-column-icon > span,
      .dumi-slots-footer-footer .${prefix}-column-icon > svg,
      .dumi-slots-footer-footer .${prefix}-column-icon img {
        display: block;
        width: 100%;
      }
      .dumi-slots-footer-footer .${prefix}-item {
        margin: 12px 0;
      }
      .dumi-slots-footer-footer .${prefix}-item-icon {
        position: relative;
        top: -1px;
        display: inline-block;
        width: 16px;
        text-align: center;
        vertical-align: middle;
        margin-inline-end: 0.4em;
      }
      .dumi-slots-footer-footer .${prefix}-item-icon > span,
      .dumi-slots-footer-footer .${prefix}-item-icon > svg,
      .dumi-slots-footer-footer .${prefix}-item-icon img {
        display: block;
        width: 100%;
      }
      .dumi-slots-footer-footer .${prefix}-item-separator {
        margin: 0 0.3em;
      }
      .dumi-slots-footer-footer .${prefix}-bottom-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px 0;
        font-size: 16px;
        line-height: 32px;
        text-align: center;
        border-top: 1px solid ${token.colorBorderSecondary};
      }
      .dumi-slots-footer-footer .${prefix}-light {
        color: rgba(0, 0, 0, 0.85);
        background-color: transparent;
      }
      .dumi-slots-footer-footer .${prefix}-light h2,
      .dumi-slots-footer-footer .${prefix}-light a {
        color: rgba(0, 0, 0, 0.85);
      }
      .dumi-slots-footer-footer .${prefix}-light .${prefix}-bottom-container {
        border-top-color: #e8e8e8;
      }
      .dumi-slots-footer-footer .${prefix}-light .${prefix}-item-separator,
      .dumi-slots-footer-footer .${prefix}-light .${prefix}-item-description {
        color: rgba(0, 0, 0, 0.45);
      }
      @media (max-width: 768px) {
        .dumi-slots-footer-container {
          border: none;
          flex-direction: column;
        }
        .dumi-slots-footer-footer .${prefix} {
          text-align: center;
        }
        .dumi-slots-footer-footer .${prefix}-container {
          padding: 40px 0;
        }
        .dumi-slots-footer-footer .${prefix}-columns {
          display: block;
        }
        .dumi-slots-footer-footer .${prefix}-column {
          display: block;
          margin-bottom: 40px;
        }
        .dumi-slots-footer-footer .${prefix}-column:last-child {
          margin-bottom: 0;
        }
      }
    `;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [token, prefix, contentMaxWidth, styleId]);

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
