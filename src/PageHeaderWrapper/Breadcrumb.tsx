import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../utils/pathTools';
import { MenuDataItem, MessageDescriptor } from '../typings';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import * as H from 'history';
import { Settings } from '../defaultSettings';

export interface BreadcrumbProps {
  breadcrumbList?: Array<{ title: string; href: string }>;
  home?: string;
  location?: H.Location;
  menu?: Settings['menu'];
  breadcrumb?: { [path: string]: MenuDataItem };
  formatMessage?: (message: MessageDescriptor) => string;
}

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender: AntdBreadcrumbProps['itemRender'] = (
  route,
  params,
  routes,
  paths,
) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <a>{route.breadcrumbName}</a>
  );
};

const renderItemLocal = (
  item: MenuDataItem,
  props: BreadcrumbProps,
): string => {
  const {
    formatMessage,
    menu = {
      locale: false,
    },
  } = props;
  if (item.locale && formatMessage) {
    if (menu.locale) {
      return formatMessage({ id: item.locale });
    }
  }
  return item.name as string;
};

export const getBreadcrumb = (
  breadcrumb: { [path: string]: MenuDataItem },
  url: string,
): MenuDataItem => {
  if (!breadcrumb) {
    return {
      path: '',
    };
  }
  let breadcrumbItem = breadcrumb[url];
  if (!breadcrumbItem) {
    Object.keys(breadcrumb).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumbItem = breadcrumb[item];
      }
    });
  }
  return breadcrumb || { path: '' };
};

export const getBreadcrumbProps = (props: BreadcrumbProps) => {
  const { location, breadcrumb } = props;
  return {
    location,
    breadcrumb,
  };
};

// Generated according to props
const conversionFromProps = (
  props: BreadcrumbProps,
): AntdBreadcrumbProps['routes'] => {
  const { breadcrumbList = [] } = props;
  return breadcrumbList
    .map(item => {
      const { title, href } = item;
      return {
        path: href,
        breadcrumbName: title,
      };
    })
    .filter(item => item.path);
};

const conversionFromLocation = (
  routerLocation: BreadcrumbProps['location'],
  breadcrumb: { [path: string]: MenuDataItem },
  props: BreadcrumbProps,
): AntdBreadcrumbProps['routes'] => {
  if (!routerLocation) {
    return [];
  }
  const { home } = props;
  // Convert the url to an array
  const pathSnippets = urlToList(routerLocation.pathname);
  // Loop data mosaic routing
  const extraBreadcrumbItems: AntdBreadcrumbProps['routes'] = pathSnippets
    .map(url => {
      const currentBreadcrumb = getBreadcrumb(breadcrumb, url);
      if (currentBreadcrumb.inherited) {
        return { path: '', breadcrumbName: '' };
      }
      const name = renderItemLocal(currentBreadcrumb, props);
      const { hideInBreadcrumb } = currentBreadcrumb;
      return name && !hideInBreadcrumb
        ? {
            path: url,
            breadcrumbName: name,
          }
        : { path: '', breadcrumbName: '' };
    })
    .filter(item => item && item.path);
  // Add home breadcrumbs to your head if defined
  if (home) {
    extraBreadcrumbItems.unshift({
      path: '/',
      breadcrumbName: home,
    });
  }
  return extraBreadcrumbItems;
};

export type BreadcrumbListReturn = Pick<
  AntdBreadcrumbProps,
  Extract<keyof AntdBreadcrumbProps, 'routes' | 'itemRender'>
>;

/**
 * 将参数转化为面包屑
 * Convert parameters into breadcrumbs
 */
export const conversionBreadcrumbList = (
  props: BreadcrumbProps,
): BreadcrumbListReturn => {
  const { breadcrumbList } = props;
  const { location, breadcrumb } = getBreadcrumbProps(props);
  if (breadcrumbList && breadcrumbList.length) {
    return {
      routes: conversionFromProps(props),
      itemRender,
    };
  }

  // 根据 location 生成 面包屑
  // Generate breadcrumbs based on location
  if (location && location.pathname && breadcrumb) {
    return {
      routes: conversionFromLocation(location, breadcrumb, props),
      itemRender,
    };
  }
  return {
    routes: [],
  };
};
