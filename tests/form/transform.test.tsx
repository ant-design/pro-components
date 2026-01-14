import {
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { set } from '@rc-component/util';
import { act, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('ProForm transform', () => {
  it('merges object return into the current ProFormList row', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };

    const { container } = render(
      <ProForm
        formRef={formRef}
        initialValues={{
          users: [{ name: 'John Doe' }],
        }}
        onFinish={async (values) => {
          fn(values);
        }}
      >
        <ProFormList name="users">
          <ProFormText
            name="name"
            transform={(value) => (value ? { displayName: value } : undefined)}
          />
        </ProFormList>
      </ProForm>,
    );

    await waitFor(() => expect(formRef.current).toBeTruthy());
    await waitFor(() => {
      const inputs = container.querySelectorAll(
        'input:not([style*="display: none"])',
      );
      expect(inputs.length).toBeGreaterThan(0);
    });

    await act(async () => {
      formRef.current?.submit?.();
    });

    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith({
      users: [{ displayName: 'John Doe' }],
    });
  });

  it('transforms values in multi-level nested ProFormList', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };

    const { container } = render(
      <ProForm
        formRef={formRef}
        initialValues={{
          departments: [
            {
              name: 'Engineering',
              employees: [{ name: 'Alice' }],
            },
          ],
        }}
        onFinish={async (values) => {
          fn(values);
        }}
      >
        <ProFormList name="departments">
          <ProFormText
            name="name"
            transform={(value) => (value ? { deptName: value } : undefined)}
          />
          <ProFormList name="employees">
            <ProFormText
              name="name"
              transform={(value) =>
                value ? { employeeName: value } : undefined
              }
            />
          </ProFormList>
        </ProFormList>
      </ProForm>,
    );

    await waitFor(() => expect(formRef.current).toBeTruthy());
    await waitFor(() => {
      const inputs = container.querySelectorAll(
        'input:not([style*="display: none"])',
      );
      // department.name + employee.name
      expect(inputs.length).toBeGreaterThanOrEqual(2);
    });

    await act(async () => {
      formRef.current?.submit?.();
    });

    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith({
      departments: [
        {
          deptName: 'Engineering',
          employees: [{ employeeName: 'Alice' }],
        },
      ],
    });
  });

  it('can write back to nested paths by returning set({}, namePath, ...)', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };

    render(
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          fn(values);
        }}
      >
        <ProFormText
          name={['company', 'name']}
          transform={(value, namePath) =>
            value ? set({}, namePath, `${value}:x`) : undefined
          }
        />
      </ProForm>,
    );

    await waitFor(() => expect(formRef.current).toBeTruthy());

    await act(async () => {
      formRef.current?.setFieldsValue({
        company: { name: 'Acme Corp' },
      });
      formRef.current?.submit?.();
    });

    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith({
      company: { name: 'Acme Corp:x' },
    });
  });

  it('applies transform on every submit (including field initialValue)', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };

    render(
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          fn(values);
        }}
      >
        <ProFormText
          name="name111"
          initialValue="foo"
          transform={(value) => `${value}:1111`}
        />
      </ProForm>,
    );

    await waitFor(() => expect(formRef.current).toBeTruthy());
    await waitFor(() =>
      expect(formRef.current?.getFieldValue?.('name111')).toBe('foo'),
    );

    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith({ name111: 'foo:1111' });

    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith({ name111: 'foo:1111' });

    await act(async () => {
      formRef.current?.setFieldsValue({ name111: 'bar' });
      formRef.current?.submit?.();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenLastCalledWith({ name111: 'bar:1111' });
  });

  it('supports ProFormList-level transform (use namePath to write back)', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };

    render(
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          fn(values);
        }}
      >
        <ProFormList
          name="users"
          transform={(value, namePath) => {
            const list = Array.isArray(value) ? value : [];
            const next = list.map((item: any) => ({
              ...item,
              name: item?.name ? `${item.name}:list` : item?.name,
            }));
            return set({}, namePath, next);
          }}
        >
          <ProFormText name="name" />
        </ProFormList>
      </ProForm>,
    );

    await waitFor(() => expect(formRef.current).toBeTruthy());

    await act(async () => {
      formRef.current?.setFieldsValue({
        users: [{ name: 'Alice' }],
      });
      formRef.current?.submit?.();
    });

    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith({
      users: [{ name: 'Alice:list' }],
    });
  });
});
