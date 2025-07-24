import type { TabPaneProps, TabsProps } from 'antd';
import { ConfigProvider } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import { noteOnce } from 'rc-util/lib/warning';
import React, { useContext } from 'react';
import type { ProCardTabPaneProps, ProCardTabsProps } from '../../typing';
import Card from '../Card';

function filter<T>(items: (T | null)[]): T[] {
  return items.filter((item) => item) as T[];
}

export function useLegacyItems(
  items?: TabsProps['items'],
  children?: React.ReactNode,
  tabs?: ProCardTabsProps,
) {
  if (items) {
    return items.map((item) => {
      return {
        ...item,
        children: <Card {...tabs?.cardProps}>{item.children}</Card>,
      };
    });
  }
  noteOnce(!tabs, 'Tabs.TabPane is deprecated. Please use `items` directly.');

  const childrenItems = toArray(children).map(
    (node: React.ReactElement<TabPaneProps>) => {
      if (React.isValidElement(node)) {
        const { key, props } = node;
        const { tab, children: tempChild, ...restProps } = props || {};

        const item = {
          key: String(key),
          ...restProps,
          children: <Card {...tabs?.cardProps}>{tempChild}</Card>,
          label: tab,
        };
        return item;
      }

      return null;
    },
  );

  return filter(childrenItems);
}
/**
 * @deprecated ProComponets 3.0
 */
const TabPane: React.FC<ProCardTabPaneProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // 已废弃的组件，直接返回空
  return <></>;
};

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

export default TabPane;
