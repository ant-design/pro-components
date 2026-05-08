import { ProForm, ProFormMoney } from '@ant-design/pro-components';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { ConfigProvider } from 'antd';
import enGBIntl from 'antd/lib/locale/en_GB';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('💵 ProFormMoney', () => {
  const getMoneyInput = (container: HTMLElement) =>
    container.querySelector('input#amount') as HTMLInputElement;

  it('💵 ProFormMoney value expect number', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('¥ 44.33');

    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    // 提交后 input 值仍保持格式化的 ¥ 44.33
    expect(getMoneyInput(container).value).toBe('¥ 44.33');
  });

  it('💵 moneySymbol with global locale', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ConfigProvider locale={enGBIntl}>
        <ProForm
          onFinish={async (values) => {
            fn(values.amount);
          }}
        >
          <ProFormMoney name="amount" initialValue={44.33} />
        </ProForm>
      </ConfigProvider>,
    );

    expect(getMoneyInput(container).value).toBe('£ 44.33');

    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    // ConfigProvider locale=enGB 时，币种符号保持 £
    expect(getMoneyInput(container).value).toBe('£ 44.33');
  });

  it('💵 moneySymbol with custom locale', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} locale="en-US" />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('$ 44.33');

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    // 自定义 locale=en-US 时，币种符号为 $
    expect(getMoneyInput(container).value).toBe('$ 44.33');
  });

  it('💵 moneySymbol with custom symbol', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} customSymbol="💰" />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('💰 44.33');

    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    // 自定义 customSymbol 应作为前缀展示
    expect(getMoneyInput(container).value).toBe('💰 44.33');
  });

  it('💵 can not input negative', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" min={0} />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('');

    await fireEvent.change(getMoneyInput(container), {
      target: {
        value: '-55.33',
      },
    });
    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(undefined);
    });
    // min=0 时，提交校验应将负数视为非法 → 提交值为 undefined（关键断言）
    // input 显示值由 antd InputNumber 控制，可能仍展示用户输入
    expect(fn).toHaveBeenLastCalledWith(undefined);
  });

  it('💵 can input negative', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('');

    await fireEvent.change(getMoneyInput(container), {
      target: {
        value: '-55.33',
      },
    });

    expect(getMoneyInput(container).value).toBe('¥ -55.33');

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(-55.33);
    });
    // 未设置 min 时允许负数，提交后值仍为 -55.33
    expect(getMoneyInput(container).value).toBe('¥ -55.33');
  });

  it('💵 update money precision when init', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney
          name="amount"
          initialValue={444444444.333333333}
          fieldProps={{ precision: 2 }}
          customSymbol="💰"
        />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('💰 444,444,444.33');

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(444444444.333333333);
    });
    // precision=2 应保留 2 位小数，并使用千分位分隔；提交值为原始未截断的精度
    expect(getMoneyInput(container).value).toBe('💰 444,444,444.33');
  });
});
