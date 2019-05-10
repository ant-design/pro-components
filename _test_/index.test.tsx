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
  ``;
  it('base user', () => {
    const html = render(<BasicLayout />).html();
    expect(html).toMatchSnapshot();
  });

  it('do not render menu', () => {
    const wrapper = mount(<BasicLayout menuRender={false} />);
    const menu = wrapper.find('.ant-pro-sider-menu');
    expect(menu.length).toBe(0);
  });

  it('do not render footer', () => {
    const wrapper = mount(<BasicLayout footerRender={false} />);
    const footer = wrapper.find('footer');
    expect(footer.length).toBe(0);
  });

  it('use onLogoClick', () => {
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

  it('render logo', () => {
    const wrapper = mount(<BasicLayout logo={<div id="test_log">Logo</div>} />);
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
  });

  it('render logo by function', () => {
    const wrapper = mount(
      <BasicLayout logo={() => <div id="test_log">Logo</div>} />,
    );
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
  });

  it('onCollapse', () => {
    const onCollapse = jest.fn();
    const wrapper = mount(<BasicLayout onCollapse={onCollapse} />);
    wrapper.find('.ant-pro-global-header-trigger').simulate('click');
    expect(onCollapse).toHaveBeenCalled();
  });

  it('onCollapse', () => {
    const onCollapse = jest.fn();
    const wrapper = mount(<BasicLayout onCollapse={onCollapse} />);
    wrapper.find('.ant-pro-global-header-trigger').simulate('click');
    expect(onCollapse).toHaveBeenCalled();
  });
});
