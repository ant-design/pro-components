import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProFormSelect } from '../../src';

/**
 * #8780/#8928:select + request 选中值后,若之前没有输入搜索词,
 * 不应触发一次多余的 request(keyWords 相同、数据已在本地)。
 */
describe('#8780 select request no redundant fetch on select', () => {
  it('selecting without prior search does not re-fetch', async () => {
    const request = vi.fn(async () => [
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
    request.mockClear();

    // 打开下拉并选中一项(未经搜索输入)
    const input = container.querySelector(
      'input.ant-select-input',
    ) as HTMLInputElement;
    fireEvent.mouseDown(container.querySelector('.ant-select')!);
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
