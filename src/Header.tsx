import './Header.less';

import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';

import { BasicLayoutProps } from './BasicLayout';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader';
import { Settings } from './defaultSettings';
import TopNavHeader from './TopNavHeader';
import { WithFalse } from './typings';

const { Header } = Layout;

export interface HeaderViewProps extends Partial<Settings>, GlobalHeaderProps {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  menuRender?: BasicLayoutProps['menuRender'];
  headerRender?: BasicLayoutProps['headerRender'];
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  siderWidth?: number;
  hasSiderMenu?: boolean;
}

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  renderContent = () => {
    const { isMobile, onCollapse, navTheme, layout, headerRender } = this.props;
    const isTop = layout === 'topmenu';
    let defaultDom = <GlobalHeader onCollapse={onCollapse} {...this.props} />;
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme as 'light' | 'dark'}
          mode="horizontal"
          onCollapse={onCollapse}
          {...this.props}
        />
      );
    }
    if (headerRender) {
      return headerRender(this.props, defaultDom);
    }
    return defaultDom;
  };

  render(): React.ReactNode {
    const {
      fixedHeader,
      layout,
      className: propsClassName,
      style,
      collapsed,
      siderWidth = 256,
      hasSiderMenu,
      headerRender,
      isMobile,
    } = this.props;

    const isTop = layout === 'topmenu';

    const needSettingWidth = fixedHeader && hasSiderMenu && !isTop && !isMobile;

    const className = classNames(propsClassName, {
      'ant-pro-fixed-header': fixedHeader,
      'ant-pro-top-menu': isTop,
    });

    if (headerRender === false) {
      return null;
    }

    return (
      <>
        {fixedHeader && <Header />}
        <Header
          style={{
            padding: 0,
            width: needSettingWidth
              ? `calc(100% - ${collapsed ? 80 : siderWidth}px)`
              : '100%',
            zIndex: 9,
            right: fixedHeader ? 0 : undefined,
            ...style,
          }}
          className={className}
        >
          {this.renderContent()}
        </Header>
      </>
    );
  }
}

export default HeaderView;
