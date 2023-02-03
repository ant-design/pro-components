import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, stylish, r, token }) => css`
    display: inline-flex;
    align-items: center;
    font-family: AliPuHui, ${token.fontFamily};
    color: ${token.colorText};
    font-size: 22px;
    line-height: 1;
    font-weight: 500;
    text-decoration: none;

    ${stylish.clickableText};

    ${r.mobile} {
      font-size: 18px;
    }

    img {
      margin-inline-end: 10px;
      height: 40px;

      ${r.mobile} {
        height: 32px;
      }
    }
  `,
);
