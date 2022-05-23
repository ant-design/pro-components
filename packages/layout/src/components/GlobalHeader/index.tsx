import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import type { PureSettings } from '../../defaultSettings';
import type { HeaderViewProps } from '../../Header';
import type { MenuDataItem } from '../../index';
import type { WithFalse } from '../../typings';
import { clearMenuItem } from '../../utils/utils';
import type { PrivateSiderMenuProps, SiderMenuProps } from '../SiderMenu/SiderMenu';
import {
  defaultRenderCollapsedButton,
  defaultRenderLogo,
  defaultRenderLogoAndTitle,
} from '../SiderMenu/SiderMenu';
import TopNavHeader from '../TopNavHeader';
import './index.less';

export type GlobalHeaderProps = {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  /**
   * @name 虽然叫menuRender，但是其实是整个 SiderMenu 面板的渲染函数
   *
   * @example 收起时完成不展示菜单 menuRender={(props,defaultDom)=> props.collapsed ? null : defaultDom}
   * @example 不展示菜单 menuRender={false}
   */
  menuRender?: WithFalse<(props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode>;
  /**
   * @name 右侧顶部操作区域的渲染逻辑,一般会展示一个头像和一些操作
   *
   * @example 展示一个头像: rightRender={(props) => <Avatar shape="square" size="small" icon={<UserOutlined />} />}
   * @example 展示一些操作: rightRender={(props) => [<Button type="primary">操作</Button>,<Button type="primary">管理控制台</Button>]}
   */
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  className?: string;
  prefixCls?: string;
  menuData?: MenuDataItem[];
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps['menuHeaderRender'];

  /**
   * @name 顶部区域的渲染，包含内部的 menu
   *
   * @example headerContentRender={(props) => <div>管理控制台 </div>}
   */
  headerContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  collapsedButtonRender?: SiderMenuProps['collapsedButtonRender'];
  splitMenus?: boolean;
  children?: React.ReactNode;
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
    collapsedButtonRender = defaultRenderCollapsedButton,
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
  const { direction } = useContext(ConfigProvider.ConfigContext);
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

  const logoClassNames = classNames(`${baseClassName}-logo`, {
    [`${baseClassName}-logo-rtl`]: direction === 'rtl',
  });

  const logoDom = (
    <span className={logoClassNames} key="logo">
      <a>{defaultRenderLogo(logo)}</a>
    </span>
  );

  return (
    <div className={className} style={{ ...style }}>
      {isMobile && renderLogo(menuHeaderRender, logoDom)}
      {isMobile && collapsedButtonRender && (
        <span
          className={`${baseClassName}-collapsed-button`}
          onClick={() => {
            if (onCollapse) {
              onCollapse(!collapsed);
            }
          }}
        >
          {collapsedButtonRender(collapsed)}
        </span>
      )}
      {layout === 'mix' && !isMobile && (
        <>
          <div className={logoClassNames} onClick={onMenuHeaderClick}>
            {defaultRenderLogoAndTitle({ ...props, collapsed: false }, 'headerTitleRender')}
          </div>
        </>
      )}
      <div style={{ flex: 1 }}>{children}</div>
      {rightContentRender && rightContentRender(props)}
    </div>
  );
};

export default GlobalHeader;
