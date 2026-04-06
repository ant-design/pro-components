import { describe, expect, it } from 'vitest';
import { genParams } from '../../src/form/sync/genParams';

describe('genParams', () => {
  it('returns params as-is when syncToUrl is true', () => {
    const params = { a: '1', b: 2 };
    expect(genParams(true, params, 'get')).toBe(params);
    expect(genParams(true, params, 'set')).toBe(params);
  });

  it('invokes function with params and type when syncToUrl is a function', () => {
    const fn = (values: Record<string, string>, type: 'get' | 'set') => ({
      ...values,
      type,
    });
    expect(genParams(fn, { x: 'y' }, 'get')).toEqual({ x: 'y', type: 'get' });
    expect(genParams(fn, { x: 'y' }, 'set')).toEqual({ x: 'y', type: 'set' });
  });
});
