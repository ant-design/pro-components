import chroma from 'chroma-js';
import type { SiteToken } from './customToken';
import { theme } from 'antd';

export interface SiteStylish {
  clickableText: React.CSSProperties;
  resetLinkColor: React.CSSProperties;
  heroButtonGradient: React.CSSProperties;
  heroGradient: React.CSSProperties;
  heroTextShadow: React.CSSProperties;
  heroGradientFlow: React.CSSProperties;
  heroBlurBall: React.CSSProperties;
  iconGradientDefault: string;
}

export const getCustomStylish = (
  siteToken: SiteToken,
  antdToken: ReturnType<typeof theme.useToken>['token'],
  isDarkMode: boolean,
): SiteStylish => {
  return {
    clickableText: {
      cursor: 'pointer',
      color: antdToken.colorTextSecondary,
      transition: 'color 0.3s',
    },
    resetLinkColor: {
      color: 'inherit',
    },
    heroButtonGradient: {
      background: `linear-gradient(90deg, ${siteToken.gradientColor1} 0%, ${siteToken.gradientColor2} 100%)`,
    },
    heroGradient: {
      backgroundImage: siteToken.gradientHeroBgG,
      backgroundSize: '300% 300%',
    },
    heroGradientFlow: {
      animation: 'flow 5s ease infinite',
    },
    heroTextShadow: {
      textShadow: `0 8px 20px ${chroma(siteToken.gradientColor2)
        .alpha(0.2)
        .hex()}, 0 8px 60px ${chroma(siteToken.gradientColor3)
        .alpha(0.2)
        .hex()}, 0 8px 80px ${chroma(antdToken.cyan)
        .alpha(isDarkMode ? 0.2 : 0.4)
        .hex()}`,
    },
    heroBlurBall: {
      filter: 'blur(69px)',
      background: `linear-gradient(135deg, ${siteToken.gradientColor3} 0%, ${siteToken.gradientColor1} 30%, ${antdToken.red} 70%, ${antdToken.cyan} 100%)`,
      backgroundSize: '200% 200%',
      animation: 'glow 10s ease infinite',
    },
    iconGradientDefault: `radial-gradient(100% 100% at 50% 0, ${chroma(siteToken.colorSolid)
      .alpha(0.2)
      .hex()} 0, ${chroma(siteToken.colorSolid).alpha(0.1).hex()} 100%)`,
  };
};
