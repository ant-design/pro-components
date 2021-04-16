import type { MenuDataItem } from '../typings';

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  return (menuData || []).reduce((pre, item) => {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.children) {
      const newArray: string[] = pre.concat(getOpenKeysFromMenuData(item.children) || []);
      return newArray;
    }
    return pre;
  }, [] as string[]);
};

const themeConfig = {
  daybreak: 'daybreak',
  '#1890ff': 'daybreak',
  '#F5222D': 'dust',
  '#FA541C': 'volcano',
  '#FAAD14': 'sunset',
  '#13C2C2': 'cyan',
  '#52C41A': 'green',
  '#2F54EB': 'geekblue',
  '#722ED1': 'purple',
};

const invertKeyValues = (obj: Object) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {});

/**
 * #1890ff -> daybreak
 *
 * @param val
 */
export function genThemeToString(val?: string): string {
  return val && themeConfig[val] ? themeConfig[val] : undefined;
}

/**
 * Daybreak-> #1890ff
 *
 * @param val
 */
export function genStringToTheme(val?: string): string {
  const stringConfig = invertKeyValues(themeConfig);
  return val && stringConfig[val] ? stringConfig[val] : val;
}

export function clearMenuItem(menusData: MenuDataItem[]): MenuDataItem[] {
  return menusData
    .map((item) => {
      const finalItem = { ...item };
      if (!finalItem.name || finalItem.hideInMenu) {
        return null;
      }

      if (finalItem && finalItem?.children) {
        if (
          !finalItem.hideChildrenInMenu &&
          finalItem.children.some((child) => child && child.name && !child.hideInMenu)
        ) {
          return {
            ...item,
            children: clearMenuItem(finalItem.children),
          };
        }
        // children 为空就直接删掉
        delete finalItem.children;
      }
      return finalItem;
    })
    .filter((item) => item) as MenuDataItem[];
}
