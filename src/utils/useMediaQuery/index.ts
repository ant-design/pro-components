import { theme } from 'antd';
import { useMemo } from 'react';
import useMediaQuery from './query';

/**
 * 单个断点描述：可选的 minWidth/maxWidth + 必须的 matchMedia 字符串。
 */
type MediaQueryItem = {
  minWidth?: number;
  maxWidth?: number;
  matchMedia: string;
};

type MediaQueryEnumShape = {
  xs: MediaQueryItem;
  sm: MediaQueryItem;
  md: MediaQueryItem;
  lg: MediaQueryItem;
  xl: MediaQueryItem;
  xxl: MediaQueryItem;
};

export type MediaQueryKey = keyof MediaQueryEnumShape;

/**
 * 按断点优先级从大到小排列，方便 useBreakpoint / getScreenClassName 用同一份顺序匹配。
 */
const BREAKPOINT_PRIORITY: MediaQueryKey[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
];

let cachedMediaQueryEnum: MediaQueryEnumShape | undefined;

/**
 * 懒求值的 MediaQueryEnum 工厂。
 *
 * 不能再像旧实现那样 `const token = theme.getDesignToken()` 写在模块顶层 ——
 *  1. SSR 环境下模块 import 即触发 antd cssinjs 计算，可能产生 SSR warning；
 *  2. 用户用 ConfigProvider 自定义 token 时，外层 token 修改后 MediaQueryEnum
 *     仍是模块加载时的旧值，断点完全失效；
 *  3. 测试环境下若 antd 还未初始化（mock 时序问题）会直接抛错。
 *
 * 改成首次访问时才求值并缓存：浏览器一次会话一般不会改 ConfigProvider token，
 * 缓存命中即等价于模块顶层常量；SSR 也只会在真正用到时才触发求值。
 */
const getMediaQueryEnum = (): MediaQueryEnumShape => {
  if (cachedMediaQueryEnum) return cachedMediaQueryEnum;
  const token = theme.getDesignToken();
  cachedMediaQueryEnum = {
    xs: {
      maxWidth: token.screenXSMax,
      matchMedia: `(max-width: ${token.screenXSMax}px)`,
    },
    sm: {
      minWidth: token.screenSMMin,
      maxWidth: token.screenSMMax,
      matchMedia: `(min-width: ${token.screenSMMin}px) and (max-width: ${token.screenSMMax}px)`,
    },
    md: {
      minWidth: token.screenMDMin,
      maxWidth: token.screenMDMax,
      matchMedia: `(min-width: ${token.screenMDMin}px) and (max-width: ${token.screenMDMax}px)`,
    },
    lg: {
      minWidth: token.screenLGMin,
      maxWidth: token.screenLGMax,
      matchMedia: `(min-width: ${token.screenLGMin}px) and (max-width: ${token.screenLGMax}px)`,
    },
    xl: {
      minWidth: token.screenXLMin,
      maxWidth: token.screenXLMax,
      matchMedia: `(min-width: ${token.screenXLMin}px) and (max-width: ${token.screenXLMax}px)`,
    },
    xxl: {
      minWidth: token.screenXXLMin,
      matchMedia: `(min-width: ${token.screenXXLMin}px)`,
    },
  };
  return cachedMediaQueryEnum;
};

/**
 * 历史导出：保留 `MediaQueryEnum.xx.matchMedia` 直接访问的形状，但底层走懒初始化。
 * 用 Proxy 把每次属性访问都转发到 `getMediaQueryEnum()`，外部代码无需感知。
 */
export const MediaQueryEnum: MediaQueryEnumShape = new Proxy(
  {} as MediaQueryEnumShape,
  {
    get(_target, prop: string) {
      return getMediaQueryEnum()[prop as MediaQueryKey];
    },
    ownKeys() {
      return Object.keys(getMediaQueryEnum());
    },
    getOwnPropertyDescriptor(_target, prop: string) {
      const value = getMediaQueryEnum()[prop as MediaQueryKey];
      return value
        ? { configurable: true, enumerable: true, value, writable: false }
        : undefined;
    },
  },
);

/**
 * 同步读取当前屏幕命中的最大断点。SSR 下返回 undefined（无 window）。
 * 仅用于类组件 / 非 React 环境的一次性查询；React 函数组件请使用 `useBreakpoint`。
 */
export const getScreenClassName = (): MediaQueryKey | undefined => {
  if (typeof window === 'undefined') return undefined;
  const enumValue = getMediaQueryEnum();
  return BREAKPOINT_PRIORITY.find((key) =>
    window.matchMedia(enumValue[key].matchMedia).matches,
  );
};

/**
 * 订阅当前屏幕的断点。返回 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'，
 * 在所有断点都未命中（理论上不会发生）的兜底场景下返回 'md'。
 */
const useBreakpoint = (): MediaQueryKey => {
  const enumValue = getMediaQueryEnum();
  // 6 个 useMediaQuery 调用顺序必须稳定，不能放到循环/条件里
  const isXs = useMediaQuery(enumValue.xs.matchMedia);
  const isSm = useMediaQuery(enumValue.sm.matchMedia);
  const isMd = useMediaQuery(enumValue.md.matchMedia);
  const isLg = useMediaQuery(enumValue.lg.matchMedia);
  const isXl = useMediaQuery(enumValue.xl.matchMedia);
  const isXxl = useMediaQuery(enumValue.xxl.matchMedia);

  return useMemo<MediaQueryKey>(() => {
    if (isXxl) return 'xxl';
    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    if (isXs) return 'xs';
    return 'md';
  }, [isXxl, isXl, isLg, isMd, isSm, isXs]);
};

export { useBreakpoint };
