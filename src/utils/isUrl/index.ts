import isString from 'lodash-es/isString';

/**
 * @description 判断是不是一个 url
 */
export const isUrl = (path: unknown): boolean => {
  if (!isString(path)) return false;
  if (!path.startsWith('http')) {
    return false;
  }
  try {
    new URL(path);
    return true;
  } catch {
    return false;
  }
};
