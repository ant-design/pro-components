import { ProForm, ProFormText } from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('ProForm params change (#9133)', () => {
  it('params cycling back to a previous value still updates the form', async () => {
    const requestFn = vi.fn(
      async (params: any, _props: any): Promise<{ name: string }> => ({
        name: `name-${params.id}`,
      }),
    );

    const App = () => {
      const [id, setId] = useState(0);
      return (
        <div>
          <button id="btn-0" onClick={() => setId(0)}>
            set 0
          </button>
          <button id="btn-1" onClick={() => setId(1)}>
            set 1
          </button>
          <button id="btn-2" onClick={() => setId(2)}>
            set 2
          </button>
          <ProForm
            key="form"
            request={requestFn}
            params={{ id }}
            submitter={false}
          >
            <ProFormText name="name" label="Name" />
          </ProForm>
        </div>
      );
    };

    const { container } = render(<App />);
    await waitForWaitTime(500);

    // 排除 antd Form 的隐藏测量 input
    const inputValue = () =>
      container.querySelector<HTMLInputElement>('input[id$="_name"]')?.value;

    expect(requestFn).toHaveBeenCalledTimes(1);
    expect(inputValue()).toBe('name-0');

    // 0 -> 1
    await act(async () => {
      container.querySelector<HTMLElement>('#btn-1')?.click();
    });
    await waitForWaitTime(500);
    expect(requestFn).toHaveBeenCalledTimes(2);
    expect(inputValue()).toBe('name-1');

    // 1 -> 2
    await act(async () => {
      container.querySelector<HTMLElement>('#btn-2')?.click();
    });
    await waitForWaitTime(500);
    expect(requestFn).toHaveBeenCalledTimes(3);
    expect(inputValue()).toBe('name-2');

    // 2 -> 0 (回到之前的值，表单仍要正确更新 #9133)
    await act(async () => {
      container.querySelector<HTMLElement>('#btn-0')?.click();
    });
    await waitForWaitTime(500);
    expect(inputValue()).toBe('name-0');
  });
});
