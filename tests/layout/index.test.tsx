import { mount, render } from 'enzyme';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import BasicLayout from '@ant-design/pro-layout';

import { waitForComponentToPaint } from '../util';

describe('BasicLayout', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
    process.env.USE_MEDIA = 'md';
  });
  it('🥩 base use', async () => {
    const html = render(<BasicLayout />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 support loading', async () => {
    const wrapper = mount(<BasicLayout loading />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🥩 do not render menu', async () => {
    const wrapper = mount(<BasicLayout menuRender={false} />);
    await waitForComponentToPaint(wrapper);
    const menu = wrapper.find('.ant-pro-sider');
    expect(menu.exists()).toBe(false);
    const menuContent = wrapper.find('.ant-pro-sider-menu');
    expect(menuContent.exists()).toBe(false);
    expect((wrapper.find('section.ant-layout div.ant-layout').props().style || {}).padding).toBe(
      undefined,
    );
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do not render menu content', async () => {
    const wrapper = mount(<BasicLayout menuContentRender={false} />);
    await waitForComponentToPaint(wrapper);
    const menu = wrapper.find('.ant-pro-sider');
    expect(menu.exists()).toBe(true);
    const menuContent = wrapper.find('.ant-pro-sider-menu');
    expect(menuContent.exists()).toBe(false);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 support menuDataRender', async () => {
    const wrapper = mount(
      <BasicLayout
        menuDataRender={() =>
          [
            {
              path: '/home',
              name: '首页',
              locale: 'menu.home',
              children: [
                {
                  path: '/home/overview',
                  name: '概述',
                  hideInMenu: true,
                  exact: true,
                  locale: 'menu.home.overview',
                },
                {
                  path: '/home/search',
                  name: '搜索',
                  exact: true,
                  hideInMenu: true,
                  locale: 'menu.home.search',
                },
              ],
            },
            {
              path: '/data_hui',
              name: '汇总数据',
              locale: 'menu.data_hui',
              children: [
                {
                  collapsed: true,
                  menuName: '域买家维度交易',
                  name: '域买家维度交易',
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
                    },
                    {
                      id: 3,
                      isNavHome: '3',
                      name: '_航旅交易_买家_日表',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                    },
                  ],
                },
                {
                  collapsed: true,
                  name: '域买家维度交易2',
                  children: [
                    {
                      id: 5,
                      name: '_交易_买家_月表',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
                    },
                    {
                      id: 6,
                      name: '_航旅交易_买家_日表',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                    },
                  ],
                },
                {
                  collapsed: true,
                  name: '域买家维度交易3',
                  children: [
                    {
                      id: 7,
                      name: '_交易_买家_月表2',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
                    },
                    {
                      id: 8,
                      name: '_航旅交易_买家_日表3',
                      path:
                        '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
                    },
                  ],
                },
              ],
            },
            {
              path: '/data_ming',
              name: '明细数据',
              locale: 'menu.data_ming',
            },
            {
              path: '/other',
              name: '其他',

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
            },
          ] as any
        }
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🥩 do not render footer', async () => {
    const wrapper = mount(<BasicLayout footerRender={false} />);
    await waitForComponentToPaint(wrapper);
    const footer = wrapper.find('footer');
    expect(footer.exists()).toBe(false);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 menuDataRender change date', async () => {
    const wrapper = mount(<BasicLayout menuDataRender={() => []} />);
    await waitForComponentToPaint(wrapper, 100);
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
    act(() => {
      wrapper.setProps({
        menuDataRender: () => [
          {
            path: '/home',
            name: '首页',
            children: [
              {
                path: '/home/overview',
                name: '概述',
                exact: true,
              },
              {
                path: '/home/search',
                name: '搜索',
                exact: true,
              },
            ],
          },
        ],
      });
    });
    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('🥩 use onLogoClick', async () => {
    const onLogoClick = jest.fn();
    const wrapper = mount(
      <BasicLayout
        siderWidth={undefined}
        logo={
          <div onClick={onLogoClick} id="test_log">
            Logo
          </div>
        }
      />,
    );
    await waitForComponentToPaint(wrapper);
    const logo = wrapper.find('#test_log');
    act(() => {
      logo.simulate('click');
    });
    expect(onLogoClick).toHaveBeenCalled();
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 render logo', async () => {
    const wrapper = mount(<BasicLayout logo={<div id="test_log">Logo</div>} />);
    await waitForComponentToPaint(wrapper);
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 render logo by function', async () => {
    const wrapper = mount(<BasicLayout logo={() => <div id="test_log">Logo</div>} />);
    await waitForComponentToPaint(wrapper);
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 onCollapse', async () => {
    const onCollapse = jest.fn();
    const wrapper = mount(<BasicLayout onCollapse={onCollapse} />);
    await waitForComponentToPaint(wrapper);
    wrapper.find('.ant-pro-sider-collapsed-button').map((item) => item && item.simulate('click'));
    expect(onCollapse).toHaveBeenCalled();

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 siderWidth default', async () => {
    const wrapper = mount(<BasicLayout />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-sider').get(1).props.width).toBe(208);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 siderWidth=160', async () => {
    const wrapper = mount(<BasicLayout siderWidth={160} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-sider').get(1).props.width).toBe(160);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do not render collapsed button', async () => {
    const wrapper = mount(<BasicLayout collapsedButtonRender={false} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-sider-collapsed-button').exists()).toBe(false);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 when renderMenu=false, do not render collapsed button', async () => {
    const wrapper = mount(<BasicLayout menuRender={false} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-sider-collapsed-button').exists()).toBe(false);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 render customize collapsed button', async () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        collapsedButtonRender={(collapsed) => (
          <span id="customize_collapsed_button">{`${collapsed}`}</span>
        )}
      />,
    );
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('#customize_collapsed_button');
    expect(dom.text()).toEqual('false');

    act(() => {
      wrapper.setProps({
        collapsed: true,
      });
    });

    await waitForComponentToPaint(wrapper);
    expect(dom.text()).toEqual('true');
  });

  it('🥩 do not render menu header', async () => {
    const wrapper = mount<BasicLayoutProps>(<BasicLayout menuHeaderRender={false} />);
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('#logo');

    expect(dom.exists()).toBe(false);
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 customize render menu header', async () => {
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
    await waitForComponentToPaint(wrapper);

    const dom = wrapper.find('#customize_menu_header');
    expect(dom.exists()).toBe(true);

    expect(dom.find('#customize_menu_header_text').text()).toEqual('customize_menu_header');
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 contentStyle should change dom', async () => {
    const wrapper = render(
      <BasicLayout
        contentStyle={{
          padding: 56,
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('🥩 support className', async () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        className="chenshuai2144"
        contentStyle={{
          padding: 56,
        }}
      />,
    );
    expect(wrapper.find('div.chenshuai2144').exists()).toBeTruthy();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 support links', async () => {
    const wrapper = mount<BasicLayoutProps>(<BasicLayout links={['name']} />);
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('.ant-pro-sider-link');
    expect(dom.exists()).toBeTruthy();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do no render links', async () => {
    const wrapper = mount<BasicLayoutProps>(<BasicLayout />);
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('.ant-pro-sider-link');

    expect(dom.exists()).toBeFalsy();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 pure style', async () => {
    const wrapper = mount<BasicLayoutProps>(<BasicLayout pure />);
    await waitForComponentToPaint(wrapper);
    const menu = wrapper.find('.ant-pro-sider-menu');
    expect(menu.exists()).toBe(false);
    const dom = wrapper.find('.ant-pro-sider-link');
    expect(dom.exists()).toBeFalsy();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 set page title render', async () => {
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
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('.ant-pro-sider-link');

    expect(dom.exists()).toBeFalsy();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 onPageChange', async () => {
    const onPageChange = jest.fn();
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        onPageChange={onPageChange}
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.setProps({
        location: {
          pathname: '/name',
        },
      });
    });

    expect(onPageChange).toBeCalled();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 headerTitleRender ', async () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        headerTitleRender={() => <h2 id="mix-test">mix title</h2>}
        layout="mix"
        location={{
          pathname: '/',
        }}
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('h2#mix-test').text()).toBe('mix title');
  });

  it('🥩 onMenuHeaderClick', async () => {
    const onMenuHeaderClick = jest.fn();
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        pageTitleRender={false}
        onMenuHeaderClick={onMenuHeaderClick}
        layout="mix"
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('div.ant-pro-global-header-logo').simulate('click');
    });
    expect(onMenuHeaderClick).toBeCalled();
  });

  it('🥩 fixSider and collapsed should have different style', async () => {
    const wrapper = mount<BasicLayoutProps>(<BasicLayout collapsed />);
    await waitForComponentToPaint(wrapper);

    let dom = wrapper.find('.ant-pro-fixed-header');
    expect(dom.exists()).toBeFalsy();
    act(() => {
      wrapper.setProps({
        fixedHeader: true,
      });
    });
    await waitForComponentToPaint(wrapper);
    dom = wrapper.find('header.ant-pro-fixed-header');
    expect(dom.exists()).toBeTruthy();
    expect(dom.props()?.style?.width).toBe('calc(100% - 48px)');
    act(() => {
      wrapper.setProps({
        fixedHeader: true,
        collapsed: false,
      });
    });

    dom = wrapper.find('header.ant-pro-fixed-header');
    expect(dom.props()?.style?.width).toBe('calc(100% - 208px)');
    act(() => {
      wrapper.setProps({
        fixedHeader: true,
        collapsed: false,
        siderWidth: 120,
      });
    });

    dom = wrapper.find('header.ant-pro-fixed-header');
    expect(dom.props()?.style?.width).toBe('calc(100% - 120px)');
    act(() => {
      wrapper.setProps({
        fixedHeader: true,
        collapsed: false,
        menuRender: false,
      });
    });

    dom = wrapper.find('header.ant-pro-fixed-header');
    expect(dom.props()?.style?.width).toBe('100%');
    act(() => {
      wrapper.setProps({
        fixedHeader: true,
        layout: 'top',
      });
    });

    dom = wrapper.find('header.ant-pro-fixed-header');
    expect(dom.props()?.style?.width).toBe('100%');
  });

  it('🥩 renderPageTitle return value should is string', async () => {
    const renderPageTitle = jest.fn();
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        // @ts-expect-error
        pageTitleRender={() => {
          renderPageTitle();
          return 1221;
        }}
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitForComponentToPaint(wrapper);
    expect(renderPageTitle).toBeCalled();
  });

  it('🥩 rightContentRender should work in top', async () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout
        rightContentRender={() => <div id="layout_right">right</div>}
        layout="top"
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.setProps({
        rightContentRender: () => (
          <div
            id="layout_right"
            style={{
              width: 120,
            }}
          >
            right
          </div>
        ),
      });
    });
    expect(wrapper.find('#layout_right').exists()).toBeTruthy();
  });

  it('🥩 support get config form menuItem', async () => {
    const wrapper = mount(
      <BasicLayout
        location={{
          pathname: '/home/overview',
        }}
        menuDataRender={() => [
          {
            path: '/home/overview',
            name: '概述',
            exact: true,
            layout: 'side',
          },
          {
            path: '/home/search',
            name: '搜索',
            exact: true,
            layout: 'mix',
            navTheme: 'light',
          },
          {
            path: '/home',
            name: '首页',
            layout: 'top',
          },
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper, 100);
    expect(
      wrapper.find('.ant-design-pro').props().className?.includes('ant-pro-basicLayout-side'),
    ).toBeTruthy();
    act(() => {
      wrapper.setProps({
        location: {
          pathname: '/home/search',
        },
      });
    });

    await waitForComponentToPaint(wrapper, 100);
    expect(
      wrapper.find('.ant-design-pro').props().className?.includes('ant-pro-basicLayout-mix'),
    ).toBeTruthy();
    act(() => {
      wrapper.setProps({
        location: {
          pathname: '/home',
        },
      });
    });
    await waitForComponentToPaint(wrapper, 100);

    expect(
      wrapper.find('.ant-design-pro').props().className?.includes('ant-pro-basicLayout-top'),
    ).toBeTruthy();
  });

  it('🥩 mix layout hideInMenu render right', async () => {
    const wrapper = mount(
      <BasicLayout
        menuDataRender={() => [
          {
            path: '/welcome',
            name: '欢迎',
            hideInMenu: true,
          },
          {
            path: '/admin',
            name: '管理页',
            routes: [
              {
                path: '/admin/sub-page1',
                name: '一级页面',
              },
              {
                path: '/admin/sub-page2',
                name: '二级页面',
              },
              {
                path: '/admin/sub-page3',
                name: '三级页面',
              },
            ],
          },
          {
            name: '列表页',
            path: '/list',
          },
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🥩 BasicLayout menu support menu.true', async () => {
    const wrapper = render(
      <BasicLayout
        menu={{
          loading: true,
        }}
        menuDataRender={() => [
          {
            path: '/welcome',
            name: '欢迎',
            hideInMenu: true,
          },
          {
            path: '/admin',
            name: '管理页',
            routes: [
              {
                path: '/admin/sub-page1',
                name: '一级页面',
              },
              {
                path: '/admin/sub-page2',
                name: '二级页面',
              },
              {
                path: '/admin/sub-page3',
                name: '三级页面',
              },
            ],
          },
          {
            name: '列表页',
            path: '/list',
          },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('🥩 BasicLayout support current menu', async () => {
    const wrapper = mount(
      <BasicLayout
        location={{
          pathname: '/welcome',
        }}
        menuDataRender={() => [
          {
            path: '/welcome',
            name: '欢迎',
            layout: {},
          },
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-basicLayout-side').exists()).toBeTruthy();
    act(() => {
      wrapper.setProps({
        menu: {
          loading: true,
        },
        menuDataRender: () => [
          {
            path: '/welcome',
            name: '欢迎',
            layout: 'top',
          },
        ],
      });
    });
    await waitForComponentToPaint(wrapper);

    wrapper.setProps({
      menu: {
        loading: false,
      },
      menuDataRender: () => [
        {
          path: '/welcome',
          name: '欢迎',
          layout: 'top',
        },
      ],
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(wrapper.find('.ant-pro-basicLayout-top').exists()).toBeTruthy();
  });

  it('🥩 BasicLayout menu support autoClose', async () => {
    const Demo = () => {
      const [pathname, setPathname] = useState('/admin/sub-page1');
      return (
        <BasicLayout
          menu={{
            autoClose: false,
          }}
          location={{ pathname }}
          menuItemRender={(item, dom) => (
            <a
              onClick={() => {
                item.onClick();
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </a>
          )}
          menuDataRender={() => [
            {
              path: '/admin',
              name: '管理页',
              routes: [
                {
                  path: '/admin/sub-page1',
                  name: '一级页面',
                },
                {
                  path: '/admin/sub-page2',
                  name: '二级页面',
                },
                {
                  path: '/admin/sub-page3',
                  name: '三级页面',
                },
              ],
            },
            {
              name: '列表页',
              icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
              path: '/list',
              routes: [
                {
                  path: '/list/sub-page',
                  name: '一级列表页面',
                },
                {
                  path: '/list/sub-page2',
                  name: '二级列表页面',
                },
                {
                  path: 'https://ant.design',
                  name: 'antd',
                },
              ],
            },
          ]}
        />
      );
    };
    const html = mount(<Demo />);
    await waitForComponentToPaint(html);

    expect(html.find('li.ant-menu-submenu').length).toBe(2);
    act(() => {
      html.find('li.ant-menu-submenu').at(1).find('div.ant-menu-submenu-title').simulate('click');
    });
    await waitForComponentToPaint(html, 100);
    act(() => {
      html.find('ul.ant-menu-sub').at(1).find('.ant-menu-item-only-child').at(1).simulate('click');
    });
    await waitForComponentToPaint(html, 100);

    act(() => {
      html.find('span.ant-pro-menu-item-link').simulate('click');
    });

    expect(html.find('.ant-menu-submenu-open').length).toBe(2);
  });

  it('🥩 BasicLayout menu support onSelect', async () => {
    const fn = jest.fn();
    const Demo = () => {
      const [pathname, setPathname] = useState('/admin/sub-page1');
      return (
        <BasicLayout
          menu={{
            locale: false,
          }}
          onSelect={fn}
          location={{ pathname }}
          menuItemRender={(item, dom) => (
            <a
              onClick={() => {
                item.onClick();
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </a>
          )}
          menuDataRender={() => [
            {
              path: '/admin',
              name: '管理页',
              routes: [
                {
                  path: '/admin/sub-page1',
                  name: '一级页面',
                },
                {
                  path: '/admin/sub-page2',
                  name: '二级页面',
                },
                {
                  path: '/admin/sub-page3',
                  name: '三级页面',
                },
              ],
            },
            {
              name: '列表页',
              path: '/list',
              routes: [
                {
                  path: '/list/sub-page',
                  name: '一级列表页面',
                },
                {
                  path: '/list/sub-page2',
                  name: '二级列表页面',
                },
                {
                  path: '/list/sub-page3',
                  name: 'antd',
                },
              ],
            },
          ]}
        />
      );
    };
    const html = mount(<Demo />);
    await waitForComponentToPaint(html);
    act(() => {
      html.find('li.ant-menu-submenu').at(1).find('div.ant-menu-submenu-title').simulate('click');
    });
    await waitForComponentToPaint(html, 100);
    act(() => {
      html.find('ul.ant-menu-sub').at(1).find('.ant-menu-item-only-child').at(1).simulate('click');
    });
    await waitForComponentToPaint(html, 100);

    expect(fn).toBeCalled();
  });
});
