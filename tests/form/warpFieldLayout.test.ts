import { describe, expect, it } from 'vitest';
import {
  isWarpFieldIgnoreWidth,
  resolveWarpFieldClassName,
  resolveWarpFieldStyle,
} from '../../src/form/components/FormItem/warpFieldLayout';

describe('warpFieldLayout', () => {
  it('isWarpFieldIgnoreWidth respects ignoreWidth and valueType', () => {
    expect(isWarpFieldIgnoreWidth('text', false)).toBe(false);
    expect(isWarpFieldIgnoreWidth('switch', false)).toBe(true);
    expect(isWarpFieldIgnoreWidth('text', true)).toBe(true);
  });

  it('resolveWarpFieldStyle uses grid when no custom width token', () => {
    expect(
      resolveWarpFieldStyle({
        width: 'xs',
        grid: true,
        isIgnoreWidth: false,
      }),
    ).toMatchObject({ width: '100%' });

    expect(
      resolveWarpFieldStyle({
        width: 200,
        grid: true,
        isIgnoreWidth: false,
      }),
    ).toMatchObject({ width: 200 });
  });

  it('resolveWarpFieldStyle drops width when isIgnoreWidth', () => {
    expect(
      resolveWarpFieldStyle({
        width: 200,
        grid: false,
        isIgnoreWidth: true,
        fieldStyle: { color: 'red' },
      }),
    ).toEqual({ color: 'red' });
  });

  it('resolveWarpFieldClassName adds pro-field tokens', () => {
    expect(
      resolveWarpFieldClassName({
        width: 'md',
        isIgnoreWidth: false,
      }),
    ).toContain('pro-field-md');
  });
});
