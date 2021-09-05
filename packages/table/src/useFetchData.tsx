import { useRef, useEffect } from 'react';
import {
  usePrevious,
  useDebounceFn,
  useDeepCompareEffect,
  useMountMergeState,
  runFunction,
} from '@ant-design/pro-utils';
import { unstable_batchedUpdates } from 'react-dom';
import type { PageInfo, RequestData, UseFetchProps, UseFetchDataAction } from './typing';
import { postDataPipeline } from './utils/index';

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
  defaultData: any[] | undefined,
  options: UseFetchProps,
): UseFetchDataAction => {
  const umountRef = useRef<boolean>();
  const { onLoad, manual, polling, onRequestError, debounceTime = 20 } = options || {};

  /** 是否首次加载的指示器 */
  const manualRequestRef = useRef<boolean>(manual);

  /** 轮询的setTime ID 存储 */
  const pollingSetTimeRef = useRef<any>();

  const [list, setList] = useMountMergeState<any[] | undefined>(defaultData, {
    value: options?.dataSource,
    onChange: options?.onDataSourceChange,
  });

  const [loading, setLoading] = useMountMergeState<UseFetchDataAction['loading']>(false, {
    value: options?.loading,
    onChange: options?.onLoadingChange,
  });

  const requesting = useRef(false);

  const [pageInfo, setPageInfo] = useMountMergeState<PageInfo>(
    () => mergeOptionAndPageInfo(options),
    {
      onChange: options?.onPageInfoChange,
    },
  );

  const [pollingLoading, setPollingLoading] = useMountMergeState(false);

  // Batching update  https://github.com/facebook/react/issues/14259
  const setDataAndLoading = (newData: T[], dataTotal: number) => {
    unstable_batchedUpdates(() => {
      setList(newData);
      if (pageInfo?.total !== dataTotal) {
        setPageInfo({
          ...pageInfo,
          total: dataTotal || newData.length,
        });
      }
    });
  };

  // pre state
  const prePage = usePrevious(pageInfo?.current);
  const prePageSize = usePrevious(pageInfo?.pageSize);
  const prePolling = usePrevious(polling);

  const { effects = [] } = options || {};

  /** 请求数据 */
  const fetchList = async (isPolling: boolean) => {
    if (loading || requesting.current || !getData) {
      return [];
    }

    // 需要手动触发的首次请求
    if (manualRequestRef.current) {
      manualRequestRef.current = false;
      return [];
    }

    if (!isPolling) {
      setLoading(true);
    } else {
      setPollingLoading(true);
    }

    requesting.current = true;
    const { pageSize, current } = pageInfo || {};
    try {
      const pageParams =
        options?.pageInfo !== false
          ? {
              current,
              pageSize,
            }
          : undefined;

      const { data = [], success, total = 0, ...rest } = (await getData(pageParams)) || {};
      requesting.current = false;

      // 如果失败了，直接返回，不走剩下的逻辑了
      if (success === false) return [];

      const responseData = postDataPipeline<T[]>(
        data!,
        [options.postData].filter((item) => item) as any,
      );
      setDataAndLoading(responseData, total);
      onLoad?.(responseData, rest);
      return responseData;
    } catch (e) {
      requesting.current = false;
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) {
        throw new Error(e as string);
      }
      if (list === undefined) setList([]);
      onRequestError(e as Error);
    } finally {
      requestAnimationFrame(() => {
        setLoading(false);
        setPollingLoading(false);
      });
    }

    return [];
  };

  const fetchListDebounce = useDebounceFn(
    async (isPolling: boolean) => {
      if (pollingSetTimeRef.current) {
        clearTimeout(pollingSetTimeRef.current);
      }
      const msg = await fetchList(isPolling);

      // 把判断要不要轮询的逻辑放到后面来这样可以保证数据是根据当前来
      // 放到请求前面会导致数据是上一次的
      const needPolling = runFunction(polling, msg);

      // 如果需要轮询，搞个一段时间后执行
      // 如果解除了挂载，删除一下
      if (needPolling && !umountRef.current) {
        pollingSetTimeRef.current = setTimeout(() => {
          fetchListDebounce.run(needPolling);
          // 这里判断最小要2000ms，不然一直loading
        }, Math.max(needPolling, 2000));
      }
      return msg;
    },
    [],
    debounceTime || 10,
  );

  // 如果轮询结束了，直接销毁定时器
  useEffect(() => {
    if (!polling) {
      clearTimeout(pollingSetTimeRef.current);
    }
    if (!prePolling && polling) {
      fetchListDebounce.run(true);
    }
    return () => {
      clearTimeout(pollingSetTimeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polling]);

  useEffect(
    () => () => {
      umountRef.current = true;
    },
    [],
  );

  /** PageIndex 改变的时候自动刷新 */
  useEffect(() => {
    const { current, pageSize } = pageInfo || {};
    // 如果上次的页码为空或者两次页码等于是没必要查询的
    // 如果 pageSize 发生变化是需要查询的，所以又加了 prePageSize
    if ((!prePage || prePage === current) && (!prePageSize || prePageSize === pageSize)) {
      return;
    }

    if ((options.pageInfo && list && list?.length > pageSize) || 0) {
      return;
    }

    // 如果 list 的长度大于 pageSize 的长度
    // 说明是一个假分页
    // (pageIndex - 1 || 1) 至少要第一页
    // 在第一页大于 10
    // 第二页也应该是大于 10
    if (current !== undefined && list && list.length <= pageSize) {
      fetchListDebounce.run(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo?.current]);

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize) {
      return;
    }
    fetchListDebounce.run(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo?.pageSize]);

  useDeepCompareEffect(() => {
    fetchListDebounce.run(false);
    if (!manual) {
      manualRequestRef.current = false;
    }
    return () => {
      fetchListDebounce.cancel();
    };
  }, [...effects, manual]);

  return {
    dataSource: list!,
    setDataSource: setList,
    loading,
    reload: async () => {
      await fetchListDebounce.run(false);
    },
    pageInfo,
    pollingLoading,
    reset: async () => {
      const { pageInfo: optionPageInfo } = options || {};
      const { defaultCurrent = 1, defaultPageSize = 20 } = optionPageInfo || {};
      const initialPageInfo = {
        current: defaultCurrent,
        total: 0,
        pageSize: defaultPageSize,
      };
      setPageInfo(initialPageInfo);
    },
    setPageInfo: async (info) => {
      setPageInfo({
        ...pageInfo,
        ...info,
      });
    },
  };
};

export default useFetchData;
