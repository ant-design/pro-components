import React from 'react';
import type { ProCardTabPaneProps } from '../../type';

const TabPane: React.FC<ProCardTabPaneProps> = () => <></>;

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

export default TabPane;
