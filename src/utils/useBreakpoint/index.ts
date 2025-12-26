import { useMemo } from 'react';
import useMediaQuery from '../useMediaQuery/query';

export type BreakpointMap = {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
};

/**
 * antd 的断点定义（与 antd Grid 系统一致）
 * xs: < 576px
 * sm: >= 576px
 * md: >= 768px
 * lg: >= 992px
 * xl: >= 1200px
 * xxl: >= 1600px
 */
const BREAKPOINT_QUERIES = {
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

/**
 * 自定义 useBreakpoint Hook
 * 返回与 antd useBreakpoint 兼容的对象格式
 * antd 的断点逻辑是累积式的：如果屏幕宽度 >= 断点值，则该断点及其以下的所有断点都为 true
 * 例如：如果屏幕宽度 >= 768px，则 xs, sm, md 都为 true，lg, xl, xxl 为 false
 */
function useBreakpoint(): BreakpointMap {
  const matchesXs = useMediaQuery(BREAKPOINT_QUERIES.xs);
  const matchesSm = useMediaQuery(BREAKPOINT_QUERIES.sm);
  const matchesMd = useMediaQuery(BREAKPOINT_QUERIES.md);
  const matchesLg = useMediaQuery(BREAKPOINT_QUERIES.lg);
  const matchesXl = useMediaQuery(BREAKPOINT_QUERIES.xl);
  const matchesXxl = useMediaQuery(BREAKPOINT_QUERIES.xxl);

  return useMemo(() => {
    // antd 的断点逻辑：从大到小检查，如果匹配某个断点，该断点及其以下的所有断点都为 true
    // xs 是特殊情况：只有在小屏幕时才为 true
    return {
      xs: matchesXs,
      sm: matchesSm || matchesMd || matchesLg || matchesXl || matchesXxl,
      md: matchesMd || matchesLg || matchesXl || matchesXxl,
      lg: matchesLg || matchesXl || matchesXxl,
      xl: matchesXl || matchesXxl,
      xxl: matchesXxl,
    };
  }, [matchesXs, matchesSm, matchesMd, matchesLg, matchesXl, matchesXxl]);
}

export default useBreakpoint;
