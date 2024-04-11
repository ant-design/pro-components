/* eslint-disable @typescript-eslint/ban-types */
import get from 'rc-util/lib/utils/get';
import namePathSet from 'rc-util/lib/utils/set';
import React from 'react';
import { isNil } from '../isNil';
import { merge } from '../merge';
import type { SearchTransformKeyFn } from '../typing';
export type DataFormatMapType = Record<
  string,
  SearchTransformKeyFn | undefined
>;

/**
 * 暂时还不支持 Set和 Map 结构 判断是不是一个能遍历的对象
 *
 * @param itemValue
 * @returns Boolean
 */
export function isPlainObj(itemValue: any) {
  if (typeof itemValue !== 'object') return false;

  /** Null 也要处理，不然omit空会失效 */
  if (itemValue === null) return true;

  if (React.isValidElement(itemValue)) return false;
  if (itemValue.constructor === RegExp) return false;
  if (itemValue instanceof Map) return false;
  if (itemValue instanceof Set) return false;
  if (itemValue instanceof HTMLElement) return false;
  if (itemValue instanceof Blob) return false;
  if (itemValue instanceof File) return false;
  if (Array.isArray(itemValue)) return false;
  return true;
}

function deepOmit(obj: Record<string, any>, keysToOmit: string[]) {
  // 递归地遍历对象
  function omitHelper(
    values: Record<string, any>,
    parentKeys?: string[],
  ): Record<string, any> {
    if (typeof values !== 'object' || values === null) {
      return values; // 基本数据类型直接返回
    }

    if (Array.isArray(values)) {
      return values.map((value, index) =>
        omitHelper(value, [...(parentKeys || []), index + '']),
      ); // 数组则对每个元素递归处理
    }

    // 对于对象，创建一个新对象，且不包含特定的键
    return Object.entries(values).reduce((acc, [key, value]) => {
      const currentKeys = [...(parentKeys || []), key];
      if (keysToOmit.join('-') !== currentKeys.join('-')) {
        if (
          isPlainObj(value) &&
          value !== null &&
          value !== undefined &&
          Object.keys(value).length > 0
        ) {
          acc[key] = omitHelper(value, currentKeys); // 递归处理子对象
        } else {
          acc[key] = value; // 递归处理子对象
        }
      }
      return acc;
    }, {} as Record<string, any>);
  }

  return omitHelper(obj, []);
}

const generateDataFormatMap = (
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
) => {
  // ignore nil transform
  const dataFormatMap = Object.keys(dataFormatMapRaw).reduce((ret, key) => {
    const value = dataFormatMapRaw[key];
    if (!isNil(value)) {
      // eslint-disable-next-line no-param-reassign
      ret[key] = value! as SearchTransformKeyFn; // can't be undefined
    }
    return ret;
  }, {} as Record<string, SearchTransformKeyFn>);
  return dataFormatMap;
};

const runTransform = (
  transformFunction: SearchTransformKeyFn,
  entityKey: string[],
  allValues: any,
) => {
  if (typeof transformFunction === 'function') {
    const value = get(allValues, entityKey);
    return transformFunction(value, entityKey, allValues);
  }
  return get(allValues, entityKey);
};

const mergeValues = <T = Record<string, any>>(
  allValues: T,
  entityKey: string[],
  value: any,
) => {
  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  ) {
    if (Array.isArray(allValues)) {
      return namePathSet(allValues, entityKey.slice(0, -1), value);
    }
    return merge(deepOmit(allValues as Record<string, any>, entityKey), value);
  }

  return namePathSet(allValues, entityKey, value);
};

/**
 * Recursively transforms the keys and values of an object based on a data format map.
 *
 * @template T - The type of the input object.
 * @param {Object} options - The options for the transformation.
 * @param {T} options.allValues - The input object to be transformed.
 * @param {string[]} [options.parentsKey] - The parent keys of the current object.
 * @param {Record<string, SearchTransformKeyFn>} options.dataFormatMap - The data format map containing the transformation functions.
 * @returns {T} - The transformed object.
 */
const loopRunTransform = <T = Record<string, any>>(
  {
    parentsKey,
    currentValues,
    dataFormatMap,
  }: {
    currentValues: T;
    parentsKey: string[];
    dataFormatMap: Record<string, SearchTransformKeyFn>;
  },
  allValues: T,
): T => {
  if (currentValues == null || currentValues === undefined) {
    return allValues;
  }
  let finalValues = allValues;

  const fieldKeys = Object.keys(currentValues);

  for (const entityKey of fieldKeys) {
    const key: string[] = [parentsKey, entityKey]
      .flat(1)
      .filter((item) => item !== undefined && item !== null);

    const itemValue = get(allValues as any, key);
    if (isPlainObj(itemValue) || Array.isArray(itemValue)) {
      finalValues = loopRunTransform(
        {
          currentValues: itemValue,
          parentsKey: key,
          dataFormatMap,
        },
        finalValues,
      );
    }

    const transformFunction = get(
      dataFormatMap,
      key as (number | string)[],
    ) as SearchTransformKeyFn;
    ``;

    if (transformFunction && typeof transformFunction === 'function') {
      finalValues = mergeValues(
        finalValues,
        key,
        runTransform(transformFunction, key, finalValues),
      );
    }
  }

  return finalValues;
};

export const transformKeySubmitValue = <T extends object = any>(
  values: T,
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
) => {
  const dataFormatMap = generateDataFormatMap(dataFormatMapRaw);
  if (Object.keys(dataFormatMap).length < 1) {
    return values;
  }

  if (typeof window === 'undefined') return values;

  // 如果 value 是 string | null | Array | Blob类型 其中之一，直接返回
  // 形如 {key: [File, File]} 的表单字段当进行第二次递归时会导致其直接越过 typeof value !== 'object' 这一判断 https://github.com/ant-design/pro-components/issues/2071
  if (typeof values !== 'object' || isNil(values) || values instanceof Blob) {
    return values;
  }
  return loopRunTransform<T>(
    {
      currentValues: values,
      dataFormatMap,
      parentsKey: [],
    },
    values,
  );
};
