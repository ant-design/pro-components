import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

const submit = async () => {
  fireEvent.click(await screen.findByText('提 交'));
};

/**
 * #9780 omitNil 默认 true 时会在执行 transform 之前把空字符串过滤掉，
 * 用户清空字段后 transform 根本不会被调用（transformCalls 为空），
 * 无法把「清空」转换成 null / 业务标记值。
 */
describe('empty string reaches transform (#9780)', () => {
  it('普通字段清空后 transform 依然会执行', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);
    const transform = vi.fn((value: string) => ({
      normalizedCode: value === '' ? 'EMPTY' : value.toUpperCase(),
    }));

    const { baseElement } = render(
      <ProForm initialValues={{ code: 'seed' }} onFinish={onFinish}>
        <ProFormText
          name="code"
          transform={transform}
          fieldProps={{ id: 'code' }}
        />
      </ProForm>,
    );

    const input = baseElement.querySelector<HTMLInputElement>('input#code')!;
    fireEvent.change(input, { target: { value: '' } });

    await submit();

    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(transform).toHaveBeenCalled();
    expect(transform.mock.calls[0][0]).toBe('');
    expect(onFinish.mock.calls[0][0]).toEqual({ normalizedCode: 'EMPTY' });
  });

  it('ProFormList 子字段清空后 transform 依然会执行', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);
    const transform = vi.fn((value: string) => ({
      normalizedCode: value === '' ? 'EMPTY' : value.toUpperCase(),
    }));

    const { baseElement } = render(
      <ProForm
        initialValues={{ items: [{ code: 'seed' }] }}
        onFinish={onFinish}
      >
        <ProFormList
          name="items"
          creatorButtonProps={false}
          copyIconProps={false}
          deleteIconProps={false}
        >
          <ProFormText
            name="code"
            transform={transform}
            fieldProps={{ id: 'code' }}
          />
        </ProFormList>
      </ProForm>,
    );

    const input = baseElement.querySelector<HTMLInputElement>('input#code')!;
    fireEvent.change(input, { target: { value: '' } });

    await submit();

    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(transform.mock.calls[0][0]).toBe('');
    expect(onFinish.mock.calls[0][0]).toEqual({
      items: [{ normalizedCode: 'EMPTY' }],
    });
  });

  it('没有配置 transform 的空字符串字段依然不会提交', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);

    const { baseElement } = render(
      <ProForm
        initialValues={{ code: 'seed', other: 'seed' }}
        onFinish={onFinish}
      >
        <ProFormText name="code" fieldProps={{ id: 'code' }} />
        <ProFormText name="other" fieldProps={{ id: 'other' }} />
      </ProForm>,
    );

    const input = baseElement.querySelector<HTMLInputElement>('input#other')!;
    fireEvent.change(input, { target: { value: '' } });

    await submit();

    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0][0]).toEqual({ code: 'seed' });
  });

  it('omitNil=false 时空字符串原样提交', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);

    const { baseElement } = render(
      <ProForm
        omitNil={false}
        initialValues={{ code: 'seed' }}
        onFinish={onFinish}
      >
        <ProFormText name="code" fieldProps={{ id: 'code' }} />
      </ProForm>,
    );

    const input = baseElement.querySelector<HTMLInputElement>('input#code')!;
    fireEvent.change(input, { target: { value: '' } });

    await submit();

    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0][0]).toEqual({ code: '' });
  });
});
