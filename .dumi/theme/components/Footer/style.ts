import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, responsive, token }) => {
  const prefix = `rc-footer`;

  return {
    container: css`
      grid-area: footer;
      border-top: 1px solid ${token.colorSplit};
      color: ${token.colorTextDescription};
      text-align: center;
      align-self: stretch;
      ${responsive.mobile} {
        border: none;
        flex-direction: column;
      }
    `,
    footer: css`
      color: ${token.colorTextSecondary};
      font-size: 14px;
      line-height: 1.5;
      background-color: ${token.colorBgLayout};
      &.${prefix} {
        a {
          color: ${token.colorTextTertiary};
          text-decoration: none;
          transition: all 0.3s;
          &:hover {
            color: ${token.colorLinkHover};
          }
        }
      }
      .${prefix} {
        &-container {
          width: 100%;
          max-width: ${token.contentMaxWidth}px;
          margin: auto;
          padding: 60px 0 20px;
        }
        &-columns {
          display: flex;
          justify-content: space-around;
        }
        &-column {
          //margin-bottom: 60px;
          h2 {
            position: relative;
            margin: 0 auto;
            color: ${token.colorText};
            font-weight: 500;
            font-size: 16px;
          }
          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 22px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.5em;
            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
        }
        &-item {
          margin: 12px 0;
          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 16px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.4em;
            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
          &-separator {
            margin: 0 0.3em;
          }
        }
        &-bottom {
          &-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            border-top: 1px solid ${token.colorBorderSecondary};
          }
        }
        &-light {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;
          h2,
          a {
            color: rgba(0, 0, 0, 0.85);
          }
        }
        &-light &-bottom-container {
          border-top-color: #e8e8e8;
        }
        &-light &-item-separator,
        &-light &-item-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }
      ${responsive.mobile} {
        .${prefix} {
          text-align: center;
          &-container {
            padding: 40px 0;
          }
          &-columns {
            display: block;
          }
          &-column {
            display: block;
            margin-bottom: 40px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `,
  };
});
