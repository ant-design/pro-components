/**
 * 只有字面量对象才逐层合并。Date、dayjs、Map、File 等实例被展开后会丢失原型，
 * 变成不可用的普通对象，所以这些值直接整体覆盖。
 */
const isPlainObject = (value: unknown): value is Record<string, any> => {
  if (typeof value !== 'object' || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  // 用「原型的原型为 null」判断，兼容 Object.create(null) 与跨 iframe 的对象
  return proto === null || Object.getPrototypeOf(proto) === null;
};

/**
 * 用于合并 n 个对象
 * @param  {any[]} ...rest
 * @returns T
 */
const merge = <T = any>(...rest: any[]): T => {
  const obj = {} as Record<string, any> as any;
  const il = rest.length;
  let key;
  let i = 0;
  for (; i < il; i += 1) {
    for (key in rest[i]) {
      if (rest[i].hasOwnProperty(key)) {
        if (
          isPlainObject(obj[key]) &&
          // null 不覆盖已有的字面量对象，保持原有行为
          (rest[i][key] === null || isPlainObject(rest[i][key]))
        ) {
          obj[key] = {
            ...obj[key],
            ...rest[i][key],
          };
        } else {
          obj[key] = rest[i][key];
        }
      }
    }
  }
  return obj as T;
};

export { merge };
