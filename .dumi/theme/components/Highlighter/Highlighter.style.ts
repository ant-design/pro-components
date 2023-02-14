import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, cx, prefixCls }) => {
  const prefix = `${prefixCls}-highlighter`;

  return {
    shiki: cx(
      `${prefix}-shiki`,
      css`
        .shiki {
          overflow: scroll;

          .line {
            font-family: ${token.fontFamilyHighlighter};
          }
        }
      `,
    ),

    prism: cx(`${prefix}-prism`),

    loading: css`
      position: absolute;
      bottom: 8px;
      right: 12px;
      color: ${token.colorTextTertiary};
    `,
  };
});
