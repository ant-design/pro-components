import { EllipsisOutlined } from '@ant-design/icons';
import { ConfigProvider, Popover } from 'antd';
import { clsx } from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRefFunction } from '../../../utils';
import { navVar } from './style/menu';
import type { MenuMode, NavMenuNode, ProLayoutNavMenuSelectInfo } from './types';

const MENU_INDENT_PX = 16;

/**
 * 与 `style/menu.ts` 中 `navVar.itemPadInline` 默认一致。嵌套缩进必须算在 `<button>` 的
 * `padding-inline-start` 里，不能写在外层 `<li>`：`li` 的 padding 区不在 button 盒内，
 * 用户点到「行左侧空白」时既无 hover 也无点击，体感像只有文字/icon 可点。
 */
const NAV_ITEM_PAD_INLINE_FALLBACK = `var(${navVar.itemPadInline}, 8px)`;

function itemMenuDepthIndentStyle(depth: number): CSSProperties | undefined {
  if (depth <= 0) return undefined;
  return {
    paddingInlineStart: `calc(${depth * MENU_INDENT_PX}px + ${NAV_ITEM_PAD_INLINE_FALLBACK})`,
  };
}

/**
 * 横栏 popup / 侧向 flyout 内：`renderInlineSubmenu` / `OverflowVerticalSubmenu` 会给第一层
 * leaf 传 `depth=1`，若仍按 16px/级缩进，会与 Popover `content` 内边距叠加，首行左侧显得
 * 过空、icon 与左缘不协调。与 `renderPopup` 将 panel 内子树从 `depth=0` 起算的语义对齐：
 * 仅 horizontal + 已在 submenu 浮层内时，把用于 `padding-inline-start` 的层级减一档；
 * 竖向侧栏 popup 等场景不改变原有缩进。
 */
function effectiveItemMenuIndentDepth(
  ctx: Pick<ProLayoutNavMenuRenderContext, 'mode' | 'insideSubmenuPopup'>,
  depth: number,
): number {
  if (ctx.mode === 'horizontal' && ctx.insideSubmenuPopup && depth > 0) {
    return depth - 1;
  }
  return depth;
}

const keyToString = (key: string | number) => String(key);

/**
 * `menuItemRender` 常见写法：
 * - `<Link>` / `<a href>` 默认 `inline(-flex)` 往往不铺满 `${c}-item-button`；
 * - 官方 demo 用 `<div role="button" onClick={...}>` 包一层；
 * - 也有人只写 `<div onClick={...}>` 忘加 `role` / 不用 `<a>`。
 * `closest('a[href]')` 只向上找祖先，点在行右侧空白时 `event.target` 常落在 `item-button`
 * 或外层 `item-title` 上。用 `eventTarget` 判断：若点击点已落在业务根子树内则不再 `.click()`，
 * 避免点在文案上时双触发。
 */
function tryDelegateLeafRowPrimaryAction(
  root: Element | null,
  eventTarget: EventTarget | null,
) {
  if (!root?.querySelector) return;
  const hit = eventTarget instanceof Node ? eventTarget : null;

  const anchor = root.querySelector(
    'a[href]:not([href^="javascript:"])',
  ) as HTMLAnchorElement | null;
  if (anchor) {
    if (!hit || !anchor.contains(hit)) {
      anchor.click();
    }
    return;
  }

  const roleButton = root.querySelector(
    '[role="button"]',
  ) as HTMLElement | null;
  if (roleButton) {
    if (!hit || !roleButton.contains(hit)) {
      roleButton.click();
    }
    return;
  }

  const titleHost = root.querySelector(
    '[data-testid="pro-layout-nav-menu-item-title"]',
  );
  const primary =
    titleHost?.firstElementChild instanceof HTMLElement
      ? titleHost.firstElementChild
      : null;
  if (!primary || primary.tagName === 'A' || primary.tagName === 'BUTTON') {
    return;
  }
  if (hit && primary.contains(hit)) {
    return;
  }
  primary.click();
}

/** 顶栏「更多」触发器预留宽度，与一级 submenu 标题按钮同量级，略宽于图标避免边界误判 */
const HORIZONTAL_OVERFLOW_MORE_RESERVE_PX = 48;

