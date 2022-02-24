import type { CSSProperties } from 'react';
import { useContext } from 'react';
import React, { useMemo } from 'react';
import type { AvatarProps } from 'antd';
import { Avatar, Layout, Menu, ConfigProvider, Space } from 'antd';
import classNames from 'classnames';
import type { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import type { WithFalse } from '../../typings';
import type { BaseMenuProps } from './BaseMenu';
import { BaseMenu } from './BaseMenu';
import { MenuCounter } from './Counter';
import type { HeaderViewProps } from '../../Header';
import type { AppsLogoComponentsAppList } from '../AppsLogoComponents';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';
import { ArrowSvgIcon } from './Arrow';

import { cx, css, keyframes } from '../../emotion';

const { Sider } = Layout;

const defaultIconCss = css`
  position: absolute;
  top: 18px;
  z-index: 101;
  width: 24px;
  height: 24px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  border-radius: 40px;
  right: -13px;
  background-color: #fff;
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
    color: rgba(0, 0, 0, 0.65);
  }
`;

const CollapsedIcon: React.FC<any> = (props) => {
  const { isMobile, collapsed, ...rest } = props;
  return (
    <div
      {...rest}
      className={cx(
        props.className,
        defaultIconCss,
        css({
          transform: !props?.collapsed ? 'rotate(90deg)' : 'rotate(-90deg)',
          boxShadow:
            '0 4px 16px -4px rgba(0,0,0,0.05), 0 2px 8px -2px rgba(25,15,15,0.07), 0 1px 2px 0 rgba(0,0,0,0.08)',
        }),
        isMobile &&
          css({
            right: '-20px',
            transform: !props?.collapsed ? 'rotate(-180deg) translate(8px, 0px);' : 'rotate(0deg) ',
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
  originCollapsed?: boolean;
};

const proLayoutTitleHide = keyframes`
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

const siderCss = css`
  position: relative;
  background: transparent;

  &-menu {
    position: relative;
    z-index: 10;
    min-height: 100%;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
  --ant-primary-color: @color-neutral-light-text;
`;

const siderTitleViewCss = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
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
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    vertical-align: middle;
    animation: ${proLayoutTitleHide} 0.35s;
  }
`;

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
              font-size: 12px;
              & > * {
                cursor: pointer;
              }
            `,
          )}
        >
          <Avatar {...avatarProps} />
          {avatarProps.title && !collapsed && <span>{avatarProps.title}</span>}
        </Space>
      ),
    [avatarProps, baseClassName, collapsed],
  );

  const actionsDom = useMemo(
    () => {
      if (!actionsRender) return null;
      return (
        <Space
          align="center"
          direction={collapsed ? 'vertical' : 'horizontal'}
          className={cx([
            `${baseClassName}-actions-list`,
            css`
              color: rgba(0, 0, 0, 0.45);
              animation: ${proLayoutTitleHide} 0.3s;
              & > * {
                cursor: pointer;
              }
            `,
            collapsed &&
              css`
                margin-bottom: 8px;
                animation: none;
              `,
          ])}
        >
          {actionsRender?.(props)}
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
          onCollapse?.(!collapsed);
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
  }, [actionsDom, avatarDom, baseClassName, collapsed]);

  const antPrefix = context.getPrefixCls();

  return (
    <>
      {fixSiderbar && (
        <div
          className={css({
            width: collapsed ? 48 : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? 48 : siderWidth}px`,
            maxWidth: collapsed ? 48 : siderWidth,
            minWidth: collapsed ? 48 : siderWidth,
            transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`,
            ...style,
          })}
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
          backgroundColor: 'transparent',
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
          layout === 'mix' &&
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
              border-right: 1px solid rgba(0, 0, 0, 0.06);
              > * {
                contain: layout;
              }
            }
          `,
        )}
      >
        {headerDom && (
          <div
            className={cx([
              classNames(`${baseClassName}-logo`, {
                [`${baseClassName}-logo-collapsed`]: collapsed,
              }),
              siderTitleViewCss,
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
        {collapsedDom}
      </Sider>
    </>
  );
};

export { SiderMenu };
