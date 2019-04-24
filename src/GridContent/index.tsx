import React from 'react';
import './GridContent.less';
import { Settings } from '../defaultSettings';
import RouteContext from '../RouteContext';

interface GridContentProps {
  contentWidth?: Settings['contentWidth'];
  children: React.ReactNode;
}

const GridContent = (props: GridContentProps) => {
  return (
    <RouteContext.Consumer>
      {value => {
        const { children, contentWidth: propsContentWidth } = props;
        const contentWidth = propsContentWidth
          ? propsContentWidth
          : value.contentWidth;
        let className = `ant-pro-grid-content`;
        if (contentWidth === 'Fixed') {
          className = `ant-pro-grid-content wide`;
        }
        return <div className={className}>{children}</div>;
      }}
    </RouteContext.Consumer>
  );
};

export default GridContent;
