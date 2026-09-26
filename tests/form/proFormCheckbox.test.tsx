import { ProForm, ProFormCheckbox } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProFormCheckbox readonly（#9107）', () => {
  it('📦 readonly 时单个 checkbox 应被禁用', () => {
    const { container } = render(
      <ProForm>
        <ProFormCheckbox name="agree" readonly>
          同意协议
        </ProFormCheckbox>
      </ProForm>,
    );

    const input = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.disabled).toBe(true);
  });

  it('📦 未设置 readonly 时可正常交互', () => {
    const { container } = render(
      <ProForm>
        <ProFormCheckbox name="agree">同意协议</ProFormCheckbox>
      </ProForm>,
    );

    const input = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.disabled).toBe(false);
  });

  it('📦 fieldProps.disabled 依然生效', () => {
    const { container } = render(
      <ProForm>
        <ProFormCheckbox name="agree" fieldProps={{ disabled: true }}>
          同意协议
        </ProFormCheckbox>
      </ProForm>,
    );

    const input = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
