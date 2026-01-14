import { get } from '@rc-component/util';
import React from 'react';
import { isNil } from '../isNil';
import type { SearchTransformKeyFn } from '../typing';

export type DataFormatMapType = Record<
  string,
  SearchTransformKeyFn | undefined
>;

/**
 * 判断一个值是否为普通对象（可以被遍历的对象）
 * 暂时还不支持 Set 和 Map 结构
 *
 * @param itemValue - 要检查的值
 * @returns 如果是普通对象返回 true，否则返回 false
 */
export function isPlainObj(itemValue: any): boolean {
  // 如果不是对象类型，直接返回 false
  if (typeof itemValue !== 'object') {
    return false;
  }

  // Null 也要处理，不然 omit 空值会失效
  if (itemValue === null) {
    return true;
  }

  // 排除各种特殊对象类型
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

/**
 * 将点号路径字符串转换为路径数组
 * 例如: 'users.0.name' => ['users', 0, 'name']
 *
 * @param dotPath - 点号分隔的路径字符串
 * @returns 路径数组，数字会被转换为数字类型
 */
function parseDotPath(dotPath: string): (string | number)[] {
  return dotPath.split('.').map((segment) => {
    // 如果是纯数字，转换为数字类型用于数组索引
    return /^\d+$/.test(segment) ? parseInt(segment, 10) : segment;
  });
}

/**
 * 过滤掉空值的转换配置
 *
 * @param dataFormatMapRaw - 原始转换配置
 * @returns 过滤后的转换配置
 */
function filterNilTransforms(
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
): Record<string, SearchTransformKeyFn> {
  const filtered: Record<string, SearchTransformKeyFn> = {};

  for (const key in dataFormatMapRaw) {
    const value = dataFormatMapRaw[key];
    if (!isNil(value)) {
      filtered[key] = value as SearchTransformKeyFn;
    }
  }

  return filtered;
}

/**
 * 将转换配置分为点号路径格式和传统嵌套对象格式
 *
 * @param dataFormatMapRaw - 原始转换配置
 * @returns 包含两种格式转换配置的对象
 */
function separateTransformFormats(
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
): {
  dotPathTransforms: Record<string, SearchTransformKeyFn>;
  objectTransforms: Record<string, any>;
} {
  const dotPathTransforms: Record<string, SearchTransformKeyFn> = {};
  const objectTransforms: Record<string, any> = {};

  for (const key in dataFormatMapRaw) {
    const value = dataFormatMapRaw[key];
    if (isNil(value)) continue;

    if (key.includes('.')) {
      dotPathTransforms[key] = value as SearchTransformKeyFn;
    } else {
      objectTransforms[key] = value;
    }
  }

  return { dotPathTransforms, objectTransforms };
}

/**
 * 处理点号路径格式的转换
 * 例如: 'users.0.name' => 转换 users[0].name 的值
 *
 * @param result - 要转换的数据对象
 * @param dotPathTransforms - 点号路径转换配置
 */
function processDotPathTransforms(
  result: any,
  dotPathTransforms: Record<string, SearchTransformKeyFn>,
): void {
  for (const dotPath in dotPathTransforms) {
    const transform = dotPathTransforms[dotPath];
    if (typeof transform !== 'function') continue;

    // 将点号路径转换为数组路径
    const pathArray = parseDotPath(dotPath);

    // 获取要转换的值
    const currentValue = get(result, pathArray);
    if (currentValue === undefined) continue;

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
      // 手动设置嵌套路径的值，确保数组索引正确处理
      let current = result;
      for (let i = 0; i < pathArray.length - 1; i++) {
        const key = pathArray[i];
        if (current[key] === undefined) {
          // 如果下一个键是数字，创建数组，否则创建对象
          const nextKey = pathArray[i + 1];
          current[key] = typeof nextKey === 'number' ? [] : {};
        }
        current = current[key];
      }
      current[pathArray[pathArray.length - 1]] = transformed;
    }
  }
}

/**
 * 在嵌套转换配置中查找转换函数
 *
 * @param currentTransforms - 当前转换配置
 * @param parentsKey - 父级路径
 * @param entityKey - 当前实体键
 * @returns 找到的转换函数或 undefined
 */
function findNestedTransformFunction(
  currentTransforms: any,
  parentsKey: React.Key[],
  entityKey: string,
): SearchTransformKeyFn | undefined {
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

  if (nestedTransforms && typeof nestedTransforms[entityKey] === 'function') {
    return nestedTransforms[entityKey];
  }

  return undefined;
}

/**
 * 检查路径是否包含数组索引
 *
 * @param parentsKey - 父级路径数组
 * @returns 如果包含数组索引返回 true
 */
function isInArrayPath(parentsKey: React.Key[]): boolean {
  return parentsKey.some((key) => !isNaN(Number(key)));
}

/**
 * 递归处理嵌套对象转换（传统格式）
 *
 * @param tempValues - 要处理的值
 * @param parentsKey - 父级路径
 * @param currentTransforms - 当前转换配置
 * @param rootMergeObjects - 存储需要在根级别合并的对象
 * @returns 处理后的结果
 */
