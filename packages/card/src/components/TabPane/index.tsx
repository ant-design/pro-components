import React, { useContext } from 'react';
import { Tabs, ConfigProvider } from 'antd';
import { TabPaneProps } from 'antd/lib/tabs';
import classNames from 'classnames';
import './index.less';
import ProCard, { ProCardProps } from '../../index';

export interface ProCardTabPaneProps extends TabPaneProps {
  /**
   * key
   */
  key?: string;
  /**
   * ProCard 相关属性透传
   */
  cardProps?: ProCardProps;
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
      <ProCard {...cardProps}>{children}</ProCard>
    </Tabs.TabPane>
  );
};

export default TabPane;
