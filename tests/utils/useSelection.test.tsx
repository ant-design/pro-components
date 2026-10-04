import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useSelection from '../../src/utils/useSelection';

type RecordType = {
  id: number;
  children?: RecordType[];
};

describe('useSelection', () => {
  it('reuses the key index instead of scanning the data source on selection', () => {
    const child = { id: 2 };
    const data = [{ id: 1, children: [child] }, { id: 3 }];
    const records = new Map<number, RecordType>([
      [1, data[0]],
      [2, child],
      [3, data[1]],
    ]);
    const getRowKey = vi.fn((record: RecordType) => record.id);
    const getRecordByKey = vi.fn((key: React.Key) => records.get(Number(key)));
    const onChange = vi.fn();
    const onSelect = vi.fn();

    const { result } = renderHook(() =>
      useSelection(
        {
          getRowKey,
          getRecordByKey,
          data,
          pageData: data,
        },
        { onChange, onSelect },
      ),
    );

    const selectionColumn = result.current[0]([])[0];
    const checkbox = selectionColumn.render(undefined, child, 0);
    getRowKey.mockClear();

    act(() => {
      checkbox.props.onChange({ target: { checked: true } });
    });

    expect(getRowKey).not.toHaveBeenCalled();
    expect(getRecordByKey).toHaveBeenCalledTimes(1);
    expect(getRecordByKey).toHaveBeenCalledWith(child.id);
    expect(onChange.mock.lastCall?.[1]).toEqual([child]);
    expect(onSelect.mock.lastCall?.[2]).toBe(onChange.mock.lastCall?.[1]);
  });
});
