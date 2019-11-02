import './GridContent.less';

import React from 'react';
import RouteContext from '../RouteContext';
import { Settings } from '../defaultSettings';

interface GridContentProps {
  contentWidth?: Settings['contentWidth'];
  children: React.ReactNode;
}

const GridContent: React.SFC<GridContentProps> = props => (
  <RouteContext.Consumer>
    {value => {
      const { children, contentWidth: propsContentWidth } = props;
      const contentWidth = propsContentWidth || value.contentWidth;
      let className = 'ant-pro-grid-content';
      if (contentWidth === 'Fixed') {
        className = 'ant-pro-grid-content wide';
      }
      return <div className={className}>{children}</div>;
    }}
  </RouteContext.Consumer>
);

export default GridContent;
