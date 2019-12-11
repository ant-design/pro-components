import { mount, render } from 'enzyme';

import React from 'react';
import SettingDrawer, { SettingDrawerProps } from '../../src/SettingDrawer';
import defaultSettings from './defaultSettings';

describe('settingDrawer.test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'zh-CN'),
      },
    });
  });

  it('base user', () => {
    const html = render(
      <SettingDrawer
        settings={defaultSettings}
        getContainer={false}
        collapse
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('settings = undefined', () => {
    const html = render(
      <SettingDrawer
        settings={undefined as any}
        getContainer={false}
        collapse
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('hideColors = true', () => {
    const html = render(
      <SettingDrawer
        settings={defaultSettings}
        hideColors
        getContainer={false}
        collapse
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('onCollapseChange', () => {
    const onCollapseChange = jest.fn();
    const wrapper = mount(
      <SettingDrawer
        settings={defaultSettings}
        collapse
        getContainer={false}
        onCollapseChange={onCollapseChange}
      />,
    );
    const button = wrapper.find('.ant-pro-setting-drawer-handle');
    button.simulate('click');
    expect(onCollapseChange).toHaveBeenCalled();
  });

  it('collapse', () => {
    const onCollapseChange = jest.fn();
    const wrapper = mount<SettingDrawerProps>(
      <SettingDrawer
        settings={defaultSettings}
        collapse
        getContainer={false}
        onCollapseChange={onCollapseChange}
      />,
    );
    expect(
      wrapper.find('.ant-pro-setting-drawer-handle Icon').props().type,
    ).toBe('close');
    wrapper.setProps({ collapse: false });
    expect(
      wrapper.find('.ant-pro-setting-drawer-handle Icon').props().type,
    ).toBe('setting');
  });
});
