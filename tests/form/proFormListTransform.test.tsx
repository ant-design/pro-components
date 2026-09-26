import {
  ProForm,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('ProFormList transform (#9129/#9238)', () => {
  it('children pattern: transform applies to fields inside ProFormList', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };
    render(
      <ProForm formRef={formRef} onFinish={async (v) => fn(v)}>
        <ProFormList name="items" initialValue={[{ answer: 'A' }]}>
          <ProFormSelect
            name="answer"
            transform={(value) => `${value}:x`}
            fieldProps={{ options: [{ label: 'A', value: 'A' }] }}
          />
        </ProFormList>
      </ProForm>,
    );
    await waitForWaitTime(500);
    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(200);

    expect(fn).toHaveBeenCalledWith({ items: [{ answer: 'A:x' }] });
  });

  it('render-prop pattern: transform applies with name [index, key]', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };
    render(
      <ProForm formRef={formRef} onFinish={async (v) => fn(v)}>
        <ProFormList name="items" initialValue={[{ answer: 'A' }]}>
          {(_, idx) => (
            <ProFormSelect
              name={[idx, 'answer']}
              transform={(value) => `${value}:x`}
              fieldProps={{ options: [{ label: 'A', value: 'A' }] }}
            />
          )}
        </ProFormList>
      </ProForm>,
    );
    await waitForWaitTime(500);
    // 原始值不应被 transform 影响
    expect(formRef.current?.getFieldsValue?.()).toEqual({
      items: [{ answer: 'A' }],
    });
    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(200);

    expect(fn).toHaveBeenCalledWith({ items: [{ answer: 'A:x' }] });
  });

  it('deep nested ProFormList: transform applies two levels down', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };
    render(
      <ProForm formRef={formRef} onFinish={async (v) => fn(v)}>
        <ProFormList name="items" initialValue={[{ groups: [{ name: 'a' }] }]}>
          {(_, idx) => (
            <ProFormList name={[idx, 'groups']} initialValue={[{ name: 'a' }]}>
              <ProFormSelect
                name="name"
                transform={(value) => `${value}:t`}
                fieldProps={{ options: [{ label: 'a', value: 'a' }] }}
              />
            </ProFormList>
          )}
        </ProFormList>
      </ProForm>,
    );
    await waitForWaitTime(500);
    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(200);

    expect(fn).toHaveBeenCalledWith({
      items: [{ groups: [{ name: 'a:t' }] }],
    });
  });
});
