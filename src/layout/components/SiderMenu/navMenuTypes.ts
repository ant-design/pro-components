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
