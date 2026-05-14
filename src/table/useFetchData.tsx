import { useControlledState } from '@rc-component/util';
import { useEffect, useRef, useState } from 'react';
import {
  runFunction,
  useDebounceFn,
  useDeepCompareEffect,
  usePrevious,
  useRefFunction,
} from '../utils';
import type { RequestData, UseFetchDataAction, UseFetchProps } from './typing';
import { postDataPipeline } from './utils/index';
import { usePageInfo } from './utils/usePageInfo';

/**
 * 轮询的最小间隔（毫秒）。低于此值会被钳制为此值，避免在请求 RTT 较大时
 * 出现「上一次还没回来就发起下一次」导致一直 loading 的问题。
 * 该协议被 `tests/table/polling.test.tsx#85 polling min time is 2000` 明确锁定。
 */
const MIN_POLLING_INTERVAL_MS = 2000;

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
  const [tableDataList, setTableDataListInner] = useControlledState<
    DataSource[] | undefined
  >(defaultData, options?.dataSource);
  const setTableDataList = useRefFunction(
    (
      updater:
        | DataSource[]
        | undefined
        | ((prev: DataSource[] | undefined) => DataSource[] | undefined),
    ) => {
      setTableDataListInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (
                updater as (
                  p: DataSource[] | undefined,
                ) => DataSource[] | undefined
              )(prev)
            : updater;
        // 使用 queueMicrotask 延迟回调，避免在渲染期间更新其他组件状态
        queueMicrotask(() => {
          options?.onDataSourceChange?.(next);
        });
        return next;
      });
    },
  );

  /**
   * 表格的加载状态
   */
  const tableLoadingValue =
    typeof options?.loading === 'object'
      ? options?.loading?.spinning
      : options?.loading;
  const [tableLoading, setTableLoadingInner] = useControlledState<boolean>(
    false,
    tableLoadingValue,
  );

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const onLoadingChange = useRefFunction((loading: boolean) => {
    options?.onLoadingChange?.(loading);
  });

  /**
   * 包装 setTableLoading，使用 queueMicrotask 延迟回调调用
   * 避免在渲染阶段调用外部回调导致的 React 警告
   */
  const setTableLoading = useRefFunction(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setTableLoadingInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        queueMicrotask(() => {
          onLoadingChange(next);
        });
        return next;
      });
    },
  );

  /**
   * 表示页面信息的类型
   * @typedef {object} PageInfo
   * @property {number} current 当前页码
   * @property {number} pageSize 页面大小
   * @property {number} total 数据总量
   * @type {[PageInfo, React.Dispatch<React.SetStateAction<PageInfo>>]}
   */
  const [pageInfo, setPageInfo] = usePageInfo(options);

  const [pollingLoading, setPollingLoading] = useState(false);

  // Batching update  https://github.com/facebook/react/issues/14259
  const setDataAndLoading = (newData: DataSource[], dataTotal: number) => {
    setTableDataList(newData);
    if (pageInfo?.total !== dataTotal) {
      // 旧实现 `setPageInfo({ ...pageInfo, total: ... })` 会用 fetchList 启动时
      // 捕获的 pageInfo 快照（含 current / pageSize）覆盖回去：如果用户在 await 期间
      // 已经改了 current（如点了下一页），await 完成后此处会把 current 倒退回快照值。
      // setPageInfo 来自 usePageInfo，本身接受 Partial<PageInfo> 并自动 merge 到
      // 最新 pageInfo ref 上，所以这里只需传 total 这一个真正要变的字段。
      setPageInfo({
        total: dataTotal || newData.length,
      });
    }
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
    setTableLoading(false);
    setPollingLoading(false);
  });
  /** 请求数据 */
  const fetchList = async (isPolling: boolean, signal?: AbortSignal) => {
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
      // 如果被取消了，直接返回
      if (signal?.aborted) {
        return [];
      }
      // 如果失败了，直接返回，不走剩下的逻辑了
      if (success === false) return [];

      const responseData = postDataPipeline<DataSource[]>(
        data!,
        [options.postData].filter((item) => item) as any,
      );
      // 设置表格数据
      if (signal?.aborted) {
        return [];
      }
      setDataAndLoading(responseData, total);
      onLoad?.(responseData, rest);
      return responseData;
    } catch (e) {
      // 如果被取消了，直接返回
      if (signal?.aborted) {
        return [];
      }
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      const requestError = e instanceof Error ? e : new Error(String(e));
      if (onRequestError === undefined) {
        throw requestError;
      }
      if (tableDataList === undefined) setTableDataList([]);
      onRequestError(requestError);
    } finally {
      if (!signal?.aborted) {
        requestFinally();
      }
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
        fetchList(isPolling, abort.signal),
        new Promise((_, reject) => {
          // 关键修复：监听局部 `abort.signal` 而不是 `abortRef.current.signal`。
          // 旧实现 `abortRef.current?.signal?.addEventListener(...)` 在 await 期间
          // 如果再次触发 fetchListDebounce，abortRef.current 被新 abort 覆盖，
          // 旧 listener 反而监听到新 signal —— 新 abort 触发时旧 Promise 也跟着 reject，
          // 而且回调里的 `fetchListDebounce.cancel()` 会把刚发起的新请求一并取消。
          // 用局部 abort 变量保证「listener 与对应的 fetchList 调用绑定的是同一个 signal」。
          //
          // { once: true }：abort 是一次性事件，旧实现没有 once / 没有 removeEventListener，
          // 高频 reload + 长 await getData 的场景下回调（持有 reject / fetchListDebounce
          // / requestFinally 闭包）会短时间累积，存在轻量内存泄漏风险。
          abort.signal.addEventListener?.(
            'abort',
            () => {
              reject('aborted');
              // 结束请求，并且清空loading控制
              fetchListDebounce.cancel();
              requestFinally();
            },
            { once: true },
          );
        }),
      ])) as DataSource[];

      if (abort.signal.aborted) return;
      // 放到请求前面会导致数据是上一次的
      const needPolling = runFunction(polling, msg);

      /*
       * 控制下一次轮询：
       *  - needPolling 为 truthy（数字 / boolean true）且组件未卸载时才排期；
       *  - 排期间隔被 `MIN_POLLING_INTERVAL_MS`（2000ms）钳制为下界，避免请求 RTT
       *    较大时上一次还没回来就发起下一次导致一直 loading；
       *  - 当用户传入数字且 < 下界时，仅在开发模式下打一次 warn 提醒被钳制
       *    （旧实现对此完全沉默，用户排查"为什么我传 500 实际是 2000"困难）。
       */
      if (needPolling && !umountRef.current) {
        if (
          process.env.NODE_ENV !== 'production' &&
          typeof needPolling === 'number' &&
          needPolling < MIN_POLLING_INTERVAL_MS
        ) {
          // eslint-disable-next-line no-console
          console.warn(
            `[ProTable] polling=${needPolling}ms is below the minimum interval ${MIN_POLLING_INTERVAL_MS}ms and has been clamped to ${MIN_POLLING_INTERVAL_MS}ms. Lower values are not supported to avoid request pile-up.`,
          );
        }
        pollingSetTimeRef.current = setTimeout(
          () => {
            fetchListDebounce.run(needPolling);
          },
          Math.max(needPolling as number, MIN_POLLING_INTERVAL_MS),
        );
      }

      return msg;
    } catch (error) {
      if (error === 'aborted') {
        return [];
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

    // 上次的页码为空、或者两次页码相同、且 pageSize 也未变化时，
    // 说明本次重渲染并非真正的翻页，直接返回不重请求。
    if (
      (!prePage || prePage === current) &&
      (!prePageSize || prePageSize === pageSize)
    ) {
      return;
    }

    // 「假分页」守门：
    // 当用户启用 pageInfo（即 ProTable 自带分页），且当前已加载数据条数超过 pageSize 时，
    // 说明上游 request 一次性返回了「跨页全量数据」，本地表格自己做切片即可，
    // 翻页不应该再发起新请求。该协议被 `pagination.test.tsx#227 request call once
    // when data.length more then pageSize` 锁定。
    //
    // 旧实现末尾的 `|| 0` 是 dead expression（`||` 优先级低于整个表达式，最终参与判断的
    // 只是 0 这个 falsy 值，对条件无影响）。这里直接移除。
    if (options.pageInfo && tableDataList && tableDataList.length > pageSize) {
      return;
    }

    // 走到这里说明是真分页（后端按 page 返回数据）：
    // 当前页码已知，且本地数据条数 <= pageSize，发起新请求拉取下一页。
    // （旧注释「list 长度大于 pageSize 是假分页」与下面的判断 `<= pageSize` 完全反向，
    //  实际上「假分页」已在上面那段提前 return 了，这里处理的是「真分页」场景。）
    if (
      current !== undefined &&
      tableDataList &&
      tableDataList.length <= pageSize
    ) {
      abortFetch();
      fetchListDebounce.run(false);
    }
  }, [pageInfo?.current]);

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize) {
      return;
    }
    abortFetch();
    fetchListDebounce.run(false);
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
     *
     * 协议（与 `UseFetchDataAction.reload: () => Promise<void>` 对齐）：
     *   - 仅作为副作用触发，不向调用方返回数据；
     *   - 旧 doc 写 `Promise<boolean>`、旧实现把 `fetchListDebounce.run` 的结果（DataSource[]
     *     | undefined）返回出去，与公共类型 `Promise<void>` 三处不一致。这里统一以
     *     typing.ts 的公共类型为准，不做返回。
     *
     * @async
     * @returns {Promise<void>} - 数据重新加载完成后 resolve 的 Promise。
     */
    reload: async () => {
      abortFetch();
      // 对于手动 reload，我们需要强制执行请求，即使在 manualRequest 模式下
      manualRequestRef.current = false;
      await fetchListDebounce.run(false);
      // 如果之前是手动模式，不要重置为 true，因为用户已经手动触发了请求
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
      setPageInfo(info);
    },
  };
};

export default useFetchData;
