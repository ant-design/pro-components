import { ProTable } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * #9161: 未点击排序/筛选时，request 的 sorter/filters 参数不应包含
 * `{ dataIndex: null }` 形式的空值。此前 parseServerDefaultColumnConfig
 * 会把 defaultSortOrder/defaultFilteredValue 缺省写成 null。
 */
describe('ProTable server sorter/filter defaults (#9161)', () => {
  it('sorter: true without defaultSortOrder sends empty sort', async () => {
    const requestFn = vi.fn(async () => ({
      data: Array.from({ length: 30 }, (_, i) => ({ key: i, name: `n${i}` })),
      success: true,
      total: 30,
    }));
    const html = render(
      <ProTable
        size="small"
        rowKey="key"
        columns={[{ title: 'Name', dataIndex: 'name', sorter: true }]}
        request={requestFn}
      />,
    );

    await waitFor(() => expect(requestFn).toHaveBeenCalledTimes(1));
    expect(requestFn.mock.calls[0][1]).toEqual({});

    // 重置（会触发新请求）后同样不应出现 { name: null }
    await act(async () => {
      html.getByText('重 置').click();
    });
    await waitFor(() => expect(requestFn).toHaveBeenCalledTimes(2));
    expect(requestFn.mock.calls[1][1]).toEqual({});
  });

  it('filters without defaultFilteredValue sends empty filter', async () => {
    const requestFn = vi.fn(async () => ({
      data: [{ key: 1, name: 'a' }],
      success: true,
    }));
    render(
      <ProTable
        size="small"
        rowKey="key"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filters: [
              { text: 'A', value: 'a' },
              { text: 'B', value: 'b' },
            ],
            onFilter: false,
          },
        ]}
        request={requestFn}
      />,
    );

    await waitFor(() => expect(requestFn).toHaveBeenCalledTimes(1));
    expect(requestFn.mock.calls[0][2]).toEqual({});
  });

  it('defaultSortOrder and defaultFilteredValue are still honored', async () => {
    const requestFn = vi.fn(async () => ({
      data: [{ key: 1, name: 'a' }],
      success: true,
    }));
    render(
      <ProTable
        size="small"
        rowKey="key"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            defaultSortOrder: 'descend',
            filters: [
              { text: 'A', value: 'a' },
              { text: 'B', value: 'b' },
            ],
            onFilter: false,
            defaultFilteredValue: ['a'],
          },
        ]}
        request={requestFn}
      />,
    );

    await waitFor(() => expect(requestFn).toHaveBeenCalledTimes(1));
    expect(requestFn.mock.calls[0][1]).toEqual({ name: 'descend' });
    expect(requestFn.mock.calls[0][2]).toEqual({ name: ['a'] });
  });
});
