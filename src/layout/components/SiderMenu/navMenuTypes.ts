import type { CSSProperties, MouseEvent, ReactNode } from 'react';

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
  /** 子菜单触发器可访问名称（`label` 非纯文本时使用） */
  ariaLabel?: string;
  /** 子菜单标题是否含图标（用于布局样式，优于解析 className） */
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
