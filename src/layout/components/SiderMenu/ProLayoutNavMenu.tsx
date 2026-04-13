import { RightOutlined } from '@ant-design/icons';
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

type SubmenuExpandVariant = 'inline' | 'popup-horizontal' | 'popup-vertical';

function getSubmenuExpandVariant(ctx: {
  popupMode: boolean;
  mode: MenuMode;
}): SubmenuExpandVariant {
  if (!ctx.popupMode) return 'inline';
  return ctx.mode === 'horizontal' ? 'popup-horizontal' : 'popup-vertical';
}

function renderSubmenuTitleContent(
  ctx: Pick<
    ProLayoutNavMenuRenderContext,
    'baseClassName' | 'hashId' | 'mode' | 'popupMode'
  >,
  isOpen: boolean,
  label: React.ReactNode,
) {
  const { baseClassName, hashId } = ctx;
  const variant = getSubmenuExpandVariant(ctx);
  /** 顶栏 horizontal：不展示子菜单展开箭头，与常见顶栏菜单一致 */
  if (variant === 'popup-horizontal') {
    return (
      <span className={clsx(`${baseClassName}-submenu-title-inner`, hashId)}>
        {label}
      </span>
    );
  }
  return (
    <>
      <span className={clsx(`${baseClassName}-submenu-title-inner`, hashId)}>
        {label}
      </span>
      <span
        className={clsx(`${baseClassName}-submenu-expand-icon`, hashId, {
          [`${baseClassName}-submenu-expand-icon--open`]: isOpen,
          [`${baseClassName}-submenu-expand-icon--inline`]: variant === 'inline',
          [`${baseClassName}-submenu-expand-icon--popup-vertical`]:
            variant === 'popup-vertical',
        })}
        aria-hidden
      >
        <RightOutlined />
      </span>
    </>
  );
}

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
  popupPanelRef: React.RefObject<HTMLUListElement | null>;
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
  return (
    <li
      key={node.key}
      data-pro-layout-nav-leaf
      role="menuitem"
      tabIndex={disabled ? undefined : 0}
      className={clsx(`${baseClassName}-item`, hashId, node.className, {
        [`${baseClassName}-item--selected`]: selected,
        [`${baseClassName}-item--disabled`]: disabled,
      })}
      aria-disabled={disabled || undefined}
      aria-selected={selected || undefined}
      style={
        depth > 0 ? { paddingInlineStart: depth * MENU_INDENT_PX } : undefined
      }
      onClick={() => handleLeafActivate(node.key, disabled, node.onClick)}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleLeafActivate(node.key, disabled, node.onClick);
        }
      }}
    >
      {node.label}
    </li>
  );
}

function renderGroup(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'group' }>,
  depth: number,
) {
  const { baseClassName, hashId } = ctx;
  return (
    <li
      key={node.key}
      className={clsx(`${baseClassName}-group`, hashId, node.className)}
      role="presentation"
    >
      <div
        className={clsx(`${baseClassName}-group-title`, hashId)}
        data-pro-layout-nav-group-title
        role="presentation"
      >
        {node.label}
      </div>
      <ul
        className={clsx(`${baseClassName}-group-list`, hashId)}
        role="group"
      >
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
          ref={popupPanelRef as React.Ref<HTMLUListElement>}
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
          {node.children.map((child) =>
            renderNode(popupCtx, child, depth + 1),
          )}
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
        {renderSubmenuTitleContent(ctx, isOpen, node.label)}
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
  const { baseClassName, hashId, openSet, handleSubmenuTitleClick } = ctx;
  const isOpen = openSet.has(node.key);
  return (
    <li
      key={node.key}
      data-pro-layout-nav-submenu
      data-pro-layout-nav-submenu-open={isOpen || undefined}
      className={clsx(`${baseClassName}-submenu`, hashId, node.className, {
        [`${baseClassName}-submenu-open`]: isOpen,
      })}
      role="none"
    >
      <button
        type="button"
        className={clsx(`${baseClassName}-submenu-title`, hashId, {
          [`${baseClassName}-submenu-title--open`]: isOpen,
        })}
        style={
          depth > 0 ? { paddingInlineStart: depth * MENU_INDENT_PX } : undefined
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(e) => handleSubmenuTitleClick(node.key, node.onTitleClick, e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSubmenuTitleClick(node.key, node.onTitleClick, e);
          }
        }}
      >
        {renderSubmenuTitleContent(ctx, isOpen, node.label)}
      </button>
      <div
        className={clsx(`${baseClassName}-submenu-inline-wrap`, hashId)}
        {...(!isOpen ? ({ inert: '' } as React.HTMLAttributes<HTMLDivElement>) : {})}
      >
        <div
          className={clsx(
            `${baseClassName}-submenu-inline-wrap-inner`,
            hashId,
          )}
        >
          <ul
            className={clsx(
              `${baseClassName}-list`,
              `${baseClassName}-submenu-children`,
              hashId,
            )}
            role="menu"
          >
            {node.children.map((child) => renderNode(ctx, child, depth + 1))}
          </ul>
        </div>
      </div>
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
