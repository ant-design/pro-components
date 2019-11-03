import './GridContent.less';

import React, { useContext } from 'react';
import RouteContext from '../RouteContext';
import { Settings } from '../defaultSettings';

interface GridContentProps {
  contentWidth?: Settings['contentWidth'];
  children: React.ReactNode;
}

/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 * @param props
 */
const GridContent: React.SFC<GridContentProps> = props => {
  const value = useContext(RouteContext);
  const { children, contentWidth: propsContentWidth } = props;
  const contentWidth = propsContentWidth || value.contentWidth;
  let className = 'ant-pro-grid-content';
  if (contentWidth === 'Fixed') {
    className = 'ant-pro-grid-content wide';
  }
  return <div className={className}>{children}</div>;
};

export default GridContent;
