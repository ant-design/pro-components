/** 如果是个方法执行一下它 */
export function runFunction<T extends any[]>(valueEnum: any, ...rest: T) {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest);
  }
  return valueEnum;
}
/**
 * 延时执行函数
 * @param valueEnum
 * @param delay 为 0 时立即执行
 * @param rest
 * @returns
 */
export function runFunctionDelay<T extends any[]>(valueEnum: any, delay: number, ...rest: T) {
  if (delay && typeof delay === 'number' && delay !== 0) {
    setTimeout(() => runFunction(valueEnum, ...rest), delay);
    return;
  }
  runFunction(valueEnum, ...rest);
}
