import React from 'react';
import './GridContent.less';
import { Settings } from '../defaultSettings';
import RouteContext from '../RouteContext';

interface GridContentProps {
  settings?: Settings;
  children: React.ReactNode;
}

const GridContent = (props: GridContentProps) => {
  return (
    <RouteContext.Consumer>
      {value => {
        const { children, settings } = props;
        const contentWidth = settings ? settings.contentWidth : value.settings.contentWidth;
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