function processNestedObjectTransforms(
  tempValues: any,
  parentsKey: React.Key[] | undefined,
  currentTransforms: any,
  rootMergeObjects: any[],
  rootValues: any,
): any {
  const isArrayValues = Array.isArray(tempValues);
  let tempResult: any = isArrayValues ? [] : {};

  if (tempValues == null || tempValues === undefined) {
    return tempResult;
  }

  // 确定要处理的键
  const keysToProcess = isArrayValues
    ? tempValues.map((_, index) => index.toString())
    : Object.keys(tempValues);

  for (const entityKey of keysToProcess) {
    const key = parentsKey ? [...parentsKey, entityKey] : [entityKey];
    const itemValue = tempValues[entityKey];

    // 查找转换函数
    let transformFunction = currentTransforms[entityKey];

    // 如果没找到并且是嵌套路径，尝试在嵌套对象中查找
    if (!transformFunction && parentsKey) {
      transformFunction = findNestedTransformFunction(
        currentTransforms,
        parentsKey,
        entityKey,
      );
    }

    if (transformFunction && typeof transformFunction === 'function') {
      // 执行转换
      const transformed = transformFunction(
        itemValue,
        key.map(String),
        rootValues,
      );

      if (
        typeof transformed === 'object' &&
        transformed !== null &&
        !Array.isArray(transformed)
      ) {
        // 检查当前项是否在数组中
        const isInArray = parentsKey ? isInArrayPath(parentsKey) : false;

        if (isInArray) {
          // 如果是数组元素内的转换，直接合并到当前结果
          Object.assign(tempResult, transformed);
        } else {
          // 如果不是数组元素，将其存储到 rootMergeObjects 以便在根级别合并
          rootMergeObjects.push(transformed);
        }
      } else {
        // 如果返回原始值，用新键替换
        tempResult[entityKey] = transformed;
      }
    } else if (isPlainObj(itemValue) && !isNil(itemValue)) {
      // 递归处理嵌套对象（但跳过 null 值）
      const nestedTransforms = currentTransforms[entityKey];
      if (nestedTransforms && typeof nestedTransforms === 'object') {
        // 如果当前键有嵌套转换配置，传递嵌套配置
        const nested = processNestedObjectTransforms(
          itemValue,
          key,
          nestedTransforms,
          rootMergeObjects,
          rootValues,
        );
        // 检查是否有任何子属性被转换为对象（会被添加到 rootMergeObjects）
        // 如果 nested 为空或只包含被转换的属性，我们不保留这个对象
        const hasRemainingContent = Object.keys(nested).length > 0;
        if (hasRemainingContent) {
          tempResult[entityKey] = nested;
        }
      } else {
        // 否则继续使用当前转换配置递归
        const nested = processNestedObjectTransforms(
          itemValue,
          key,
          currentTransforms,
          rootMergeObjects,
          rootValues,
        );
        tempResult[entityKey] = nested;
      }
    } else if (!isNil(itemValue)) {
      // 保留非 null/undefined 原始值
      tempResult[entityKey] = itemValue;
    }
  }

  return tempResult;
}

/**
 * 转换提交值中的键名
 * 支持两种格式的转换配置：
 * 1. 点号路径格式：'users.0.name' => 转换嵌套路径的值
 * 2. 传统嵌套对象格式：{ users: { 0: { name: transformFn } } }
 *
 * @param values - 要转换的值对象
 * @param dataFormatMapRaw - 转换配置映射
 * @returns 转换后的值对象
 */
export const transformKeySubmitValue = <T extends object = any>(
  values: T,
  dataFormatMapRaw: Record<
    string,
    SearchTransformKeyFn | undefined | DataFormatMapType
  >,
): T => {
  // 过滤掉空值的转换配置
  const dataFormatMap = filterNilTransforms(dataFormatMapRaw);

  // 如果没有有效的转换配置，直接返回原值
  if (Object.keys(dataFormatMap).length < 1) {
    return values;
  }

  // 在服务端环境下直接返回原值
  if (typeof window === 'undefined') {
    return values;
  }

  // 如果 value 是 string | null | Array | Blob 类型其中之一，直接返回
  // 形如 {key: [File, File]} 的表单字段当进行第二次递归时会导致其直接越过 typeof value !== 'object' 这一判断
  // https://github.com/ant-design/pro-components/issues/2071
  if (typeof values !== 'object' || isNil(values) || values instanceof Blob) {
    return values;
  }

  // 创建一个深拷贝来避免修改原始数据
  let result = JSON.parse(JSON.stringify(values));

  // 分别处理不同格式的转换配置
  const { dotPathTransforms, objectTransforms } =
    separateTransformFormats(dataFormatMapRaw);

  // 处理点号路径格式的转换（如 'users.0.name'）
  processDotPathTransforms(result, dotPathTransforms);

  // 存储需要在根级别合并的对象
  const rootMergeObjects: any[] = [];

  // 处理传统的嵌套对象格式转换（向后兼容）
  if (Object.keys(objectTransforms).length > 0) {
    result = processNestedObjectTransforms(
      result,
      undefined,
      objectTransforms,
      rootMergeObjects,
      result,
    );
  }

  // 将所有根级别合并对象合并到最终结果
  for (const obj of rootMergeObjects) {
    Object.assign(result, obj);
  }

  return result;
};
