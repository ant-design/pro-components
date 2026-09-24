import { ProTable } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe.each(['read', 'edit'] as const)(
  'option column alignment in %s mode',
  (mode) => {
    it.each([
      [undefined, 'flex-start'],
      ['left', 'flex-start'],
      ['center', 'center'],
      ['right', 'flex-end'],
    ] as const)('respects align=%s', async (align, justifyContent) => {
      const actions = [
        <button key="edit" type="button">
          Edit
        </button>,
        <button key="delete" type="button">
          Delete
        </button>,
      ];
      const { getByRole } = render(
        <ProTable<{ id: number }>
          rowKey="id"
          search={false}
          options={false}
          pagination={false}
          dataSource={[{ id: 1 }]}
          columns={[
            {
              title: 'Actions',
              key: 'option',
              valueType: 'option',
              align,
              render: () => actions,
            },
          ]}
          editable={{
            editableKeys: mode === 'edit' ? [1] : [],
            actionRender: () => actions,
          }}
        />,
      );

      await waitFor(() => {
        const actionContainer = getByRole('button', {
          name: 'Edit',
        }).parentElement;
        expect(actionContainer?.style.display).toBe('flex');
        expect(actionContainer?.style.justifyContent).toBe(justifyContent);
        expect(actionContainer).toContainElement(
          getByRole('button', { name: 'Delete' }),
        );
        if (align) {
          expect(actionContainer?.closest('td')?.style.textAlign).toBe(align);
          expect(
            getByRole('columnheader', { name: 'Actions' }).style.textAlign,
          ).toBe(align);
        }
      });
    });
  },
);
