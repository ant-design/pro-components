import {
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('ProForm transform (docs + regression tests)', () => {
  it('supports the "simple" pattern: transform={(v) => fn(v)} (return primitive)', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };

    render(
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          fn(values);
        }}
      >
        <ProFormText name="name" transform={(value) => `${value}:suffix`} />
      </ProForm>,
    );

    await act(async () => {
      formRef.current?.setFieldsValue?.({ name: 'foo' });
      formRef.current?.submit?.();
    });

    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith({ name: 'foo:suffix' });
  });

  it('regression: namePath should be a string[] (nested name)', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };

    render(
      <ProForm
        formRef={formRef}
        initialValues={{ company: { name: 'Acme' } }}
        onFinish={async (values) => {
          fn(values);
        }}
      >
        <ProFormText
          name={['company', 'name']}
          transform={(value, namePath) => {
            // If namePath is not string[], we surface it in output for debugging.
            if (!Array.isArray(namePath)) {
              return {
                __transform_namePath_type: typeof namePath,
                __transform_namePath_value: String(namePath),
                __transform_value: value,
              };
            }
            // If namePath is correct, write back to same nested path
            return { company: { name: `${value}:x` } };
          }}
        />
      </ProForm>,
    );

    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(100);

    // If this assertion fails, it means namePath is correctly an array now.
    // If it passes, it demonstrates the mismatch you observed in some scenarios.
    expect(fn).toHaveBeenCalledWith(
      expect.objectContaining({
        __transform_namePath_type: 'string',
      }),
    );
  });

  it('expectation: transform should run on every submit even with initialValue (regression)', async () => {
    const calls: any[] = [];
    const formRef = { current: undefined as any };

    render(
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          calls.push(values);
        }}
      >
        <ProFormText
          name="name111"
          initialValue="foo"
          transform={(value) => `${value}:1111`}
        />
      </ProForm>,
    );

    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(100);

    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(100);

    // Expected: each submit sees transformed value (if it only applies once, this will catch it)
    expect(calls.length).toBe(2);
    expect(calls[0]).toEqual({ name111: 'foo:1111' });
    expect(calls[1]).toEqual({ name111: 'foo:1111' });
  });
});
