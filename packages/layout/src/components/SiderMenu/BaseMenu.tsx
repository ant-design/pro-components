import './index.less';
import Icon, { createFromIconfontCN } from '@ant-design/icons';
import { Menu, Skeleton, Divider, ConfigProvider } from 'antd';
import React, { useEffect, useState, useRef, useMemo, useContext } from 'react';
import { isUrl, isImg, useMountMergeState } from '@ant-design/pro-utils';

import type { MenuTheme, MenuProps } from 'antd';
import type { PureSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import { getOpenKeysFromMenuData } from '../../utils/utils';

import type { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from '../../typings';
import { MenuCounter } from './Counter';
import type { PrivateSiderMenuProps } from './SiderMenu';
import { css, cx } from '@emotion/css';

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
        onClick: () => void;
      },
      defaultDom: React.ReactNode,
      menuProps: BaseMenuProps,
    ) => React.ReactNode
  >;
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
} & Partial<RouterTypes<Route>> &
  Omit<MenuProps, 'openKeys' | 'onOpenChange' | 'title'> &
  Partial<PureSettings>;

const { SubMenu, ItemGroup } = Menu;

let IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

const MenuDivider: React.FC<{
  index?: number | string;
  prefixCls?: string;
}> = ({ prefixCls, index }) => (
  <div
    key={index}
    className={`${prefixCls}-menu-item-divider`}
    style={{
      padding: '16px 4px 4px 4px',
    }}
  >
    <Divider
      style={{
        margin: 0,
      }}
    />
  </div>
);

const genMenuItemCss = (prefixCls: string | undefined, hasIcon: boolean) =>
  `${prefixCls}-menu-item-title ${css`
    margin-left: ${hasIcon ? '8px' : '0'};
  `}`;

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
  constructor(props: BaseMenuProps) {
    this.props = props;
  }

  props: BaseMenuProps;

  getNavMenuItems = (menusData: MenuDataItem[] = [], level: number): React.ReactNode[] =>
    menusData.map((item) => this.getSubMenuOrItem(item, level)).filter((item) => item);

  /** Get SubMenu or Item */
  getSubMenuOrItem = (item: MenuDataItem, level: number): React.ReactNode => {
    if (Array.isArray(item.routes) && item && item.routes.length > 0) {
      const name = this.getIntlName(item);
      const { subMenuItemRender, prefixCls, menu, iconPrefixes, layout } = this.props;
      const isGroup = menu?.type === 'group' && layout !== 'top';
      /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
      const hasIcon = level === 0 || (isGroup && level === 1);
      //  get defaultTitle by menuItemRender
      const defaultTitle = item.icon ? (
        <span className={`${prefixCls}-menu-item`} title={name}>
          {hasIcon && getIcon(item.icon, iconPrefixes)}
          <span className={genMenuItemCss(prefixCls, hasIcon)}>{name}</span>
        </span>
      ) : (
        <span className={`${prefixCls}-menu-item`} title={name}>
          {name}
        </span>
      );

      /** 如果是 Group 是不需要展示 icon 的 */
      const subMenuTitle =
        isGroup && level === 0 ? (
          <span className={`${prefixCls}-menu-item`} title={name}>
            {name}
          </span>
        ) : (
          defaultTitle
        );
      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle)
        : subMenuTitle;
      const MenuComponents: React.ElementType = isGroup && level === 0 ? ItemGroup : SubMenu;
      return [
        <MenuComponents
          key={item.key || item.path}
          title={title}
          {...(isGroup
            ? {}
            : {
                onTitleClick: item.onTitleClick,
              })}
        >
          {this.getNavMenuItems(item.routes, level + 1)}
        </MenuComponents>,
        isGroup && level === 0 ? (
          <MenuDivider prefixCls={prefixCls} index={item.key || item.path} />
        ) : (
          false
        ),
      ];
    }

    return (
      <Menu.Item disabled={item.disabled} key={item.key || item.path} onClick={item.onTitleClick}>
        {this.getMenuItemPath(item, level)}
      </Menu.Item>
    );
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
      <span className={`${prefixCls}-menu-item`}>
        {icon}
        <span className={genMenuItemCss(prefixCls, hasIcon)}>{name}</span>
      </span>
    );
    const isHttpUrl = isUrl(itemPath);

    // Is it a http link
    if (isHttpUrl) {
      defaultItem = (
        <span
          title={name}
          onClick={() => {
            window?.open?.(itemPath);
          }}
          className={`${prefixCls}-menu-item ${prefixCls}-menu-item-link`}
        >
          {icon}
          <span className={genMenuItemCss(prefixCls, hasIcon)}>{name}</span>
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
    menu,
    matchMenuKeys,
    iconfontUrl,
    collapsed,
    selectedKeys: propsSelectedKeys,
    onSelect,
    openKeys: propsOpenKeys,
  } = props;

  const context = useContext(ConfigProvider.ConfigContext);

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

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-'), collapsed]);

  const openKeysProps = useMemo(
    () => getOpenKeysProps(openKeys, props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openKeys && openKeys.join(','), props.layout, props.collapsed],
  );

  const [menuUtils] = useState(() => new MenuUtil(props));

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

  // sync props
  menuUtils.props = props;

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

  const antPrefixClassName = context.getPrefixCls();

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
        css`
          padding: 6px;
          background: transparent;
          // 关掉动画避免性能问题
          * {
            transition: none !important;
          }
          > * {
            padding: 8px;
          }
          .${antPrefixClassName}-menu-root {
            padding: 6px;
          }

          .${antPrefixClassName}-menu-sub {
            background: transparent;
          }

          .${antPrefixClassName}-pro-menu-item-divider {
            &:last-child {
              display: none;
            }
          }
          .${antPrefixClassName}-menu-item-group-title {
            color: rgba(0, 0, 0, 0.45);
            font-size: 12px;
            line-height: 20px;
          }
        `,
        mode === 'horizontal' &&
          css`
            li.${antPrefixClassName}-menu-item {
              height: 100%;
              line-height: 1;
            }
          `,
      )}
      _internalRenderSubMenuItem={(dom, menuItemProps) => {
        return React.cloneElement(dom, {
          ...dom.props,
          ...menuItemProps,
          className: cx(
            css`
              border-radius: 2px;
              min-height: 40px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              cursor: pointer;
            `,
          ),
        });
      }}
      _internalRenderMenuItem={(dom, menuItemProps) => {
        return React.cloneElement(dom, {
          ...dom.props,
          ...menuItemProps,
          className: css`
            border-radius: 2px;
            min-height: 40px;
            width: 100%;
            display: flex;
            align-items: center;
            transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            cursor: pointer;
            a {
              color: rgba(0, 0, 0, 0.65);
              font-size: 14px;
              line-height: 22px;
            }
            &:hover {
              background-color: rgba(0, 0, 0, 0.05);
              border-radius: 4px;
            }
          `,
        });
      }}
      onOpenChange={setOpenKeys}
      _internalDisableMenuItemTitleTooltip={true}
      {...props.menuProps}
    >
      {menuUtils.getNavMenuItems(finallyData, 0)}
    </Menu>
  );
};

BaseMenu.defaultProps = {
  postMenuData: (data) => data || [],
};

export { BaseMenu };
