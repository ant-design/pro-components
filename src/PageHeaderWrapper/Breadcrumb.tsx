import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import { urlToList } from '../utils/pathTools';
import { MenuDataItem } from '../typings';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import * as H from 'history';

export interface BreadcrumbProps {
  title?: React.ReactNode | string | number;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  breadcrumbList?: Array<{ title: string; href: string }>;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  tabActiveKey?: string;
  onTabChange?: (key: string) => void;
  tabBarExtraContent?: React.ReactNode;
  style?: React.CSSProperties;
  home?: string;
  wide?: boolean;
  className?: string;
  children?: React.ReactNode;
  wrapperClassName?: string;
  top?: React.ReactNode;
  location?: H.Location;
  breadcrumbNameMap?: { [path: string]: MenuDataItem };
}

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender: AntdBreadcrumbProps['itemRender'] = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  );
};

const renderItemLocal = (item: MenuDataItem): string => {
  if (item.locale) {
    return item.locale;
  }
  return item.name as string;
};

export const getBreadcrumb = (
  breadcrumbNameMap: { [path: string]: MenuDataItem },
  url: string,
): MenuDataItem => {
  if (!breadcrumbNameMap) {
    return {
      path: '',
    };
  }
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || { path: '' };
};

export const getBreadcrumbProps = (props: BreadcrumbProps) => {
  const { location, breadcrumbNameMap } = props;
  return {
    location,
    breadcrumbNameMap,
  };
};

// Generated according to props
const conversionFromProps = (props: BreadcrumbProps): AntdBreadcrumbProps['routes'] => {
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
  breadcrumbNameMap: { [path: string]: MenuDataItem },
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
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return { path: '', breadcrumbName: '' };
      }
      const name = renderItemLocal(currentBreadcrumb);
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

/**
 * 将参数转化为面包屑
 * Convert parameters into breadcrumbs
 */
export const conversionBreadcrumbList = (props: BreadcrumbProps): AntdBreadcrumbProps => {
  const { breadcrumbList } = props;
  const { location, breadcrumbNameMap } = getBreadcrumbProps(props);
  if (breadcrumbList && breadcrumbList.length) {
    return {
      routes: conversionFromProps(props),
      itemRender,
    };
  }

  // 根据 location 生成 面包屑
  // Generate breadcrumbs based on location
  if (location && location.pathname && breadcrumbNameMap) {
    return {
      routes: conversionFromLocation(location, breadcrumbNameMap, props),
      itemRender,
    };
  }
  return {
    routes: [],
  };
};
