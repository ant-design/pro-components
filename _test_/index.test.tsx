import React from 'react';
import { render, mount } from 'enzyme';
import BasicLayout from '../src/BasicLayout';
import 'jsdom-global/register';

describe('BasicLayout', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: false,
          addListener: function() {},
          removeListener: function() {},
        };
      }),
    });
  });

  it('base user', () => {
    const html = render(<BasicLayout />).html();
    expect(html).toMatchSnapshot();
  });

  it('do not render menu', () => {
    const wrapper = mount(<BasicLayout renderMenu={false} />);
    const menu = wrapper.find('.ant-pro-sider-menu');
    expect(menu.length).toBe(0);
  });

  it('do not render footer', () => {
    const wrapper = mount(<BasicLayout renderFooter={false} />);
    const footer = wrapper.find('footer');
    expect(footer.length).toBe(0);
  });

  it('do not render SettingDrawer', () => {
    const wrapper = mount(<BasicLayout renderSettingDrawer={false} />);
    const settingDrawer = wrapper.find('.ant-pro-setting-drawer');
    expect(settingDrawer.length).toBe(0);
  });

  it('trigger onLogoClick', () => {
    const onLogoClick = jest.fn();
    const wrapper = mount(
      <BasicLayout
        onLogoClick={onLogoClick}
        logo="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />,
    );
    const logo = wrapper.find('#logo').find('a');
    logo.simulate('click');
    expect(onLogoClick).toHaveBeenCalled();
  });

  it('render logo', () => {
    const wrapper = mount(<BasicLayout logo={<div id="test_log">Logo</div>} />);
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
  });
});
