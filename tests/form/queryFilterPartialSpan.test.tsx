import { describe, expect, it } from 'vitest';
import { getSpanConfig } from '../../src/form/layouts/QueryFilter';

/**
 * Partial span 配置：用户只需写关心的断点，未写档位向前填充。
 * 例：span={{ md: 8, xl: 6 }} 在 sm 宽度下也会得到 8，而不是 NaN。
 */
describe('QueryFilter partial span config', () => {
  const breakpointsConfig = {
    breakpoints: {
      vertical: [] as (string | number)[][],
      default: [] as (string | number)[][],
    },
    configSpanBreakpoints: {
      xs: 480,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
    },
  };

  it('partial span {{ md: 8, xl: 6 }} resolves without NaN', () => {
    // width 传入 getSpanConfig 时已是 containerWidth + 16
    // 800 → 落在 md 档（768 <= w < 992）
    const atMd = getSpanConfig(
      'horizontal',
      800,
      { md: 8, xl: 6 },
      breakpointsConfig,
    );
    expect(atMd.span).toBe(8);
    expect(Number.isNaN(atMd.span)).toBe(false);

    // 1300 → xl 档
    const atXl = getSpanConfig(
      'horizontal',
      1300,
      { md: 8, xl: 6 },
      breakpointsConfig,
    );
    expect(atXl.span).toBe(6);

    // 500 → 小于 md，回填为 md 的 8
    const atXs = getSpanConfig(
      'horizontal',
      500,
      { md: 8, xl: 6 },
      breakpointsConfig,
    );
    expect(atXs.span).toBe(8);
  });

  it('keeps vertical layout with partial span', () => {
    const result = getSpanConfig(
      'vertical',
      1000,
      { lg: 6 },
      breakpointsConfig,
    );
    expect(result).toEqual({ span: 6, layout: 'vertical' });
  });
});
