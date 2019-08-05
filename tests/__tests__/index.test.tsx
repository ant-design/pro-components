import { mount, render } from 'enzyme';

import React from 'react';
import BasicLayout, { BasicLayoutProps } from '../../src/BasicLayout';

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
    expect(menu.exists()).toBe(false);
  });

  it('🥩 do not render footer', () => {
    const wrapper = mount(<BasicLayout footerRender={false} />);
    const footer = wrapper.find('footer');
    expect(footer.exists()).toBe(false);
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
    const wrapper = mount(
      <BasicLayout collapsed={false} onCollapse={onCollapse} />,
    );
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
    expect(wrapper.find('.ant-pro-global-header-trigger').exists()).toBe(false);
  });

  it('🥩 when renderMenu=false, do not render collapsed button', () => {
    const wrapper = mount(<BasicLayout menuRender={false} />);
    expect(wrapper.find('.ant-pro-global-header-trigger').exists()).toBe(false);
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

  it('🥩 do not render menu header', () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout menuHeaderRender={false} />,
    );
    const dom = wrapper.find('#id');

    expect(dom.exists()).toBe(false);
  });

  it('🥩 customize render menu header', () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        menuHeaderRender={(logo, title) => (
          <div id="customize_menu_header">
            {logo}
            {title}
            <div id="customize_menu_header_text">customize_menu_header</div>
          </div>
        )}
      />,
    );

    const dom = wrapper.find('#customize_menu_header');
    expect(dom.exists()).toBe(true);

    expect(dom.find('#customize_menu_header_text').text()).toEqual(
      'customize_menu_header',
    );
  });
});
