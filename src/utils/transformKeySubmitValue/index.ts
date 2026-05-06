import { get } from '@rc-component/util';
import { cloneDeep } from 'lodash-es';
import React from 'react';
import { isNil } from '../isNil';
import type { SearchTransformKeyFn } from '../typing';

export interface DataFormatMapType {
  [key: string]: SearchTransformKeyFn | undefined | DataFormatMapType;
}

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
  // 用 Object.keys 替代 for...in：
  //  - for...in 会遍历到原型链上的 enumerable 属性（虽然这里上游已经过滤过，但守门更稳）
  //  - Object.keys 在 ES2015+ 明确按「先整数升序、再字符串插入序」遍历，多个 transform
  //    路径相互覆盖时（如 'a.b' 和 'a.c' 都返回对象 merge 到 a）顺序更可预期
  for (const dotPath of Object.keys(dotPathTransforms)) {
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
      // 如果返回对象，需要按父节点形状分别处理：
      // - 父节点是数组（如 `'list.0' -> v => ({X: 'A'})`）：旧实现走 `delete list[0]`
      //   + `Object.assign(list, {X:'A'})`，会把 list 变成 `[<empty>, ..., X:'A']`，
      //   即在数组上加 string key、留下空 slot，破坏数组形状。改为直接把返回对象整体
      //   赋值到该索引位置（`list[0] = {X:'A'}`）。
      // - 父节点是对象（如 `'users.0.name' -> v => ({displayName:v})`，此时 parent 是
      //   `users[0]` 这个对象元素）：保持现有协议 —— 删原 key + 合并新对象到该父对象。
      //   这是测试 `transforms array values` 锁定的行为。
      const parentPath = pathArray.slice(0, -1);
      const parentObj =
        parentPath.length > 0 ? get(result, parentPath) : result;
      const lastKey = pathArray[pathArray.length - 1];

      if (Array.isArray(parentObj)) {
        // 父节点是数组：直接整体替换该索引位置的值
        parentObj[lastKey as number] = transformed;
      } else if (parentObj && typeof parentObj === 'object') {
        // 父节点是对象：保持原协议（删旧 key + 合并新对象）
        delete parentObj[lastKey];
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
 * 等价于沿 `[...parentsKey, entityKey]` 路径在 `currentTransforms` 上下钻：
 *  - 中间任意一段不是对象（缺失 / null / 原始值 / 函数等） → 视为找不到，返回 undefined；
 *  - 最终落点必须是 function 才返回，否则返回 undefined。
 *
 * 旧实现是 28 行手写循环，这里改用 `lodash-es/get` 一行实现：`get` 在路径走不下去时
 * 返回 undefined，与原循环里 `nestedTransforms = null; break;` 行为等价。
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
  // React.Key = string | number | bigint，但 lodash get 的 path 段不接受 bigint，
  // 所以这里把整条路径段都用 String() 归一化为字符串再传入。lodash get 内部会按
  // 数字字符串自动处理数组索引，行为与原循环里 `String(parentKey)` 等价。
  const path = [...parentsKey.map(String), entityKey];
  const candidate = get(currentTransforms, path);
  return typeof candidate === 'function' ? candidate : undefined;
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
 * @param currentValues - 当前递归层要处理的 values 子树
 * @param parentsKey - 当前递归层在 root values 上的父级路径
 * @param currentTransforms - 当前递归层对应的 transforms 子树
 * @param rootLevelMerges - 收集所有「应在 root 上合并」的 transform 返回对象
 * @param rootAllValues - 根级表单对象（与 `SearchTransformKeyFn` 第三参一致），整次转换过程中保持不变引用
 * @returns 处理后的结果
 *
 * 设计说明：旧实现带有 `visited: Set<any>` 用于防止循环引用，但 `transformKeySubmitValue`
 * 入口已经做过 `cloneDeep(values)`，且 antd Form 的 values 由用户输入序列化产生，必然
 * 是 DAG / 树结构（无循环引用），该 Set 是 dead code，已删除以减少递归参数数量。
 */
function processNestedObjectTransforms(
  currentValues: any,
  parentsKey: React.Key[] | undefined,
  currentTransforms: any,
  rootLevelMerges: any[],
  rootAllValues: any,
): any {
  const isArrayValues = Array.isArray(currentValues);
  const currentResult: any = isArrayValues ? [] : {};

  if (currentValues == null || currentValues === undefined) {
    return currentResult;
  }

  // 确定要处理的键
  const keysToProcess = isArrayValues
    ? currentValues.map((_: unknown, index: number) => index.toString())
    : Object.keys(currentValues);

  for (const entityKey of keysToProcess) {
    const nextParentsKey = parentsKey
      ? [...parentsKey, entityKey]
      : [entityKey];
    const itemValue = currentValues[entityKey];

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
      const namePath = nextParentsKey.map((k) => String(k));
      const transformed = transformFunction(
        itemValue,
        namePath,
        rootAllValues,
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
          Object.assign(currentResult, transformed);
        } else {
          // 如果不是数组元素，将其存储到 rootLevelMerges 以便在根级别合并
          rootLevelMerges.push(transformed);
        }
      } else {
        // 如果返回原始值，用新键替换
        currentResult[entityKey] = transformed;
      }
    } else if (isPlainObj(itemValue) && !isNil(itemValue)) {
      // 递归处理嵌套对象（但跳过 null 值）
      const nestedTransforms = currentTransforms[entityKey];
      if (nestedTransforms && typeof nestedTransforms === 'object') {
        // 如果当前键有嵌套转换配置，传递嵌套配置
        const nested = processNestedObjectTransforms(
          itemValue,
          nextParentsKey,
          nestedTransforms,
          rootLevelMerges,
          rootAllValues,
        );
        // 检查是否有任何子属性被转换为对象（会被添加到 rootLevelMerges）
        // 如果 nested 为空或只包含被转换的属性，我们不保留这个对象
        const hasRemainingContent = Object.keys(nested).length > 0;
        if (hasRemainingContent) {
          currentResult[entityKey] = nested;
        }
      } else {
        // 否则继续使用当前转换配置递归
        const nested = processNestedObjectTransforms(
          itemValue,
          nextParentsKey,
          currentTransforms,
          rootLevelMerges,
          rootAllValues,
        );
        currentResult[entityKey] = nested;
      }
    } else if (!isNil(itemValue)) {
      // 历史协议（"ignore null"，详见 tests/utils/index.test.tsx#943）：
      // 没有 transform 配置且值为 null / undefined 的字段会被静默忽略，最终结果里
      // 该字段为 undefined。如果想改成「保留原 null/undefined」需要先评估外部影响
      // 并同步更新该测试，本轮不动。
      currentResult[entityKey] = itemValue;
    }
  }

  return currentResult;
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
  let result = cloneDeep(values);

  // 分别处理不同格式的转换配置
  const { dotPathTransforms, objectTransforms } =
    separateTransformFormats(dataFormatMapRaw);

  // 处理点号路径格式的转换（如 'users.0.name'）
  processDotPathTransforms(result, dotPathTransforms);

  // 收集所有「应在 root 上合并」的 transform 返回对象
  const rootLevelMerges: any[] = [];

  // 处理传统的嵌套对象格式转换（向后兼容）
  if (Object.keys(objectTransforms).length > 0) {
    result = processNestedObjectTransforms(
      result,
      undefined,
      objectTransforms,
      rootLevelMerges,
      result,
    );
  }

  // 将所有根级合并对象合并到最终结果
  for (const obj of rootLevelMerges) {
    Object.assign(result, obj);
  }

  return result;
};
