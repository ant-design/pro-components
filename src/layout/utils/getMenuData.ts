import type { MenuDataItem, MessageDescriptor, Route } from '../typing';
import { transformRoute } from './routeUtils';

function fromEntries(iterable: any) {
  return [...iterable].reduce(
    (obj: Record<string, MenuDataItem>, [key, val]) => {
      obj[key] = val;
      return obj;
    },
    {},
  );
}

const getMenuData = (
  routes: Readonly<Route[]>,
  menu?: { locale?: boolean },
  formatMessage?: (message: MessageDescriptor) => string,
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[],
): {
  breadcrumb: Record<string, MenuDataItem>;
  breadcrumbMap: Map<string, MenuDataItem>;
  menuData: MenuDataItem[];
} => {
  const { menuData, breadcrumb } = transformRoute(
    routes as Route[],
    menu?.locale || false,
    formatMessage,
  );

  if (!menuDataRender) {
    return {
      breadcrumb: fromEntries(breadcrumb),
      breadcrumbMap: breadcrumb,
      menuData,
    };
  }
  return getMenuData(menuDataRender(menuData), menu, formatMessage, undefined);
};

export { getMenuData };
