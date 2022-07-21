import { useCallback, useEffect, useRef } from 'react';
import { act } from 'react-dom/test-utils';
import { useRefFunction } from '../useRefFunction';

function useDebounceFn<T extends any[], U = any>(fn: (...args: T) => Promise<any>, wait?: number) {
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
          if (process.env.NODE_ENV === 'TEST') {
            await act(async () => {
              resolve(await callback(...args));
            });
            return;
          }
          resolve(await callback(...args));
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

export default useDebounceFn;
