import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Form, Modal } from 'antd';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ModalForm, ProFormText, StepsForm } from '../../src';

/**
 * #9101 StepsForm 的 StepForm 传入 Form.useForm() 实例时，
 * 后续步骤有必填项则无法进入下一步（onCurrentChange 不触发）。
 *
 * 根因：共享 form 实例时，所有步骤的字段注册在同一个 form store 上，
 * form.submit() 会校验整个 store，隐藏步骤的必填 rules 阻塞了当前步提交。
 *
 * 修复：非当前步的 StepForm 通过 FieldContext.skipFieldRules 清空
 * 该步所有字段的 rules，submit 只校验当前步。
 */
describe('#9101 StepsForm with form instance', () => {
  it('各步独立 form 实例时下一步正常', async () => {
    const onCurrentChange = vi.fn();

    const Demo = () => {
      const [form1] = Form.useForm();
      const [form2] = Form.useForm();
      return (
        <StepsForm onCurrentChange={onCurrentChange}>
          <StepsForm.StepForm
            name="base"
            form={form1}
            onFinish={async () => true}
          >
            <ProFormText name="a" label="A" />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="more" form={form2}>
            <ProFormText
              name="b"
              label="B"
              rules={[{ required: true, message: 'required' }]}
            />
          </StepsForm.StepForm>
        </StepsForm>
      );
    };

    render(<Demo />);

    fireEvent.click(await screen.findByText('下一步'));

    await waitFor(
      () => {
        expect(onCurrentChange).toHaveBeenCalledWith(1);
      },
      { timeout: 3000 },
    );
  });

  it('共享同一 form 实例时下一步不被隐藏步骤的必填项阻塞', async () => {
    const onCurrentChange = vi.fn();

    const Demo = () => {
      const [form] = Form.useForm();
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            open
          </button>
          <Modal open={open} onCancel={() => setOpen(false)}>
            <StepsForm onCurrentChange={onCurrentChange}>
              <StepsForm.StepForm name="base" form={form}>
                <ProFormText name="a" label="A" />
              </StepsForm.StepForm>
              <StepsForm.StepForm name="more" form={form}>
                <ProFormText
                  name="b"
                  label="B"
                  rules={[{ required: true, message: 'required' }]}
                />
              </StepsForm.StepForm>
            </StepsForm>
          </Modal>
        </>
      );
    };

    render(<Demo />);

    fireEvent.click(screen.getByText('open'));

    fireEvent.click(
      await screen.findByText('下一步', {}, { timeout: 3000 }),
    );

    await waitFor(
      () => {
        expect(onCurrentChange).toHaveBeenCalledWith(1);
      },
      { timeout: 3000 },
    );
  });

  it('ModalForm 内 StepsForm 传 form 实例时下一步正常', async () => {
    const onCurrentChange = vi.fn();

    const Demo = () => {
      const [form1] = Form.useForm();
      const [form2] = Form.useForm();
      return (
        <ModalForm
          title="test"
          trigger={<button type="button">open</button>}
          submitter={false}
        >
          <StepsForm onCurrentChange={onCurrentChange}>
            <StepsForm.StepForm name="base" form={form1}>
              <ProFormText name="a" label="A" />
            </StepsForm.StepForm>
            <StepsForm.StepForm name="more" form={form2}>
              <ProFormText
                name="b"
                label="B"
                rules={[{ required: true, message: 'required' }]}
              />
            </StepsForm.StepForm>
          </StepsForm>
        </ModalForm>
      );
    };

    render(<Demo />);

    fireEvent.click(screen.getByText('open'));

    fireEvent.click(
      await screen.findByText('下一步', {}, { timeout: 3000 }),
    );

    await waitFor(
      () => {
        expect(onCurrentChange).toHaveBeenCalledWith(1);
      },
      { timeout: 3000 },
    );
  });
});
