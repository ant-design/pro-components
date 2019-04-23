import React from 'react';
import * as H from 'history';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: H.LocationDescriptor;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
}
export class Link extends React.Component<LinkProps, any> {}

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

import {
  RouteComponentProps as BasicRouteProps,
  RouteProps,
  match,
} from 'react-router-dom';

type IncludeRoute = 'component' | 'exact' | 'path';

type RouteType = Pick<RouteProps, IncludeRoute>;

export interface RouterTypes<T extends Object = {}, P = {}>
  extends BasicRouteProps {
  computedMatch?: match<P>;
  route?: RouteType & T;
}

export interface MessageDescriptor {
  id: string;
  description?: string;
  defaultMessage?: string;
}

declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