/**
 * 收集所有「包含选中子项」的 submenu key：递归遍历 nodes 子树，
 * 任一后代 leaf 命中 `selectedSet` 则其所有祖先 submenu key 进入结果集。
 *
 * 用途：给 submenu `<li>` 挂 `--child-selected` 类，让 CSS 可通过
 * `colorTextSubMenuSelected` token 高亮包含选中项的 submenu 标题。
 */
function collectSubmenusWithSelectedChild(
  nodes: NavMenuNode[],
  selectedSet: Set<string>,
): Set<string> {
  const result = new Set<string>();
  function walk(children: NavMenuNode[]): boolean {
    let hit = false;
    for (const node of children) {
      if (node.kind === 'item') {
        if (selectedSet.has(node.key)) hit = true;
      } else if (node.kind === 'submenu') {
        if (walk(node.children)) {
          result.add(node.key);
          hit = true;
        }
      } else if (node.kind === 'group') {
        if (walk(node.children)) hit = true;
      }
    }
    return hit;
  }
  walk(nodes);
  return result;
}

function navNodesSubtreeHasSelectedLeaf(
  nodes: NavMenuNode[],
  selectedSet: Set<string>,
): boolean {
  for (const node of nodes) {
    if (node.kind === 'item' && selectedSet.has(node.key)) {
      return true;
    }
    if (node.kind === 'submenu' || node.kind === 'group') {
      if (navNodesSubtreeHasSelectedLeaf(node.children, selectedSet)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * 根据离屏测量的各一级项宽度，计算主栏能放下几个一级项（其余进「更多」）。
 * 返回值为「可见」的一级项个数；为 `nodeCount` 表示无需「更多」。
 */
function computeHorizontalOverflowFromIndex(
  widths: number[],
  nodeCount: number,
  containerWidth: number,
  gapPx: number,
  moreReserved: number,
): number {
  if (nodeCount === 0 || widths.length !== nodeCount) return nodeCount;
  if (containerWidth <= 0) return nodeCount;
  for (let k = nodeCount; k >= 0; k -= 1) {
    const needMore = k < nodeCount;
    const gapsBetween = k <= 1 ? 0 : (k - 1) * gapPx;
    const itemsW =
      widths.slice(0, k).reduce((sum, w) => sum + w, 0) + gapsBetween;
    const total = itemsW + (needMore ? gapPx + moreReserved : 0);
    if (total <= containerWidth) return k;
  }
  return 0;
}

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
  <span
    className={clsx(`${baseClassName}-submenu-arrow`, hashId)}
    aria-hidden
    data-testid="pro-layout-nav-menu-submenu-arrow"
  >
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
    'data-testid'?: string;
  };

interface ProLayoutNavMenuRenderContext {
  baseClassName: string;
  hashId: string;
  mode: MenuMode;
  popupMode: boolean;
  /** 已在浮动子菜单面板内：嵌套子菜单用内联展开，避免再挂一层 popover 导致三级及以上无法展示 */
  insideSubmenuPopup: boolean;
  selectedSet: Set<string>;
  /** 包含选中子项的 submenu key 集合，用于挂 `--child-selected` 类 */
  subMenuSelectedSet: Set<string>;
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
  /** 文档方向：侧向子菜单 `placement` 镜像用 */
  layoutDirection?: 'ltr' | 'rtl';
  /**
   * 顶栏水平菜单渲染模式：
   * - `'normal'`（默认）：正常渲染，popup inline 展开
   * - `'overflow'`：顶栏「更多」弹出区域，子菜单走 vertical 侧向浮层
   * - `'measure'`：离屏测宽 nav，不打开任何 Popover 以避免与真实顶栏冲突
   */
  horizontalNavMode?: 'normal' | 'overflow' | 'measure';
}

type NodeRender = (
  ctx: ProLayoutNavMenuRenderContext,
  node: NavMenuNode,
  depth: number,
) => React.ReactNode;

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
      data-testid="pro-layout-nav-menu-divider"
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
   * 外层 `li` 承担列表/role 语义，内层 `div[role=menuitem]` 承担可聚焦/可点击行为。
   * 使用 `<div>` 而非 `<button>`：`menuItemRender` 可能返回 `<a>` / `<Link>`，
   * `<a>` 嵌套在 `<button>` 内是无效 HTML，浏览器会拆分 DOM 导致点击事件丢失。
   * 键盘可达性通过 `tabIndex` + `onKeyDown` 保持。
   *
   * 点击激活写在 `li` 上：`item-button` 在 flex 布局下右侧常有一块「无子节点」的空白，
   * 仅绑在 inner div 时，部分浏览器命中子树边缘会只触发 hover 样式却走不到 `onClick`；
   * 由 `li` 冒泡统一承接，并跳过 label 内嵌的 `<a>` / `<button>` 以免双触发。
   * 行内 `<a href>` / `role="button"` / 仅 `div onClick` 未铺满时，点在 `item-button` 空白区需委托
   * `tryDelegateLeafRowPrimaryAction`；点在已包裹的交互控件上则不再委托，避免双触发。
   */
  return (
    <li
      key={node.key}
      data-pro-layout-nav-leaf
      role="none"
      className={clsx(`${baseClassName}-item`, hashId, node.className, {
        [`${baseClassName}-item--selected`]: selected,
        [`${baseClassName}-item--disabled`]: disabled,
      })}
      data-testid="pro-layout-nav-menu-item"
      aria-disabled={disabled || undefined}
      aria-selected={selected || undefined}
      style={disabled ? undefined : { cursor: 'pointer' }}
      onClick={(e) => {
        if (disabled) return;
        const el = e.target as HTMLElement | null;
        if (el?.closest?.('a[href],button,[role="link"]')) return;
        if (!el?.closest?.('[role="button"]')) {
          tryDelegateLeafRowPrimaryAction(
            e.currentTarget as HTMLElement,
            e.target,
          );
        }
        handleLeafActivate(node.key, disabled, node.onClick);
      }}
    >
      <div
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={clsx(`${baseClassName}-item-button`, hashId)}
        data-testid="pro-layout-nav-menu-item-button"
        style={itemMenuDepthIndentStyle(
          effectiveItemMenuIndentDepth(ctx, depth),
        )}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const leafLi = (e.currentTarget as HTMLElement).closest?.(
              '[data-pro-layout-nav-leaf]',
            );
            tryDelegateLeafRowPrimaryAction(leafLi, e.target);
            handleLeafActivate(node.key, disabled, node.onClick);
          }
        }}
      >
        {/**
         * 用 `<span class="item-title">` 包裹 label，与 submenu button 行为一致：
         * - 让 CSS `:first-child` / `${c}-item-title` 选择器能稳定命中；
         * - 收起态可通过 `${c}-item-title { width: collapsedItemSize; overflow: hidden }`
         *   实现「首字 chip」风格，无需关心业务侧 label 的内部 DOM 结构。
         */}
        <span
          className={clsx(`${baseClassName}-item-title`, hashId)}
          data-testid="pro-layout-nav-menu-item-title"
        >
          {node.label}
        </span>
      </div>
    </li>
  );
}

