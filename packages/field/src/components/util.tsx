/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */
export const checkUndefinedOrNull = (value: any) =>
  value !== undefined && value !== null;

/**
 * 删除对象中所有的空值
 * @param obj
 */
export const removeObjectNull = (obj: { [key: string]: any }) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
