import { theme } from 'antd';
import { getCustomToken } from '../styles/customToken';
import type { SiteToken } from '../styles/customToken';

export const setCSSVariables = (
  token: ReturnType<typeof theme.useToken>['token'],
  siteToken: SiteToken,
  isDarkMode: boolean,
) => {
  const root = document.documentElement;

  // Ant Design Token Variables
  root.style.setProperty('--ant-color-split', token.colorSplit);
  root.style.setProperty('--ant-color-text-description', token.colorTextDescription);
  root.style.setProperty('--ant-color-text-secondary', token.colorTextSecondary);
  root.style.setProperty('--ant-color-text-tertiary', token.colorTextTertiary);
  root.style.setProperty('--ant-color-text', token.colorText);
  root.style.setProperty('--ant-color-text-placeholder', token.colorTextPlaceholder);
  root.style.setProperty('--ant-color-bg-layout', token.colorBgLayout);
  root.style.setProperty('--ant-color-bg-container', token.colorBgContainer);
  root.style.setProperty('--ant-color-bg-elevated', token.colorBgElevated);
  root.style.setProperty('--ant-color-bg-mask', token.colorBgMask);
  root.style.setProperty('--ant-color-fill-secondary', token.colorFillSecondary);
  root.style.setProperty('--ant-color-fill-tertiary', token.colorFillTertiary);
  root.style.setProperty('--ant-color-fill-content', token.colorFillContent);
  root.style.setProperty('--ant-color-fill-quaternary', token.colorFillQuaternary);
  root.style.setProperty('--ant-color-border', token.colorBorder);
  root.style.setProperty('--ant-color-border-secondary', token.colorBorderSecondary);
  root.style.setProperty('--ant-color-link', token.colorLink);
  root.style.setProperty('--ant-color-link-hover', token.colorLinkHover);
  root.style.setProperty('--ant-color-link-active', token.colorLinkActive);
  root.style.setProperty('--ant-color-primary', token.colorPrimary);
  root.style.setProperty('--ant-color-primary-text', token.colorPrimaryText);
  root.style.setProperty('--ant-color-primary-text-hover', token.colorPrimaryTextHover);
  root.style.setProperty('--ant-color-primary-bg', token.colorPrimaryBg);
  root.style.setProperty('--ant-color-primary-bg-hover', token.colorPrimaryBgHover);
  root.style.setProperty('--ant-color-primary-hover', token.colorPrimaryHover);
  root.style.setProperty('--ant-color-white', token.colorWhite);
  root.style.setProperty('--ant-font-size', `${token.fontSize}px`);
  root.style.setProperty('--ant-font-size-lg', `${token.fontSizeLG}px`);
  root.style.setProperty('--ant-font-size-heading-3', `${token.fontSizeHeading3}px`);
  root.style.setProperty('--ant-font-size-heading-5', `${token.fontSizeHeading5}px`);
  root.style.setProperty('--ant-font-family', token.fontFamily);
  root.style.setProperty('--ant-line-height', token.lineHeight.toString());
  root.style.setProperty('--ant-line-height-lg', token.lineHeightLG.toString());
  root.style.setProperty('--ant-line-height-heading-3', token.lineHeightHeading3.toString());
  root.style.setProperty('--ant-border-radius', `${token.borderRadius}px`);
  root.style.setProperty('--ant-control-height', `${token.controlHeight}px`);
  root.style.setProperty('--ant-control-height-lg', `${token.controlHeightLG}px`);
  root.style.setProperty('--ant-box-shadow', token.boxShadow);
  root.style.setProperty('--ant-box-shadow-secondary', token.boxShadowSecondary);
  root.style.setProperty('--ant-z-index-popup-base', token.zIndexPopupBase.toString());
  root.style.setProperty('--ant-motion-duration-slow', token.motionDurationSlow);
  root.style.setProperty('--ant-motion-ease-in-out-circ', token.motionEaseInOutCirc);

  // Site Token Variables
  root.style.setProperty('--dumi-header-height', `${siteToken.headerHeight}px`);
  root.style.setProperty('--dumi-sidebar-width', `${siteToken.sidebarWidth}px`);
  root.style.setProperty('--dumi-toc-width', `${siteToken.tocWidth}px`);
  root.style.setProperty('--dumi-content-max-width', `${siteToken.contentMaxWidth}px`);
  root.style.setProperty('--dumi-gradient-color-1', siteToken.gradientColor1);
  root.style.setProperty('--dumi-gradient-color-2', siteToken.gradientColor2);
  root.style.setProperty('--dumi-gradient-color-3', siteToken.gradientColor3);
};
