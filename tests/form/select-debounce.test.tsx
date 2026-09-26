import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9118: 列内 select 的 debounceTime（ProTable 搜索/表单共用 ProField 的
 * useFieldFetchData 管线）。锁定行为：连续输入时请求防抖，只在停顿后触发一次。
 */
describe('select debounceTime (#9118)', () => {
  it('debounces request while typing', async () => {
    const requestFn = vi.fn(async ({ keyWords }: any) => {
      return [
        { label: 'test1', value: 'test1' },
        { label: 'test2', value: 'test2' },
      ];
    });

    const { container } = render(
      <ProForm submitter={false}>
        <ProFormSelect
          name="entity"
          label="Entity"
          request={requestFn}
          debounceTime={300}
          fieldProps={{ showSearch: true }}
        />
      </ProForm>,
    );

    await waitForWaitTime(600);
    // 挂载时的初始请求
    const callsAfterMount = requestFn.mock.calls.length;
    expect(callsAfterMount).toBeGreaterThanOrEqual(1);

    // 打开下拉并输入搜索词
    const selector = container.querySelector('.ant-select');
    expect(selector).toBeTruthy();
    fireEvent.mouseDown(selector!);
    await waitForWaitTime(100);

    // antd 6 中搜索输入框是 .ant-select-input
    const searchInput = container.querySelector<HTMLInputElement>(
      '.ant-select-input',
    );
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput!, { target: { value: 't' } });
    fireEvent.change(searchInput!, { target: { value: 'te' } });
    fireEvent.change(searchInput!, { target: { value: 'tes' } });
    await waitForWaitTime(100);

    // 防抖窗口内不应有新的请求
    expect(requestFn.mock.calls.length).toBe(callsAfterMount);

    await waitForWaitTime(400);

    // 防抖结束后只触发一次
    expect(requestFn.mock.calls.length).toBe(callsAfterMount + 1);
  });
});
