const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

/**
 * 用于判断当前是否在浏览器环境中。
 * 首先会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 true。否则，会进一步判断是否存在 window 对象、document 对象以及 matchMedia 方法
 * 同时通过 !isNode 判断当前不是在服务器（Node.js）环境下执行，
 * 如果都符合，则返回 true 表示当前处于浏览器环境中。
 * @returns  boolean
 */
export const isBrowser = () => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'TEST') {
    return true;
  }
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.matchMedia !== 'undefined' &&
    !isNode
  );
};
