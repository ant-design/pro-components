/* eslint-disable react-hooks/exhaustive-deps */
import type { ReactNode } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { ConfigProvider } from 'antd';
import omit from 'omit.js';
import type { RouteContextType } from '../../index';
import { RouteContext } from '../../index';
import { css, cx } from '@emotion/css';

export type FooterToolbarProps = {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  renderContent?: (
    props: FooterToolbarProps & RouteContextType & { leftWidth?: string },
    dom: JSX.Element,
  ) => ReactNode;
  prefixCls?: string;
};

const FooterToolbar: React.FC<FooterToolbarProps> = (props) => {
  const { children, className, extra, style, renderContent, ...restProps } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = props.prefixCls || getPrefixCls('pro');
  const baseClassName = `${prefixCls}-footer-bar`;
  const value = useContext(RouteContext);
  const width = useMemo(() => {
    const { hasSiderMenu, isMobile, siderWidth } = value;
    if (!hasSiderMenu) {
      return undefined;
    }
    // 0 or undefined
    if (!siderWidth) {
      return '100%';
    }
    return isMobile ? '100%' : `calc(100% - ${siderWidth}px)`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.collapsed, value.hasSiderMenu, value.isMobile, value.siderWidth]);

  const dom = (
    <>
      <div
        className={cx(
          `${baseClassName}-left`,
          css`
            flex: 1;
          `,
        )}
      >
        {extra}
      </div>
      <div
        className={cx(
          `${baseClassName}-right`,
          css`
            > * {
              margin-right: 8px;
              &:last-child {
                margin: 0;
              }
            }
          `,
        )}
      >
        {children}
      </div>
    </>
  );

  /** 告诉 props 是否存在 footerBar */
  useEffect(() => {
    if (!value || !value?.setHasFooterToolbar) {
      return () => {};
    }
    value?.setHasFooterToolbar(true);
    return () => {
      value?.setHasFooterToolbar?.(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cx(
        className,
        baseClassName,
        css`
          position: fixed;
          right: 0;
          bottom: 0;
          z-index: 99;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 24px;
          line-height: 64px;
          background-color: #fff;
          border-top: 1px solid #d8d8d8;
          transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          @supports (backdrop-filter: blur(20px) saturate(150%)) {
            background-color: rgba(240, 242, 245, 0.4);
            border-top: 1px solid #d8d8d8;
            backdrop-filter: blur(20px) saturate(150%);
          }
        `,
      )}
      style={{ width, ...style }}
      {...omit(restProps, ['prefixCls'])}
    >
      {renderContent
        ? renderContent(
            {
              ...props,
              ...value,
              leftWidth: width,
            },
            dom,
          )
        : dom}
    </div>
  );
};

export { FooterToolbar };
