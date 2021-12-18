import type { MenuDataItem } from '../typings';

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  return (menuData || []).reduce((pre, item) => {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.routes) {
      const newArray: string[] = pre.concat(getOpenKeysFromMenuData(item.routes) || []);
      return newArray;
    }
    return pre;
  }, [] as string[]);
};
const themeConfig = {
  daybreak: '#1890ff',
  dust: '#F5222D',
  volcano: '#FA541C',
  sunset: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  geekblue: '#2F54EB',
  purple: '#722ED1',
};
/**
 * Daybreak-> #1890ff
 *
 * @param val
 */
export function genStringToTheme(val?: string): string {
  return val && themeConfig[val] ? themeConfig[val] : val;
}
export function clearMenuItem(menusData: MenuDataItem[]): MenuDataItem[] {
  return menusData
    .map((item) => {
      const finalItem = { ...item };
      if (!finalItem.name || finalItem.hideInMenu) {
        return null;
      }

      if (finalItem && finalItem?.routes) {
        if (
          !finalItem.hideChildrenInMenu &&
          finalItem.routes.some((child) => child && child.name && !child.hideInMenu)
        ) {
          return {
            ...item,
            routes: clearMenuItem(finalItem.routes),
          };
        }
        // children 为空就直接删掉
        delete finalItem.routes;
      }
      return finalItem;
    })
    .filter((item) => item) as MenuDataItem[];
}
