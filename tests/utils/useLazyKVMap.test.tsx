import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useLazyKVMap from '../../src/utils/useLazyKVMap';

describe('useLazyKVMap', () => {
  it('🐛 #9243 is a callable local ESM default export', () => {
    const data = [
      {
        id: 1,
        children: [{ id: 2 }],
      },
    ];
    const { result } = renderHook(() =>
      useLazyKVMap(data, 'children', (record) => record.id),
    );

    expect(typeof useLazyKVMap).toBe('function');
    expect(result.current[0](1)).toBe(data[0]);
    expect(result.current[0](2)).toBe(data[0].children[0]);
  });

  it('keeps the lookup callback stable while its inputs are unchanged', () => {
    const data = [{ id: 1 }];
    const getRowKey = vi.fn((record: { id: number }) => record.id);
    const { result, rerender } = renderHook(() =>
      useLazyKVMap(data, 'children', getRowKey),
    );
    const firstLookup = result.current[0];

    rerender();

    expect(result.current[0]).toBe(firstLookup);
  });
});
