import type {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';

export type NavMenuLeafNode = {
  kind: 'item';
  key: string;
  disabled?: boolean;
  onClick?: () => void;
  label: ReactNode;
  className?: string;
};

export type NavMenuSubmenuNode = {
  kind: 'submenu';
  key: string;
  label: ReactNode;
  children: NavMenuNode[];
  className?: string;
  hasIcon?: boolean;
  onTitleClick?: (e: MouseEvent<Element>) => void;
};

export type NavMenuGroupNode = {
  kind: 'group';
  key: string;
  label: ReactNode;
  children: NavMenuNode[];
  className?: string;
};

export type NavMenuDividerNode = {
  kind: 'divider';
  key: string;
  className?: string;
  style?: CSSProperties;
};

export type NavMenuNode =
  | NavMenuLeafNode
  | NavMenuSubmenuNode
  | NavMenuGroupNode
  | NavMenuDividerNode;

/**
 * 主导航渲染模式：顶栏 `horizontal`，侧栏 `vertical`（展开与收起均如此，收起时子菜单为弹出层）。
 */
export type MenuMode = 'vertical' | 'horizontal';

/**
 * 可合并到 `ProLayoutNavMenu` 根节点 `<nav>` 上的 DOM 属性。
 */
export type ProLayoutNavMenuDomProps = Omit<
  HTMLAttributes<HTMLElement>,
  'onSelect' | 'children' | 'defaultValue'
>;

/**
 * 自研主导航项选中时回调载荷（与历史 antd Menu `onSelect` 信息字段对齐）。
 */
export interface ProLayoutNavMenuSelectInfo {
  key: string;
  selectedKeys: string[];
}
