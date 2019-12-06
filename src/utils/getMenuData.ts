import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { MenuDataItem, Route, MessageDescriptor } from '../typings';

import { Settings } from '../defaultSettings';

interface FormatterProps {
  data: MenuDataItem[];
  menu: Settings['menu'];
  formatMessage?: (data: { id: string; defaultMessage?: string }) => string;
  parentName?: string;
  authority?: string[] | string;
}

// Conversion router to menu.
function formatter(props: FormatterProps): MenuDataItem[] {
  const { data, menu, formatMessage, authority, parentName } = props;
  return data
    .filter(item => item && item.name && item.path)
    .map((item = { path: '' }) => {
      if (!item.name) {
        return item;
      }
      const { name } = item;
      const locale = `${parentName || 'menu'}.${name}`;
      // if enableMenuLocale use item.name,
      // close menu international
      const localeName =
        menu.locale || !formatMessage
          ? name
          : formatMessage({ id: locale, defaultMessage: name });
      const result: MenuDataItem = {
        ...item,
        name: localeName,
        locale,
        routes: null,
      };
      if (item.routes) {
        const children = formatter({
          ...props,
          authority: item.authority || authority,
          data: item.routes,
          parentName: locale,
        });
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

/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
const getBreadcrumbNameMap = (
  menuData: MenuDataItem[],
): Map<string, MenuDataItem> => {
  // Map is used to ensure the order of keys
  const routerMap = new Map<string, MenuDataItem>();
  const flattenMenuData: (data: MenuDataItem[]) => void = data => {
    data.forEach(menuItem => {
      if (!menuItem) {
        return;
      }
      if (menuItem && menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap.set(menuItem.path, menuItem);
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
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
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
    originalMenuData = menuDataRender(originalMenuData);
  }
  const menuData = defaultFilterMenuData(originalMenuData);
  // Map type used for internal logic
  // Map 类型用于内部逻辑，为了避免顺序问题
  const breadcrumbMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
  // Object type used for external users
  // 外部暴露的 breadcrumb 还是 Object 类型
  const breadcrumb = fromEntries(breadcrumbMap);
  return { breadcrumb, breadcrumbMap, menuData };
};
