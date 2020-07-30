import { mount, render } from 'enzyme';
import React from 'react';
import { SettingDrawer } from '@ant-design/pro-layout';
import defaultSettings from './defaultSettings';
import { waitForComponentToPaint } from '../util';

describe('settingDrawer.test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'zh-CN'),
      },
    });
  });

  it('base user', () => {
    const html = render(<SettingDrawer settings={defaultSettings} getContainer={false} collapse />);
    expect(html).toMatchSnapshot();
  });

  it('settings = undefined', () => {
    const html = render(
      <SettingDrawer settings={undefined as any} getContainer={false} collapse />,
    );
    expect(html).toMatchSnapshot();
  });

  it('hideColors = true', () => {
    const html = render(
      <SettingDrawer settings={defaultSettings} hideColors getContainer={false} collapse />,
    );
    expect(html).toMatchSnapshot();
  });

  it('hideHintAlert = true', () => {
    const html = render(
      <SettingDrawer settings={defaultSettings} hideHintAlert getContainer={false} collapse />,
    );
    expect(html).toMatchSnapshot();
  });

  it('hideLoading = true', () => {
    const html = render(
      <SettingDrawer settings={defaultSettings} hideLoading getContainer={false} collapse />,
    );
    expect(html).toMatchSnapshot();
  });

  it('hideCopyButton = true', () => {
    const html = render(
      <SettingDrawer settings={defaultSettings} hideCopyButton getContainer={false} collapse />,
    );
    expect(html).toMatchSnapshot();
  });

  it('onCollapseChange', async () => {
    const onCollapseChange = jest.fn();
    const wrapper = mount(
      <SettingDrawer
        settings={defaultSettings}
        collapse
        getContainer={false}
        onCollapseChange={onCollapseChange}
      />,
    );
    await waitForComponentToPaint(wrapper);
    const button = wrapper.find('.ant-pro-setting-drawer-handle');
    button.simulate('click');
    expect(onCollapseChange).toHaveBeenCalled();
  });
});
