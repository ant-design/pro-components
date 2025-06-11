import { ProForm, ProFormText } from '@ant-design/pro-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Input } from 'antd';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProForm.Item', () => {
  it('📦 ProForm support fieldProps.onBlur', async () => {
    const onBlur = vi.fn();
    const { container } = render(
      <ProForm
        initialValues={{
          navTheme: 'dark',
        }}
      >
        <ProFormText
          fieldProps={{
            id: 'navTheme',
            onBlur: (e) => onBlur(e.target.value),
          }}
          name="navTheme"
        />
      </ProForm>,
    );

    fireEvent.focus(container.querySelector('input#navTheme')!);
    fireEvent.blur(container.querySelector('input#navTheme')!);

    expect(onBlur).toHaveBeenCalledWith('dark');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('📦 ProForm.Item supports onChange', async () => {
    const onChange = vi.fn();
    const onValuesChange = vi.fn();
    const { container } = render(
      <ProForm
        initialValues={{
          navTheme: 'dark',
        }}
        onValuesChange={({ name }) => onValuesChange(name)}
      >
        <ProForm.Item name="name">
          <Input onChange={(e) => onChange(e.target.value)} id="name" />
        </ProForm.Item>
      </ProForm>,
    );

    fireEvent.change(container.querySelector('input#name')!, {
      target: {
        value: '1212',
      },
    });

    expect(onChange).toHaveBeenCalledWith('1212');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValuesChange).toHaveBeenCalledWith('1212');
    expect(onValuesChange).toHaveBeenCalledTimes(1);
  });
});
