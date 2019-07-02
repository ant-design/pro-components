import { mount, render } from 'enzyme';

import React from 'react';
import SettingDrawer from '../../src/SettingDrawer';
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
    ).html();
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
    const wrapper = mount<SettingDrawer>(
      <SettingDrawer
        settings={defaultSettings}
        collapse
        getContainer={false}
        onCollapseChange={onCollapseChange}
      />,
    );
    expect(wrapper.state().collapse).toBe(true);
    wrapper.setProps({ collapse: false });
    expect(wrapper.state().collapse).toBe(false);
  });
});
