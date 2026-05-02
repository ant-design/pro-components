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

/** BaseMenu 注入类名与 `renderIcon` 后的上下文，用于生成 `NavMenuNode` 树 */
export type BaseMenuTreeContext = BaseMenuProps & {
  menuRenderType?: 'header' | 'sider';
  baseClassName: string;
  hashId: string;
  renderIcon: BaseMenuIconRenderer;
};

export type BaseMenuIconRenderer = (
  icon: string | React.ReactNode,
  iconClassName: string,
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

/** 收起且无图标时用标题首字母占位 */
function collapsedTitleLetter(title: React.ReactNode) {
  if (title && typeof title === 'string') {
    return title.substring(0, 1).toUpperCase();
  }
  return null;
}

function normalizeMenuPath(path: string) {
  if (path && path.indexOf('http') === 0) {
    return path;
  }
  return `/${path || ''}`.replace(/\/+/g, '/');
}

function resolveMenuItemTitle(ctx: BaseMenuTreeContext, item: MenuDataItem) {
  const { name, locale } = item;
  const { menu, formatMessage } = ctx;
  let text = name;
  if (locale && menu?.locale !== false) {
    text = formatMessage?.({
      id: locale,
      defaultMessage: name,
    });
  }
  if (ctx.menuTextRender) {
    return ctx.menuTextRender(item, text, ctx);
  }
  return text;
}

/**
 * 渲染叶子项的行内 DOM（icon + label），与 SidebarMenu 对齐：
 * - 使用 `span.icon + span.label` 的扁平结构，避免再多一层 `div.item-title` 包裹
 * - icon 容器固定 `iconBox`（默认 24px），内部 svg 走 `iconSvgSize`（默认 18px）
 * - collapsed 时不挂 label，与 SidebarMenu 的「不依赖 CSS 隐藏文案」策略一致
 */
function renderLeafRow(
  ctx: BaseMenuTreeContext,
  item: MenuDataItem,
  level: number,
  collapsedGroupDepth: number,
) {
  const path = normalizeMenuPath(item.path || '/');
  const {
    location = { pathname: '/' },
    isMobile,
    onCollapse,
    menuItemRender,
    baseClassName,
    menu,
    collapsed,
    renderIcon,
  } = ctx;

  const titleText = resolveMenuItemTitle(ctx, item);
  const isGroupLayout = menu?.type === 'group';
  const showIconSlot = level === 0 || (isGroupLayout && level === 1);
  const iconNode = !showIconSlot
    ? null
    : renderIcon(item.icon, `${baseClassName}-icon ${ctx.hashId}`);

  /** 收起时无图标场景下用首字母占位（与历史行为一致） */
  const fallbackLetter =
    collapsed && showIconSlot ? collapsedTitleLetter(titleText) : null;

  /** collapsed 且 collapsedShowTitle 关闭时不渲染文案，避免占位/溢出 */
  const shouldRenderLabel = !(collapsed && !menu?.collapsedShowTitle);

  const iconCell =
    iconNode || fallbackLetter !== null ? (
      <span className={clsx(`${baseClassName}-item-icon`, ctx.hashId)}>
        {iconNode || <span>{fallbackLetter}</span>}
      </span>
    ) : null;

  const labelCell = shouldRenderLabel ? (
    <span
      className={clsx(`${baseClassName}-item-label`, ctx.hashId, {
        [`${baseClassName}-item-text-has-icon`]:
          showIconSlot && (iconNode || fallbackLetter),
      })}
    >
      {titleText}
    </span>
  ) : null;

  const titleClassName = clsx(`${baseClassName}-item-title`, ctx.hashId, {
    [`${baseClassName}-item-title-collapsed`]: collapsed,
    [`${baseClassName}-item-title-collapsed-level-${collapsedGroupDepth}`]:
      collapsed,
    [`${baseClassName}-item-collapsed-show-title`]:
      menu?.collapsedShowTitle && collapsed,
  });

  const isExternalUrl = isUrl(path);

  let row: React.ReactNode = (
    <span
      key={path}
      data-pro-layout-nav-item-title
      className={titleClassName}
      onClick={
        isExternalUrl
          ? () => {
              window?.open?.(path, '_blank');
            }
          : undefined
      }
    >
      {iconCell}
      {labelCell}
    </span>
  );

  if (menuItemRender) {
    const renderItemProps = {
      ...item,
      isUrl: isExternalUrl,
      itemPath: path,
      isMobile,
      replace: path === location.pathname,
      onClick: () => onCollapse && onCollapse(true),
      children: undefined,
    };
    row = menuItemRender(renderItemProps, row, ctx);
  }

  return level === 0 ? (
    <MenuItemTooltip
      collapsed={collapsed}
      title={titleText}
      disable={item.disabledTooltip}
    >
      {row}
    </MenuItemTooltip>
  ) : (
    row
  );
}

function mapMenuItemToNavNode(
  ctx: BaseMenuTreeContext,
  item: MenuDataItem,
  depth: number,
  collapsedGroupDepth: number,
): NavMenuNode | NavMenuNode[] {
  const { subMenuItemRender, baseClassName, collapsed, menu, layout, renderIcon } =
    ctx;
  const useGroupChrome = menu?.type === 'group' && layout !== 'top';
  const titleText = resolveMenuItemTitle(ctx, item);
  const children = item?.children;

  const rowVariant = useGroupChrome && depth === 0 ? ('group' as const) : undefined;

  if (Array.isArray(children) && children.length > 0) {
    const iconLevel = depth === 0 || (useGroupChrome && depth === 1);

    const iconDom = renderIcon(
      item.icon,
      `${baseClassName}-icon ${ctx.hashId}`,
    );
    const fallbackLetter =
      collapsed && iconLevel ? collapsedTitleLetter(titleText) : null;

    const showIconCell =
      rowVariant !== 'group' || !collapsed
        ? iconLevel && (iconDom || fallbackLetter)
        : false;
    const shouldRenderTitleText =
      rowVariant === 'group' ? !collapsed : !(collapsed && !menu?.collapsedShowTitle);

    /**
     * 标题行 DOM：
     * - 普通 submenu / group：`span.icon? + span.label`，与 leaf 完全对齐
     * - group 标题在收起态既不显示 icon 也不显示文案（由 cssinjs 控制隐藏）
     */
    const defaultTitleRow = (
      <span
        data-pro-layout-nav-item-title
        className={clsx(`${baseClassName}-item-title`, ctx.hashId, {
          [`${baseClassName}-item-title-collapsed`]: collapsed,
          [`${baseClassName}-item-title-collapsed-level-${collapsedGroupDepth}`]:
            collapsed,
          [`${baseClassName}-group-item-title`]: rowVariant === 'group',
          [`${baseClassName}-item-collapsed-show-title`]:
            menu?.collapsedShowTitle && collapsed,
        })}
      >
        {showIconCell ? (
          <span className={clsx(`${baseClassName}-item-icon`, ctx.hashId)}>
            {iconDom ?? fallbackLetter}
          </span>
        ) : null}
        {shouldRenderTitleText ? (
          <span
            className={clsx(`${baseClassName}-item-label`, ctx.hashId, {
              [`${baseClassName}-item-text-has-icon`]:
                rowVariant !== 'group' && showIconCell,
            })}
          >
            {titleText}
          </span>
        ) : null}
      </span>
    );

    const titleCell = subMenuItemRender
      ? subMenuItemRender({ ...item, isUrl: false }, defaultTitleRow, ctx)
      : defaultTitleRow;

    const nextDepth = depth + 1;
    const nextCollapsedDepth =
      useGroupChrome && depth === 0 && ctx.collapsed ? depth : depth + 1;

    const childNodes =
      // eslint-disable-next-line @typescript-eslint/no-use-before-define -- `mapMenuDataToNavNodes` 与 `mapMenuItemToNavNode` 互递归
      mapMenuDataToNavNodes(ctx, children, nextDepth, nextCollapsedDepth);

    /**
     * 分组分隔不再使用 1px divider（与 SidebarMenu 一致），改由 `--pro-layout-nav-group-gap`
     * 控制纵向间距；若业务侧需要 divider，可在外层 less 自行覆盖。
     */
    if (rowVariant === 'group') {
      return {
        kind: 'group',
        key: String(item.key! || item.path!),
        label: titleCell,
        children: childNodes,
        className: clsx(`${baseClassName}-group`),
      };
    }

    return {
      kind: 'submenu',
      key: String(item.key! || item.path!),
      label: titleCell,
      onTitleClick: (e) => item.onTitleClick?.(e),
      children: childNodes,
      className: clsx({
        [`${baseClassName}-submenu`]: true,
        [`${baseClassName}-submenu-has-icon`]: iconLevel && iconDom,
      }),
    };
  }

  const onTitle = (item as MenuDataItem & { onTitleClick?: () => void })
    .onTitleClick;
  return {
    kind: 'item' as const,
    className: `${baseClassName}-menu-item`,
    disabled: item.disabled,
    key: String(item.key! || item.path!),
    onClick: onTitle ? () => onTitle() : undefined,
    label: renderLeafRow(ctx, item, depth, collapsedGroupDepth),
  };
}

/** 将 `menuData` 转为 `ProLayoutNavMenu` 所需的 `nodes` */
function mapMenuDataToNavNodes(
  ctx: BaseMenuTreeContext,
  items: MenuDataItem[] = [],
  depth = 0,
  collapsedGroupDepth = 0,
): NavMenuNode[] {
  return items
    .map((item) => mapMenuItemToNavNode(ctx, item, depth, collapsedGroupDepth))
    .filter(Boolean)
    .flat(1) as NavMenuNode[];
}

export { mapMenuDataToNavNodes };
