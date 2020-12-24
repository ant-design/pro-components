import { mount } from 'enzyme';
import React from 'react';
import ProCard from '@ant-design/pro-card';
import { waitForComponentToPaint } from '../util';
import { act } from 'react-dom/test-utils';

describe('Field', () => {
  it('🥩 collapsible onCollapse', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsible defaultCollapsed onCollapse={fn}>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('AntdIcon.ant-pro-card-collapsible-icon').simulate('click');
    });
    expect(fn).toBeCalled();
  });

  it('🥩 collapsible defaultCollapsed', async () => {
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsible defaultCollapsed>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeTruthy();
  });

  it('🥩 collapsible collapsed', async () => {
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsed>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeTruthy();

    wrapper.setProps({
      collapsed: false,
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeFalsy();
  });

  it('🥩 tabs onChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProCard
        tabs={{
          onChange: fn,
        }}
      >
        <ProCard.TabPane key="tab1" tab="产品一">
          内容一
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="产品二">
          内容二
        </ProCard.TabPane>
      </ProCard>,
    );
    act(() => {
      wrapper.find('.ant-pro-card-tabs .ant-tabs-tab').at(1).simulate('click');
    });
    expect(fn).toHaveBeenCalledWith('tab2');
  });
});
