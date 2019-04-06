import { Layout } from 'antd';
import classNames from 'classnames';
import React, { Component, Suspense } from 'react';
import Link from 'umi/link';
import { Settings } from '../defaultSettings';
import { BaseMenuProps } from './BaseMenu';

import styles from './index.less';

import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';

const BaseMenu = React.lazy(() => import('./BaseMenu'));

const { Sider } = Layout;

let firstMount: boolean = true;

export const renderLogo = (logo: React.ReactNode) => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  return logo;
};

export interface SiderMenuProps extends BaseMenuProps {
  logo: React.ReactNode;
  fixSiderbar?: boolean;
  settings: Settings;
}

interface SiderMenuState {
  pathname?: string;
  openKeys?: string[];
  flatMenuKeysLen?: number;
}

export default class SiderMenu extends Component<SiderMenuProps, SiderMenuState> {
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

  static getDerivedStateFromProps(props: SiderMenuProps, state: SiderMenuState) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location!.pathname !== pathname || props.flatMenuKeys!.length !== flatMenuKeysLen) {
      return {
        pathname: props.location!.pathname,
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
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    if (moreThanOne) {
      this.setState({ openKeys: [openKeys.pop()].filter(item => item) as string[] });
    } else {
      this.setState({ openKeys: [...openKeys] });
    }
  };

  render() {
    const {
      logo,
      collapsed,
      onCollapse,
      fixSiderbar,
      theme,
      isMobile,
      settings: { title },
    } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    return (
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse!(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            {renderLogo(logo)}
            <h1>{title}</h1>
          </Link>
        </div>
        <Suspense fallback={null}>
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
            {...defaultProps}
          />
        </Suspense>
      </Sider>
    );
  }
}
