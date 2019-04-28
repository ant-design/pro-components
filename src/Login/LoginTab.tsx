import React, { Component } from 'react';
import { Tabs } from 'antd';
import { TabPaneProps } from 'antd/lib/tabs';
import LoginContext, { ILoginContext } from './LoginContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

interface LoginTabProps extends TabPaneProps {
  tabUtil: ILoginContext['tabUtil'];
}

class LoginTab extends Component<LoginTabProps> {
  constructor(props: LoginTabProps) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }
  uniqueId: string;
  componentDidMount() {
    const { tabUtil } = this.props;
    tabUtil && tabUtil.addTab(this.uniqueId);
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

const WrapContext: React.SFC<TabPaneProps> & {
  typeName: string;
} = props => (
  <LoginContext.Consumer>
    {value => <LoginTab tabUtil={value.tabUtil} {...props} />}
  </LoginContext.Consumer>
);

// 标志位 用来判断是不是自定义组件
WrapContext.typeName = 'LoginTab';

export default WrapContext;
