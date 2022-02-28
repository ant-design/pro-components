import type { CSSProperties } from 'react';
import { useContext } from 'react';
import React, { useMemo } from 'react';
import type { AvatarProps } from 'antd';
import { Avatar, Layout, Menu, ConfigProvider, Space } from 'antd';
import classNames from 'classnames';
import type { SiderProps } from 'antd/lib/layout/Sider';
import type { WithFalse } from '../../typings';
import type { BaseMenuProps } from './BaseMenu';
import { BaseMenu } from './BaseMenu';
import { MenuCounter } from './Counter';
import type { HeaderViewProps } from '../../Header';
import type { AppsLogoComponentsAppList } from '../AppsLogoComponents';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';
import { ArrowSvgIcon } from './Arrow';
import { cx, css, keyframes } from '../../emotion';
import { ProLayoutContext } from '../../ProLayoutContext';

import type { LayoutDesignToken } from '../../ProLayoutContext';

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
    margin: 0 0 0 12px;
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
  return (
    <div
      {...rest}
      className={cx(
        props.className,
        defaultIconCss(designToken),
        css({
          boxShadow:
            '0 4px 16px -4px rgba(0,0,0,0.05), 0 2px 8px -2px rgba(25,15,15,0.07), 0 1px 2px 0 rgba(0,0,0,0.08)',
        }),
        !isMobile &&
          css({
            transform: !collapsed ? 'rotate(90deg)' : 'rotate(-90deg)',
          }),
        isMobile &&
          css({
            right: collapsed ? '-18px' : '-12px',
            top: '72px',
            transform: collapsed ? 'rotate(-90deg) translate(8px, 0px);' : 'rotate(90deg) ',
          }),
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
  /** 相关品牌的列表 */
  appList?: AppsLogoComponentsAppList;
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
   * @deprecated
   * 使用 actionsRender 和 avatarProps 代替
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

export type PrivateSiderMenuProps = {
  matchMenuKeys: string[];
  originCollapsed?: boolean;
  menuRenderType?: 'header';
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

  const designToken = useContext(ProLayoutContext);

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = `${prefixCls}-sider`;
  const { flatMenuKeys } = MenuCounter.useContainer();
  const siderClassName = classNames(`${baseClassName}`, {
    [`${baseClassName}-fixed`]: fixSiderbar,
    [`${baseClassName}-layout-${layout}`]: layout && !isMobile,
    [`${baseClassName}-light`]: theme !== 'dark',
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
              color: ${designToken.sider.menuTextColor};
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
        onClick={() => onCollapse?.(!collapsed)}
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

  const collapsedCss = useMemo(() => {
    // 收起时完全隐藏菜单
    return (
      props?.menu?.hideMenuWhenCollapsed &&
      collapsed &&
      css`
        left: -${collapsedWidth}px;
        position: absolute;
      `
    );
  }, [collapsed, props?.menu?.hideMenuWhenCollapsed]);

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

      {menuFooterRender && (
        <div
          className={cx([
            `${baseClassName}-footer`,
            collapsed && `${baseClassName}-footer-collapsed`,
            css`
              color: ${designToken.sider.menuTextColorSecondary};
              animation: ${proLayoutTitleHide} 0.35s;
            `,
            collapsed &&
              css`
                display: none;
              `,
          ])}
        >
          {menuFooterRender(props)}
        </div>
      )}
    </>
  );

  return (
    <>
      {fixSiderbar && !isMobile && !collapsedCss && (
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
          fixSiderbar &&
            css`
              position: fixed;
              top: 0;
              left: 0;
              z-index: 100;
              height: 100%;
            `,
          collapsedCss,
          layout === 'mix' &&
            !isMobile &&
            css`
              height: calc(100% - ${headerHeight}px);
              top: ${headerHeight}px;
            `,
          css`
            .${antPrefix}-layout-sider-children {
              position: relative;
              display: flex;
              flex-direction: column;
              height: 100%;
              border-right: 1px solid ${designToken.borderColorSplit};
              > * {
                contain: layout;
              }
            }
          `,
        )}
      >
        {collapsedCss ? (
          <div
            style={{
              height: '100%',
              width: '100%',
              opacity: collapsedCss ? 0 : 1,
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
