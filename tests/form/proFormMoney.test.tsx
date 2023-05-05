import ProForm, { ProFormMoney } from '@ant-design/pro-form';
import { ConfigProvider } from 'antd';
import enGBIntl from 'antd/lib/locale/en_GB';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

describe('💵 ProFormMoney', () => {
  it('💵 ProFormMoney value expect number', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} />
      </ProForm>,
    );

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '￥ 44.33',
    );

    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    expect(container).toMatchSnapshot();
  });

  it('💵 moneySymbol with global locale', async () => {
    const fn = jest.fn();
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

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '£ 44.33',
    );

    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    expect(container).toMatchSnapshot();
  });

  it('💵 moneySymbol with custom locale', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} locale="en-US" />
      </ProForm>,
    );

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '$ 44.33',
    );

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    expect(container).toMatchSnapshot();
  });
  it('💵 moneySymbol with custom symbol', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} customSymbol="💰" />
      </ProForm>,
    );

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '💰 44.33',
    );
    act(() => {
      fireEvent.click(container.querySelector('button.ant-btn-primary')!);
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(44.33);
    });
    expect(container).toMatchSnapshot();
  });
  it('💵 can not input negative', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" min={0} />
      </ProForm>,
    );

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '',
    );

    await fireEvent.change(container.querySelector('input#amount')!, {
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
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" />
      </ProForm>,
    );

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '',
    );

    await fireEvent.change(container.querySelector('input#amount')!, {
      target: {
        value: '-55.33',
      },
    });

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '￥ -55.33',
    );

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(-55.33);
    });
    expect(container).toMatchSnapshot();
  });

  it('💵 update money precision when init', async () => {
    const fn = jest.fn();
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

    expect(container.querySelectorAll('input#amount')[0]).toHaveAttribute(
      'value',
      '💰 444,444,444.33',
    );

    fireEvent.click(container.querySelector('button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(444444444.333333333);
    });
    expect(container).toMatchSnapshot();
  });
});
