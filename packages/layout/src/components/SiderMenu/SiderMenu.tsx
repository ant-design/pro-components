import type { CSSProperties } from 'react';
import React from 'react';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import type { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './index.less';
import type { WithFalse } from '../../typings';
import type { BaseMenuProps } from './BaseMenu';
import BaseMenu from './BaseMenu';
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
  renderKey: string = 'menuHeaderRender',
): React.ReactNode => {
  const { logo, title, layout } = props;
  const renderFunction = props[renderKey || ''];
  if (renderFunction === false) {
    return null;
  }
  const logoDom = defaultRenderLogo(logo);
  const titleDom = <h1>{title ?? 'Ant Design Pro'}</h1>;

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }

  if (layout === 'mix' && renderKey === 'menuHeaderRender') {
    return null;
  }

  return (
    <a>
      {logoDom}
      {props.collapsed ? null : titleDom}
    </a>
  );
};

export type SiderMenuProps = {
  logo?: React.ReactNode;
  siderWidth?: number;
  menuHeaderRender?: WithFalse<
    (logo: React.ReactNode, title: React.ReactNode, props?: SiderMenuProps) => React.ReactNode
  >;
  menuFooterRender?: WithFalse<(props?: SiderMenuProps) => React.ReactNode>;
  menuContentRender?: WithFalse<
    (props: SiderMenuProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>;
  collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
  breakpoint?: SiderProps['breakpoint'] | false;
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hide?: boolean;
  className?: string;
  style?: CSSProperties;
  links?: React.ReactNode[];
  onOpenChange?: (openKeys: WithFalse<string[]>) => void;
  getContainer?: false;
  logoStyle?: CSSProperties;
} & Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>>;

export const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

export type PrivateSiderMenuProps = {
  matchMenuKeys: string[];
};

const SiderMenu: React.FC<SiderMenuProps & PrivateSiderMenuProps> = (props) => {
  const {
    collapsed,
    fixSiderbar,
    menuFooterRender,
    onCollapse,
    theme,
    siderWidth,
    isMobile,
    onMenuHeaderClick,
    breakpoint = 'lg',
    style,
    layout,
    menuExtraRender = false,
    collapsedButtonRender = defaultRenderCollapsedButton,
    links,
    menuContentRender,
    prefixCls,
    onOpenChange,
    headerHeight,
    logoStyle,
  } = props;
  const baseClassName = `${prefixCls}-sider`;
  const { flatMenuKeys } = MenuCounter.useContainer();
  const siderClassName = classNames(`${baseClassName}`, {
    [`${baseClassName}-fixed`]: fixSiderbar,
    [`${baseClassName}-layout-${layout}`]: layout && !isMobile,
    [`${baseClassName}-light`]: theme === 'light',
  });

  const headerDom = defaultRenderLogoAndTitle(props);

  const extraDom = menuExtraRender && menuExtraRender(props);
  const menuDom = menuContentRender !== false && flatMenuKeys && (
    <BaseMenu
      {...props}
      key="base-menu"
      mode="inline"
      handleOpenChange={onOpenChange}
      style={{
        width: '100%',
      }}
      className={`${baseClassName}-menu`}
    />
  );

  const menuRenderDom = menuContentRender ? menuContentRender(props, menuDom) : menuDom;
  return (
    <>
      {fixSiderbar && (
        <div
          style={{
            width: collapsed ? 48 : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? 48 : siderWidth}px`,
            maxWidth: collapsed ? 48 : siderWidth,
            minWidth: collapsed ? 48 : siderWidth,
            transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`,
            ...style,
          }}
        />
      )}
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        breakpoint={breakpoint === false ? undefined : breakpoint}
        onCollapse={(collapse) => {
          if (isMobile) return;
          onCollapse?.(collapse);
        }}
        collapsedWidth={48}
        style={{
          overflow: 'hidden',
          paddingTop: layout === 'mix' && !isMobile ? headerHeight : undefined,
          ...style,
        }}
        width={siderWidth}
        theme={theme}
        className={siderClassName}
      >
        {headerDom && (
          <div
            className={classNames(`${baseClassName}-logo`, {
              [`${baseClassName}-collapsed`]: collapsed,
            })}
            onClick={layout !== 'mix' ? onMenuHeaderClick : undefined}
            id="logo"
            style={logoStyle}
          >
            {headerDom}
          </div>
        )}
        {extraDom && (
          <div
            className={`${baseClassName}-extra ${!headerDom && `${baseClassName}-extra-no-logo`}`}
          >
            {extraDom}
          </div>
        )}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {menuRenderDom}
        </div>
        <div className={`${baseClassName}-links`}>
          <Menu
            theme={theme}
            inlineIndent={16}
            className={`${baseClassName}-link-menu`}
            selectedKeys={[]}
            openKeys={[]}
            mode="inline"
          >
            {(links || []).map((node, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Menu.Item className={`${baseClassName}-link`} key={index}>
                {node}
              </Menu.Item>
            ))}
            {collapsedButtonRender && !isMobile && (
              <Menu.Item
                className={`${baseClassName}-collapsed-button`}
                title={false}
                key="collapsed"
                onClick={() => {
                  if (onCollapse) {
                    onCollapse(!collapsed);
                  }
                }}
              >
                {collapsedButtonRender(collapsed)}
              </Menu.Item>
            )}
          </Menu>
        </div>
        {menuFooterRender && (
          <div
            className={classNames(`${baseClassName}-footer`, {
              [`${baseClassName}-footer-collapsed`]: !collapsed,
            })}
          >
            {menuFooterRender(props)}
          </div>
        )}
      </Sider>
    </>
  );
};

export default SiderMenu;
