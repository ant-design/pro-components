import { useRefFunction } from '../../utils';
import type { PageInfo } from '../typing';

/**
 * 专门用于处理分页信息更新的 Hook
 * 解决了 total 缺失导致的死循环问题
 */
export function usePageInfo(
  pageInfo: PageInfo,
  setPageInfoState: (info: PageInfo) => void,
) {
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

  return setPageInfo;
}
