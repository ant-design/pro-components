import type { ProColumns } from '@ant-design/pro-components';
import { CellEditorTable } from '@ant-design/pro-components';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

type RecordType = {
  id: number;
  title: string;
  readonly: string;
};

const columns: ProColumns<RecordType>[] = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Readonly',
    dataIndex: 'readonly',
    editable: false,
  },
];

describe('CellEditorTable', () => {
  it('keeps the edited value after leaving the cell (#8472)', async () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    const Demo = () => {
      const [value, setValue] = React.useState<RecordType[]>([
        { id: 1, title: 'before', readonly: 'locked' },
      ]);
      return (
        <CellEditorTable<RecordType>
          columns={columns}
          rowKey="id"
          value={value}
          onChange={(nextValue) => {
            onChange(nextValue);
            setValue(nextValue as RecordType[]);
          }}
          recordCreatorProps={false}
        />
      );
    };
    const wrapper = render(
      <Demo />,
    );

    fireEvent.doubleClick(wrapper.getByText('before'));
    const input = await wrapper.findByDisplayValue('before');
    fireEvent.change(input, { target: { value: 'after' } });
    fireEvent.blur(input);

    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.lastCall?.[0]).toEqual([
      { id: 1, title: 'after', readonly: 'locked' },
    ]);
    expect(wrapper.getByText('after')).toBeTruthy();
    vi.useRealTimers();
  });

  it('does not edit a column marked editable false (#8472)', () => {
    const wrapper = render(
      <CellEditorTable<RecordType>
        columns={columns}
        rowKey="id"
        value={[{ id: 1, title: 'before', readonly: 'locked' }]}
        recordCreatorProps={false}
      />,
    );

    fireEvent.doubleClick(wrapper.getByText('locked'));

    expect(wrapper.queryByDisplayValue('locked')).toBeNull();
  });
});
