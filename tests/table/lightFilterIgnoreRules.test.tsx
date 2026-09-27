import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProTable } from '../../src';
import type { ActionType, ProColumns } from '../../src';

/**
 * #9079 ProTable search.filterType='light' 时 formItemProps.rules 误生效：
 * LightFilter 值变更即触发查询，columns 的 rules 校验失败会阻塞查询提交。
 * 修复：filterType='light' 时 FormRender 自动开启 ignoreRules（用户显式配置优先）。
 * 验证点：筛选表单的 form 实例中 rules 已被清空，validateFields 不被阻塞。
 */
describe('#9079 light 筛选模式 rules 不阻塞查询', () => {
  it('filterType=light 时筛选表单 validateFields 不被 required rules 阻塞', async () => {
    const request = vi.fn().mockResolvedValue({ data: [], success: true });
    const formRef: { current?: any } = {};
    const actionRef: { current?: ActionType } = {};

    const columns: ProColumns[] = [
      {
        title: '名称',
        dataIndex: 'name',
        formItemProps: {
          rules: [{ required: true, message: '请输入名称' }],
        },
      },
    ];

    render(
      <ProTable
        columns={columns}
        request={request as any}
        search={{ filterType: 'light' }}
        formRef={formRef as any}
        actionRef={actionRef as any}
      />,
    );

    // 首屏自动查询成功触发
    await waitFor(
      () => {
        expect(request).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );

    // 等待 form 实例就绪
    await waitFor(() => {
      expect(formRef.current).toBeTruthy();
    });

    // rules 被清空：空值下 validateFields 应通过而非被 required 阻塞
    const result = await formRef.current.validateFields().then(
      () => 'passed',
      () => 'rejected',
    );
    expect(result).toBe('passed');
  });
});
