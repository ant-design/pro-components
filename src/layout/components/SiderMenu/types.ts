import type { HTMLAttributes } from 'react';

import type {
  NavMenuDividerNode,
  NavMenuGroupNode,
  NavMenuLeafNode,
  NavMenuNode,
  NavMenuSubmenuNode,
} from './navMenuTypes';

/**
 * 主导航渲染模式（与历史 antd Menu `mode` 命名对齐）。
 */
export type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

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
