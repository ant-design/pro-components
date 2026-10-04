import { useRef, useState } from 'react';
import { useRequestData } from '../useRequestData';

let requestId = 0;

export type ProRequestData<T, U = Record<string, any>> = (
  params: U,
  props: any,
) => Promise<T>;

export function useFetchData<T, U = Record<string, any>>(props: {
  proFieldKey?: React.Key;
  params?: U;
  request?: ProRequestData<T, U>;
  dedupingInterval?: number;
}): [T | undefined, boolean] {
  const abortRef = useRef<AbortController | null>(null);
  const [cacheKey] = useState(() => {
    if (props.proFieldKey) return props.proFieldKey.toString();
    requestId += 1;
    return requestId.toString();
  });

  const fetchData = async () => {
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;
    try {
      if (!props.request) return undefined;
      return await props.request(props.params as U, abort.signal);
    } catch (error: any) {
      if (error.name === 'AbortError') return undefined;
      throw error;
    }
  };

  const { data, isValidating } = useRequestData({
    key: props.request ? [cacheKey, props.params] : null,
    fetcher: fetchData,
    dedupingInterval: props.dedupingInterval ?? 2000,
  });

  if (!props.request) return [undefined, false];
  return [data, isValidating];
}
