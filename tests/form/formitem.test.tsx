import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';
import { Input } from 'antd';

describe('ProForm.Item', () => {
  it('📦 ProForm support fieldProps.onBlur', async () => {
    const onBlur = jest.fn();
    const wrapper = mount<{ navTheme: string }>(
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
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('input#navTheme').simulate('focus');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('input#navTheme').simulate('blur');
    });

    expect(onBlur).toBeCalledWith('dark');
    expect(onBlur).toBeCalledTimes(1);
  });

  it('📦 ProForm.Item supports onChange', async () => {
    const onChange = jest.fn();
    const onValuesChange = jest.fn();
    const wrapper = mount<{ navTheme: string }>(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('input#name').simulate('change', {
        target: {
          value: '1212',
        },
      });
    });

    expect(onChange).toBeCalledWith('1212');
    expect(onChange).toBeCalledTimes(1);
    expect(onValuesChange).toBeCalledWith('1212');
    expect(onValuesChange).toBeCalledTimes(1);
  });
});
