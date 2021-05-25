function deepMerge<T>(target: T, source: T) {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      // eslint-disable-next-line no-param-reassign
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      // eslint-disable-next-line no-param-reassign
      target[key] = deepMerge({ ...targetValue }, sourceValue);
    } else {
      // eslint-disable-next-line no-param-reassign
      target[key] = sourceValue;
    }
  });

  return target;
}

export default deepMerge;
