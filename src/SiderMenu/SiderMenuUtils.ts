import pathToRegexp from 'path-to-regexp';
import { BaseMenuProps } from './index.d';
import { MenuDataItem } from '../typings';
import { urlToList } from '../utils/pathTools';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData: MenuDataItem[] = []): string[] => {
  let keys: string[] = [];
  menuData.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

export const getMenuMatches = (
  flatMenuKeys: string[] = [],
  path: string,
): string[] =>
  flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));

/**
 * 获得菜单子节点
 */
export const getDefaultCollapsedSubMenus = (props: BaseMenuProps): string[] => {
  const { location = { pathname: '/' }, flatMenuKeys } = props;
  return urlToList(location.pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item)
    .reduce((acc, curr) => [...acc, curr], ['/']);
};
