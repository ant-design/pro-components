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
    setTimeout(() => {
      setCollapsed(props.collapsed);
    }, 400);
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

/** `MenuDataItem` → 叶子项 label 构建上下文（与 `getSubMenuOrItem` 共用） */
export type MenuNavBuildContext = BaseMenuProps &
  PrivateSiderMenuProps & {
    baseClassName: string;
    hashId: string;
    menuRenderType?: 'header' | 'sider';
  };

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

type GetIconFn = (
  icon: string | React.ReactNode,
  iconPrefixes: string | undefined,
  className: string,
) => React.ReactNode;

export function getMenuItemPath(
  ctx: MenuNavBuildContext,
  item: MenuDataItem,
  level: number,
  noGroupLevel: number,
  getIcon: GetIconFn,
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
    defaultItem = (
      <span
        key={itemPath}
        onClick={() => {
          window?.open?.(itemPath, '_blank');
        }}
        className={clsx(`${baseClassName}-item-title`, hashId, {
          [`${baseClassName}-item-title-collapsed`]: collapsed,
          [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]:
            collapsed,
          [`${baseClassName}-item-link`]: true,
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
