import {
  ProForm,
  ProFormSelect,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(cleanup);

describe('Select and TreeSelect data flow (#9138, #8876, #8869, #6766)', () => {
  it('keeps internal TreeSelect open state when an open callback is provided', async () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <ProForm submitter={false}>
        <ProFormTreeSelect
          name="category"
          fieldProps={{
            onOpenChange,
            treeData: [{ title: '节点 A', value: 'a' }],
          }}
        />
      </ProForm>,
    );
    fireEvent.mouseDown(container.querySelector('.ant-select')!);
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    expect(document.querySelector('.ant-select-dropdown')).toBeTruthy();
  });

  it('renders the latest throttled remote Select result without local filtering', async () => {
    const request = vi.fn(async ({ keyWords }: { keyWords?: string }) =>
      keyWords ? [{ label: `远程:${keyWords}`, value: keyWords }] : [],
    );
    const { container, findByText } = render(
      <ProForm submitter={false}>
        <ProFormSelect
          name="user"
          request={request}
          debounceTime={1}
          fieldProps={{ showSearch: true }}
        />
      </ProForm>,
    );
    const selector = container.querySelector('.ant-select')!;
    fireEvent.mouseDown(selector);
    const input = container.querySelector('.ant-select-input')!;
    fireEvent.change(input, { target: { value: 'alice' } });
    expect(await findByText('远程:alice')).toBeTruthy();
  });
});
