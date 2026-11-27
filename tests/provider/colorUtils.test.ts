import { describe, expect, it } from 'vitest';
import { lighten } from '../../src/provider/useStyle';
import { createStyleCalc } from '../../src/provider/useStyle/calc';
import { setAlpha } from '../../src/provider/utils/setAlpha';

describe('theme color utilities', () => {
  it('preserves TinyColor behavior for literal colors', () => {
    expect(setAlpha('#fff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
    expect(setAlpha('rgba(18, 52, 86, 0.8)', 0.25)).toBe(
      'rgba(18, 52, 86, 0.25)',
    );
    expect(lighten('#000', 50)).toBe('#808080');
  });

  it('uses color-mix for CSS variables without parsing them as colors', () => {
    expect(setAlpha('var(--topiam-color-bg-elevated)', 0.6)).toBe(
      'color-mix(in srgb, var(--topiam-color-bg-elevated) 60%, transparent)',
    );
    expect(lighten('var(--ant-color-primary)', 20)).toBe(
      'color-mix(in srgb, var(--ant-color-primary), white 20%)',
    );
  });

  it('normalizes alpha and brightness bounds', () => {
    expect(setAlpha('var(--ant-color-text)', -0.1)).toBe(
      'color-mix(in srgb, var(--ant-color-text) 0%, transparent)',
    );
    expect(setAlpha('var(--ant-color-text)', 1)).toBe(
      'color-mix(in srgb, var(--ant-color-text) 100%, transparent)',
    );
    expect(setAlpha('var(--ant-color-text)', 1 / 3)).toBe(
      'color-mix(in srgb, var(--ant-color-text) 33.333333%, transparent)',
    );
    expect(lighten('var(--ant-color-text)', 101)).toBe(
      'color-mix(in srgb, var(--ant-color-text), white 100%)',
    );
  });

  it('creates CSS calc for empty-string prefix and returns undefined only for undefined', () => {
    expect(createStyleCalc(undefined)).toBeUndefined();
    const unprefixedCalc = createStyleCalc('');
    expect(unprefixedCalc).toBeDefined();
    expect(unprefixedCalc!('var(--padding)').add(4).equal()).toBe(
      'calc(var(--padding) + 4px)',
    );
  });
});
