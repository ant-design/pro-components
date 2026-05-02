import { clsx } from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';
import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { NavMenuNode } from './navMenuTypes';
import type { MenuMode, ProLayoutNavMenuSelectInfo } from './types';

const MENU_INDENT_PX = 16;

const keyToString = (key: string | number) => String(key);

export type ProLayoutNavMenuProps = {
  baseClassName: string;
  hashId: string;
  mode: MenuMode;
  collapsed?: boolean;
  selectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onOpenChange?: (openKeys: string[]) => void;
  onSelect?: (info: ProLayoutNavMenuSelectInfo) => void;
  nodes: NavMenuNode[];
} & Omit<
  HTMLAttributes<HTMLElement>,
  | 'role'
  | 'onSelect'
  | 'children'
  | 'defaultValue'
  | 'className'
  | 'style'
> & {
  className?: string;
  style?: CSSProperties;
};

interface ProLayoutNavMenuRenderContext {
  baseClassName: string;
  hashId: string;
  mode: MenuMode;
  popupMode: boolean;
  /** 已在浮动子菜单面板内：嵌套子菜单用内联展开，避免再挂一层 portal 导致三级及以上无法展示 */
  insideSubmenuPopup: boolean;
  rootId: string;
  selectedSet: Set<string>;
  openSet: Set<string>;
  openKeysProp: (string | number)[];
  popupOpenKey: string | null;
  popupPlacement: { top: number; left: number } | null;
  popupPanelRef: React.RefObject<HTMLUListElement>;
  submenuAnchorRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  setPopupOpenKey: React.Dispatch<React.SetStateAction<string | null>>;
  handleLeafActivate: (
    key: string,
    disabled?: boolean,
    onClick?: () => void,
  ) => void;
  handleSubmenuTitleClick: (
    key: string,
    onTitleClick: undefined | ((e: React.MouseEvent<Element>) => void),
    e: React.MouseEvent | React.KeyboardEvent,
  ) => void;
}

function renderDivider(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'divider' }>,
) {
  const { baseClassName, hashId } = ctx;
  return (
    <li
      key={node.key}
      role="separator"
      className={clsx(`${baseClassName}-divider`, hashId, node.className)}
      style={node.style}
    />
  );
}

function renderLeaf(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'item' }>,
  depth: number,
) {
  const { baseClassName, hashId, selectedSet, handleLeafActivate } = ctx;
  const selected = selectedSet.has(node.key);
  const { disabled } = node;
  /**
   * 与 SidebarMenu 对齐：外层 `li` 仅承担列表/role 语义，内层 `button` 承担可聚焦/可点击行为。
   * 好处：
   * 1. `button` 自带键盘可达性（Enter/Space），无需在 li 上自行处理；
   * 2. 行内文案的省略、icon 对齐都由 cssinjs 的 `${c}-item > *` 选择器控制，DOM 与
   *    SidebarMenu 的 `button.sidebar-menu-item` 视觉规则一致；
   * 3. 二级 / 三级缩进继续走 `paddingInlineStart`，与原行为保持兼容。
   */
  /**
   * 缩进放在外层 `li`：cssinjs 里 `${c}-item` 用了 `paddingInline` shorthand，
   * 会覆盖内联 `paddingInlineStart`；改在外层 `li` 上做缩进，内层按钮的内边距保持一致。
   */
  const indentStyle =
    depth > 0 ? { paddingInlineStart: depth * MENU_INDENT_PX } : undefined;
  return (
    <li
      key={node.key}
      data-pro-layout-nav-leaf
      role="none"
      className={clsx(`${baseClassName}-item`, hashId, node.className, {
        [`${baseClassName}-item--selected`]: selected,
        [`${baseClassName}-item--disabled`]: disabled,
      })}
      aria-disabled={disabled || undefined}
      aria-selected={selected || undefined}
      style={indentStyle}
    >
      <button
        type="button"
        role="menuitem"
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={clsx(`${baseClassName}-item-button`, hashId)}
        onClick={(e) => {
          e.stopPropagation();
          handleLeafActivate(node.key, disabled, node.onClick);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLeafActivate(node.key, disabled, node.onClick);
          }
        }}
      >
        {node.label}
      </button>
    </li>
  );
}

