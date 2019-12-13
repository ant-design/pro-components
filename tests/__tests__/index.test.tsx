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
    const html = render(<BasicLayout />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 support loading', () => {
    const html = render(<BasicLayout loading />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 do not render menu', () => {
    const wrapper = mount(<BasicLayout menuRender={false} />);
    const menu = wrapper.find('.ant-pro-sider-menu');
    expect(menu.exists()).toBe(false);
    expect(
      (
        wrapper.find('section.ant-layout section.ant-layout').props().style ||
        {}
      ).padding,
    ).toBe(undefined);
  });

  it('🥩 support menuDateRender', () => {
    const wrapper = render(
      <BasicLayout
        menuDataRender={() =>
          [
            {
              path: '/home',
              name: '首页',
              icon: 'smile',

              locale: 'menu.home',
              children: [
                {
                  path: '/home/overview',
                  name: '概述',
                  exact: true,
                  locale: 'menu.home.overview',
                },
                {
                  path: '/home/search',
                  name: '搜索',
                  exact: true,
                  locale: 'menu.home.search',
                },
              ],
            },
            {
              path: '/data_hui',
              name: '汇总数据',
              icon: 'smile',

              locale: 'menu.data_hui',
              children: [
                {
                  collapsed: true,
                  menuName: '域&middot;买家维度交易',
                  name: '域&middot;买家维度交易',
                  icon: 'smile',
                  children: [
                    {
                      id: 2,
                      isNavHome: '2',
                      itemId: '191020104',
                      itemName: '_交易_买家_月表',
                      tab: 'adm_rk_cr_tb_trd_byr_ms',
                      tabProj: 'alifin_odps_birisk',
                      name: '_交易_买家_月表',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
                      icon: 'smile',
                    },
                    {
                      id: 3,
                      isNavHome: '3',
                      itemId: '191020104',
                      itemName: '_航旅交易_买家_日表',
                      tab: 'adm_rk_cr_tb_trv_byr_ds',
                      tabProj: 'alifin_odps_birisk',
                      name: '_航旅交易_买家_日表',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                      icon: 'smile',
                    },
                  ],
                },
                {
                  collapsed: true,
                  menuName: '域&middot;买家维度交易2',
                  name: '域&middot;买家维度交易2',
                  icon: 'smile',
                  path: '/',
                  children: [
                    {
                      id: 5,
                      isNavHome: '2',
                      itemId: '191020107',
                      itemName: '_交易_买家_月表',
                      tab: 'adm_rk_cr_tb_trd_byr_ms',
                      tabProj: 'alifin_odps_birisk',
                      name: '_交易_买家_月表',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
                      icon: 'smile',
                    },
                    {
                      id: 6,
                      isNavHome: '3',
                      itemId: '191020108',
                      itemName: '_航旅交易_买家_日表',
                      tab: 'adm_rk_cr_tb_trv_byr_ds',
                      tabProj: 'alifin_odps_birisk',
                      name: '_航旅交易_买家_日表',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                      icon: 'smile',
                    },
                  ],
                },
                {
                  collapsed: true,
                  menuName: '域&middot;买家维度交易2',
                  name: '域&middot;买家维度交易2',
                  icon: 'smile',
                  path: '/',
                  children: [
                    {
                      id: 7,
                      isNavHome: '2',
                      itemId: '191020107',
                      itemName: '_交易_买家_月表2',
                      tab: 'adm_rk_cr_tb_trd_byr_ms',
                      tabProj: 'alifin_odps_birisk',
                      name: '_交易_买家_月表2',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
                      icon: 'smile',
                    },
                    {
                      id: 8,
                      isNavHome: '3',
                      itemId: '191020108',
                      itemName: '_航旅交易_买家_日表3',
                      tab: 'adm_rk_cr_tb_trv_byr_ds',
                      tabProj: 'alifin_odps_birisk',
                      name: '_航旅交易_买家_日表3',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                      icon: 'smile',
                    },
                  ],
                },
              ],
            },
            {
              path: '/data_ming',
              name: '明细数据',
              icon: 'smile',
              locale: 'menu.data_ming',
              children: [],
            },
            {
              path: '/other',
              name: '其他',
              icon: 'smile',
              locale: 'menu.other',
              children: [
                {
                  path: '/other/upLoad',
                  name: 'odps同步导入',
                  exact: true,
                  locale: 'menu.other.upLoad',
                  hideInMenu: true,
                },
                {
                  path: '/other/upLoadMenu',
                  name: '菜单导入',
                  exact: true,
                  locale: 'menu.other.upLoadMenu',
                  hideInMenu: true,
                },
                {
                  path: '/other/homeEdit',
                  name: '概述编辑',
                  exact: true,
                  locale: 'menu.other.homeEdit',
                  hideInMenu: true,
                },
              ],
              hideInMenu: true,
            },
          ] as any
        }
      />,
    );
    expect(wrapper).toMatchSnapshot();
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
    const dom = wrapper.find('#logo');

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

  it('🥩 contentStyle should change dom', () => {
    const wrapper = render(
      <BasicLayout
        contentStyle={{
          padding: 56,
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('🥩 support className', () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        className="chenshuai2144"
        contentStyle={{
          padding: 56,
        }}
      />,
    );
    expect(wrapper.find('div.chenshuai2144').exists()).toBeTruthy();
  });

  it('🥩 support links', () => {
    const wrapper = mount<BasicLayoutProps>(<BasicLayout links={['name']} />);
    const dom = wrapper.find('.ant-pro-sider-menu-links');

    expect(dom.exists()).toBeTruthy();
  });

  it('🥩 do no render links', () => {
    const wrapper = mount<BasicLayoutProps>(<BasicLayout />);
    const dom = wrapper.find('.ant-pro-sider-menu-links');

    expect(dom.exists()).toBeFalsy();
  });

  it('🥩 set page title render', () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        pageTitleRender={(props, pageName, info) => {
          if (info) {
            return info.pageName;
          }
          return pageName || 'ant';
        }}
      />,
    );
    const dom = wrapper.find('.ant-pro-sider-menu-links');

    expect(dom.exists()).toBeFalsy();
  });
});
