import type { HTMLAttributes } from 'react';

import type {
  NavMenuDividerNode,
  NavMenuGroupNode,
  NavMenuLeafNode,
  NavMenuNode,
  NavMenuSubmenuNode,
} from './navMenuTypes';

/**
 * 主导航渲染模式：顶栏 `horizontal`，侧栏 `vertical`（展开与收起均如此，收起时子菜单为弹出层）。
 */
export type MenuMode = 'vertical' | 'horizontal';

/**
 * 可合并到 `ProLayoutNavMenu` 根节点 `<nav>` 上的 DOM 属性。
 * `ProLayout` / `BaseMenu` 的 `menuProps` 即本类型。
 */
export type ProLayoutNavMenuDomProps = Omit<
  HTMLAttributes<HTMLElement>,
  'role' | 'onSelect' | 'children' | 'defaultValue'
>;

/**
 * 自研主导航项选中时回调载荷（与历史 antd Menu `onSelect` 信息字段对齐）。
 */
export interface ProLayoutNavMenuSelectInfo {
  key: string;
  selectedKeys: string[];
}

export type {
  NavMenuDividerNode,
  NavMenuGroupNode,
  NavMenuLeafNode,
  NavMenuNode,
  NavMenuSubmenuNode,
};
