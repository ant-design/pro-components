import './GridContent.less';

import React, { useContext, CSSProperties } from 'react';
import classNames from 'classnames';

import RouteContext from '../RouteContext';
import { Settings } from '../defaultSettings';

interface GridContentProps {
  contentWidth?: Settings['contentWidth'];
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 * @param props
 */
const GridContent: React.SFC<GridContentProps> = props => {
  const value = useContext(RouteContext);
  const {
    children,
    contentWidth: propsContentWidth,
    className: propsClassName,
    style,
  } = props;
  const contentWidth = propsContentWidth || value.contentWidth;
  let className = 'ant-pro-grid-content';
  if (contentWidth === 'Fixed') {
    className = 'ant-pro-grid-content wide';
  }
  return (
    <div className={classNames(className, propsClassName)} style={style}>
      {children}
    </div>
  );
};

export default GridContent;