function renderGroup(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'group' }>,
  depth: number,
) {
  const { baseClassName, hashId } = ctx;
  /**
   * 与 SidebarMenu 一致：分组标题使用 `<h3>` 语义元素，子项装在独立的 `<div role="group">`
   * 包裹中。组与组之间的纵向间距由 `--pro-layout-nav-group-gap` 控制（默认 12px）。
   */
  return (
    <li
      key={node.key}
      className={clsx(`${baseClassName}-group`, hashId, node.className)}
      role="presentation"
    >
      <h3
        className={clsx(`${baseClassName}-group-title`, hashId)}
        data-pro-layout-nav-group-title
      >
        {node.label}
      </h3>
      <ul
        className={clsx(`${baseClassName}-group-list`, hashId)}
        role="group"
      >
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define -- renderNode 定义在文件后部 */}
        {node.children.map((child) => renderNode(ctx, child, depth))}
      </ul>
    </li>
  );
}

function renderPopup(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'submenu' }>,
  depth: number,
) {
  const {
    baseClassName,
    hashId,
    rootId,
    popupOpenKey,
    popupPlacement,
    popupPanelRef,
    submenuAnchorRefs,
    setPopupOpenKey,
    handleSubmenuTitleClick,
  } = ctx;
  const popupCtx: ProLayoutNavMenuRenderContext = {
    ...ctx,
    insideSubmenuPopup: true,
  };
  const isOpen = popupOpenKey === node.key;
  const setSubmenuAnchorRef = (el: HTMLButtonElement | null) => {
    if (el) {
      submenuAnchorRefs.current.set(node.key, el);
    } else {
      submenuAnchorRefs.current.delete(node.key);
    }
  };

  const popupPanel =
    isOpen && typeof document !== 'undefined' ? (
      createPortal(
        <ul
          ref={popupPanelRef}
          id={`${rootId}-popup-${node.key}`}
          role="menu"
          aria-labelledby={`${rootId}-submenu-${node.key}`}
          className={clsx(
            `${baseClassName}-list`,
            `${baseClassName}-submenu-popup`,
            hashId,
          )}
          style={{
            top: popupPlacement?.top,
            left: popupPlacement?.left,
            visibility: popupPlacement ? 'visible' : 'hidden',
          }}
        >
          {node.children.map((child) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define -- renderNode 定义在文件后部
            return renderNode(popupCtx, child, depth + 1);
          })}
        </ul>,
        document.body,
      )
    ) : null;

  return (
    <React.Fragment key={node.key}>
      <button
        type="button"
        ref={setSubmenuAnchorRef}
        id={`${rootId}-submenu-${node.key}`}
        className={clsx(
          `${baseClassName}-submenu-title`,
          hashId,
          node.className,
          {
            [`${baseClassName}-submenu-title--open`]: isOpen,
            [`${baseClassName}-submenu-open`]: isOpen,
            [`${baseClassName}-submenu-has-icon`]: node.className?.includes(
              'submenu-has-icon',
            ),
          },
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={isOpen ? `${rootId}-popup-${node.key}` : undefined}
        onClick={(e) => handleSubmenuTitleClick(node.key, node.onTitleClick, e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSubmenuTitleClick(node.key, node.onTitleClick, e);
          }
          if (e.key === 'Escape' && isOpen) {
            e.stopPropagation();
            setPopupOpenKey(null);
          }
        }}
      >
        {node.label}
      </button>
      {popupPanel}
    </React.Fragment>
  );
}

