import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProTable } from '../../src';
import type { ProColumns } from '../../src';

/**
 * #9616 树形数据 + expandedRowRender 组合时：
 * 1. antd Table 原生不支持（嵌套展开冲突），ProTable 给出明确 dev 警告；
 * 2. expandedRowRender 返回 undefined/null 的行不生成空白占位 tr。
 */
describe('#9616 树表 expandedRowRender 空返回与警告', () => {
  it('树形数据 + expandedRowRender 触发 dev 警告', () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const data = [
      {
        id: 1,
        name: 'root',
        children: [{ id: 11, name: 'child' }],
      },
    ];

    const columns: ProColumns[] = [{ title: 'Name', dataIndex: 'name' }];

    render(
      <ProTable
        columns={columns}
        dataSource={data}
        rowKey="id"
        search={false}
        toolBarRender={false}
        pagination={false}
        expandable={
          {
            expandedRowRender: () => <div>sub</div>,
          } as any
        }
      />,
    );

    const warnCalled =
      warnSpy.mock.calls.some((c) =>
        String(c[0]).includes('expandedRowRender'),
      ) ||
      errorSpy.mock.calls.some((c) =>
        String(c[0]).includes('expandedRowRender'),
      );
    expect(warnCalled).toBe(true);

    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('非树形数据 + expandedRowRender 不触发警告', () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const data = [{ id: 1, name: 'row1' }, { id: 2, name: 'row2' }];

    const columns: ProColumns[] = [{ title: 'Name', dataIndex: 'name' }];

    render(
      <ProTable
        columns={columns}
        dataSource={data}
        rowKey="id"
        search={false}
        toolBarRender={false}
        pagination={false}
        expandable={
          {
            expandedRowRender: () => <div>sub</div>,
          } as any
        }
      />,
    );

    const warnCalled =
      warnSpy.mock.calls.some((c) =>
        String(c[0]).includes('不兼容'),
      ) ||
      errorSpy.mock.calls.some((c) =>
        String(c[0]).includes('不兼容'),
      );
    expect(warnCalled).toBe(false);

    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
