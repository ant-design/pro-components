import {
  ProForm,
  ProFormCaptcha,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * End-to-end style user journey for plain ProForm:
 * fill multiple fields, hit validation, fix it, and submit with a
 * column transform so the server payload shape is asserted too.
 */
describe('ProForm journey (e2e)', () => {
  it('fill -> fail validation -> fix -> submit with transform', async () => {
    const onFinish = vi.fn(async () => true);
    const { container, getByText } = render(
      <ProForm
        onFinish={onFinish}
        submitter={{ searchConfig: { submitText: '保存' } }}
      >
        <ProFormText
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        />
        <ProFormSelect
          name="city"
          label="City"
          transform={(value) => ({ city: value })}
          request={async () => [
            { label: 'Hangzhou', value: 'hangzhou' },
            { label: 'Shanghai', value: 'shanghai' },
          ]}
        />
        <ProFormTextArea
          name="detail"
          label="Address Detail"
          transform={(value) => ({ detail: value })}
          rules={[{ required: true, message: 'Detail is required' }]}
        />
      </ProForm>,
    );

    // Step 1: submit empty -> both required errors show up
    await act(async () => {
      getByText('保 存').click();
    });
    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('Detail is required')).toBeTruthy();
    });
    expect(onFinish).not.toHaveBeenCalled();

    // Step 2: fill name
    fireEvent.change(container.querySelector<HTMLInputElement>('[id$="_name"]')!, {
      target: { value: 'Alex' },
    });

    // Step 3: pick city from async options
    await act(async () => {
      fireEvent.mouseDown(
        container.querySelector('[id$="_city"]')!.closest('.ant-select')!,
      );
    });
    await waitFor(() => {
      expect(getByText('Hangzhou')).toBeTruthy();
    });
    await act(async () => {
      getByText('Hangzhou').click();
    });

    // Step 4: fill address detail
    fireEvent.change(
      container.querySelector<HTMLTextAreaElement>('[id$="_detail"]')!,
      { target: { value: 'Xihu Road 1' } },
    );

    // Step 5: submit -> server receives values with field transforms applied
    await act(async () => {
      getByText('保 存').click();
    });
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        name: 'Alex',
        city: 'hangzhou',
        detail: 'Xihu Road 1',
      });
    });
  });

  it('captcha flow: counts down and submits phone + captcha', async () => {
    const onFinish = vi.fn(async () => true);
    const onGetCaptcha = vi.fn(async () => {});
    const { container, getByText } = render(
      <ProForm
        onFinish={onFinish}
        submitter={{ searchConfig: { submitText: '登录' } }}
      >
        <ProFormText
          name="phone"
          label="Phone"
          fieldProps={{ id: 'phone-input' }}
        />
        <ProFormCaptcha
          name="captcha"
          label="Captcha"
          phoneName="phone"
          countDown={5}
          onGetCaptcha={onGetCaptcha}
        />
        <ProFormDigit name="age" label="Age" min={1} />
      </ProForm>,
    );

    // Step 1: fill phone, then request a captcha
    fireEvent.change(
      container.querySelector<HTMLInputElement>('#phone-input')!,
      { target: { value: '13800138000' } },
    );
    await act(async () => {
      getByText('获取验证码').click();
    });
    await waitFor(() => {
      expect(onGetCaptcha).toHaveBeenCalledWith('13800138000');
    });

    // Step 2: button switches to countdown state
    await waitFor(() => {
      expect(getByText(/秒后重新获取/)).toBeTruthy();
    });

    // Step 3: fill captcha + age, then submit
    fireEvent.change(
      container.querySelector<HTMLInputElement>('[id$="_captcha"]')!,
      { target: { value: '1234' } },
    );
    fireEvent.change(container.querySelector<HTMLInputElement>('[id$="_age"]')!, {
      target: { value: '18' },
    });
    await act(async () => {
      getByText('登 录').click();
    });
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        phone: '13800138000',
        captcha: '1234',
        age: 18,
      });
    });
  });
});
