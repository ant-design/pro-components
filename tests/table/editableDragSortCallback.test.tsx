import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/table/components/DragSortTable', () => ({
  default: (props: {
    dataSource: Array<{ id: string; name: string }>;
    onDragSortEnd: (
      beforeIndex: number,
      afterIndex: number,
      dataSource: Array<{ id: string; name: string }>,
    ) => void;
  }) => (
    <>
      <output data-testid="order">
        {props.dataSource.map((item) => item.id).join(',')}
      </output>
      <button
        type="button"
        onClick={() =>
          props.onDragSortEnd(1, 0, [props.dataSource[1], props.dataSource[0]])
        }
      >
        reorder
      </button>
    </>
  ),
}));

import {
  EditableProTable,
  ProForm,
  type ProFormInstance,
} from '@ant-design/pro-components';

afterEach(cleanup);

describe('EditableProTable drag sort callback', () => {
  it('updates controlled value before forwarding onDragSortEnd', async () => {
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
          columns={[{ dataIndex: 'name' }]}
          recordCreatorProps={false}
          dragSortKey="name"
          onDragSortEnd={onDragSortEnd}
        />
      );
    }

    const html = render(<Demo />);
    expect(html.getByTestId('order')).toHaveTextContent('1,2');
    fireEvent.click(html.getByRole('button', { name: 'reorder' }));

    await waitFor(() =>
      expect(html.getByTestId('order')).toHaveTextContent('2,1'),
    );
    const expected = [
      { id: '2', name: 'Bob' },
      { id: '1', name: 'Alice' },
    ];
    expect(onChange).toHaveBeenCalledWith(expected);
    expect(onDragSortEnd).toHaveBeenCalledWith(1, 0, expected);
  });

  it('reorders name-mode form values while preserving an active edit', async () => {
    const formRef = createRef<ProFormInstance>();
    const html = render(
      <ProForm
        formRef={formRef}
        initialValues={{
          users: [
            { id: '1', name: 'Alice' },
            { id: '2', name: 'Bob' },
          ],
        }}
        submitter={false}
      >
        <EditableProTable
          name="users"
          rowKey="id"
          columns={[{ dataIndex: 'name' }]}
          editable={{ editableKeys: ['1'] }}
          recordCreatorProps={false}
          dragSortKey="name"
        />
      </ProForm>,
    );

    await waitFor(() =>
      expect(html.getByTestId('order')).toHaveTextContent('1,2'),
    );
    formRef.current?.setFieldsValue({
      users: [
        { id: '1', name: 'Alice edited' },
        { id: '2', name: 'Bob' },
      ],
    });
    fireEvent.click(html.getByRole('button', { name: 'reorder' }));

    await waitFor(() =>
      expect(formRef.current?.getFieldValue('users')).toEqual([
        { id: '2', name: 'Bob' },
        { id: '1', name: 'Alice edited' },
      ]),
    );
  });
});
