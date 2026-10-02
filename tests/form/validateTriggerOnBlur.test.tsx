import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProForm, ProFormText, StepsForm } from '../../src';

/** 选择可见的文本输入框(跳过 antd Form 渲染的隐藏 input) */
const selectVisibleInput = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('input')).find(
    (el) =>
      (el.getAttribute('placeholder')?.includes('输入') ||
        !el.getAttribute('placeholder')) &&
      el.style.display !== 'none' &&
      el.type !== 'hidden',
  )!;

/**
 * #8380:ProForm.Item validateTrigger="onBlur" 校验不生效。
 * blur 后应触发 required 校验,无需等待 change。
 */
describe('#8380 validateTrigger onBlur', () => {
  it('ProFormText validates on blur', async () => {
    const onBlur = vi.fn();
    const { container } = render(
      <ProForm>
        <ProFormText
          name="name"
          label="名称"
          validateTrigger="onBlur"
          rules={[{ required: true, message: '必填' }]}
          fieldProps={{ onBlur }}
        />
      </ProForm>,
    );

    const input = selectVisibleInput(container);
    expect(input).toBeTruthy();

    // 聚焦再 blur,应出现错误信息
    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      expect(container.textContent).toContain('必填');
    });
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('StepsForm StepForm validates on blur', async () => {
    const { container } = render(
      <StepsForm>
        <StepsForm.StepForm name="step1">
          <ProFormText
            name="name"
            label="名称"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '步骤必填' }]}
          />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    const input = await waitFor(() => {
      const el = selectVisibleInput(container);
      expect(el).toBeTruthy();
      return el;
    });

    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      expect(container.textContent).toContain('步骤必填');
    });
  });

  it('change should NOT trigger validation when validateTrigger=onBlur', async () => {
    const { container } = render(
      <ProForm>
        <ProFormText
          name="name"
          label="名称"
          initialValue="已有值"
          validateTrigger="onBlur"
          rules={[{ required: true, message: '必填' }]}
        />
      </ProForm>,
    );

    const input = selectVisibleInput(container);
    // 清空输入(模拟 change)不应立即校验
    fireEvent.change(input, { target: { value: '' } });
    await new Promise((r) => setTimeout(r, 100));
    expect(container.textContent).not.toContain('必填');
  });
});
