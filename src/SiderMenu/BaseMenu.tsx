import './index.less';

import { Icon, Menu } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import { MenuMode, MenuProps } from 'antd/es/menu';
import { MenuTheme } from 'antd/es/menu/MenuContext';
import defaultSettings, { Settings } from '../defaultSettings';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '../utils/utils';
import { urlToList } from '../utils/pathTools';

import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from '../typings';

export interface BaseMenuProps
  extends Partial<RouterTypes<Route>>,
    Omit<MenuProps, 'openKeys'>,
    Partial<Settings> {
  className?: string;
  collapsed?: boolean;
  flatMenuKeys?: string[];
  handleOpenChange?: (openKeys: string[]) => void;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  onOpenChange?: (openKeys: string[]) => void;
  openKeys?: WithFalse<string[]>;
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;
  menuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
}

const { SubMenu } = Menu;

let IconFont = Icon.createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon?: string | React.ReactNode): React.ReactNode => {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />
          )}
        />
      );
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return icon;
};

export default class BaseMenu extends Component<BaseMenuProps> {
  public static defaultProps: Partial<BaseMenuProps> = {
    flatMenuKeys: [],
    onCollapse: () => undefined,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: () => undefined,
    menuData: [],
    onOpenChange: () => undefined,
  };

  warp: HTMLDivElement | undefined;

  public constructor(props: BaseMenuProps) {
    super(props);
    const { iconfontUrl } = props;
    // reset IconFont
    if (iconfontUrl) {
      IconFont = Icon.createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
  }

  state = {};

  public static getDerivedStateFromProps(props: BaseMenuProps): null {
    const { iconfontUrl } = props;
    // reset IconFont
    if (iconfontUrl) {
      IconFont = Icon.createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
    return null;
  }

  /**
   * 获得菜单子节点
   */
  getNavMenuItems = (menusData: MenuDataItem[] = []): React.ReactNode[] =>
    menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);

  // Get the currently selected menu
  getSelectedMenuKeys = (pathname?: string): string[] => {
    const { flatMenuKeys, selectedKeys } = this.props;
    if (selectedKeys !== undefined) {
      return selectedKeys;
    }

    return urlToList(pathname)
      .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
      .filter(item => item) as string[];
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item: MenuDataItem): React.ReactNode => {
    if (
      Array.isArray(item.children) &&
      !item.hideChildrenInMenu &&
      item.children.some(child => child && !!child.name)
    ) {
      const name = this.getIntlName(item);
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.key || item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.key || item.path}>
        {this.getMenuItemPath(item)}
      </Menu.Item>
    );
  };

  getIntlName = (item: MenuDataItem) => {
    const { name, locale } = item;
    const {
      menu = {
        locale: false,
      },
      formatMessage,
    } = this.props;
    if (locale && menu.locale && formatMessage) {
      return formatMessage({
        id: locale,
        defaultMessage: name,
      });
    }
    return name;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item: MenuDataItem) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const {
      location = { pathname: '/' },
      isMobile,
      onCollapse,
      menuItemRender,
    } = this.props;
    const { target } = item;
    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    let defaultItem = (
      <>
        {icon}
        <span>{name}</span>
      </>
    );
    const isHttpUrl = isUrl(itemPath);
    // Is it a http link
    if (isHttpUrl) {
      defaultItem = (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    if (menuItemRender) {
      return menuItemRender(
        {
          ...item,
          isUrl: isHttpUrl,
          itemPath,
          isMobile,
          replace: itemPath === location.pathname,
          onClick: () => onCollapse && onCollapse(true),
        },
        defaultItem,
      );
    }
    return defaultItem;
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  getPopupContainer = (fixedHeader: boolean, layout: string): HTMLElement => {
    if (fixedHeader && layout === 'topmenu' && this.warp) {
      return this.warp;
    }
    return document.body;
  };

  getRef = (ref: HTMLDivElement) => {
    this.warp = ref;
  };

  render(): React.ReactNode {
    const {
      openKeys,
      theme,
      mode,
      location = {
        pathname: '/',
      },
      className,
      collapsed,
      handleOpenChange,
      style,
      fixedHeader = false,
      layout = 'sidemenu',
      menuData,
      selectedKeys: defaultSelectedKeys,
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(location.pathname);
    if (defaultSelectedKeys === undefined && !selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed && layout === 'sidemenu') {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    const cls = classNames(className, {
      'top-nav-menu': mode === 'horizontal',
    });

    return (
      <>
        <Menu
          {...props}
          key="Menu"
          mode={mode}
          theme={theme}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
          style={style}
          className={cls}
          getPopupContainer={() => this.getPopupContainer(fixedHeader, layout)}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
        <div ref={this.getRef} />
      </>
    );
  }
}
