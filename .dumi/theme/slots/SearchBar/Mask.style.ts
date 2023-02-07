import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css }) => {
  return {
    modal: css`
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `,
    mask: css`
      background-color: ${token.colorBgMask};
      width: 100%;
      height: 100%;
    `,
    content: css`
      position: absolute;
      top: 60px;
      background-color: ${token.colorBgElevated};
      width: 500px;
      padding: 12px;
      box-sizing: border-box;
      box-shadow: inset 1px 1px 0 0 hsla(0deg, 0%, 100%, 50%), 0 3px 8px 0 #555a64;
      border-radius: 8px;
      max-height: calc(100% - 120px);
      display: flex;
      flex-direction: column;
    `,
  };
});
