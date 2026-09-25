import { ProTable, type ActionType } from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * End-to-end style user journey: a user searches a table, browses pages,
 * edits the search keywords, and finally resets the form.
 * Each step asserts the state the user sees and the params the server receives.
 */
describe('ProTable crud journey (e2e)', () => {
  const TOTAL = 55;
  const PAGE_SIZE = 20;

  const makeRequest = vi.fn();

  function JourneyTable() {
    return (
      <ProTable
        size="small"
        rowKey="key"
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Status', dataIndex: 'status', valueType: 'select' },
        ]}
        request={async (params) => {
          makeRequest(params);
          const { current = 1, pageSize = PAGE_SIZE, name: keyword } = params;
          const all = Array.from({ length: TOTAL }, (_, i) => ({
            key: i,
            name: keyword ? `${keyword}-${i}` : `row-${i}`,
            status: i % 2,
          }));
          return {
            data: all.slice((current - 1) * pageSize, current * pageSize),
            total: TOTAL,
            success: true,
          };
        }}
      />
    );
  }

  it('search -> browse pagination -> refine search -> reset', async () => {
    const html = render(<JourneyTable />);

    // Step 1: initial load renders the first page
    await waitFor(() => {
      expect(html.getByText('row-0')).toBeTruthy();
      expect(html.getByText('row-19')).toBeTruthy();
    });
    expect(makeRequest.mock.calls.at(-1)?.[0]).toMatchObject({
      current: 1,
      pageSize: PAGE_SIZE,
    });

    // Step 2: user searches for "foo"
    const input = html.container.querySelector<HTMLInputElement>(
      '#name',
    )!;
    fireEvent.change(input, { target: { value: 'foo' } });
    await act(async () => {
      html.getByText('查 询').click();
    });

    await waitFor(() => {
      expect(html.getByText('foo-0')).toBeTruthy();
    });
    expect(makeRequest.mock.calls.at(-1)?.[0]).toMatchObject({
      current: 1,
      name: 'foo',
    });

    // Step 3: user goes to page 2, keyword must be preserved
    await act(async () => {
      html.getByText('2').click();
    });
    await waitFor(() => {
      expect(makeRequest.mock.calls.at(-1)?.[0]).toMatchObject({
        current: 2,
        name: 'foo',
      });
    });

    // Step 4: user resets the form, keyword is cleared and page resets
    await act(async () => {
      html.getByText('重 置').click();
    });
    await waitFor(() => {
      expect(makeRequest.mock.calls.at(-1)?.[0]).toMatchObject({
        current: 1,
      });
    });
    expect(makeRequest.mock.calls.at(-1)?.[0].name).toBeUndefined();
    await waitFor(() => {
      expect(html.getByText('row-0')).toBeTruthy();
    });
  });

  it('reload keeps current search context', async () => {
    const actionRef = React.createRef<ActionType>();
    const html = render(
      <ProTable
        actionRef={actionRef}
        size="small"
        rowKey="key"
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Status', dataIndex: 'status', valueType: 'select' },
        ]}
        request={async (params) => {
          makeRequest(params);
          const { current = 1, pageSize = PAGE_SIZE, name: keyword } = params;
          const all = Array.from({ length: TOTAL }, (_, i) => ({
            key: i,
            name: keyword ? `${keyword}-${i}` : `row-${i}`,
            status: i % 2,
          }));
          return {
            data: all.slice((current - 1) * pageSize, current * pageSize),
            total: TOTAL,
            success: true,
          };
        }}
      />,
    );

    await waitFor(() => {
      expect(html.getByText('row-0')).toBeTruthy();
    });

    // Search first
    const input = html.container.querySelector<HTMLInputElement>('#name')!;
    fireEvent.change(input, { target: { value: 'bar' } });
    await act(async () => {
      html.getByText('查 询').click();
    });
    await waitFor(() => {
      expect(html.getByText('bar-0')).toBeTruthy();
    });

    // Simulate an external reload (e.g. after a mutation elsewhere)
    await act(async () => {
      actionRef.current?.reload();
    });
    await waitFor(() => {
      const last = makeRequest.mock.calls.at(-1)?.[0];
      expect(last.name).toBe('bar');
      expect(last.current).toBe(1);
    });
    await waitFor(() => {
      expect(html.getByText('bar-0')).toBeTruthy();
    });
  });
});
