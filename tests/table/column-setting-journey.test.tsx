import { ProTable } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

/**
 * End-to-end style user journey for the toolbar column setting:
 * open the panel, hide a column, verify the table header updates,
 * then reset the settings back to default.
 */
describe('ProTable column setting journey (e2e)', () => {
  it('open panel -> hide column -> reset', async () => {
    const columnsStateChange = vi.fn();
    const html = render(
      <ProTable
        size="small"
        rowKey="key"
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
          { title: 'Address', dataIndex: 'address' },
        ]}
        columnsState={{
          onChange: columnsStateChange,
        }}
        request={async () => ({
          data: [
            { key: 1, name: 'Alex', age: 20, address: 'Hangzhou' },
            { key: 2, name: 'Bob', age: 30, address: 'Shanghai' },
          ],
          success: true,
        })}
      />,
    );

    // Step 1: table renders all three columns
    await waitFor(() => {
      expect(html.getByText('Alex')).toBeTruthy();
      expect(html.getByText('Hangzhou')).toBeTruthy();
    });
    const headerTitles = () =>
      Array.from(
        html.container.querySelectorAll('.ant-table-thead th'),
      ).map((th) => th.textContent ?? '');

    expect(headerTitles().join(',')).toContain('Age');

    // Step 2: open the column setting popover
    await act(async () => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);

    const overlay = html.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay',
    );
    expect(overlay).toBeTruthy();

    // Step 3: uncheck the Age column via its tree checkbox
    // Tree renders the checkbox as a sibling of the title wrapper inside
    // the same treenode row, so locate the row containing "Age" first.
    const ageRow = Array.from(
      overlay!.querySelectorAll<HTMLElement>('.ant-tree-treenode'),
    ).find((el) => el.textContent?.includes('Age'));
    expect(ageRow, 'age row in setting tree').toBeTruthy();
    await act(async () => {
      ageRow?.querySelector<HTMLElement>('.ant-tree-checkbox')?.click();
    });
    await waitForWaitTime(200);

    // Step 4: the Age column disappears from the table header
    await waitFor(() => {
      expect(headerTitles().join(',')).not.toContain('Age');
    });
    expect(columnsStateChange).toHaveBeenCalled();
    const lastState = columnsStateChange.mock.calls.at(-1)?.[0] as Record<
      string,
      { show?: boolean }
    >;
    expect(lastState.age.show).toBe(false);

    // Step 5: reset restores the default columns
    const resetButton = Array.from(
      overlay!.querySelectorAll<HTMLElement>('button, a'),
    ).find((el) => el.textContent?.includes('重置'));
    expect(resetButton).toBeTruthy();
    await act(async () => {
      fireEvent.click(resetButton!);
    });
    await waitFor(() => {
      expect(headerTitles().join(',')).toContain('Age');
    });
  });
});
