import { useRef, useEffect } from 'react';
import {
  usePrevious,
  useDebounceFn,
  useDeepCompareEffect,
  useMountMergeState,
} from '@ant-design/pro-utils';
import ReactDOM from 'react-dom';
import type { PageInfo, RequestData, UseFetchDataAction } from './typing';

const useFetchData = <T extends RequestData<any>>(
  getData: (params?: { pageSize: number; current: number }) => Promise<T>,
  defaultData: any[],
  options: {
    dataSource?: any;
    loading: UseFetchDataAction['loading'];
    onDataSourceChange?: (dataSource?: any) => void;
    current?: number;
    pageSize?: number;
    defaultCurrent?: number;
    defaultPageSize?: number;
    effects?: any[];
    onLoad?: (dataSource: any[]) => void;
    onRequestError?: (e: Error) => void;
    manual: boolean;
    onLoadingChange?: (loading: UseFetchDataAction['loading']) => void;
    pagination: boolean;
    debounceTime?: number;
  },
): UseFetchDataAction => {
  const {
    pagination,
    onLoadingChange,
    onLoad = () => null,
    manual,
    onRequestError,
    debounceTime = 100,
  } = options || {};

  const [list, setList] = useMountMergeState<any[]>(defaultData as any, {
    value: options?.dataSource,
    onChange: options?.onDataSourceChange,
  });

  const [loading, setLoading] = useMountMergeState<UseFetchDataAction['loading']>(undefined, {
    value: options?.loading,
    onChange: onLoadingChange,
  });

  const requesting = useRef(false);

  const [pageInfo, setPageInfo] = useMountMergeState<PageInfo>({
    page: options?.current || options?.defaultCurrent || 1,
    total: 0,
    pageSize: options?.pageSize || options?.defaultPageSize || 20,
  });

  // Batching update  https://github.com/facebook/react/issues/14259
  const setDataAndLoading = (newData: T[], dataTotal: number) => {
    ReactDOM.unstable_batchedUpdates(() => {
      setList(newData);
      setLoading(false);
      setPageInfo({
        ...pageInfo,
        total: dataTotal,
      });
    });
  };

  // pre state
  const prePage = usePrevious(pageInfo.page);
  const prePageSize = usePrevious(pageInfo.pageSize);

  const { effects = [] } = options || {};

  /** 请求数据 */
  const fetchList = async () => {
    if (loading || requesting.current) {
      return;
    }
    setLoading(true);
    requesting.current = true;

    const { pageSize, page } = pageInfo;
    try {
      const { data = [], success, total: dataTotal = 0 } = await getData(
        pagination !== false
          ? {
              current: page,
              pageSize,
            }
          : undefined,
      );
      requesting.current = false;

      if (success !== false) {
        setDataAndLoading(data, dataTotal);
      } else {
        setLoading(false);
      }
      if (onLoad) {
        onLoad(data);
      }
    } catch (e) {
      setLoading(false);
      requesting.current = false;
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) {
        throw new Error(e);
      } else {
        onRequestError(e);
      }
    }
  };

  const fetchListDebounce = useDebounceFn(fetchList, [], debounceTime);

  /** PageIndex 改变的时候自动刷新 */
  useEffect(() => {
    const { page, pageSize } = pageInfo;
    // 如果上次的页码为空或者两次页码等于是没必要查询的
    // 如果 pageSize 发生变化是需要查询的，所以又加了 prePageSize
    if ((!prePage || prePage === page) && (!prePageSize || prePageSize === pageSize)) {
      return;
    }
    // 如果 list 的长度大于 pageSize 的长度
    // 说明是一个假分页
    // (pageIndex - 1 || 1) 至少要第一页
    // 在第一页大于 10
    // 第二页也应该是大于 10
    if (page !== undefined && list && list.length <= pageSize) {
      fetchListDebounce.run();
    }
  }, [pageInfo.page]);

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize) {
      return;
    }
    /** 切换页面的时候清空一下数据，不然会造成判断失误。 会认为是本地分页而不是服务器分页从而不请求数据 */
    setList([]);
    setPageInfo({ ...pageInfo, page: 1 });
    fetchListDebounce.run();
  }, [pageInfo.pageSize]);

  /** 重置pageIndex 到 1 */
  const resetPageIndex = () => {
    setPageInfo({ ...pageInfo, page: 1 });
  };

  useDeepCompareEffect(() => {
    if (manual) {
      return () => null;
    }
    fetchListDebounce.run();
    return () => {
      fetchListDebounce.cancel();
    };
  }, [...effects, manual]);

  return {
    dataSource: list,
    setDataSource: setList,
    loading,
    reload: async () => fetchListDebounce.run(),
    total: pageInfo.total,
    resetPageIndex,
    current: pageInfo.page,
    reset: () => {
      setPageInfo({
        page: options?.defaultCurrent || 1,
        total: 0,
        pageSize: options?.defaultPageSize || 20,
      });
    },
    pageSize: pageInfo.pageSize,
    setPageInfo: (info) =>
      setPageInfo({
        ...pageInfo,
        ...info,
      }),
  };
};

export default useFetchData;
