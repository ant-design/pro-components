import { transformRoute } from '@umijs/route-utils';
import type { MenuDataItem, MessageDescriptor, Route } from '../typing';

function fromEntries(iterable: any) {
  return [...iterable].reduce(
    (obj: Record<string, MenuDataItem>, [key, val]) => {
      // eslint-disable-next-line no-param-reassign
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
    true,
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
