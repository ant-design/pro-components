import type { CSSProperties } from 'react';
import React, { useMemo } from 'react';
import type { AvatarProps } from 'antd';
import { Avatar, Layout, Menu, Popover, Space } from 'antd';
import classNames from 'classnames';
import type { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './index.less';
import type { WithFalse } from '../../typings';
import type { BaseMenuProps } from './BaseMenu';
import BaseMenu from './BaseMenu';
import MenuCounter from './Counter';
import type { HeaderViewProps } from '../../Header';

const { Sider } = Layout;

/**
 * 默认的应用列表的图标
 *
 * @returns
 */
const AppsLogo = () => (
  <svg width="1em" height="1em" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M0 0h3v3H0V0zm4.5 0h3v3h-3V0zM9 0h3v3H9V0zM0 4.5h3v3H0v-3zm4.503 0h3v3h-3v-3zM9 4.5h3v3H9v-3zM0 9h3v3H0V9zm4.503 0h3v3h-3V9zM9 9h3v3H9V9z" />
  </svg>
);

/**
 * 默认渲染logo的方式，如果是个string，用img。否则直接返回
 *
 * @param logo
 * @returns
 */
export const defaultRenderLogo = (logo: React.ReactNode): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

/**
 * 渲染 title 和 logo
 *
 * @param props
 * @param renderKey
 * @returns
 */
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
  const titleDom = <h1>{title}</h1>;

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }

  if (layout === 'mix' && renderKey === 'menuHeaderRender') {
    return null;
  }
  if (props.collapsed) {
    return <a key="title">{logoDom}</a>;
  }
  return (
    <a key="title">
      {logoDom}
      {titleDom}
    </a>
  );
};

export type SiderMenuProps = {
  /** 品牌logo的标识 */
  logo?: React.ReactNode;
  /** 统计的业务劣币啊 */
  appList?: {
    title: React.ReactNode;
    icon: React.ReactNode;
    url: string;
  }[];
  /** 菜单的宽度 */
  siderWidth?: number;
  /** 品牌标识区的配置 */
  menuHeaderRender?: WithFalse<
    (logo: React.ReactNode, title: React.ReactNode, props?: SiderMenuProps) => React.ReactNode
  >;

  /** 品牌区的点击事件 */
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /** 导航助手区域的配置 */
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>;
  /** 自定义收起按钮的dom */
  collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
  /** 菜单底部页脚的配置 */
  menuFooterRender?: WithFalse<(props?: SiderMenuProps) => React.ReactNode>;
  /** 导航菜单的配置 */
  menuContentRender?: WithFalse<
    (props: SiderMenuProps, defaultDom: React.ReactNode) => React.ReactNode
  >;

  /** 头像的设置 */
  avatarProps?: WithFalse<
    AvatarProps & {
      title?: React.ReactNode;
    }
  >;
  /** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
  actionsRender: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  /**
   * Layout的操作功能列表,不同的 layout 会放到不同的位置
   *
   * @deprecated 使用 actionsRender 来替代
   */
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;

  /** Layout 的断点，设置为f alse 可以关掉 */
  breakpoint?: SiderProps['breakpoint'] | false;

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
    appList,
    onMenuHeaderClick,
    breakpoint = 'lg',
    style,
    layout,
    menuExtraRender = false,
    links,
    menuContentRender,
    prefixCls,
    avatarProps,
    rightContentRender,
    actionsRender,
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

  const avatarDom = useMemo(
    () =>
      avatarProps && (
        <Space align="center" className={classNames(`${baseClassName}-actions-avatar`)}>
          <Avatar {...avatarProps} />
          {avatarProps.title && <span> {avatarProps.title}</span>}
        </Space>
      ),
    [avatarProps, baseClassName],
  );

  const actionsDom = useMemo(
    () =>
      actionsRender && (
        <Space align="center" className={classNames(`${baseClassName}-actions-list`)}>
          {actionsRender?.(props)}
        </Space>
      ),
    [actionsRender, baseClassName, props],
  );

  const appsDom = useMemo(() => {
    return appList?.length ? (
      <Popover
        content={
          <div className={`${props.className}-apps-content`}>
            <ul className={`${props.className}-apps-content-list`}>
              {appList?.map((app, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} className={`${props.className}-apps-content-list-item`}>
                    <a href={app.url} target="_blank">
                      {defaultRenderLogo(app.icon)}
                      <span>{app.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        }
      >
        <span className={`${props.className}-apps-icon`}>
          <AppsLogo />
        </span>
      </Popover>
    ) : null;
  }, [appList, props.className]);

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
            {appsDom}
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
        {links ? (
          <div className={`${baseClassName}-links`}>
            <Menu
              inlineIndent={16}
              className={`${baseClassName}-link-menu`}
              selectedKeys={[]}
              openKeys={[]}
              theme="light"
              mode="inline"
            >
              {(links || []).map((node, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Menu.Item className={`${baseClassName}-link`} key={index}>
                  {node}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        ) : null}
        {avatarDom || actionsDom ? (
          <div className={classNames(`${baseClassName}-actions`)}>
            {avatarDom}
            {actionsDom}
          </div>
        ) : null}
        {rightContentRender ? (
          <div className={classNames(`${baseClassName}-actions`)}>
            {rightContentRender?.(props)}
          </div>
        ) : null}
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
