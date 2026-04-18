import { Tooltip } from 'antd';
import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';
import { isUrl } from '../../../utils';
import type { PureSettings } from '../../defaultSettings';
import type {
  MenuDataItem,
  MessageDescriptor,
  RouterTypes,
  WithFalse,
} from '../../typing';
import type { PrivateSiderMenuProps } from './SiderMenu';
import type { NavMenuNode } from './navMenuTypes';
import type {
  MenuMode,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuSelectInfo,
} from './types';

/** @internal MenuUtil / BaseMenu 共用 */
export type BaseMenuNavBuildProps = BaseMenuProps & {
  menuRenderType?: 'header' | 'sider';
  baseClassName: string;
  hashId: string;
};

export type BaseMenuProps = {
  prefixCls?: string;
  selectedKeys?: string[];
  onSelect?: (info: ProLayoutNavMenuSelectInfo) => void;
  className?: string;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  splitMenus?: boolean;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  onOpenChange?: (openKeys: string[]) => void;
  iconPrefixes?: string;
  menuProps?: ProLayoutNavMenuDomProps;
  style?: React.CSSProperties;
  formatMessage?: (message: MessageDescriptor) => string;

  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
      menuConfig: BaseMenuProps,
    ) => React.ReactNode
  >;

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

  menuTextRender?: WithFalse<
    (
      item: MenuDataItem,
      defaultText: React.ReactNode,
      menuConfig: BaseMenuProps,
    ) => React.ReactNode
  >;

  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
} & Partial<RouterTypes> &
  Partial<PureSettings>;

export type MenuNavGetIconFn = (
  icon: string | React.ReactNode,
  iconPrefixes: string | undefined,
  className: string,
) => React.ReactNode;

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
    const timer = window.setTimeout(() => {
      setCollapsed(props.collapsed);
    }, 400);
    return () => window.clearTimeout(timer);
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

const getMenuTitleSymbol = (title: React.ReactNode) => {
  if (title && typeof title === 'string') {
    return title.substring(0, 1).toUpperCase();
  }
  return null;
};

export class MenuUtil {
  props: BaseMenuNavBuildProps & { getIcon: MenuNavGetIconFn };

  constructor(
    props: BaseMenuNavBuildProps & { getIcon: MenuNavGetIconFn },
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
      getIcon,
    } = this.props;
    const isGroup = menu?.type === 'group' && layout !== 'top';
    const name = this.getIntlName(item);
    const children = item?.children;

    const menuType = isGroup && level === 0 ? ('group' as const) : undefined;

    if (Array.isArray(children) && children.length > 0) {
      const shouldHasIcon = level === 0 || (isGroup && level === 1);

      const iconDom = getIcon(
        item.icon,
        iconPrefixes,
        `${baseClassName}-icon ${this.props?.hashId}`,
      );
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

      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle, this.props)
        : defaultTitle;

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
                borderColor: 'var(--pro-layout-nav-color-divider)',
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
      getIcon,
    } = this.props;

    const menuItemTitle = this.getIntlName(item);
    const { baseClassName, menu, collapsed } = this.props;
    const isGroup = menu?.type === 'group';
    const hasIcon = level === 0 || (isGroup && level === 1);
    const icon = !hasIcon
      ? null
      : getIcon(
          item.icon,
          iconPrefixes,
          `${baseClassName}-icon ${this.props?.hashId}`,
        );

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
          {icon || <span>{defaultIcon}</span>}
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
            {icon || <span>{defaultIcon}</span>}
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
