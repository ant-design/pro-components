import { act, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { LightFilter, ProFormText, ProTable } from '../../src';
import type { ProColumns, ProTableProps } from '../../src';

/**
 * #9106 ProTable 使用 searchFormRender 自定义查询表单后无法触发查询：
 * 用户替换掉默认 FormRender 的 dom 后，内置的首屏 onInit 查询链路断裂。
 * 期望：searchFormRender 场景下首屏查询仍自动触发（或可手动触发）。
 */
describe('#9106 自定义查询表单触发查询', () => {
  it('searchFormRender 替换默认表单后首屏查询仍触发', async () => {
    const request = vi.fn().mockResolvedValue({ data: [], success: true });

    const columns: ProColumns[] = [
      { title: '名称', dataIndex: 'name' },
    ];

    render(
      <ProTable
        columns={columns}
        request={request as any}
        search={{}}
        searchFormRender={(
          _props: ProTableProps<any, any>,
          _defaultDom: JSX.Element,
        ) => (
          <LightFilter
            onFinish={(values) => {
              // 用户自定义表单的提交行为
              console.log('custom filter submit', values);
            }}
          >
            <ProFormText name="name" label="名称" />
          </LightFilter>
        )}
      />,
    );

    // 首屏自动查询应触发（不被自定义渲染阻断）
    await waitFor(
      () => {
        expect(request).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });

  it('searchFormRender 正常渲染 defaultDom 时首屏查询只触发一次', async () => {
    const request = vi.fn().mockResolvedValue({ data: [], success: true });

    const columns: ProColumns[] = [
      { title: '名称', dataIndex: 'name' },
    ];

    render(
      <ProTable
        columns={columns}
        request={request as any}
        search={{}}
        searchFormRender={(
          _props: ProTableProps<any, any>,
          defaultDom: JSX.Element,
        ) => (
          <div>
            <div>自定义头部</div>
            {defaultDom}
          </div>
        )}
      />,
    );

    await waitFor(
      () => {
        expect(request).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );

    // 等待防抖与 onInit 双链路稳定后请求数应保持 1（无双请求）
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });
    expect(request).toHaveBeenCalledTimes(1);
  });
});
