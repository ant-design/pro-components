import { MenuDataItem } from '../typings';

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  if (!menuData) {
    return undefined;
  }
  return menuData.reduce((pre, item) => {
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
 * @param val
 */
export function genThemeToString(val?: string): string {
  return val && themeConfig[val] ? themeConfig[val] : val;
}

/**
 * daybreak-> #1890ff
 * @param val
 */
export function genStringToTheme(val?: string): string {
  const stringConfig = invertKeyValues(themeConfig);
  return val && stringConfig[val] ? stringConfig[val] : val;
}
