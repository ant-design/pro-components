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

const mergeValues = <T = Record<string, any>>(
  allValues: T,
  entityKey: (string | number)[],
  value: any,
) => {
  const keyAsStringArray = entityKey.map((k) => String(k));

  // if transform returns an object, we need to merge it
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const parentKey = keyAsStringArray.slice(0, -1);
    const lastKey = keyAsStringArray[keyAsStringArray.length - 1];

    if (parentKey.length === 0) {
      const newAllValues = { ...(allValues as any) };
      delete newAllValues[lastKey];
      return merge(newAllValues, value);
    }

    const parentObject = get(allValues, parentKey);
    if (
      parentObject &&
      typeof parentObject === 'object' &&
      !Array.isArray(parentObject)
    ) {
      const newParent = { ...parentObject };
      delete newParent[lastKey];
      const mergedParent = merge(newParent, value);
      return namePathSet(allValues, parentKey, mergedParent);
    }
  }

  return namePathSet(allValues, keyAsStringArray, value);
};

const loopRunTransform = <T = Record<string, any>>(
  {
    currentValues,
    parentsKey,
    dataFormatMap,
  }: {
    currentValues: any;
    parentsKey: (string | number)[];
    dataFormatMap: Record<string, SearchTransformKeyFn>;
  },
  allValues: T,
): T => {
  let finalValues = allValues;

  const keys = Array.isArray(currentValues)
    ? currentValues.map((_, i) => i)
    : Object.keys(currentValues);

  for (const key of keys) {
    const newParentsKey = [...parentsKey, key];
    const originalChild = get(currentValues, [key]);

    // Recurse first (post-order traversal)
    if (originalChild && typeof originalChild === 'object') {
      finalValues = loopRunTransform(
        {
          currentValues: originalChild,
          parentsKey: newParentsKey,
          dataFormatMap,
        },
        finalValues,
      );
    }

    // Apply transform for the current path
    const pathString = newParentsKey.join('.');
    const transformFunction = dataFormatMap[pathString];

    if (typeof transformFunction === 'function') {
      const valueToTransform = get(finalValues, newParentsKey);
      const transformedValue = transformFunction(
        valueToTransform,
        newParentsKey.map(String),
        finalValues,
      );

      if (transformedValue !== undefined) {
        finalValues = mergeValues(finalValues, newParentsKey, transformedValue);
      }
    }
  }

  return finalValues;
};

/**
 * @param values
 * @param dataFormatMapRaw
 */
export const transformKeySubmitValue = <T extends object = any>(
  values: T,
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
) => {
  const dataFormatMap = generateDataFormatMap(dataFormatMapRaw);

  if (Object.keys(dataFormatMap).length === 0) {
    return values;
  }

  // deep clone
  const finalValues = loopRunTransform<T>(
    {
      currentValues: values,
      parentsKey: [],
      dataFormatMap,
    },
    JSON.parse(JSON.stringify(values)),
  );

  return finalValues;
};
