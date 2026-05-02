import { Popover } from 'antd';
import { clsx } from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRefFunction } from '../../../utils/hooks/useRefFunction';
import type { NavMenuNode } from './navMenuTypes';
import type { MenuMode, ProLayoutNavMenuSelectInfo } from './types';

/* eslint-disable @typescript-eslint/no-unused-vars -- 保留 React 导入，部分构建链需要 React in scope */

const MENU_INDENT_PX = 16;

const keyToString = (key: string | number) => String(key);

/**
 * 在 nodes 子树里查找 `targetKey` 的位置，返回从根到该节点路径上**所有 submenu 的 key**
 * （不含目标 leaf 自身、不含 group 节点的 key）。找不到返回 null。
 *
 * 用途：popup 打开时，根据 selectedKey 自动展开包含选中项的所有祖先 submenu。
 */
function findAncestorSubmenuKeys(
  nodes: NavMenuNode[],
  targetKey: string,
): string[] | null {
  for (const node of nodes) {
    if (node.kind === 'item') {
      if (node.key === targetKey) return [];
      continue;
    }
    if (node.kind === 'submenu') {
      if (node.key === targetKey) return [];
      const sub = findAncestorSubmenuKeys(node.children, targetKey);
      if (sub) return [node.key, ...sub];
      continue;
    }
    if (node.kind === 'group') {
      const sub = findAncestorSubmenuKeys(node.children, targetKey);
      if (sub) return sub;
    }
  }
  return null;
}

/**
 * Submenu 右侧指示器（chevron）。
 * - 朝向由 cssinjs 控制（默认朝右；inline 展开旋转 90deg；horizontal 顶栏改为朝下）；
 * - 颜色继承父级（与 button 文字色一致），无须单独传 props；
 * - 使用 SVG 而非 antd icon，避免在导航这种高频组件里多引入一份 anticon 依赖。
 */
const SubmenuArrow: React.FC<{ baseClassName: string; hashId: string }> = ({
  baseClassName,
  hashId,
}) => (
  <span className={clsx(`${baseClassName}-submenu-arrow`, hashId)} aria-hidden>
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 2.25 8.25 6 4.5 9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

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
  'role' | 'onSelect' | 'children' | 'defaultValue' | 'className' | 'style'
> & {
    className?: string;
    style?: CSSProperties;
  };

interface ProLayoutNavMenuRenderContext {
  baseClassName: string;
  hashId: string;
  mode: MenuMode;
  popupMode: boolean;
  /** 已在浮动子菜单面板内：嵌套子菜单用内联展开，避免再挂一层 popover 导致三级及以上无法展示 */
  insideSubmenuPopup: boolean;
  selectedSet: Set<string>;
  openSet: Set<string>;
  /** popup 内 inline submenu 的展开 key 集合（仅在 popup 内使用，与顶级 popupOpenKey 解耦） */
  popupInnerOpenSet: Set<string>;
  openKeysProp: (string | number)[];
  popupOpenKey: string | null;
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
    insideSubmenuPopup: boolean,
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
      <ul className={clsx(`${baseClassName}-group-list`, hashId)} role="group">
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define -- renderNode 定义在文件后部 */}
        {node.children.map((child) => renderNode(ctx, child, depth))}
      </ul>
    </li>
  );
}

/**
 * 顶级 popup（horizontal 顶栏 / 侧栏 collapsed 一级 submenu）：用 antd Popover
 * 接管「定位 / 层叠 / 进出动画 / 外部点击关闭 / 滚动跟随」，无需自实现 portal。
 *
 * 行为：
 * - trigger=['hover','click']：hover 即弹出，click 锁定开/关
 * - 受控 `open` 由 `popupOpenKey` 决定，确保**同时只有一个顶级 popup 打开**
 * - 叶子节点点击会调 `handleLeafActivate` → `setPopupOpenKey(null)`，整条层级一起关
 * - 三级及以下：不再嵌套 Popover，走 `renderInlineSubmenu` 在 panel 内 inline 展开
 */
