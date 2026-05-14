import type { AvatarProps, SiderProps } from 'antd';
import { Avatar, ConfigProvider, Layout, Space, theme } from 'antd';
import { clsx } from 'clsx';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { useContext, useMemo } from 'react';
import type { GenerateStyle } from '../../../provider';
import { ProProvider } from '../../../provider';
import type { WithFalse } from '../../typing';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';
import type { AppItemProps, AppListProps } from '../AppsLogoComponents/types';
import { CollapsedIcon } from '../CollapsedIcon';
import type { HeaderViewProps } from '../Header';
import type { BaseMenuProps } from './BaseMenu';
import { BaseMenu } from './BaseMenu';
import type { NavMenuNode } from './types';
import { ProLayoutNavMenu } from './ProLayoutNavMenu';
import {
  getProLayoutSiderCssVarsStyle,
  useStyle as useBaseMenuStyle,
} from './style/menu';
import type { SiderMenuToken } from './style/stylish';
import { useStylish } from './style/stylish';

const _SafetyWarningProvider: FC<{ children: ReactNode }> = React.memo(
  (props) => {
    return <>{props.children}</>;
  },
);

const {
  Sider,
  _InternalSiderContext: SiderContext = { Provider: _SafetyWarningProvider },
} = Layout;

export type HeaderRenderKey = 'menuHeaderRender' | 'headerTitleRender';

/**
 * 渲染 title 和 logo
 *
 * @param props
 * @param renderKey
 * @returns
 */
