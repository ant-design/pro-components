import { mount, render } from 'enzyme';

import React from 'react';
import BasicLayout, { BasicLayoutProps } from '../src/BasicLayout';

describe('BasicLayout', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: false,
        addListener() {},
        removeListener() {},
      })),
    });
  });
  it('🥩 base use', () => {
    const html = render(<BasicLayout />).html();
    expect(html).toMatchSnapshot();
  });

  it('🥩 do not render menu', () => {
    const wrapper = mount(<BasicLayout menuRender={false} />);
    const menu = wrapper.find('.ant-pro-sider-menu');
    expect(menu.length).toBe(0);
  });

  it('🥩 do not render footer', () => {
    const wrapper = mount(<BasicLayout footerRender={false} />);
    const footer = wrapper.find('footer');
    expect(footer.length).toBe(0);
  });

  it('🥩 use onLogoClick', () => {
    const onLogoClick = jest.fn();
    const wrapper = mount(
      <BasicLayout
        logo={
          <div onClick={onLogoClick} id="test_log">
            Logo
          </div>
        }
      />,
    );
    const logo = wrapper.find('#test_log');
    logo.simulate('click');
    expect(onLogoClick).toHaveBeenCalled();
  });

  it('🥩 render logo', () => {
    const wrapper = mount(<BasicLayout logo={<div id="test_log">Logo</div>} />);
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
  });

  it('🥩 render logo by function', () => {
    const wrapper = mount(
      <BasicLayout logo={() => <div id="test_log">Logo</div>} />,
    );
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
  });

  it('🥩 onCollapse', () => {
    const onCollapse = jest.fn();
    const wrapper = mount(<BasicLayout onCollapse={onCollapse} />);
    wrapper.find('.ant-pro-global-header-trigger').simulate('click');
    expect(onCollapse).toHaveBeenCalled();
  });

  it('🥩 siderWidth default', () => {
    const wrapper = mount(<BasicLayout />);
    expect(wrapper.find('.ant-pro-sider-menu-sider').get(0).props.width).toBe(
      256,
    );
  });

  it('🥩 siderWidth=160', () => {
    const wrapper = mount(<BasicLayout siderWidth={160} />);
    expect(wrapper.find('.ant-pro-sider-menu-sider').get(0).props.width).toBe(
      160,
    );
  });

  it('🥩 do not render collapsed button', () => {
    const wrapper = mount(<BasicLayout collapsedButtonRender={false} />);
    expect(wrapper.find('.ant-pro-global-header-trigger')).toHaveLength(0);
  });

  it('🥩 render customize collapsed button', () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        collapsedButtonRender={collapsed => (
          <span id="customize_collapsed_button">{`${collapsed}`}</span>
        )}
      />,
    );
    const dom = wrapper.find('#customize_collapsed_button');
    expect(dom.text()).toEqual('false');

    wrapper.setProps({
      collapsed: true,
    });

    expect(dom.text()).toEqual('true');
  });
});
