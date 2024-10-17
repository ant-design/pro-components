import deepMerge from 'lodash-es/merge';
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

export const transformKeySubmitValue = <T extends object = any>(
  values: T,
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
  omit: boolean = true,
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

  if (Object.keys(dataFormatMap).length < 1) {
    return values;
  }

  if (typeof window === 'undefined') return values;
  // 如果 value 是 string | null | Array | Blob类型 其中之一，直接返回
  // 形如 {key: [File, File]} 的表单字段当进行第二次递归时会导致其直接越过 typeof value !== 'object' 这一判断 https://github.com/ant-design/pro-components/issues/2071
  if (typeof values !== 'object' || isNil(values) || values instanceof Blob) {
    return values;
  }
  let finalValues: any = Array.isArray(values) ? [] : ({} as T);

  const gen = (tempValues: T, parentsKey?: React.Key[]) => {
    const isArrayValues = Array.isArray(tempValues);
    let result = isArrayValues ? ([] as any) : ({} as T);
    if (tempValues == null || tempValues === undefined) {
      return result;
    }

    Object.keys(tempValues).forEach((entityKey) => {
      const transformForArray = (transformList: any, subItemValue: any) => {
        if (!Array.isArray(transformList)) return entityKey;
        transformList.forEach(
          (transform: Function | Record<string, any> | any[], idx: number) => {
            // 如果不存在直接返回
            if (!transform) return;

            const subTransformItem = subItemValue?.[idx];

            // 如果是个方法，把key设置为方法的返回值
            if (typeof transform === 'function') {
              subItemValue[idx] = transform(
                subItemValue,
                entityKey,
                tempValues,
              );
            }
            if (typeof transform === 'object' && !Array.isArray(transform)) {
              Object.keys(transform).forEach((transformArrayItem) => {
                const subTransformItemValue =
                  subTransformItem?.[transformArrayItem];
                if (
                  typeof transform[transformArrayItem] === 'function' &&
                  subTransformItemValue
                ) {
                  const res = transform[transformArrayItem](
                    subTransformItem[transformArrayItem],
                    entityKey,
                    tempValues,
                  );
                  subTransformItem[transformArrayItem] =
                    typeof res === 'object' ? res[transformArrayItem] : res;
                } else if (
                  typeof transform[transformArrayItem] === 'object' &&
                  Array.isArray(transform[transformArrayItem]) &&
                  subTransformItemValue
                ) {
                  transformForArray(
                    transform[transformArrayItem],
                    subTransformItemValue,
                  );
                }
              });
            }
            if (
              typeof transform === 'object' &&
              Array.isArray(transform) &&
              subTransformItem
            ) {
              transformForArray(transform, subTransformItem);
            }
          },
        );
        return entityKey;
      };
      const key = parentsKey
        ? [parentsKey, entityKey].flat(1)
        : [entityKey].flat(1);
      const itemValue = (tempValues as any)[entityKey];

      const transformFunction = get(dataFormatMap, key as (number | string)[]);

      const transform = () => {
        let tempKey,
          transformedResult,
          isTransformedResultPrimitive = false;

        /**
         * 先判断是否是方法，是的话执行后拿到值，如果是基本类型，则认为是直接 transform 为新的值，
         * 如果返回是 Object 则认为是 transform 为新的 {newKey: newValue}
         */
        if (typeof transformFunction === 'function') {
          transformedResult = transformFunction?.(
            itemValue,
            entityKey,
            tempValues,
          );
          const typeOfResult = typeof transformedResult;
          if (typeOfResult !== 'object' && typeOfResult !== 'undefined') {
            tempKey = entityKey;
            isTransformedResultPrimitive = true;
          } else {
            tempKey = transformedResult;
          }
        } else {
          tempKey = transformForArray(transformFunction, itemValue);
        }

        // { [key:string]:any } 数组也能通过编译
        if (Array.isArray(tempKey)) {
          result = namePathSet(result, tempKey, itemValue);
          return;
        }
        if (typeof tempKey === 'object' && !Array.isArray(finalValues)) {
          finalValues = deepMerge(finalValues, tempKey);
        } else if (typeof tempKey === 'object' && Array.isArray(finalValues)) {
          result = { ...result, ...tempKey };
        } else if (tempKey !== null || tempKey !== undefined) {
          result = namePathSet(
            result,
            [tempKey],
            isTransformedResultPrimitive ? transformedResult : itemValue,
          );
        }
      };

      /** 如果存在转化器提前渲染一下 */
      if (transformFunction && typeof transformFunction === 'function') {
        transform();
      }

      if (typeof window === 'undefined') return;
      if (isPlainObj(itemValue)) {
        const genValues = gen(itemValue, key);
        if (Object.keys(genValues).length < 1) {
          return;
        }
        result = namePathSet(result, [entityKey], genValues);
        return;
      }
      transform();
    });
    // namePath、transform在omit为false时需正常返回 https://github.com/ant-design/pro-components/issues/2901#issue-908097115
    return omit ? result : tempValues;
  };

  finalValues =
    Array.isArray(values) && Array.isArray(finalValues)
      ? [...gen(values)]
      : merge({}, gen(values), finalValues);

  return finalValues as T;
};
