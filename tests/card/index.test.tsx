import { mount } from 'enzyme';
import React from 'react';
import ProCard from '@ant-design/pro-card';
import { waitForComponentToPaint } from '../util';

describe('Field', () => {
  it('🥩 collapsible onCollapse', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsible defaultCollapsed onCollapse={fn}>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    wrapper.find('AntdIcon.ant-pro-card-collapsible-icon').simulate('click');
    expect(fn).toBeCalled();
  });

  it('🥩 collapsible defaultCollapsed', async () => {
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsible defaultCollapsed>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-body-collapse').exists()).toBeTruthy();
  });

  it('🥩 collapsible collapsed', async () => {
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsed>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-body-collapse').exists()).toBeTruthy();

    wrapper.setProps({
      collapsed: false,
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-body-collapse').exists()).toBeFalsy();
  });
});
