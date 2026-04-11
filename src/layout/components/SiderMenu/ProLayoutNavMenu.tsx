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
import type { MenuMode } from './BaseMenu';
import type { NavMenuNode } from './navMenuTypes';

const MENU_INDENT_PX = 16;

export type ProLayoutNavMenuProps = {
  baseClassName: string;
  hashId: string;
  mode: MenuMode;
  collapsed?: boolean;
  selectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onOpenChange?: (openKeys: string[]) => void;
  onSelect?: (info: { key: string; selectedKeys: string[] }) => void;
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

const keyToString = (key: string | number) => String(key);

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
  const popupPanelRef = useRef<HTMLDivElement>(null);
  const rootNavRef = useRef<HTMLElement>(null);
  const submenuAnchorRefs = useRef<Map<string, HTMLDivElement>>(new Map());
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

  /* eslint-disable @typescript-eslint/no-use-before-define -- inner helpers are mutually recursive */
  function renderDivider(node: Extract<NavMenuNode, { kind: 'divider' }>) {
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
    node: Extract<NavMenuNode, { kind: 'item' }>,
    depth: number,
  ) {
    const selected = selectedSet.has(node.key);
    const { disabled } = node;
    return (
      <li
        key={node.key}
        data-pro-layout-nav-leaf
        role="menuitem"
        tabIndex={disabled ? undefined : 0}
        className={clsx(
          'ant-menu-item',
          `${baseClassName}-item`,
          hashId,
          node.className,
          {
            [`${baseClassName}-item--selected`]: selected,
            'ant-menu-item-selected': selected,
            [`${baseClassName}-item--disabled`]: disabled,
            'ant-menu-item-disabled': disabled,
          },
        )}
        aria-disabled={disabled || undefined}
        aria-selected={selected || undefined}
        style={{
          paddingInlineStart: depth * MENU_INDENT_PX,
        }}
        onClick={() => handleLeafActivate(node.key, disabled, node.onClick)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLeafActivate(node.key, disabled, node.onClick);
          }
        }}
      >
        <span
          className="ant-menu-title-content"
          style={{ width: '100%', display: 'inline-flex' }}
        >
          {node.label}
        </span>
      </li>
    );
  }

  function renderGroup(
    node: Extract<NavMenuNode, { kind: 'group' }>,
    depth: number,
  ) {
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
          {node.children.map((child) => renderNode(child, depth))}
        </ul>
      </li>
    );
  }

  function renderPopup(node: Extract<NavMenuNode, { kind: 'submenu' }>) {
    const isOpen = popupOpenKey === node.key;
    const setSubmenuAnchorRef = (el: HTMLDivElement | null) => {
      if (el) {
        submenuAnchorRefs.current.set(node.key, el);
      } else {
        submenuAnchorRefs.current.delete(node.key);
      }
    };

    const popupPanel =
      isOpen && typeof document !== 'undefined' ? (
        createPortal(
          <div
            ref={popupPanelRef}
            id={`${rootId}-popup-${node.key}`}
            role="menu"
            aria-labelledby={`${rootId}-submenu-${node.key}`}
            className={clsx(`${baseClassName}-submenu-popup`, hashId)}
            style={{
              top: popupPlacement?.top,
              left: popupPlacement?.left,
              visibility: popupPlacement ? 'visible' : 'hidden',
            }}
          >
            <ul className={clsx(`${baseClassName}-list`, hashId)} role="none">
              {node.children.map((child) => renderNode(child, 1))}
            </ul>
          </div>,
          document.body,
        )
      ) : null;

    return (
      <div
        key={node.key}
        ref={setSubmenuAnchorRef}
        className={clsx(
          'ant-menu-submenu',
          'ant-menu-submenu-popup',
          `${baseClassName}-submenu`,
          hashId,
          node.className,
          {
            [`${baseClassName}-submenu-open`]: isOpen,
            'ant-menu-submenu-open': isOpen,
            [`${baseClassName}-submenu-has-icon`]: node.className?.includes(
              'submenu-has-icon',
            ),
          },
        )}
      >
        <div className={clsx(`${baseClassName}-submenu-title-wrap`, hashId)}>
          <button
            type="button"
            id={`${rootId}-submenu-${node.key}`}
            className={clsx(
              'ant-menu-submenu-title',
              `${baseClassName}-submenu-title`,
              hashId,
              {
                [`${baseClassName}-submenu-title--open`]: isOpen,
              },
            )}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls={isOpen ? `${rootId}-popup-${node.key}` : undefined}
            onClick={(e) =>
              handleSubmenuTitleClick(node.key, node.onTitleClick, e)
            }
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
            <span
              className="ant-menu-title-content"
              style={{ width: '100%', display: 'inline-flex' }}
            >
              {node.label}
            </span>
          </button>
        </div>
        {popupPanel}
      </div>
    );
  }

  function renderInlineSubmenu(
    node: Extract<NavMenuNode, { kind: 'submenu' }>,
    depth: number,
  ) {
    const isOpen = openSet.has(node.key);
    return (
      <li
        key={node.key}
        className={clsx(
          'ant-menu-submenu',
          'ant-menu-submenu-inline',
          `${baseClassName}-submenu`,
          hashId,
          node.className,
          {
            [`${baseClassName}-submenu-open`]: isOpen,
            'ant-menu-submenu-open': isOpen,
          },
        )}
        role="none"
      >
        <div
          className={clsx(`${baseClassName}-submenu-title-wrap`, hashId)}
          style={{
            paddingInlineStart: depth * MENU_INDENT_PX,
          }}
        >
          <button
            type="button"
            className={clsx(
              'ant-menu-submenu-title',
              `${baseClassName}-submenu-title`,
              hashId,
              {
                [`${baseClassName}-submenu-title--open`]: isOpen,
              },
            )}
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={(e) =>
              handleSubmenuTitleClick(node.key, node.onTitleClick, e)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSubmenuTitleClick(node.key, node.onTitleClick, e);
              }
            }}
          >
            <span
              className="ant-menu-title-content"
              style={{ width: '100%', display: 'inline-flex' }}
            >
              {node.label}
            </span>
          </button>
        </div>
        {isOpen ? (
          <ul
            className={clsx(
              'ant-menu ant-menu-sub ant-menu-inline',
              `${baseClassName}-list`,
              `${baseClassName}-submenu-inline`,
              hashId,
            )}
            role="menu"
          >
            {node.children.map((child) => renderNode(child, depth + 1))}
          </ul>
        ) : null}
      </li>
    );
  }

  function renderNode(node: NavMenuNode, depth: number): React.ReactNode {
    switch (node.kind) {
      case 'divider':
        return renderDivider(node);
      case 'item':
        return renderLeaf(node, depth);
      case 'group':
        return renderGroup(node, depth);
      case 'submenu':
        if (popupMode) {
          return renderPopup(node);
        }
        return renderInlineSubmenu(node, depth);
      default:
        return null;
    }
  }
  /* eslint-enable @typescript-eslint/no-use-before-define */

  const isHorizontal = mode === 'horizontal';

  return (
    <nav
      ref={rootNavRef}
      data-pro-layout-nav-root
      {...restNavProps}
      className={clsx(className, hashId, baseClassName, {
        [`${baseClassName}--horizontal`]: isHorizontal,
        [`${baseClassName}--collapsed`]: !!collapsed,
      })}
      style={style}
    >
      <ul
        className={clsx(
          !isHorizontal && 'ant-menu ant-menu-root ant-menu-inline ant-pro-sider-menu',
          `${baseClassName}-list`,
          hashId,
        )}
        role={isHorizontal ? 'menubar' : 'menu'}
      >
        {nodes.map((n) => {
          if (popupMode && n.kind === 'submenu') {
            return (
              <li
                key={n.key}
                role="none"
                className={clsx(
                  'ant-menu-submenu',
                  'ant-menu-submenu-inline',
                  hashId,
                )}
              >
                {renderPopup(n)}
              </li>
            );
          }
          return renderNode(n, 0);
        })}
      </ul>
    </nav>
  );
};