export const renderLogoAndTitle = (
  props: SiderMenuProps,
  renderKey: HeaderRenderKey = 'menuHeaderRender',
): React.ReactNode => {
  const { logo, title } = props;
  const renderFunction = props[renderKey as 'menuHeaderRender'];
  if (renderFunction === false) {
    return null;
  }
  const logoDom = defaultRenderLogo(logo);
  const titleDom = <h1>{title ?? 'Ant Design Pro'}</h1>;

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }

  /**
   * 收起来时候直接不显示
   */
  if (props.isMobile) {
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
  /** 与 ProLayout 一致的类名前缀，如 `ant-pro-layout` */
  prefixCls?: string;
  /** 传给 antd Sider 的 theme */
  theme?: SiderProps['theme'];
  /** 品牌logo的标识 */
  logo?: React.ReactNode;
  /** 相关品牌的列表 */
  appList?: AppListProps;
  appListRender?: (
    props: AppListProps,
    defaultDom: React.ReactNode,
  ) => React.ReactNode;
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  itemClick?: (
    item: AppItemProps,
    popoverRef?: React.RefObject<HTMLSpanElement>,
  ) => void;
  /** 菜单的宽度 */
  siderWidth?: number;
  /** 头像的设置 */
  avatarProps?: WithFalse<
    AvatarProps & {
      title?: React.ReactNode;
      render?: (
        avatarProps: AvatarProps,
        defaultDom: React.ReactNode,
        props: SiderMenuProps,
      ) => React.ReactNode;
    }
  >;

  /** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
  actionsRender?: WithFalse<
    (props: HeaderViewProps) => React.ReactNode[] | React.ReactNode
  >;
  /**
   * @name  菜单 logo 和 title 区域的渲染
   *
   * @example 不要logo : menuHeaderRender={(logo,title)=> title}
   * @example 不要title : menuHeaderRender={(logo,title)=> logo}
   * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
   * @example 不要这个区域了 : menuHeaderRender={false}
   */
  menuHeaderRender?: WithFalse<
    (
      logo: React.ReactNode,
      title: React.ReactNode,
      props?: SiderMenuProps,
    ) => React.ReactNode
  >;
  /**
   * @name 侧边菜单底部的配置，可以增加一些底部操作
   *
   * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
   * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
   */
  menuFooterRender?: WithFalse<(props?: SiderMenuProps) => React.ReactNode>;

  /**
   * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
   *
   * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style={{backgroundColor:"red"}}>{defaultDom}</div>}
   * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
   */
  menuContentRender?: WithFalse<
    (props: SiderMenuProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  /**
   * @name 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
   *
   * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
   * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
   */
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>;
  /**
   * @name 自定义展开收起按钮的渲染
   *
   * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
   * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
   * @example 不渲染按钮 collapsedButtonRender={false}
   */
  collapsedButtonRender?: WithFalse<
    (collapsed?: boolean, defaultDom?: React.ReactNode) => React.ReactNode
  >;
  /**
   * @name 菜单是否收起的断点，设置成false 可以禁用
   *
   * @example 禁用断点  breakpoint={false}
   * @example 最小的屏幕再收起 breakpoint={"xs"}
   */
  breakpoint?: SiderProps['breakpoint'] | false;

  /**
   * @name 菜单顶部logo 和 title 区域的点击事件
   *
   * @example 点击跳转到首页 onMenuHeaderClick={()=>{ history.push('/') }}
   */
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * @name 侧边菜单底部的一些快捷链接
   *
   * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
   */
  links?: React.ReactNode[];
  onOpenChange?: (openKeys: WithFalse<string[]>) => void;
  getContainer?: false;

  /**
   * @name 侧边菜单的logo的样式，可以调整下大小
   *
   * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
   */
  logoStyle?: CSSProperties;
  hide?: boolean;
  className?: string;
  style?: CSSProperties;
} & Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>>;

export type PrivateSiderMenuProps = {
  matchMenuKeys: string[];
  originCollapsed?: boolean;
  menuRenderType?: 'header' | 'sider';
  stylish?: GenerateStyle<SiderMenuToken>;
};

const SiderMenu: React.FC<SiderMenuProps & PrivateSiderMenuProps> = (props) => {
  const {
    collapsed,
    originCollapsed,
    fixSiderbar,
    menuFooterRender,
    onCollapse,
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

    actionsRender,
    splitMenus,
    onOpenChange,
    stylish,
    logoStyle,
  } = props;
  const { getPrefixCls, theme: antdThemeConfig } = useContext(
    ConfigProvider.ConfigContext,
  );
  const resolvedPrefixCls = prefixCls ?? getPrefixCls('pro');
  const { hashId: hashIdFromProvider, token: proToken } =
    useContext(ProProvider);
  const { token: antdToken } = theme.useToken();
  const hashId = hashIdFromProvider ?? '';
  const showSiderExtraDom = useMemo(() => {
    if (isMobile) return false;
    return true;
  }, [isMobile]);

  const baseClassName = `${resolvedPrefixCls}-sider`;
  const linkMenuBaseClassName = `${resolvedPrefixCls}-base-menu-sider`;
  useBaseMenuStyle(linkMenuBaseClassName, 'vertical');

  const siderCssVarsStyle = useMemo(
    () => getProLayoutSiderCssVarsStyle(proToken?.layout, antdToken),
    [proToken?.layout, antdToken],
  );

  /** antd `Layout.Sider` 的 `theme` 与外层 `ConfigProvider` algorithm 对齐（含 `darkAlgorithm` 时为 dark） */
  const antdSiderTheme = useMemo((): NonNullable<SiderProps['theme']> => {
    const alg = antdThemeConfig?.algorithm;
    if (alg == null) return 'light';
    const list = Array.isArray(alg) ? alg : [alg];
    return list.includes(theme.darkAlgorithm) ? 'dark' : 'light';
  }, [antdThemeConfig?.algorithm]);

  // 收起的宽度，从 menu 配置中读取，默认为 64
  const collapsedWidth = props.menu?.collapsedWidth ?? 64;

  const stylishClassName = useStylish(
    `${baseClassName}.${baseClassName}-stylish`,
    {
      stylish,
      proLayoutCollapsedWidth: collapsedWidth,
    },
  );

  const siderClassName = clsx(`${baseClassName}`, hashId, {
    [`${baseClassName}-fixed`]: fixSiderbar,
    [`${baseClassName}-collapsed`]: props.collapsed,
    [`${baseClassName}-layout-${layout}`]: layout && !isMobile,
    [`${baseClassName}-light`]: true,
    [`${baseClassName}-stylish`]: !!stylish,
  });

  const hasHeaderTitleRender =
    'headerTitleRender' in props &&
    (props as { headerTitleRender?: unknown }).headerTitleRender !== undefined;
  const headerRenderKey: HeaderRenderKey =
    props.menuHeaderRender !== undefined
      ? 'menuHeaderRender'
      : hasHeaderTitleRender
        ? 'headerTitleRender'
        : 'menuHeaderRender';

  const headerDom = renderLogoAndTitle(props, headerRenderKey);

  const extraDom = menuExtraRender && menuExtraRender(props);

  const menuDom = useMemo(
    () =>
      menuContentRender !== false && (
        <BaseMenu
          {...props}
          key="base-menu"
          mode="vertical"
          onOpenChange={onOpenChange}
          style={{
            width: '100%',
          }}
          className={clsx(`${baseClassName}-menu`, hashId)}
          data-testid="pro-layout-sider-menu"
        />
      ),
    [baseClassName, hashId, menuContentRender, onOpenChange, props],
  );

  const linksNavNodes: NavMenuNode[] = (links || []).map((node, index) => ({
    kind: 'item',
    key: `link-${index}`,
    className: `${linkMenuBaseClassName}-link-item`,
    label: (
      <span
        className={clsx(`${baseClassName}-link`, hashId)}
        data-testid="pro-layout-sider-link"
      >
        {node}
      </span>
    ),
  }));

  const menuRenderDom = useMemo(() => {
    return menuContentRender ? menuContentRender(props, menuDom) : menuDom;
  }, [menuContentRender, menuDom, props]);

  const avatarDom = useMemo(() => {
    if (!avatarProps) return null;
    const { title, render, ...rest } = avatarProps;
    const dom = (
      <div
        className={`${baseClassName}-actions-avatar`}
        data-testid="pro-layout-sider-actions-avatar"
      >
        {rest?.src || rest?.srcSet || rest.icon || rest.children ? (
          <Avatar size={28} {...rest} />
        ) : null}
        {avatarProps.title && !collapsed && <span>{title}</span>}
      </div>
    );
    if (render) {
      return render(avatarProps, dom, props);
    }
    return dom;
  }, [avatarProps, baseClassName, collapsed]);

  const actionsDom = useMemo(() => {
    if (!actionsRender) return null;
    return (
      <Space
        align="center"
        size={4}
        orientation={collapsed ? 'vertical' : 'horizontal'}
        className={clsx([
          `${baseClassName}-actions-list`,
          collapsed && `${baseClassName}-actions-list-collapsed`,
          hashId,
        ])}
        data-testid="pro-layout-sider-actions-list"
      >
        {[actionsRender?.(props as HeaderViewProps)]
          .flat(1)
          .map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(`${baseClassName}-actions-list-item`, hashId)}
                data-testid="pro-layout-sider-actions-list-item"
              >
                {item}
              </div>
            );
          })}
      </Space>
    );
  }, [actionsRender, baseClassName, collapsed]);

  const appsDom = useMemo(() => {
    return (
      <AppsLogoComponents
        onItemClick={props.itemClick}
        appListRender={props.appListRender}
        appList={props.appList}
        prefixCls={resolvedPrefixCls}
      />
    );
  }, [props.appList, props.appListRender, resolvedPrefixCls]);

  const collapsedDom = useMemo(() => {
    if (collapsedButtonRender === false) return null;
    const dom = (
      <CollapsedIcon
        isMobile={isMobile}
        collapsed={originCollapsed}
        className={`${baseClassName}-collapsed-button`}
        data-testid="pro-layout-sider-collapsed-button"
        onClick={() => {
          onCollapse?.(!originCollapsed);
        }}
      />
    );
    if (collapsedButtonRender) return collapsedButtonRender(collapsed, dom);
    return dom;
  }, [
    collapsedButtonRender,
    isMobile,
    originCollapsed,
    baseClassName,
    collapsed,
    onCollapse,
  ]);

  /** 操作区域的dom */
  const actionAreaDom = useMemo(() => {
    if (splitMenus && !isMobile) return null;
    if (!avatarDom && !actionsDom) return null;

    return (
      <div
        className={clsx(
          `${baseClassName}-actions`,
          hashId,
          collapsed && `${baseClassName}-actions-collapsed`,
        )}
        data-testid="pro-layout-sider-actions"
      >
        {avatarDom}
        {actionsDom}
      </div>
    );
  }, [
    actionsDom,
    avatarDom,
    baseClassName,
    collapsed,
    hashId,
    isMobile,
    splitMenus,
  ]);

  /* Using the useMemo hook to create a CSS class that will hide the menu when the menu is collapsed. */
  const hideMenuWhenCollapsedClassName = useMemo(() => {
    // 收起时完全隐藏菜单
    if (props?.menu?.hideMenuWhenCollapsed && collapsed) {
      return `${baseClassName}-hide-menu-collapsed`;
    }
    return null;
  }, [baseClassName, collapsed, props?.menu?.hideMenuWhenCollapsed]);

  const menuFooterDom = menuFooterRender && menuFooterRender?.(props);

  const menuDomItems = (
    <>
      {headerDom && (
        <div
          data-testid="pro-layout-sider-logo"
          className={clsx([
            clsx(`${baseClassName}-logo`, hashId, {
              [`${baseClassName}-logo-collapsed`]: collapsed,
            }),
          ])}
          onClick={showSiderExtraDom ? onMenuHeaderClick : undefined}
          id="logo"
          style={logoStyle}
        >
          {headerDom}
          {appsDom}
        </div>
      )}
      {extraDom && (
        <div
          className={clsx([
            `${baseClassName}-extra`,
            !headerDom && `${baseClassName}-extra-no-logo`,
            hashId,
          ])}
          data-testid="pro-layout-sider-extra"
        >
          {extraDom}
        </div>
      )}
      <div
        className={clsx(`${baseClassName}-menu-scroll`, hashId)}
        data-testid="pro-layout-sider-menu-content"
      >
        {menuRenderDom}
      </div>
      <SiderContext.Provider value={{}}>
        {links ? (
          <div
            className={clsx(`${baseClassName}-links`, hashId)}
            data-testid="pro-layout-sider-links"
          >
            <ProLayoutNavMenu
              baseClassName={linkMenuBaseClassName}
              hashId={hashId}
              mode="vertical"
              collapsed={collapsed}
              selectedKeys={[]}
              openKeys={[]}
              nodes={linksNavNodes}
              className={clsx(`${baseClassName}-link-menu`, hashId)}
              data-testid="pro-layout-sider-link-menu"
            />
          </div>
        ) : null}
        {showSiderExtraDom && <>{actionAreaDom}</>}
        {menuFooterDom && (
          <div
            className={clsx([
              `${baseClassName}-footer`,
              hashId,
              { [`${baseClassName}-footer-collapsed`]: collapsed },
            ])}
            data-testid="pro-layout-sider-footer"
          >
            {menuFooterDom}
          </div>
        )}
      </SiderContext.Provider>
    </>
  );

  return stylishClassName.wrapSSR(
    <>
      {fixSiderbar && !isMobile && !hideMenuWhenCollapsedClassName && (
        <div
          style={{
            ...siderCssVarsStyle,
            width: collapsed ? collapsedWidth : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? collapsedWidth : siderWidth}px`,
            maxWidth: collapsed ? collapsedWidth : siderWidth,
            minWidth: collapsed ? collapsedWidth : siderWidth,
            transition: 'all 0.2s ease 0s',
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
        collapsedWidth={collapsedWidth}
        data-testid="pro-layout-sider"
        style={{ ...siderCssVarsStyle, ...style }}
        theme={antdSiderTheme}
        width={siderWidth}
        className={clsx(siderClassName, hashId, hideMenuWhenCollapsedClassName)}
      >
        {hideMenuWhenCollapsedClassName ? (
          <div
            className={clsx(`${baseClassName}-hide-when-collapsed`, hashId)}
            data-testid="pro-layout-sider-hide-when-collapsed"
            style={{
              height: '100%',
              width: '100%',
              opacity: hideMenuWhenCollapsedClassName ? 0 : 1,
            }}
          >
            {menuDomItems}
          </div>
        ) : (
          menuDomItems
        )}
        {collapsedDom}
      </Sider>
    </>,
  );
};

export { SiderMenu };
