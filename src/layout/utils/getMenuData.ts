import { transformRoute } from '@umijs/route-utils';
import type { MenuDataItem, MessageDescriptor, Route } from '../typing';

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
      breadcrumb: Object.fromEntries(breadcrumb),
      breadcrumbMap: breadcrumb,
      menuData,
    };
  }
  return getMenuData(menuDataRender(menuData), menu, formatMessage, undefined);
};

export { getMenuData };
