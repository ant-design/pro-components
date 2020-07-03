import React, { useContext, useMemo, ReactNode } from 'react';
import { RouteContext, RouteContextType } from '../index';
import classNames from 'classnames';
import './index.less';
import { Space } from 'antd';

export interface FooterToolbarProps {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  renderContent?: (
    props: FooterToolbarProps & RouteContextType & { leftWidth?: string },
    dom: JSX.Element,
  ) => ReactNode;
  prefixCls?: string;
}
const FooterToolbar: React.FC<FooterToolbarProps> = (props) => {
  const {
    children,
    prefixCls = 'ant-pro',
    className,
    extra,
    renderContent,
    ...restProps
  } = props;

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
  }, [value.collapsed, value.hasSiderMenu, value.isMobile, value.siderWidth]);

  const dom = (
    <>
      <div className={`${baseClassName}-left`}>{extra}</div>
      <div className={`${baseClassName}-right`}>
        <Space>{children}</Space>
      </div>
    </>
  );

  return (
    <div
      className={classNames(className, `${baseClassName}`)}
      style={{ width }}
      {...restProps}
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

export default FooterToolbar;
