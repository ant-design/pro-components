import { match } from 'path-to-regexp';
import type { MenuDataItem, MessageDescriptor, Route } from '../typing';

const hasItems = (value: unknown): value is Route[] =>
  Array.isArray(value) && value.length > 0;

export const stripQueryAndHash = (path: string) =>
  path.split('?')[0].split('#')[0];

const isUrl = (path = '') => /^https?:\/\//i.test(path);

const mergePath = (path = '', parentPath = '/') => {
  if (isUrl(path) || path.startsWith('/')) return path;
  if (path.endsWith('/*')) path = path.slice(0, -1);
  return `${parentPath}/${path}`.replace(/\/{2,}/g, '/');
};

const stableKey = (
  item: Route,
  path: string,
  index: number,
  parent: MenuDataItem,
) =>
  item.key ||
  (path && path !== '/'
    ? stripQueryAndHash(path)
    : `route-${String(parent.key || parent.path || 'root')}-${index}`);

const formatRoutes = (
  routes: readonly Route[],
  locale: boolean,
  formatMessage?: (message: MessageDescriptor) => string,
  parent: MenuDataItem = { path: '/' },
  parentName = 'menu',
): MenuDataItem[] =>
  routes.flatMap((source, index) => {
    if (!source) return [];
    const menuConfig = source.menu === false ? false : source.menu || {};
    const children = source.children || source.routes || [];
    const flatMenu =
      source.flatMenu || (menuConfig !== false && menuConfig.flatMenu);
    if (menuConfig === false && !flatMenu) return [];
    if (
      !hasItems(children) &&
      !source.path &&
      !source.originPath &&
      !source.layout
    ) {
      return [];
    }
    if (source.redirect && !hasItems(children)) return [];

    const path = mergePath(source.path || source.originPath || '', parent.path);
    const configuredName =
      menuConfig === false ? source.name : (menuConfig.name ?? source.name);
    const localeKey =
      source.locale === false || !configuredName
        ? false
        : source.locale || `${parentName}.${configuredName}`;
    const name =
      locale !== false && localeKey && formatMessage
        ? formatMessage({ id: localeKey, defaultMessage: configuredName })
        : configuredName;
    const parentKeys = new Set<string>([
      ...(parent.pro_layout_parentKeys || []),
      ...(source.parentKeys || []),
    ]);
    if (parent.key && parent.key !== '/') parentKeys.add(parent.key);

    const {
      pro_layout_parentKeys: _parentKeys,
      children: _parentChildren,
      icon: _parentIcon,
      flatMenu: _parentFlatMenu,
      routes: _parentRoutes,
      ...restParent
    } = parent;
    const item: MenuDataItem = {
      ...restParent,
      ...source,
      ...(menuConfig === false ? {} : menuConfig),
      menu: undefined,
      routes: undefined,
      path: path === '*' || path === '/*' ? '.' : path,
      locale: localeKey,
      key: stableKey(source, path, index, parent),
      pro_layout_parentKeys: [...parentKeys],
    };
    delete item.menu;
    delete item.routes;
    if (name && !source.unaccessible) item.name = name;
    else delete item.name;

    if (
      hasItems(children) &&
      !(menuConfig !== false && menuConfig.hideChildren) &&
      !source.hideChildren
    ) {
      const formattedChildren = formatRoutes(
        children,
        locale,
        formatMessage,
        item,
        typeof localeKey === 'string' ? localeKey : '',
      );
      if (formattedChildren.length) item.children = formattedChildren;
    } else {
      delete item.children;
    }

    if (flatMenu) return item.children || [];
    return [item];
  });

const filterMenuData = (menuData: readonly MenuDataItem[]): MenuDataItem[] =>
  menuData.flatMap((item) => {
    const children = item.children ? filterMenuData(item.children) : undefined;
    if (item.hideInMenu || item.redirect || (!item.name && !children?.length)) {
      return [];
    }
    const next = { ...item };
    if (children?.length && !item.hideChildrenInMenu) next.children = children;
    else delete next.children;
    return [next];
  });

const pathMatches = (pattern: string, pathname: string, end: boolean) => {
  if (!pattern || isUrl(pattern)) return false;
  if (pattern === '/') return pathname === '/';
  try {
    return Boolean(
      match(pattern, { decode: decodeURIComponent, end })(pathname),
    );
  } catch {
    const clean = stripQueryAndHash(pattern).replace(/\/\*$/, '');
    return end
      ? pathname === clean
      : pathname === clean || pathname.startsWith(`${clean}/`);
  }
};

class RouteMap extends Map<string, MenuDataItem> {
  override get(pathname: string) {
    const direct = super.get(pathname);
    if (direct) return direct;
    for (const [path, item] of this.entries()) {
      if (pathMatches(path, pathname, true)) return item;
    }
    return undefined;
  }
}

const flatten = (
  menuData: readonly MenuDataItem[],
  result = new Map<string, MenuDataItem>(),
) => {
  menuData.forEach((item) => {
    if (item.path) result.set(stripQueryAndHash(item.path), item);
    if (item.children) flatten(item.children, result);
  });
  return result;
};

export const transformRoute = (
  routes: readonly Route[],
  locale: boolean,
  formatMessage?: (message: MessageDescriptor) => string,
) => {
  const originalMenuData = formatRoutes([...routes], locale, formatMessage);
  const breadcrumb = new RouteMap();
  flatten(originalMenuData).forEach((item, path) => breadcrumb.set(path, item));
  const menuData = filterMenuData(originalMenuData);
  return { menuData, breadcrumb };
};

export const getMatchMenu = (
  pathname: string,
  menuData: readonly MenuDataItem[],
  fullKeys = false,
  exact = false,
) => {
  const flatMenus = flatten(menuData);
  let paths = [...flatMenus.keys()]
    .filter((path) => pathMatches(path, pathname || '/', exact))
    .sort((left, right) => left.split('/').length - right.split('/').length);
  if (!fullKeys && paths.length) paths = [paths[paths.length - 1]];
  const seen = new Set<string>();
  return paths.flatMap((path) => {
    const item = flatMenus.get(path);
    if (!item) return [];
    const chain = [...(item.pro_layout_parentKeys || []), item.key]
      .map((key) => [...flatMenus.values()].find((entry) => entry.key === key))
      .filter((entry): entry is MenuDataItem => Boolean(entry));
    return chain.filter((entry) => {
      const key = String(entry.key || entry.path || '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });
};
