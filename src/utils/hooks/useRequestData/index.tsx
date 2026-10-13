import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { configure } from 'safe-stable-stringify';

type CacheEntry<T = unknown> = {
  data?: T;
  hasData: boolean;
  isValidating: boolean;
  updatedAt: number;
  promise?: Promise<T | undefined>;
  listeners: Set<() => void>;
};

export type RequestCache = Map<string, CacheEntry>;

const defaultCache: RequestCache = new Map();
const RequestCacheContext = createContext<RequestCache>(defaultCache);
const serialize = configure({ bigint: true, circularValue: '[Circular]' });

export const RequestCacheProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [cache] = useState<RequestCache>(() => new Map());
  useEffect(() => () => cache.clear(), [cache]);
  return (
    <RequestCacheContext.Provider value={cache}>
      {children}
    </RequestCacheContext.Provider>
  );
};

export type RequestDataOptions<T> = {
  key: unknown[] | null;
  fetcher: () => Promise<T | undefined>;
  dedupingInterval?: number;
  revalidateOnMount?: boolean;
  onError?: (error: unknown) => void;
};

export function useRequestData<T>({
  key,
  fetcher,
  dedupingInterval = 2000,
  revalidateOnMount = true,
  onError,
}: RequestDataOptions<T>) {
  const cache = useContext(RequestCacheContext);
  const cacheKey = useMemo(() => (key ? serialize(key) : undefined), [key]);
  const fetcherRef = useRef(fetcher);
  const errorRef = useRef(onError);
  fetcherRef.current = fetcher;
  errorRef.current = onError;
  const [, rerender] = useState(0);

  const getEntry = useCallback(() => {
    if (!cacheKey) return undefined;
    let entry = cache.get(cacheKey) as CacheEntry<T> | undefined;
    if (!entry) {
      entry = {
        hasData: false,
        isValidating: false,
        updatedAt: 0,
        listeners: new Set(),
      };
      cache.set(cacheKey, entry);
    }
    return entry;
  }, [cache, cacheKey]);

  const notify = useCallback((entry: CacheEntry<T>) => {
    entry.listeners.forEach((listener) => listener());
  }, []);

  const reload = useCallback(
    async (force = true) => {
      const entry = getEntry();
      if (!entry) return undefined;
      if (entry.promise) return entry.promise;
      if (
        !force &&
        entry.hasData &&
        Date.now() - entry.updatedAt < dedupingInterval
      ) {
        return entry.data;
      }

      entry.isValidating = true;
      notify(entry);
      const promise = fetcherRef
        .current()
        .then((data) => {
          if (entry.promise !== promise) return data;
          entry.data = data;
          entry.hasData = true;
          entry.updatedAt = Date.now();
          return data;
        })
        .catch((error) => {
          errorRef.current?.(error);
          return undefined;
        })
        .finally(() => {
          if (entry.promise === promise) {
            entry.promise = undefined;
            entry.isValidating = false;
            notify(entry);
          }
        });
      entry.promise = promise;
      return promise;
    },
    [dedupingInterval, getEntry, notify],
  );

  const mutate = useCallback(
    (data?: T, revalidate = data === undefined) => {
      const entry = getEntry();
      if (!entry) return Promise.resolve(undefined);
      if (data !== undefined) {
        entry.data = data;
        entry.hasData = true;
        entry.updatedAt = Date.now();
        notify(entry);
      }
      return revalidate ? reload(true) : Promise.resolve(entry.data);
    },
    [getEntry, notify, reload],
  );

  const remove = useCallback(() => {
    if (!cacheKey) return;
    const entry = cache.get(cacheKey);
    cache.delete(cacheKey);
    if (entry) notify(entry as CacheEntry<T>);
  }, [cache, cacheKey, notify]);

  useEffect(() => {
    const entry = getEntry();
    if (!entry) return;
    const listener = () => rerender((value) => value + 1);
    entry.listeners.add(listener);
    if (!entry.hasData || revalidateOnMount) void reload(false);
    return () => {
      entry.listeners.delete(listener);
    };
  }, [cacheKey, getEntry, reload, revalidateOnMount]);

  const entry = getEntry();
  return {
    data: entry?.data,
    isValidating: entry?.isValidating ?? false,
    mutate,
    remove,
  };
}
