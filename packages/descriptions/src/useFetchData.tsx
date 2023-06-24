import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useEffect } from 'react';

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
  const [entity, setEntity] = useMergedState<T['data']>(defaultDataSource, {
    value: dataSource,
    onChange: onDataSourceChange,
  });
  const [loading, setLoading] = useMergedState<boolean | undefined>(
    options?.loading,
    {
      value: options?.loading,
      onChange: options?.onLoadingChange,
    },
  );

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
