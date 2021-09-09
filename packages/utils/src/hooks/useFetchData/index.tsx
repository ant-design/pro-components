import { useState, useRef, useMemo } from 'react';
import useSWR, { mutate } from 'swr';

let testId = 0;

export type ProRequestData<T, U = Record<string, any>> = (params: U, props: any) => Promise<T>;

function useFetchData<T, U extends Record<string, any> = Record<string, any>>(props: {
  proFieldKey?: React.Key;
  params?: U;
  request?: ProRequestData<T, U>;
}): [T, () => void] {
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
    const loadData = await props.request?.(props.params as U, props);
    return loadData;
  };

  const key = useMemo(() => {
    if (!props.params) {
      return proFieldKeyRef.current;
    }
    return [proFieldKeyRef.current, JSON.stringify(props.params)];
  }, [props.params]);

  const { data, error } = useSWR(key, fetchData, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnReconnect: false,
  });

  return [
    (data as T) || error,
    () => {
      mutate(key);
    },
  ];
}

export default useFetchData;