function renderPopup(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'submenu' }>,
  depth: number,
) {
  const {
    baseClassName,
    hashId,
    mode,
    popupOpenKey,
    setPopupOpenKey,
    handleSubmenuTitleClick,
  } = ctx;
  const popupCtx: ProLayoutNavMenuRenderContext = {
    ...ctx,
    insideSubmenuPopup: true,
  };
  const isOpen = popupOpenKey === node.key;
  const hasIconClass = node.className?.includes('submenu-has-icon');

  /**
   * popup 内重置 depth 起算：popup 自身已经把当前 submenu「外移」到浮层里，
   * 浮层内第一级不应该再继承外部 inline 缩进（外部 depth 可能是 0/1/2…）。
   * - popup 内最外层 children：depth=0，无缩进；
   * - popup 内嵌套的 inline submenu/leaf：仍按 0/1/2 递增缩进。
   */
  const popupContent = (
    <ul
      role="menu"
      className={clsx(`${baseClassName}-list`, hashId)}
      data-pro-layout-nav-popup-panel
    >
      {node.children.map((child) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define -- renderNode 定义在文件后部
        return renderNode(popupCtx, child, 0);
      })}
    </ul>
  );

  return (
    <Popover
      key={node.key}
      open={isOpen}
      arrow={false}
      destroyOnHidden
      /**
       * 只用 hover 触发，**不要加 click**：
       * - 加上 click 后，Popover 自身的 click trigger 会 toggle 关闭已打开的 popup，
       *   覆盖我们 `handleSubmenuTitleClick → setPopupOpenKey(key)` 的「保持打开」语义；
       * - 关闭路径已足够：hover 离开、叶子点击（`handleLeafActivate` 里清 key）、
       *   切换到其它顶级 submenu（state 互斥）、Esc 键。
       */
      trigger="hover"
      placement={mode === 'horizontal' ? 'bottomLeft' : 'rightTop'}
      align={{ offset: mode === 'horizontal' ? [0, 4] : [4, 0] }}
      /**
       * 通过 antd Popover 原生 API 控制浮层视觉，无需在 cssinjs 里覆盖
       * `.ant-popover-inner` / `.ant-popover-content`：
       * - `classNames.root`：把 token 与列表 reset 等规则挂在 popover 根节点上
       * - `styles.container`：去掉 `.ant-popover-inner` 默认 padding，避免 inner
       *    与 content 双层 padding 叠加；
       * - `styles.content`：在 `.ant-popover-content` 上统一给 8px padding，
       *    让 popup 内部 leaf / submenu 标题有等宽的安全边距（与 SidebarMenu 一致）；
       * - `styles.root`：限制最大高度 + 滚动，避免长菜单溢出视口。
       */
      classNames={{ root: clsx(`${baseClassName}-submenu-popup`, hashId) }}
      styles={{
        container: { padding: 0 },
        content: { padding: 4, minWidth: 140 },
        root: { maxHeight: 'calc(100vh - 32px)', overflowY: 'auto' },
      }}
      onOpenChange={(next) => {
        /**
         * Popover 自管 hover/click/外部点击；这里只在「真要关闭」或者「打开当前 key」
         * 两种情况下同步 `popupOpenKey`，避免把别的 popup 状态误清。
         */
        if (next) {
          setPopupOpenKey(node.key);
        } else if (popupOpenKey === node.key) {
          setPopupOpenKey(null);
        }
      }}
      content={popupContent}
    >
      <button
        type="button"
        className={clsx(`${baseClassName}-submenu-title`, hashId, {
          [`${baseClassName}-submenu-title--open`]: isOpen,
          [`${baseClassName}-submenu-has-icon`]: hasIconClass,
        })}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(e) =>
          handleSubmenuTitleClick(node.key, node.onTitleClick, e, false)
        }
        onKeyDown={(e) => {
          if (e.key === 'Escape' && isOpen) {
            e.stopPropagation();
            setPopupOpenKey(null);
            return;
          }
          /**
           * 注意：Popover 在 trigger=click 时自身会响应 button click，这里仅处理
           * Esc 键收起；Enter/Space 让浏览器默认按钮行为触发 click 即可，避免
           * `handleSubmenuTitleClick` 与 Popover 自身 onOpenChange 双触发抖动。
           */
        }}
      >
        {node.label}
        <SubmenuArrow baseClassName={baseClassName} hashId={hashId} />
      </button>
    </Popover>
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
  /**
   * 三级及以下 submenu 的展开判定：
   * - 非 popup 模式：以受控的 `openKeysProp` 为准（openSet 已映射）
   * - popup 模式（侧栏 collapsed / horizontal）下 popup 内的内联 submenu：
   *   用独立的 `popupInnerOpenSet`，与顶级 `popupOpenKey` 解耦，避免点击三级
   *   submenu 时把顶级 popup 的 key 顶掉导致整个 popup 关闭。
   */
  const { popupInnerOpenSet, insideSubmenuPopup } = ctx;
  const isOpen =
    popupMode && insideSubmenuPopup
      ? popupInnerOpenSet.has(node.key)
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
        onClick={(e) => {
          /**
           * 阻止冒泡：popup 内的三级 submenu button 若不阻断，事件会冒到 Popover
           * 的 trigger（顶级 button）上，被 antd Popover 误判为「点击 trigger」
           * 进而关闭顶级 popup。
           */
          e.stopPropagation();
          handleSubmenuTitleClick(
            node.key,
            node.onTitleClick,
            e,
            insideSubmenuPopup,
          );
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSubmenuTitleClick(
              node.key,
              node.onTitleClick,
              e,
              insideSubmenuPopup,
            );
          }
        }}
      >
        {node.label}
        <SubmenuArrow baseClassName={baseClassName} hashId={hashId} />
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
  const rootNavRef = useRef<HTMLElement>(null);
  /**
   * `popupOpenKey`：当前打开的顶级 popup 的 key。
   * - Popover 自带定位/外部点击关闭/滚动跟随，无需再维护 placement / anchorRef
   * - 只允许同时一个顶级 popup 打开（切换 key 时会自动关闭上一个）
   */
  const [popupOpenKey, setPopupOpenKey] = useState<string | null>(() => {
    if (!popupMode || defaultOpenKeys.length === 0) return null;
    return defaultOpenKeys[0] ?? null;
  });

  /**
   * `popupInnerOpenSet`：popup 内三级 inline submenu 的展开 key 集合。
   * - 与 `popupOpenKey` 完全解耦：避免点击 popup 内的三级 submenu 时，
   *   把 `popupOpenKey` 的值顶掉、导致顶级 popup 被关闭；
   * - 顶级 popup 切换 / 关闭时（`popupOpenKey` 变化）会一并清空，
   *   下次重新打开仍是初始折叠状态。
   */
  const [popupInnerOpenSet, setPopupInnerOpenSet] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    if (!popupMode) return;
    if (defaultOpenKeys.length > 0) {
      setPopupOpenKey(defaultOpenKeys[0] ?? null);
    }
  }, [popupMode, defaultOpenKeys.join(',')]);

  /**
   * 顶级 popup 状态联动 popup 内 inline 展开：
   * - 关闭时：清空 `popupInnerOpenSet`，下次打开仍是初始折叠；
   * - 打开时：根据当前 `selectedKeys` 自动展开包含选中项的所有祖先 submenu，
   *   让用户一打开就能看到当前所在路径，无需手动点开三级。
   */
  useEffect(() => {
    if (popupOpenKey === null) {
      setPopupInnerOpenSet((prev) => (prev.size === 0 ? prev : new Set()));
      return;
    }
    const topNode = nodes.find(
      (n) => n.kind === 'submenu' && n.key === popupOpenKey,
    );
    if (!topNode || topNode.kind !== 'submenu') return;
    /**
     * 在该顶级 submenu 的子树里逐个 selectedKey 探路，把所有祖先 submenu key
     * 收进 set。注意：根 popupOpenKey 自身是顶级 popup 的状态，不属于 inner。
     */
    const next = new Set<string>();
    for (const sk of selectedKeys.map(keyToString)) {
      const ancestors = findAncestorSubmenuKeys(topNode.children, sk);
      if (ancestors) {
        for (const k of ancestors) next.add(k);
      }
    }
    setPopupInnerOpenSet((prev) => {
      if (
        prev.size === next.size &&
        [...next].every((k) => prev.has(k))
      ) {
        return prev;
      }
      return next;
    });
  }, [popupOpenKey, nodes, selectedKeys.join(',')]);

  const selectedSet = useMemo(
    () => new Set(selectedKeys.map(keyToString)),
    [selectedKeys],
  );

  const openSet = useMemo(
    () => new Set(openKeysProp.map(keyToString)),
    [openKeysProp],
  );

  const handleSubmenuTitleClick = useRefFunction(
    (
      key: string,
      onTitleClick: undefined | ((e: React.MouseEvent<Element>) => void),
      e: React.MouseEvent | React.KeyboardEvent,
      insideSubmenuPopup: boolean,
    ) => {
      e.preventDefault();
      if (onTitleClick && 'nativeEvent' in e) {
        onTitleClick(e as React.MouseEvent<Element>);
      }
      if (popupMode) {
        if (insideSubmenuPopup) {
          /**
           * popup 内的三级 inline submenu：用独立的 `popupInnerOpenSet` toggle，
           * 不动 `popupOpenKey`，避免顶级 popup 因 key 被覆盖而误关。
           */
          setPopupInnerOpenSet((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
          });
          return;
        }
        /**
         * 顶级 popup 触发器：点击只「打开」，不 toggle 关闭。
         * - 关闭交给 Popover 自身：hover 离开、Esc、叶子点击 `setPopupOpenKey(null)`；
         * - 这样反复点击同一个标题不会出现「闪关一下」的视觉抖动。
         */
        setPopupOpenKey(key);
        return;
      }
      const isOpen = openSet.has(key);
      const next = isOpen
        ? openKeysProp.filter((k) => keyToString(k) !== key)
        : [...openKeysProp.map(keyToString), key];
      onOpenChange?.(next);
    },
  );

  const handleLeafActivate = useRefFunction(
    (key: string, disabled?: boolean, onClick?: () => void) => {
      if (disabled) return;
      onClick?.();
      onSelect?.({ key, selectedKeys: [key] });
      if (popupMode) {
        setPopupOpenKey(null);
      }
    },
  );

  const renderCtx: ProLayoutNavMenuRenderContext = {
    baseClassName,
    hashId,
    mode,
    popupMode,
    insideSubmenuPopup: false,
    selectedSet,
    openSet,
    popupInnerOpenSet,
    openKeysProp,
    popupOpenKey,
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

  /**
   * popup 模式下顶级 submenu 直接渲染 `<Popover>`（不再外包 `<li>`）：
   * - Popover 内部会把 children 包成可触发元素，自带 ref 转发与事件绑定
   * - 顶栏横向布局的 `display: inline-block` 由 cssinjs 中 `${c}-submenu-title`
   *   规则承担，不依赖外层 `li`
   */
  const listBody = nodes.map((n) => {
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
