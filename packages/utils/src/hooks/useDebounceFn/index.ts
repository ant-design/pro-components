import { useCallback, useEffect, useRef } from 'react';
import { useRefFunction } from '../useRefFunction';
/**
 * 一个去抖的 hook，传入一个 function，返回一个去抖后的 function
 * @param  {(...args:T) => Promise<any>} fn
 * @param  {number} wait?
 */
export function useDebounceFn<T extends any[], U = any>(
  fn: (...args: T) => Promise<any>,
  wait?: number,
) {
  const callback = useRefFunction(fn);

  const timer = useRef<any>();

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const run = useCallback(
    async (...args: any): Promise<U | undefined> => {
      if (wait === 0 || wait === undefined) {
        return callback(...args);
      }
      cancel();
      return new Promise<U>((resolve) => {
        timer.current = setTimeout(async () => {
          resolve(await callback(...args));
          return;
        }, wait);
      });
    },
    [callback, cancel, wait],
  );

  useEffect(() => {
    return cancel;
  }, [cancel]);

  return {
    run,
    cancel,
  };
}
