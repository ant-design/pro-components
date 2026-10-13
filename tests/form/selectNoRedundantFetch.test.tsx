import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProFormSelect } from '../../src';

/**
 * #8780/#8928:select + request 选中值后,若之前没有输入搜索词,
 * 不应触发一次多余的 request(keyWords 相同、数据已在本地)。
 */
describe('#8780 select request no redundant fetch on select', () => {
  it('selecting a typed remote result does not reset and re-fetch', async () => {
    const request = vi.fn(async (_params?: { keyWords?: string }) => [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ]);

    const onChange = vi.fn();
    const { container } = render(
      <ProFormSelect
        name="x"
        fieldProps={{
          showSearch: true,
          options: undefined,
          onChange,
          onDropdownVisibleChange: () => {},
        }}
        request={request}
      />,
    );

    // 初始挂载请求一次
    await waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1);
    });

    fireEvent.mouseDown(container.querySelector('.ant-select')!);
    const input = container.querySelector(
      'input.ant-select-input',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'A' } });
    await waitFor(() => {
      expect(
        request.mock.calls.some(([params]) => params?.keyWords === 'A'),
      ).toBe(true);
    });
    request.mockClear();

    // 选择远端搜索结果时，只清空可见输入，不重新请求空关键字。
    const option = await waitFor(() => {
      const el = document.querySelector(
        '.ant-select-dropdown [title="A"], .ant-select-item-option',
      ) as HTMLElement;
      expect(el).toBeTruthy();
      return el;
    });
    fireEvent.click(option);

    // 选中后不应有新的 request(无搜索词,数据已加载)
    await new Promise((r) => setTimeout(r, 100));
    expect(request).not.toHaveBeenCalled();

    // 值已正确选中
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
});
