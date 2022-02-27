import React from 'react';
import classNames from 'classnames';
import type { HeaderViewProps } from '../../Header';
import type { SiderMenuProps, PrivateSiderMenuProps } from '../SiderMenu/SiderMenu';
import { defaultRenderLogoAndTitle } from '../SiderMenu/SiderMenu';
import type { PureSettings } from '../../defaultSettings';
import { TopNavHeader, RightContent } from '../TopNavHeader';
import type { MenuDataItem } from '../../index';
import type { WithFalse } from '../../typings';
import { clearMenuItem } from '../../utils/utils';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';
import { css, cx } from '../../emotion';
import type { AvatarProps } from 'antd';

export type GlobalHeaderProps = {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  menuRender?: WithFalse<(props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode>;
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  className?: string;
  prefixCls?: string;
  menuData?: MenuDataItem[];
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps['menuHeaderRender'];
  collapsedButtonRender?: SiderMenuProps['collapsedButtonRender'];
  splitMenus?: boolean;
  /** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
  actionsRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode[]>;

  /** 头像的设置 */
  avatarProps?: WithFalse<
    AvatarProps & {
      title?: React.ReactNode;
    }
  >;
  headerContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
} & Partial<PureSettings>;

const renderLogo = (
  menuHeaderRender: SiderMenuProps['menuHeaderRender'],
  logoDom: React.ReactNode,
) => {
  if (menuHeaderRender === false) {
    return null;
  }
  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }
  return logoDom;
};

const GlobalHeader: React.FC<GlobalHeaderProps & PrivateSiderMenuProps> = (props) => {
  const {
    isMobile,
    logo,
    collapsed,
    onCollapse,
    collapsedButtonRender,
    rightContentRender,
    menuHeaderRender,
    onMenuHeaderClick,
    className: propClassName,
    style,
    layout,
    children,
    headerTheme = 'dark',
    splitMenus,
    menuData,
    prefixCls,
  } = props;
  const baseClassName = `${prefixCls}-global-header`;
  const className = classNames(propClassName, baseClassName, {
    [`${baseClassName}-layout-${layout}`]: layout && headerTheme === 'dark',
  });

  if (layout === 'mix' && !isMobile && splitMenus) {
    const noChildrenMenuData = (menuData || []).map((item) => ({
      ...item,
      children: undefined,
      routes: undefined,
    }));
    const clearMenuData = clearMenuItem(noChildrenMenuData);
    return (
      <TopNavHeader
        mode="horizontal"
        {...props}
        splitMenus={false}
        menuData={clearMenuData}
        theme={headerTheme as 'light' | 'dark'}
      />
    );
  }

  const logoDom = (
    <span
      className={cx(
        `${baseClassName}-logo`,
        css`
          position: relative;
          min-width: ${isMobile ? '24px' : '154px'};
          margin-right: ${isMobile ? '0' : '16px'};
          a {
            display: flex;
            align-items: center;
            height: 100%;
            min-height: 22px;
            font-size: 22px;
            img {
              height: 28px;
            }
            h1 {
              height: 32px;
              margin: 0 0 0 8px;
              color: rgba(0, 0, 0, 0.85);
              font-weight: 600;
              font-size: 18px;
              line-height: 32px;
            }
          }
        `,
      )}
      key="logo"
    >
      <a>{defaultRenderLogo(logo)}</a>
    </span>
  );

  return (
    <div
      className={cx(
        className,
        css`
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 16px;

          > a {
            height: 100%;
          }

          .${prefixCls}-basicLayout-apps-icon {
            margin-right: 16px;
          }
        `,
      )}
      style={{ ...style }}
    >
      {isMobile && renderLogo(menuHeaderRender, logoDom)}
      {isMobile && collapsedButtonRender && (
        <span
          className={cx(
            `${baseClassName}-collapsed-button`,
            css`
              display: flex;
              align-items: center;
              margin-left: 16px;
              font-size: 20px;
            `,
          )}
          onClick={() => {
            if (onCollapse) {
              onCollapse(!collapsed);
            }
          }}
        >
          {collapsedButtonRender(collapsed, null)}
        </span>
      )}
      {layout === 'mix' && !isMobile && (
        <>
          <AppsLogoComponents {...props} />
          <div
            className={cx(
              `${baseClassName}-logo`,
              css`
                position: relative;
                min-width: 156px;
                margin-right: ${isMobile ? '0' : '16px'};
                a {
                  display: flex;
                  align-items: center;
                  height: 100%;
                  min-height: 22px;
                  font-size: 22px;
                  img {
                    height: 28px;
                  }
                  h1 {
                    height: 32px;
                    margin: 0 0 0 8px;
                    color: rgba(0, 0, 0, 0.85);
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 32px;
                  }
                }
              `,
            )}
            onClick={onMenuHeaderClick}
          >
            {defaultRenderLogoAndTitle({ ...props, collapsed: false }, 'headerTitleRender')}
          </div>
        </>
      )}
      <div style={{ flex: 1 }}>{children}</div>
      {(rightContentRender || props.actionsRender || props.avatarProps) && (
        <RightContent rightContentRender={rightContentRender} {...props} />
      )}
    </div>
  );
};

export { GlobalHeader };
