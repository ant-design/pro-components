import { Layout } from 'antd';
import classNames from 'classnames';
import React, { Component } from 'react';
import BaseMenu, { BaseMenuProps } from './BaseMenu';

import './index.less';

import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';

const { Sider } = Layout;

let firstMount: boolean = true;

export const defaultRenderLogo = (logo: React.ReactNode) => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

export interface SiderMenuProps
  extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>> {
  logo?: React.ReactNode;
}

interface SiderMenuState {
  pathname?: string;
  openKeys?: string[];
  flatMenuKeysLen?: number;
}

export default class SiderMenu extends Component<
  SiderMenuProps,
  SiderMenuState
> {
  static defaultProps: Partial<SiderMenuProps> = {
    flatMenuKeys: [],
    onCollapse: () => void 0,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: () => void 0,
    menuData: [],
    onOpenChange: () => void 0,
  };

  static getDerivedStateFromProps(
    props: SiderMenuProps,
    state: SiderMenuState,
  ) {
    const { pathname, flatMenuKeysLen } = state;
    const { location = { pathname: '/' } } = props;
    if (
      location.pathname !== pathname ||
      props.flatMenuKeys!.length !== flatMenuKeysLen
    ) {
      return {
        pathname: location.pathname,
        flatMenuKeysLen: props.flatMenuKeys!.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  constructor(props: SiderMenuProps) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount() {
    firstMount = false;
  }

  isMainMenu: (key: string) => boolean = key => {
    const { menuData } = this.props;
    return menuData!.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange: (openKeys: string[]) => void = openKeys => {
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    if (moreThanOne) {
      this.setState({
        openKeys: [openKeys.pop()].filter(item => item) as string[],
      });
    } else {
      this.setState({ openKeys: [...openKeys] });
    }
  };

  render() {
    const {
      logo,
      collapsed,
      title,
      fixSiderbar,
      onCollapse,
      theme,
      isMobile,
    } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    const siderClassName = classNames('ant-pro-sider-menu-sider', {
      ['fix-sider-bar']: fixSiderbar,
      light: theme === 'light',
    });
    return (
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse && onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className="ant-pro-sider-menu-logo" id="logo">
          <a>
            {defaultRenderLogo(logo)}
            <h1>{title}</h1>
          </a>
        </div>
        <BaseMenu
          {...this.props}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />
      </Sider>
    );
  }
}
