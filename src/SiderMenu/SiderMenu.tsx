import React, { CSSProperties } from 'react';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import { SiderProps } from 'antd/es/layout/Sider';

import './index.less';
import { WithFalse } from '../typings';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import MenuCounter from './Counter';

const { Sider } = Layout;

export const defaultRenderLogo = (logo: React.ReactNode): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

export const defaultRenderLogoAndTitle = (
  props: SiderMenuProps,
): React.ReactNode => {
  const {
    logo = 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
    title,
    menuHeaderRender,
  } = props;
  if (menuHeaderRender === false) {
    return null;
  }
  const logoDom = defaultRenderLogo(logo);
  const titleDom = <h1>{title}</h1>;

  if (menuHeaderRender) {
    // when collapsed, no render title
    return menuHeaderRender(logoDom, props.collapsed ? null : titleDom, props);
  }
  return (
    <a href="/">
      {logoDom}
      {props.collapsed ? null : titleDom}
    </a>
  );
};

export interface SiderMenuProps
  extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>> {
  logo?: React.ReactNode;
  siderWidth?: number;
  menuHeaderRender?: WithFalse<
    (
      logo: React.ReactNode,
      title: React.ReactNode,
      props?: SiderMenuProps,
    ) => React.ReactNode
  >;
  breakpoint?: SiderProps['breakpoint'] | false;
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hide?: boolean;
  className?: string;
  style?: CSSProperties;
  links?: React.ReactNode[];
  onOpenChange?: (openKeys: WithFalse<string[]>) => void;
}

const SiderMenu: React.FC<SiderMenuProps> = props => {
  const {
    collapsed,
    fixSiderbar,
    onCollapse,
    theme,
    siderWidth = 256,
    isMobile,
    onMenuHeaderClick,
    breakpoint = 'lg',
    style,
    links,
    onOpenChange,
  } = props;

  const { flatMenus } = MenuCounter.useContainer();
  const siderClassName = classNames('ant-pro-sider-menu-sider', {
    'fix-sider-bar': fixSiderbar,
    light: theme === 'light',
  });

  const headerDom = defaultRenderLogoAndTitle(props);

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      breakpoint={breakpoint === false ? undefined : breakpoint}
      onCollapse={collapse => {
        if (!isMobile) {
          if (onCollapse) {
            onCollapse(collapse);
          }
        }
      }}
      style={style}
      width={siderWidth}
      theme={theme}
      className={siderClassName}
    >
      {headerDom && (
        <div
          className="ant-pro-sider-menu-logo"
          onClick={onMenuHeaderClick}
          id="logo"
        >
          {headerDom}
        </div>
      )}
      {flatMenus && (
        <BaseMenu
          {...props}
          mode="inline"
          handleOpenChange={onOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
        />
      )}
      {links && links.length > 0 && (
        <div className="ant-pro-sider-menu-links">
          <Menu
            theme={theme}
            className="ant-pro-sider-menu-link-menu"
            selectedKeys={[]}
            openKeys={[]}
            mode="inline"
          >
            {(links || []).map((node, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Menu.Item key={index}>{node}</Menu.Item>
            ))}
          </Menu>
        </div>
      )}
    </Sider>
  );
};

export default SiderMenu;
