const pickUndefined = <T>(obj: T): T => {
  const newObj = {} as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== undefined && obj[key]?.length !== 0) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export default pickUndefined;
