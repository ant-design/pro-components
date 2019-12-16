import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { MenuDataItem, Route, MessageDescriptor } from '../typings';

import { Settings } from '../defaultSettings';
import { genKeyByPath } from './utils';

interface FormatterProps {
  data: MenuDataItem[];
  menu?: Settings['menu'];
  formatMessage?: (data: { id: string; defaultMessage?: string }) => string;
  parentName?: string;
  authority?: string[] | string;
}

// Conversion router to menu.
function formatter(
  props: FormatterProps,
  parent?: MenuDataItem,
): MenuDataItem[] {
  const {
    data,
    menu = {
      locale: true,
    },
    formatMessage,
    authority,
    parentName,
  } = props;
  return data
    .filter(item => {
      if (!item) {
        return false;
      }
      if (item.routes || item.children) {
        return true;
      }
      if (item.name && item.path) {
        return true;
      }
      return false;
    })
    .map((item = { path: '' }) => {
      if (!item.name) {
        return item;
      }
      const { name } = item;
      const locale = item.locale || `${parentName || 'menu'}.${name}`;
      // if enableMenuLocale use item.name,
      // close menu international
      const localeName =
        menu.locale !== false && formatMessage
          ? formatMessage({ id: locale, defaultMessage: name })
          : name;

      const result: MenuDataItem = {
        ...item,
        name: localeName,
        locale,
        key: genKeyByPath(item.path, parent && parent?.key),
        routes: null,
      };
      if (item.routes || item.children) {
        const children = formatter(
          {
            ...props,
            authority: item.authority || authority,
            data: item.routes || item.children,
            parentName: locale,
          },
          result,
        );
        // Reduce memory usage
        result.children = children;
      }
      return result;
    });
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * filter menuData
 */
const defaultFilterMenuData = (menuData: MenuDataItem[] = []): MenuDataItem[] =>
  menuData
    .filter(item => item && item.name && !item.hideInMenu)
    .map(item => {
      if (
        item.children &&
        Array.isArray(item.children) &&
        !item.hideChildrenInMenu &&
        item.children.some(child => child && !!child.name)
      ) {
        const children = defaultFilterMenuData(item.children);
        if (children.length) return { ...item, children };
      }
      return { ...item, children: undefined };
    })
    .filter(item => item);

const mergePath = (path: string = '', parentPath: string = '/') => {
  if ((path || parentPath).startsWith('/')) {
    return path;
  }
  return `${parentPath}/${path}`.replace('//', '/');
};
/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
const getBreadcrumbNameMap = (
  menuData: MenuDataItem[],
): Map<string, MenuDataItem> => {
  // Map is used to ensure the order of keys
  const routerMap = new Map<string, MenuDataItem>();
  const flattenMenuData = (data: MenuDataItem[], parent?: MenuDataItem) => {
    data.forEach(menuItem => {
      if (!menuItem) {
        return;
      }
      if (menuItem && menuItem.children) {
        flattenMenuData(menuItem.children, menuItem);
      }
      // Reduce memory usage
      const path = mergePath(menuItem.path, parent ? parent.path : '/');
      routerMap.set(path, menuItem);
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(
  getBreadcrumbNameMap,
  isEqual,
);

function fromEntries(iterable: any) {
  return [...iterable].reduce(
    (
      obj: {
        [key: string]: MenuDataItem;
      },
      [key, val],
    ) => {
      obj[key] = val;
      return obj;
    },
    {},
  );
}

export default (
  routes: Route[],
  menu?: { locale: boolean },
  formatMessage?: (message: MessageDescriptor) => string,
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[],
) => {
  let originalMenuData = memoizeOneFormatter({
    data: routes,
    formatMessage,
    menu: menu || {
      locale: false,
    },
  });
  if (menuDataRender) {
    originalMenuData = memoizeOneFormatter({
      data: menuDataRender(originalMenuData),
      menu,
      formatMessage,
    });
  }

  const menuData = defaultFilterMenuData(originalMenuData);
  // Map type used for internal logic
  const breadcrumbMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
  // Object type used for external users
  const breadcrumb: {
    [key: string]: MenuDataItem;
  } = fromEntries(breadcrumbMap);
  return { breadcrumb, breadcrumbMap, menuData };
};
