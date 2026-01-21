import { useControlledState } from '@rc-component/util';
import { useCallback } from 'react';
import { useRefFunction } from '../../utils';
import type { PageInfo, UseFetchProps } from '../typing';

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
 * 专门用于处理分页信息更新的 Hook
 * 解决了 total 缺失导致的死循环问题
 */
export function usePageInfo(options: UseFetchProps) {
  const [pageInfo, setPageInfoStateInner] = useControlledState<PageInfo>(
    () => mergeOptionAndPageInfo(options),
    undefined,
  );
  const setPageInfoState = useCallback(
    (updater: PageInfo | ((prev: PageInfo) => PageInfo)) => {
      setPageInfoStateInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: PageInfo) => PageInfo)(prev)
            : updater;
        options?.onPageInfoChange?.(next);
        return next;
      });
    },
    [options?.onPageInfoChange],
  );
  const setPageInfo = useRefFunction((changePageInfo: Partial<PageInfo>) => {
    const newPageInfo = {
      ...pageInfo,
      ...changePageInfo,
    };

    if (
      newPageInfo.current !== pageInfo.current ||
      newPageInfo.pageSize !== pageInfo.pageSize ||
      newPageInfo.total !== pageInfo.total
    ) {
      setPageInfoState(newPageInfo as PageInfo);
    }
  });

  return [pageInfo, setPageInfo] as const;
}
