import { useState, useRef, useEffect } from 'react';
import { usePrevious, useDebounceFn } from '@ant-design/pro-utils';

export interface RequestData<T> {
  data: T[];
  success?: boolean;
  total?: number;
  [key: string]: any;
}
export interface UseFetchDataAction<T extends RequestData<any>> {
  dataSource: T['data'] | T;
  loading: boolean | undefined;
  hasMore: boolean;
  current: number;
  pageSize: number;
  total: number;
  cancel: () => void;
  reload: () => Promise<void>;
  fetchMore: () => void;
  fullScreen?: () => void;
  resetPageIndex: () => void;
  reset: () => void;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
}

interface PageInfo {
  hasMore: boolean;
  page: number;
  pageSize: number;
  total: number;
}

const useFetchData = <T extends RequestData<any>>(
  getData: (params: { pageSize: number; current: number }) => Promise<T>,
  defaultData?: Partial<T['data']>,
  options?: {
    defaultCurrent?: number;
    defaultPageSize?: number;
    effects?: any[];
    onLoad?: (dataSource: T['data']) => void;
    onRequestError?: (e: Error) => void;
    manual: boolean;
  },
): UseFetchDataAction<T> => {
  // 用于标定组件是否解除挂载，如果解除了就不要 setState
  const mountRef = useRef(true);
  const { defaultPageSize = 20, defaultCurrent = 1, onLoad = () => null, manual, onRequestError } =
    options || {};

  const [list, setList] = useState<T['data']>(defaultData as any);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    hasMore: false,
    page: defaultCurrent || 1,
    total: 0,
    pageSize: defaultPageSize,
  });

  // pre state
  const prePage = usePrevious(pageInfo.page);
  const prePageSize = usePrevious(pageInfo.pageSize);

  const { effects = [] } = options || {};
  const setDataAndLoading = (newData: T[], dataTotal: number) => {
    const { pageSize, page } = pageInfo;
    setList(newData);
    setLoading(false);
    setPageInfo({
      ...pageInfo,
      total: dataTotal,
      hasMore: dataTotal > pageSize * page,
    });
  };
  /**
   * 请求数据
   * @param isAppend 是否添加数据到后面
   */
  const fetchList = async (isAppend?: boolean) => {
    if (loading || !mountRef.current) {
      return;
    }
    setLoading(true);
    const { pageSize, page } = pageInfo;

    try {
      const { data, success, total: dataTotal = 0 } =
        (await getData({
          current: page,
          pageSize,
        })) || {};
      if (success !== false) {
        if (isAppend && list) {
          setDataAndLoading([...list, ...data], dataTotal);
        } else {
          setDataAndLoading(data, dataTotal);
        }
      }
      if (onLoad) {
        onLoad(data);
      }
    } catch (e) {
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) {
        throw new Error(e);
      } else {
        onRequestError(e);
      }
      setLoading(false);
    }
  };

  const fetchListDebounce = useDebounceFn(fetchList, [], 200);

  const fetchMore = () => {
    // 如果没有更多的就忽略掉
    if (pageInfo.hasMore) {
      setPageInfo({ ...pageInfo, page: pageInfo.page + 1 });
    }
  };

  /**
   * pageIndex 改变的时候自动刷新
   */
  useEffect(() => {
    const { page, pageSize } = pageInfo;
    // 如果上次的页码为空或者两次页码等于是没必要查询的
    // 如果 pageSize 发生变化是需要查询的，所以又加了 prePageSize
    if ((!prePage || prePage === page) && (!prePageSize || prePageSize === pageSize)) {
      return () => undefined;
    }
    // 如果 list 的长度大于 pageSize 的长度
    // 说明是一个假分页
    // (pageIndex - 1 || 1) 至少要第一页
    // 在第一页大于 10
    // 第二页也应该是大于 10
    if (page !== undefined && list.length <= pageSize) {
      fetchListDebounce.run();
      return () => fetchListDebounce.cancel();
    }
    return () => undefined;
  }, [pageInfo.page]);

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize) {
      return () => undefined;
    }
    /**
     * 切换页面的时候清空一下数据，不然会造成判断失误。
     * 会认为是本地分页而不是服务器分页从而不请求数据
     */
    setList([]);
    setPageInfo({ ...pageInfo, page: 1 });
    fetchListDebounce.run();
    return () => fetchListDebounce.cancel();
  }, [pageInfo.pageSize]);

  /**
   * 重置pageIndex 到 1
   */
  const resetPageIndex = () => {
    setPageInfo({ ...pageInfo, page: 1 });
  };

  useEffect(() => {
    if (manual) {
      return () => null;
    }
    mountRef.current = true;
    fetchListDebounce.run();
    return () => {
      fetchListDebounce.cancel();
      mountRef.current = false;
    };
  }, [...effects, manual]);

  return {
    dataSource: list,
    loading,
    reload: async () => fetchListDebounce.run(),
    fetchMore,
    total: pageInfo.total,
    hasMore: pageInfo.hasMore,
    resetPageIndex,
    current: pageInfo.page,
    reset: () => {
      setPageInfo({
        hasMore: false,
        page: defaultCurrent || 1,
        total: 0,
        pageSize: defaultPageSize,
      });
    },
    cancel: fetchListDebounce.cancel,
    pageSize: pageInfo.pageSize,
    setPageInfo: (info) =>
      setPageInfo({
        ...pageInfo,
        ...info,
      }),
  };
};

export default useFetchData;
