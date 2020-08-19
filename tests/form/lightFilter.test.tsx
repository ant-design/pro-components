import { mount } from 'enzyme';
import React from 'react';
import { LightFilter, ProFormText, ProFormDatePicker } from '@ant-design/pro-form';

describe('LightFilter', () => {
  it('basic use', async () => {
    const onValuesChange = jest.fn();
    const wrapper = mount(
      <LightFilter initialValues={{
        name1: 'yutingzhao1991',
      }} onValuesChange={(_, values) => onValuesChange(values)}>
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="地址" secondary />
        <ProFormDatePicker name="name3" label="日期" />
      </LightFilter>,
    );
    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(2);
    expect(wrapper.find('.ant-pro-core-field-label').at(0).text()).toEqual('名称: yutingzhao1991');

    // click open more drowdown
    wrapper.find('.ant-pro-core-field-dropdown-label').at(1).simulate('click');
    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(3);

    // change input in drowdown
    wrapper
      .find('.ant-input')
      .simulate('change', {
        target: {
          value: 'new value',
        },
      });
    wrapper.find('.ant-btn.ant-btn-primary').simulate('click');
    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'yutingzhao1991',
      name2: 'new value',
    });

    // clear input
    wrapper.find('.ant-pro-core-field-label .anticon-close').at(0).simulate('click');
    expect(onValuesChange).toHaveBeenCalledWith({
      name2: 'new value',
    });
    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(3);

    // change outside input
    wrapper.find('.ant-pro-core-field-label').at(0).simulate('click');
    wrapper
      .find('.ant-input')
      .simulate('change', {
        target: {
          value: 'name1 update',
        },
      });
    wrapper.find('.ant-btn.ant-btn-primary').simulate('click');
    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
    });
  });
});
