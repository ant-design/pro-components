import pathToRegexp from 'path-to-regexp';
import { MenuDataItem } from '../typings';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData: MenuDataItem[] = []): string[] => {
  let keys: string[] = [];
  menuData.forEach(item => {
    if (!item) {
      return;
    }
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

/**
 * 获取打平的 menuData
 * 已 path 为key
 * @param menuData
 */
export const getFlatMenus = (
  menuData: MenuDataItem[] = [],
): {
  [key: string]: MenuDataItem;
} => {
  let menus = {};
  menuData.forEach(item => {
    if (!item) {
      return;
    }
    menus[item.path] = item;
    if (item.children) {
      menus = { ...menus, ...getFlatMenus(item.children) };
    }
  });
  return menus;
};

/**
 * a-b-c
 * [
 *  "a",
 *  "a-b",
 *  "a-b-c"
 * ]
 * @param menuKey
 */
export const genKeysToArray = (menuKey: string) => {
  const keys = menuKey.split('-');
  const keyArray: string[] = [];
  keys.forEach((key, index) => {
    if (index === 0) {
      keyArray.push(key);
      return;
    }
    keyArray.push(keys.slice(0, index + 1).join('-'));
  });
  return keyArray;
};

export const getMenuMatches = (
  flatMenuKeys: string[] = [],
  path: string,
): string =>
  flatMenuKeys.find(item => item && pathToRegexp(item).test(path)) || '/';

// 获取当前的选中菜单
export const getSelectedMenuKeys = (
  pathname: string,
  flatMenus: {
    [key: string]: MenuDataItem;
  } = {},
  flatMenuKeys: string[],
): string[] => {
  const menuPathKey = getMenuMatches(flatMenuKeys, pathname || '/');
  const menuItem = flatMenus[menuPathKey] || { parentKeys: '', key: '' };
  const keys = menuItem.parentKeys || [];
  if (menuItem.key) {
    keys.push(menuItem.key);
  }
  return keys;
};
