import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProForm, ProFormDigit, ProFormText } from '../../src';

/**
 * #8044:ProFormDigit 非必填、清空后提交,omitNil 默认 true 会丢字段(设计如此),
 * 但 omitNil={false} 必须完整保留 null 字段 —— 与 antd Form 的 getFieldsValue 行为对齐。
 * 关键链路:conversionMomentValue(值清洗)→ transformKeySubmitValue(键转换),
 * 两处都必须尊重 omitNil=false,不能在后一环节把 null 丢掉。
 */
describe('#8044 ProFormDigit nil submit semantics', () => {
  const selectDigitInput = (container: HTMLElement) =>
    container.querySelector<HTMLInputElement>(
      'input.ant-input-number-input[id$="_price"], input.ant-input-number-input[id="price"]',
    );

  const clearAndSubmit = (container: HTMLElement) => {
    const digitInput = selectDigitInput(container);
    expect(digitInput).toBeTruthy();
    fireEvent.change(digitInput!, { target: { value: '' } });
    fireEvent.blur(digitInput!);

    fireEvent.click(screen.getByText('提 交'));
  };

  it('omitNil=false keeps cleared digit field as null', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);
    const { container } = render(
      <ProForm onFinish={onFinish} omitNil={false}>
        <ProFormText name="title" initialValue="t" />
        <ProFormDigit name="price" initialValue={10} />
      </ProForm>,
    );

    clearAndSubmit(container);

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
    });

    const values = onFinish.mock.calls[0][0];
    // price 字段必须存在且为 null(不是 undefined、不是字段缺失)
    expect(values).toEqual({ title: 't', price: null });
    expect('price' in values).toBe(true);
  });

  it('default omitNil=true drops nil fields by design', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);
    const { container } = render(
      <ProForm onFinish={onFinish}>
        <ProFormText name="title" initialValue="t" />
        <ProFormDigit name="price" initialValue={10} />
      </ProForm>,
    );

    clearAndSubmit(container);

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
    });

    // 默认行为:nil 字段被移除(文档化的 omitNil 语义)
    const values = onFinish.mock.calls[0][0];
    expect(values).toEqual({ title: 't' });
    expect('price' in values).toBe(false);
  });

  it('transform still applies when omitNil=false', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);
    const { container } = render(
      <ProForm onFinish={onFinish} omitNil={false}>
        <ProFormText
          name="title"
          initialValue="t"
          transform={(v) => ({ newTitle: v })}
        />
        <ProFormDigit name="price" initialValue={10} />
      </ProForm>,
    );

    clearAndSubmit(container);

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
    });

    // omitNil=false 时 transform 照常生效
    const values = onFinish.mock.calls[0][0];
    expect(values).toEqual({ newTitle: 't', price: null });
  });

  it('does not retain a consumed nested container when omitNil=false', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);
    render(
      <ProForm onFinish={onFinish} omitNil={false}>
        <ProFormText
          name={['user', 'name']}
          initialValue="Ada"
          transform={(value) => ({ displayName: value })}
        />
      </ProForm>,
    );

    fireEvent.click(screen.getByText('提 交'));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0][0]).toEqual({ displayName: 'Ada' });
  });
});
