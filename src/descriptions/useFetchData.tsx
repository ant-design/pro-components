import { useControlledState } from '@rc-component/util';
import { useCallback, useEffect } from 'react';
import { useRefFunction } from '../utils';

export type RequestData<T = any> = {
  data?: T;
  success?: boolean;
  [key: string]: any;
} & Record<string, any>;
export type UseFetchDataAction<T extends RequestData> = {
  dataSource: T['data'] | T;
  setDataSource: (value: T['data'] | T) => void;
  loading?: boolean;
  reload: () => Promise<void>;
};

const useFetchData = <T extends RequestData>(
  getData: () => Promise<T>,
  options?: {
    effects?: any[];
    manual: boolean;
    loading?: boolean;
    onLoadingChange?: (loading?: boolean) => void;
    onRequestError?: (e: Error) => void;
    dataSource?: T['data'];
    defaultDataSource?: T['data'];
    onDataSourceChange?: (value: T['data']) => void;
  },
): UseFetchDataAction<T> => {
  const {
    onRequestError,
    effects,
    manual,
    dataSource,
    defaultDataSource,
    onDataSourceChange,
  } = options || {};
  const [entity, setEntityInner] = useControlledState<T['data']>(
    defaultDataSource,
    dataSource,
  );
  const setEntity = useCallback(
    (updater: T['data'] | ((prev: T['data']) => T['data'])) => {
      setEntityInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: T['data']) => T['data'])(prev)
            : updater;
        onDataSourceChange?.(next);
        return next;
      });
    },
    [onDataSourceChange],
  );
  const [loading, setLoading] = useControlledState<boolean | undefined>(
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
   * 监听 loading 状态变化并调用 onLoadingChange 回调
   * 使用 useEffect 避免在渲染阶段调用外部回调导致的 React 警告
   * "Cannot update a component while rendering a different component"
   */
  useEffect(() => {
    onLoadingChange(loading);
  }, [loading, onLoadingChange]);

  const updateDataAndLoading = (data: T) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
