import type { CSSProperties } from 'react';
import React, { useMemo, useState } from 'react';
import type { AvatarProps } from 'antd';
import { Avatar, Layout, Menu, Popover, Space } from 'antd';
import classNames from 'classnames';
import type { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './index.less';
import type { WithFalse } from '../../typings';
import type { BaseMenuProps } from './BaseMenu';
import { BaseMenu } from './BaseMenu';
import { MenuCounter } from './Counter';
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

const CollapsedMiniIcon: React.FC<{}> = () => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 2 24" fill="currentColor" aria-hidden="true">
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g transform="translate(-248.000000, -429.000000)" fill="currentColor">
          <g transform="translate(0.000000, 56.000000)">
            <g transform="translate(248.000000, 0.000000)">
              <rect x={0} y={373} width={2} height={24} rx={1} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const CollapsedHoverIcon: React.FC<{}> = () => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 8 16" fill="currentColor" aria-hidden="true">
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g transform="translate(-913.000000, -8934.000000)" fill="currentColor">
          <g transform="translate(905.000000, 8505.000000)">
            <path
              d="M9,429 L9.49874625,429 C9.81420921,429 10.1111762,429.148856 10.2999476,429.401605 L15.1023977,435.831691 C15.634309,436.543876 15.6323433,437.521662 15.0975728,438.231703 L10.3000481,444.601611 C10.1111133,444.852469 9.81530724,445 9.50125922,445 L9,445 C8.72486786,445 8.50182918,444.776961 8.50182918,444.501829 C8.50182918,444.393541 8.53711392,444.288201 8.60234049,444.201761 L13.5482339,437.647318 C13.8159459,437.292538 13.8173723,436.803641 13.551735,436.447305 L8.59767256,429.80174 C8.43202986,429.579541 8.47787805,429.265133 8.70007736,429.09949 C8.78672907,429.034894 8.89192047,429 9,429 Z"
              transform="translate(12.000000, 437.000000) scale(-1, 1) translate(-12.000000, -437.000000) "
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const CollapsedIcon: React.FC<any> = (props) => {
  const { isMobile, collapsed, ...rest } = props;
  const [hover, setHover] = useState<boolean>(isMobile || false);
  return (
    <div
      {...rest}
      style={{
        fontSize: hover ? 16 : 24,
        transform: props?.collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform,right 0.3s',
        color: hover ? 'rgba(0,0,0,0.45)' : 'rgba(5,30,55,0.08)',
        right: hover ? undefined : -8,
        backgroundColor: hover ? '#f0f0f0' : undefined,
        cursor: 'pointer',
      }}
      onClick={(e) => {
        props?.onClick(e);
        // 手机端下
        if (!props.isMobile) setHover(false);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? <CollapsedHoverIcon /> : <CollapsedMiniIcon />}
    </div>
  );
};

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
  const titleDom = <h1>{title ?? 'Ant Design Pro'}</h1>;

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
  collapsedButtonRender?: WithFalse<
    (collapsed?: boolean, defaultDom?: React.ReactNode) => React.ReactNode
  >;
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
  actionsRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode[]>;
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

export const AppsLogoComponents: React.FC<{
  appList?: SiderMenuProps['appList'];
  prefixCls?: string;
}> = (props: SiderMenuProps) => {
  const { appList, prefixCls = 'ant-pro' } = props;
  if (!props?.appList?.length) return null;
  return (
    <Popover
      content={
        <div className={`${prefixCls}-basicLayout-apps-content`}>
          <ul className={`${prefixCls}-basicLayout-apps-content-list`}>
            {appList?.map((app, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className={`${prefixCls}-basicLayout-apps-content-list-item`}>
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
      <span className={`${prefixCls}-basicLayout-apps-icon`}>
        <AppsLogo />
      </span>
    </Popover>
  );
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
    links,
    menuContentRender,
    collapsedButtonRender,
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

  const menuDom = useMemo(
    () =>
      menuContentRender !== false &&
      flatMenuKeys && (
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
      ),
    [baseClassName, flatMenuKeys, menuContentRender, onOpenChange, props],
  );

  const menuRenderDom = useMemo(() => {
    return menuContentRender ? menuContentRender(props, menuDom) : menuDom;
  }, [menuContentRender, menuDom, props]);

  const avatarDom = useMemo(
    () =>
      avatarProps && (
        <Space align="center" className={classNames(`${baseClassName}-actions-avatar`)}>
          <Avatar {...avatarProps} />
          {avatarProps.title && !collapsed && <span>{avatarProps.title}</span>}
        </Space>
      ),
    [avatarProps, baseClassName, collapsed],
  );

  const actionsDom = useMemo(
    () =>
      actionsRender && (
        <Space
          align="center"
          direction={collapsed ? 'vertical' : 'horizontal'}
          className={classNames(`${baseClassName}-actions-list`)}
        >
          {actionsRender?.(props)}
        </Space>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionsRender, baseClassName, collapsed],
  );

  const appsDom = useMemo(() => {
    return <AppsLogoComponents appList={props.appList} prefixCls={props.prefixCls} />;
  }, [props.appList, props.prefixCls]);

  const collapsedDom = useMemo(() => {
    if (collapsedButtonRender === false) return null;
    const dom = (
      <CollapsedIcon
        isMobile={isMobile}
        collapsed={collapsed}
        className={`${baseClassName}-collapsed-button`}
        onClick={() => {
          onCollapse?.(!collapsed);
        }}
      />
    );
    if (collapsedButtonRender) {
      return collapsedButtonRender(collapsed, dom);
    }
    return dom;
  }, [baseClassName, collapsed, collapsedButtonRender, isMobile, onCollapse]);

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
        collapsedWidth={60}
        style={{
          paddingTop: layout === 'mix' && !isMobile ? headerHeight : undefined,
          backgroundColor: 'transparent',
          ...style,
        }}
        width={siderWidth}
        theme={theme}
        className={siderClassName}
      >
        {headerDom && (
          <div
            className={classNames(`${baseClassName}-logo`, {
              [`${baseClassName}-logo-collapsed`]: collapsed,
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
        {layout !== 'mix' && (
          <>
            {avatarDom || actionsDom ? (
              <div
                className={classNames(`${baseClassName}-actions`, {
                  [`${baseClassName}-actions-collapsed`]: collapsed,
                })}
              >
                {avatarDom}
                {actionsDom}
              </div>
            ) : null}
            {rightContentRender ? (
              <div
                className={classNames(`${baseClassName}-actions`, {
                  [`${baseClassName}-actions-collapsed`]: collapsed,
                })}
              >
                {rightContentRender?.(props)}
              </div>
            ) : null}
          </>
        )}

        {menuFooterRender && (
          <div
            className={classNames(`${baseClassName}-footer`, {
              [`${baseClassName}-footer-collapsed`]: collapsed,
            })}
          >
            {menuFooterRender(props)}
          </div>
        )}
        {collapsedDom}
      </Sider>
    </>
  );
};

export { SiderMenu };
