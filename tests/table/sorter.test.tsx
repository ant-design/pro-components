import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
/// <reference types="@vitest/browser/context" />
import {
  cleanup,
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

    // 等待初始数据加载
    await waitFor(
      () => {
        expect(container.querySelector('.ant-table-row')).toBeInTheDocument();
      },
      { timeout: 10000 },
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
  }, 15000);

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
  }, 10000);

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