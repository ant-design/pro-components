import {
  runFunction,
  useDebounceFn,
  useDeepCompareEffect,
  useMountMergeState,
  usePrevious,
  useRefFunction,
} from '@ant-design/pro-utils';
import { useEffect, useRef } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import type {
  PageInfo,
  RequestData,
  UseFetchDataAction,
  UseFetchProps,
} from './typing';
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

/**
 * useFetchData hook 用来获取数据并控制数据的状态和分页
 * @template T
 * @param {(undefined | ((params?: { pageSize: number; current: number }) => Promise<DataSource>))} getData - 获取数据的函数，参数为分页参数，
 * 返回一个 Promise 类型的 T 类型的数据
 * @param {(undefined | any[])} defaultData - 默认的数据
 * @param {UseFetchProps} options - 配置项，包括了默认的分页参数、格式化数据的函数等
 * @returns {UseFetchDataAction} 返回一个对象，包含当前的数据列表、loading 状态、error、以及可控制的分页参数等
 */
const useFetchData = <DataSource extends RequestData<any>>(
  getData:
    | undefined
    | ((params?: { pageSize: number; current: number }) => Promise<DataSource>),
  defaultData: any[] | undefined,
  options: UseFetchProps,
): UseFetchDataAction => {
  /**
   * 用于保存组件是否被卸载的状态的引用
   * @type {React.MutableRefObject<boolean>}
   */
  const umountRef = useRef<boolean>(false);
  /**
   * 用于保存 AbortController 实例的引用，方便需要时进行请求的取消操作
   * @type {React.MutableRefObject<AbortController | null>}
   */
  const abortRef = useRef<AbortController | null>(null);
  /**
   * useFetchData 钩子的配置项
   * @typedef {object} UseFetchProps
   * @property {boolean} [onLoad=false] 是否在页面加载时执行请求，默认为 false
   * @property {boolean} [manual=false] 是否手动触发请求，默认为 false
   * @property {number | boolean} [polling=false] 是否开启轮询，可以为数字表示轮询的时间间隔，也可以为 true 表示开启默认时间为 1s 的轮询
   * @property {function} [onRequestError] 请求错误的回调函数
   * @property {number} [debounceTime=20] 防抖时间，单位为毫秒，默认为 20ms
   */
  const {
    onLoad,
    manual,
    polling,
    onRequestError,
    debounceTime = 20,
    effects = [],
  } = options || {};

  /** 是否首次加载的指示器 */
  const manualRequestRef = useRef<boolean>(manual);

  /** 轮询的setTime ID 存储 */
  const pollingSetTimeRef = useRef<any>();

  /**
   * 用于存储最新的数据，这样可以在切换的时候保持数据的一致性
   */
  const [tableDataList, setTableDataList] = useMountMergeState<
    DataSource[] | undefined
  >(defaultData, {
    value: options?.dataSource,
    onChange: options?.onDataSourceChange,
  });

  /**
   * 表格的加载状态
   */
  const [tableLoading, setTableLoading] = useMountMergeState<boolean>(false, {
    value:
      typeof options?.loading === 'object'
        ? options?.loading?.spinning
        : options?.loading,
    onChange: options?.onLoadingChange,
  });

  /**
   * 表示页面信息的类型  useMountMergeState 钩子的初始值和参数
   * @typedef {object} PageInfo
   * @property {number} current 当前页码
   * @property {number} pageSize 页面大小
   * @property {number} total 数据总量
   * @type {[PageInfo, React.Dispatch<React.SetStateAction<PageInfo>>]}
   */
  const [pageInfo, setPageInfoState] = useMountMergeState<PageInfo>(
    () => mergeOptionAndPageInfo(options),
    {
      onChange: options?.onPageInfoChange,
    },
  );

  /**
   * 用于比较并设置页面信息和回调函数的引用更新
   * @type {React.MutableRefObject<(changePageInfo: PageInfo) => void>}
   */
  const setPageInfo = useRefFunction((changePageInfo: PageInfo) => {
    if (
      changePageInfo.current !== pageInfo.current ||
      changePageInfo.pageSize !== pageInfo.pageSize ||
      changePageInfo.total !== pageInfo.total
    ) {
      setPageInfoState(changePageInfo);
    }
  });

  const [pollingLoading, setPollingLoading] = useMountMergeState(false);

  // Batching update  https://github.com/facebook/react/issues/14259
  const setDataAndLoading = (newData: DataSource[], dataTotal: number) => {
    unstable_batchedUpdates(() => {
      setTableDataList(newData);
      if (pageInfo?.total !== dataTotal) {
        setPageInfo({
          ...pageInfo,
          total: dataTotal || newData.length,
        });
      }
    });
  };

  /**
   * 上一页的页码
   * @type {number}
   */
  const prePage = usePrevious(pageInfo?.current);

  /**
   * 上一页的页面大小
   * @type {number}
   */
  const prePageSize = usePrevious(pageInfo?.pageSize);

  /**
   * 上一页的轮询时间
   * @type {number|boolean}
   */
  const prePolling = usePrevious(polling);

  /**
   * 不这样做会导致状态不更新
   * https://github.com/ant-design/pro-components/issues/4390
   */
  const requestFinally = useRefFunction(() => {
    unstable_batchedUpdates(() => {
      setTableLoading(false);
      setPollingLoading(false);
    });
  });
  /** 请求数据 */
  const fetchList = async (isPolling: boolean) => {
    // 需要手动触发的首次请求
    if (manualRequestRef.current) {
      manualRequestRef.current = false;
      return;
    }
    if (!isPolling) {
      setTableLoading(true);
    } else {
      setPollingLoading(true);
    }

    const { pageSize, current } = pageInfo || {};
    try {
      const pageParams =
        options?.pageInfo !== false
          ? {
              current,
              pageSize,
            }
          : undefined;
      const {
        data = [],
        success,
        total = 0,
        ...rest
      } = (await getData?.(pageParams)) || {};
      // 如果失败了，直接返回，不走剩下的逻辑了
      if (success === false) return [];

      const responseData = postDataPipeline<DataSource[]>(
        data!,
        [options.postData].filter((item) => item) as any,
      );
      // 设置表格数据
      setDataAndLoading(responseData, total);
      onLoad?.(responseData, rest);
      return responseData;
    } catch (e) {
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) throw new Error(e as string);
      if (tableDataList === undefined) setTableDataList([]);
      onRequestError(e as Error);
    } finally {
      requestFinally();
    }

    return [];
  };

  /**
   * 该函数用于进行数据请求，可以用于轮询或单次请求。
   * 通过使用 AbortController 取消之前的请求，避免出现请求堆积。
   * 若需要轮询，则在一定时间后再次调用该函数，最小时间为 200ms，避免一直处于 loading 状态。
   * 如果请求被取消，则返回空。
   */
  const fetchListDebounce = useDebounceFn(async (isPolling: boolean) => {
    if (pollingSetTimeRef.current) {
      clearTimeout(pollingSetTimeRef.current);
    }
    if (!getData) {
      return;
    }

    const abort = new AbortController();
    abortRef.current = abort;
    try {
      /**
       * 这段代码使用了 Promise.race，同时发起了两个异步请求。
       * fetchList 函数发起一个数据请求，而第二个 Promise 是等待通过 AbortSignal 取得一个信号。
       * 如果第二个 Promise 得到了一个 AbortSignal 的信号，就会触发 reject，Promise.race 的结果也会结束。
       * 这样，就达到了取消请求的目的。如果 fetchList 函数先返回了结果，那么该结果就是 Promise.race 的结果，
       * 此时第二个 Promise 就会被取消。
       */
      const msg = (await Promise.race([
        fetchList(isPolling),
        new Promise((_, reject) => {
          abortRef.current?.signal?.addEventListener?.('abort', () => {
            reject('aborted');
            // 结束请求，并且清空loading控制
            fetchListDebounce.cancel();
            requestFinally();
          });
        }),
      ])) as DataSource[];

      if (abort.signal.aborted) return;
      // 放到请求前面会导致数据是上一次的
      const needPolling = runFunction(polling, msg);

      /*
       * 这段代码是用于控制轮询的。其中，needPolling 参数表明当前是否需要进行轮询，umountRef 是一个 ref，用来记录组件是否被卸载。
       * 如果需要轮询并且组件没有被卸载，就会调用 setTimeout，等待一定的时间，然后再次调用 fetchListDebounce 函数，并传入需要轮询的时间参数。
       * 其中 Math.max(needPolling, 2000) 用于确定最小的轮询时间为 2000ms，避免频繁请求导致一直处于 loading 状态。
       */
      if (needPolling && !umountRef.current) {
        pollingSetTimeRef.current = setTimeout(() => {
          fetchListDebounce.run(needPolling);
          // 这里判断最小要2000ms，不然一直loading
        }, Math.max(needPolling, 2000));
      }

      return msg;
    } catch (error) {
      if (error === 'aborted') {
        return;
      }
      throw error;
    }
  }, debounceTime || 30);

  /**
   * 取消请求
   */
  const abortFetch = () => {
    abortRef.current?.abort();
    fetchListDebounce.cancel();
    requestFinally();
  };

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

  useEffect(() => {
    umountRef.current = false;

    return () => {
      umountRef.current = true;
    };
  }, []);

  /** PageIndex 改变的时候自动刷新 */
  useEffect(() => {
    const { current, pageSize } = pageInfo || {};
    // 如果上次的页码为空或者两次页码等于是没必要查询的
    // 如果 pageSize 发生变化是需要查询的，所以又加了 prePageSize
    if (
      (!prePage || prePage === current) &&
      (!prePageSize || prePageSize === pageSize)
    ) {
      return;
    }

    if (
      (options.pageInfo && tableDataList && tableDataList?.length > pageSize) ||
      0
    ) {
      return;
    }

    // 如果 list 的长度大于 pageSize 的长度
    // 说明是一个假分页
    // (pageIndex - 1 || 1) 至少要第一页
    // 在第一页大于 10
    // 第二页也应该是大于 10
    if (
      current !== undefined &&
      tableDataList &&
      tableDataList.length <= pageSize
    ) {
      abortFetch();
      fetchListDebounce.run(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo?.current]);

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize) {
      return;
    }
    abortFetch();
    fetchListDebounce.run(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo?.pageSize]);

  /**
   * 检查是否有正在进行的请求需要被中止。如果是，则使用 abortRef 中的方法来中止请求。
   * 接下来，使用名为 fetchListDebounce 的防抖函数并传入 false 参数。这个函数可以防止请求过于频繁地发出，通过延迟执行传递给它的函数来实现。
   * 最后，检查是否有正在进行的请求，如果有，则中止它。
   */
  useDeepCompareEffect(() => {
    abortFetch();
    fetchListDebounce.run(false);
    if (!manual) {
      // 如果 manual 标志未设置，则将 manualRequestRef 设置为 false。
      // 用于跟踪当前的请求是否是手动发起的。
      manualRequestRef.current = false;
    }
    return () => {
      abortFetch();
    };
  }, [...effects, manual]);

  return {
    /**
     * 表格的数据列表。
     * @type {DataSource[]}
     */
    dataSource: tableDataList! as DataSource[],
    /**
     * 用于设置表格数据列表的 setter 函数。
     * @type {function}
     * @param {DataSource[]} list - 更新后的表格数据列表。
     */
    setDataSource: setTableDataList,
    /**
     * 表示表格是否正在加载数据的标志。
     * @type {boolean}
     */
    loading:
      typeof options?.loading === 'object'
        ? { ...options?.loading, spinning: tableLoading }
        : tableLoading,
    /**
     * 重新加载表格数据的函数。
     * @type {function}
     * @async
     * @returns {Promise<boolean>} - 数据重新加载完成后解决为 true 的 Promise。
     */
    reload: async () => {
      abortFetch();
      return fetchListDebounce.run(false);
    },
    /**
     * 当前的分页信息。
     * @type {Object}
     * @prop {number} current - 当前页码。
     * @prop {number} total - 总数据数量。
     * @prop {number} pageSize - 每页数据数量。
     */
    pageInfo,
    /**
     * 表示表格是否正在进行轮询请求的标志。
     * @type {boolean}
     */
    pollingLoading,

    /**
     * 重置分页信息为其初始值的函数。
     * @type {function}
     * @async
     * @returns {Promise<void>} - 重置完成后解决的 Promise。
     */
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
    /**
     * 更新分页信息的函数。
     * @type {function}
     * @async
     * @param {Object} info - 新的分页信息。
     * @prop {number} [current] - 新的当前页码。
     * @prop {number} [total] - 新的总数据数量。
     * @prop {number} [pageSize] - 新的每页数据数量。
     * @returns {Promise<void>} - 更新完成后解决的 Promise。
     */
    setPageInfo: async (info) => {
      setPageInfo({
        ...pageInfo,
        ...info,
      });
    },
  };
};

export default useFetchData;
