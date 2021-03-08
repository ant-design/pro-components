import { mount } from 'enzyme';
import React from 'react';
import ProCard from '@ant-design/pro-card';
import { waitForComponentToPaint } from '../util';
import { act } from 'react-dom/test-utils';

describe('Card', () => {
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

  it('🥩 resize breakpoint', async () => {
    // set useBreakpoint with xs true
    Object.defineProperty(global.window, 'matchMedia', {
      value: jest.fn((query) => ({
        matches: query.includes('max-width'), // xs : true
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    const wrapper = mount(
      <ProCard
        style={{ marginTop: 8 }}
        gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32, xxl: 32 }, 16]}
        colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 }}
        title="24栅格"
      >
        Col
      </ProCard>,
    );

    await waitForComponentToPaint(wrapper);

    // write back
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
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
