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
    return Object.entries(values).reduce(
      (acc, [key, value]) => {
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
      },
      {} as Record<string, any>,
    );
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
  const dataFormatMap = Object.keys(dataFormatMapRaw).reduce(
    (ret, key) => {
      const value = dataFormatMapRaw[key];
      if (!isNil(value)) {
        // eslint-disable-next-line no-param-reassign
        ret[key] = value! as SearchTransformKeyFn; // can't be undefined
      }
      return ret;
    },
    {} as Record<string, SearchTransformKeyFn>,
  );
  return dataFormatMap;
};

const runTransform = (
  transformFunction: SearchTransformKeyFn,
  entityKey: (string | number)[],
  allValues: any,
) => {
  if (typeof transformFunction === 'function') {
    const keyAsStringArray = entityKey.map((k) => String(k));
    const value = get(allValues, keyAsStringArray);
    const transformedValue = transformFunction(
      value,
      keyAsStringArray,
      allValues,
    );
    // 如果转换函数返回了一个对象，我们需要把它合并到父级对象中
    if (
      transformedValue &&
      typeof transformedValue === 'object' &&
      !Array.isArray(transformedValue)
    ) {
      const parentKey = keyAsStringArray.slice(0, -1);
      const lastKey = keyAsStringArray[keyAsStringArray.length - 1];
      const parentValue =
        parentKey.length > 0 ? get(allValues, parentKey) : allValues;
      if (
        parentValue &&
        typeof parentValue === 'object' &&
        !Array.isArray(parentValue)
      ) {
        // 删除原始的键
        const newParentValue = { ...parentValue };
        delete newParentValue[lastKey];
        // 合并转换后的值
        return merge({}, newParentValue, transformedValue);
      }
    }
    return transformedValue;
  }
  return get(
    allValues,
    entityKey.map((k) => String(k)),
  );
};

const mergeValues = <T = Record<string, any>>(
  allValues: T,
  entityKey: (string | number)[],
  value: any,
) => {
  const keyAsStringArray = entityKey.map((k) => String(k));
  const parentKey = keyAsStringArray.slice(0, -1);
  const lastKey = keyAsStringArray[keyAsStringArray.length - 1];

  // 如果是对象，且不是数组，且有属性
  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  ) {
    // 如果是数组，只更新当前路径的值
    if (Array.isArray(allValues)) {
      return namePathSet(allValues, keyAsStringArray, value);
    }

    // 如果是对象，我们需要把转换后的值合并到父级对象中
    const parentValue =
      parentKey.length > 0
        ? get(allValues as Record<string, any>, parentKey)
        : allValues;
    if (
      parentValue &&
      typeof parentValue === 'object' &&
      !Array.isArray(parentValue)
    ) {
      // 删除原始的键
      const newParentValue = { ...parentValue };
      delete newParentValue[lastKey];
      // 合并转换后的值
      const mergedValue = merge({}, newParentValue, value);
      return parentKey.length > 0
        ? namePathSet(allValues, parentKey, mergedValue)
        : (mergedValue as T);
    }
  }

  // 如果是基本类型或数组，直接设置值
  return namePathSet(allValues, keyAsStringArray, value);
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
    parentsKey: (string | number)[];
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
    const key: (string | number)[] = [parentsKey, entityKey]
      .flat(1)
      .filter((item) => item !== undefined && item !== null);

    const itemValue = get(allValues as any, key);

    // 先处理当前层级的 transform
    const transformFunction = get(
      dataFormatMap,
      key as (number | string)[],
    ) as SearchTransformKeyFn;

    if (transformFunction && typeof transformFunction === 'function') {
      const transformedValue = runTransform(
        transformFunction,
        key,
        finalValues,
      );
      if (transformedValue !== undefined) {
        finalValues = mergeValues(finalValues, key, transformedValue);
      }
    }

    // 如果是对象或数组，递归处理子级
    if (itemValue && typeof itemValue === 'object') {
      if (Array.isArray(itemValue)) {
        // 处理数组的每个元素
        for (let i = 0; i < itemValue.length; i++) {
          const arrayItemKey = [...key, i];
          const arrayItemValue = itemValue[i];

          // 处理数组元素本身的 transform
          const arrayItemTransform = get(
            dataFormatMap,
            arrayItemKey as (number | string)[],
          ) as SearchTransformKeyFn;

          if (arrayItemTransform && typeof arrayItemTransform === 'function') {
            const transformedValue = runTransform(
              arrayItemTransform,
              arrayItemKey,
              finalValues,
            );
            if (transformedValue !== undefined) {
              finalValues = namePathSet(
                finalValues,
                arrayItemKey,
                transformedValue,
              );
            }
          }

          // 如果数组元素是对象，递归处理其属性
          if (
            arrayItemValue &&
            typeof arrayItemValue === 'object' &&
            !Array.isArray(arrayItemValue)
          ) {
            const arrayItemKeys = Object.keys(arrayItemValue);
            for (const propKey of arrayItemKeys) {
              const propPath = [...arrayItemKey, propKey];
              const propTransform = get(
                dataFormatMap,
                propPath as (number | string)[],
              ) as SearchTransformKeyFn;

              if (propTransform && typeof propTransform === 'function') {
                const transformedValue = runTransform(
                  propTransform,
                  propPath,
                  finalValues,
                );
                if (transformedValue !== undefined) {
                  finalValues = mergeValues(
                    finalValues,
                    propPath,
                    transformedValue,
                  );
                }
              }
            }
          }
        }
      } else {
        // 处理对象的子级
        finalValues = loopRunTransform(
          {
            parentsKey: key,
            currentValues: itemValue,
            dataFormatMap,
          },
          finalValues,
        );
      }
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
