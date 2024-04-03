type OmitUndefined<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export const omitUndefined = <T extends Record<string, any>>(
  obj: T,
): OmitUndefined<T> => {
  const newObj = {} as Record<string, any> as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== undefined) {
      (newObj as any)[key] = obj[key];
    }
  });
  if (Object.keys(newObj as Record<string, any>).length < 1) {
    return undefined as any;
  }
  return newObj as OmitUndefined<T>;
};
