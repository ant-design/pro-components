import { createStyles } from 'antd-style';
import { lighten, rgba } from 'polished';

export const useStyles = createStyles(
  ({ token, prefixCls, responsive, css, stylish, isDarkMode, cx }, rowNum: number) => {
    const prefix = `${prefixCls}-features`;

    const coverCls = `${prefix}-cover`;
    const descCls = `${prefix}-description`;
    const titleCls = `${prefix}-title`;
    const imgCls = `${prefix}-img`;

    // 通过简单估计，缩放值乘以 rowNum 就可以得到合适的尺寸
    const scaleUnit = 20;

    // 尺寸工具
    const genSize = (size: number) => css`
      width: ${size}px;
      height: ${size}px;
    `;

    const withTransition = css`
      transition: all ${token.motionDurationSlow} ${token.motionEaseInOutCirc};
    `;

    return {
      cell: css`
        overflow: hidden;
      `,

      container: css`
        ${withTransition};

        z-index: 1;
        padding: 24px;
        border-radius: 24px;

        background: linear-gradient(
          135deg,
          ${token.colorFillContent},
          ${token.colorFillQuaternary}
        );

        position: relative;

        &:hover {
          scale: 1.03;

          background: linear-gradient(
            135deg,
            ${lighten(0.5, token.colorFillContent)},
            ${lighten(0.5, token.colorFillQuaternary)}
          );

          box-shadow: inset 0 0 0 1px ${token.colorBorder}, ${token.boxShadowSecondary};

          .${coverCls} {
            height: ${scaleUnit * rowNum}px;
            width: 100%;
            padding: 0;
          }

          .${imgCls} {
            ${genSize(100)};
          }

          .${descCls} {
            position: absolute;
            visibility: hidden;
            opacity: 0;
          }

          .${titleCls} {
            font-size: 14px;
          }
        }
      `,
      title: cx(
        titleCls,
        withTransition,
        css`
          font-size: 20px;
          line-height: ${token.lineHeightHeading3};
          margin: 16px 0;
          color: ${token.colorText};
        `,
      ),
      desc: cx(
        descCls,
        withTransition,
        css`
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
        `,
      ),

      imgContainer: cx(
        coverCls,
        withTransition,
        css`
          background: ${token.colorFillContent};
          border-radius: 8px;
          opacity: 0.8;

          ${genSize(24)};
          padding: 4px;

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
              ${rgba(token.gradientColor2, 0.3)},
              ${rgba(token.gradientColor2, 0.3)} 50%,
              ${rgba(token.gradientColor1, 0.3)}
            );
          }
        `,
      ),

      img: cx(
        imgCls,
        withTransition,
        css`
          width: 20px;
          height: 20px;
          color: ${token.colorWhite};
        `,
      ),

      link: css`
        ${withTransition};

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
        opacity: ${isDarkMode ? 0.05 : 0.08};
        ${responsive.mobile} {
          display: none;
        }
      `,
    };
  },
);
