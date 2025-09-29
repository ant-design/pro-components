import { cleanup, render, waitFor } from '@testing-library/react';
import { ProTable } from '@xxlabs/pro-components';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { columns } from './demo';

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});

describe('polling', () => {
  it('⏱️ polling should clearTime', async () => {
    const fn = vi.fn();

    const html = render(
      <ProTable
        cardBordered
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
        pagination={false}
        polling={1500}
        request={async (params) => {
          fn(params);
          return Promise.resolve({
            data: [
              {
                key: '1',
                name: 'John Brown',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        search={false}
        size="small"
        toolBarRender={false}
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
    });

    // 推进时间以触发轮询
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('⏱️ polling min time is 2000', async () => {
    const fn = vi.fn();

    const html = render(
      <ProTable
        cardBordered
        columns={columns}
        pagination={false}
        polling={1000}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            success: true,
          });
        }}
        rowKey="key"
        search={false}
        size="small"
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    // 推进时间以触发轮询
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  it('⏱️ polling time=3000', async () => {
    const fn = vi.fn();

    const html = render(
      <ProTable
        cardBordered
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
        pagination={false}
        polling={3000}
        request={async (params) => {
          fn(params);
          return Promise.resolve({
            data: [
              {
                key: '1',
                name: 'John Brown',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        search={false}
        size="small"
        toolBarRender={false}
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    // 推进时间以触发轮询
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  it('⏱️ polling support function', async () => {
    const fn = vi.fn();

    const html = render(
      <ProTable
        cardBordered
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
        pagination={false}
        polling={() => {
          return 2000;
        }}
        request={async (params) => {
          fn(params);
          return Promise.resolve({
            data: [
              {
                key: '1',
                name: 'John Brown',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        search={false}
        size="small"
        toolBarRender={false}
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    // 推进时间以触发轮询
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
