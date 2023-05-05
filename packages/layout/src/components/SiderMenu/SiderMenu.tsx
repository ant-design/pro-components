import type { GenerateStyle } from '@ant-design/pro-provider';
import { ProProvider } from '@ant-design/pro-provider';
import type { AvatarProps, SiderProps } from 'antd';
import { Avatar, Layout, Menu, Space } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { useContext, useMemo } from 'react';
import type { WithFalse } from '../../typing';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';
import type { AppListProps, AppItemProps } from '../AppsLogoComponents/types';
import { CollapsedIcon } from '../CollapsedIcon';
import type { HeaderViewProps } from '../Header';
import type { BaseMenuProps } from './BaseMenu';
import { BaseMenu } from './BaseMenu';
import type { SiderMenuToken } from './style/stylish';
import { useStylish } from './style/stylish';

const { Sider } = Layout;

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

  /**
   * 收起来时候直接不显示
   */
  if (props.isMobile) {
    return null;
  }
  if (layout === 'mix' && renderKey === 'menuHeaderRender') return false;
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
  /** 相关品牌的列表 */
  appList?: AppListProps;
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
        props: AvatarProps,
        defaultDom: React.ReactNode,
      ) => React.ReactNode;
    }
  >;

  /** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
  actionsRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode[]>;
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

    //@ts-ignore
    rightContentRender,
    actionsRender,
    onOpenChange,
    stylish,
    logoStyle,
  } = props;
  const { hashId } = useContext(ProProvider);
  const showSiderExtraDom = useMemo(() => {
    if (isMobile) return false;
    if (layout === 'mix') return false;
    return true;
  }, [isMobile, layout]);

  const baseClassName = `${prefixCls}-sider`;

  // 收起的宽度
  const collapsedWidth = 64;

  // 之所以这样写是为了提升样式优先级，不然会被sider 自带的覆盖掉
  const stylishClassName = useStylish(
    `${baseClassName}.${baseClassName}-stylish`,
    {
      stylish,
      proLayoutCollapsedWidth: collapsedWidth,
    },
  );

  const siderClassName = classNames(`${baseClassName}`, hashId, {
    [`${baseClassName}-fixed`]: fixSiderbar,
    [`${baseClassName}-fixed-mix`]:
      layout === 'mix' && !isMobile && fixSiderbar,
    [`${baseClassName}-collapsed`]: props.collapsed,
    [`${baseClassName}-layout-${layout}`]: layout && !isMobile,
    [`${baseClassName}-light`]: theme !== 'dark',
    [`${baseClassName}-mix`]: layout === 'mix' && !isMobile,
    [`${baseClassName}-stylish`]: !!stylish,
  });

  const headerDom = renderLogoAndTitle(props);

  const extraDom = menuExtraRender && menuExtraRender(props);

  const menuDom = useMemo(
    () =>
      menuContentRender !== false && (
        <BaseMenu
          {...props}
          key="base-menu"
          mode="inline"
          handleOpenChange={onOpenChange}
          style={{
            width: '100%',
          }}
          className={`${baseClassName}-menu ${hashId}`}
        />
      ),
    [baseClassName, hashId, menuContentRender, onOpenChange, props],
  );

  const linksMenuItems: ItemType[] = (links || []).map((node, index) => ({
    className: `${baseClassName}-link`,
    label: node,
    key: index,
  }));

  const menuRenderDom = useMemo(() => {
    return menuContentRender ? menuContentRender(props, menuDom) : menuDom;
  }, [menuContentRender, menuDom, props]);

  const avatarDom = useMemo(() => {
    if (!avatarProps) return null;
    const { title, render, ...rest } = avatarProps;
    const dom = (
      <div className={`${baseClassName}-actions-avatar`}>
        <Avatar size={28} {...rest} />
        {avatarProps.title && !collapsed && <span>{title}</span>}
      </div>
    );
    if (render) {
      return render(avatarProps, dom);
    }
    return dom;
  }, [avatarProps, baseClassName, collapsed]);

  const actionsDom = useMemo(
    () => {
      if (!actionsRender) return null;
      return (
        <Space
          align="center"
          size={4}
          direction={collapsed ? 'vertical' : 'horizontal'}
          className={classNames([
            `${baseClassName}-actions-list`,
            collapsed && `${baseClassName}-actions-list-collapsed`,
            hashId,
          ])}
        >
          {actionsRender?.(props).map((item, index) => {
            return (
              <div
                key={index}
                className={`${baseClassName}-actions-list-item ${hashId}`}
              >
                {item}
              </div>
            );
          })}
        </Space>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionsRender, baseClassName, collapsed],
  );

  const appsDom = useMemo(() => {
    return (
      <AppsLogoComponents
        itemClick={props.itemClick}
        appList={props.appList}
        prefixCls={props.prefixCls}
      />
    );
  }, [props.appList, props.prefixCls]);

  const collapsedDom = useMemo(() => {
    if (collapsedButtonRender === false) return null;
    const dom = (
      <CollapsedIcon
        isMobile={isMobile}
        collapsed={originCollapsed}
        className={`${baseClassName}-collapsed-button`}
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
    if (!avatarDom && !actionsDom) return null;

    return (
      <div
        className={classNames(
          `${baseClassName}-actions`,
          hashId,
          collapsed && `${baseClassName}-actions-collapsed`,
        )}
      >
        {avatarDom}
        {actionsDom}
      </div>
    );
  }, [actionsDom, avatarDom, baseClassName, collapsed, hashId]);

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
          className={classNames([
            classNames(`${baseClassName}-logo`, hashId, {
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
          className={classNames([
            `${baseClassName}-extra`,
            !headerDom && `${baseClassName}-extra-no-logo`,
            hashId,
          ])}
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
        <div className={`${baseClassName}-links ${hashId}`}>
          <Menu
            inlineIndent={16}
            className={`${baseClassName}-link-menu ${hashId}`}
            selectedKeys={[]}
            openKeys={[]}
            theme={theme}
            mode="inline"
            items={linksMenuItems}
          />
        </div>
      ) : null}
      {showSiderExtraDom && (
        <>
          {actionAreaDom}
          {!actionsDom && rightContentRender ? (
            <div
              className={classNames(`${baseClassName}-actions`, hashId, {
                [`${baseClassName}-actions-collapsed`]: collapsed,
              })}
            >
              {rightContentRender?.(props)}
            </div>
          ) : null}
        </>
      )}
      {menuFooterDom && (
        <div
          className={classNames([
            `${baseClassName}-footer`,
            hashId,
            { [`${baseClassName}-footer-collapsed`]: collapsed },
          ])}
        >
          {menuFooterDom}
        </div>
      )}
    </>
  );

  return stylishClassName.wrapSSR(
    <>
      {fixSiderbar && !isMobile && !hideMenuWhenCollapsedClassName && (
        <div
          style={{
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
        style={style}
        theme={theme}
        width={siderWidth}
        className={classNames(
          siderClassName,
          hashId,
          hideMenuWhenCollapsedClassName,
        )}
      >
        {hideMenuWhenCollapsedClassName ? (
          <div
            className={`${baseClassName}-hide-when-collapsed ${hashId}`}
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
