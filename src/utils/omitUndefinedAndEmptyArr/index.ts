export const omitUndefinedAndEmptyArr = <T extends Record<string, any>>(
  obj: T,
): T => {
  const newObj = {} as Record<string, any> as Record<string, any>;
  Object.keys(obj || {}).forEach((key) => {
    if (Array.isArray(obj[key]) && obj[key]?.length === 0) {
      return;
    }
    if (obj[key] === undefined) {
      return;
    }
    newObj[key] = obj[key];
  });
  return newObj as T;
};