function renderInlineSubmenu(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'submenu' }>,
  depth: number,
) {
  const {
    baseClassName,
    hashId,
    openSet,
    popupMode,
    popupOpenKey,
    handleSubmenuTitleClick,
  } = ctx;
  /**
   * 三级及以下 submenu 的展开判定：
   * - 非 popup 模式（侧栏展开态/inline）：以受控的 `openKeysProp` 为准（openSet 已映射）
   * - popup 模式（collapsed 侧栏 / horizontal）下 popup 内的内联 submenu：
   *   `openKeysProp` 不会包含三级 key，需要用本地 `popupOpenKey` 兜底，否则三级无法展开
   */
  const isOpen = popupMode
    ? popupOpenKey === node.key || openSet.has(node.key)
    : openSet.has(node.key);
  /**
   * 二级、三级缩进通过外层 `li.paddingInlineStart` 实现，避免与 cssinjs 中
   * `${c}-item / ${c}-submenu-title` 的 `paddingInline` shorthand 冲突
   * （shorthand 会把内联 `paddingInlineStart` 一并覆盖掉）。
   */
  const indentStyle =
    depth > 0 ? { paddingInlineStart: depth * MENU_INDENT_PX } : undefined;
  return (
    <li
      key={node.key}
      data-pro-layout-nav-submenu
      data-pro-layout-nav-submenu-open={isOpen || undefined}
      className={clsx(`${baseClassName}-submenu`, hashId, node.className, {
        [`${baseClassName}-submenu-open`]: isOpen,
      })}
      style={indentStyle}
      role="none"
    >
      <button
        type="button"
        className={clsx(`${baseClassName}-submenu-title`, hashId, {
          [`${baseClassName}-submenu-title--open`]: isOpen,
        })}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(e) => handleSubmenuTitleClick(node.key, node.onTitleClick, e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSubmenuTitleClick(node.key, node.onTitleClick, e);
          }
        }}
      >
        {node.label}
      </button>
      {isOpen ? (
        <ul
          className={clsx(
            `${baseClassName}-list`,
            `${baseClassName}-submenu-children`,
            hashId,
          )}
          role="menu"
        >
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define -- renderNode 定义在文件后部 */}
          {node.children.map((child) => renderNode(ctx, child, depth + 1))}
        </ul>
      ) : null}
    </li>
  );
}

function renderNode(
  ctx: ProLayoutNavMenuRenderContext,
  node: NavMenuNode,
  depth: number,
): React.ReactNode {
  switch (node.kind) {
    case 'divider':
      return renderDivider(ctx, node);
    case 'item':
      return renderLeaf(ctx, node, depth);
    case 'group':
      return renderGroup(ctx, node, depth);
    case 'submenu':
      if (ctx.popupMode && !ctx.insideSubmenuPopup) {
        return renderPopup(ctx, node, depth);
      }
      return renderInlineSubmenu(ctx, node, depth);
    default:
      return null;
  }
}

const isPopupMode = (mode: MenuMode, collapsed?: boolean) =>
  mode === 'horizontal' || (mode === 'vertical' && !!collapsed);

