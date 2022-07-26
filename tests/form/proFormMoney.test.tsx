import ProForm, { ProFormMoney } from '@ant-design/pro-form';
import { ConfigProvider } from 'antd';
import enGBIntl from 'antd/es/locale/en_GB';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('💵 ProFormMoney', () => {
  it('💵 ProFormMoney value expect number', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ amount: string }>(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);
    expect(String(wrapper.find('input#amount').at(0).props().value).substring(0, 1)).toBe('￥');
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith(44.33);
    expect(wrapper.render()).toMatchSnapshot();
  });
  it('💵 moneySymbol with global locale', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ amount: string }>(
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
    await waitForComponentToPaint(wrapper);
    expect(String(wrapper.find('input#amount').at(0).props().value).substring(0, 1)).toBe('£');
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith(44.33);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('💵 moneySymbol with custom locale', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ amount: string }>(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} locale="en-US" />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);
    expect(String(wrapper.find('input#amount').at(0).props().value).substring(0, 1)).toBe('$');
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith(44.33);
    expect(wrapper.render()).toMatchSnapshot();
  });
  it('💵 moneySymbol with custom symbol', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ amount: string }>(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" initialValue={44.33} customSymbol="💰" />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);
    expect(String(wrapper.find('input#amount').at(0).props().value).substring(0, 2)).toBe('💰');
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith(44.33);
    expect(wrapper.render()).toMatchSnapshot();
  });
  it('💵 can not input negative', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ amount: string }>(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" min={0} />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);
    expect(String(wrapper.find('input#amount').at(0).props().value).substring(0, 1)).toBe('');
    act(() => {
      wrapper.find('input#amount').simulate('change', {
        target: {
          value: '-55.33',
        },
      });
    });
    await waitForComponentToPaint(wrapper, 300);
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 300);
    expect(fn).toHaveBeenCalledWith(undefined);
    expect(wrapper.render()).toMatchSnapshot();
  });
  it('💵 can input negative', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ amount: string }>(
      <ProForm
        onFinish={async (values) => {
          fn(values.amount);
        }}
      >
        <ProFormMoney name="amount" />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);
    expect(String(wrapper.find('input#amount').at(0).props().value).substring(0, 1)).toBe('');
    act(() => {
      wrapper.find('input#amount').simulate('change', {
        target: {
          value: '-55.33',
        },
      });
    });
    await waitForComponentToPaint(wrapper, 300);
    expect(String(wrapper.find('input#amount').at(0).props().value).substring(0, 1)).toBe('￥');
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 300);
    expect(fn).toHaveBeenCalledWith(-55.33);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
