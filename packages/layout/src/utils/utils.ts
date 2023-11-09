import type { MenuDataItem } from '../typing';

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  return (menuData || []).reduce((pre, item) => {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.children || item.routes) {
      const newArray: string[] = pre.concat(
        getOpenKeysFromMenuData(item.children || item.routes) || [],
      );
      return newArray;
    }
    return pre;
  }, [] as string[]);
};
const themeConfig = {
  techBlue: '#1677FF',
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
  return val && themeConfig[val as 'techBlue']
    ? themeConfig[val as 'techBlue']
    : val || '';
}
export function clearMenuItem(menusData: MenuDataItem[]): MenuDataItem[] {
  return menusData
    .map((item) => {
      const children: MenuDataItem[] = item.children || [];
      const finalItem = { ...item };
      if (!finalItem.children && finalItem.routes) {
        finalItem.children = finalItem.routes;
      }
      if (!finalItem.name || finalItem.hideInMenu) {
        return null;
      }
      if (finalItem && finalItem?.children) {
        if (
          !finalItem.hideChildrenInMenu &&
          children.some((child) => child && child.name && !child.hideInMenu)
        ) {
          return {
            ...item,
            children: clearMenuItem(children),
          };
        }
        // children 为空就直接删掉
        delete finalItem.children;
      }
      delete finalItem.routes;
      return finalItem;
    })
    .filter((item) => item) as MenuDataItem[];
}
