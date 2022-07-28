import Icon, { createFromIconfontCN } from '@ant-design/icons';
import { isImg, isUrl, useMountMergeState } from '@ant-design/pro-utils';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Skeleton } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import type { PureSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import type { LayoutDesignToken } from '../../ProLayoutContext';
import { ProLayoutContext } from '../../ProLayoutContext';
import type { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from '../../typings';
import { getOpenKeysFromMenuData } from '../../utils/utils';
import { MenuCounter } from './Counter';
import type { PrivateSiderMenuProps } from './SiderMenu';
import { useStyle } from './style/menu';

// todo
export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export type BaseMenuProps = {
  className?: string;
  /** 默认的是否展开，会受到 breakpoint 的影响 */
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  splitMenus?: boolean;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  handleOpenChange?: (openKeys: string[]) => void;
  iconPrefixes?: string;
  /** 要给菜单的props, 参考antd-menu的属性。https://ant.design/components/menu-cn/ */
  menuProps?: MenuProps;
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;

  /**
   * @name 处理父级菜单的 props，可以复写菜单的点击功能，一般用于埋点
   * @see 子级的菜单要使用 menuItemRender 来处理
   *
   * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> history.push(item.path) }>{defaultDom}</a> }}
   * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
   */
  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
      menuProps: BaseMenuProps,
    ) => React.ReactNode
  >;

  /**
   * @name 处理菜单的 props，可以复写菜单的点击功能，一般结合 Router 框架使用
   * @see 非子级的菜单要使用 subMenuItemRender 来处理
   *
   * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> history.push(item.path) }>{defaultDom}</a> }}
   * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <Link to={item.path}>{defaultDom}</Link> }}
   */
  menuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
        onClick: () => void;
      },
      defaultDom: React.ReactNode,
      menuProps: BaseMenuProps & Partial<PrivateSiderMenuProps>,
    ) => React.ReactNode
  >;

  /**
   * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
   *
   * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
   */
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
} & Partial<RouterTypes<Route>> &
  Omit<MenuProps, 'openKeys' | 'onOpenChange' | 'title'> &
  Partial<PureSettings>;

let IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (
  icon?: string | React.ReactNode,
  iconPrefixes: string = 'icon-',
): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return (
        <Icon component={() => <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />} />
      );
    }
    if (icon.startsWith(iconPrefixes)) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

class MenuUtil {
  constructor(
    props: BaseMenuProps & {
      token?: LayoutDesignToken;
      menuRenderType?: 'header' | 'sider';
      baseClassName: string;
    },
  ) {
    this.props = props;
  }

  props: BaseMenuProps & {
    token?: LayoutDesignToken;
    menuRenderType?: 'header' | 'sider';
    baseClassName: string;
  };

  getNavMenuItems = (menusData: MenuDataItem[] = [], level: number): ItemType[] =>
    menusData
      .map((item) => this.getSubMenuOrItem(item, level))
      .filter((item) => item)
      .flat(1);

  /** Get SubMenu or Item */
  getSubMenuOrItem = (item: MenuDataItem, level: number): ItemType | ItemType[] => {
    const { subMenuItemRender, baseClassName, prefixCls, menu, iconPrefixes, layout } = this.props;
    const isGroup = menu?.type === 'group' && layout !== 'top';
    const designToken = this.props.token;

    const name = this.getIntlName(item);
    const children = item?.children || item?.routes;
    if (Array.isArray(children) && children.length > 0) {
      /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
      const hasIcon = level === 0 || (isGroup && level === 1);
      //  get defaultTitle by menuItemRender
      const iconDom = getIcon(item.icon, iconPrefixes);
      const defaultTitle = item.icon ? (
        <span title={name}>
          {hasIcon && iconDom}
          <span>{name}</span>
        </span>
      ) : (
        <span title={name}>{name}</span>
      );

      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle, this.props)
        : defaultTitle;

      const childrenList = this.getNavMenuItems(children, level + 1);
      if (isGroup && level === 0 && this.props.collapsed && !menu.collapsedShowGroupTitle) {
        return childrenList;
      }
      const menuType = isGroup && level === 0 ? ('group' as const) : undefined;
      return [
        {
          type: menuType,
          key: item.key! || item.path!,
          title: item.tooltip || title,
          label: title,
          onClick: isGroup ? undefined : item.onTitleClick,
          children: childrenList,
          className: menuType == 'group' ? `${baseClassName}-group` : `${baseClassName}-submenu`,
        } as ItemType,
        isGroup && level === 0
          ? ({
              type: 'divider',
              prefixCls,
              className: `${baseClassName}-divider`,
              key: (item.key! || item.path!) + '-group-divider',
              style: {
                padding: 0,
                borderBottom: 0,
                margin: this.props.collapsed ? '4px' : '12px 16px',
                borderColor: designToken?.sider?.menuItemDividerColor,
              },
            } as ItemType)
          : undefined,
      ].filter(Boolean) as ItemType[];
    }

