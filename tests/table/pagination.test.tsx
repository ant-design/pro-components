import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
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
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={(params) => {
          fn(params.current);
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        pagination={{
          onChange: onChangeFn(),
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toBeCalledWith(1);

    await act(async () => {
      (await html.findByText('2'))?.click();
    });
    await waitForWaitTime(200);

    expect(fn).toBeCalledWith(1);
  });

  it('🎏 pagination pageSize test ', async () => {
    const fn = vi.fn();
    const currentFn = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={(params) => {
          fn(params.pageSize);
          currentFn(params.current);
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        pagination={{
          pageSize: 50,
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toBeCalledWith(50);
    expect(currentFn).toBeCalledWith(1);
    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          request={(params) => {
            fn(params.pageSize);
            currentFn(params.current);
            return request({
              pageSize: 10,
              current: 1,
            });
          }}
          pagination={{
            pageSize: 10,
          }}
          onRequestError={fn}
          rowKey="key"
        />,
      );
    });
    await waitForWaitTime(200);

    expect(fn).toBeCalledWith(10);
  });

  it('🎏 pagination current', async () => {
    const fn = vi.fn();
    const pageSizeFn = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={(params) => {
          fn(params.current);
          pageSizeFn(params.pageSize);
          return request(params);
        }}
        pagination={{
          current: 2,
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toBeCalledWith(2);

    expect(pageSizeFn).toBeCalledWith(20);
    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          request={(params) => {
            fn(params.current);
            pageSizeFn(params.pageSize);
            return request(params);
          }}
          pagination={{
            current: 3,
          }}
          onRequestError={fn}
          rowKey="key"
        />,
      );
    });

    await waitForWaitTime(1200);

    expect(fn).toBeCalledWith(3);
  });

  it('🎏 pagination=false, do not have pageParams', async () => {
    const fn = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={(params) => {
          fn(params.pageSize);
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        pagination={false}
        onRequestError={() => null}
        rowKey="key"
      />,
    );
    await waitForWaitTime(1200);

    expect(fn).toBeCalledWith(undefined);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          request={(params) => {
            fn(params.pageSize);
            return request({
              pageSize: 10,
            });
          }}
          pagination={{
            pageSize: 10,
          }}
          onRequestError={() => null}
          rowKey="key"
        />,
      );
    });
    await waitForWaitTime(200);

    expect(fn).toBeCalledWith(10);
  });

  it('🎏 request call once when data.length more then pageSize', async () => {
    const fn = vi.fn();
    const html = render(
      <ProTable<{
        money: number;
      }>
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        pagination={{
          pageSize: 1,
        }}
        rowKey="key"
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
      />,
    );
    await waitForWaitTime(1200);
    act(() => {
      html.queryByText('1')?.click();
    });
    await waitForWaitTime(200);
    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 pagination was correct in controlled mode && params was in deep comparison', async () => {
    const currentFn = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        params={{}}
        pagination={{
          pageSize: 1,
          onChange: (page) => {
            currentFn(page);
          },
        }}
        rowKey="key"
        request={() => {
          return request({
            pageSize: 1,
            current: 1,
          });
        }}
      />,
    );
    await waitForWaitTime(1200);
    await act(async () => {
      html.queryByText('2')?.click();
    });

    await act(async () => {
      html.rerender(
        <ProTable
          size="small"
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          params={{ name: '111' }}
          pagination={{
            pageSize: 1,
            onChange: (page) => {
              currentFn(page);
            },
          }}
          rowKey="key"
          request={() => {
            return request({
              pageSize: 1,
              current: 1,
            });
          }}
        />,
      );
    });
    await waitForWaitTime(200);
    expect(currentFn).toBeCalledWith(2);
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
        onSelect={fn}
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
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

    expect(fn).toBeCalledWith('copy');
  });
});
