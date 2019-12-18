import { MenuDataItem } from '../typings';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);
const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

export const isBrowser = () =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  !isNode;

export const getKeyByPath = (path: string) => {
  if (path && path !== '/') {
    return path;
  }
  return guid();
};

export const genKeyByPath = (path: string) => {
  const newKey = getKeyByPath(path);
  return newKey;
};

export function guid() {
  return 'xxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) =>
  menuData?.reduce((pre, item) => {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.children) {
      const newArray: string[] = pre.concat(
        getOpenKeysFromMenuData(item.children) || [],
      );
      return newArray;
    }
    return pre;
  }, [] as string[]);