    return {
      className: `${baseClassName}-menu-item`,
      title: item.tooltip || name,
      disabled: item.disabled,
      key: item.key! || item.path!,
      onClick: item.onTitleClick,
      label: this.getMenuItemPath(item, level),
    };
  };

  getIntlName = (item: MenuDataItem) => {
    const { name, locale } = item;
    const { menu, formatMessage } = this.props;
    if (locale && menu?.locale !== false) {
      return formatMessage?.({
        id: locale,
        defaultMessage: name,
      });
    }
    return name;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a Judge whether it is http link.return a or Link
   *
   * @memberof SiderMenu
   */
  getMenuItemPath = (item: MenuDataItem, level: number) => {
    const itemPath = this.conversionPath(item.path || '/');
    const {
      location = { pathname: '/' },
      isMobile,
      onCollapse,
      menuItemRender,
      iconPrefixes,
    } = this.props;

    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    const { prefixCls, menu } = this.props;
    const isGroup = menu?.type === 'group';
    /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
    const hasIcon = level === 0 || (isGroup && level === 1);
    const icon = !hasIcon ? null : getIcon(item.icon, iconPrefixes);
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
        <span
          title={name}
          onClick={() => {
            window?.open?.(itemPath, '_blank');
          }}
          className={`${prefixCls}-menu-item ${prefixCls}-menu-item-link`}
        >
          {icon}
          <span>{name}</span>
        </span>
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
        children: undefined,
      };
      return menuItemRender(renderItemProps, defaultItem, this.props);
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
 *
 * @param BaseMenuProps
 */
const getOpenKeysProps = (
  openKeys: React.ReactText[] | false,
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

const BaseMenu: React.FC<BaseMenuProps & PrivateSiderMenuProps> = (props) => {
  const {
    mode,
    className,
    handleOpenChange,
    style,
    menuData,
    prefixCls,
    menu,
    matchMenuKeys,
    iconfontUrl,
    selectedKeys: propsSelectedKeys,
    onSelect,
    menuRenderType,
    openKeys: propsOpenKeys,
  } = props;

  const designToken = useContext(ProLayoutContext);
  const baseClassName = `${prefixCls}-base-menu`;
  // 用于减少 defaultOpenKeys 计算的组件
  const defaultOpenKeysRef = useRef<string[]>([]);

  const { flatMenuKeys } = MenuCounter.useContainer();
  const [defaultOpenAll, setDefaultOpenAll] = useMountMergeState(menu?.defaultOpenAll);

  const [openKeys, setOpenKeys] = useMountMergeState<WithFalse<React.Key[]>>(
    () => {
      if (menu?.defaultOpenAll) {
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

  const [selectedKeys, setSelectedKeys] = useMountMergeState<string[] | undefined>([], {
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
    if (menu?.defaultOpenAll || propsOpenKeys === false || flatMenuKeys.length) {
      return;
    }
    if (matchMenuKeys) {
      setOpenKeys(matchMenuKeys);
      setSelectedKeys(matchMenuKeys);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-')]);

  useEffect(() => {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
  }, [iconfontUrl]);

  useEffect(
    () => {
      // if pathname can't match, use the nearest parent's key
      if (matchMenuKeys.join('-') !== (selectedKeys || []).join('-')) {
        setSelectedKeys(matchMenuKeys);
      }
      if (
        !defaultOpenAll &&
        propsOpenKeys !== false &&
        matchMenuKeys.join('-') !== (openKeys || []).join('-')
      ) {
        let newKeys: React.Key[] = matchMenuKeys;
        // 如果不自动关闭，我需要把 openKeys 放进去
        if (menu?.autoClose === false) {
          newKeys = Array.from(new Set([...matchMenuKeys, ...(openKeys || [])]));
        }
        setOpenKeys(newKeys);
      } else if (menu?.ignoreFlatMenu && defaultOpenAll) {
        // 忽略用户手动折叠过的菜单状态，折叠按钮切换之后也可实现默认展开所有菜单
        setOpenKeys(getOpenKeysFromMenuData(menuData));
      } else if (flatMenuKeys.length > 0) setDefaultOpenAll(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchMenuKeys.join('-')],
  );

  const openKeysProps = useMemo(
    () => getOpenKeysProps(openKeys, props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openKeys && openKeys.join(','), props.layout, props.collapsed],
  );

  const menuUtils = useMemo(() => {
    return new MenuUtil({
      ...props,
      token: designToken,
      menuRenderType,
      baseClassName,
    });
  }, [designToken, baseClassName, menuRenderType, props]);

  const { wrapSSR, hashId } = useStyle(baseClassName);

  if (menu?.loading) {
    return (
      <div
        style={
          mode?.includes('inline')
            ? { padding: 24 }
            : {
                marginTop: 16,
              }
        }
      >
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: mode?.includes('inline') ? 6 : 1,
          }}
        />
      </div>
    );
  }

  // 这次 openKeys === false 的时候的情况，这种情况下帮用户选中一次
  // 第二此不会使用，所以用了 defaultOpenKeys
  // 这里返回 null，是为了让 defaultOpenKeys 生效
  if (props.openKeys === false && !props.handleOpenChange) {
    defaultOpenKeysRef.current = matchMenuKeys;
  }

  const finallyData = props.postMenuData ? props.postMenuData(menuData) : menuData;

  if (finallyData && finallyData?.length < 1) {
    return null;
  }
  return wrapSSR(
    <Menu
      {...openKeysProps}
      key="Menu"
      mode={mode}
      inlineIndent={16}
      defaultOpenKeys={defaultOpenKeysRef.current}
      theme="light"
      selectedKeys={selectedKeys}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        ...style,
      }}
      className={classNames(className, hashId, baseClassName, {
        [`${baseClassName}-horizontal`]: mode === 'horizontal',
      })}
      items={menuUtils.getNavMenuItems(finallyData, 0)}
      onOpenChange={setOpenKeys}
      {...props.menuProps}
    />,
  );
};

export { BaseMenu };
