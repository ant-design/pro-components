import chroma from 'chroma-js';
import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export interface SiteToken {
  headerHeight: number;
  sidebarWidth: number;
  tocWidth: number;
  /**
   * 文本内容的最大宽度 1152
   */
  contentMaxWidth: number;

  gradientColor1: string;
  gradientColor2: string;
  gradientColor3: string;

  gradientHeroBgG: string;
  gradientIconDefault: string;

  colorSolid: string;
}

export const getCustomToken = (
  isDarkMode: boolean,
  antdToken: ReturnType<typeof theme.useToken>['token'],
): SiteToken => {
  const gradientColor1 = antdToken.blue;
  const gradientColor2 = isDarkMode ? antdToken.pink : antdToken.cyan;
  const gradientColor3 = antdToken.purple;
  const colorSolid = isDarkMode ? antdToken.colorWhite : '#000';

  return {
    headerHeight: 64,
    sidebarWidth: 240,
    tocWidth: 176,
    contentMaxWidth: 1152,

    colorSolid,

    gradientColor1,
    gradientColor2,
    gradientColor3,
    gradientHeroBgG: `radial-gradient(at 80% 20%, ${gradientColor1} 0%, ${gradientColor2} 80%, ${gradientColor3} 130%)`,

    gradientIconDefault: `radial-gradient(
        100% 100% at 50% 0,
        ${chroma(colorSolid)
          .alpha(isDarkMode ? 0.2 : 0.2)
          .hex()} 0,
        ${chroma(colorSolid)
          .alpha(isDarkMode ? 0.1 : 0.4)
          .hex()} 100%
      )`,
  };
};
