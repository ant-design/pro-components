import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProFormText, StepsForm } from '../../src';

/**
 * #9021:把 StepsForm.StepForm 包一层自定义组件时,
 * 包装组件从外层接收的 children(经 StepFormProvide context 的 itemProps)
 * 会覆盖内部 StepForm 显式传入的 children,自定义渲染逻辑丢失。
 * 期望:写在 <StepsForm.StepForm> 元素上的 props(含 children)优先。
 */
describe('#9021 StepsForm.StepForm wrapped in custom component', () => {
  it('inner StepForm children win over wrapper children leaked via context', async () => {
    const WrappedStep: React.FC<{
      name: string;
      title: string;
      children?: React.ReactNode;
    }> = ({ name, title, children }) => {
      // 自定义渲染逻辑:内部声明的字段 + 透传外层 children
      return (
        <StepsForm.StepForm name={name} title={title} step={99}>
          <ProFormText name="customField" label="自定义字段" />
          {children}
        </StepsForm.StepForm>
      );
    };

    render(
      <StepsForm onFinish={async () => true}>
        <WrappedStep name="step1" title="第一步">
          <ProFormText name="note" label="备注" />
        </WrappedStep>
        <StepsForm.StepForm name="step2" title="第二步">
          <ProFormText name="secondField" label="第二步字段" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    await waitFor(() => {
      // StepForm 内部显式声明的字段必须渲染
      const customInput = document.querySelector(
        'input[id$="customField"]',
      ) as HTMLInputElement | null;
      expect(customInput).toBeTruthy();
      // 包装组件透传的外层 children 也应渲染
      const noteInput = document.querySelector(
        'input[id$="note"]',
      ) as HTMLInputElement | null;
      expect(noteInput).toBeTruthy();
    });

    fireEvent.click(await screen.findByText('下一步'));
    await waitFor(() => {
      expect(document.querySelector('input[id$="secondField"]')).toBeTruthy();
    });
  });
});
