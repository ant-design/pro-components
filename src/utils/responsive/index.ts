import { Grid } from 'antd';
import { useMemo } from 'react';

/** antd Grid 断点名，按从大到小排列，用于响应式取值 */
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export const RESPONSIVE_ARRAY: Breakpoint[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
];

/** 从小到大，用于 Partial 配置向前填充 */
export const BREAKPOINT_ASC: Breakpoint[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
];

/**
 * SSR / 未匹配时的默认 screens。
 * Grid.useBreakpoint() 未匹配时返回 {}（truthy），不能用 || 做整体回退。
 */
export const DEFAULT_SCREENS: Record<Breakpoint, boolean> = {
  xs: true,
  sm: true,
  md: true,
  lg: false,
  xl: false,
  xxl: false,
};

export type ScreensMap = Partial<Record<Breakpoint, boolean>>;

/**
 * 将 Grid.useBreakpoint() 的结果补齐属性级默认值。
 * 未匹配返回 {} 时各属性为 undefined，用 ?? 回退。
 */
export const normalizeScreens = (
  rawScreens?: ScreensMap | null,
): Record<Breakpoint, boolean> => {
  if (rawScreens == null) {
    return { ...DEFAULT_SCREENS };
  }
  return {
    xxl: rawScreens.xxl ?? DEFAULT_SCREENS.xxl,
    xl: rawScreens.xl ?? DEFAULT_SCREENS.xl,
    lg: rawScreens.lg ?? DEFAULT_SCREENS.lg,
    md: rawScreens.md ?? DEFAULT_SCREENS.md,
    sm: rawScreens.sm ?? DEFAULT_SCREENS.sm,
    xs: rawScreens.xs ?? DEFAULT_SCREENS.xs,
  };
};

/**
 * 按 antd Grid 规则从当前 screens 解析响应式配置值。
 * 从 xxl → xs 取第一个「屏幕命中且配置有值」的档位。
 */
export const getResponsiveValue = <T>(
  screens: ScreensMap,
  config: Partial<Record<Breakpoint, T>> | undefined,
  fallback: T,
): T => {
  if (!config) {
    return fallback;
  }
  for (let i = 0; i < RESPONSIVE_ARRAY.length; i += 1) {
    const breakpoint = RESPONSIVE_ARRAY[i];
    if (screens[breakpoint] && config[breakpoint] !== undefined) {
      return config[breakpoint] as T;
    }
  }
  return fallback;
};

/**
 * 将 Partial 断点配置按「从小到大向前填充」补齐为完整配置。
 * 例如 `{ md: 8, xl: 6 }` → `{ xs:8, sm:8, md:8, lg:8, xl:6, xxl:6 }`
 * 与 antd Col 的「从该断点起生效，直到下一档覆盖」语义一致。
 */
export const fillResponsiveConfig = <T>(
  config: Partial<Record<Breakpoint, T>>,
): Record<Breakpoint, T> | undefined => {
  let last: T | undefined;
  const forward: Partial<Record<Breakpoint, T>> = {};

  for (const key of BREAKPOINT_ASC) {
    if (config[key] !== undefined) {
      last = config[key];
    }
    if (last !== undefined) {
      forward[key] = last;
    }
  }

  if (last === undefined) {
    return undefined;
  }

  // 第一个有值档位之前的更小断点，回填为第一个有值
  const firstDefined = BREAKPOINT_ASC.find((key) => config[key] !== undefined)!;
  const firstValue = config[firstDefined] as T;
  const result = { ...forward } as Record<Breakpoint, T>;
  for (const key of BREAKPOINT_ASC) {
    if (key === firstDefined) {
      break;
    }
    result[key] = firstValue;
  }
  return result;
};

/**
 * 主题感知的 screens hook：属性级默认值，避免 {} 导致 || 回退失效。
 */
export const useResponsiveScreens = (): Record<Breakpoint, boolean> => {
  const rawScreens = Grid.useBreakpoint();
  return useMemo(() => normalizeScreens(rawScreens), [rawScreens]);
};
