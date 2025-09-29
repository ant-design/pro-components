import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ProForm, ProFormMoney } from '@xxlabs/pro-components';
import { ConfigProvider } from 'antd';
import enGBIntl from 'antd/es/locale/en_GB';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('💵 ProFormMoney', () => {
  const getMoneyInput = (container: HTMLElement) => container.querySelector('input#amount') as HTMLInputElement;

  it('💵 ProFormMoney value expect number', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney initialValue={44.33} name="amount" />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('¥ 44.33');

    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    expect(container).toMatchSnapshot();
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
          <ProFormMoney initialValue={44.33} name="amount" />
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
    expect(container).toMatchSnapshot();
  });

  it('💵 moneySymbol with custom locale', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney initialValue={44.33} locale="en-US" name="amount" />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('$ 44.33');

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    expect(container).toMatchSnapshot();
  });

  it('💵 moneySymbol with custom symbol', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney customSymbol="💰" initialValue={44.33} name="amount" />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('💰 44.33');

    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    expect(container).toMatchSnapshot();
  });

  it('💵 can not input negative', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney min={0} name="amount" />
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
    expect(container).toMatchSnapshot();
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
    expect(container).toMatchSnapshot();
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
          customSymbol="💰"
          fieldProps={{ precision: 2 }}
          initialValue="444444444.333333333"
          name="amount"
        />
      </ProForm>,
    );

    expect(getMoneyInput(container).value).toBe('💰 444,444,444.33');

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      // eslint-disable-next-line no-loss-of-precision
      expect(fn).toHaveBeenCalledWith(444444444.333333333);
    });
    expect(container).toMatchSnapshot();
  });
});