function renderGroup(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'group' }>,
  depth: number,
  nodeRender: NodeRender,
) {
  const { baseClassName, hashId } = ctx;
  return (
    <li
      key={node.key}
      className={clsx(`${baseClassName}-group`, hashId, node.className)}
      data-testid="pro-layout-nav-menu-group"
      role="presentation"
    >
      <h3
        className={clsx(`${baseClassName}-group-title`, hashId)}
        data-pro-layout-nav-group-title
        data-testid="pro-layout-nav-menu-group-title"
      >
        {node.label}
      </h3>
      <ul
        className={clsx(`${baseClassName}-group-list`, hashId)}
        role="group"
        data-testid="pro-layout-nav-menu-group-list"
      >
        {node.children.map((child) => nodeRender(ctx, child, depth))}
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
  _depth: number,
  nodeRender: NodeRender,
) {
  const {
    baseClassName,
    hashId,
    mode,
    subMenuSelectedSet,
    popupOpenKey,
    setPopupOpenKey,
    handleSubmenuTitleClick,
  } = ctx;
  const measureNav = ctx.horizontalNavMode === 'measure';
  const popupCtx: ProLayoutNavMenuRenderContext = {
    ...ctx,
    insideSubmenuPopup: true,
  };
  const isOpen = !measureNav && popupOpenKey === node.key;
  const hasIcon = !!node.hasIcon;

  const popupContent = (
    <ul
      role="menu"
      className={clsx(`${baseClassName}-list`, hashId)}
      data-pro-layout-nav-popup-panel
      data-testid="pro-layout-nav-menu-popup-list"
    >
      {node.children.map((child) => nodeRender(popupCtx, child, 0))}
    </ul>
  );

  return (
    /**
     * 外层 `<li role="none">`：根 `<nav role="menu">` 的子节点必须是
     * `role="none"` 的 `<li>` 才符合 WAI-ARIA 菜单结构（真正的 `menuitem`
     * 由 Popover 内的 `<button>` 承担）。少了这一层会导致 a11y 检查报错、
     * 屏幕阅读器把 popover wrapper 误读为通用容器。
     */
    <li
      key={node.key}
      role="none"
      data-pro-layout-nav-submenu
      data-pro-layout-nav-submenu-open={isOpen || undefined}
      className={clsx(`${baseClassName}-submenu`, hashId, node.className, {
        [`${baseClassName}-submenu-open`]: isOpen,
        [`${baseClassName}-submenu-has-icon`]: hasIcon,
        [`${baseClassName}-submenu--child-selected`]: subMenuSelectedSet.has(
          node.key,
        ),
      })}
      data-testid="pro-layout-nav-menu-popup-submenu"
    >
      <Popover
        open={isOpen}
        arrow={false}
        destroyOnHidden
        /**
         * 只用 hover 触发，**不要加 click**：
         * - 加上 click 后，Popover 自身的 click trigger 会 toggle 关闭已打开的 popup，
         *   覆盖我们 `handleSubmenuTitleClick → setPopupOpenKey(key)` 的「保持打开」语义；
         * - 关闭路径已足够：Popover 自带 `mouseLeaveDelay`、叶子点击（`handleLeafActivate` 清 key）、
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
          if (measureNav) return;
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
            [`${baseClassName}-submenu-has-icon`]: hasIcon,
          })}
          data-testid="pro-layout-nav-menu-popup-submenu-title"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={(e) => {
            if (measureNav) {
              e.preventDefault();
              return;
            }
            handleSubmenuTitleClick(node.key, node.onTitleClick, e, false);
          }}
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
          {/**
           * 必须用 `<span>` 包裹 label，让 CSS `:first-child` 命中这个 element：
           * - `{node.label}` 若是字符串会渲染为 Text Node，CSS 的 `:first-child`
           *   只匹配 element child，会跳过文本节点直接命中 `<SubmenuArrow>`，
           *   导致 arrow 被 `flex:1` 撑满整个 button、label 被挤没。
           */}
          <span
            className={clsx(`${baseClassName}-item-title`, hashId)}
            data-testid="pro-layout-nav-menu-item-title"
          >
            {node.label}
          </span>
          <SubmenuArrow baseClassName={baseClassName} hashId={hashId} />
        </button>
      </Popover>
    </li>
  );
}

