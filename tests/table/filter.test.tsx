import type { ActionType } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';
/// <reference types="@vitest/browser/context" />
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('BasicTable filter', () => {
  it('🎏 should trigger onChange when filtering with string dataIndex', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
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
        size="small"
        onChange={fn}
      />,
    );

    await userEvent.click(container.querySelector('span.ant-table-filter-trigger')!);
    fireEvent.click(screen.getAllByText('关闭')[1], {
      target: {
        checked: true,
      },
    });
    const confirmButtons = await screen.findAllByText('确 定');
    await userEvent.click(confirmButtons[0]);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('🎏 should trigger onChange when filtering with nested dataIndex', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
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
        size="small"
        onChange={fn}
      />,
    );

    await userEvent.click(container.querySelector('span.ant-table-filter-trigger')!);
    fireEvent.click(screen.getByText('关闭'), {
      target: {
        checked: true,
      },
    });
    const confirmButtons = await screen.findAllByText('确 定');
    await userEvent.click(confirmButtons[0]);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('🎏 should filter data locally', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
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
        size="small"
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

    await userEvent.click(container.querySelectorAll('span.ant-table-filter-trigger')[0]);
    await userEvent.click(screen.getByRole('menuitem', { name: /已上线/i }));
    await userEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

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
        size="small"
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

    await userEvent.click(container.querySelectorAll('span.ant-table-filter-trigger')[0]);
    await userEvent.click(screen.getByRole('menuitem', { name: /已上线/i }));
    await userEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

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
      const actionRef = useRef<ActionType>(undefined);

      return (
        <ProTable
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
                  return filter.onlineStatus.includes(item.onlineStatus.toString());
                }
                return true;
              })
              .filter((item) => {
                if (filter.processStatus != null) {
                  return filter.processStatus.includes(item.processStatus.toString());
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
          size="small"
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

    // 等待初始数据加载 - 增加更健壮的等待条件
    await waitFor(
      () => {
        expect(container.querySelector('.ant-table-tbody tr')).toBeInTheDocument();
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
      },
      { timeout: 15000 },
    );

    // 等待表格完全渲染
    await waitFor(
      () => {
        expect(container.querySelectorAll('span.ant-table-filter-trigger')).toHaveLength(2);
      },
      { timeout: 5000 },
    );

    // 点击第一个筛选器（上线状态）
    const filterTriggers = container.querySelectorAll('span.ant-table-filter-trigger');
    expect(filterTriggers).toHaveLength(2);

    await userEvent.click(filterTriggers[0]);

    // 等待下拉菜单出现
    await waitFor(
      () => {
        expect(screen.getByRole('menuitem', { name: /已上线/i })).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    await userEvent.click(screen.getByRole('menuitem', { name: /已上线/i }));

    // 等待确认按钮出现并点击
    const confirmButtons = await screen.findAllByText('确 定');
    fireEvent.click(confirmButtons[0]);

    // 点击第二个筛选器（运行状态）
    await userEvent.click(filterTriggers[1]);

    // 等待下拉菜单出现
    await waitFor(
      () => {
        expect(screen.getByRole('menuitem', { name: /异常/i })).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    await userEvent.click(screen.getByRole('menuitem', { name: /异常/i }));

    // 等待确认按钮出现并点击
    const confirmButtons2 = await screen.findAllByText('确 定');
    fireEvent.click(confirmButtons2[0]);

    // 验证筛选后的结果（已上线 + 异常 = 只有项目 A）
    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 C')).not.toBeInTheDocument();
        expect(screen.queryByText('项目 D')).not.toBeInTheDocument();
        expect(screen.queryByText('项目 B')).not.toBeInTheDocument();
      },
      { timeout: 15000 },
    );

    // 点击重置按钮
    await userEvent.click(screen.getByRole('button', { name: /重置表格/i }));

    // 验证重置后的结果（应该回到默认筛选状态）
    await waitFor(
      () => {
        expect(screen.queryByText('项目 A')).toBeInTheDocument();
        expect(screen.queryByText('项目 D')).toBeInTheDocument();
        expect(screen.queryByText('项目 B')).not.toBeInTheDocument();
        expect(screen.queryByText('项目 C')).not.toBeInTheDocument();
      },
      { timeout: 15000 },
    );
  }, 30000);

  it('🎏 should pass filter parameters to request function with nested dataIndex', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
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
        size="small"
      />,
    );

    // 等待初始数据加载
    await waitFor(
      () => {
        expect(container.querySelector('.ant-table-row')).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    await userEvent.click(container.querySelector('span.ant-table-filter-trigger')!);
    await userEvent.click(container.querySelectorAll('.ant-table-filter-dropdown .ant-dropdown-menu-item')[0]);
    await userEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

    expect(fn).toHaveBeenCalled();
    await userEvent.click(container.querySelector('span.ant-table-filter-trigger')!);
    await userEvent.click(container.querySelectorAll('.ant-table-filter-dropdown .ant-dropdown-menu-item')[0]);
    await userEvent.click(container.querySelector('.ant-table-filter-dropdown-btns .ant-btn-primary')!);

    expect(fn).toHaveBeenCalled();
  }, 15000);

  it('🎏 should support controlled filteredValue in columns', async () => {
    const TestComponent = () => {
      const [filteredValue, setFilteredValue] = useState<string[]>(['0']);

      return (
        <div>
          <button data-testid="filter-closed" onClick={() => setFilteredValue(['0'])}>
            只显示关闭
          </button>
          <button data-testid="filter-running" onClick={() => setFilteredValue(['1'])}>
            只显示运行中
          </button>
          <button data-testid="filter-all" onClick={() => setFilteredValue(['0', '1'])}>
            显示全部
          </button>
          <ProTable
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
              },
              {
                title: '状态',
                dataIndex: 'status',
                filters: [
                  { text: '关闭', value: '0' },
                  { text: '运行中', value: '1' },
                ],
                filteredValue: filteredValue, // 用户直接设置 filteredValue
                onFilter: (value: any, record: any) => {
                  return record.status === value;
                },
              },
            ]}
            dataSource={[
              { id: 1, name: '项目 A', status: '0' },
              { id: 2, name: '项目 B', status: '1' },
              { id: 3, name: '项目 C', status: '0' },
            ]}
            pagination={false}
            rowKey="id"
            search={false}
          />
        </div>
      );
    };

    const { container } = render(<TestComponent />);

    // 初始状态应该只显示状态为 '0' 的项目（项目 A 和项目 C）
    await waitFor(() => {
      expect(screen.queryByText('项目 A')).toBeInTheDocument();
      expect(screen.queryByText('项目 C')).toBeInTheDocument();
      expect(screen.queryByText('项目 B')).not.toBeInTheDocument();
    });

    // 点击显示运行中
    await userEvent.click(screen.getByTestId('filter-running'));

    await waitFor(() => {
      expect(screen.queryByText('项目 B')).toBeInTheDocument();
      expect(screen.queryByText('项目 A')).not.toBeInTheDocument();
      expect(screen.queryByText('项目 C')).not.toBeInTheDocument();
    });

    // 点击显示全部
    await userEvent.click(screen.getByTestId('filter-all'));

    await waitFor(() => {
      expect(screen.queryByText('项目 A')).toBeInTheDocument();
      expect(screen.queryByText('项目 B')).toBeInTheDocument();
      expect(screen.queryByText('项目 C')).toBeInTheDocument();
    });

    // 验证筛选器状态是否正确同步
    const filterTrigger = container.querySelector('.ant-table-filter-trigger');
    expect(filterTrigger).toBeInTheDocument();
  });
});
