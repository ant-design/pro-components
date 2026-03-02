import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
/// <reference types="@vitest/browser/context" />
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getFetchData } from './demo';

afterEach(() => {
  cleanup();
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

    // 等待初始数据加载和排序器渲染
    await waitFor(
      () => {
        expect(
          container.querySelector('.ant-table-tbody tr'),
        ).toBeInTheDocument();
        expect(
          container.querySelectorAll('span.ant-table-column-sorter-down'),
        ).toHaveLength(2);
        expect(
          container.querySelectorAll('span.ant-table-column-sorter-up'),
        ).toHaveLength(2);
      },
      { timeout: 15000 },
    );

    // 点击排序器并等待状态变化
    const sorterDown = container.querySelectorAll(
      'span.ant-table-column-sorter-down',
    );
    const sorterUp = container.querySelectorAll(
      'span.ant-table-column-sorter-up',
    );

    expect(sorterDown).toHaveLength(2);
    expect(sorterUp).toHaveLength(2);

    await userEvent.click(sorterDown[0]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(1);
      },
      { timeout: 5000 },
    );

    await userEvent.click(sorterUp[0]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(2);
      },
      { timeout: 5000 },
    );

    await userEvent.click(sorterDown[0]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(3);
      },
      { timeout: 5000 },
    );

    await userEvent.click(sorterDown[1]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(4);
      },
      { timeout: 5000 },
    );

    expect(fn).toHaveBeenCalledTimes(4);
  }, 30000);

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

    // 等待初始数据加载和排序器渲染
    await waitFor(
      () => {
        expect(
          container.querySelector('.ant-table-tbody tr'),
        ).toBeInTheDocument();
        expect(
          container.querySelectorAll('span.ant-table-column-sorter-down'),
        ).toHaveLength(2);
        expect(
          container.querySelectorAll('span.ant-table-column-sorter-up'),
        ).toHaveLength(2);
      },
      { timeout: 15000 },
    );

    // 点击排序器并等待状态变化
    const sorterDown = container.querySelectorAll(
      'span.ant-table-column-sorter-down',
    );
    const sorterUp = container.querySelectorAll(
      'span.ant-table-column-sorter-up',
    );

    expect(sorterDown).toHaveLength(2);
    expect(sorterUp).toHaveLength(2);

    await userEvent.click(sorterDown[0]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(1);
      },
      { timeout: 5000 },
    );

    await userEvent.click(sorterUp[0]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(2);
      },
      { timeout: 5000 },
    );

    await userEvent.click(sorterDown[0]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(3);
      },
      { timeout: 5000 },
    );

    await userEvent.click(sorterDown[0]);
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledTimes(4);
      },
      { timeout: 5000 },
    );

    expect(fn).toHaveBeenCalledTimes(4);
  }, 30000);

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

        fn.mockClear(); // 清除初始 request 调用
      },
      { timeout: 10000 },
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

    // 验证 fn 没被调用，因为排序是在本地进行的
    expect(fn).not.toHaveBeenCalled();
  }, 15000);

  it('🎏 should not trigger request when sorting locally with compare object sorter', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable<{ money: number }>
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
            sorter: {
              compare: (a, b) => a.money - b.money,
              multiple: 1,
            },
          },
        ]}
        request={async () => {
          fn();
          return {
            total: 3,
            success: true,
            data: [
              { key: '1', name: '项目 A', money: 100 },
              { key: '2', name: '项目 B', money: 250 },
              { key: '3', name: '项目 C', money: 150 },
            ],
          };
        }}
        rowKey="key"
        pagination={false}
        search={false}
      />,
    );

    await waitFor(() => {
      const rows = container.querySelectorAll('.ant-table-row');
      expect(rows).toHaveLength(3);
      fn.mockClear(); // 清除初始 request 调用
    });

    await userEvent.click(
      container.querySelector('span.ant-table-column-sorter-down')!,
    );

    await waitFor(() => {
      const rows = container.querySelectorAll('.ant-table-row');
      expect(rows[0].firstChild?.textContent).toContain('项目 A');
      expect(rows[1].firstChild?.textContent).toContain('项目 C');
      expect(rows[2].firstChild?.textContent).toContain('项目 B');
    });

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

        fn.mockClear(); // 清除初始 request 调用
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

  it('🎏 should pass string sorter parameters to request function', async () => {
    const fn = vi.fn();
    const TestComponent = () => {
      const actionRef = useRef<ActionType>(undefined);

      return (
        <ProTable
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
              sorter: 'amount',
              defaultSortOrder: 'descend',
            },
          ]}
          request={async (_, sort) => {
            fn(sort);

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
                if (sort?.amount) {
                  return sort.amount === 'ascend'
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
          pagination={false}
          search={false}
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

    // 验证 fn 有被调用，且参数正确
    expect(fn).toBeCalledWith({
      amount: 'descend',
    });
  });

  it('🎏 should support controlled sortOrder in columns', async () => {
    const TestComponent = () => {
      const [sortOrder, setSortOrder] = useState<SortOrder | null>('descend');

      return (
        <ProTable
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'money',
              key: 'money',
              dataIndex: 'money',
              sorter: (a, b) => a.money - b.money,
              sortOrder: sortOrder,
            },
          ]}
          dataSource={[
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
          ]}
          rowKey="id"
          toolBarRender={() => [
            <button
              key="sort-descend"
              data-testid="sort-descend"
              onClick={() => setSortOrder('descend')}
            >
              倒序
            </button>,
            <button
              key="sort-ascend"
              data-testid="sort-ascend"
              onClick={() => setSortOrder('ascend')}
            >
              正序
            </button>,
            <button
              key="sort-clear"
              data-testid="sort-clear"
              onClick={() => setSortOrder(null)}
            >
              清空
            </button>,
          ]}
          pagination={false}
          search={false}
        />
      );
    };

    const { container } = render(<TestComponent />);

    await waitFor(() => {
      const rows = container.querySelectorAll('.ant-table-row');
      expect(rows.length).toBeGreaterThan(0);
      expect(rows[0]).toBeDefined();
      const firstCell = rows[0].querySelector('.ant-table-cell');
      expect(firstCell?.textContent).toContain('项目 B');
      const secondCell = rows[1]?.querySelector('.ant-table-cell');
      expect(secondCell?.textContent).toContain('项目 C');
      const thirdCell = rows[2]?.querySelector('.ant-table-cell');
      expect(thirdCell?.textContent).toContain('项目 A');
    });

    await userEvent.click(screen.getByTestId('sort-ascend'));

    await waitFor(() => {
      const rows = container.querySelectorAll('.ant-table-row');
      expect(rows.length).toBeGreaterThan(0);
      expect(rows[0]).toBeDefined();
      const firstCell = rows[0].querySelector('.ant-table-cell');
      expect(firstCell?.textContent).toContain('项目 A');
      const secondCell = rows[1]?.querySelector('.ant-table-cell');
      expect(secondCell?.textContent).toContain('项目 C');
      const thirdCell = rows[2]?.querySelector('.ant-table-cell');
      expect(thirdCell?.textContent).toContain('项目 B');
    });

    await userEvent.click(screen.getByTestId('sort-clear'));

    await waitFor(() => {
      const rows = container.querySelectorAll('.ant-table-row');
      expect(rows[0].firstChild?.textContent).toContain('项目 A');
      expect(rows[1].firstChild?.textContent).toContain('项目 B');
      expect(rows[2].firstChild?.textContent).toContain('项目 C');
    });

    // 验证排序器状态是否正确同步
    const sortTrigger = container.querySelector(
      '.ant-table-column-has-sorters',
    );
    expect(sortTrigger).not.toHaveAttribute('aria-sort');
  });

  describe('Reset action when use request sort', () => {
    it('🎏 should reset to defaultSortOrder with flat columns', async () => {
      const TestComponent = () => {
        const actionRef = useRef<ActionType | undefined>(undefined);

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

    it('🎏 should reset to defaultSortOrder with nested columns', async () => {
      const TestComponent = () => {
        const actionRef = useRef<ActionType | undefined>(undefined);

        return (
          <ProTable<{ money: number; score: number }>
            size="small"
            actionRef={actionRef}
            columns={[
              {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                sorter: true,
                defaultSortOrder: 'descend',
              },
              {
                title: 'nested column',
                children: [
                  {
                    title: 'Money',
                    key: 'money',
                    dataIndex: 'money',
                  },
                  {
                    title: 'Score',
                    key: 'score',
                    dataIndex: 'score',
                    sorter: true,
                    defaultSortOrder: 'descend',
                  },
                ],
              },
            ]}
            request={async (_, sort) => {
              return {
                total: 3,
                success: true,
                data: [
                  {
                    key: '1',
                    name: '項目 A',
                    money: 100,
                    score: 85,
                  },
                  {
                    key: '2',
                    name: '項目 B',
                    money: 250,
                    score: 95,
                  },
                  {
                    key: '3',
                    name: '項目 C',
                    money: 150,
                    score: 75,
                  },
                ].sort((a, b) => {
                  if (sort?.score) {
                    return sort.score === 'ascend'
                      ? a.score - b.score
                      : b.score - a.score;
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

      // 等待初始渲染，確認默認排序（降序，分數高的在前）
      await waitFor(
        () => {
          const rows = container.querySelectorAll('.ant-table-row');
          expect(rows[0].firstChild?.textContent).toContain('項目 B'); // 95分
          expect(rows[1].firstChild?.textContent).toContain('項目 A'); // 85分
          expect(rows[2].firstChild?.textContent).toContain('項目 C'); // 75分
        },
        { timeout: 1000 },
      );

      // 點擊排序按鈕，改為升序
      await userEvent.click(
        container.querySelectorAll('span.ant-table-column-sorter-up')[1], // 第二個排序器（嵌套列中的Score列）
      );

      // 確認升序排列（分數低的在前）
      await waitFor(
        () => {
          const rows = container.querySelectorAll('.ant-table-row');
          expect(rows[0].firstChild?.textContent).toContain('項目 C'); // 75分
          expect(rows[1].firstChild?.textContent).toContain('項目 A'); // 85分
          expect(rows[2].firstChild?.textContent).toContain('項目 B'); // 95分
        },
        { timeout: 1000 },
      );

      // 點擊重置按鈕
      await userEvent.click(screen.getByRole('button', { name: /重置表格/i }));

      // 確認重置後回到默認排序（降序）
      await waitFor(
        () => {
          const rows = container.querySelectorAll('.ant-table-row');
          expect(rows[0].firstChild?.textContent).toContain('項目 B'); // 95分
          expect(rows[1].firstChild?.textContent).toContain('項目 A'); // 85分
          expect(rows[2].firstChild?.textContent).toContain('項目 C'); // 75分
        },
        { timeout: 1000 },
      );
    });
  });

  describe('Multiple column sorting', () => {
    type DataSource = {
      key: string;
      name: string;
      money: number;
      serial: number;
      code: number;
    };
    const TestComponent = ({
      columns,
      dataSource,
      request,
    }: {
      columns: ProColumns<DataSource, 'text'>[];
      dataSource?: DataSource[];
      request?: (
        params: any,
        sort: any,
      ) => Promise<{ total: number; success: boolean; data: DataSource[] }>;
    }) => (
      <ProTable<DataSource, any, 'text'>
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={false}
        search={false}
        request={request}
      />
    );

    it('🎏 should support multiple locale sort in columns', async () => {
      const { container } = render(
        <TestComponent
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'money',
              key: 'money',
              dataIndex: 'money',
              sorter: (a, b) => a.money - b.money,
            },
            {
              title: 'serial',
              dataIndex: 'serial',
              sorter: {
                compare: (a, b) => a.serial - b.serial,
                multiple: 1,
              },
            },
            {
              title: 'code',
              dataIndex: 'code',
              sorter: {
                compare: (a, b) => a.code - b.code,
                multiple: 2,
              },
            },
          ]}
          dataSource={[
            {
              key: '1',
              name: '项目 A',
              money: 100,
              serial: 1,
              code: 5482,
            },
            {
              key: '2',
              name: '项目 B',
              money: 250,
              serial: 2,
              code: 2789,
            },
            {
              key: '3',
              name: '项目 C',
              money: 150,
              serial: 3,
              code: 8832,
            },
          ]}
        />,
      );

      // 等待初始數據渲染
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows).toHaveLength(3);
      });

      const [moneySorter, serialSorter, codeSorter] =
        container.querySelectorAll('th.ant-table-column-has-sorters');

      await userEvent.click(serialSorter);
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 A');
        expect(rows[1].firstChild?.textContent).toContain('项目 B');
        expect(rows[2].firstChild?.textContent).toContain('项目 C');
      });

      await userEvent.click(codeSorter);
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 B');
        expect(rows[1].firstChild?.textContent).toContain('项目 A');
        expect(rows[2].firstChild?.textContent).toContain('项目 C');
      });

      await userEvent.click(moneySorter);
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 A');
        expect(rows[1].firstChild?.textContent).toContain('项目 C');
        expect(rows[2].firstChild?.textContent).toContain('项目 B');
      });
    });

    it('🎏 should support multiple request sort in columns', async () => {
      const fn = vi.fn();
      const { container } = render(
        <TestComponent
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'money',
              key: 'money',
              dataIndex: 'money',
              sorter: true,
            },
            {
              title: 'serial',
              dataIndex: 'serial',
              sorter: { multiple: 2 },
            },
            {
              title: 'code',
              dataIndex: 'code',
              sorter: { multiple: 3 },
            },
          ]}
          request={async (_, sort) => {
            fn(sort);
            return {
              total: 1,
              success: true,
              data: [
                {
                  key: '1',
                  name: '项目 A',
                  money: 100,
                  serial: 1,
                  code: 5482,
                },
              ],
            };
          }}
        />,
      );

      // 等待初始數據渲染
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows).toHaveLength(1);
      });

      // 獲取排序元素
      const [moneySorter, serialSorter, codeSorter] =
        container.querySelectorAll('th.ant-table-column-has-sorters');

      await userEvent.click(moneySorter);
      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith({
          money: 'ascend',
        });
      });

      await userEvent.click(serialSorter);
      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith({
          serial: 'ascend',
        });
      });

      await userEvent.click(codeSorter);
      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith({
          serial: 'ascend',
          code: 'ascend',
        });
      });
    });

    it('🎏 should support single locale sort with multiple request sort in columns', async () => {
      const fn = vi.fn();
      const { container } = render(
        <TestComponent
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'money',
              key: 'money',
              dataIndex: 'money',
              sorter: (a, b) => a.money - b.money,
            },
            {
              title: 'serial',
              dataIndex: 'serial',
              sorter: { multiple: 1 },
            },
            {
              title: 'code',
              dataIndex: 'code',
              sorter: { multiple: 1 },
            },
          ]}
          request={async (_, sort) => {
            fn(sort);
            return {
              total: 3,
              success: true,
              data: [
                {
                  key: '1',
                  name: '项目 A',
                  money: 100,
                  serial: 1,
                  code: 5482,
                },
                {
                  key: '2',
                  name: '项目 B',
                  money: 250,
                  serial: 2,
                  code: 2789,
                },
                {
                  key: '3',
                  name: '项目 C',
                  money: 150,
                  serial: 3,
                  code: 8832,
                },
              ].sort((a, b) => {
                if (sort?.code) {
                  return sort.code === 'ascend'
                    ? a.code - b.code
                    : b.code - a.code;
                }
                if (sort?.serial) {
                  return sort.serial === 'ascend'
                    ? a.serial - b.serial
                    : b.serial - a.serial;
                }
                return 0;
              }),
            };
          }}
        />,
      );

      // 等待初始數據渲染
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows).toHaveLength(3);
      });

      const [moneySorter, serialSorter, codeSorter] =
        container.querySelectorAll('th.ant-table-column-has-sorters');

      await userEvent.click(moneySorter);
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 A');
        expect(rows[1].firstChild?.textContent).toContain('项目 C');
        expect(rows[2].firstChild?.textContent).toContain('项目 B');
      });

      await userEvent.click(serialSorter);
      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith({
          serial: 'ascend',
        });
      });

      await userEvent.click(codeSorter);
      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith({
          serial: 'ascend',
          code: 'ascend',
        });
      });
    });

    it('🎏 should support single request sort with multiple locale sort in columns', async () => {
      const fn = vi.fn();
      const { container } = render(
        <TestComponent
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'money',
              key: 'money',
              dataIndex: 'money',
              sorter: true,
            },
            {
              title: 'serial',
              dataIndex: 'serial',
              sorter: {
                compare: (a, b) => a.serial - b.serial,
                multiple: 2,
              },
            },
            {
              title: 'code',
              dataIndex: 'code',
              sorter: {
                compare: (a, b) => a.code - b.code,
                multiple: 1,
              },
            },
          ]}
          request={async (_, sort) => {
            fn(sort);
            return {
              total: 3,
              success: true,
              data: [
                {
                  key: '1',
                  name: '项目 A',
                  money: 100,
                  serial: 1,
                  code: 5482,
                },
                {
                  key: '2',
                  name: '项目 B',
                  money: 250,
                  serial: 2,
                  code: 2789,
                },
                {
                  key: '3',
                  name: '项目 C',
                  money: 150,
                  serial: 3,
                  code: 8832,
                },
              ].sort((a, b) => {
                if (sort?.money) {
                  return sort.money === 'ascend'
                    ? a.money - b.money
                    : b.money - a.money;
                }
                return 0;
              }),
            };
          }}
        />,
      );

      // 等待初始數據渲染
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows).toHaveLength(3);
      });

      const [moneySorter, serialSorter, codeSorter] =
        container.querySelectorAll('th.ant-table-column-has-sorters');

      await userEvent.click(moneySorter);
      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith({
          money: 'ascend',
        });
      });

      await userEvent.click(codeSorter);
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 B');
        expect(rows[1].firstChild?.textContent).toContain('项目 A');
        expect(rows[2].firstChild?.textContent).toContain('项目 C');
      });

      await userEvent.click(serialSorter);
      await waitFor(() => {
        const rows = container.querySelectorAll('.ant-table-row');
        expect(rows[0].firstChild?.textContent).toContain('项目 A');
        expect(rows[1].firstChild?.textContent).toContain('项目 B');
        expect(rows[2].firstChild?.textContent).toContain('项目 C');
      });
    });
  });
});
