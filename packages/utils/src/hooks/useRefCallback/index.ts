import type { MutableRefObject, RefObject } from 'react';
import { useMemo } from 'react';

type Callback<T> = (currentRef: T) => void;

export function useRefCallback<T>(
  callback: Callback<MutableRefObject<T>>,
  initialValue: T,
): MutableRefObject<T>;

export function useRefCallback<T>(
  callback: Callback<RefObject<T>>,
  initialValue: T | null,
): RefObject<T>;

export function useRefCallback<T = undefined>(
  callback: Callback<MutableRefObject<T | undefined>>,
): MutableRefObject<T | undefined>;

export function useRefCallback<T>(
  callback: Callback<MutableRefObject<T | null | undefined>>,
  initialValue?: T | null,
): MutableRefObject<T | null | undefined> {
  const ref: MutableRefObject<T | null | undefined> = useMemo(() => {
    const defaultValue = {
      current: initialValue,
    };

    return new Proxy(defaultValue, {
      set(target, prop, newValue: T) {
        if (!Object.is((target as any)[prop], newValue)) {
          (target as any)[prop] = newValue;
          callback(ref);
        }

        return true;
      },
    });
  }, []);

  return ref;
}
