import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, responsive, css, cx }) => {
  return {
    container: css`
      position: relative;

      // TODO: support search for mobile devices
      ${responsive.mobile} {
        display: none;
      }
    `,
    shortcut: cx(
      'site-header-shortcut',
      css`
        position: absolute;
        top: 50%;
        inset-inline-end: 11px;
        display: inline-block;
        padding: 4px 8px;
        color: ${token.colorTextDescription};
        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        background-color: ${token.colorFillSecondary};
        border-radius: 11px;
        border: 1px solid ${token.colorBorderSecondary};
        transform: translateY(-50%);
        transition: all 0.3s;
        pointer-events: none;

        ${responsive.mobile} {
          display: none;
        }
      `,
    ),
    popover: css`
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      display: flex;
      flex-direction: column;
      width: 540px;
      max-height: 460px;
      margin-top: 18px;
      background-color: ${token.colorBgElevated};
      border-radius: 8px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 20%);

      &::before {
        content: '';
        position: absolute;
        bottom: 100%;
        inset-inline-end: 100px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-bottom-color: #fff;
      }

      > section {
        flex: 1;
        min-height: 60px;
        overflow: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        border-radius: inherit;
      }
    `,

    svg: cx(
      css`
        position: absolute;
        top: 50%;
        margin-top: 1px;
        inset-inline-start: 16px;
        width: 16px;
        color: ${token.colorTextPlaceholder};
        transform: translateY(-50%);
      `,
    ),
    input: css`
      width: 280px;
      height: ${token.controlHeightLG}px;
      padding: 0;
      padding-inline-start: 40px;
      padding-inline-end: 12px;
      color: ${token.colorTextSecondary};
      font-size: 14px;
      border: 1px solid ${token.colorBorder};
      border-radius: 20px;
      box-sizing: border-box;
      outline: none;
      transition: all 0.3s;
      background-color: transparent;

      &:focus {
        border-color: ${token.colorBorderSecondary};
        background: ${token.colorBgElevated};

        ~ .site-header-shortcut {
          opacity: 0;
        }
      }

      &::-webkit-input-placeholder {
        color: ${token.colorTextPlaceholder};
      }
    `,
  };
});
