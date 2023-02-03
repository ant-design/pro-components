import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, r, token }) => ({
  header: css`
    top: 0;
    position: sticky;
    background-color: transparent;
    backdrop-filter: blur(6px);
    z-index: ${token.zIndexPopupBase - 50};
    border-bottom: 1px solid ${token.colorSplit};

    grid-area: head;
    align-self: stretch;

    ${r.mobile} {
      background: ${token.colorBgContainer};
    }
  `,
  content: css`
    padding: 0 24px;
    height: 64px;

    ${r.mobile} {
      padding: 0 16px;
    }
  `,
  left: css``,
  right: css`
    flex: 1;
    display: flex;
    justify-content: space-between;

    &-aside {
      display: flex;
      align-items: center;

      ${r.mobile} {
        justify-content: center;
        margin: 8px 16px;
        padding-top: 24px;
        border-top: 1px solid ${token.colorBorder};
      }
    }
  `,
}));