export const ProLayoutNavMenu: React.FC<ProLayoutNavMenuProps> = ({
  baseClassName,
  hashId,
  mode,
  collapsed,
  selectedKeys = [],
  openKeys: openKeysProp = [],
  defaultOpenKeys = [],
  onOpenChange,
  onSelect,
  nodes,
  className,
  style,
  ...restNavProps
}) => {
  const popupMode = isPopupMode(mode, collapsed);
  const rootId = useId();
  const [popupOpenKey, setPopupOpenKey] = useState<string | null>(() => {
    if (!popupMode || defaultOpenKeys.length === 0) return null;
    return defaultOpenKeys[0] ?? null;
  });
  const popupPanelRef = useRef<HTMLUListElement>(null);
  const rootNavRef = useRef<HTMLElement>(null);
  const submenuAnchorRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [popupPlacement, setPopupPlacement] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const updatePopupPlacement = useCallback(() => {
    if (!popupMode || !popupOpenKey) {
      setPopupPlacement(null);
      return;
    }
    const anchor = submenuAnchorRefs.current.get(popupOpenKey);
    if (!anchor) {
      setPopupPlacement(null);
      return;
    }
    const rect = anchor.getBoundingClientRect();
    const gap = 4;
    if (mode === 'horizontal') {
      setPopupPlacement({
        top: rect.bottom + gap,
        left: rect.left,
      });
    } else {
      setPopupPlacement({
        top: rect.top,
        left: rect.right + gap,
      });
    }
  }, [popupMode, popupOpenKey, mode]);

  useLayoutEffect(() => {
    updatePopupPlacement();
  }, [updatePopupPlacement, nodes]);

  useEffect(() => {
    if (!popupMode || !popupOpenKey) return;
    window.addEventListener('scroll', updatePopupPlacement, true);
    window.addEventListener('resize', updatePopupPlacement);
    return () => {
      window.removeEventListener('scroll', updatePopupPlacement, true);
      window.removeEventListener('resize', updatePopupPlacement);
    };
  }, [popupMode, popupOpenKey, updatePopupPlacement]);

  useEffect(() => {
    if (!popupMode) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const root = rootNavRef.current;
      const target = e.target as Node;
      if (!popupOpenKey) return;
      if (root?.contains(target)) return;
      setPopupOpenKey(null);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, {
      passive: true,
    });
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [popupMode, popupOpenKey]);

  useEffect(() => {
    if (!popupMode) return;
    if (defaultOpenKeys.length > 0) {
      setPopupOpenKey(defaultOpenKeys[0] ?? null);
    }
  }, [popupMode, defaultOpenKeys.join(',')]);

  const selectedSet = useMemo(
    () => new Set(selectedKeys.map(keyToString)),
    [selectedKeys],
  );

  const openSet = useMemo(
    () => new Set(openKeysProp.map(keyToString)),
    [openKeysProp],
  );

  const handleSubmenuTitleClick = useCallback(
    (
      key: string,
      onTitleClick: undefined | ((e: React.MouseEvent<Element>) => void),
      e: React.MouseEvent | React.KeyboardEvent,
    ) => {
      e.preventDefault();
      if (onTitleClick && 'nativeEvent' in e) {
        onTitleClick(e as React.MouseEvent<Element>);
      }
      if (popupMode) {
        setPopupOpenKey((prev) => (prev === key ? null : key));
        return;
      }
      const isOpen = openSet.has(key);
      const next = isOpen
        ? openKeysProp.filter((k) => keyToString(k) !== key)
        : [...openKeysProp.map(keyToString), key];
      onOpenChange?.(next);
    },
    [popupMode, openSet, openKeysProp, onOpenChange],
  );

  const handleLeafActivate = useCallback(
    (key: string, disabled?: boolean, onClick?: () => void) => {
      if (disabled) return;
      onClick?.();
      onSelect?.({ key, selectedKeys: [key] });
      if (popupMode) {
        setPopupOpenKey(null);
      }
    },
    [onSelect, popupMode],
  );

  const renderCtx: ProLayoutNavMenuRenderContext = {
    baseClassName,
    hashId,
    mode,
    popupMode,
    insideSubmenuPopup: false,
    rootId,
    selectedSet,
    openSet,
    openKeysProp,
    popupOpenKey,
    popupPlacement,
    popupPanelRef,
    submenuAnchorRefs,
    setPopupOpenKey,
    handleLeafActivate,
    handleSubmenuTitleClick,
  };

  const isHorizontal = mode === 'horizontal';

  const listClassName = clsx(
    `${baseClassName}-list`,
    !isHorizontal && `${baseClassName}-list--root`,
    hashId,
  );

  const listBody = nodes.map((n) => {
    if (popupMode && n.kind === 'submenu') {
      return (
        <li
          key={n.key}
          role="none"
          data-pro-layout-nav-submenu
          className={clsx(`${baseClassName}-submenu`, hashId)}
        >
          {renderPopup(renderCtx, n, 0)}
        </li>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define -- renderNode 定义在文件后部
    return renderNode(renderCtx, n, 0);
  });

  if (isHorizontal) {
    return (
      <nav
        ref={rootNavRef}
        data-pro-layout-nav-root
        {...restNavProps}
        className={clsx(className, hashId, baseClassName, listClassName, {
          [`${baseClassName}--horizontal`]: true,
          [`${baseClassName}--collapsed`]: !!collapsed,
        })}
        style={style}
        role="menubar"
      >
        {listBody}
      </nav>
    );
  }

  return (
    <nav
      ref={rootNavRef}
      data-pro-layout-nav-root
      {...restNavProps}
      className={clsx(className, hashId, baseClassName, listClassName, {
        [`${baseClassName}--collapsed`]: !!collapsed,
      })}
      style={style}
      role="menu"
    >
      {listBody}
    </nav>
  );
};
