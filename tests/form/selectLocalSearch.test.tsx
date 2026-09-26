import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

const ALL_OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

/** 打开下拉，输入搜索词，返回 body 中的选项（antd@6 下拉挂载在 document.body） */
async function openDropdownAndType(container: HTMLElement, text: string) {
  const selector = container.querySelector('.ant-select');
  expect(selector).toBeTruthy();
  fireEvent.mouseDown(selector!);
  await waitForWaitTime(100);

  const searchInput = container.querySelector<HTMLInputElement>(
    '.ant-select-input',
  );
  expect(searchInput).toBeTruthy();
  fireEvent.change(searchInput!, { target: { value: text } });
  await waitForWaitTime(100);
  return () =>
    document.body.querySelectorAll('.ant-select-item.ant-select-item-option');
}

describe('ProFormSelect 本地搜索（#9682 fetchDataOnSearch）', () => {
  it('📦 默认搜索时会重新触发 request', async () => {
    const request = vi.fn(async () => ALL_OPTIONS);

    const { container } = render(
      <ProForm>
        <ProFormSelect
          name="fruit"
          request={request}
          fieldProps={{ showSearch: true }}
        />
      </ProForm>,
    );

    await openDropdownAndType(container, 'app');

    await waitFor(() => {
      expect(request.mock.calls.length).toBeGreaterThan(1);
    });
  });

  it('📦 fetchDataOnSearch=false：request 只调一次，搜索走本地过滤', async () => {
    const request = vi.fn(async () => ALL_OPTIONS);

    const { container } = render(
      <ProForm>
        <ProFormSelect
          name="fruit"
          request={request}
          fetchDataOnSearch={false}
          fieldProps={{ showSearch: true }}
        />
      </ProForm>,
    );

    await openDropdownAndType(container, 'app');

    // 本地过滤后只剩 Apple
    await waitFor(() => {
      const nodes = document.body.querySelectorAll(
        '.ant-select-item.ant-select-item-option',
      );
      expect(nodes.length).toBe(1);
      expect(nodes[0].textContent).toContain('Apple');
    });
    // request 仍然只调用了一次
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('📦 fieldProps.fetchDataOnSearch 优先于顶层 prop', async () => {
    const request = vi.fn(async () => ALL_OPTIONS);

    const { container } = render(
      <ProForm>
        <ProFormSelect
          name="fruit"
          request={request}
          fetchDataOnSearch={false}
          fieldProps={{ showSearch: true, fetchDataOnSearch: true }}
        />
      </ProForm>,
    );

    await openDropdownAndType(container, 'app');

    await waitFor(() => {
      expect(request.mock.calls.length).toBeGreaterThan(1);
    });
  });
});
