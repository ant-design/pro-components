import { useRef, useEffect } from 'react';
import isEqual from 'lodash.isequal';
import hash from 'hash.js';
import { MenuDataItem } from '../typings';
import { stringify } from 'use-json-comparison';

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

export function guid() {
  return 'xxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getKeyByPath = (item: MenuDataItem) => {
  const { path, name } = item;
  if (path && path !== '/') {
    return path;
  }
  // 如果有name, 使用name
  if (name) {
    return name;
  }
  // 如果还是没有，用对象的hash 生成一个
  try {
    return hash
      .sha256()
      .update(stringify(item))
      .digest('hex');
  } catch (error) {
    // dom some thing
  }
  // 要是还是不行，返回一个随机值
  return guid();
};

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  if (!menuData) {
    return undefined;
  }
  return menuData.reduce((pre, item) => {
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
};

function deepCompareEquals(a: any, b: any) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value: any) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier
  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies?: Object,
) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}

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

export function genThemeToString(val?: string): string {
  return val ? themeConfig[val] : undefined;
}
