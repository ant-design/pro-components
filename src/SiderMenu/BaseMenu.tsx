import './index.less';

import { Icon, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';
import warning from 'warning';

import { MenuMode, MenuProps } from 'antd/es/menu';
import { MenuTheme } from 'antd/es/menu/MenuContext';
import defaultSettings, { Settings } from '../defaultSettings';
import { getSelectedMenuKeys } from './SiderMenuUtils';
import { isUrl, getOpenKeysFromMenuData } from '../utils/utils';

import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from '../typings';
import MenuCounter from './Counter';

let firstConsole = true;

export interface BaseMenuProps
  extends Partial<RouterTypes<Route>>,
    Omit<MenuProps, 'openKeys' | 'onOpenChange'>,
    Partial<Settings> {
  className?: string;
  collapsed?: boolean;
  handleOpenChange?: (openKeys: string[]) => void;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  /**
   * 要给菜单的props, 参考antd-menu的属性。https://ant.design/components/menu-cn/
   */
  menuProps?: MenuProps;
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;
  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
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
  if (typeof icon === 'string' && icon !== '') {
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
    if (firstConsole) {
      warning(
        false,
        `In order to ensure compatibility with antd@4, we will delete the configuration icon in the next version, details can be viewed.
为了兼容 antd@4，我们会在下个版本删除配置 icon: string 生成icon的用法。请查看
https://pro.ant.design/blog/antd-4.0-cn 寻找解决方式！`,
      );
      firstConsole = false;
    }
    return <Icon type={icon} />;
  }
  return icon;
};

class MenuUtil {
  constructor(props: BaseMenuProps) {
    this.props = props;
  }

  props: BaseMenuProps;

  getNavMenuItems = (menusData: MenuDataItem[] = []): React.ReactNode[] =>
    menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);

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
      const { subMenuItemRender } = this.props;
      //  get defaultTitle by menuItemRender
      const defaultTitle = item.icon ? (
        <span>
          {getIcon(item.icon)}
          <span>{name}</span>
        </span>
      ) : (
        name
      );

      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle)
        : defaultTitle;

      return (
        <SubMenu
          title={title}
          key={item.key || item.path}
          onTitleClick={item.onTitleClick}
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
    if (locale && menu.locale !== false && formatMessage) {
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
    const itemPath = this.conversionPath(item.path || '/');
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
          {icon} <span>{name}</span>
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
}

/**
 * 生成openKeys 的对象，因为设置了openKeys 就会变成受控，所以需要一个空对象
 * @param BaseMenuProps
 */
const getOpenKeysProps = (
  openKeys: string[] | false = [],
  { layout, collapsed }: BaseMenuProps,
): {
  openKeys?: undefined | string[];
} => {
  let openKeysProps = {};
  if (openKeys && !collapsed && layout === 'sidemenu') {
    openKeysProps = {
      openKeys,
    };
  }
  return openKeysProps;
};

const BaseMenu: React.FC<BaseMenuProps> = props => {
  const {
    theme,
    mode,
    location = {
      pathname: '/',
    },
    className,
    handleOpenChange,
    style,
    menuData,
    menu = { locale: true },
    iconfontUrl,
    selectedKeys: propsSelectedKeys,
    onSelect,
    openKeys: propsOpenKeys,
  } = props;

  const { pathname } = location;

  const { flatMenuKeys, flatMenus } = MenuCounter.useContainer();
  const [defaultOpenAll, setDefaultOpenAll] = useState(menu.defaultOpenAll);

  const [openKeys, setOpenKeys] = useMergeValue<
    WithFalse<string[] | undefined>
  >(
    () => {
      if (menu.defaultOpenAll) {
        return getOpenKeysFromMenuData(menuData) || [];
      }
      if (propsOpenKeys === false) {
        return false;
      }
      return [];
    },
    {
      value: propsOpenKeys === false ? undefined : propsOpenKeys,
      onChange: handleOpenChange as any,
    },
  );

  useEffect(() => {
    if (!flatMenus || flatMenuKeys.length === 0) {
      return;
    }
    if (menu.defaultOpenAll || propsOpenKeys === false) {
      return;
    }
    const keys = getSelectedMenuKeys(
      location.pathname || '/',
      flatMenus,
      flatMenuKeys || [],
    );
    setOpenKeys(keys);
  }, [flatMenus, flatMenuKeys.join('-')]);

  const [selectedKeys, setSelectedKeys] = useMergeValue<string[] | undefined>(
    [],
    {
      value: propsSelectedKeys,
      onChange: onSelect
        ? keys => {
            if (onSelect && keys) {
              onSelect(keys as any);
            }
          }
        : undefined,
    },
  );

  useEffect(() => {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = Icon.createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
  }, [iconfontUrl]);

  useEffect(() => {
    if (!flatMenus || flatMenuKeys.length === 0) {
      return () => null;
    }

    // if pathname can't match, use the nearest parent's key
    const keys = getSelectedMenuKeys(
      pathname || '/',
      flatMenus,
      flatMenuKeys || [],
    );
    const animationFrameId = requestAnimationFrame(() => {
      setSelectedKeys(keys);
      if (!defaultOpenAll && propsOpenKeys !== false) {
        setOpenKeys(keys);
      } else {
        setDefaultOpenAll(false);
      }
    });
    return () =>
      window.cancelAnimationFrame &&
      window.cancelAnimationFrame(animationFrameId);
  }, [pathname, flatMenuKeys.join('-')]);

  const openKeysProps = getOpenKeysProps(openKeys, props);
  const cls = classNames(className, {
    'top-nav-menu': mode === 'horizontal',
  });

  const menuUtils = new MenuUtil(props);
  return (
    <Menu
      {...openKeysProps}
      key="Menu"
      mode={mode}
      theme={theme}
      selectedKeys={selectedKeys}
      style={style}
      className={cls}
      onOpenChange={setOpenKeys}
      {...props.menuProps}
    >
      {menuUtils.getNavMenuItems(menuData)}
    </Menu>
  );
};

export default BaseMenu;
