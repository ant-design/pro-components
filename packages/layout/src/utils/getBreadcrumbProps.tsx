import type H from 'history';
import type { BreadcrumbProps as AntdBreadcrumbProps } from 'antd';
import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { isBrowser } from '@ant-design/pro-utils';

import type { ProSettings } from '../defaultSettings';
import type { MenuDataItem, MessageDescriptor, WithFalse } from '../typings';
import { urlToList } from './pathTools';

export type BreadcrumbProps = {
  breadcrumbList?: { title: string; href: string }[];
  home?: string;
  location?:
    | H.Location
    | {
        pathname?: string;
      };
  menu?: ProSettings['menu'];
  breadcrumbMap?: Map<string, MenuDataItem>;
  formatMessage?: (message: MessageDescriptor) => string;
  breadcrumbRender?: WithFalse<
    (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']
  >;
  itemRender?: AntdBreadcrumbProps['itemRender'];
};

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const defaultItemRender: AntdBreadcrumbProps['itemRender'] = ({ breadcrumbName, path }) => (
  <a href={path}>{breadcrumbName}</a>
);

const renderItemLocal = (item: MenuDataItem, props: BreadcrumbProps): string => {
  const { formatMessage, menu } = props;
  if (item.locale && formatMessage && menu?.locale !== false) {
    return formatMessage({ id: item.locale, defaultMessage: item.name });
  }
  return item.name as string;
};

export const getBreadcrumb = (
  breadcrumbMap: Map<string, MenuDataItem>,
  url: string,
): MenuDataItem => {
  let breadcrumbItem = breadcrumbMap.get(url);
  if (!breadcrumbItem) {
    // Find the first matching path in the order defined by route config
    // 按照 route config 定义的顺序找到第一个匹配的路径
    const targetPath = [...breadcrumbMap.keys()].find((path) =>
      // remove ? ,不然会重复
      pathToRegexp(path.replace('?', '')).test(url),
    );
    if (targetPath) breadcrumbItem = breadcrumbMap.get(targetPath);
  }
  return breadcrumbItem || { path: '' };
};

export const getBreadcrumbFromProps = (
  props: BreadcrumbProps,
): {
  location: BreadcrumbProps['location'];
  breadcrumbMap: BreadcrumbProps['breadcrumbMap'];
} => {
  const { location, breadcrumbMap } = props;
  return {
    location,
    breadcrumbMap,
  };
};

const conversionFromLocation = (
  routerLocation: BreadcrumbProps['location'],
  breadcrumbMap: Map<string, MenuDataItem>,
  props: BreadcrumbProps,
): AntdBreadcrumbProps['routes'] => {
  // Convertor the url to an array
  const pathSnippets = urlToList(routerLocation?.pathname);
  // Loop data mosaic routing
  const extraBreadcrumbItems: AntdBreadcrumbProps['routes'] = pathSnippets
    .map((url) => {
      // For application that has configured router base
      // @ts-ignore
      const { routerBase = '/' } = isBrowser() ? window : {};
      const realPath = routerBase === '/' ? url : `${routerBase}${url}`;
      const currentBreadcrumb = getBreadcrumb(breadcrumbMap, url);
      const name = renderItemLocal(currentBreadcrumb, props);
      const { hideInBreadcrumb } = currentBreadcrumb;
      return name && !hideInBreadcrumb
        ? {
            path: realPath,
            breadcrumbName: name,
            component: currentBreadcrumb.component,
          }
        : { path: '', breadcrumbName: '' };
    })
    .filter((item) => item && item.path);

  return extraBreadcrumbItems;
};

export type BreadcrumbListReturn = Pick<
  AntdBreadcrumbProps,
  Extract<keyof AntdBreadcrumbProps, 'routes' | 'itemRender'>
>;

/** 将参数转化为面包屑 Convert parameters into breadcrumbs */
export const genBreadcrumbProps = (props: BreadcrumbProps): AntdBreadcrumbProps['routes'] => {
  const { location, breadcrumbMap } = getBreadcrumbFromProps(props);

  // 根据 location 生成 面包屑
  // Generate breadcrumbs based on location
  if (location && location.pathname && breadcrumbMap) {
    return conversionFromLocation(location, breadcrumbMap, props);
  }
  return [];
};

// use breadcrumbRender to change routes
export const getBreadcrumbProps = (props: BreadcrumbProps): BreadcrumbListReturn => {
  const { breadcrumbRender, itemRender: propsItemRender } = props;
  const routesArray = genBreadcrumbProps(props);
  const itemRender = propsItemRender || defaultItemRender;
  let routes = routesArray;
  // if routes.length =1, don't show it
  if (breadcrumbRender) {
    routes = breadcrumbRender(routes) || [];
  }
  if ((routes && routes.length < 2) || breadcrumbRender === false) {
    routes = undefined;
  }
  return {
    routes,
    itemRender,
  };
};
