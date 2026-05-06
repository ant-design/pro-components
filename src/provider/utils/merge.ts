/**
 * 只合并一层深的对象合并工具。
 *
 * 与 lodash.merge 的区别：仅对**顶层同名的普通对象**做一次 `{...a, ...b}` 展开，
 * 再深一层的嵌套对象会被整体覆盖而不是继续递归合并。数组一律走覆盖语义。
 *
 * 在 ProProvider 里用来合并 token 时足够了，因为 layout token 的深合并已经
 * 在 `getLayoutDesignToken` 里提前做过。
 *
 * @example
 *   shallowMergeOneLevel({ a: { x: 1 } }, { a: { y: 2 } })
 *   // => { a: { x: 1, y: 2 } }  ← 顶层对象合并
 *
 *   shallowMergeOneLevel({ a: { b: { x: 1 } } }, { a: { b: { y: 2 } } })
 *   // => { a: { b: { y: 2 } } } ← 二层对象被覆盖，不会深合并
 */
export const shallowMergeOneLevel = <T extends Record<string, any>>(
  ...sources: any[]
): T => {
  const result = {} as Record<string, any>;
  for (let i = 0; i < sources.length; i += 1) {
    const source = sources[i];
    if (!source) continue;
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      const prev = result[key];
      const next = source[key];
      const canMerge =
        typeof prev === 'object' &&
        typeof next === 'object' &&
        prev !== null &&
        next !== null &&
        !Array.isArray(prev) &&
        !Array.isArray(next);
      result[key] = canMerge ? { ...prev, ...next } : next;
    }
  }
  return result as T;
};

/**
 * @deprecated 名字误导（会被误以为是 lodash.merge 的递归深合并）。
 * 请改用语义更明确的 `shallowMergeOneLevel`。本别名仅为兼容老调用点，下个大版本移除。
 */
export const merge = shallowMergeOneLevel;
