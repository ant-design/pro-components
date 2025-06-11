import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import { useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getFetchData } from './demo';

afterEach(() => {
  cleanup();
});

describe('BasicTable filter', () => {
  it('🎏 should trigger onChange when filtering with string dataIndex', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'money',
          },
          {
            title: '状态',
            dataIndex: 'status',
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        onChange={fn}
        dataSource={[
          {
            status: 0,
            money: '1',
            key: '2',
          },
          {
            money: '2',
            status: 1,
            key: '1',
          },
        ]}
        rowKey="key"
      />,
    );

    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    fireEvent.click(screen.getAllByText('关闭')[1], {
      target: {
        checked: true,
      },
    });
    await userEvent.click(await screen.findByText('确 定'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('🎏 should trigger onChange when filtering with nested dataIndex', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'money',
          },
          {
            title: '状态',
            dataIndex: ['name', 'status'],
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
            defaultFilteredValue: [0, '1'],
          },
        ]}
        onChange={fn}
        dataSource={[
          {
            status: 0,
            money: '1',
            key: '1',
          },
          {
            money: '2',
            status: 1,
            key: '2',
          },
        ]}
        rowKey="key"
      />,
    );

    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    fireEvent.click(screen.getByText('关闭'), {
      target: {
        checked: true,
      },
    });
    await userEvent.click(await screen.findByText('确 定'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('🎏 should filter data locally', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: '上线状态',
            dataIndex: 'onlineStatus',
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '已上线', status: 'online' },
              1: { text: '未上线', status: 'not_online' },
            },
          },
          {
            title: '运行状态',
            dataIndex: 'processStatus',
            filters: [{ text: '异常', value: 1 }],
            onFilter: true,
            valueEnum: {
              0: { text: '运行中', status: 'Processing' },
              1: { text: '异常', status: 'Error' },
            },
            defaultFilteredValue: [1],
          },
        ]}
        request={async () => {
          fn();

          return {
            total: 4,
            success: true,
            data: [
              {
                key: '1',
                onlineStatus: 0,
                processStatus: 1,
                name: '项目 A',
              },
              {
                key: '2',
                onlineStatus: 1,
                processStatus: 1,
                name: '项目 B',
              },
              {
                key: '3',
                onlineStatus: 0,
                processStatus: 0,
                name: '项目 C',
              },
              {
                key: '4',
                onlineStatus: 0,
                processStatus: 1,
                name: '项目 D',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );

    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 B')).toBeInTheDocument();
        expect(screen.queryByText('项目 D')).toBeInTheDocument();
        expect(screen.queryByText('项目 C')).not.toBeInTheDocument();

        fn.mockClear(); // 清除初始 request 調用
      },
      { timeout: 1000 },
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-filter-trigger')[0],
    );
    await userEvent.click(screen.getByRole('menuitem', { name: /已上线/i }));
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 D')).toBeInTheDocument();
        expect(screen.queryByText('项目 B')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    // 验证 fn 沒被调用，因为筛选是在本地进行的
    expect(fn).not.toHaveBeenCalled();
  });

  it('🎏 should filter date request', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: '上线状态',
            dataIndex: 'onlineStatus',
            filters: true,
            valueEnum: {
              0: { text: '已上线', status: 'online' },
              1: { text: '未上线', status: 'not_online' },
            },
          },
        ]}
        request={async (_, sort, filter) => {
          fn();

          const data = [
            {
              key: '1',
              onlineStatus: 0,
              name: '项目 A',
            },
            {
              key: '2',
              onlineStatus: 1,
              name: '项目 B',
            },
            {
              key: '3',
              onlineStatus: 0,
              name: '项目 C',
            },
            {
              key: '4',
              onlineStatus: 1,
              name: '项目 D',
            },
          ].filter((item) => {
            if (filter.onlineStatus == null) return true;
            return filter.onlineStatus.includes(item.onlineStatus.toString());
          });

          return {
            total: data.length,
            success: true,
            data,
          };
        }}
        rowKey="key"
      />,
    );

    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 B')).toBeInTheDocument();
        expect(screen.queryByText('项目 D')).toBeInTheDocument();
        expect(screen.queryByText('项目 C')).toBeInTheDocument();

        fn.mockClear(); // 清除初始 request 調用
      },
      { timeout: 1000 },
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-filter-trigger')[0],
    );
    await userEvent.click(screen.getByRole('menuitem', { name: /已上线/i }));
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 C')).toBeInTheDocument();
        expect(screen.queryByText('项目 D')).not.toBeInTheDocument();
        expect(screen.queryByText('项目 B')).not.toBeInTheDocument();

        // 验证 fn 有被调用，因为筛选是透过服务端进行的
        expect(fn).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 },
    );
  });

  it('🎏 should reset to defaultFilteredValue when use request filter', async () => {
    const TestComponent = () => {
      const actionRef = useRef<ActionType>();

      return (
        <ProTable
          size="small"
          actionRef={actionRef}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: '上线状态',
              dataIndex: 'onlineStatus',
              filters: true,
              valueEnum: {
                0: { text: '已上线', status: 'online' },
                1: { text: '未上线', status: 'not_online' },
              },
            },
            {
              title: '运行状态',
              dataIndex: 'processStatus',
              filters: true,
              valueEnum: {
                0: { text: '运行中', status: 'Processing' },
                1: { text: '异常', status: 'Error' },
              },
              defaultFilteredValue: ['1'],
            },
          ]}
          request={async (_, sort, filter) => {
            const data = [
              {
                key: '1',
                onlineStatus: 0,
                processStatus: 1,
                name: '项目 A',
              },
              {
                key: '2',
                onlineStatus: 1,
                processStatus: 0,
                name: '项目 B',
              },
              {
                key: '3',
                onlineStatus: 0,
                processStatus: 0,
                name: '项目 C',
              },
              {
                key: '4',
                onlineStatus: 1,
                processStatus: 1,
                name: '项目 D',
              },
            ]
              .filter((item) => {
                if (filter.onlineStatus != null) {
                  return filter.onlineStatus.includes(
                    item.onlineStatus.toString(),
                  );
                }
                return true;
              })
              .filter((item) => {
                if (filter.processStatus != null) {
                  return filter.processStatus.includes(
                    item.processStatus.toString(),
                  );
                }
                return true;
              });

            return {
              total: data.length,
              success: true,
              data,
            };
          }}
          rowKey="key"
          toolBarRender={() => [
            <Button
              key="button"
              onClick={() => {
                actionRef.current?.reset?.();
              }}
            >
              重置表格
            </Button>,
          ]}
        />
      );
    };
    const { container } = render(<TestComponent />);

    await userEvent.click(
      container.querySelectorAll('span.ant-table-filter-trigger')[0],
    );
    await userEvent.click(screen.getByRole('menuitem', { name: /已上线/i }));
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-filter-trigger')[1],
    );
    await userEvent.click(screen.getByRole('menuitem', { name: /异常/i }));
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 C')).toBeInTheDocument();
        expect(screen.queryByText('项目 D')).not.toBeInTheDocument();
        expect(screen.queryByText('项目 B')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    await userEvent.click(screen.getByRole('button', { name: /重置表格/i }));

    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 D')).toBeInTheDocument();
        expect(screen.queryByText('项目 B')).not.toBeInTheDocument();
        expect(screen.queryByText('项目 C')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('🎏 should pass filter parameters to request function with nested dataIndex', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: ['name', 'money'],
          },
          {
            title: '状态',
            dataIndex: 'status',
            filters: [{ text: '关闭', value: 0 }],
            onFilter: false,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
            defaultFilteredValue: [0],
          },
        ]}
        request={async (_, sort, filter) => {
          if (filter.status) {
            fn();
          }
          return {
            total: 2,
            success: true,
            data: [
              {
                name: {
                  status: 0,
                  money: '1',
                },
                key: '2',
              },
              {
                name: {
                  money: '2',
                  status: 1,
                },
                key: '1',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );

    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    await userEvent.click(
      container.querySelectorAll(
        '.ant-table-filter-dropdown .ant-dropdown-menu-item',
      )[0],
    );
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    expect(fn).toHaveBeenCalled();
    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    await userEvent.click(
      container.querySelectorAll(
        '.ant-table-filter-dropdown .ant-dropdown-menu-item',
      )[0],
    );
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    expect(fn).toHaveBeenCalled();
  });
});

