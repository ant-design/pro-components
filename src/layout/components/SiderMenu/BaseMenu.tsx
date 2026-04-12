import { createFromIconfontCN } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { ConfigProvider, Skeleton, Tooltip } from 'antd';
import { clsx } from 'clsx';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ProTokenType } from '../../../provider';
import { ProProvider } from '../../../provider';
import { isImg, isUrl } from '../../../utils';
import type { PureSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import type {
  MenuDataItem,
  MessageDescriptor,
  RouterTypes,
  WithFalse,
} from '../../typing';
import { getOpenKeysFromMenuData } from '../../utils/utils';
import type { PrivateSiderMenuProps } from './SiderMenu';
import type { NavMenuNode } from './navMenuTypes';
import { ProLayoutNavMenu } from './ProLayoutNavMenu';
import { useStyle } from './style/menu';
import type {
  MenuMode,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuSelectInfo,
} from './types';

export type {
  MenuMode,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuSelectInfo,
} from './types';

const MenuItemTooltip = (props: {
  collapsed?: boolean;
  children: React.ReactNode;
  title?: React.ReactNode;
  disable?: boolean;
}) => {
  const [collapsed, setCollapsed] = useState(props.collapsed);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    setTimeout(() => {
      setCollapsed(props.collapsed);
    }, 400);
  }, [props.collapsed]);

  if (props.disable) {
    return props.children as React.JSX.Element;
  }

  return (
    <Tooltip
      title={props.title}
      open={collapsed && props.collapsed ? open : false}
      placement="right"
      onOpenChange={setOpen}
    >
      {props.children}
    </Tooltip>
  );
};

export type BaseMenuProps = {
  prefixCls?: string;
  /** 受控选中项，与路由 `matchMenuKeys` 配合使用 */
  selectedKeys?: string[];
  onSelect?: (info: ProLayoutNavMenuSelectInfo) => void;
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
  /** 与 `openKeys` 配合的受控展开回调 */
  onOpenChange?: (openKeys: string[]) => void;
  iconPrefixes?: string;
  /** 合并到自研菜单根节点 `nav` 上的 DOM 属性（不再透传 antd Menu） */
  menuProps?: ProLayoutNavMenuDomProps;
  style?: React.CSSProperties;
  formatMessage?: (message: MessageDescriptor) => string;

  /**
   * @name 处理父级菜单的 props，可以覆写菜单的点击功能，一般用于埋点
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
      menuConfig: BaseMenuProps,
    ) => React.ReactNode
  >;

  /**
   * @name 处理菜单的 props，可以覆写菜单的点击功能，一般结合 Router 框架使用
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
      menuConfig: BaseMenuProps & Partial<PrivateSiderMenuProps>,
    ) => React.ReactNode
  >;

  /**
   * 修改 name，如果想做个简单的国际化，可以使用这个方法
   */
  menuTextRender?: WithFalse<
    (
      item: MenuDataItem,
      defaultText: React.ReactNode,
      menuConfig: BaseMenuProps,
    ) => React.ReactNode
  >;

  /**
   * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
   *
   * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
   */
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
} & Partial<RouterTypes> &
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
  icon: string | React.ReactNode,
  iconPrefixes: string = 'icon-',
  className: string,
): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return (
        <img
          width={16}
          key={icon}
          src={icon}
          alt="icon"
          className={className}
        />
      );
    }
    if (icon.startsWith(iconPrefixes)) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

const getMenuTitleSymbol = (title: React.ReactNode) => {
  if (title && typeof title === 'string') {
    const symbol = title.substring(0, 1).toUpperCase();
    return symbol;
  }
  return null;
};

class MenuUtil {
  props: BaseMenuProps & {
    token?: ProTokenType;
    menuRenderType?: 'header' | 'sider';
    baseClassName: string;
    hashId: string;
  };

  constructor(
    props: BaseMenuProps & {
      token?: ProTokenType;
      menuRenderType?: 'header' | 'sider';
      baseClassName: string;
      hashId: string;
    },
  ) {
    this.props = props;
  }

