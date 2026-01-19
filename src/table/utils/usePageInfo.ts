import { useMergedState } from '@rc-component/util';
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
  const [pageInfo, setPageInfoState] = useMergedState<PageInfo>(
    () => mergeOptionAndPageInfo(options),
    {
      onChange: options?.onPageInfoChange,
    },
  );
  const setPageInfo = useRefFunction((changePageInfo: PageInfo) => {
    if (
      (changePageInfo.current !== undefined &&
        changePageInfo.current !== pageInfo.current) ||
      (changePageInfo.pageSize !== undefined &&
        changePageInfo.pageSize !== pageInfo.pageSize) ||
      (changePageInfo.total !== undefined &&
        changePageInfo.total !== pageInfo.total)
    ) {
      setPageInfoState(changePageInfo);
    }
  });

  return [pageInfo, setPageInfo] as const;
}
