import * as H from 'history';

import { RouteComponentProps as BasicRouteProps, match } from 'react-router-dom';

import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: H.LocationDescriptor;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
}

export interface MenuDataItem {
  /**
   * @name 子菜单
   */
  children?: MenuDataItem[];
  /**
   * @name 在菜单中隐藏子节点
   */
  hideChildrenInMenu?: boolean;
  /**
   * @name 在菜单中隐藏自己和子节点
   */
  hideInMenu?: boolean;
  /**
   * @name 菜单的icon
   */
  icon?: React.ReactNode;
  /**
   * @name 自定义菜单的国际化 key
   */
  locale?: string | false;
  /**
   * @name 菜单的名字
   */
  name?: string;
  /**
   * @name 用于标定选中的值，默认是 path
   */
  key?: string;
  /**
   * @name disable 菜单选项
   */
  disabled?: boolean;
  /**
   * @name 路径
   */
  path?: string;
  /**
   * @name 自定义父节点
   * @description 当此节点被选中的时候也会选中 parentKeys 的节点
   */
  parentKeys?: string[];
  /**
   * @name 隐藏自己，并且将子节点提升到与自己平级
   */
  flatMenu?: boolean;

  [key: string]: any;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
export type WithFalse<T> = T | false;

export interface RouterTypes<P> extends Omit<BasicRouteProps, 'location'> {
  computedMatch?: match<P>;
  route?: Route;
  location: BasicRouteProps['location'] | { pathname?: string };
}

export interface MessageDescriptor {
  id: any;
  description?: string;
  defaultMessage?: string;
}
