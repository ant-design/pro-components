import get from 'rc-util/lib/utils/get';
import namePathSet from 'rc-util/lib/utils/set';
import React from 'react';
import { isNil } from '../isNil';
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
) => {
  // ignore nil transform
  const dataFormatMap = Object.keys(dataFormatMapRaw).reduce(
    (ret, key) => {
      const value = dataFormatMapRaw[key];
      if (!isNil(value)) {
        // eslint-disable-next-line no-param-reassign
        ret[key] = value as SearchTransformKeyFn; // can't be undefined
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

  // 创建一个深拷贝来避免修改原始数据
  let result = JSON.parse(JSON.stringify(values));

  // 分别处理不同格式的转换配置
  const dotPathTransforms: Record<string, SearchTransformKeyFn> = {};
  const objectTransforms: Record<string, any> = {};

  Object.keys(dataFormatMapRaw).forEach((key) => {
    const value = dataFormatMapRaw[key];
    if (isNil(value)) return;

    if (key.includes('.')) {
      dotPathTransforms[key] = value as SearchTransformKeyFn;
    } else {
      objectTransforms[key] = value;
    }
  });

  // 处理点号路径格式的转换（如 'users.0.name'）
  Object.keys(dotPathTransforms).forEach((dotPath) => {
    const transform = dotPathTransforms[dotPath];
    if (typeof transform !== 'function') return;

    // 将点号路径转换为数组路径
    const pathArray = dotPath.split('.').map((segment) => {
      // 如果是纯数字，转换为数字类型用于数组索引
      return /^\d+$/.test(segment) ? parseInt(segment, 10) : segment;
    });

    // 获取要转换的值
    const currentValue = get(result, pathArray);
    if (currentValue === undefined) return;

    // 执行转换
    const transformed = transform(currentValue, pathArray.map(String), result);

    if (
      typeof transformed === 'object' &&
      transformed !== null &&
      !Array.isArray(transformed)
    ) {
      // 如果返回对象，删除原键并将对象的键值对合并到父级
      const parentPath = pathArray.slice(0, -1);
      const parentObj =
        parentPath.length > 0 ? get(result, parentPath) : result;

      if (parentObj && typeof parentObj === 'object') {
        const keyToDelete = pathArray[pathArray.length - 1];
        delete parentObj[keyToDelete];
        Object.assign(parentObj, transformed);
      }
    } else {
      // 如果返回原始值，直接替换
      result = namePathSet(result, pathArray, transformed);
    }
  });

  // 存储需要在根级别合并的对象
  const rootMergeObjects: any[] = [];

  // 处理传统的嵌套对象格式转换（向后兼容）
  const gen = (
    tempValues: any,
    parentsKey?: React.Key[],
    currentTransforms: any = objectTransforms,
  ): any => {
    const isArrayValues = Array.isArray(tempValues);
    let tempResult: any = isArrayValues ? [] : {};

    if (tempValues == null || tempValues === undefined) {
      return tempResult;
    }

    const keysToProcess = isArrayValues
      ? tempValues.map((_, index) => index.toString())
      : Object.keys(tempValues);

    keysToProcess.forEach((entityKey) => {
      const key = parentsKey ? [...parentsKey, entityKey] : [entityKey];
      const itemValue = tempValues[entityKey];

      // 查找转换函数
      let transformFunction = currentTransforms[entityKey];

      // 如果没找到并且是嵌套路径，尝试在嵌套对象中查找
      if (!transformFunction && parentsKey) {
        let nestedTransforms: any = currentTransforms;
        for (const parentKey of parentsKey) {
          const parentKeyStr = String(parentKey);
          if (
            nestedTransforms &&
            typeof nestedTransforms[parentKeyStr] === 'object'
          ) {
            nestedTransforms = nestedTransforms[parentKeyStr];
          } else {
            nestedTransforms = null;
            break;
          }
        }
        if (
          nestedTransforms &&
          typeof nestedTransforms[entityKey] === 'function'
        ) {
          transformFunction = nestedTransforms[entityKey];
        }
      }

      if (transformFunction && typeof transformFunction === 'function') {
        // 执行转换
        const transformed = transformFunction(itemValue, entityKey, tempValues);

        if (
          typeof transformed === 'object' &&
          transformed !== null &&
          !Array.isArray(transformed)
        ) {
          // 检查当前项是否在数组中（通过检查parentsKey的路径）
          const isInArray =
            parentsKey && parentsKey.some((key) => !isNaN(Number(key)));

          if (isInArray) {
            // 如果是数组元素内的转换，直接合并到当前结果
            Object.assign(tempResult, transformed);
          } else {
            // 如果不是数组元素，将其存储到rootMergeObjects以便在根级别合并
            rootMergeObjects.push(transformed);
          }
        } else {
          // 如果返回原始值，用新键替换
          tempResult[entityKey] = transformed;
        }
      } else if (isPlainObj(itemValue) && !isNil(itemValue)) {
        // 递归处理嵌套对象（但跳过null值）
        const nestedTransforms = currentTransforms[entityKey];
        if (nestedTransforms && typeof nestedTransforms === 'object') {
          // 如果当前键有嵌套转换配置，传递嵌套配置
          const nested = gen(itemValue, key, nestedTransforms);
          // 检查是否有任何子属性被转换为对象（会被添加到rootMergeObjects）
          // 如果nested为空或只包含被转换的属性，我们不保留这个对象
          const hasRemainingContent = Object.keys(nested).length > 0;
          if (hasRemainingContent) {
            tempResult[entityKey] = nested;
          }
        } else {
          // 否则继续使用当前转换配置递归
          const nested = gen(itemValue, key, currentTransforms);
          tempResult[entityKey] = nested;
        }
      } else if (!isNil(itemValue)) {
        // 保留非null/undefined原始值
        tempResult[entityKey] = itemValue;
      }
    });

    return tempResult;
  };

  // 应用嵌套对象转换
  if (Object.keys(objectTransforms).length > 0) {
    result = gen(result);
  }

  // 将所有根级别合并对象合并到最终结果
  rootMergeObjects.forEach((obj) => {
    Object.assign(result, obj);
  });

  return result;
};
