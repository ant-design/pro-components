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

  // 首先处理点号路径格式的转换
  const dotPathTransforms: Record<string, SearchTransformKeyFn> = {};
  const nestedTransforms: Record<string, any> = {};

  Object.keys(dataFormatMap).forEach((key) => {
    if (key.includes('.')) {
      dotPathTransforms[key] = dataFormatMap[key];
    } else {
      nestedTransforms[key] = dataFormatMap[key];
    }
  });

  // 深拷贝值以避免修改原始对象
  let result = JSON.parse(JSON.stringify(values));

  // 处理点号路径转换
  Object.keys(dotPathTransforms).forEach((dotPath) => {
    const transform = dotPathTransforms[dotPath];
    const pathArray = dotPath.split('.').map((segment, index, arr) => {
      // 检查父路径是否指向数组
      if (index > 0) {
        const parentPath = arr.slice(0, index);
        const parentValue = get(result, parentPath);
        if (Array.isArray(parentValue) && /^\d+$/.test(segment)) {
          return parseInt(segment, 10);
        }
      }
      return segment;
    });

    // 获取当前路径的值
    const currentValue = get(result, pathArray);

    if (currentValue !== undefined && typeof transform === 'function') {
      // 执行转换
      const transformed = transform(
        currentValue,
        pathArray.map(String),
        result,
      );

      if (
        typeof transformed === 'object' &&
        transformed !== null &&
        !Array.isArray(transformed)
      ) {
        // 如果返回对象，将其键值对合并到父级对象中
        const parentPath = pathArray.slice(0, -1);
        const parentObj =
          parentPath.length > 0 ? get(result, parentPath) : result;

        if (parentObj && typeof parentObj === 'object') {
          // 删除原来的键
          const keyToDelete = pathArray[pathArray.length - 1];
          delete parentObj[keyToDelete];

          // 将转换结果的所有键值对添加到父对象
          Object.assign(parentObj, transformed);
        }
      } else {
        // 如果返回原始值，直接设置
        // 特殊处理数组索引 - 直接修改数组元素
        if (pathArray.length > 1) {
          const parentPath = pathArray.slice(0, -1);
          const parentObj = get(result, parentPath);
          const lastKey = pathArray[pathArray.length - 1];

          if (Array.isArray(parentObj) && typeof lastKey === 'number') {
            parentObj[lastKey] = transformed;
          } else {
            namePathSet(result, pathArray, transformed);
          }
        } else {
          namePathSet(result, pathArray, transformed);
        }
      }
    }
  });

  // 处理传统的嵌套对象格式的转换（向后兼容）
  const gen = (tempValues: T, parentsKey?: React.Key[]) => {
    const isArrayValues = Array.isArray(tempValues);
    let tempResult = isArrayValues ? ([] as any) : ({} as T);
    if (tempValues == null || tempValues === undefined) {
      return tempResult;
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

      // 查找 transform 函数，支持多种键名格式
      let transformFunction = get(
        nestedTransforms,
        key as (number | string)[],
      );

      // 如果没找到，尝试用字符串键名查找
      if (!transformFunction) {
        const stringKey = Array.isArray(key) ? key.join('.') : key;
        transformFunction = nestedTransforms[stringKey];
      }

      // 如果还没找到，尝试用数组键名查找
      if (!transformFunction && Array.isArray(key)) {
        transformFunction = get(nestedTransforms, key as (string | number)[]);
      }

      // 如果还没找到，尝试递归查找嵌套对象
      if (!transformFunction) {
        const findTransformInNested = (obj: any, path: (string | number)[]): any => {
          if (!obj || typeof obj !== 'object') return undefined;
          
          // 尝试直接匹配路径
          const directMatch = get(obj, path);
          if (typeof directMatch === 'function') return directMatch;
          
          // 递归查找
          for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'function') {
              // 检查是否是我们要找的路径
              if (Array.isArray(path) && path.length === 1 && path[0] === key) {
                return value;
              }
            } else if (typeof value === 'object' && value !== null) {
              const nestedResult = findTransformInNested(value, path);
              if (nestedResult) return nestedResult;
            }
          }
          return undefined;
        };
        
        transformFunction = findTransformInNested(nestedTransforms, key as (string | number)[]);
      }

      // 如果还没找到，尝试在 dataFormatMapRaw 中查找
      if (!transformFunction) {
        const findTransformInRaw = (obj: any, path: (string | number)[]): any => {
          if (!obj || typeof obj !== 'object') return undefined;
          
          // 尝试直接匹配路径
          const directMatch = get(obj, path);
          if (typeof directMatch === 'function') return directMatch;
          
          // 递归查找
          for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'function') {
              // 检查是否是我们要找的路径
              if (Array.isArray(path) && path.length === 1 && path[0] === key) {
                return value;
              }
            } else if (typeof value === 'object' && value !== null) {
              const nestedResult = findTransformInRaw(value, path);
              if (nestedResult) return nestedResult;
            }
          }
          return undefined;
        };
        
        transformFunction = findTransformInRaw(dataFormatMapRaw, key as (string | number)[]);
      }

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
          tempResult = namePathSet(tempResult, tempKey, itemValue);
          return;
        }
        if (typeof tempKey === 'object' && !Array.isArray(finalValues)) {
          finalValues = deepMerge(finalValues, tempKey);
        } else if (typeof tempKey === 'object' && Array.isArray(finalValues)) {
          tempResult = { ...tempResult, ...tempKey };
        } else if (tempKey !== null || tempKey !== undefined) {
          tempResult = namePathSet(
            tempResult,
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
        tempResult = namePathSet(tempResult, [entityKey], genValues);
      } else {
        tempResult = namePathSet(tempResult, [entityKey], itemValue);
      }
    });

    return tempResult;
  };

  const genResult = gen(result);
  
  // 合并 finalValues 和 genResult
  if (Object.keys(finalValues).length > 0) {
    return deepMerge(genResult, finalValues);
  }
  
  return Object.keys(genResult).length > 0 ? genResult : result;
};
