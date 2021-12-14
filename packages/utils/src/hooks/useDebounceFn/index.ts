import type { DependencyList } from 'react';
import { useEffect, useRef, useCallback } from 'react';

export type ReturnValue<T extends any[], U = any> = {
  run: (...args: T) => Promise<U>;
  cancel: () => void;
};
const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    return () => undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

function useDebounceFn<T extends any[], U = any>(
  fn: (...args: T) => Promise<any>,
  deps: DependencyList | number,
  wait?: number,
  disableAutoCancel?: boolean,
): ReturnValue<T, U> {
  // eslint-disable-next-line no-underscore-dangle
  const hooksDeps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  // eslint-disable-next-line no-underscore-dangle
  const hookWait: number = typeof deps === 'number' ? deps : wait || 0;
  const timer = useRef<any>();

  const fnRef = useRef<any>(fn);
  /** 如果这个方法被清理里，应该报错，这样就可以减少错误信息了 */
  const rejectRef = useRef<any>(() => {});
  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (wait !== 0) rejectRef.current?.();
    if (disableAutoCancel) return;
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, [disableAutoCancel]);

  const run = useCallback(
    async (...args: any): Promise<U> => {
      if (wait === 0) {
        return fnRef.current(...args);
      }
      return new Promise<U>((resolve, reject) => {
        cancel();
        rejectRef.current = reject;
        timer.current = setTimeout(async () => {
          const data = await fnRef.current(...args);
          resolve(data);
        }, hookWait);
      });
    },
    [wait, cancel, hookWait],
  );

  useUpdateEffect(() => {
    run();
    return cancel;
  }, [...hooksDeps, run]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    return () => cancel();
  }, []);

  return {
    run,
    cancel,
  };
}

export default useDebounceFn;
