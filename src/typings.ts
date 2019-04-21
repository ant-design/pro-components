declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
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
