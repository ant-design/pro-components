import type React from 'react';
import { useRef, useState } from 'react';
import useSWR from 'swr';

let testId = 0;

export type ProRequestData<T, U = Record<string, any>> = (params: U, props: any) => Promise<T>;

export function useFetchData<T, U = Record<string, any>>(props: {
  proFieldKey?: React.Key;
  params?: U;
  request?: ProRequestData<T, U>;
}): [T | undefined, boolean] {
  const abortRef = useRef<AbortController | null>(null);
  /** Key 是用来缓存请求的，如果不在是有问题 */
  const [cacheKey] = useState(() => {
    if (props.proFieldKey) {
      return props.proFieldKey.toString();
    }
    testId += 1;
    return testId.toString();
  });

  const proFieldKeyRef = useRef(cacheKey);

  const fetchData = async () => {
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;
    try {
      if (!props.request) {
        return undefined;
      }
      const response = await props.request(props.params as U, abort.signal);
      return response;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return undefined;
      }
      throw error;
    }
  };

  const { data, error, isValidating } = useSWR(props.request ? [cacheKey, props.params] : null, fetchData, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError: () => {
      // 这里可以添加错误处理逻辑
    },
  });

  // 如果没有请求，返回 [undefined, false]
  if (!props.request) {
    return [undefined, false];
  }

  return [data, isValidating];
}
