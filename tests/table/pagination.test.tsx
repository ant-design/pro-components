import { cleanup, fireEvent, render } from '@testing-library/react';
import { ProTable, TableDropdown } from '@xxlabs/pro-components';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';
import { request } from './demo';

afterEach(() => {
  cleanup();
});

describe('BasicTable pagination', () => {
  it('🎏 pagination current test', async () => {
    const fn = vi.fn();
    const onChangeFn = vi.fn();
    const html = render(
      <ProTable
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        pagination={{
          onChange: onChangeFn(),
        }}
        request={(params) => {
          fn(params.current);
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        rowKey="key"
        size="small"
        onRequestError={fn}
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toHaveBeenCalledWith(1);

    await act(async () => {
      (await html.findByText('2'))?.click();
    });
    await waitForWaitTime(200);

    expect(fn).toHaveBeenCalledWith(1);
  });

  it('🎏 pagination pageSize test ', async () => {
    const fn = vi.fn();
    const currentFn = vi.fn();
    const html = render(
      <ProTable
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        pagination={{
          pageSize: 50,
        }}
        request={(params) => {
          fn(params.pageSize);
          currentFn(params.current);
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        rowKey="key"
        size="small"
        onRequestError={fn}
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toHaveBeenCalledWith(50);
    expect(currentFn).toHaveBeenCalledWith(1);
    act(() => {
      html.rerender(
        <ProTable
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          pagination={{
            pageSize: 10,
          }}
          request={(params) => {
            fn(params.pageSize);
            currentFn(params.current);
            return request({
              pageSize: 10,
              current: 1,
            });
          }}
          rowKey="key"
          size="small"
          onRequestError={fn}
        />,
      );
    });
    await waitForWaitTime(200);

    expect(fn).toHaveBeenCalledWith(10);
  });

  it('🎏 pagination current', async () => {
    const fn = vi.fn();
    const pageSizeFn = vi.fn();
    const html = render(
      <ProTable
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        pagination={{
          current: 2,
        }}
        request={(params) => {
          fn(params.current);
          pageSizeFn(params.pageSize);
          return request(params);
        }}
        rowKey="key"
        size="small"
        onRequestError={fn}
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toHaveBeenCalledWith(2);

    expect(pageSizeFn).toHaveBeenCalledWith(20);
    act(() => {
      html.rerender(
        <ProTable
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          pagination={{
            current: 3,
          }}
          request={(params) => {
            fn(params.current);
            pageSizeFn(params.pageSize);
            return request(params);
          }}
          rowKey="key"
          size="small"
          onRequestError={fn}
        />,
      );
    });

    await waitForWaitTime(1200);

    expect(fn).toHaveBeenCalledWith(3);
  });

  it('🎏 pagination=false, do not have pageParams', async () => {
    const fn = vi.fn();
    const html = render(
      <ProTable
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        pagination={false}
        request={(params) => {
          fn(params.pageSize);
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        rowKey="key"
        size="small"
        onRequestError={() => null}
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toHaveBeenCalledWith(undefined);

    act(() => {
      html.rerender(
        <ProTable
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          pagination={{
            pageSize: 10,
          }}
          request={(params) => {
            fn(params.pageSize);
            return request({
              pageSize: 10,
            });
          }}
          rowKey="key"
          size="small"
          onRequestError={() => null}
        />,
      );
    });
    await waitForWaitTime(200);

    expect(fn).toHaveBeenCalledWith(10);
  });

  it('🎏 request call once when data.length more then pageSize', async () => {
    const fn = vi.fn();
    const html = render(
      <ProTable<{
        money: number;
      }>
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        pagination={{
          pageSize: 1,
        }}
        request={() => {
          fn();
          return new Promise((resolve) => {
            resolve({
              success: true,
              total: 2,
              data: [
                {
                  money: 1,
                },
                {
                  money: 2,
                },
              ],
            });
          });
        }}
        rowKey="key"
        size="small"
      />,
    );
    await waitForWaitTime(1200);
    act(() => {
      html.queryByText('1')?.click();
    });
    await waitForWaitTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('🎏 pagination was correct in controlled mode && params was in deep comparison', async () => {
    const currentFn = vi.fn();
    const html = render(
      <ProTable
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        pagination={{
          pageSize: 1,
          onChange: (page) => {
            currentFn(page);
          },
        }}
        params={{}}
        request={() => {
          return request({
            pageSize: 1,
            current: 1,
          });
        }}
        rowKey="key"
        size="small"
      />,
    );
    await waitForWaitTime(1200);
    await act(async () => {
      html.queryByText('2')?.click();
    });

    await act(async () => {
      html.rerender(
        <ProTable
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          pagination={{
            pageSize: 1,
            onChange: (page) => {
              currentFn(page);
            },
          }}
          params={{ name: '111' }}
          request={() => {
            return request({
              pageSize: 1,
              current: 1,
            });
          }}
          rowKey="key"
          size="small"
        />,
      );
    });
    await waitForWaitTime(200);
    expect(currentFn).toHaveBeenCalledWith(2);
  });
});

afterEach(() => {
  cleanup();
});

describe('TableDropdown', () => {
  it('TableDropdown support onSelect', async () => {
    const fn = vi.fn();
    const html = render(
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
        onSelect={fn}
      />,
    );

    await act(async () => {
      const button = await html.findByRole('img');
      fireEvent.mouseEnter(button);
    });
    await waitForWaitTime(1000);
    await act(async () => {
      const button = await html.findByText('复制');
      button.click();
    });

    expect(fn).toHaveBeenCalledWith('copy');
  });
});
