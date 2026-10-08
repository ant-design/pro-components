import { ProTable } from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(cleanup);

describe('ProTable cursor pagination', () => {
  it('uses returned nextToken and keeps cursor history for previous pages', async () => {
    const request = vi.fn(
      async (params: {
        pageSize?: number;
        current?: number;
        nextToken?: string;
        filter?: string;
      }) => {
        if (params.nextToken === 'page-2') {
          return { data: [{ id: 3 }], success: true };
        }
        if (params.nextToken === 'page-1') {
          return {
            data: [{ id: 2 }],
            success: true,
            nextToken: 'page-2',
          };
        }
        return {
          data: [{ id: 1 }],
          success: true,
          nextToken: 'page-1',
        };
      },
    );

    const props = {
      columns: [{ dataIndex: 'id', title: 'ID' }],
      pagination: { type: 'cursor' as const, pageSize: 1 },
      request,
      rowKey: 'id',
      search: false as const,
    };
    const html = render(<ProTable {...props} />);

    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0]).toMatchObject({ pageSize: 1 });
    expect(request.mock.calls[0][0]).not.toHaveProperty('current');
    expect(request.mock.calls[0][0]).not.toHaveProperty('nextToken');
    expect(
      html.container.querySelectorAll('.ant-pagination-item a'),
    ).toHaveLength(0);

    const next = () =>
      html.container.querySelector<HTMLButtonElement>(
        '.ant-pagination-next button',
      )!;
    const previous = () =>
      html.container.querySelector<HTMLButtonElement>(
        '.ant-pagination-prev button',
      )!;

    fireEvent.click(next().closest('li')!);
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request.mock.calls[1][0]).toMatchObject({
      pageSize: 1,
      nextToken: 'page-1',
    });

    fireEvent.click(next().closest('li')!);
    await waitFor(() => expect(request).toHaveBeenCalledTimes(3));
    expect(request.mock.calls[2][0]).toMatchObject({
      pageSize: 1,
      nextToken: 'page-2',
    });
    await waitFor(() => expect(next()).toBeDisabled());

    fireEvent.click(previous().closest('li')!);
    await waitFor(() => expect(request).toHaveBeenCalledTimes(4));
    expect(request.mock.calls[3][0]).toMatchObject({
      pageSize: 1,
      nextToken: 'page-1',
    });

    html.rerender(<ProTable {...props} params={{ filter: 'active' }} />);
    await waitFor(() => expect(request).toHaveBeenCalledTimes(5));
    expect(request.mock.calls[4][0]).toMatchObject({
      filter: 'active',
      pageSize: 1,
    });
    expect(request.mock.calls[4][0]).not.toHaveProperty('nextToken');
  });
});
