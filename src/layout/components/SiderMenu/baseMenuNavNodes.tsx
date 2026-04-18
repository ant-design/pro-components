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

/** 构建菜单树时的上下文（BaseMenu 注入 hashId、getIcon 等） */
export type MenuNavBuildContext = BaseMenuProps & {
  menuRenderType?: 'header' | 'sider';
  baseClassName: string;
  hashId: string;
  getIcon: MenuNavGetIconFn;
};

export type MenuNavGetIconFn = (
  icon: string | React.ReactNode,
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

function conversionPath(path: string) {
  if (path && path.indexOf('http') === 0) {
    return path;
  }
  return `/${path || ''}`.replace(/\/+/g, '/');
}

function getIntlName(ctx: MenuNavBuildContext, item: MenuDataItem) {
  const { name, locale } = item;
  const { menu, formatMessage } = ctx;
  let finalName = name;
  if (locale && menu?.locale !== false) {
    finalName = formatMessage?.({
      id: locale,
      defaultMessage: name,
    });
  }
  if (ctx.menuTextRender) {
    return ctx.menuTextRender(item, finalName, ctx);
  }
  return finalName;
}

function getMenuItemPath(
  ctx: MenuNavBuildContext,
  item: MenuDataItem,
  level: number,
  noGroupLevel: number,
) {
  const itemPath = conversionPath(item.path || '/');
  const {
    location = { pathname: '/' },
    isMobile,
    onCollapse,
    menuItemRender,
    baseClassName,
    menu,
    collapsed,
    getIcon,
  } = ctx;

  const menuItemTitle = getIntlName(ctx, item);
  const isGroup = menu?.type === 'group';
  const hasIcon = level === 0 || (isGroup && level === 1);
  const icon = !hasIcon
    ? null
    : getIcon(item.icon, `${baseClassName}-icon ${ctx.hashId}`);

  const defaultIcon =
    collapsed && hasIcon ? getMenuTitleSymbol(menuItemTitle) : null;

  let defaultItem = (
    <div
      key={itemPath}
      className={clsx(`${baseClassName}-item-title`, ctx.hashId, {
        [`${baseClassName}-item-title-collapsed`]: collapsed,
        [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
          collapsed,
        [`${baseClassName}-item-collapsed-show-title`]:
          menu?.collapsedShowTitle && collapsed,
      })}
    >
      <span
        className={clsx(`${baseClassName}-item-icon`, ctx.hashId)}
        style={{
          display: defaultIcon === null && !icon ? 'none' : '',
        }}
      >
        {icon || <span>{defaultIcon}</span>}
      </span>
      <span
        className={clsx(`${baseClassName}-item-text`, ctx.hashId, {
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
        className={clsx(`${baseClassName}-item-title`, ctx.hashId, {
          [`${baseClassName}-item-title-collapsed`]: collapsed,
          [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
            collapsed,
          [`${baseClassName}-item-link`]: true,
          [`${baseClassName}-item-collapsed-show-title`]:
            menu?.collapsedShowTitle && collapsed,
        })}
      >
        <span
          className={clsx(`${baseClassName}-item-icon`, ctx.hashId)}
          style={{
            display: defaultIcon === null && !icon ? 'none' : '',
          }}
        >
          {icon || <span>{defaultIcon}</span>}
        </span>
        <span
          className={clsx(`${baseClassName}-item-text`, ctx.hashId, {
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
        {menuItemRender(renderItemProps, defaultItem, ctx)}
      </MenuItemTooltip>
    ) : (
      menuItemRender(renderItemProps, defaultItem, ctx)
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
}

function getSubMenuOrItem(
  ctx: MenuNavBuildContext,
  item: MenuDataItem,
  level: number,
  noGroupLevel: number,
): NavMenuNode | NavMenuNode[] {
  const { subMenuItemRender, baseClassName, collapsed, menu, layout, getIcon } =
    ctx;
  const isGroup = menu?.type === 'group' && layout !== 'top';
  const name = getIntlName(ctx, item);
  const children = item?.children;

  const menuType = isGroup && level === 0 ? ('group' as const) : undefined;

  if (Array.isArray(children) && children.length > 0) {
    const shouldHasIcon = level === 0 || (isGroup && level === 1);

    const iconDom = getIcon(
      item.icon,
      `${baseClassName}-icon ${ctx.hashId}`,
    );
    const defaultIcon =
      collapsed && shouldHasIcon ? getMenuTitleSymbol(name) : null;

    const defaultTitle = (
      <div
        className={clsx(`${baseClassName}-item-title`, ctx.hashId, {
          [`${baseClassName}-item-title-collapsed`]: collapsed,
          [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
            collapsed,
          [`${baseClassName}-group-item-title`]: menuType === 'group',
          [`${baseClassName}-item-collapsed-show-title`]:
            menu?.collapsedShowTitle && collapsed,
        })}
      >
        {menuType === 'group' && collapsed ? null : shouldHasIcon && iconDom ? (
          <span
            className={clsx(`${baseClassName}-item-icon`, ctx.hashId)}
          >
            {iconDom}
          </span>
        ) : (
          defaultIcon
        )}
        <span
          className={clsx(`${baseClassName}-item-text`, ctx.hashId, {
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
      ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle, ctx)
      : defaultTitle;

    const childrenList =
      /* getMenuNavNodes 与 getSubMenuOrItem 互为递归 */
      // eslint-disable-next-line @typescript-eslint/no-use-before-define -- 二者定义顺序不可同时满足 hoist
      getMenuNavNodes(
        ctx,
        children,
        level + 1,
        isGroup && level === 0 && ctx.collapsed ? level : level + 1,
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
              [`${baseClassName}-submenu-has-icon`]: shouldHasIcon && iconDom,
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
              margin: ctx.collapsed ? '4px' : '6px 16px',
              marginBlockStart: ctx.collapsed ? 4 : 8,
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
    label: getMenuItemPath(ctx, item, level, noGroupLevel),
  };
}

function getMenuNavNodes(
  ctx: MenuNavBuildContext,
  menusData: MenuDataItem[] = [],
  level = 0,
  noGroupLevel = 0,
): NavMenuNode[] {
  return menusData
    .map((item) => getSubMenuOrItem(ctx, item, level, noGroupLevel))
    .filter(Boolean)
    .flat(1) as NavMenuNode[];
}

/** 将 `menuData` 转为 `ProLayoutNavMenu` 的 `nodes`（入口使用 `level=0`，内部递归） */
export { getMenuNavNodes };
