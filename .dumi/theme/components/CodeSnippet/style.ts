import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }) =>
    css`
      cursor: pointer;
      &:hover {
        background: ${token.colorFillSecondary};
        border-radius: 4px;
      }
      pre {
        background: none !important;
        padding: 0 !important;
        margin: 0;
      }
      code[class*='language-'] {
        background: none;
      }
    `,
);
