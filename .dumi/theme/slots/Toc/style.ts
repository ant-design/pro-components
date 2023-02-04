import { createStyles } from 'antd-style';
import chroma from 'chroma-js';

export const useStyles = createStyles(({ token, prefixCls, responsive, css }) => {
  const fixHeight = 36;
  return {
    container: css`
      grid-area: toc;
      position: sticky;
      top: 100px;
      width: ${token.tocWidth}px;
      margin-inline-end: 24px;
      max-height: 80vh;
      overflow: auto;
      margin-top: 48px;

      ${responsive.mobile} {
        z-index: 300;
        top: ${token.headerHeight + 1}px;
        margin-top: 0;
        width: 100%;
      }

      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;

      > h4 {
        margin: 0 0 8px;
        color: ${token.colorTextDescription};
        font-size: 12px;
        line-height: 1;
      }
    `,
    mobileCtn: css`
      position: sticky;
      top: ${token.headerHeight + 1}px;

      height: ${fixHeight}px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: ${chroma(token.colorBgContainer).alpha(0.8).css()};
    `,
    expand: css`
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid ${token.colorSplit};

      box-shadow: ${token.boxShadowSecondary};
      width: 100%;
      z-index: 201;

      .${prefixCls}-collapse-header {
        padding: 8px 16px !important;
      }
    `,
  };
});
