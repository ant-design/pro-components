import { mount, render } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
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

  it('onLayout Change', async () => {
    const onSettingChange = jest.fn();
    const wrapper = mount(
      <SettingDrawer
        settings={defaultSettings}
        collapse
        getContainer={false}
        onSettingChange={(setting) => onSettingChange(setting.layout)}
      />,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      const button = wrapper.find('div.ant-pro-setting-drawer-block-checkbox-layout-item').at(2);
      button.simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onSettingChange).toBeCalledWith('mix');

    act(() => {
      const button = wrapper.find('div.ant-pro-setting-drawer-block-checkbox-layout-item').at(1);
      button.simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onSettingChange).toBeCalledWith('top');
  });

  it('theme Change', async () => {
    const onSettingChange = jest.fn();
    const wrapper = mount(
      <SettingDrawer
        settings={defaultSettings}
        collapse
        getContainer={false}
        onSettingChange={(setting) => onSettingChange(setting.navTheme)}
      />,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      const button = wrapper.find('div.ant-pro-setting-drawer-block-checkbox-theme-item').at(0);
      button.simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onSettingChange).toBeCalledWith('light');

    act(() => {
      const button = wrapper.find('div.ant-pro-setting-drawer-block-checkbox-theme-item').at(1);
      button.simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onSettingChange).toBeCalledWith('dark');
  });

  it('theme color Change', async () => {
    const onSettingChange = jest.fn();
    (window as any).umi_plugin_ant_themeVar = [
      { key: 'dark', fileName: 'dark.css', theme: 'dark' },
      { key: 'dust', fileName: 'dust.css', modifyVars: { '@primary-color': '#F5222D' } },
      { key: 'volcano', fileName: 'volcano.css', modifyVars: { '@primary-color': '#FA541C' } },
      { key: 'sunset', fileName: 'sunset.css', modifyVars: { '@primary-color': '#FAAD14' } },
      { key: 'cyan', fileName: 'cyan.css', modifyVars: { '@primary-color': '#13C2C2' } },
      { key: 'green', fileName: 'green.css', modifyVars: { '@primary-color': '#52C41A' } },
      { key: 'geekblue', fileName: 'geekblue.css', modifyVars: { '@primary-color': '#2F54EB' } },
      { key: 'purple', fileName: 'purple.css', modifyVars: { '@primary-color': '#722ED1' } },
      {
        key: 'dust',
        theme: 'dark',
        fileName: 'dark-dust.css',
        modifyVars: { '@primary-color': '#F5222D' },
      },
      {
        key: 'volcano',
        theme: 'dark',
        fileName: 'dark-volcano.css',
        modifyVars: { '@primary-color': '#FA541C' },
      },
      {
        key: 'sunset',
        theme: 'dark',
        fileName: 'dark-sunset.css',
        modifyVars: { '@primary-color': '#FAAD14' },
      },
      {
        key: 'cyan',
        theme: 'dark',
        fileName: 'dark-cyan.css',
        modifyVars: { '@primary-color': '#13C2C2' },
      },
      {
        key: 'green',
        theme: 'dark',
        fileName: 'dark-green.css',
        modifyVars: { '@primary-color': '#52C41A' },
      },
      {
        key: 'geekblue',
        theme: 'dark',
        fileName: 'dark-geekblue.css',
        modifyVars: { '@primary-color': '#2F54EB' },
      },
      {
        key: 'purple',
        theme: 'dark',
        fileName: 'dark-purple.css',
        modifyVars: { '@primary-color': '#722ED1' },
      },
    ];
    const wrapper = mount(
      <SettingDrawer
        settings={defaultSettings}
        collapse
        getContainer={false}
        onSettingChange={(setting) => onSettingChange(setting.primaryColor)}
      />,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      const button = wrapper.find('div.theme-color-content div.theme-color-block').at(0);
      button.simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onSettingChange).toBeCalledWith('daybreak');

    act(() => {
      const button = wrapper.find('div.theme-color-content div.theme-color-block').at(1);
      button.simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onSettingChange).toBeCalledWith('dust');
    expect(wrapper.find('div.theme-color-content div.theme-color-block').length).toBe(8);
  });
});