describe('BasicTable sorter', () => {
  it('🎏 should trigger onChange when using multiple column', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable<{ money: number }>
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: {
              compare: (a, b) => a.money - b.money,
              multiple: 3,
            },
            defaultSortOrder: 'descend',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            sorter: {
              compare: (a, b) => a.money - b.money,
              multiple: 3,
            },
            defaultSortOrder: 'ascend',
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        onChange={fn}
        dataSource={getFetchData(5)}
        rowKey="key"
      />,
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-up')[1],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[1],
    );

    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('🎏 should trigger onChange when sorting with function sorters', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable<{ money: number }>
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => a.money - b.money,
            defaultSortOrder: 'descend',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            sorter: (a, b) => a.money - b.money,
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        onChange={fn}
        dataSource={getFetchData(5)}
        rowKey="key"
      />,
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-up')[1],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[1],
    );

    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('🎏 should sort data locally', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable<{ money: number; count: number }>
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            sorter: (a, b) => a.money - b.money,
            defaultSortOrder: 'descend',
          },
          {
            title: 'count',
            key: 'count',
            dataIndex: 'count',
            sorter: (a, b) => a.count - b.count,
          },
        ]}
        request={async () => {
          fn();

          return {
            total: 3,
            success: true,
            data: [
              {
                key: '1',
                name: '项目 A',
                money: 100,
                count: 50,
              },
              {
                key: '2',
                name: '项目 B',
                money: 250,
                count: 10,
              },
              {
                key: '3',
                name: '项目 C',
                money: 150,
                count: 65,
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );

    await waitFor(
      () => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 B');
        expect(rows[1].firstChild?.textContent).toContain('项目 C');
        expect(rows[2].firstChild?.textContent).toContain('项目 A');

        fn.mockClear(); // 清除初始 request 調用
      },
      { timeout: 1000 },
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );

    const rowsAfterMoneySort = container.querySelectorAll('.ant-table-row');
    expect(rowsAfterMoneySort[0].firstChild?.textContent).toContain('项目 A');
    expect(rowsAfterMoneySort[1].firstChild?.textContent).toContain('项目 B');
    expect(rowsAfterMoneySort[2].firstChild?.textContent).toContain('项目 C');

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[1],
    );

    const rowsAfterCountSort = container.querySelectorAll('.ant-table-row');
    expect(rowsAfterCountSort[0].firstChild?.textContent).toContain('项目 B');
    expect(rowsAfterCountSort[1].firstChild?.textContent).toContain('项目 A');
    expect(rowsAfterCountSort[2].firstChild?.textContent).toContain('项目 C');

    // 验证 fn 沒被调用，因为排序是在本地进行的
    expect(fn).not.toHaveBeenCalled();
  });

  it('🎏 should sort data request', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable<{ money: number; count: number }>
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            sorter: true,
            defaultSortOrder: 'descend',
          },
          {
            title: 'count',
            key: 'count',
            dataIndex: 'count',
            sorter: true,
          },
        ]}
        request={async (_, sort) => {
          fn();

          return {
            total: 3,
            success: true,
            data: [
              {
                key: '1',
                name: '项目 A',
                money: 100,
                count: 50,
              },
              {
                key: '2',
                name: '项目 B',
                money: 250,
                count: 10,
              },
              {
                key: '3',
                name: '项目 C',
                money: 150,
                count: 65,
              },
            ].sort((a, b) => {
              if (sort?.money) {
                return sort.money === 'ascend'
                  ? a.money - b.money
                  : b.money - a.money;
              } else if (sort?.count) {
                return sort.count === 'ascend'
                  ? a.count - b.count
                  : b.count - a.count;
              } else {
                return 0;
              }
            }),
          };
        }}
        rowKey="key"
      />,
    );

    await waitFor(
      () => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 B');
        expect(rows[1].firstChild?.textContent).toContain('项目 C');
        expect(rows[2].firstChild?.textContent).toContain('项目 A');

        fn.mockClear(); // 清除初始 request 調用
      },
      { timeout: 1000 },
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );

    await waitFor(
      () => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 A');
        expect(rows[1].firstChild?.textContent).toContain('项目 B');
        expect(rows[2].firstChild?.textContent).toContain('项目 C');

        // 验证 fn 有被调用，因为排序是透过服务端进行的
        expect(fn).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 },
    );
  });

  it('🎏 should reset to defaultSortOrder when use request sort', async () => {
    const TestComponent = () => {
      const actionRef = useRef<ActionType>();

      return (
        <ProTable<{ money: number }>
          size="small"
          actionRef={actionRef}
          columns={[
            {
              title: 'Name',
              key: 'name',
              dataIndex: 'name',
            },
            {
              title: 'money',
              key: 'money',
              dataIndex: 'money',
              sorter: true,
              defaultSortOrder: 'descend',
            },
          ]}
          request={async (_, sort) => {
            return {
              total: 3,
              success: true,
              data: [
                {
                  key: '1',
                  name: '项目 A',
                  money: 100,
                },
                {
                  key: '2',
                  name: '项目 B',
                  money: 250,
                },
                {
                  key: '3',
                  name: '项目 C',
                  money: 150,
                },
              ].sort((a, b) => {
                if (sort?.money) {
                  return sort.money === 'ascend'
                    ? a.money - b.money
                    : b.money - a.money;
                } else {
                  return 0;
                }
              }),
            };
          }}
          rowKey="key"
          toolBarRender={() => [
            <Button
              key="button"
              onClick={() => {
                actionRef.current?.reset?.();
              }}
            >
              重置表格
            </Button>,
          ]}
        />
      );
    };
    const { container } = render(<TestComponent />);

    await waitFor(
      () => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 B');
        expect(rows[1].firstChild?.textContent).toContain('项目 C');
        expect(rows[2].firstChild?.textContent).toContain('项目 A');
      },
      { timeout: 1000 },
    );

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );

    await waitFor(
      () => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 A');
        expect(rows[1].firstChild?.textContent).toContain('项目 B');
        expect(rows[2].firstChild?.textContent).toContain('项目 C');
      },
      { timeout: 1000 },
    );

    await userEvent.click(screen.getByRole('button', { name: /重置表格/i }));

    await waitFor(
      () => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 B');
        expect(rows[1].firstChild?.textContent).toContain('项目 C');
        expect(rows[2].firstChild?.textContent).toContain('项目 A');
      },
      { timeout: 1000 },
    );
  });
});