function renderInlineSubmenu(
  ctx: ProLayoutNavMenuRenderContext,
  node: Extract<NavMenuNode, { kind: 'submenu' }>,
  depth: number,
  nodeRender: NodeRender,
) {
  const {
    baseClassName,
    hashId,
    openSet,
    subMenuSelectedSet,
    popupMode,
    handleSubmenuTitleClick,
  } = ctx;
  /**
   * 三级及以下 submenu 的展开判定：
   * - 非 popup 模式：以受控的 `openKeysProp` 为准（`openSet` 已映射）；
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
   * 二级、三级缩进写在 `<button>` 上（与 leaf 一致），避免外层 `li` padding 成为不可交互死区。
   */
  return (
    <li
      key={node.key}
      data-pro-layout-nav-submenu
      data-pro-layout-nav-submenu-open={isOpen || undefined}
      className={clsx(`${baseClassName}-submenu`, hashId, node.className, {
        [`${baseClassName}-submenu-open`]: isOpen,
        [`${baseClassName}-submenu--child-selected`]: subMenuSelectedSet.has(
          node.key,
        ),
      })}
      data-testid="pro-layout-nav-menu-submenu"
      role="none"
    >
      <button
        type="button"
        className={clsx(`${baseClassName}-submenu-title`, hashId, {
          [`${baseClassName}-submenu-title--open`]: isOpen,
        })}
        style={itemMenuDepthIndentStyle(
          effectiveItemMenuIndentDepth(ctx, depth),
        )}
        data-testid="pro-layout-nav-menu-submenu-title"
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
        {/** 同 renderPopup：用 span 包裹让 `:first-child` 命中文字容器 */}
        <span
          className={clsx(`${baseClassName}-item-title`, hashId)}
          data-testid="pro-layout-nav-menu-item-title"
        >
          {node.label}
        </span>
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
          data-testid="pro-layout-nav-menu-submenu-children"
        >
          {node.children.map((child) => nodeRender(ctx, child, depth + 1))}
        </ul>
      ) : null}
    </li>
  );
}

