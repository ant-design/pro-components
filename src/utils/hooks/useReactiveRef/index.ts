import type { MutableRefObject, RefObject } from 'react';
import useForceRender from '../useForceRender';
import { useRefCallback } from '../useRefCallback';

export function useReactiveRef<T>(initialValue: T): MutableRefObject<T>;

export function useReactiveRef<T>(initialValue: T | null): RefObject<T>;

export function useReactiveRef<T = undefined>(): MutableRefObject<
  T | undefined
>;

export function useReactiveRef<T>(
  initialValue?: T | null,
): MutableRefObject<T | null | undefined> {
  const forceRender = useForceRender();

  const ref = useRefCallback(forceRender, initialValue);

  return ref;
}
