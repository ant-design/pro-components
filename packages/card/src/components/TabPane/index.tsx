import { ConfigProvider, Tabs, version } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import type { ProCardTabPaneProps } from '../../type';
import Card from '../Card';

const TabPane: React.FC<ProCardTabPaneProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // 如果是antd v5 则返回为空
  if (version.startsWith('5')) {
    return <></>;
  } else {
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
  }
};

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

export default TabPane;
