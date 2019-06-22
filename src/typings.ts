import * as H from 'history';

import {
  RouteComponentProps as BasicRouteProps,
  RouteProps,
  match,
} from 'react-router-dom';

import React from 'react';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: H.LocationDescriptor;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
}

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
export type WithFalse<T> = T | false;

type IncludeRoute = 'component' | 'exact' | 'path';

type RouteType = Pick<RouteProps, IncludeRoute>;

export interface RouterTypes<T extends Record<string, any> = {}, P = {}>
  extends Omit<BasicRouteProps, 'location'> {
  computedMatch?: match<P>;
  route?: RouteType & T;
  location: BasicRouteProps['location'] | typeof window.location;
}

export interface MessageDescriptor {
  id: any;
  description?: string;
  defaultMessage?: string;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
