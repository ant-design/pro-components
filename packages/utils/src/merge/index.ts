/* eslint-disable prefer-rest-params */
const merge = <T>(...rest: any[]): T => {
  const obj = {};
  let i = 0;
  const il = rest.length;
  let key;
  for (; i < il; i += 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (key in rest[i]) {
      if (rest[i].hasOwnProperty(key)) {
        obj[key] = rest[i][key];
      }
    }
  }
  return obj as T;
};

export { merge };
