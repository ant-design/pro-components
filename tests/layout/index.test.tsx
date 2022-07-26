import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import type { ProLayoutProps } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';
import { mount, render as enzymeRender } from 'enzyme';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';
import { bigDefaultProps } from './defaultProps';

describe('BasicLayout', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
    process.env.USE_MEDIA = 'md';
  });
  it('🥩 base use', async () => {
    const html = enzymeRender(<ProLayout />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 support loading', async () => {
    const wrapper = mount(<ProLayout loading />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🥩 support headerRender', async () => {
    const wrapper = mount(
      <ProLayout layout="mix" headerRender={() => <div id="testid">testid</div>}>
        XXX
      </ProLayout>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('#testid').exists()).toBeTruthy();
  });

  it('🥩 do not render menu', async () => {
    const wrapper = mount(<ProLayout menuRender={false} />);
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
    const wrapper = mount(<ProLayout menuContentRender={false} />);
    await waitForComponentToPaint(wrapper);
    const menu = wrapper.find('.ant-pro-sider');
    expect(menu.exists()).toBe(true);
    const menuContent = wrapper.find('.ant-pro-sider-menu');
    expect(menuContent.exists()).toBe(false);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 support appList', async () => {
    const wrapper = render(
      <ProLayout
        appList={[
          {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: 'Ant Design',
            desc: '杭州市较知名的 UI 设计语言',
            url: 'https://ant.design',
          },
        ]}
        route={{
          routes: [
            [
              {
                path: '/home',
                name: '首页',
                locale: 'menu.home',
                routes: [
                  {
                    path: '/home/overview',
                    name: '概述',
                    hideInMenu: true,
                    exact: true,
                    locale: 'menu.home.overview',
                  },
                ],
              },
            ],
          ],
        }}
      />,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      (
        wrapper.baseElement.querySelector('.ant-pro-basicLayout-apps-icon') as HTMLDivElement
      )?.click();
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.baseElement.querySelectorAll('.ant-pro-basicLayout-apps-icon').length).toBe(1);
  });

  it('🥩 appList icon is simple', async () => {
    const wrapper = render(
      <ProLayout
        appList={[
          {
            icon: '',
            title: '区域产品解决方案平台',
            desc: '',
            url: 'https://ant.design',
          },
          {
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            title: 'AntV',
            desc: '',
            url: 'https://antv.vision/',
            target: '_blank',
          },
          {
            icon: <div>123</div>,
            title: 'AntV',
            desc: '',
            url: 'https://antv.vision/',
            target: '_blank',
          },
          {
            // @ts-ignore
            icon: () => {},
            title: 'AntV',
            desc: '',
            url: 'https://antv.vision/',
            target: '_blank',
          },
        ]}
        route={{
          routes: [
            [
              {
                path: '/home',
                name: '首页',
                locale: 'menu.home',
                routes: [
                  {
                    path: '/home/overview',
                    name: '概述',
                    hideInMenu: true,
                    exact: true,
                    locale: 'menu.home.overview',
                  },
                ],
              },
            ],
          ],
        }}
      />,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      (
        wrapper.baseElement.querySelector('.ant-pro-basicLayout-apps-icon') as HTMLDivElement
      )?.click();
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.baseElement.querySelectorAll('.ant-pro-basicLayout-apps-icon').length).toBe(1);
  });

  it('🥩 group title when collapsed, title is hidden', async () => {
    const wrapper = render(
      <ProLayout
        layoutBgImgList={[
          {
            src: 'https://gw.alipayobjects.com/zos/antfincdn/tQVPs1q2X%26/yonghushenfen.png',
          },
        ]}
        {...bigDefaultProps}
        appList={undefined}
        location={{
          pathname: '/list',
        }}
        menu={{
          type: 'group',
        }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '七妮妮',
        }}
        actionsRender={() => [
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <GithubFilled key="GithubFilled" />,
        ]}
        menuFooterRender={() => {
          return (
            <p
              style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.6)',
                paddingTop: 12,
              }}
            >
              Power by Ant Design
            </p>
          );
        }}
      >
        <div />
      </ProLayout>,
    );

    await waitForComponentToPaint(wrapper);
    expect(wrapper.baseElement.querySelectorAll('.ant-menu-item-group-title').length).toBe(2);
    expect(wrapper.baseElement.querySelectorAll('.ant-pro-sider-actions-collapsed').length).toBe(0);

    wrapper.rerender(
      <ProLayout
        layoutBgImgList={[
          {
            src: 'https://gw.alipayobjects.com/zos/antfincdn/tQVPs1q2X%26/yonghushenfen.png',
          },
        ]}
        {...bigDefaultProps}
        appList={undefined}
        location={{
          pathname: '/list',
        }}
        collapsed
        menu={{
          type: 'group',
        }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '七妮妮',
        }}
        actionsRender={() => [
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <GithubFilled key="GithubFilled" />,
        ]}
        menuFooterRender={() => {
          return (
            <p
              style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.6)',
                paddingTop: 12,
              }}
            >
              Power by Ant Design
            </p>
          );
        }}
      >
        <div />
      </ProLayout>,
    );

    expect(wrapper.baseElement.querySelectorAll('.ant-menu-item-group-title').length).toBe(0);

    // collapsed 的时候action 将会消失
    expect(wrapper.baseElement.querySelectorAll('.ant-pro-sider-actions-collapsed').length).toBe(1);
  });

  it('🥩 do not render footer', async () => {
    const wrapper = mount(<ProLayout footerRender={false} />);
    await waitForComponentToPaint(wrapper);
    const footer = wrapper.find('footer');
    expect(footer.exists()).toBe(false);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do not render footer', async () => {
    const wrapper = mount(<ProLayout footerRender={false} />);
    await waitForComponentToPaint(wrapper);
    const footer = wrapper.find('footer');
    expect(footer.exists()).toBe(false);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 menuDataRender change date', async () => {
    const wrapper = mount(<ProLayout menuDataRender={() => []} />);
    await waitForComponentToPaint(wrapper, 100);
    expect(wrapper.find('ul.ant-pro-sider-menu').exists()).toBeFalsy();
    act(() => {
      wrapper.setProps({
        menuDataRender: () => [
          {
            path: '/home',
            name: '首页',
            routes: [
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
    await waitForComponentToPaint(wrapper, 1000);

    expect(wrapper.find('ul.ant-pro-sider-menu').exists()).toBeTruthy();
  });

  it('🥩 use onLogoClick', async () => {
    const onLogoClick = jest.fn();
    const wrapper = mount(
      <ProLayout
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
    const wrapper = mount(<ProLayout logo={<div id="test_log">Logo</div>} />);
    await waitForComponentToPaint(wrapper);
    const logo = wrapper.find('#test_log');
    expect(logo.text()).toEqual('Logo');
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 render logo by function', async () => {
    //@ts-expect-error
    const wrapper = mount(<ProLayout logo={() => <div id="test_log">Logo</div>} />);
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
    const wrapper = mount(<ProLayout onCollapse={onCollapse} />);
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper
        .find('div.ant-pro-sider-collapsed-button')
        .map((item) => item && item.simulate('click'));
    });
    expect(onCollapse).toHaveBeenCalled();

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 siderWidth default', async () => {
    const wrapper = mount(<ProLayout />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-sider').get(1).props.width).toBe(256);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 siderWidth=160', async () => {
    const wrapper = mount(<ProLayout siderWidth={160} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-sider').get(1).props.width).toBe(160);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do not render collapsed button', async () => {
    const wrapper = mount(<ProLayout collapsedButtonRender={false} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('div.ant-pro-sider-collapsed-button').exists()).toBe(false);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 when renderMenu=false, do not render collapsed button', async () => {
    const wrapper = mount(<ProLayout menuRender={false} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('div.ant-pro-sider-collapsed-button').exists()).toBe(false);

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 render customize collapsed button', async () => {
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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

  it('🥩 support hideMenuWhenCollapsed', async () => {
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
        menu={{
          hideMenuWhenCollapsed: true,
        }}
        collapsed={true}
      />,
    );
    await waitForComponentToPaint(wrapper);

    let dom = wrapper.find('.ant-pro-sider-hide-when-collapsed');

    expect(dom.exists()).toBeTruthy();

    expect(
      window
        .getComputedStyle(wrapper.find('.ant-pro-sider').at(0).getDOMNode())
        .getPropertyValue('left'),
    ).toBe('-48px');

    act(() => {
      wrapper.setProps({
        collapsed: false,
      });
    });
    await waitForComponentToPaint(wrapper);
    dom = wrapper.find('.ant-pro-sider-hide-when-collapsed');

    expect(dom.exists()).toBeFalsy();
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do not render menu header', async () => {
    const wrapper = mount<ProLayoutProps>(
      <ProLayout menuExtraRender={() => <div>menuExtraRender</div>} menuHeaderRender={false} />,
    );
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('#logo');
    expect(dom.exists()).toBe(false);

    const menuExtraRender = wrapper.find('.ant-pro-sider-extra-no-logo');
    expect(menuExtraRender.exists()).toBe(true);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 customize render menu header', async () => {
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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
    const wrapper = enzymeRender(
      <ProLayout
        contentStyle={{
          padding: 56,
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('🥩 support className', async () => {
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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
    const wrapper = mount<ProLayoutProps>(<ProLayout links={['name']} />);
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('.ant-pro-sider-link');
    expect(dom.exists()).toBeTruthy();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do no render links', async () => {
    const wrapper = mount<ProLayoutProps>(<ProLayout />);
    await waitForComponentToPaint(wrapper);
    const dom = wrapper.find('.ant-pro-sider-link');

    expect(dom.exists()).toBeFalsy();
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 pure style', async () => {
    const wrapper = mount<ProLayoutProps>(<ProLayout pure />);
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
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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

  it('🥩 renderPageTitle return value should is string', async () => {
    const renderPageTitle = jest.fn();
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
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

  it('🥩 rightContentRender should work in side', async () => {
    const wrapper = mount<ProLayoutProps>(
      <ProLayout
        rightContentRender={() => <div id="layout_right">right</div>}
        layout="side"
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
      <ProLayout
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
      <ProLayout
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
    const wrapper = enzymeRender(
      <>
        <ProLayout
          menu={{
            loading: true,
          }}
          menuDataRender={() => [
            {
              path: '/welcome',
              name: '欢迎',
            },
            {
              name: '列表页',
              path: '/list',
            },
          ]}
        />
        <ProLayout
          menu={{
            loading: true,
          }}
          layout="top"
          menuDataRender={() => [
            {
              path: '/welcome',
              name: '欢迎',
            },
            {
              name: '列表页',
              path: '/list',
            },
          ]}
        />
        <ProLayout
          menu={{
            loading: true,
          }}
          layout="mix"
          menuDataRender={() => [
            {
              path: '/welcome',
              name: '欢迎',
            },
            {
              name: '列表页',
              path: '/list',
            },
          ]}
        />
      </>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('🥩 BasicLayout support current menu', async () => {
    const wrapper = mount(
      <ProLayout
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
    act(() => {
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
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(wrapper.find('.ant-pro-basicLayout-top').exists()).toBeTruthy();
  });

  it('🥩 BasicLayout menu support autoClose', async () => {
    const Demo = () => {
      const [pathname, setPathname] = useState('/admin/sub-page1');
      return (
        <ProLayout
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
                  name: 'AntDesign外链',
                },
              ],
            },
          ]}
        />
      );
    };
    const html = render(<Demo />);
    await waitForComponentToPaint(html);
    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu').length).toBe(2);
    const domParentMenu = await (await html.findAllByText('列表页')).at(0);
    act(() => {
      domParentMenu?.click();
    });
    await waitForComponentToPaint(html, 2000);
    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu-open').length).toBe(2);
    const domChildMenu = await (await html.findAllByText('二级列表页面')).at(0);
    const domLink = await (await html.findAllByText('AntDesign外链')).at(0);
    act(() => {
      domChildMenu?.click();
      domLink?.click();
    });
    await waitForComponentToPaint(html, 2000);
    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu').length).toBe(2);
  });

  it('🥩 BasicLayout menu support onSelect', async () => {
    const fn = jest.fn();
    const Demo = () => {
      const [pathname, setPathname] = useState('/admin/sub-page1');
      return (
        <ProLayout
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
                  name: 'AntDesign外链',
                },
              ],
            },
          ]}
        />
      );
    };
    const html = render(<Demo />);
    await waitForComponentToPaint(html);
    const domParentMenu = await (await html.findAllByText('列表页')).at(0);

    act(() => {
      domParentMenu?.click();
    });
    await waitForComponentToPaint(html, 100);
    const domLink = await (await html.findAllByText('AntDesign外链')).at(0);
    act(() => {
      domLink?.click();
    });
    await waitForComponentToPaint(html, 100);
    expect(fn).toBeCalled();
  });

  it('🥩 BasicLayout support menu.request', async () => {
    const fn = jest.fn();
    const actionRef = React.createRef<
      | {
          reload: () => void;
        }
      | undefined
    >();

    const Demo = () => {
      return (
        <ProLayout
          // @ts-ignore
          actionRef={actionRef}
          menu={{
            locale: false,
            request: async () => {
              fn();
              return [
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
              ];
            },
          }}
        />
      );
    };

    const html = mount(<Demo />);
    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledTimes(1);

    actionRef.current?.reload();

    expect(fn).toBeCalledTimes(2);
  });

  it('🥩 BasicLayout support menu.params', async () => {
    const fn = jest.fn();
    const defaultMenu = {
      locale: false,
      params: {},
      request: async (params: Record<string, string>) => {
        fn(params);
        return [
          {
            path: '/admin',
            name: '管理页',
          },
          {
            name: '列表页',
            path: '/list',
          },
        ];
      },
    };

    const html = mount(<ProLayout menu={defaultMenu} />);

    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledTimes(1);

    act(() => {
      html.setProps({
        menu: {
          ...defaultMenu,
          params: {
            id: '1212',
          },
        },
      });
    });

    await waitForComponentToPaint(html, 100);

    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith({
      id: '1212',
    });
    act(() => {
      html.setProps({
        menu: {
          ...defaultMenu,
          params: {
            id: '123',
          },
        },
      });
    });
    await waitForComponentToPaint(html, 100);
    expect(fn).toBeCalledTimes(3);
    expect(fn).toBeCalledWith({
      id: '123',
    });

    act(() => {
      html.setProps({
        menu: {
          ...defaultMenu,
          params: {
            id: '123',
          },
        },
      });
    });
    await waitForComponentToPaint(html, 100);
    expect(fn).toBeCalledTimes(3);
  });

  it('🥩 BasicLayout support menu.defaultOpenAll', async () => {
    const Demo = () => {
      const [pathname, setPathname] = useState('/admin/sub-page1');
      return (
        <ProLayout
          menu={{
            defaultOpenAll: true,
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
              path: '/home',
              name: '首页',
              locale: 'menu.home',
              routes: [
                {
                  path: '/home/overview',
                  name: '概述',
                  hideInMenu: true,
                  locale: 'menu.home.overview',
                },
                {
                  path: '/home/search',
                  name: '搜索',
                  hideInMenu: true,
                  locale: 'menu.home.search',
                },
              ],
            },
            {
              path: '/data_hui',
              name: '汇总数据',
              locale: 'menu.data_hui',
              routes: [
                {
                  collapsed: true,
                  menuName: '域买家维度交易',
                  name: '域买家维度交易',
                  routes: [
                    {
                      id: 2,
                      name: '月表',
                      path: '/data_hui2',
                    },
                    {
                      name: '日表',
                      path: '/data_hui3?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=box-shadow',
                    },
                  ],
                },
                {
                  name: '维度交易',
                  path: '/',
                  routes: [
                    {
                      name: '月表',
                      path: '/data_hui4',
                    },
                    {
                      name: '日表',
                      key: 'tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=box-shadow',
                      path: '/data_hui5',
                    },
                  ],
                },
              ],
            },
          ]}
        />
      );
    };
    const html = render(<Demo />);
    await waitForComponentToPaint(html);

    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu').length).toBe(3);
    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu-open').length).toBe(3);
  });

  it('🥩 BasicLayout support menu.ignoreFlatMenu', async () => {
    const Demo = () => {
      const [pathname, setPathname] = useState('/admin/sub-page1');
      return (
        <ProLayout
          menu={{
            defaultOpenAll: true,
            ignoreFlatMenu: true,
          }}
          location={{ pathname }}
          menuItemRender={(item, dom) => (
            <a
              onClick={() => {
                item?.onClick?.();
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </a>
          )}
          menuDataRender={() => [
            {
              path: '/home',
              name: '首页',
              locale: 'menu.home',
              routes: [
                {
                  path: '/home/overview',
                  name: '概述',
                  hideInMenu: true,
                  locale: 'menu.home.overview',
                },
                {
                  path: '/home/search',
                  name: '搜索',
                  hideInMenu: true,
                  locale: 'menu.home.search',
                },
              ],
            },
            {
              path: '/data_hui',
              name: '汇总数据',
              locale: 'menu.data_hui',
              routes: [
                {
                  collapsed: true,
                  menuName: '域买家维度交易',
                  name: '域买家维度交易',
                  routes: [
                    {
                      id: 2,
                      name: '月表',
                      path: '/data_hui2',
                    },
                    {
                      name: '日表',
                      path: '/data_hui3?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=box-shadow',
                    },
                  ],
                },
                {
                  name: '维度交易',
                  path: '/',
                  routes: [
                    {
                      name: '月表2',
                      path: '/data_hui4',
                    },
                    {
                      name: '日表2',
                      key: 'tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=box-shadow',
                      path: '/data_hui5',
                    },
                  ],
                },
              ],
            },
          ]}
        />
      );
    };
    const html = render(<Demo />);
    await waitForComponentToPaint(html, 1200);

    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu').length).toBe(3);
    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu-open').length).toBe(3);
    await act(async () => {
      (await html.findByText('月表'))?.parentElement?.click();
    });
    await waitForComponentToPaint(html, 100);
    expect(html.baseElement.querySelectorAll('li.ant-pro-menu-submenu-open').length).toBe(0);
  });

  it('🥩  navTheme=realDark', () => {
    const html = render(<ProLayout navTheme="realDark" />);
    expect(html.baseElement.querySelector('aside.ant-layout-sider')?.getAttribute('style')).toBe(
      'background-color: transparent; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 65%); flex: 0 0 256px; max-width: 256px; min-width: 256px; width: 256px;',
    );
  });

  it('🥩 formatMessage support', () => {
    const html = render(
      <ProLayout
        menu={{
          locale: true,
        }}
        route={{
          routes: [
            {
              name: 'home',
              locale: 'menu.home',
              path: '/home',
            },
          ],
        }}
        formatMessage={({
          id,
          defaultMessage,
        }: {
          id: string;
          defaultMessage?: string;
        }): string => {
          const locales = {
            'menu.home': '主页',
          };
          return locales[id] ? locales[id] : (defaultMessage as string);
        }}
      />,
    );

    expect(html.findByText('主页')).toBeTruthy();
  });

  it('🥩 pure should has provide', () => {
    let html = render(
      <ConfigProvider locale={en_US}>
        <ProLayout>
          <LoginForm>
            <ProFormText />
          </LoginForm>
        </ProLayout>
      </ConfigProvider>,
    );
    expect(html.container.querySelector('.ant-btn.ant-btn-primary.ant-btn-lg')?.textContent).toBe(
      'Login',
    );

    expect(html.getByText('Login')).toBeTruthy();

    html.rerender(
      <ConfigProvider locale={en_US}>
        <ProLayout pure>
          <LoginForm>
            <ProFormText />
          </LoginForm>
        </ProLayout>
      </ConfigProvider>,
    );

    expect(html.container.querySelector('.ant-btn.ant-btn-primary.ant-btn-lg')?.textContent).toBe(
      'Login',
    );

    html = render(
      <ConfigProvider locale={en_US}>
        <LoginForm>
          <ProFormText />
        </LoginForm>
      </ConfigProvider>,
    );

    expect(html.container.querySelector('.ant-btn.ant-btn-primary.ant-btn-lg')?.textContent).toBe(
      'Login',
    );
  });
});
