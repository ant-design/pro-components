import { useRef, useEffect } from 'react';
import {
  usePrevious,
  useDebounceFn,
  useDeepCompareEffect,
  useMountMergeState,
} from '@ant-design/pro-utils';
import { unstable_batchedUpdates } from 'react-dom';
import type { PageInfo, RequestData, UseFetchProps, UseFetchDataAction } from './typing';
import { postDataPipeline } from './utils';

/**
 * 组合用户的配置和默认值
 *
 * @param param0
 */
const mergeOptionAndPageInfo = ({ pageInfo }: UseFetchProps) => {
  if (pageInfo) {
    const { current, defaultCurrent, pageSize, defaultPageSize } = pageInfo;
    return {
      current: current || defaultCurrent || 1,
      total: 0,
      pageSize: pageSize || defaultPageSize || 20,
    };
  }
  return { current: 1, total: 0, pageSize: 20 };
};

const useFetchData = <T extends RequestData<any>>(
  getData: undefined | ((params?: { pageSize: number; current: number }) => Promise<T>),
  defaultData: any[],
  options: UseFetchProps,
): UseFetchDataAction => {
  const { onLoad, manual, onRequestError, debounceTime = 20 } = options || {};

  /** 是否首次加载的指示器 */
  const manualRequestRef = useRef<boolean>(manual);

  const [list, setList] = useMountMergeState<any[]>(defaultData as any, {
    value: options?.dataSource,
    onChange: options?.onDataSourceChange,
  });

  const [loading, setLoading] = useMountMergeState<UseFetchDataAction['loading']>(false, {
    value: options?.loading,
    onChange: options?.onLoadingChange,
  });

  const requesting = useRef(false);

  const [pageInfo, setPageInfo] = useMountMergeState<PageInfo>(() =>
    mergeOptionAndPageInfo(options),
  );

  // Batching update  https://github.com/facebook/react/issues/14259
  const setDataAndLoading = (newData: T[], dataTotal: number) => {
    unstable_batchedUpdates(() => {
      setList(newData);
      if (pageInfo.total !== dataTotal) {
        setPageInfo({
          ...pageInfo,
          total: dataTotal || newData.length,
        });
      }
    });
  };

  // pre state
  const prePage = usePrevious(pageInfo.current);
  const prePageSize = usePrevious(pageInfo.pageSize);

  const { effects = [] } = options || {};

  /** 请求数据 */
  const fetchList = async () => {
    if (loading || requesting.current || !getData) {
      return;
    }

    // 需要手动触发的首次请求
    if (manualRequestRef.current) {
      manualRequestRef.current = false;
      return;
    }

    setLoading(true);
    requesting.current = true;
    const { pageSize, current } = pageInfo;
    try {
      const pageParams =
        options?.pageInfo !== false
          ? {
              current,
              pageSize,
            }
          : undefined;

      const { data = [], success, total = 0, ...rest } = await getData(pageParams);

      requesting.current = false;

      if (success === false) {
        return;
      }
      const responseData = postDataPipeline<T[]>(
        data!,
        [options.postData].filter((item) => item) as any,
      );
      setDataAndLoading(responseData, total);
      onLoad?.(responseData, rest);
    } catch (e) {
      requesting.current = false;
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) {
        throw new Error(e);
      }
      onRequestError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchListDebounce = useDebounceFn(fetchList, [manualRequestRef.current], debounceTime);

  /** PageIndex 改变的时候自动刷新 */
  useEffect(() => {
    const { current, pageSize } = pageInfo;
    // 如果上次的页码为空或者两次页码等于是没必要查询的
    // 如果 pageSize 发生变化是需要查询的，所以又加了 prePageSize
    if ((!prePage || prePage === current) && (!prePageSize || prePageSize === pageSize)) {
      return;
    }
    // 如果 list 的长度大于 pageSize 的长度
    // 说明是一个假分页
    // (pageIndex - 1 || 1) 至少要第一页
    // 在第一页大于 10
    // 第二页也应该是大于 10
    if (current !== undefined && list && list.length <= pageSize) {
      fetchListDebounce.run();
    }
  }, [pageInfo.current]);

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize) {
      return;
    }
    fetchListDebounce.run();
  }, [pageInfo.pageSize]);

  useDeepCompareEffect(() => {
    fetchListDebounce.run();
    return () => {
      fetchListDebounce.cancel();
    };
  }, [...effects, manual]);

  return {
    dataSource: list,
    setDataSource: setList,
    loading,
    reload: async () => {
      fetchListDebounce.run();
    },
    pageInfo,
    reset: () => {
      setPageInfo(
        options?.pageInfo
          ? {
              current: options?.pageInfo?.defaultCurrent || 1,
              total: 0,
              pageSize: options?.pageInfo?.defaultPageSize || 20,
            }
          : {
              current: 1,
              total: 0,
              pageSize: 20,
            },
      );
    },
    setPageInfo: (info) => {
      setPageInfo({
        ...pageInfo,
        ...info,
      });
    },
  };
};

export default useFetchData;
