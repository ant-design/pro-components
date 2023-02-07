import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, responsive, isDarkMode, css }) => ({
  content: css`
    min-height: 400px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;

    padding: 24px 48px;
    border-radius: 10px;
    background-color: ${token.colorBgContainer};
    box-shadow: ${token.boxShadow};
    ${responsive.mobile} {
      padding: 8px 16px;
      border-radius: 0;
    }

    .markdown {
      color: ${token.colorTextSecondary};

      h1,
      h2,
      h3 {
        color: ${token.colorText};
      }
      p {
        line-height: 1.8;
      }

      // hyperlink
      a {
        color: ${token.colorLink};

        &:hover {
          color: ${token.colorLinkHover};
        }

        &:active {
          color: ${token.colorLinkActive};
        }
      }

      img {
        max-width: 600px;
        width: 80%;
        opacity: ${isDarkMode ? 0.8 : 1};
      }

      // inline code
      > :not(.source-code) code {
        padding: 2px 6px;

        color: ${token.colorPrimaryText};
        background: ${token.colorPrimaryBg};
        border-radius: 4px;
      }

      // pre tag
      pre {
        font-size: 14px;
        padding-left: 24px;
        padding-right: 24px;
      }

      // table
      table {
        width: 100%;
        border-spacing: 1px;
      }

      th {
        background: ${token.colorFillTertiary};
      }

      tr {
      }
      th,
      td {
        padding-block-start: 10px;
        padding-block-end: 10px;
        padding-inline-start: 16px;
        padding-inline-end: 16px;
        border-bottom: 1px solid ${token.colorBorderSecondary};
      }

      // blockquote
      blockquote {
        font-style: italic;

        margin: 16px 0;
        padding: 0 12px;
        color: ${token.colorTextDescription};
        border-left: 3px solid ${token.colorBorder};
      }

      // list
      ul li {
        line-height: 1.8;
      }

      // anchor of headings
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        > a[aria-hidden]:first-child {
          float: left;
          width: 20px;
          padding-inline-end: 4px;
          margin-inline-start: -24px;
          color: ${token.colorText};
          // hide phantom blank node
          font-size: 0;
          text-align: right;
          line-height: inherit;

          &:hover {
            border: 0;
          }

          > .icon-link::before {
            content: '#';
            color: ${token.colorTextTertiary};
            font-size: 20px;
          }
        }

        &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
          visibility: hidden;
        }
      }
    }
  `,
}));
