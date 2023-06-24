/**
 * 判断是不是一个 url
 * @param  {string|undefined} path
 * @returns boolean
 */
export const isUrl = (path: string | undefined): boolean => {
  if (!path) return false;
  if (!path.startsWith('http')) {
    return false;
  }
  try {
    const url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};
