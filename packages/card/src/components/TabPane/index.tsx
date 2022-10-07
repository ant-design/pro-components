import type { TabPaneProps, TabsProps } from 'antd';
import { ConfigProvider, Tabs } from 'antd';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { noteOnce } from 'rc-util/lib/warning';
import React, { useContext } from 'react';
import type { ProCardTabPaneProps, ProCardTabsProps } from '../../type';
import Card from '../Card';
import './index.less';

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

  const childrenItems = toArray(children).map((node: React.ReactElement<TabPaneProps>) => {
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
  });

  return filter(childrenItems);
}

const TabPane: React.FC<ProCardTabPaneProps> = (props) => {
  const {
    key,
    tab,
    tabKey,
    disabled,
    destroyInactiveTabPane,
    children,
    className,
    style,
    cardProps,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-card-tabpane');
  const tabPaneClassName = classNames(prefixCls, className);
  return (
    <Tabs.TabPane
      key={key}
      tabKey={tabKey}
      tab={tab}
      className={tabPaneClassName}
      style={style}
      disabled={disabled}
      destroyInactiveTabPane={destroyInactiveTabPane}
      {...rest}
    >
      <Card {...cardProps}>{children}</Card>
    </Tabs.TabPane>
  );
};

export default TabPane;
