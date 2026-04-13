import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { clsx } from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';
import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { NavMenuNode } from './navMenuTypes';
import type { MenuMode, ProLayoutNavMenuSelectInfo } from './types';

const MENU_INDENT_PX = 16;

const keyToString = (key: string | number) => String(key);

function renderSubmenuTitleContent(
  ctx: Pick<
    ProLayoutNavMenuRenderContext,
    | 'baseClassName'
    | 'hashId'
    | 'collapsed'
    | 'mode'
    | 'popupMode'
    | 'insideSubmenuPopup'
  >,
  label: React.ReactNode,
  isOpen: boolean,
) {
  const { baseClassName, hashId, collapsed, mode, popupMode, insideSubmenuPopup } =
    ctx;
  const hideExpandIndicator = !!collapsed && mode === 'vertical';
  const isHorizontalTopTrigger =
    mode === 'horizontal' && popupMode && !insideSubmenuPopup;

  return (
    <span className={clsx(`${baseClassName}-submenu-title-inner`, hashId)}>
      {label}
      {!hideExpandIndicator ? (
        <span
          className={clsx(`${baseClassName}-submenu-expand-icon`, hashId, {
            [`${baseClassName}-submenu-expand-icon--open`]: isOpen,
            [`${baseClassName}-submenu-expand-icon--horizontal`]:
              isHorizontalTopTrigger,
          })}
          aria-hidden
        >
          {isHorizontalTopTrigger ? <DownOutlined /> : <RightOutlined />}
        </span>
      ) : null}
    </span>
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
  collapsed?: boolean;
  popupMode: boolean;
  /** 顶栏/收起侧栏弹出层内：各子菜单展开态（与根 `openKeys` 分离） */
  nestedPopupOpen: Record<string, boolean>;
  /** 已在浮动子菜单面板内：嵌套子菜单用内联展开，避免再挂一层 portal 导致三级及以上无法展示 */
  insideSubmenuPopup: boolean;
  rootId: string;
  selectedSet: Set<string>;
  openSet: Set<string>;
  openKeysProp: (string | number)[];
  popupOpenKey: string | null;
  submenuAnchorRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  setPopupOpenKey: React.Dispatch<React.SetStateAction<string | null>>;
  setNestedPopupOpen: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  handleLeafActivate: (
    key: string,
    disabled?: boolean,
    onClick?: () => void,
  ) => void;
  handleSubmenuTitleClick: (
    key: string,
    onTitleClick: undefined | ((e: React.MouseEvent<Element>) => void),
    e: React.MouseEvent | React.KeyboardEvent,
    opts?: { insideSubmenuPopup?: boolean },
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
  const { baseClassName, hashId, collapsed } = ctx;
  return (
    <li
      key={node.key}
      className={clsx(`${baseClassName}-group`, hashId, node.className)}
      role="presentation"
    >
      {!collapsed ? (
        <div
          className={clsx(`${baseClassName}-group-title`, hashId)}
          data-pro-layout-nav-group-title
          role="presentation"
        >
          {node.label}
        </div>
      ) : null}
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
    submenuAnchorRefs,
    setPopupOpenKey,
    setNestedPopupOpen,
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

  /**
   * Popover 挂 body：外包层带 `baseClassName`+hash 以挂载 cssinjs；勿加 `--horizontal`，否则顶栏
   * 28px 等规则会命中浮层内纵向子项导致错乱。
   */
  const popupContent = (
    <div
      className={clsx(baseClassName, hashId, {
        [`${baseClassName}--collapsed`]:
          !!ctx.collapsed && ctx.mode === 'vertical',
      })}
    >
      <ul
        id={`${rootId}-popup-${node.key}`}
        role="menu"
        aria-labelledby={`${rootId}-submenu-${node.key}`}
        className={clsx(
          `${baseClassName}-list`,
          `${baseClassName}-submenu-popup`,
        )}
      >
        {node.children.map((child) => renderNode(popupCtx, child, depth + 1))}
      </ul>
    </div>
  );

  return (
    <Popover
      key={node.key}
      open={isOpen}
      arrow={false}
      onOpenChange={(nextOpen) => {
        setNestedPopupOpen({});
        setPopupOpenKey(nextOpen ? node.key : null);
      }}
      trigger={ctx.mode === 'horizontal' ? ['hover', 'click'] : ['click', 'hover']}
      placement={ctx.mode === 'horizontal' ? 'bottomLeft' : 'right'}
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
      styles={{ container: { padding: 0 } }}
      overlayClassName={clsx(`${baseClassName}-submenu-popover-overlay`, hashId)}
      content={popupContent}
    >
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
            [`${baseClassName}-submenu-has-icon`]:
              !!node.hasIcon ||
              node.className?.includes('submenu-has-icon'),
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
        {renderSubmenuTitleContent(ctx, node.label, isOpen)}
      </button>
    </Popover>
  );
}

function renderInlineSubmenu(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'submenu' }>,
  depth: number,
) {
  const { baseClassName, hashId, openSet, handleSubmenuTitleClick, nestedPopupOpen } =
    ctx;
  /** 浮层内：嵌套子菜单用内联展开，禁止再套一层 Popover（会挂到 body 导致外层误关、无法点击） */
  const isOpen =
    ctx.popupMode && ctx.insideSubmenuPopup
      ? Object.prototype.hasOwnProperty.call(nestedPopupOpen, node.key)
        ? !!nestedPopupOpen[node.key]
        : openSet.has(node.key)
      : openSet.has(node.key);
  const inlineSubmenuListId = `${ctx.rootId}-inline-children-${node.key}`;
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
        id={`${ctx.rootId}-submenu-inline-${node.key}`}
        className={clsx(`${baseClassName}-submenu-title`, hashId, {
          [`${baseClassName}-submenu-title--open`]: isOpen,
          [`${baseClassName}-submenu-has-icon`]:
            !!node.hasIcon ||
            node.className?.includes('submenu-has-icon'),
        })}
        style={
          depth > 0 ? { paddingInlineStart: depth * MENU_INDENT_PX } : undefined
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={isOpen ? inlineSubmenuListId : undefined}
        onClick={(e) =>
          handleSubmenuTitleClick(node.key, node.onTitleClick, e, {
            insideSubmenuPopup: ctx.insideSubmenuPopup,
          })
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSubmenuTitleClick(node.key, node.onTitleClick, e, {
              insideSubmenuPopup: ctx.insideSubmenuPopup,
            });
          }
        }}
      >
        {renderSubmenuTitleContent(ctx, node.label, isOpen)}
      </button>
      <div
        className={clsx(`${baseClassName}-submenu-expand-wrap`, hashId)}
        {...(!isOpen ? ({ inert: '' } as React.HTMLAttributes<HTMLDivElement>) : {})}
      >
        <div
          className={clsx(
            `${baseClassName}-submenu-expand-wrap-inner`,
            hashId,
          )}
        >
          <ul
            id={inlineSubmenuListId}
            className={clsx(
              `${baseClassName}-list`,
              `${baseClassName}-submenu-children`,
              hashId,
            )}
            role="menu"
            aria-labelledby={`${ctx.rootId}-submenu-inline-${node.key}`}
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
  ...restNavPropsRaw
}) => {
  /** 避免调用方经 `menuProps` 覆盖根 `nav` 的 `role` / hash `className` / `style` */
  const {
    role: _stripRole,
    className: _stripClassName,
    style: _stripStyle,
    ...restNavProps
  } = restNavPropsRaw as HTMLAttributes<HTMLElement>;
  const popupMode = isPopupMode(mode, collapsed);
  const rootId = useId();
  const [popupOpenKey, setPopupOpenKey] = useState<string | null>(() => {
    if (!popupMode || defaultOpenKeys.length === 0) return null;
    return defaultOpenKeys[0] ?? null;
  });
  const rootNavRef = useRef<HTMLElement>(null);
  const submenuAnchorRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  /** 弹出层内多级子菜单展开（与根级 `popupOpenKey` 独立） */
  const [nestedPopupOpen, setNestedPopupOpen] = useState<Record<string, boolean>>(
    {},
  );

  const openKeysPropRef = useRef(openKeysProp);
  openKeysPropRef.current = openKeysProp;

  /** 根浮层切换时：用当前 `openKeys` 预展开嵌套 Popover */
  useEffect(() => {
    if (!popupOpenKey) {
      setNestedPopupOpen({});
      return;
    }
    const initial: Record<string, boolean> = {};
    openKeysPropRef.current.forEach((k) => {
      const s = String(k);
      if (s !== popupOpenKey) initial[s] = true;
    });
    setNestedPopupOpen(initial);
  }, [popupOpenKey]);

  const defaultOpenKeysSerialized = JSON.stringify(defaultOpenKeys);
  useEffect(() => {
    if (!popupMode) return;
    if (defaultOpenKeys.length > 0) {
      setPopupOpenKey(defaultOpenKeys[0] ?? null);
    }
  }, [popupMode, defaultOpenKeysSerialized]);

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
      opts?: { insideSubmenuPopup?: boolean },
    ) => {
      e.preventDefault();
      if (onTitleClick && 'nativeEvent' in e) {
        onTitleClick(e as React.MouseEvent<Element>);
      }
      if (popupMode && opts?.insideSubmenuPopup) {
        setNestedPopupOpen((prev) => ({
          ...prev,
          [key]: !prev[key],
        }));
        return;
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
    collapsed,
    popupMode,
    nestedPopupOpen,
    insideSubmenuPopup: false,
    rootId,
    selectedSet,
    openSet,
    openKeysProp,
    popupOpenKey,
    submenuAnchorRefs,
    setPopupOpenKey,
    setNestedPopupOpen,
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
