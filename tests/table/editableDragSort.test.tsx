import { EditableProTable } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(cleanup);

describe('EditableProTable drag sort', () => {
  it('renders drag handles while a row remains editable', async () => {
    const onChange = vi.fn();
    const onDragSortEnd = vi.fn();

    function Demo() {
      const [value, setValue] = useState([
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ]);
      return (
        <EditableProTable
          rowKey="id"
          value={value}
          onChange={(next) => {
            onChange(next);
            setValue([...next]);
          }}
          columns={[
            { title: 'Sort', dataIndex: 'sort' },
            { title: 'Name', dataIndex: 'name' },
          ]}
          editable={{ editableKeys: ['1'] }}
          recordCreatorProps={false}
          dragSortKey="sort"
          onDragSortEnd={onDragSortEnd}
          tableViewRender={(_, defaultDom) => (
            <section data-testid="custom-table-view">
              {typeof defaultDom === 'function' ? defaultDom() : defaultDom}
            </section>
          )}
        />
      );
    }

    const { container } = render(<Demo />);
    await waitFor(() =>
      expect(
        container.querySelectorAll('.ant-pro-table-drag-icon'),
      ).toHaveLength(2),
    );
    await waitForWaitTime(200);
    expect(container.querySelector('tbody input[value="Alice"]')).toBeTruthy();
    expect(
      container.querySelector('[data-testid="custom-table-view"]'),
    ).toBeTruthy();
    expect(
      container.querySelectorAll('[aria-roledescription="sortable"]').length,
    ).toBeGreaterThan(0);
    expect(onChange).not.toHaveBeenCalled();
    expect(onDragSortEnd).not.toHaveBeenCalled();
  });
});