  getNavMenuItems = (
    menusData: MenuDataItem[] = [],
    level: number,
    noGroupLevel: number,
  ): NavMenuNode[] =>
    menusData
      .map((item) => this.getSubMenuOrItem(item, level, noGroupLevel))
      .filter((item) => item)
      .flat(1) as NavMenuNode[];

  /** Get SubMenu or Item */
  getSubMenuOrItem = (
    item: MenuDataItem,
    level: number,
    noGroupLevel: number,
  ): NavMenuNode | NavMenuNode[] => {
    const {
      subMenuItemRender,
      baseClassName,
      collapsed,
      menu,
      iconPrefixes,
      layout,
    } = this.props;
    const isGroup = menu?.type === 'group' && layout !== 'top';
    const designToken = this.props.token;

    const name = this.getIntlName(item);
    const children = item?.children;

    const menuType = isGroup && level === 0 ? ('group' as const) : undefined;

    if (Array.isArray(children) && children.length > 0) {
      /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
      const shouldHasIcon = level === 0 || (isGroup && level === 1);

      //  get defaultTitle by menuItemRender
      const iconDom = getIcon(
        item.icon,
        iconPrefixes,
        `${baseClassName}-icon ${this.props?.hashId}`,
      );
      /**
       * 如果没有icon在收起的时候用首字母代替
       */
      const defaultIcon =
        collapsed && shouldHasIcon ? getMenuTitleSymbol(name) : null;

      const defaultTitle = (
        <div
          className={clsx(`${baseClassName}-item-title`, this.props?.hashId, {
            [`${baseClassName}-item-title-collapsed`]: collapsed,
            [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
              collapsed,
            [`${baseClassName}-group-item-title`]: menuType === 'group',
            [`${baseClassName}-item-collapsed-show-title`]:
              menu?.collapsedShowTitle && collapsed,
          })}
        >
          {/* 收起的时候group模式就不要展示icon了，放不下 */}
          {menuType === 'group' && collapsed ? null : shouldHasIcon &&
            iconDom ? (
            <span
              className={clsx(`${baseClassName}-item-icon`, this.props?.hashId)}
            >
              {iconDom}
            </span>
          ) : (
            defaultIcon
          )}
          <span
            className={clsx(`${baseClassName}-item-text`, this.props?.hashId, {
              [`${baseClassName}-item-text-has-icon`]:
                menuType !== 'group' &&
                shouldHasIcon &&
                (iconDom || defaultIcon),
            })}
          >
            {name}
          </span>
        </div>
      );

      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle, this.props)
        : defaultTitle;

      // 如果收起来，没有子菜单了，就不需要展示 group，所以 level 不增加
      if (
        isGroup &&
        level === 0 &&
        this.props.collapsed &&
        !menu.collapsedShowGroupTitle
      ) {
        return this.getNavMenuItems(children, level + 1, level);
      }

      const childrenList = this.getNavMenuItems(
        children,
        level + 1,
        isGroup && level === 0 && this.props.collapsed ? level : level + 1,
      );

      const submenuOrGroup: NavMenuNode =
        menuType === 'group'
          ? {
              kind: 'group',
              key: String(item.key! || item.path!),
              label: title,
              children: childrenList,
              className: clsx(`${baseClassName}-group`),
            }
          : {
              kind: 'submenu',
              key: String(item.key! || item.path!),
              label: title,
              onTitleClick: (e) => item.onTitleClick?.(e),
              children: childrenList,
              className: clsx({
                [`${baseClassName}-submenu`]: true,
                [`${baseClassName}-submenu-has-icon`]:
                  shouldHasIcon && iconDom,
              }),
            };

      return [
        submenuOrGroup,
        isGroup && level === 0
          ? ({
              kind: 'divider' as const,
              key: `${item.key! || item.path!}-group-divider`,
              className: `${baseClassName}-divider`,
              style: {
                padding: 0,
                borderBlockEnd: 0,
                margin: this.props.collapsed ? '4px' : '6px 16px',
                marginBlockStart: this.props.collapsed ? 4 : 8,
                borderColor: designToken?.layout?.sider?.colorMenuItemDivider,
              },
            } as NavMenuNode)
          : undefined,
      ].filter(Boolean) as NavMenuNode[];
    }

    const onTitle = (item as MenuDataItem & { onTitleClick?: () => void })
      .onTitleClick;
    return {
      kind: 'item' as const,
      className: `${baseClassName}-menu-item`,
      disabled: item.disabled,
      key: String(item.key! || item.path!),
      onClick: onTitle ? () => onTitle() : undefined,
      label: this.getMenuItemPath(item, level, noGroupLevel),
    };
  };

