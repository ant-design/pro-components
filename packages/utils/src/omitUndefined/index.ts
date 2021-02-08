const omitUndefined = <T>(obj: T): T | undefined => {
  const newObj = {} as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  if (Object.keys(newObj).length < 1) {
    return undefined;
  }
  return newObj;
};

export default omitUndefined;
