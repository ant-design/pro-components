import { Tooltip } from 'antd';
import { clsx } from 'clsx';
import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { isUrl } from '../../../utils';
import type { MenuDataItem, MessageDescriptor } from '../../typing';
import type { BaseMenuProps } from './BaseMenu';
import type { NavMenuNode } from './navMenuTypes';
import type { PrivateSiderMenuProps } from './SiderMenu';

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

  if (!props.collapsed) {
    return <>{props.children}</>;
  }

  const simpleTitle =
    typeof props.title === 'string' || typeof props.title === 'number';

  if (simpleTitle && isValidElement(props.children)) {
    const t = String(props.title);
    return cloneElement(props.children, {
      title: t,
      'aria-label': t,
    } as React.HTMLAttributes<HTMLElement>);
  }

  if (simpleTitle) {
    return (
      <span
        data-pro-layout-menu-item-title-wrap
        title={String(props.title)}
        aria-label={String(props.title)}
      >
        {props.children}
      </span>
    );
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

/** `MenuDataItem` → `NavMenuNode[]` 构建上下文 */
export type MenuNavBuildContext = BaseMenuProps &
  PrivateSiderMenuProps & {
    baseClassName: string;
    hashId: string;
    menuRenderType?: 'header' | 'sider';
  };

export type MenuNavGetIconFn = (
  icon: string | React.ReactNode,
  iconPrefixes: string | undefined,
  className: string,
) => React.ReactNode;

export function conversionMenuPath(path: string) {
  if (path && path.indexOf('http') === 0) {
    return path;
  }
  return `/${path || ''}`.replace(/\/+/g, '/');
}

export function getIntlMenuName(ctx: MenuNavBuildContext, item: MenuDataItem) {
  const { name, locale } = item;
  const { menu, formatMessage } = ctx;
  let finalName = name;
  if (locale && menu?.locale !== false) {
    finalName = formatMessage?.({
      id: locale,
      defaultMessage: name,
    } as MessageDescriptor);
  }
  if (ctx.menuTextRender) {
    return ctx.menuTextRender(item, finalName, ctx);
  }
  return finalName;
}

export function getMenuTitleSymbol(title: React.ReactNode) {
  if (title && typeof title === 'string') {
    return title.substring(0, 1).toUpperCase();
  }
  return null;
}

function getSubmenuAriaLabel(ctx: MenuNavBuildContext, item: MenuDataItem) {
  const text = getIntlMenuName(ctx, item);
  if (typeof text === 'string' || typeof text === 'number') {
    const s = String(text).trim();
    if (s) return s;
  }
  const fallback = item.name ?? item.path ?? item.key;
  if (typeof fallback === 'string' && fallback.trim()) return fallback.trim();
  return String(item.key ?? '');
}

export function getMenuItemPath(
  ctx: MenuNavBuildContext,
  item: MenuDataItem,
  level: number,
  noGroupLevel: number,
  getIcon: MenuNavGetIconFn,
) {
  const itemPath = conversionMenuPath(item.path || '/');
  const {
    location = { pathname: '/' },
    isMobile,
    onCollapse,
    menuItemRender,
    iconPrefixes,
    baseClassName,
    menu,
    collapsed,
    hashId,
  } = ctx;

  const menuItemTitle = getIntlMenuName(ctx, item);
  const isGroup = menu?.type === 'group';
  const hasIcon = level === 0 || (isGroup && level === 1);
  const icon = !hasIcon
    ? null
    : getIcon(item.icon, iconPrefixes, `${baseClassName}-icon ${hashId}`);

  const defaultIcon =
    collapsed && hasIcon ? getMenuTitleSymbol(menuItemTitle) : null;

  let defaultItem = (
    <div
      key={itemPath}
      className={clsx(`${baseClassName}-item-title`, hashId, {
        [`${baseClassName}-item-title-collapsed`]: collapsed,
        [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
          collapsed,
        [`${baseClassName}-item-collapsed-show-title`]:
          menu?.collapsedShowTitle && collapsed,
      })}
    >
      <span
        className={clsx(`${baseClassName}-item-icon`, hashId)}
        style={{
          display: defaultIcon === null && !icon ? 'none' : '',
        }}
      >
        {icon || <span>{defaultIcon}</span>}
      </span>
      <span
        className={clsx(`${baseClassName}-item-text`, hashId, {
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
    const linkLabel =
      typeof menuItemTitle === 'string' || typeof menuItemTitle === 'number'
        ? String(menuItemTitle)
        : String(item.name ?? item.path ?? 'link');
    defaultItem = (
      <a
        key={itemPath}
        href={itemPath}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(`${baseClassName}-item-title`, hashId, {
          [`${baseClassName}-item-title-collapsed`]: collapsed,
          [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
            collapsed,
          [`${baseClassName}-item-link`]: true,
          [`${baseClassName}-item-collapsed-show-title`]:
            menu?.collapsedShowTitle && collapsed,
        })}
        aria-label={linkLabel}
      >
        <span
          className={clsx(`${baseClassName}-item-icon`, hashId)}
          style={{
            display: defaultIcon === null && !icon ? 'none' : '',
          }}
        >
          {icon || <span>{defaultIcon}</span>}
        </span>
        <span
          className={clsx(`${baseClassName}-item-text`, hashId, {
            [`${baseClassName}-item-text-has-icon`]:
              hasIcon && (icon || defaultIcon),
          })}
        >
          {menuItemTitle}
        </span>
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

export function getSubMenuOrItem(
  ctx: MenuNavBuildContext,
  item: MenuDataItem,
  level: number,
  noGroupLevel: number,
  getIcon: MenuNavGetIconFn,
): NavMenuNode | NavMenuNode[] {
  const {
    subMenuItemRender,
    baseClassName,
    collapsed,
    menu,
    iconPrefixes,
    layout,
    hashId,
  } = ctx;
  const isGroup = menu?.type === 'group' && layout !== 'top';
  const name = getIntlMenuName(ctx, item);
  const children = item?.children;

  const menuType = isGroup && level === 0 ? ('group' as const) : undefined;

  if (Array.isArray(children) && children.length > 0) {
    const shouldHasIcon = level === 0 || (isGroup && level === 1);

    const iconDom = getIcon(
      item.icon,
      iconPrefixes,
      `${baseClassName}-icon ${hashId}`,
    );
    const defaultIcon =
      collapsed && shouldHasIcon ? getMenuTitleSymbol(name) : null;

    const defaultTitle = (
      <div
        className={clsx(`${baseClassName}-item-title`, hashId, {
          [`${baseClassName}-item-title-collapsed`]: collapsed,
          [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
            collapsed,
          [`${baseClassName}-group-item-title`]: menuType === 'group',
          [`${baseClassName}-item-collapsed-show-title`]:
            menu?.collapsedShowTitle && collapsed,
        })}
      >
        {menuType === 'group' && collapsed ? null : shouldHasIcon && iconDom ? (
          <span className={clsx(`${baseClassName}-item-icon`, hashId)}>
            {iconDom}
          </span>
        ) : (
          defaultIcon
        )}
        <span
          className={clsx(`${baseClassName}-item-text`, hashId, {
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

    const nextNoGroupLevel =
      isGroup && level === 0 && ctx.collapsed ? level : level + 1;
    const childrenList = children
      .map((child) =>
        getSubMenuOrItem(ctx, child, level + 1, nextNoGroupLevel, getIcon),
      )
      .filter(Boolean)
      .flat(1) as NavMenuNode[];

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
            ariaLabel: getSubmenuAriaLabel(ctx, item),
            onTitleClick: (e) => item.onTitleClick?.(e),
            children: childrenList,
            hasIcon: !!(shouldHasIcon && iconDom),
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
    label: getMenuItemPath(ctx, item, level, noGroupLevel, getIcon),
  };
}