const renderNode: NodeRender = (ctx, node, depth) => {
  switch (node.kind) {
    case 'divider':
      return renderDivider(ctx, node);
    case 'item':
      return renderLeaf(ctx, node, depth);
    case 'group':
      return renderGroup(ctx, node, depth, renderNode);
    case 'submenu':
      if (ctx.popupMode && !ctx.insideSubmenuPopup) {
        return renderPopup(ctx, node, depth, renderNode);
      }
      if (
        ctx.popupMode &&
        ctx.insideSubmenuPopup &&
        ctx.horizontalNavMode === 'overflow'
      ) {
        return (
          <OverflowVerticalSubmenu
            key={node.key}
            ctx={ctx}
            node={node}
            depth={depth}
            nodeRender={renderNode}
          />
        );
      }
      return renderInlineSubmenu(ctx, node, depth, renderNode);
    default:
      return null;
  }
};

/**
 * 顶栏「更多」内及侧向子层：对齐 antd Menu `mode="vertical"`，子级以侧向 Popover 展开，
 * 不在当前列 inline 撑开。
 */
function OverflowVerticalSubmenu({
  ctx,
  node,
  depth,
  nodeRender,
}: {
  ctx: ProLayoutNavMenuRenderContext;
  node: Extract<NavMenuNode, { kind: 'submenu' }>;
  depth: number;
  nodeRender: NodeRender;
}) {
  const {
    baseClassName,
    hashId,
    subMenuSelectedSet,
    layoutDirection = 'ltr',
  } = ctx;
  const isRtl = layoutDirection === 'rtl';
  const placement = isRtl ? ('leftTop' as const) : ('rightTop' as const);
  const alignOffset: [number, number] = isRtl ? [-4, 0] : [4, 0];
  const hasIcon = !!node.hasIcon;

  const [flyoutOpen, setFlyoutOpen] = useState(false);

  const flyoutRenderCtx: ProLayoutNavMenuRenderContext = {
    ...ctx,
    insideSubmenuPopup: true,
    horizontalNavMode: 'overflow',
  };

  const flyoutContent = (
    <ul
      role="menu"
      className={clsx(`${baseClassName}-list`, hashId)}
      data-pro-layout-nav-popup-panel
      data-pro-layout-nav-horizontal-overflow-flyout-panel
      data-testid="pro-layout-nav-menu-overflow-vertical-flyout-list"
    >
      {node.children.map((child) =>
        nodeRender(flyoutRenderCtx, child, depth + 1),
      )}
    </ul>
  );

  return (
    <li
      role="none"
      data-pro-layout-nav-submenu
      data-pro-layout-nav-submenu-open={flyoutOpen || undefined}
      className={clsx(
        `${baseClassName}-submenu`,
        `${baseClassName}-submenu--overflow-vertical-flyout`,
        hashId,
        node.className,
        {
          [`${baseClassName}-submenu-open`]: flyoutOpen,
          [`${baseClassName}-submenu-has-icon`]: hasIcon,
          [`${baseClassName}-submenu--child-selected`]: subMenuSelectedSet.has(
            node.key,
          ),
        },
      )}
      data-testid="pro-layout-nav-menu-overflow-vertical-flyout-submenu"
    >
      <Popover
        open={flyoutOpen}
        onOpenChange={setFlyoutOpen}
        arrow={false}
        trigger={['hover', 'focus']}
        placement={placement}
        align={{ offset: alignOffset }}
        destroyOnHidden
        classNames={{ root: clsx(`${baseClassName}-submenu-popup`, hashId) }}
        styles={{
          container: { padding: 0 },
          content: { padding: 4, minWidth: 140 },
          root: { maxHeight: 'calc(100vh - 32px)', overflowY: 'auto' },
        }}
        content={flyoutContent}
      >
        <button
          type="button"
          className={clsx(`${baseClassName}-submenu-title`, hashId, {
            [`${baseClassName}-submenu-title--open`]: flyoutOpen,
            [`${baseClassName}-submenu-has-icon`]: hasIcon,
          })}
          style={itemMenuDepthIndentStyle(depth)}
          data-testid="pro-layout-nav-menu-overflow-vertical-flyout-submenu-title"
          aria-expanded={flyoutOpen}
          aria-haspopup="true"
          onClick={(e) => {
            e.stopPropagation();
            node.onTitleClick?.(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && flyoutOpen) {
              e.stopPropagation();
              setFlyoutOpen(false);
              return;
            }
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              setFlyoutOpen((open) => !open);
            }
          }}
        >
          <span
            className={clsx(`${baseClassName}-item-title`, hashId)}
            data-testid="pro-layout-nav-menu-item-title"
          >
            {node.label}
          </span>
          <SubmenuArrow baseClassName={baseClassName} hashId={hashId} />
        </button>
      </Popover>
    </li>
  );
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
  const isHorizontalMode = mode === 'horizontal';
  const { direction } = useContext(ConfigProvider.ConfigContext);
  const rootNavRef = useRef<HTMLElement>(null);
  const measureNavRef = useRef<HTMLElement>(null);
  const [horizontalOverflowOpen, setHorizontalOverflowOpen] = useState(false);
  const [overflowFromIndex, setOverflowFromIndex] = useState(
    () => nodes.length,
  );
  const [horizontalResizeTick, setHorizontalResizeTick] = useState(0);
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

  /**
   * 用 `\u0001` 这种**不可能出现在业务 key 中的字符**做分隔符做依赖签名，
   * 避免 `['a,b']` 与 `['a', 'b']` 在 `.join(',')` 后字符串相同 → 漏触发副作用。
   */
  const defaultOpenKeysSig = useMemo(
    () => defaultOpenKeys.join('\u0001'),
    [defaultOpenKeys],
  );
  const selectedKeysSig = useMemo(
    () => selectedKeys.join('\u0001'),
    [selectedKeys],
  );

  const nodesLayoutKey = useMemo(
    () => nodes.map((n) => n.key).join('\u0001'),
    [nodes],
  );

  const measureNavStyle = useMemo((): CSSProperties => {
    if (!style) {
      return { width: 'max-content', maxWidth: 'none' };
    }
    const { width: _w, maxWidth: _mw, ...rest } = style;
    return { ...rest, width: 'max-content', maxWidth: 'none' };
  }, [style]);

  useEffect(() => {
    if (popupOpenKey !== null) {
      setHorizontalOverflowOpen(false);
    }
  }, [popupOpenKey]);

  useEffect(() => {
    if (!popupMode) return;
    if (defaultOpenKeys.length > 0) {
      setPopupOpenKey(defaultOpenKeys[0] ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 用 `defaultOpenKeysSig` 等价签名替代数组引用
  }, [popupMode, defaultOpenKeysSig]);

  /**
   * 「更多」浮层：打开时清空 `popupInnerOpenSet`（侧栏收起 popup 内 inline 展开态与
   * 本组件共享该 set；打开「更多」时归零，避免串状态）。顶栏「更多」内子菜单已改侧向
   * 浮层，不再依赖该 set。
   */
  useEffect(() => {
    if (!horizontalOverflowOpen) return;
    setPopupInnerOpenSet(new Set());
  }, [horizontalOverflowOpen]);

  /**
   * 顶级 popup（非「更多」）联动 popup 内 inline 展开：
   * - 关闭时：清空 `popupInnerOpenSet`；
   * - 打开时：按 `selectedKeys` 自动展开包含选中项的祖先 submenu，便于直接看到当前路径。
   *
   * 「更多」打开期间本 effect 不写入 inner set（由上一段 effect 仅在 open 时清空），避免
   * 与用户在面板内的手动展开/收起打架。
   */
  useEffect(() => {
    if (horizontalOverflowOpen) {
      return;
    }
    if (popupOpenKey !== null) {
      const topNode = nodes.find(
        (n) => n.kind === 'submenu' && n.key === popupOpenKey,
      );
      if (!topNode || topNode.kind !== 'submenu') return;
      const next = new Set<string>();
      for (const sk of selectedKeys.map(keyToString)) {
        const ancestors = findAncestorSubmenuKeys(topNode.children, sk);
        if (ancestors) {
          for (const k of ancestors) next.add(k);
        }
      }
      setPopupInnerOpenSet((prev) => {
        if (prev.size === next.size && [...next].every((k) => prev.has(k)))
          return prev;
        return next;
      });
      return;
    }

    setPopupInnerOpenSet((prev) => (prev.size === 0 ? prev : new Set()));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `selectedKeysSig` 已是 selectedKeys 的稳定签名
  }, [popupOpenKey, horizontalOverflowOpen, nodes, selectedKeysSig]);

  const selectedSet = useMemo(
    () => new Set(selectedKeys.map(keyToString)),
    [selectedKeys],
  );

  const subMenuSelectedSet = useMemo(
    () => collectSubmenusWithSelectedChild(nodes, selectedSet),
    [nodes, selectedSet],
  );

  const openSet = useMemo(
    () => new Set(openKeysProp.map(keyToString)),
    [openKeysProp],
  );

  useLayoutEffect(() => {
    if (!isHorizontalMode) {
      setHorizontalOverflowOpen(false);
      setOverflowFromIndex(nodes.length);
      return;
    }
    if (nodes.length === 0) {
      setOverflowFromIndex(0);
      return;
    }
    const measure = measureNavRef.current;
    const nav = rootNavRef.current;
    if (!measure || !nav) return;
    const lis = [...measure.querySelectorAll(':scope > li')];
    if (lis.length !== nodes.length) return;
    const widths = lis.map((el) => el.getBoundingClientRect().width);
    const gapPx = parseFloat(getComputedStyle(measure).gap) || 0;
    const cw = nav.clientWidth;
    if (cw <= 0) return;
    const next = computeHorizontalOverflowFromIndex(
      widths,
      nodes.length,
      cw,
      gapPx,
      HORIZONTAL_OVERFLOW_MORE_RESERVE_PX,
    );
    setOverflowFromIndex((prev) => (prev === next ? prev : next));
  }, [isHorizontalMode, nodes.length, nodesLayoutKey, horizontalResizeTick]);

  useEffect(() => {
    if (!isHorizontalMode) return;
    const nav = rootNavRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(() => {
      setHorizontalResizeTick((t) => t + 1);
    });
    ro.observe(nav);
    return () => ro.disconnect();
  }, [isHorizontalMode]);

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
        setHorizontalOverflowOpen(false);
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
      setHorizontalOverflowOpen(false);
    },
  );

  const layoutDirection = direction === 'rtl' ? 'rtl' : 'ltr';

  const renderCtx: ProLayoutNavMenuRenderContext = {
    baseClassName,
    hashId,
    mode,
    popupMode,
    insideSubmenuPopup: false,
    layoutDirection,
    selectedSet,
    subMenuSelectedSet,
    openSet,
    popupInnerOpenSet,
    openKeysProp,
    popupOpenKey,
    setPopupOpenKey,
    handleLeafActivate,
    handleSubmenuTitleClick,
  };

  const listClassName = clsx(
    `${baseClassName}-list`,
    !isHorizontalMode && `${baseClassName}-list--root`,
    hashId,
  );

  /**
   * popup 模式下顶级 submenu 直接渲染 `<Popover>`（不再外包 `<li>`）：
   * - Popover 内部会把 children 包成可触发元素，自带 ref 转发与事件绑定
   * - 顶栏横向布局的 `display: inline-block` 由 cssinjs 中 `${c}-submenu-title`
   *   规则承担，不依赖外层 `li`
   */
  const listBody = nodes.map((n) => renderNode(renderCtx, n, 0));

  if (isHorizontalMode) {
    const visibleNodes = nodes.slice(0, overflowFromIndex);
    const overflowNodes = nodes.slice(overflowFromIndex);
    const measureRenderCtx: ProLayoutNavMenuRenderContext = {
      ...renderCtx,
      horizontalNavMode: 'measure',
    };
    const overflowCtx: ProLayoutNavMenuRenderContext = {
      ...renderCtx,
      insideSubmenuPopup: true,
      horizontalNavMode: 'overflow',
    };
    const overflowHighlight =
      overflowNodes.length > 0 &&
      navNodesSubtreeHasSelectedLeaf(overflowNodes, selectedSet);

    const overflowPanel = (
      <ul
        role="menu"
        className={clsx(`${baseClassName}-list`, hashId)}
        data-pro-layout-nav-popup-panel
        data-pro-layout-nav-horizontal-overflow-panel
        data-testid="pro-layout-nav-menu-horizontal-overflow-list"
      >
        {overflowNodes.map((child) => renderNode(overflowCtx, child, 0))}
      </ul>
    );

    return (
      <>
        {nodes.length > 0 ? (
          <nav
            ref={measureNavRef}
            data-pro-layout-horizontal-measure=""
            aria-hidden
            tabIndex={-1}
            className={clsx(className, hashId, baseClassName, listClassName, {
              [`${baseClassName}--horizontal`]: true,
              [`${baseClassName}--collapsed`]: !!collapsed,
            })}
            style={measureNavStyle}
            role="presentation"
          >
            {nodes.map((n) => renderNode(measureRenderCtx, n, 0))}
          </nav>
        ) : null}
        <nav
          ref={rootNavRef}
          data-pro-layout-nav-root
          {...restNavProps}
          className={clsx(className, hashId, baseClassName, listClassName, {
            [`${baseClassName}--horizontal`]: true,
            [`${baseClassName}--collapsed`]: !!collapsed,
          })}
          data-testid={restNavProps['data-testid'] || 'pro-layout-nav-menu'}
          style={style}
          role="menubar"
        >
          {visibleNodes.map((n) => renderNode(renderCtx, n, 0))}
          {overflowNodes.length > 0 ? (
            <li
              key="__pro_layout_horizontal_overflow__"
              role="none"
              className={clsx(`${baseClassName}-overflow-more`, hashId, {
                [`${baseClassName}-submenu--child-selected`]: overflowHighlight,
              })}
              data-testid="pro-layout-nav-menu-horizontal-overflow"
            >
              <Popover
                open={horizontalOverflowOpen}
                arrow={false}
                destroyOnHidden
                trigger="hover"
                /** 浮层在「更多」左侧展开（LTR：`bottomLeft`）；RTL 镜像为 `bottomRight` */
                placement={direction === 'rtl' ? 'bottomRight' : 'bottomLeft'}
                align={{
                  offset: [0, 4],
                  overflow: { adjustX: true, adjustY: true },
                }}
                classNames={{
                  root: clsx(`${baseClassName}-submenu-popup`, hashId),
                }}
                styles={{
                  container: { padding: 0 },
                  content: { padding: 4, minWidth: 140 },
                  root: {
                    maxHeight: 'calc(100vh - 32px)',
                    overflowY: 'auto',
                    transformOrigin:
                      direction === 'rtl' ? 'top right' : 'top left',
                  },
                }}
                onOpenChange={(next) => {
                  setHorizontalOverflowOpen(next);
                  if (next) {
                    setPopupOpenKey(null);
                  }
                }}
                content={overflowPanel}
              >
                <button
                  type="button"
                  className={clsx(`${baseClassName}-submenu-title`, hashId, {
                    [`${baseClassName}-submenu-title--open`]:
                      horizontalOverflowOpen,
                  })}
                  aria-expanded={horizontalOverflowOpen}
                  aria-haspopup="true"
                  aria-label="展开更多一级菜单"
                  title="更多"
                  data-testid="pro-layout-nav-menu-horizontal-overflow-trigger"
                  onClick={(e) => e.preventDefault()}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape' && horizontalOverflowOpen) {
                      e.stopPropagation();
                      setHorizontalOverflowOpen(false);
                    }
                  }}
                >
                  <span
                    className={clsx(`${baseClassName}-item-title`, hashId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <EllipsisOutlined />
                  </span>
                </button>
              </Popover>
            </li>
          ) : null}
        </nav>
      </>
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
      data-testid={restNavProps['data-testid'] || 'pro-layout-nav-menu'}
      style={style}
      role="menu"
    >
      {listBody}
    </nav>
  );
};

