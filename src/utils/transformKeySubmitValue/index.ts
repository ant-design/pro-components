import deepMerge from 'lodash-es/merge';
import get from 'rc-util/lib/utils/get';
import React from 'react';
import { isNil } from '../isNil';
import { merge } from '../merge';
import type { SearchTransformKeyFn } from '../typing';

export type DataFormatMapType = Record<
  string,
  SearchTransformKeyFn | undefined
>;

/**
 * 检查一个值是否是可以遍历的普通对象。
 * 它会排除 React 元素、正则表达式、Map、Set、HTML 元素、Blob、File 和数组。
 * @param itemValue - 要检查的值。
 * @returns {boolean} - 如果值是普通对象，则返回 true，否则返回 false。
 */
export function isPlainObj(itemValue: any): boolean {
  if (typeof itemValue !== 'object' || itemValue === null) {
    return false;
  }

  // Exclude special object types
  if (
    React.isValidElement(itemValue) ||
    itemValue.constructor === RegExp ||
    itemValue instanceof Map ||
    itemValue instanceof Set ||
    itemValue instanceof HTMLElement ||
    itemValue instanceof Blob ||
    itemValue instanceof File ||
    Array.isArray(itemValue)
  ) {
    return false;
  }

  return true;
}

/**
 * 递归地转换对象的值。
 * @param values - 要转换的对象
 * @param dataFormatMap - 转换映射
 * @param finalValues - 用于收集键名改变的转换结果的共享对象
 * @param parentsKey - 父键路径
 */
function recursiveTransform(
  values: any,
  dataFormatMap: Record<string, SearchTransformKeyFn>,
  finalValues: any,
  parentsKey: (string | number)[] = [],
): any {
  if (values === null || values === undefined) {
    return values;
  }

  const result: any = Array.isArray(values) ? [] : {};

  Object.keys(values).forEach((key) => {
    const currentPath = [...parentsKey, key];
    const itemValue = values[key];
    const transformFunction = get(dataFormatMap, currentPath);

    if (transformFunction && typeof transformFunction === 'function') {
      const transformed = transformFunction(itemValue, key, values);
      if (
        typeof transformed === 'object' &&
        transformed !== null &&
        !React.isValidElement(transformed)
      ) {
        deepMerge(finalValues, transformed);
      } else {
        result[key] = transformed;
      }
    } else if (isPlainObj(itemValue)) {
      result[key] = recursiveTransform(
        itemValue,
        dataFormatMap,
        finalValues,
        currentPath,
      );
    } else {
      result[key] = itemValue;
    }
  });

  return result;
}

/**
 * 根据给定的映射转换对象的键。
 * 此函数递归地遍历值并应用转换。
 *
 * @template T - values 对象的类型。
 * @param {T} values - 包含要转换的值的对象。
 * @param {Record<string, SearchTransformKeyFn | undefined | DataFormatMapType>} dataFormatMapRaw - 转换映射。
 * @returns {T} - 包含已转换值的对象。
 */
export const transformKeySubmitValue = <T extends object = any>(
  values: T,
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
): T => {
  // 过滤掉值为 nil 的转换
  const dataFormatMap = Object.entries(dataFormatMapRaw).reduce(
    (acc, [key, value]) => {
      if (!isNil(value)) {
        acc[key] = value as SearchTransformKeyFn;
      }
      return acc;
    },
    {} as Record<string, SearchTransformKeyFn>,
  );

  if (
    Object.keys(dataFormatMap).length === 0 ||
    typeof window === 'undefined' ||
    typeof values !== 'object' ||
    values === null ||
    values instanceof Blob
  ) {
    return values;
  }

  const finalValues = {};
  const result = recursiveTransform(values, dataFormatMap, finalValues);

  return merge({}, result, finalValues) as T;
};
