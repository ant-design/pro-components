import { createStyles } from 'antd-style';
import chroma from 'chroma-js';

export const useStyles = createStyles(({ token, responsive, css, stylish, isDarkMode }) => ({
  container: css`
    max-width: ${token.contentMaxWidth}px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row dense;
    grid-auto-rows: 24px;
    gap: 16px;

    margin: 0 16px;

    ${responsive({
      mobile: css`
        flex-direction: column;
        display: flex;
      `,
      laptop: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      // desktop: {
      //   gridTemplateColumns: 'repeat(3, 1fr)',
      // },
    })}
  `,

  cell: css`
    z-index: 1;
    padding: 24px;
    border-radius: 24px;
    background: linear-gradient(135deg, ${token.colorFillContent}, ${token.colorFillQuaternary});
    position: relative;

    h3 {
      font-size: 20px;
      color: ${token.colorText};
    }
    p {
      color: ${token.colorTextSecondary};

      quotient {
        color: ${token.colorTextDescription};
        display: block;
        margin: 12px 0;
        padding-left: 12px;
        position: relative;
        &:before {
          position: absolute;
          content: '';
          left: 0;
          display: block;
          border-radius: 2px;
          width: 4px;
          height: 100%;
          background: ${isDarkMode ? token.colorPrimary : token.colorPrimaryBgHover};
        }
      }
    }
  `,
  imgContainer: css`
    background: ${token.colorFillContent};
    border-radius: 8px;
    opacity: 0.8;

    &[image-style='primary'] {
      background: linear-gradient(135deg, ${token.gradientColor1}, ${token.gradientColor2});
    }

    &[image-style='light'] {
      background: ${token.colorBgContainer};
    }

    &[image-style='soon'] {
      opacity: 0.5;
      background: linear-gradient(
        135deg,
        ${chroma(token.gradientColor2).alpha(0.3).hex()},
        ${chroma(token.gradientColor2).alpha(0.3).hex()} 50%,
        ${chroma(token.gradientColor1).alpha(0.3).hex()}
      );
    }
  `,

  img: css`
    width: 20px;
    height: 20px;
    color: ${token.colorWhite};
  `,
  link: css`
    margin-top: 24px;

    a {
      ${stylish.resetLinkColor};

      color: ${token.colorTextDescription};
      &:hover {
        color: ${token.colorPrimaryHover};
      }
    }
  `,

  blur: css`
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    ${stylish.heroBlurBall};
    scale: 2;
    opacity: 0.05;
    ${responsive.mobile} {
      display: none;
    }
  `,
}));
