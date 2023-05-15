/* eslint-disable react-hooks/exhaustive-deps */
import type { GenerateStyle } from '@ant-design/pro-provider';
import { isBrowser } from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import omit from 'omit.js';
import type { ReactNode } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { RouteContextType } from '../../index';
import { RouteContext } from '../../index';
import type { FooterToolBarToken } from './style';
import { useStyle } from './style';
import { useStylish } from './style/stylish';

export type FooterToolbarProps = {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  renderContent?: (
    props: FooterToolbarProps & RouteContextType & { leftWidth?: string },
    dom: JSX.Element,
  ) => ReactNode;
  prefixCls?: string;
  stylish?: GenerateStyle<FooterToolBarToken>;
  children?: React.ReactNode;
  portalDom?: boolean;
};

const FooterToolbar: React.FC<FooterToolbarProps> = (props) => {
  const {
    children,
    className,
    extra,
    portalDom = true,
    style,
    renderContent,
    ...restProps
  } = props;
  const { getPrefixCls, getTargetContainer } = useContext(
    ConfigProvider.ConfigContext,
  );
  const prefixCls = props.prefixCls || getPrefixCls('pro');

  const baseClassName = `${prefixCls}-footer-bar`;
  const { wrapSSR, hashId } = useStyle(baseClassName);

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

  const containerDom = useMemo(() => {
    if (typeof window === undefined || typeof document === undefined)
      return null;
    // 只读取一次就行了，不然总是的渲染
    return getTargetContainer?.() || document.body;
  }, []);

  const stylish = useStylish(`${baseClassName}.${baseClassName}-stylish`, {
    stylish: props.stylish,
  });
  const dom = (
    <>
      <div className={`${baseClassName}-left ${hashId}`}>{extra}</div>
      <div className={`${baseClassName}-right ${hashId}`}>{children}</div>
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

  const renderDom = (
    <div
      className={classNames(className, hashId, baseClassName, {
        [`${baseClassName}-stylish`]: !!props.stylish,
      })}
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
  const ssrDom =
    !isBrowser() || !portalDom || !containerDom
      ? renderDom
      : createPortal(renderDom, containerDom, baseClassName);

  return stylish.wrapSSR(
    wrapSSR(<React.Fragment key={baseClassName}>{ssrDom}</React.Fragment>),
  );
};

export { FooterToolbar };
