import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProTable } from '../../src';
import type { ActionType, ProColumns } from '../../src';

/**
 * #9062 ProTable search filterType=light + valueType=dateTimeRange：
 * 更改日期后 value 实际变化，但 light 筛选按钮上的显示未更新。
 * 根因：弹层内 RangePicker 仅在 dayValue || open 时渲染，而弹层内
 * FieldLabel 的点击被外层 FilterDropdown label 接管，open 永远为 false，
 * 无初值时编辑器不渲染、无法选值。
 * 修复：LightWrapper 将弹层 open 状态作为 popoverOpen 注入子组件，
 * 弹层展开时编辑器直接可编辑。
 */
describe('#9062 light dateTimeRange 显示更新', () => {
  it('打开弹层后 RangePicker 可编辑（无初值也渲染）', async () => {
    const request = vi.fn().mockResolvedValue({ data: [], success: true });
    const formRef: { current?: any } = {};
    const actionRef: { current?: ActionType } = {};

    const columns: ProColumns[] = [
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
    ];

    const html = render(
      <ProTable
        columns={columns}
        request={request as any}
        search={{ filterType: 'light' }}
        formRef={formRef as any}
        actionRef={actionRef as any}
      />,
    );

    await waitFor(
      () => {
        expect(request).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );

    // light 筛选触发器（外层 FieldLabel）
    const label = await waitFor(() => {
      const el = html.container.querySelector(
        '.ant-pro-core-field-label',
      ) as HTMLElement;
      expect(el).toBeTruthy();
      return el;
    });

    // 初始无日期值
    expect(label.textContent).not.toContain('2026');

    // 打开弹层 → RangePicker 应直接渲染（修复点）
    fireEvent.click(label);
    await waitFor(() => {
      expect(
        document.querySelector('.ant-picker-range'),
      ).toBeTruthy();
    });

    // 关闭弹层，通过 form 设置日期值（模拟用户选择后确认）
    const confirmBtn = [...document.querySelectorAll('button')].find((b) =>
      b.getAttribute('data-type'),
    );
    fireEvent.click(document.body); // 先关闭弹层
    await act(async () => {
      formRef.current?.setFieldsValue({
        createTime: ['2026-01-01 00:00:00', '2026-01-31 23:59:59'],
      });
      await new Promise((r) => setTimeout(r, 100));
    });

    // 值更新后筛选按钮 label 应显示所选日期（#9062 核心：值变了显示跟着变）
    await waitFor(() => {
      expect(label.textContent).toContain('2026');
    });
  });
});
