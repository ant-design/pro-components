import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React, { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { ModalForm, ProFormText } from '../../src';

/**
 * #8834 / #9165 / #8624(同根因家族):
 * ModalForm/DrawerForm 携带 form 实例多次打开,initialValue 必须是本次的值,
 * 不能残留上一次的数据。
 * 场景 A:不传 form(内部管理) + initialValues 每次变化
 * 场景 B:传 form + initialValues 每次变化(用户反馈的场景)
 */
describe('#8834 ModalForm initialValues across opens', () => {
  it('applies initialValues supplied after the first mount', async () => {
    let setValues: (v: { name: string } | undefined) => void;

    const Demo = () => {
      const [values, setValuesState] = useState<{ name: string }>();
      setValues = setValuesState;
      return (
        <ModalForm
          open
          initialValues={values}
          modalProps={{ getContainer: false }}
        >
          <ProFormText name="name" label="Name" />
        </ModalForm>
      );
    };
    const { unmount } = render(<Demo />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setValues({ name: 'late value' });
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(
      (document.querySelector('input[id$="_name"]') as HTMLInputElement)
        .value,
    ).toBe('late value');
    unmount();
  });

  it('uncontrolled form: second open shows new initialValues', async () => {
    let setOpen: (open: boolean) => void;
    let setValues: (v: { name: string }) => void;

    const Demo = () => {
      const [open, setOpenState] = useState(false);
      const [values, setValuesState] = useState({ name: 'first' });
      setOpen = setOpenState;
      setValues = setValuesState;
      return (
        <ModalForm
          open={open}
          onOpenChange={setOpenState}
          key="form-a"
          initialValues={values}
          modalProps={{ getContainer: false }}
        >
          <ProFormText name="name" label="Name" />
        </ModalForm>
      );
    };
    const { unmount } = render(<Demo />);

    // 第一次打开
    await act(async () => {
      setOpen(true);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });
    let input = document.querySelector(
      'input[id$="_name"]',
    ) as HTMLInputElement;
    expect(input.value).toBe('first');

    // 关闭(destroyOnHidden 模拟销毁)
    await act(async () => {
      setOpen(false);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });

    // 改变 initialValues 再开
    await act(async () => {
      setValues({ name: 'second' });
    });
    await act(async () => {
      setOpen(true);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });
    input = document.querySelector('input[id$="_name"]') as HTMLInputElement;
    expect(input.value).toBe('second');
    unmount();
  });

  it('external form instance: second open shows new initialValues (#8834)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Form } = await import('antd');
    let setOpen: (open: boolean) => void;
    let setValues: (v: { name: string }) => void;

    const Demo = () => {
      const [form] = Form.useForm();
      const [open, setOpenState] = useState(false);
      const [values, setValuesState] = useState({ name: 'first' });
      setOpen = setOpenState;
      setValues = setValuesState;
      return (
        <ModalForm
          form={form}
          open={open}
          onOpenChange={setOpenState}
          initialValues={values}
          modalProps={{ getContainer: false, destroyOnHidden: true }}
        >
          <ProFormText name="name" label="Name" />
        </ModalForm>
      );
    };
    const { unmount } = render(<Demo />);

    await act(async () => {
      setOpen(true);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });
    let input = document.querySelector(
      'input[id$="_name"]',
    ) as HTMLInputElement;
    expect(input.value).toBe('first');

    await act(async () => {
      setOpen(false);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });

    await act(async () => {
      setValues({ name: 'second' });
    });
    await act(async () => {
      setOpen(true);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });
    input = document.querySelector('input[id$="_name"]') as HTMLInputElement;
    expect(input.value).toBe('second');
    unmount();
  });
});
