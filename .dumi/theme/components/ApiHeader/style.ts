import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, stylish }) => ({
  title: css`
    font-family: monospace;
  `,
  desc: css`
    font-size: ${token.fontSizeLG}px;
    line-height: ${token.lineHeightLG}px;
  `,
  text: css`
    ${stylish.clickableText}
  `,
}));
