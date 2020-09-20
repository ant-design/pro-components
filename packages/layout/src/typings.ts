import * as H from 'history';

import { RouteComponentProps as BasicRouteProps, match } from 'react-router-dom';

import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: H.LocationDescriptor;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
}

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  locale?: string | false;
  name?: string;
  key?: string;

  /**
   * disable 菜单选项
   */
  disabled?: boolean;
  path?: string;
  [key: string]: any;
  parentKeys?: string[];
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
