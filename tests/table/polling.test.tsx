import ProTable from '@ant-design/pro-table';
import { act, render, waitFor } from '@testing-library/react';
import useFetchData from '../../packages/table/src/useFetchData';
import { columns } from './demo';

describe('polling', () => {
  it('⏱️ polling should clearTime', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
    const html = render(
      <ProTable
        size="small"
        cardBordered
        search={false}
        pagination={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
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
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalled();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalled();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });

    expect(fn).toBeCalledTimes(2);

    jest.useRealTimers();
  });

  it('⏱️ polling should clearTime when useFetchData', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
    const App = (props: { getData: () => void }) => {
      useFetchData(
        async () => {
          props.getData?.();
          return {
            data: [],
          };
        },
        [],
        {
          pageInfo: {},
          polling: 1500,
          manual: false,
          postData: () => [],
          loading: false,
        },
      );
      return <div />;
    };

    render(
      <App
        getData={() => {
          fn();
        }}
      />,
    );

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });
    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });

    expect(fn).toBeCalledTimes(2);

    jest.useRealTimers();
  });

  it('⏱️ polling min time is 2000', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
    const html = render(
      <ProTable
        size="small"
        cardBordered
        search={false}
        pagination={false}
        columns={columns}
        polling={1000}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            success: true,
          });
        }}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    await act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
    jest.useRealTimers();
  });

  it('⏱️ polling time=3000', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
    const html = render(
      <ProTable
        polling={3000}
        size="small"
        cardBordered
        search={false}
        pagination={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
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
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await act(() => {
      return jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    await act(() => {
      return jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    await act(() => {
      return jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
    jest.useRealTimers();
  });

  it('⏱️ polling support function', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
    const html = render(
      <ProTable
        polling={() => {
          return 2000;
        }}
        size="small"
        cardBordered
        search={false}
        pagination={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
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
      />,
    );

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await act(() => {
      return jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    await act(() => {
      return jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });

    jest.useRealTimers();
  });
});
