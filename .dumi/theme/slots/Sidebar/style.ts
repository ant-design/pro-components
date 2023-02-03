import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  sidebar: css`
    grid-area: sidebar;

    position: sticky;
    top: ${token.headerHeight}px;
    max-height: calc(100vh - ${token.headerHeight}px);

    padding-top: 20px;
    padding-bottom: 24px;
    padding-inline: 16px;
    border-right: 1px solid ${token.colorSplit};

    > dl {
      margin: 0;
      padding: 0;
      line-height: 1;

      > dt {
        margin: 8px 0;
        color: ${token.colorText};
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: uppercase;
      }

      > dd {
        margin: 0;
        padding: 2px 0;

        > a {
          padding: 6px 12px;
          border-radius: 6px;
          display: block;
          font-size: ${token.fontSize}px;
          line-height: ${token.lineHeight};
          text-decoration: none;
          transition: all 0.1s;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          color: ${token.colorTextSecondary};

          &:hover {
            color: ${token.colorText};
            background: ${token.colorFillTertiary};
          }

          &.active {
            color: ${token.colorPrimaryText};
            background: ${token.colorPrimaryBg};

            &:hover {
              color: ${token.colorPrimaryTextHover};
              background: ${token.colorPrimaryBgHover};
            }
          }
        }
      }

      // divider line & gap
      + dl {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px dashed ${token.colorBorder};
      }
    }
  `,
}));
