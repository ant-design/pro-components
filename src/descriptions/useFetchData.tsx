import { useControlledState } from '@rc-component/util';
import { useCallback, useEffect } from 'react';
import { useRefFunction } from '../utils';

export type ProDescriptionsRequestResult<T = unknown> = {
  data?: T;
  success?: boolean;
};

/** @deprecated 使用 {@link ProDescriptionsRequestResult} */
export type RequestData<T = unknown> = ProDescriptionsRequestResult<T>;

export type UseProDescriptionsFetchAction<TData> = {
  dataSource: TData | undefined;
  setDataSource: (value: TData | undefined) => void;
  loading?: boolean;
  reload: () => Promise<void>;
};

const useFetchData = <TData, TResponse extends ProDescriptionsRequestResult<TData>>(
  getData: () => Promise<TResponse>,
  options?: {
    effects?: unknown[];
    manual: boolean;
    loading?: boolean;
    onLoadingChange?: (loading?: boolean) => void;
    onRequestError?: (e: Error) => void;
    dataSource?: TData;
    defaultDataSource?: TData;
    onDataSourceChange?: (value: TData | undefined) => void;
  },
): UseProDescriptionsFetchAction<TData> => {
  const {
    onRequestError,
    effects,
    manual,
    dataSource,
    defaultDataSource,
    onDataSourceChange,
  } = options || {};
  const [entity, setEntityInner] = useControlledState<TData | undefined>(
    defaultDataSource,
    dataSource,
  );
  const setEntity = useCallback(
    (
      updater:
        | TData
        | undefined
        | ((prev: TData | undefined) => TData | undefined),
    ) => {
      setEntityInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: TData | undefined) => TData | undefined)(prev)
            : updater;
        onDataSourceChange?.(next);
        return next;
      });
    },
    [onDataSourceChange],
  );
  const [loading, setLoadingInner] = useControlledState<boolean | undefined>(
    options?.loading,
    options?.loading,
  );

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const onLoadingChange = useRefFunction((l?: boolean) => {
    options?.onLoadingChange?.(l);
  });

  /**
   * 包装 setLoading，使用 queueMicrotask 延迟回调调用
   * 避免在渲染阶段调用外部回调导致的 React 警告
   */
  const setLoading = useCallback(
    (
      updater:
        | boolean
        | undefined
        | ((prev: boolean | undefined) => boolean | undefined),
    ) => {
      setLoadingInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean | undefined) => boolean | undefined)(prev)
            : updater;
        queueMicrotask(() => {
          onLoadingChange(next);
        });
        return next;
      });
    },
    [onLoadingChange],
  );

  const updateDataAndLoading = (data: TData | undefined) => {
    setEntity(data);
    setLoading(false);
  };
  /** 请求数据 */
  const fetchList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const { data, success } = (await getData()) || {};
      if (success !== false) {
        updateDataAndLoading(data);
      }
    } catch (e) {
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) throw new Error(e as string);
      else onRequestError(e as Error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (manual) {
      return;
    }
    fetchList();
  }, [...(effects || []), manual]);

  return {
    dataSource: entity,
    setDataSource: setEntity,
    loading,
    reload: () => {
      return fetchList();
    },
  };
};

export default useFetchData;
