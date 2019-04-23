import React from 'react';
import { render, mount } from 'enzyme';
import SettingDrawer from '../src/SettingDrawer';
import defaultSettings from './defaultSettings';
import 'jsdom-global/register';

describe('settingDrawer.test', () => {
  it('base user', () => {
    const html = render(
      <SettingDrawer
        settings={defaultSettings}
        getContainer={false}
        collapse={true}
      />,
    ).html();
    expect(html).toMatchSnapshot();
  });

  it('onCollapseChange', () => {
    const onCollapseChange = jest.fn();
    const wrapper = mount(
      <SettingDrawer
        settings={defaultSettings}
        collapse={true}
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
        collapse={true}
        getContainer={false}
        onCollapseChange={onCollapseChange}
      />,
    );
    expect(wrapper.state().collapse).toBe(true);
    wrapper.setProps({ collapse: false });
    expect(wrapper.state().collapse).toBe(false);
  });
});
