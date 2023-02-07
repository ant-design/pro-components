import { createStyles } from 'antd-style';
import chroma from 'chroma-js';

export const useStyles = createStyles(({ token, prefixCls, cx, css, stylish }) => {
  const offset = 6;

  return {
    icon: cx(
      'site-burger-icon',
      css`
        position: relative;

        &,
        &::before,
        &::after {
          display: inline-block;
          height: 2px;
          background: ${token.colorTextSecondary};

          width: 16px;

          transition: all 150ms ease;
        }

        &::before,
        &::after {
          position: absolute;
          left: 0;

          content: '';
        }

        &::before {
          top: ${offset}px;
        }

        &::after {
          top: -${offset}px;
        }
      `,
    ),
    active: css`
      &::before,
      &::after {
        background: ${token.colorText};
      }
      & {
        background: transparent;
      }

      &::before {
        top: 0;
        transform: rotate(-135deg);
      }

      &::after {
        top: 0;
        transform: rotate(135deg);
      }
    `,
    container: css`
      width: ${token.controlHeight}px;
      height: ${token.controlHeight}px;
      border-radius: ${token.borderRadius}px;
      cursor: pointer;
    `,

    drawerRoot: css`
      top: ${token.headerHeight + 1}px;

      :focus-visible {
        outline: none;
      }

      .${prefixCls}-drawer {
        &-mask {
          background: transparent;
          backdrop-filter: blur(7px);
          background: ${chroma(token.colorBgBase).alpha(0.5).hex()};
        }

        &-content-wrapper {
          box-shadow: none;
        }
      }
    `,
    drawer: css`
      &.${prefixCls}-drawer-content {
        background: transparent;
      }
    `,

    menu: css`
      background: transparent;
      border-inline-end: transparent !important;

      .${prefixCls}-menu-sub.${prefixCls}-menu-inline {
        background: ${chroma(token.colorBgLayout).alpha(0.8).hex()} !important;
      }
    `,
  };
});
