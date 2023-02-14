import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css, cx, prefixCls }) => {
  const prefix = `${prefixCls}-highlighter`;
  const buttonHoverCls = `${prefix}-hover-btn`;

  return {
    container: cx(
      prefix,
      css`
        position: relative;

        pre {
          margin: 8px 0 !important;
        }

        &:hover {
          .${buttonHoverCls} {
            opacity: 1;
          }
        }
      `,
    ),
    withBackground: cx(
      `${prefix}-background`,
      css`
        pre {
          background: ${token.colorFillTertiary} !important;
          border-radius: 8px;
          padding: 12px !important;
        }
      `,
    ),

    button: cx(
      buttonHoverCls,
      css`
        opacity: 0;
        position: absolute;
        right: 8px;
        top: 8px;
        z-index: 50;
      `,
    ),
  };
});
