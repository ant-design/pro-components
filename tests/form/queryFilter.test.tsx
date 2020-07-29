import { mount } from 'enzyme';
import React from 'react';
import {
  QueryFilter,
  ProFormText,
} from '@ant-design/pro-form';
import { waitTime } from '../util';

describe('QueryFilter', () => {

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: false,
        addListener() { },
        removeListener() { },
      })),
    });
  });

  it('basic use', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <QueryFilter onFinish={onFinish} initialValues={{
        a: 'testa',
      }}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>
    );
    wrapper.find('.ant-btn-primary').simulate('submit');
    expect(wrapper.find('.ant-input').length).toEqual(2);
    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({
      a: 'testa',
    });
  });

  it('keep all field value when collapsed', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <QueryFilter defaultColsNumber={1} defaultCollapsed onFinish={onFinish} initialValues={{
        a: 'testa',
        b: 'testb',
      }}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>
    );
    wrapper.find('.ant-btn-primary').simulate('submit');
    await waitTime();
    expect(wrapper.find('.ant-input').length).toEqual(2);
    expect(onFinish).toHaveBeenCalledWith({
      a: 'testa',
      b: 'testb',
    });
  });
});