  getIntlName = (item: MenuDataItem) => {
    const { name, locale } = item;
    const { menu, formatMessage } = this.props;
    let finalName = name;
    if (locale && menu?.locale !== false) {
      finalName = formatMessage?.({
        id: locale,
        defaultMessage: name,
      });
    }
    if (this.props.menuTextRender) {
      return this.props.menuTextRender(item, finalName, this.props);
    }
    return finalName;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a Judge whether it is http link.return a or Link
   *
   * @memberof SiderMenu
   */
  getMenuItemPath = (
    item: MenuDataItem,
    level: number,
    noGroupLevel: number,
  ) => {
    const itemPath = this.conversionPath(item.path || '/');
    const {
      location = { pathname: '/' },
      isMobile,
      onCollapse,
      menuItemRender,
      iconPrefixes,
    } = this.props;

    // if local is true formatMessage all name。
    const menuItemTitle = this.getIntlName(item);
    const { baseClassName, menu, collapsed } = this.props;
    const isGroup = menu?.type === 'group';
    /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
    const hasIcon = level === 0 || (isGroup && level === 1);
    const icon = !hasIcon
      ? null
      : getIcon(
          item.icon,
          iconPrefixes,
          `${baseClassName}-icon ${this.props?.hashId}`,
        );

    // 如果没有 icon 在收起的时候用首字母代替
    const defaultIcon =
      collapsed && hasIcon ? getMenuTitleSymbol(menuItemTitle) : null;

    let defaultItem = (
      <div
        key={itemPath}
        className={clsx(`${baseClassName}-item-title`, this.props?.hashId, {
          [`${baseClassName}-item-title-collapsed`]: collapsed,
          [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
            collapsed,
          [`${baseClassName}-item-collapsed-show-title`]:
            menu?.collapsedShowTitle && collapsed,
        })}
      >
        <span
          className={clsx(`${baseClassName}-item-icon`, this.props?.hashId)}
          style={{
            display: defaultIcon === null && !icon ? 'none' : '',
          }}
        >
          {icon || <span className="anticon">{defaultIcon}</span>}
        </span>
        <span
          className={clsx(`${baseClassName}-item-text`, this.props?.hashId, {
            [`${baseClassName}-item-text-has-icon`]:
              hasIcon && (icon || defaultIcon),
          })}
        >
          {menuItemTitle}
        </span>
      </div>
    );
    const isHttpUrl = isUrl(itemPath);

    // Is it a http link
    if (isHttpUrl) {
      defaultItem = (
        <span
          key={itemPath}
          onClick={() => {
            window?.open?.(itemPath, '_blank');
          }}
          className={clsx(`${baseClassName}-item-title`, this.props?.hashId, {
            [`${baseClassName}-item-title-collapsed`]: collapsed,
            [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
              collapsed,
            [`${baseClassName}-item-link`]: true,
            [`${baseClassName}-item-collapsed-show-title`]:
              menu?.collapsedShowTitle && collapsed,
          })}
        >
          <span
            className={clsx(`${baseClassName}-item-icon`, this.props?.hashId)}
            style={{
              display: defaultIcon === null && !icon ? 'none' : '',
            }}
          >
            {icon || <span className="anticon">{defaultIcon}</span>}
          </span>
          <span
            className={clsx(`${baseClassName}-item-text`, this.props?.hashId, {
              [`${baseClassName}-item-text-has-icon`]:
                hasIcon && (icon || defaultIcon),
            })}
          >
            {menuItemTitle}
          </span>
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
      return level === 0 ? (
        <MenuItemTooltip
          collapsed={collapsed}
          title={menuItemTitle}
          disable={item.disabledTooltip}
        >
          {menuItemRender(renderItemProps, defaultItem, this.props)}
        </MenuItemTooltip>
      ) : (
        menuItemRender(renderItemProps, defaultItem, this.props)
      );
    }
    return level === 0 ? (
      <MenuItemTooltip
        collapsed={collapsed}
        title={menuItemTitle}
        disable={item.disabledTooltip}
      >
        {defaultItem}
      </MenuItemTooltip>
    ) : (
      defaultItem
    );
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };
}

const BaseMenu: React.FC<BaseMenuProps & PrivateSiderMenuProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const {
    mode,
    className,
    onOpenChange,
    style,
    menuData,
    prefixCls: prefixClsProp = getPrefixCls('pro'),
    menu,
    matchMenuKeys,
    iconfontUrl,
    selectedKeys: propsSelectedKeys,
    onSelect: propsOnSelect,
    menuRenderType,
    openKeys: propsOpenKeys,
  } = props;

  const { token: designToken } = useContext(ProProvider);

  const baseClassName = `${prefixClsProp}-base-menu-${mode}`;
  // 用于减少 defaultOpenKeys 计算的组件
  const defaultOpenKeysRef = useRef<string[]>([]);

  const [defaultOpenAll, setDefaultOpenAll] = useState(menu?.defaultOpenAll);

  const openKeysValue = propsOpenKeys === false ? undefined : propsOpenKeys;
  const [openKeys, setOpenKeysInner] = useControlledState<
    (string | number)[] | false
  >(() => {
    if (menu?.defaultOpenAll) {
      return getOpenKeysFromMenuData(menuData) || [];
    }
    if (propsOpenKeys === false) {
      return false;
    }
    return [];
  }, openKeysValue);
  const setOpenKeys = useCallback(
    (
      updater:
        | ((string | number)[] | false)
        | ((prev: (string | number)[] | false) => (string | number)[] | false),
    ) => {
      setOpenKeysInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (
                updater as (
                  p: (string | number)[] | false,
                ) => (string | number)[] | false
              )(prev)
            : updater;
        (onOpenChange as (keys?: (string | number)[] | false) => void)?.(next);
        return next;
      });
    },
    [onOpenChange],
  );

  const [selectedKeys, setSelectedKeysInner] = useControlledState<
    string[] | undefined
  >([], propsSelectedKeys);
  const setSelectedKeys = useCallback(
    (
      updater:
        | string[]
        | undefined
        | ((prev: string[] | undefined) => string[] | undefined),
    ) => {
      setSelectedKeysInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: string[] | undefined) => string[] | undefined)(
                prev,
              )
            : updater;
        if (propsOnSelect && next?.length) {
          propsOnSelect({ key: next[0]!, selectedKeys: next });
        }
        return next;
      });
    },
    [propsOnSelect],
  );
  useEffect(() => {
    if (menu?.defaultOpenAll || propsOpenKeys === false) {
      return;
    }
    if (matchMenuKeys.length > 0) {
      setOpenKeys(matchMenuKeys);
      setSelectedKeys(matchMenuKeys);
    }
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
      if (
        matchMenuKeys.length > 0 &&
        matchMenuKeys.join('-') !== (selectedKeys || []).join('-')
      ) {
        setSelectedKeys(matchMenuKeys);
      }
      if (
        !defaultOpenAll &&
        propsOpenKeys !== false &&
        matchMenuKeys.join('-') !== (openKeys || []).join('-')
      ) {
        let newKeys: (string | number)[] | false = matchMenuKeys;
        if (menu?.autoClose === false) {
          newKeys = Array.from(
            new Set([...matchMenuKeys, ...(openKeys || [])]),
          );
        }
        // 外链等 pathname 无法匹配菜单时，match 为空；autoClose=false 时应保留用户已展开项
        if (
          matchMenuKeys.length === 0 &&
          menu?.autoClose === false &&
          Array.isArray(openKeys) &&
          openKeys.length > 0
        ) {
          newKeys = [...openKeys];
        }
        if (
          Array.isArray(newKeys) &&
          newKeys.length === 0 &&
          matchMenuKeys.length === 0
        ) {
          // 路由无法匹配菜单时保留展开态（如 pathname 被写成外链）
        } else {
          setOpenKeys(newKeys);
        }
      } else if (menu?.ignoreFlatMenu && defaultOpenAll && !props.collapsed) {
        // 忽略用户手动折叠过的菜单状态，折叠按钮切换之后也可实现默认展开所有菜单
        // 但是如果用户手动点击关闭菜单，则应该遵循用户的选择
        setOpenKeys(getOpenKeysFromMenuData(menuData));
      } else {
        setDefaultOpenAll(false);
      }
    },
    // 依赖项加上 props.collapsed，保证折叠时能正确响应
    [matchMenuKeys.join('-'), props.collapsed],
  );

  const { wrapSSR, hashId } = useStyle(baseClassName, mode);

  const menuUtils = useMemo(() => {
    return new MenuUtil({
      ...props,
      token: designToken,
      menuRenderType,
      baseClassName,
      hashId,
    });
  }, [props, designToken, menuRenderType, baseClassName, hashId]);

  if (menu?.loading) {
    return (
      <div
        style={
          mode?.includes('inline')
            ? { padding: 24 }
            : {
                marginBlockStart: 16,
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
  if (props.openKeys === false && !props.onOpenChange) {
    defaultOpenKeysRef.current = matchMenuKeys;
  }

  const finallyData = props.postMenuData
    ? props.postMenuData(menuData)
    : menuData;

  if (finallyData && finallyData?.length < 1) {
    return null;
  }

  const { className: menuPropsClassName, style: menuPropsStyle, ...restMenuProps } =
    props.menuProps || {};

  const inlineOpenKeys =
    propsOpenKeys === false
      ? []
      : openKeys === false
        ? []
        : (openKeys || []).map((k) => String(k));

  return wrapSSR(
    <ProLayoutNavMenu
      key="ProLayoutNavMenu"
      baseClassName={baseClassName}
      hashId={hashId}
      mode={mode!}
      collapsed={props.collapsed}
      selectedKeys={(selectedKeys || []).map((k) => String(k))}
      openKeys={inlineOpenKeys}
      defaultOpenKeys={defaultOpenKeysRef.current.map((k) => String(k))}
      nodes={menuUtils.getNavMenuItems(finallyData, 0, 0)}
      onOpenChange={(_openKeys) => {
        if (!props.collapsed) {
          if (_openKeys.length === 0) {
            setDefaultOpenAll(false);
          }
          setOpenKeys(_openKeys);
        }
      }}
      onSelect={({ selectedKeys: sk }) => {
        setSelectedKeys(sk);
      }}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        ...style,
        ...menuPropsStyle,
      }}
      className={clsx(className, hashId, baseClassName, menuPropsClassName, {
        'ant-pro-sider-menu':
          mode !== 'horizontal' && props.menuRenderType !== 'header',
        [`${baseClassName}-horizontal`]: mode === 'horizontal',
        [`${baseClassName}--horizontal`]: mode === 'horizontal',
        [`${baseClassName}-collapsed`]: props.collapsed,
        [`${baseClassName}--collapsed`]: props.collapsed,
      })}
      {...restMenuProps}
    />,
  );
};

export { BaseMenu };
