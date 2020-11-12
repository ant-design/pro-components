import { mount } from 'enzyme';
import React from 'react';
import { QueryFilter, ProFormText } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { waitTime } from '../util';

describe('QueryFilter', () => {
  it('basic use', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <QueryFilter
        onFinish={onFinish}
        initialValues={{
          a: 'testa',
        }}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>,
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
      <QueryFilter
        defaultColsNumber={1}
        defaultCollapsed
        onFinish={onFinish}
        initialValues={{
          a: 'testa',
          b: 'testb',
        }}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>,
    );
    wrapper.find('.ant-btn-primary').simulate('submit');
    await waitTime();
    expect(wrapper.find('.ant-input').length).toEqual(2);
    expect(wrapper.find('.ant-row.ant-form-item-hidden').length).toEqual(1);
    expect(wrapper.find('.anticon-down').length).toEqual(1);
    expect(onFinish).toHaveBeenCalledWith({
      a: 'testa',
      b: 'testb',
    });
  });

  it('labelWidth', async () => {
    const wrapper = mount(
      <QueryFilter
        labelWidth={70}
        initialValues={{
          a: 'testa',
        }}
      >
        <ProFormText label="a" name="a" />
      </QueryFilter>,
    );
    expect(wrapper.find('.ant-col.ant-form-item-label').prop('style')?.flex).toEqual('0 0 70px');
  });

  it('responsive 512', async () => {
    const wrapper = mount(
      <QueryFilter style={{ width: 512 }} defaultCollapsed>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>,
    );
    expect(wrapper.find('.ant-row.ant-form-item-hidden').length).toEqual(1);
  });

  it('responsive 1064', async () => {
    const wrapper = mount(
      <QueryFilter defaultCollapsed style={{ width: 1064 }}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
      </QueryFilter>,
    );
    expect(wrapper.find('.ant-row.ant-form-item-hidden').length).toEqual(2);
  });

  it('responsive 1064 with vertical', async () => {
    const wrapper = mount(
      <QueryFilter style={{ width: 1064 }} defaultCollapsed layout="vertical">
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
      </QueryFilter>,
    );
    expect(wrapper.find('.ant-row.ant-form-item-hidden').length).toEqual(1);
  });

  it('collapseRender should work', async () => {
    const wrapper = mount(
      <QueryFilter
        style={{ width: 1064 }}
        defaultCollapsed
        layout="vertical"
        collapseRender={(collapsed) => (collapsed ? 'open' : 'close')}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
      </QueryFilter>,
    );
    expect(wrapper.find('a.ant-pro-form-collapse-button').text()).toBe('open');

    act(() => {
      wrapper.setProps({
        collapsed: false,
      });
    });
    await waitTime(100);
    expect(wrapper.find('a.ant-pro-form-collapse-button').text()).toBe('close');
  });
});
