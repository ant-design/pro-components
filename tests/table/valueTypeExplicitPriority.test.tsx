import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProTable } from '../../src';
import type { ProColumns } from '../../src';

const valueEnum = {
  0: { text: '关闭', status: 'Default' },
  1: { text: '运行中', status: 'Processing' },
};

const dataSource = [{ key: '1', name: 'row1', status: 0 }];

/**
 * #9002 显式 valueType: 'text' 配 valueEnum 时不再被渲染成 select
 * 同时保留缺省 valueType（未配置）时 valueEnum → select 的历史推断行为
 */
describe('#9002 valueType 显式优先于 valueEnum 推断', () => {
  it('表格只读：显式 valueType="text" 时按文本渲染', () => {
    const columns: ProColumns[] = [
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'text',
        valueEnum,
      },
    ];
    const { container } = render(
      <ProTable columns={columns} dataSource={dataSource} rowKey="key" />,
    );
    // 显式 text：单元格直接显示枚举 key（0），不渲染 Badge/Select
    expect(container.querySelectorAll('.ant-badge').length).toBe(0);
    const bodyCell = container.querySelector('.ant-table-tbody .ant-table-cell');
    expect(bodyCell?.textContent).toBe('0');
  });

  it('表格只读：未配置 valueType 时 valueEnum 仍推断为 select 渲染', () => {
    const columns: ProColumns[] = [
      {
        title: '状态',
        dataIndex: 'status',
        valueEnum,
      },
    ];
    const { container } = render(
      <ProTable columns={columns} dataSource={dataSource} rowKey="key" />,
    );
    // 缺省 valueType：按枚举 text 渲染 Badge
    expect(container.querySelectorAll('.ant-badge').length).toBeGreaterThan(0);
    expect(
      container.querySelector('.ant-badge-status-text')?.textContent,
    ).toBe('关闭');
  });

  it('搜索表单：未配置 valueType 时 valueEnum 渲染为 Select', () => {
    const columns: ProColumns[] = [
      {
        title: '状态',
        dataIndex: 'status',
        valueEnum,
      },
    ];
    const { container } = render(
      <ProTable columns={columns} dataSource={dataSource} rowKey="key" />,
    );
    // 搜索表单区域应渲染 ant-select
    const searchArea = container.querySelector('.ant-pro-table-search');
    expect(searchArea?.querySelectorAll('.ant-select').length).toBe(1);
  });

  it('搜索表单：显式 valueType="text" 渲染为 Input', () => {
    const columns: ProColumns[] = [
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'text',
        valueEnum,
      },
    ];
    const { container } = render(
      <ProTable columns={columns} dataSource={dataSource} rowKey="key" />,
    );
    const searchArea = container.querySelector('.ant-pro-table-search');
    expect(searchArea?.querySelectorAll('.ant-select').length).toBe(0);
    expect(searchArea?.querySelectorAll('input.ant-input').length).toBe(1);
  });
});
