import './GridContent.less';

import React, { useContext, CSSProperties } from 'react';
import classNames from 'classnames';

import RouteContext from '../RouteContext';
import { PureSettings } from '../defaultSettings';

interface GridContentProps {
  contentWidth?: PureSettings['contentWidth'];
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  prefixCls?: string;
}

/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 * @param props
 */
const GridContent: React.SFC<GridContentProps> = (props) => {
  const value = useContext(RouteContext);
  const {
    children,
    contentWidth: propsContentWidth,
    className: propsClassName,
    style,
    prefixCls = 'ant-pro',
  } = props;
  const contentWidth = propsContentWidth || value.contentWidth;
  let className = `${prefixCls}-grid-content`;
  if (contentWidth === 'Fixed') {
    className = `${prefixCls}-grid-content wide`;
  }
  return (
    <div className={classNames(className, propsClassName)} style={style}>
      <div className={`${prefixCls}-grid-content-children`}>{children}</div>
    </div>
  );
};

export default GridContent;
