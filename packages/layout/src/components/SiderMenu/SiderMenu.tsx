import type { AvatarProps } from 'antd';
import { Avatar, ConfigProvider, Layout, Menu, Space } from 'antd';
import type { SiderProps } from 'antd/es/layout/Sider';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { css, cx, injectGlobal, keyframes } from '../../emotion';
import type { HeaderViewProps } from '../../Header';
import type { LayoutDesignToken } from '../../ProLayoutContext';
import { ProLayoutContext } from '../../ProLayoutContext';
import type { WithFalse } from '../../typings';
import type { AppsLogoComponentsAppList } from '../AppsLogoComponents';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';
import { ArrowSvgIcon } from './Arrow';
import type { BaseMenuProps } from './BaseMenu';
import { BaseMenu } from './BaseMenu';
import { MenuCounter } from './Counter';

export const defaultIconCss = (designToken: LayoutDesignToken) => css`
  position: absolute;
  top: 18px;
  z-index: 101;
  width: 24px;
  height: 24px;
  font-size: 14px;
  color: ${designToken.sider.collapsedButtonTextColor};
  text-align: center;
  border-radius: 40px;
  right: -13px;
  background-color: ${designToken.sider.collapsedButtonBgColor};
  transition: transform 0.3s;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .anticon {
    font-size: 14px;
  }

  &:hover {
    color: ${designToken.sider.collapsedButtonHoverTextColor};
  }
`;

export const proLayoutTitleHide = keyframes`
0% {
  display: none;
  width: 1px;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
}
80% {
  display: none;
  width: 1px;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
}
100% {
  display: unset;
  height: auto;
  opacity: 1;
}`;

export const siderCss = css`
  position: relative;
  background: transparent;

  &-menu {
    position: relative;
    z-index: 10;
    min-height: 100%;
  }
`;

export const siderTitleViewCss = (designToken: LayoutDesignToken) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  color: ${designToken.sider.menuTextColor};
  border-bottom: 1px solid ${designToken.sider.menuItemDividerColor};
  cursor: pointer;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 22px;
    font-size: 22px;
  }

  img {
    display: inline-block;
    height: 22px;
    vertical-align: middle;
  }

  h1 {
    display: inline-block;
    height: 22px;
    margin: 0 0 0 6px;
    color: ${designToken.sider.menuTitleTextColor};
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    vertical-align: middle;
    animation: ${proLayoutTitleHide} 0.35s;
  }
