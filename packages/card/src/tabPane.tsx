import React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import { Tabs } from 'antd';
import { TabPaneProps } from 'antd/lib/tabs';
import classNames from 'classnames';

import './style/index.less';
import ProCard, { ProCardProps } from './index';

export interface ProCardTabPaneProps extends TabPaneProps, ProCardProps {
  key?: string;
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
    ...rest
  } = props;

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
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
            <ProCard {...rest}>{children}</ProCard>
          </Tabs.TabPane>
        );
      }}
    </ConfigConsumer>
  );
};

export default TabPane;
