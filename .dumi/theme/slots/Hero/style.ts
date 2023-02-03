import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, r, token, stylish, isDarkMode }) => ({
  container: css`
    position: relative;
    text-align: center;
    box-sizing: border-box;

    + * {
      position: relative;
    }

    > p {
      margin: 32px;
      color: ${token.colorTextSecondary};
      font-size: 20px;
      line-height: 1.6;

      ${r({
        mobile: { fontSize: 16 },
      })}
    }
  `,

  titleContainer: css`
    position: relative;
  `,
  title: css`
    font-size: 68px;
    z-index: 10;
    color: transparent;
    margin: 0;
    font-family: AliPuHui, ${token.fontFamily};

    ${r({
      mobile: { fontSize: 40 },
    })}

    b {
      position: relative;
      z-index: 5;
      ${stylish.heroGradient};
      ${stylish.heroGradientFlow}

      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `,
  titleShadow: css`
    position: absolute;
    z-index: 0;
    color: ${isDarkMode ? token.colorWhite : token.colorTextBase};

    top: 0;
    left: 0;
    font-size: 68px;
    font-family: AliPuHui, ${token.fontFamily};
    font-weight: bold;
    ${r({
      mobile: { fontSize: 40 },
    })}

    ${stylish.heroTextShadow}

    b {
      color: transparent;
    }
  `,

  desc: css`
    font-size: ${token.fontSizeHeading3}px;
    color: ${token.colorTextSecondary};

    ${r.mobile} {
      font-size: ${token.fontSizeHeading5}px;
      margin: 24px 16px;
    }
  `,

  actions: css`
    margin-top: 48px;
    display: flex;
    justify-content: center;

    ${r({
      mobile: { marginTop: 24 },
    })}
  `,
  canvas: css`
    z-index: 10;
    pointer-events: none;
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) scale(1.5);
    width: 600px;
    height: 400px;
    opacity: 0.2;
    ${stylish.heroBlurBall}

    ${r.mobile} {
      width: 200px;
      height: 300px;
    }
  `,
}));
