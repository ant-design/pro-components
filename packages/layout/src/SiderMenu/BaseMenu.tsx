import './index.less';
import Icon, { createFromIconfontCN } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { isUrl, isImg } from '@ant-design/pro-utils';

import { MenuMode, MenuProps } from 'antd/lib/menu';
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import defaultSettings, { PureSettings } from '../defaultSettings';
import { getSelectedMenuKeys } from './SiderMenuUtils';
import { getOpenKeysFromMenuData } from '../utils/utils';

import { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from '../typings';
import MenuCounter from './Counter';

export interface BaseMenuProps
  extends Partial<RouterTypes<Route>>,
    Omit<MenuProps, 'openKeys' | 'onOpenChange'>,
    Partial<PureSettings> {
  className?: string;
  collapsed?: boolean;
  splitMenus?: boolean;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  handleOpenChange?: (openKeys: string[]) => void;

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
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
}

const { SubMenu } = Menu;

let IconFont = createFromIconfontCN({
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
    if (isUrl(icon) || isImg(icon)) {
      return (
        <Icon component={() => <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />} />
      );
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

class MenuUtil {
  constructor(props: BaseMenuProps) {
    this.props = props;
  }

  props: BaseMenuProps;

  getNavMenuItems = (menusData: MenuDataItem[] = [], isChildren: boolean): React.ReactNode[] =>
    menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => this.getSubMenuOrItem(item, isChildren))
      .filter((item) => item);

  hasChildren = (item: MenuDataItem) => {
    return (
      item &&
      !item.hideChildrenInMenu &&
      item?.children &&
      item.children.some((child) => child && !!child.name && !child.hideInMenu)
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item: MenuDataItem, isChildren: boolean): React.ReactNode => {
    if (Array.isArray(item.children) && this.hasChildren(item)) {
      const name = this.getIntlName(item);
      const { subMenuItemRender, prefixCls } = this.props;
      //  get defaultTitle by menuItemRender
      const defaultTitle = item.icon ? (
        <span className={`${prefixCls}-menu-item`}>
          {!isChildren && getIcon(item.icon)}
          <span>{name}</span>
        </span>
      ) : (
        <span className={`${prefixCls}-menu-item`}>{name}</span>
      );

      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle)
        : defaultTitle;

      return (
        <SubMenu title={title} key={item.key || item.path} onTitleClick={item.onTitleClick}>
          {this.getNavMenuItems(item.children, true)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key || item.path}>{this.getMenuItemPath(item, isChildren)}</Menu.Item>
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
  getMenuItemPath = (item: MenuDataItem, isChildren: boolean) => {
    const itemPath = this.conversionPath(item.path || '/');
    const { location = { pathname: '/' }, isMobile, onCollapse, menuItemRender } = this.props;
    const { target } = item;
    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    const { prefixCls } = this.props;
    const icon = isChildren ? null : getIcon(item.icon);
    let defaultItem = (
      <span className={`${prefixCls}-menu-item`}>
        {icon}
        <span className={`${prefixCls}-menu-item-title`}>{name}</span>
      </span>
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
      const renderItemProps = {
        ...item,
        isUrl: isHttpUrl,
        itemPath,
        isMobile,
        replace: itemPath === location.pathname,
        onClick: () => onCollapse && onCollapse(true),
      };
      // 如果 hideChildrenInMenu 删除掉无用的 children
      if (!this.hasChildren(item)) {
        delete renderItemProps.children;
      }
      return menuItemRender(renderItemProps, defaultItem);
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
  openKeys: React.ReactText[] | false = [],
  { layout, collapsed }: BaseMenuProps,
): {
  openKeys?: undefined | string[];
} => {
  let openKeysProps = {};
  if (openKeys && !collapsed && ['side', 'mix'].includes(layout || 'mix')) {
    openKeysProps = {
      openKeys,
    };
  }
  return openKeysProps;
};

const BaseMenu: React.FC<BaseMenuProps> = (props) => {
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
    splitMenus,
    collapsed,
    selectedKeys: propsSelectedKeys,
    onSelect,
    openKeys: propsOpenKeys,
  } = props;
  const openKeysRef = useRef<string[]>([]);
  // 用于减少 defaultOpenKeys 计算的组件
  const defaultOpenKeysRef = useRef<string[]>([]);
  const [postMenuData, setPostMenuData] = useState(() => menuData);
  const postMenuDataRef = useRef(postMenuData);

  const { pathname } = location;

  const { flatMenuKeys } = MenuCounter.useContainer();
  const [defaultOpenAll, setDefaultOpenAll] = useState(menu.defaultOpenAll);

  const [openKeys, setOpenKeys] = useMergedState<WithFalse<React.ReactText[] | undefined>>(
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

  const [selectedKeys, setSelectedKeys] = useMergedState<string[] | undefined>([], {
    value: propsSelectedKeys,
    onChange: onSelect
      ? (keys) => {
          if (onSelect && keys) {
            onSelect(keys as any);
          }
        }
      : undefined,
  });

  useEffect(() => {
    if (menu.defaultOpenAll || propsOpenKeys === false || flatMenuKeys.length) {
      return;
    }
    const keys = getSelectedMenuKeys(location.pathname || '/', postMenuDataRef.current || []);
    if (keys) {
      openKeysRef.current = keys;
      setOpenKeys(keys);
      setSelectedKeys(keys);
    }
  }, [flatMenuKeys.join('-')]);

  useEffect(() => {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
  }, [iconfontUrl]);

  useEffect(() => {
    // if pathname can't match, use the nearest parent's key
    const keys = getSelectedMenuKeys(location.pathname || '/', postMenuDataRef.current || []);
    const animationFrameId = requestAnimationFrame(() => {
      if (keys.join('-') !== (selectedKeys || []).join('-')) {
        setSelectedKeys(keys);
      }
      if (
        !defaultOpenAll &&
        propsOpenKeys !== false &&
        keys.join('-') !== (openKeysRef.current || []).join('-')
      ) {
        setOpenKeys(keys);
        openKeysRef.current = keys;
      } else if (flatMenuKeys.length > 0) {
        setDefaultOpenAll(false);
      }
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [pathname, collapsed]);

  const openKeysProps = useMemo(() => getOpenKeysProps(openKeys, props), [
    openKeys && openKeys.join(','),
    props.layout,
    props.collapsed,
  ]);

  const cls = classNames(className, {
    'top-nav-menu': mode === 'horizontal',
  });

  const [menuUtils] = useState(() => new MenuUtil(props));

  // sync props
  menuUtils.props = props;
  /**
   * 这里需要用 menuData
   * 为了计算 splitMenus 需要用最全的 menuData
   */
  useEffect(() => {
    if (splitMenus && openKeys) {
      const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
      const [key] = keys;
      if (key) {
        const postData = menuData?.find((item) => item.key === key)?.children || [];
        setPostMenuData(postData);
        return;
      }
    }
    setPostMenuData(menuData);
  }, [pathname, splitMenus, flatMenuKeys.join('-')]);

  // 这次 openKeys === false 的时候的情况，这种情况下帮用户选中一次
  // 第二次以后不再关系，所以用了 defaultOpenKeys
  if (props.openKeys === false && !props.handleOpenChange) {
    const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    defaultOpenKeysRef.current = keys;
    if (keys.length < 1) {
      return null;
    }
  }

  const finallyData = props.postMenuData ? props.postMenuData(postMenuData) : postMenuData;

  /**
   * 记下最新的 menuData
   */
  postMenuDataRef.current = finallyData;

  return (
    <Menu
      {...openKeysProps}
      key="Menu"
      mode={mode}
      defaultOpenKeys={defaultOpenKeysRef.current}
      theme={theme}
      inlineIndent={16}
      selectedKeys={selectedKeys}
      style={style}
      className={cls}
      onOpenChange={(keys) => {
        openKeysRef.current = keys as string[];
        setOpenKeys(keys as string[]);
      }}
      {...props.menuProps}
    >
      {menuUtils.getNavMenuItems(finallyData, false)}
    </Menu>
  );
};

BaseMenu.defaultProps = {
  postMenuData: (data) => data || [],
};

export default BaseMenu;
