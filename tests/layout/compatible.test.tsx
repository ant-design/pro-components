import { mount } from 'enzyme';

import React from 'react';
import BasicLayout from '@ant-design/pro-layout';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

it('🐲 layout=sidemenu', async () => {
  // @ts-expect-error
  const wrapper = mount(<BasicLayout layout="sidemenu" />);
  await waitForComponentToPaint(wrapper);
  const menu = wrapper.find('.ant-pro-sider-menu');
  expect(menu.exists()).toBe(true);
  act(() => {
    wrapper.unmount();
  });
});

it('🐲 layout=topmenu', async () => {
  // @ts-expect-error
  const wrapper = mount(<BasicLayout layout="topmenu" />);
  await waitForComponentToPaint(wrapper);
  const menu = wrapper.find('.ant-pro-sider-menu');
  expect(menu.exists()).toBe(false);
  act(() => {
    wrapper.unmount();
  });
});
