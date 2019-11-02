import './GridContent.less';

import React from 'react';
import RouteContext from '../RouteContext';
import { Settings } from '../defaultSettings';

interface GridContentProps {
  contentWidth?: Settings['contentWidth'];
  children: React.ReactNode;
  layout?: 'sidemenu' | 'topmenu' | 'bothmenu';
}

const GridContent: React.SFC<GridContentProps> = props => (
  <RouteContext.Consumer>
    {value => {
      const {
        children,
        contentWidth: propsContentWidth,
        layout: propsLayout,
      } = props;
      const contentWidth = propsContentWidth || value.contentWidth;
      const layout = propsLayout || value.layout;
      let className = 'ant-pro-grid-content';
      // `Fixed` only works when layout is topmenu or bothmenu
      if (contentWidth === 'Fixed' && layout === 'sidemenu') {
        className = 'ant-pro-grid-content wide';
      }
      return <div className={className}>{children}</div>;
    }}
  </RouteContext.Consumer>
);

export default GridContent;
