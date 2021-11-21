import type { CSSProperties } from 'react';
import { useContext } from 'react';
import React, { useMemo, useState } from 'react';
import type { AvatarProps } from 'antd';
import { Avatar, Layout, Menu, ConfigProvider, Space } from 'antd';
import classNames from 'classnames';
import type { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { cx, css, keyframes } from '@emotion/css';

import './index.less';
import type { WithFalse } from '../../typings';
import type { BaseMenuProps } from './BaseMenu';
import { BaseMenu } from './BaseMenu';
import { MenuCounter } from './Counter';
import type { HeaderViewProps } from '../../Header';
import type { AppsLogoComponentsAppList } from '../AppsLogoComponents';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';

const { Sider } = Layout;

const CollapsedMiniIcon: React.FC = () => {
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

const defaultIconCss = css`
  position: absolute;
  top: calc(50% - 32px);
  right: -12px;
  z-index: 101;
  width: 24px;
  height: 64px;
  font-size: 24px;
  line-height: 64px;
  text-align: center;
  border-radius: 40px;
  transition: transform, right 0.3s;
  font-size: 16px;
  cursor: pointer;
  .anticon {
    font-size: 16px;
  }
`;

const CollapsedIcon: React.FC<any> = (props) => {
  const { isMobile, collapsed, ...rest } = props;
  const [hover, setHover] = useState<boolean>(isMobile || false);
  return (
    <div
      {...rest}
      className={cx(
        props.className,
        defaultIconCss,
        css({
          transform: props?.collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          color: 'rgba(5,30,55,0.08)',
          right: -8,
          '&:hover': {
            color: 'rgba(0,0,0,0.45)',
            right: undefined,
            backgroundColor: '#f0f0f0',
          },
        }),
      )}
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
  border-right: 1px solid rgba(5, 30, 55, 0.08);
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
    animation: ${proLayoutTitleHide} 0.3s;
  }
`;

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
  const context = useContext(ConfigProvider.ConfigContext);
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
        <Space
          align="center"
          className={cx(
            `${baseClassName}-actions-avatar`,
            css`
              font-size: 12px;
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
    () =>
      actionsRender && (
        <Space
          align="center"
          direction={collapsed ? 'vertical' : 'horizontal'}
          className={cx([
            `${baseClassName}-actions-list`,
            css`
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

  const siderTitleViewCollapsedCss = useMemo(
    () => css`
      flex-direction: column-reverse;
      .${prefixCls}-basicLayout-apps-icon {
        margin-bottom: 8px;
      }
    `,
    [prefixCls],
  );

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
          paddingTop: layout === 'mix' && !isMobile ? headerHeight : undefined,
          backgroundColor: 'transparent',
          ...style,
        }}
        width={siderWidth}
        theme={theme}
        className={cx(siderClassName, siderCss)}
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
                ul.${context.getPrefixCls()}-menu-root {
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
            {avatarDom || actionsDom ? (
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
            className={cx([
              `${baseClassName}-footer`,
              collapsed && `${baseClassName}-footer-collapsed`,
              css`
                animation: ${proLayoutTitleHide} 0.3s;
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
