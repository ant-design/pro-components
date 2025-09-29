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
      if (Object.prototype.hasOwnProperty.call(rest[i], key)) {
        if (
          typeof obj[key] === 'object' &&
          typeof rest[i][key] === 'object' &&
          obj[key] !== undefined &&
          obj[key] !== null &&
          !Array.isArray(obj[key]) &&
          !Array.isArray(rest[i][key])
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
