import { useRef, useEffect } from 'react';
import isEqual from 'lodash.isequal';
import { stringify } from 'use-json-comparison';
import hash from 'hash.js';
import { MenuDataItem } from '../typings';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);
const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

export const isBrowser = () =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined' && !isNode;

/** 判断是否是图片链接 */
export function isImg(path: string): boolean {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path);
}

export function guid() {
  return 'xxxxxxxx'.replace(/[xy]/g, (c) => {
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
    return hash.sha256().update(stringify(item)).digest('hex');
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
      const newArray: string[] = pre.concat(getOpenKeysFromMenuData(item.children) || []);
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

export function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: Object) {
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

export const usePrevious = <T>(state: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};

export function debounce(func: Function, wait: number, immediate?: boolean) {
  // immediate默认为false
  let timeout: number | null;
  let args: IArguments | null;
  let context: null;
  let timestamp: number;
  let result: any;

  let debounceFunction: any;

  // eslint-disable-next-line no-var
  var later = function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = window.setTimeout(later, wait - last);
      debounceFunction.id = timeout;
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args as any);
        // eslint-disable-next-line no-multi-assign
        if (!timeout) context = args = null;
      }
    }
  };

  // eslint-disable-next-line func-names
  debounceFunction = function () {
    // @ts-ignore
    context = this;
    // eslint-disable-next-line prefer-rest-params
    args = arguments;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = window.setTimeout(later, wait);
      debounceFunction.id = timeout;
    }
    if (callNow) {
      result = func.apply(context, args);
      // eslint-disable-next-line no-multi-assign
      context = args = null;
    }

    return result;
  };
  return debounceFunction;
}
