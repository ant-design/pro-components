import { GetCustomStylish } from 'antd-style';
import chroma from 'chroma-js';

declare module 'antd-style' {
  interface CustomStylish extends SiteStylish {}
}

export interface SiteStylish {
  clickableText: string;
  resetLinkColor: string;

  heroButtonGradient: string;
  heroGradient: string;
  heroTextShadow: string;
  heroGradientFlow: string;
  heroBlurBall: string;

  iconGradientDefault: string;
}

export const getCustomStylish: GetCustomStylish<SiteStylish> = ({ css, token, isDarkMode }) => {
  return {
    clickableText: css`
      cursor: pointer;
      color: ${token.colorTextSecondary};

      &:hover {
        color: ${token.colorText};
      }
    `,
    resetLinkColor: css`
      color: inherit;

      &:hover,
      &:active {
        color: inherit;
      }
    `,

    heroButtonGradient: css`
      background: linear-gradient(90deg, ${token.gradientColor1} 0%, ${token.gradientColor2} 100%);
    `,

    heroGradient: css`
      background-image: ${token.gradientHeroBgG};
      background-size: 300% 300%;
    `,

    heroGradientFlow: css`
      animation: flow 5s ease infinite;

      @keyframes flow {
        0% {
          background-position: 0 0;
        }

        50% {
          background-position: 100% 100%;
        }

        100% {
          background-position: 0 0;
        }
      }
    `,
    heroTextShadow: css`
      text-shadow: 0 8px 20px ${chroma(token.gradientColor2).alpha(0.2).hex()},
        0 8px 60px ${chroma(token.gradientColor3).alpha(0.2).hex()},
        0 8px 80px
          ${chroma(token.cyan)
            .alpha(isDarkMode ? 0.2 : 0.4)
            .hex()};
    `,
    heroBlurBall: css`
      filter: blur(69px);
      background: linear-gradient(
        135deg,
        ${token.gradientColor3} 0%,
        ${token.gradientColor1} 30%,
        ${token.red} 70%,
        ${token.cyan} 100%
      );
      background-size: 200% 200%;
      animation: glow 10s ease infinite;

      @keyframes glow {
        0% {
          background-position: 0 -100%;
        }

        50% {
          background-position: 200% 50%;
        }

        100% {
          background-position: 0 -100%;
        }
      }
    `,

    iconGradientDefault: css`
      radial-gradient(
        100% 100% at 50% 0,
        ${chroma(token.colorSolid).alpha(0.2).hex()} 0,
        ${chroma(token.colorSolid).alpha(0.1).hex()} 100%
      )`,
  };
};
