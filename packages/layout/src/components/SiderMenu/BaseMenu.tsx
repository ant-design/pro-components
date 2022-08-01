import Icon, { createFromIconfontCN } from '@ant-design/icons';
import { isImg, isUrl, useMountMergeState } from '@ant-design/pro-utils';
import type { MenuProps, MenuTheme } from 'antd';
import { ConfigProvider, Menu, Skeleton } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import type { PureSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import { css, cx } from '../../emotion';
import type { LayoutDesignToken } from '../../ProLayoutContext';
import { ProLayoutContext } from '../../ProLayoutContext';
import type { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from '../../typings';
import { getOpenKeysFromMenuData } from '../../utils/utils';
import { MenuCounter } from './Counter';
import type { PrivateSiderMenuProps } from './SiderMenu';

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

const genMenuItemCss = (
  prefixCls: string | undefined,
  state: {
    hasIcon?: boolean;
    collapsed?: boolean;
    collapsedShowTitle?: boolean;
  },
) => {
  if (state.hasIcon && state.collapsed) {
    return cx(
      `${prefixCls}-menu-item-title`,
      !state.collapsedShowTitle &&
        css`
          display: none;
        `,
      state.collapsedShowTitle &&
        css`
          text-align: center;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        `,
    );
  }
  return cx(
    `${prefixCls}-menu-item-title`,
    state.hasIcon &&
      css`
        margin-left: 8px;
      `,
  );
};

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
    props: BaseMenuProps & { token?: LayoutDesignToken; menuRenderType?: 'header' | 'sider' },
  ) {
    this.props = props;
  }

  props: BaseMenuProps & { token?: LayoutDesignToken; menuRenderType?: 'header' | 'sider' };

  getNavMenuItems = (menusData: MenuDataItem[] = [], level: number): ItemType[] =>
    menusData
      .map((item) => this.getSubMenuOrItem(item, level))
      .filter((item) => item)
      .flat(1);

  /** Get SubMenu or Item */
  getSubMenuOrItem = (item: MenuDataItem, level: number): ItemType | ItemType[] => {
    const { subMenuItemRender, prefixCls, menu, iconPrefixes, layout } = this.props;
    const isGroup = menu?.type === 'group' && layout !== 'top';
    const designToken = this.props.token;
    const genItemCss = (center?: boolean) =>
      cx(
        `${prefixCls}-menu-item`,
        css`
          display: flex;
          align-items: center;
          justify-content: ${center ? 'center' : 'flex-start'};
        `,
      );
    const name = this.getIntlName(item);
    const children = item?.children || item?.routes;
    if (Array.isArray(children) && children.length > 0) {
      /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
      const hasIcon = level === 0 || (isGroup && level === 1);
      //  get defaultTitle by menuItemRender
      const iconDom = getIcon(item.icon, iconPrefixes);
      const defaultTitle = item.icon ? (
        <span className={genItemCss()} title={name}>
          {hasIcon && iconDom}
          <span
            className={genMenuItemCss(prefixCls, {
              hasIcon: hasIcon && !!iconDom,
              collapsed: this.props.collapsed,
              collapsedShowTitle: this.props.menu?.collapsedShowTitle,
            })}
          >
            {name}
          </span>
        </span>
      ) : (
        <span className={genItemCss()} title={name}>
          {name}
        </span>
      );

      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle, this.props)
        : defaultTitle;

      const childrenList = this.getNavMenuItems(children, level + 1);
      if (isGroup && level === 0 && this.props.collapsed && !menu.collapsedShowGroupTitle) {
        return childrenList;
      }
      return [
        {
          type: isGroup && level === 0 ? ('group' as const) : undefined,
          key: item.key! || item.path!,
          title: item.tooltip || title,
          label: title,
          onClick: isGroup ? undefined : item.onTitleClick,
          children: childrenList,
        } as ItemType,
        isGroup && level === 0
          ? ({
              type: 'divider',
              prefixCls,
              key: (item.key! || item.path!) + '-group',
              style: {
                padding: 0,
                margin: this.props.collapsed ? '4px' : '12px 16px',
                borderColor: designToken?.sider?.menuItemDividerColor,
              },
            } as ItemType)
          : undefined,
      ].filter(Boolean) as ItemType[];
    }

    return {
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
      collapsed,
    } = this.props;

    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    const { prefixCls, menu } = this.props;
    const isGroup = menu?.type === 'group';
    /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
    const hasIcon = level === 0 || (isGroup && level === 1);
    const icon = !hasIcon ? null : getIcon(item.icon, iconPrefixes);
    let defaultItem = (
      <span
        className={cx(
          `${prefixCls}-menu-item`,
          css({
            display: 'flex',
            alignItems: 'center',
          }),
        )}
      >
        {icon}
        <span
          className={genMenuItemCss(prefixCls, {
            hasIcon: !!icon && hasIcon,
            collapsed,
            collapsedShowTitle: this.props.menu?.collapsedShowTitle,
          })}
        >
          {name}
        </span>
      </span>
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
          <span
            className={genMenuItemCss(prefixCls, {
              hasIcon: hasIcon && !!icon,
              collapsed: this.props.collapsed,
              collapsedShowTitle: this.props.menu?.collapsedShowTitle,
            })}
          >
            {name}
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
    prefixCls,
    handleOpenChange,
    style,
    menuData,
    menu,
    matchMenuKeys,
    iconfontUrl,
    collapsed,
    selectedKeys: propsSelectedKeys,
    onSelect,
    menuRenderType,
    openKeys: propsOpenKeys,
  } = props;

  const designToken = useContext(ProLayoutContext);
  const menuDesignToken = menuRenderType === 'header' ? designToken.header : designToken.sider;
  const context = useContext(ConfigProvider.ConfigContext);

  const antPrefixClassName = context.getPrefixCls();

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
    });
  }, [designToken, menuRenderType, props]);

  const menuItemCssMap = useMemo(() => {
    const itemHoverColor = !collapsed
      ? menuDesignToken.menuItemHoverBgColor
      : menuDesignToken.menuItemCollapsedHoverBgColor;

    // 顶部 选中之后要有背景色，文件颜色也要变深
    const itemSelectedColor = !collapsed
      ? menuDesignToken.menuItemSelectedBgColor
      : menuDesignToken.menuItemCollapsedSelectedBgColor;

    return {
      menuItem: css`
        border-radius: ${designToken.borderRadiusBase};
        min-height: 40px;
        display: flex;
        align-items: center;
        transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        cursor: pointer;
        line-height: 40px;

        .${antPrefixClassName}-menu-title-content {
          display: flex;
          width: 100%;
          height: 100%;
          color: ${menuDesignToken.menuTextColor};
          font-size: 14px;
          line-height: 40px;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

          > * {
            width: 100%;
            height: 100%;
            color: ${menuDesignToken.menuTextColor};
            .anticon {
              color: ${menuDesignToken.menuTextColor};
              opacity: 0.69;
            }
          }
        }
      `,
      collapsedItemShowTitle: css`
        margin-top: 12px;
        margin-bottom: 12px;
        .${prefixCls}-menu-item {
          padding-top: 6px;
          padding-bottom: 6px;
        }
      `,
      collapsedItem: css`
        .${antPrefixClassName}-menu-title-content {
          ${mode !== 'horizontal' ? 'width: 100%; line-height: 40px;' : ''}
        }
        .${prefixCls}-menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding-top: 6px;
          padding-bottom: 6px;
          color: ${menuDesignToken.menuTextColor};
          font-size: 16px;
        }
      `,
      horizontalMenuItem: css`
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .${prefixCls}-menu-item {
          padding: ${menuDesignToken.horizontalMenuItemPadding};
        }
        .${prefixCls}-title-content:hover {
          background-color: ${itemHoverColor};
          border-radius: ${designToken.borderRadiusBase};
        }
        &:hover {
          background-color: ${itemHoverColor};
          border-radius: ${designToken.borderRadiusBase};
          > * {
            color: ${menuDesignToken.menuSelectedTextColor};
            .anticon {
              color: ${menuDesignToken.menuSelectedTextColor};
            }
            > * {
              color: ${menuDesignToken.menuSelectedTextColor};
            }
          }
        }
      `,
      /**
       * 水平的 menuItem 需要一个hover
       */
      verticalMenuItem: css`
        &:hover {
          > * {
            color: ${menuDesignToken.menuSelectedTextColor};
            .anticon {
              color: ${menuDesignToken.menuSelectedTextColor};
            }
            > * {
              color: ${menuDesignToken.menuSelectedTextColor};
            }
          }
        }
      `,
      selectedMenuItem: css`
        background-color: ${itemSelectedColor};
        border-radius: ${designToken.borderRadiusBase};
        .${antPrefixClassName}-menu-title-content {
          > * {
            color: ${menuDesignToken.menuSelectedTextColor};
            .anticon {
              color: ${menuDesignToken.menuSelectedTextColor};
            }
          }
        }
      `,
      // subMenuItem Style
      subMenuItem: css`
        border-radius: ${designToken.borderRadiusBase};
        min-height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        cursor: pointer;
        color: ${menuDesignToken.menuTextColor};

        .${antPrefixClassName}-menu-submenu-title {
          width: 100%;
          margin-top: 0;
          margin-bottom: 0;
          line-height: 40px;
          .anticon {
            color: ${menuDesignToken.menuTextColor};
            opacity: 0.69;
          }
        }
        .${antPrefixClassName}-menu-submenu-arrow {
          color: ${menuDesignToken.menuTextColor};
          transform: rotate(1.25turn);
          transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      `,
      selectedSubMenuItem: css`
        .${antPrefixClassName}-menu-submenu-title {
          > * {
            color: ${menuDesignToken.subMenuSelectedTextColor};
            .anticon {
              color: ${menuDesignToken.subMenuSelectedTextColor};
            }
          }
        }
      `,
      collapsedSubMenuItem: css`
        .${antPrefixClassName}-menu-submenu-title{
          padding: 0 !important;
          width: 100%;
        }
        .${antPrefixClassName}-menu-title-content {
          ${mode !== 'horizontal' ? 'width: 100%;' : ''}
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .${antPrefixClassName}-menu-submenu-title .anticon {
          font-size: 16px;
        }
        .${antPrefixClassName}-menu-submenu-arrow {
          display: none;
        }
      `,
      collapsedSelectSubMenuItem: css`
        background-color: ${itemSelectedColor};
        border-radius: ${designToken.borderRadiusBase};
      `,
      openItem: css`
        .${antPrefixClassName}-menu-submenu-arrow {
          transform: rotate(0.75turn);
        }
      `,
      verticalSubItem: css`
        .${antPrefixClassName}-menu-submenu-title:hover {
          color: ${menuDesignToken.menuTextColor};
          background-color: ${itemHoverColor};
          border-radius: ${designToken.borderRadiusBase};
        }
      `,
      horizontalSubMenuItem: css`
        .${antPrefixClassName}-menu-submenu-title{
          min-height: 43px;
          display: flex;
          align-items: center;
        }
        .${antPrefixClassName}-menu-submenu-title:hover {
          color:${designToken.colorText};
          background-color: ${itemHoverColor};
          border-radius: ${designToken.borderRadiusBase};
        }
        .${antPrefixClassName}-menu-submenu-arrow {
          display: none;
        }
      `,
    };
  }, [
    antPrefixClassName,
    collapsed,
    designToken.borderRadiusBase,
    designToken.colorText,
    menuDesignToken.horizontalMenuItemPadding,
    menuDesignToken.menuItemCollapsedHoverBgColor,
    menuDesignToken.menuItemCollapsedSelectedBgColor,
    menuDesignToken.menuItemHoverBgColor,
    menuDesignToken.menuItemSelectedBgColor,
    menuDesignToken.menuSelectedTextColor,
    menuDesignToken.menuTextColor,
    menuDesignToken.subMenuSelectedTextColor,
    mode,
    prefixCls,
  ]);

  const menuCss = useMemo(() => {
    return css`
    padding: ${props.isMobile ? 0 : '6px'};
    background: transparent;
    border:none !important;

    // 关掉动画避免性能问题
    * > div {
      transition: none !important;
    }

    .${antPrefixClassName}-menu-title-content{
      width: 100%;
    }

    &.${antPrefixClassName}-layout-sider-collapsed {
      flex-direction: column;
      padding-bottom: 24px;
    }

    .${antPrefixClassName}-menu-root {
      padding: 8px;
    }

    .${antPrefixClassName}-menu-sub {
      background: transparent;
    }

    .${prefixCls}-menu-item-divider {
      &:last-child {
        display: none;
      }
    }
    .${antPrefixClassName}-menu-item-group-title {
      color: ${menuDesignToken.menuTextColorSecondary};
      font-size: 12px;
      line-height: 20px;
    }
  `;
  }, [antPrefixClassName, menuDesignToken.menuTextColorSecondary, prefixCls, props.isMobile]);

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

  return (
    <Menu
      {...openKeysProps}
      key="Menu"
      mode={mode}
      inlineIndent={16}
      defaultOpenKeys={defaultOpenKeysRef.current}
      theme="light"
      selectedKeys={selectedKeys}
      style={style}
      className={cx(
        className,
        menuCss,
        mode === 'horizontal' &&
          css`
            li.${antPrefixClassName}-menu-item {
              height: 100%;
              line-height: 1;
            }
          `,
      )}
      _internalRenderSubMenuItem={(dom, _, stateProps) => {
        return React.cloneElement(dom, {
          ...dom.props,
          className: cx(
            `${prefixCls}-menu-submenu`,
            stateProps?.selected && `${prefixCls}-menu-submenu-selected`,
            stateProps?.open && `${prefixCls}-menu-submenu-open`,
            menuItemCssMap.subMenuItem,
            // 收起的样式
            collapsed && menuItemCssMap.collapsedSubMenuItem,
            // 顶部菜单和水平菜单需要不同的 css
            mode !== 'horizontal'
              ? menuItemCssMap.verticalSubItem
              : menuItemCssMap.horizontalSubMenuItem,
            stateProps?.selected ? menuItemCssMap.selectedSubMenuItem : null,
            stateProps?.open ? menuItemCssMap.openItem : null,
            collapsed && stateProps?.selected ? menuItemCssMap.collapsedSelectSubMenuItem : null,
          ),
        });
      }}
      items={menuUtils.getNavMenuItems(finallyData, 0)}
      _internalRenderMenuItem={(dom, itemProps, stateProps) => {
        return React.cloneElement(dom, {
          ...dom.props,
          className: cx(
            `${prefixCls}-menu-item`,
            stateProps?.selected && `${prefixCls}-menu-item-selected`,
            // 展开的样式
            menuItemCssMap.menuItem,
            // 收起的样式
            collapsed && menuItemCssMap.collapsedItem,
            /**
             * 收起时展示 title
             */
            collapsed && menu?.collapsedShowTitle && menuItemCssMap.collapsedItemShowTitle,
            // 顶部菜单和水平菜单需要不同的 css
            mode !== 'horizontal'
              ? menuItemCssMap.verticalMenuItem
              : menuItemCssMap.horizontalMenuItem,
            stateProps?.selected ? menuItemCssMap.selectedMenuItem : null,
          ),
        });
      }}
      onOpenChange={setOpenKeys}
      {...props.menuProps}
    />
  );
};

export { BaseMenu };