`;

const { Sider } = Layout;

const CollapsedIcon: React.FC<any> = (props) => {
  const { isMobile, collapsed, ...rest } = props;
  const designToken = useContext(ProLayoutContext);
  if (isMobile && collapsed) return null;
  return (
    <div
      {...rest}
      className={cx(
        props.className,
        defaultIconCss(designToken),
        css(`
          box-shadow: 0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08);
          &:hover {
            box-shadow: 0 4px 16px -4px rgba(0,0,0,0.05), 0 2px 8px -2px rgba(25,15,15,0.07), 0 1px 2px 0 rgba(0,0,0,0.08);
          }
        `),
        !isMobile &&
          css(`
        > svg {
          transform: ${!collapsed ? 'rotate(90deg)' : 'rotate(-90deg)'};
        }
          `),
        isMobile &&
          css(`  > svg {
            right: -16px;
            top: 72px;
            transform: ${collapsed ? 'rotate(-90deg) translate(8px, 0px)' : 'rotate(90deg)'};
          `),
      )}
    >
      <ArrowSvgIcon />
    </div>
  );
};

/**
 * 渲染 title 和 logo
 *
 * @param props
 * @param renderKey
 * @returns
 */
export const renderLogoAndTitle = (
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
  appList?: AppsLogoComponentsAppList;
  /** 菜单的宽度 */
  siderWidth?: number;
  /** 头像的设置 */
  avatarProps?: WithFalse<
    AvatarProps & {
      title?: React.ReactNode;
    }
  >;
  /**
   * @deprecated
   * 使用 actionsRender 和 avatarProps 代替
   */
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;

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
    (logo: React.ReactNode, title: React.ReactNode, props?: SiderMenuProps) => React.ReactNode
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
    rightContentRender,
    actionsRender,
    onOpenChange,
    headerHeight,
    logoStyle,
  } = props;

  const showSiderExtraDom = useMemo(() => {
    if (isMobile) return false;
    if (layout === 'mix') return false;
    return true;
  }, [isMobile, layout]);

  const designToken = useContext(ProLayoutContext);

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = `${prefixCls}-sider`;
  const { flatMenuKeys } = MenuCounter.useContainer();
  const siderClassName = classNames(`${baseClassName}`, {
    [`${baseClassName}-fixed`]: fixSiderbar,
    [`${baseClassName}-layout-${layout}`]: layout && !isMobile,
    [`${baseClassName}-light`]: theme !== 'dark',
  });

  const headerDom = renderLogoAndTitle(props);

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

  const linksMenuItems: ItemType[] = (links || []).map((node, index) => ({
    className: `${baseClassName}-link`,
    label: node,
    key: index,
  }));

  const menuRenderDom = useMemo(() => {
    return menuContentRender ? menuContentRender(props, menuDom) : menuDom;
  }, [menuContentRender, menuDom, props]);

  const avatarDom = useMemo(
    () =>
      avatarProps && (
        <Space
          align="center"
          className={cx(
            `${baseClassName}-actions-avatar`,
            css`
              font-size: 14px;
              padding: 8px;
              border-radius: ${designToken.borderRadiusBase};
              & > * {
                cursor: pointer;
              }
              &:hover {
                background: rgba(0, 0, 0, 0.018);
              }
            `,
          )}
        >
          <Avatar {...avatarProps} />
          {avatarProps.title && !collapsed && <span>{avatarProps.title}</span>}
        </Space>
      ),
    [avatarProps, baseClassName, collapsed, designToken.borderRadiusBase],
  );

  const actionsDom = useMemo(
    () => {
      if (!actionsRender) return null;
      return (
        <Space
          align="center"
          size={4}
          direction={collapsed ? 'vertical' : 'horizontal'}
          className={cx([
            `${baseClassName}-actions-list`,
            css`
              color: ${designToken.sider.menuTextColorSecondary};
              animation: ${proLayoutTitleHide} 0.3s;
            `,
            collapsed &&
              css`
                margin-bottom: 8px;
                animation: none;
              `,
          ])}
        >
          {actionsRender?.(props).map((item, index) => {
            return (
              <div
                key={index}
                className={css`
                  padding: 6px;
                  line-height: 16px;
                  font-size: 16px;
                  cursor: pointer;
                  border-radius: ${designToken.borderRadiusBase};
                  &:hover {
                    background: rgba(0, 0, 0, 0.018);
                  }
                `}
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
    return <AppsLogoComponents appList={props.appList} prefixCls={props.prefixCls} />;
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
  }, [collapsedButtonRender, isMobile, originCollapsed, baseClassName, collapsed, onCollapse]);

  const siderTitleViewCollapsedCss = useMemo(
    () => css`
      flex-direction: column-reverse;
      .${prefixCls}-basicLayout-apps-icon {
        margin-bottom: 8px;
      }
    `,
    [prefixCls],
  );

  /** 操作区域的dom */
  const actionAreaDom = useMemo(() => {
    if (!avatarDom && !actionsDom) return null;

    return (
      <div
        className={cx(
          `${baseClassName}-actions`,
          collapsed && `${baseClassName}-actions-collapsed`,
          css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 4px 0;
            padding: 0 16px;
            color: ${designToken.sider.menuTextColor};
          `,
          collapsed &&
            css`
              flex-direction: column-reverse;
              padding: 0 8px;
              font-size: 16px;
              transition: font-size 0.3s;
            `,
        )}
      >
        {avatarDom}
        {actionsDom}
      </div>
    );
  }, [actionsDom, avatarDom, baseClassName, collapsed, designToken.sider.menuTextColor]);

  const antPrefix = context.getPrefixCls();

  const collapsedWidth = 60;

  /* Using the useMemo hook to create a CSS class that will hide the menu when the menu is collapsed. */
  const hideMenuWhenCollapsedCss = useMemo(() => {
    // 收起时完全隐藏菜单
    if (props?.menu?.hideMenuWhenCollapsed && collapsed) {
      return css`
        left: -${collapsedWidth - 12}px;
        position: absolute;
      `;
    }
    return null;
  }, [collapsed, props?.menu?.hideMenuWhenCollapsed]);

  const menuFooterDom = menuFooterRender && menuFooterRender?.(props);

  const menuDomItems = (
    <>
      {headerDom && (
        <div
          className={cx([
            classNames(`${baseClassName}-logo`, {
              [`${baseClassName}-logo-collapsed`]: collapsed,
            }),
            siderTitleViewCss?.(designToken),
            collapsed && siderTitleViewCollapsedCss,
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
          className={cx([
            `${baseClassName}-extra`,
            !headerDom && `${baseClassName}-extra-no-logo`,
            css`
              margin-bottom: 16px;
              padding: 0 16px;
            `,
            // no-logo
            !headerDom &&
              css`
                margin-top: 16px;
              `,
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
        <div
          className={cx(
            `${baseClassName}-links`,
            css`
              width: 100%;
              ul.${antPrefix}-menu-root {
                height: auto;
              }
            `,
          )}
        >
          <Menu
            inlineIndent={16}
            className={cx(
              `${baseClassName}-link-menu`,
              css({
                border: 'none',
                boxShadow: 'none',
                background: 'transparent',
              }),
            )}
            selectedKeys={[]}
            openKeys={[]}
            theme="light"
            mode="inline"
            items={linksMenuItems}
          />
        </div>
      ) : null}
      {showSiderExtraDom && (
        <>
          {actionAreaDom}
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
      {menuFooterDom && (
        <div
          className={cx([
            `${baseClassName}-footer`,
            collapsed && `${baseClassName}-footer-collapsed`,
            css`
              color: ${designToken.colorTextDisable};
              animation: ${proLayoutTitleHide} 0.35s;
              padding-bottom: 16px;
            `,
          ])}
        >
          {menuFooterDom}
        </div>
      )}
    </>
  );

  useEffect(() => {
    return injectGlobal` 
    .${antPrefix}-menu-submenu > .${antPrefix}-menu {
      background-color: ${
        designToken.sider.menuBackgroundColor === 'transparent'
          ? '#fff'
          : designToken.sider.menuBackgroundColor
      };
    }
    `;
  }, [antPrefix, designToken.sider.menuBackgroundColor]);

  return (
    <>
      {fixSiderbar && !isMobile && !hideMenuWhenCollapsedCss && (
        <div
          className={cx(
            css({
              width: collapsed ? collapsedWidth : siderWidth,
              overflow: 'hidden',
              flex: `0 0 ${collapsed ? collapsedWidth : siderWidth}px`,
              maxWidth: collapsed ? collapsedWidth : siderWidth,
              minWidth: collapsed ? collapsedWidth : siderWidth,
              transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`,
              ...style,
            }),
          )}
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
        style={{
          backgroundColor: designToken.sider.menuBackgroundColor,
          ...style,
        }}
        width={siderWidth}
        theme={theme}
        className={cx(
          siderClassName,
          siderCss,
          css`
            .${antPrefix}-layout-sider-children {
              position: relative;
              display: flex;
              flex-direction: column;
              height: 100%;
              border-right: 1px solid ${designToken.borderColorSplit};
            }
          `,
          fixSiderbar &&
            css`
              position: fixed;
              top: 0;
              left: 0;
              z-index: 100;
              height: 100%;
            `,
          hideMenuWhenCollapsedCss,
          layout === 'mix' &&
            !isMobile &&
            css`
              height: calc(100% - ${headerHeight}px);
              top: ${headerHeight}px;
            `,
        )}
      >
        {hideMenuWhenCollapsedCss ? (
          <div
            className={`${baseClassName}-hide-when-collapsed`}
            style={{
              height: '100%',
              width: '100%',
              opacity: hideMenuWhenCollapsedCss ? 0 : 1,
            }}
          >
            {menuDomItems}
          </div>
        ) : (
          menuDomItems
        )}
        {collapsedDom}
      </Sider>
    </>
  );
};

export { SiderMenu };
