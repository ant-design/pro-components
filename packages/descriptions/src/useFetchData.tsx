import { useState, useEffect } from 'react';

export interface RequestData<T> {
  data: any;
  success?: boolean;
  [key: string]: any;
}
export interface UseFetchDataAction<T extends RequestData<any>> {
  dataSource: T['data'] | T;
  loading: boolean | undefined;
  reload: () => Promise<void>;
}

const useFetchData = <T extends RequestData<any>>(
  getData: () => Promise<T>,
  options?: {
    effects?: any[];
    onRequestError?: (e: Error) => void;
  },
): UseFetchDataAction<T> => {
  const { onRequestError, effects = [] } = options || {};
  const [list, setList] = useState<T['data']>({} as any);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  /**
   * 请求数据
   */
  const fetchList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const { data, success } = (await getData()) || {};
      if (success !== false) {
        setList(data);
      }
    } catch (e) {
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) {
        throw new Error(e);
      } else {
        onRequestError(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [effects]);

  return {
    dataSource: list,
    loading,
    reload: () => fetchList(),
  };
};

export default useFetchData;
