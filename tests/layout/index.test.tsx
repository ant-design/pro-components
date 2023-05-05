import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { act, render, waitFor } from '@testing-library/react';
import { Button, ConfigProvider } from 'antd';
import en_US from 'antd/lib/locale/en_US';
import React, { useState } from 'react';
import { waitTime } from '../util';
import { bigDefaultProps } from './defaultProps';

describe('BasicLayout', () => {
  beforeEach(() => {
    delete process.env.ANTD_VERSION;
  });
  afterEach(() => {
    delete process.env.ANTD_VERSION;
  });
  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
    process.env.USE_MEDIA = 'md';
  });
  it('🥩 base use', async () => {
    const html = render(<ProLayout />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🥩 compatibleStyle', async () => {
    process.env.ANTD_VERSION = '4.0.0';
    const html = render(<ProLayout>{process.env.ANTD_VERSION}</ProLayout>);
    expect(html.asFragment()).toMatchSnapshot();
    delete process.env.ANTD_VERSION;
    html.unmount();
  });

  it('🥩 support loading', async () => {
    const wrapper = render(
      <ProLayout
        loading
        menu={{
          loading: true,
        }}
      />,
    );
    await waitTime(1000);
    expect(
      wrapper.baseElement.querySelector('.ant-skeleton'),
    ).toMatchSnapshot();
    wrapper.unmount();
  });

  it('🥩 support headerRender', async () => {
    const wrapper = render(
      <ProLayout
        layout="mix"
        headerRender={() => <div id="testid">testid</div>}
      >
        XXX
      </ProLayout>,
    );
    await waitTime(100);

    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('#testid'),
    ).toBeTruthy();
    wrapper.unmount();
  });

  it('🥩 do not render menu', async () => {
    const wrapper = render(<ProLayout menuRender={false} />);
    await waitTime(100);
    const menu =
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-sider');
    expect(menu).toBeFalsy();

    const menuContent = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-menu',
    );
    expect(menuContent).toBeFalsy();
    expect(
      getComputedStyle(
        wrapper.baseElement.querySelector<HTMLDivElement>(
          'section.ant-layout div.ant-pro-layout-container',
        )!,
      )?.padding,
    ).toBe('');
    wrapper.unmount();
  });

  it('🥩 do not render menu content', async () => {
    const wrapper = render(<ProLayout menuContentRender={false} />);
    await waitTime(100);
    const menu =
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-sider');
    expect(menu).toBeTruthy();
    const menuContent = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-menu',
    );
    expect(menuContent).toBeFalsy();
    wrapper.unmount();
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
          children: [
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
                ],
              },
            ],
          ],
        }}
      />,
    );
    await waitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          '.ant-pro-layout-apps-icon',
        ) as HTMLDivElement
      )?.click();
    });
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelectorAll('.ant-pro-layout-apps-icon').length,
    ).toBe(1);
    wrapper.unmount();
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
          children: [
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
                ],
              },
            ],
          ],
        }}
      />,
    );
    await waitTime(100);
    act(() => {
      (
        wrapper.baseElement.querySelector(
          '.ant-pro-layout-apps-icon',
        ) as HTMLDivElement
      )?.click();
    });
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelectorAll('.ant-pro-layout-apps-icon').length,
    ).toBe(1);
    wrapper.unmount();
  });

  it('🥩 group title when collapsed, title is hidden', async () => {
    const wrapper = render(
      <ProLayout
        bgLayoutImgList={[
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
      >
        <div />
      </ProLayout>,
    );

    await waitTime(100);
    expect(
      wrapper.baseElement.querySelectorAll('.ant-menu-item-group-title').length,
    ).toBe(2);
    expect(
      wrapper.baseElement.querySelectorAll('.ant-pro-sider-actions-collapsed')
        .length,
    ).toBe(0);

    wrapper.rerender(
      <ProLayout
        bgLayoutImgList={[
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
                paddingBlockStart: 12,
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

    expect(
      wrapper.baseElement.querySelectorAll('.ant-menu-item-group-title').length,
    ).toBe(0);

    // collapsed 的时候action 将会消失
    expect(
      wrapper.baseElement.querySelectorAll('.ant-pro-sider-actions-collapsed')
        .length,
    ).toBe(1);

    wrapper.unmount();
  });

  it('🥩 do not render footer', async () => {
    const wrapper = render(<ProLayout footerRender={false} />);
    await waitTime(100);
    const footer = wrapper.baseElement.querySelector<HTMLDivElement>('footer');
    expect(footer).toBeFalsy();
    wrapper.unmount();
  });

  it('🥩 do not render footer', async () => {
    const wrapper = render(<ProLayout footerRender={false} />);
    await waitTime(100);
    const footer = wrapper.baseElement.querySelector<HTMLDivElement>('footer');
    expect(footer).toBeFalsy();
    wrapper.unmount();
  });

  it('🥩 menuDataRender change date', async () => {
    const wrapper = render(<ProLayout menuDataRender={() => []} />);
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'ul.ant-pro-sider-menu',
      ),
    ).toBeFalsy();
    act(() => {
      wrapper.rerender(
        <ProLayout
          menuDataRender={() => [
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
          ]}
        />,
      );
    });
    await waitTime(1000);

    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'ul.ant-pro-sider-menu',
      ),
    ).toBeTruthy();
    wrapper.unmount();
  });

  it('🥩 use onLogoClick', async () => {
    const onLogoClick = jest.fn();
    const wrapper = render(
      <ProLayout
        siderWidth={undefined}
        logo={
          <div onClick={onLogoClick} id="test_log">
            Logo
          </div>
        }
      />,
    );
    await waitTime(100);
    const logo = wrapper.baseElement.querySelector<HTMLDivElement>('#test_log');
    act(() => {
      logo?.click();
    });
    expect(onLogoClick).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('🥩 render logo', async () => {
    const wrapper = render(<ProLayout logo={<div id="test_log">Logo</div>} />);
    await waitTime(100);
    const logo = wrapper.baseElement.querySelector<HTMLDivElement>('#test_log');
    expect(logo?.textContent).toEqual('Logo');
    wrapper.unmount();
  });

  it('🥩 render logo by function', async () => {
    const wrapper = render(
      //@ts-expect-error
      <ProLayout logo={() => <div id="test_log">Logo</div>} />,
    );
    await waitTime(100);
    const logo = wrapper.baseElement.querySelector<HTMLDivElement>('#test_log');
    expect(logo?.textContent).toEqual('Logo');
    await waitTime(100);
    wrapper.unmount();
  });

  it('🥩 onCollapse', async () => {
    const onCollapse = jest.fn();
    const wrapper = render(<ProLayout onCollapse={onCollapse} />);
    await waitTime(100);
    act(() => {
      Array.from(
        wrapper.baseElement.querySelectorAll<HTMLDivElement>(
          'div.ant-pro-sider-collapsed-button',
        ),
      ).map((item) => item && item?.click());
    });

    expect(onCollapse).toHaveBeenCalled();

    await waitTime(100);
    wrapper.unmount();
  });

  it('🥩 siderWidth default', async () => {
    const wrapper = render(
      <ProLayout
        route={{
          children: [
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
                ],
              },
            ],
          ],
        }}
      />,
    );

    await waitTime(100);

    expect(
      getComputedStyle(
        wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-sider')!,
      )?.width,
    ).toBe('256px');

    await waitTime(100);
    wrapper.unmount();
  });

  it('🥩 siderWidth=160', async () => {
    const wrapper = render(<ProLayout siderWidth={160} />);
    await waitTime(100);
    expect(
      getComputedStyle(
        wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-sider')!,
      )?.width,
    ).toBe('160px');

    await waitTime(100);
    wrapper.unmount();
  });

  it('🥩 do not render collapsed button', async () => {
    const wrapper = render(<ProLayout collapsedButtonRender={false} />);
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'div.ant-pro-sider-collapsed-button',
      ),
    ).toBeFalsy();

    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 when renderMenu=false, do not render collapsed button', async () => {
    const wrapper = render(<ProLayout menuRender={false} />);
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'div.ant-pro-sider-collapsed-button',
      ),
    ).toBeFalsy();

    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 render customize collapsed button', async () => {
    const wrapper = render(
      <ProLayout
        collapsedButtonRender={(collapsed) => (
          <span id="customize_collapsed_button">{`${collapsed}`}</span>
        )}
      />,
    );
    await waitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '#customize_collapsed_button',
    );
    expect(dom?.textContent).toEqual('false');

    act(() => {
      wrapper.rerender(
        <ProLayout
          collapsedButtonRender={(collapsed) => (
            <span id="customize_collapsed_button">{`${collapsed}`}</span>
          )}
          collapsed
        />,
      );
    });

    await waitTime(100);
    expect(dom?.textContent).toEqual('true');
  });

  it('🥩 support hideMenuWhenCollapsed', async () => {
    const wrapper = render(
      <ProLayout
        menu={{
          hideMenuWhenCollapsed: true,
        }}
        collapsed={true}
      >
        layout_right
      </ProLayout>,
    );

    await wrapper.findByText('layout_right');

    let dom = wrapper.baseElement.querySelector(
      '.ant-pro-sider-hide-when-collapsed',
    );

    expect(!!dom).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <ProLayout
          menu={{
            hideMenuWhenCollapsed: true,
          }}
          collapsed={false}
        >
          layout_list
        </ProLayout>,
      );
    });
    await wrapper.findByText('layout_list');

    waitFor(() => {
      dom = wrapper.baseElement.querySelector(
        '.ant-pro-sider-hide-when-collapsed',
      );

      expect(!!dom).toBeFalsy();
    });

    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do not render menu header', async () => {
    const wrapper = render(
      <ProLayout
        menuExtraRender={() => <div>menuExtraRender</div>}
        menuHeaderRender={false}
      />,
    );
    await waitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>('#logo');
    expect(dom).toBeFalsy();

    const menuExtraRender = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-extra-no-logo',
    );
    expect(menuExtraRender).toBeTruthy();
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 customize render menu header', async () => {
    const wrapper = render(
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
    await waitTime(100);

    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '#customize_menu_header',
    );
    expect(dom).toBeTruthy();

    expect(
      dom?.querySelector('#customize_menu_header_text')?.textContent,
    ).toEqual('customize_menu_header');
    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 contentStyle should change dom', async () => {
    const wrapper = render(
      <ProLayout
        contentStyle={{
          padding: 56,
        }}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('🥩 support className', async () => {
    const wrapper = render(
      <ProLayout
        className="chenshuai2144"
        contentStyle={{
          padding: 56,
        }}
      />,
    );
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('div.chenshuai2144'),
    ).toBeTruthy();
    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 support links', async () => {
    const wrapper = render(<ProLayout links={['name']} />);
    await waitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );
    expect(dom).toBeTruthy();
    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do no render links', async () => {
    const wrapper = render(<ProLayout />);
    await waitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );

    expect(dom).toBeFalsy();
    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 pure style', async () => {
    const wrapper = render(<ProLayout pure />);
    await waitTime(100);
    const menu = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-menu',
    );
    expect(menu).toBeFalsy();
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );
    expect(dom).toBeFalsy();
    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 set page title render', async () => {
    const wrapper = render(
      <ProLayout
        pageTitleRender={(props, pageName, info) => {
          if (info) {
            return info.pageName;
          }
          return pageName || 'ant';
        }}
      />,
    );
    await waitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );

    expect(dom).toBeFalsy();
    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 onPageChange', async () => {
    const onPageChange = jest.fn();
    const wrapper = render(
      <ProLayout
        onPageChange={onPageChange}
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitTime(100);
    act(() => {
      wrapper.rerender(
        <ProLayout
          onPageChange={onPageChange}
          location={{
            pathname: '/name',
          }}
        />,
      );
    });

    expect(onPageChange).toBeCalled();
    await waitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 headerTitleRender ', async () => {
    const wrapper = render(
      <ProLayout
        headerTitleRender={() => <h2 id="mix-test">mix title</h2>}
        layout="mix"
        location={{
          pathname: '/',
        }}
      />,
    );
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('h2#mix-test')
        ?.textContent,
    ).toBe('mix title');
  });

  it('🥩 onMenuHeaderClick', async () => {
    const onMenuHeaderClick = jest.fn();
    const wrapper = render(
      <ProLayout
        pageTitleRender={false}
        onMenuHeaderClick={onMenuHeaderClick}
        layout="mix"
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitTime(100);
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('div.ant-pro-global-header-logo')
        ?.click();
    });
    expect(onMenuHeaderClick).toBeCalled();
  });

  it('🥩 renderPageTitle return value should is string', async () => {
    const renderPageTitle = jest.fn();
    render(
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

    await waitFor(() => {
      expect(renderPageTitle).toBeCalled();
    });
  });

  it('🥩 rightContentRender should work in top', async () => {
    const wrapper = render(
      <ProLayout
        rightContentRender={() => <div id="layout_right">right</div>}
        layout="top"
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitTime(100);

    act(() => {
      wrapper.rerender(
        <ProLayout
          rightContentRender={() => (
            <div
              id="layout_right"
              style={{
                width: 120,
              }}
            >
              right
            </div>
          )}
          layout="top"
          location={{
            pathname: '/',
          }}
        />,
      );
    });
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('#layout_right'),
    ).toBeTruthy();
  });

  it('🥩 rightContentRender should work in side', async () => {
    const wrapper = render(
      <ProLayout
        rightContentRender={() => <div id="layout_right">right</div>}
        layout="side"
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitTime(100);

    act(() => {
      wrapper.rerender(
        <ProLayout
          rightContentRender={() => (
            <div
              id="layout_right"
              style={{
                width: 120,
              }}
            >
              right
            </div>
          )}
          layout="side"
          location={{
            pathname: '/',
          }}
        />,
      );
    });
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('#layout_right'),
    ).toBeTruthy();
  });

  it('🥩 support get config form menuItem', async () => {
    const wrapper = render(
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
    await waitTime(100);
    expect(
      wrapper.baseElement
        .querySelector('.ant-design-pro')
        ?.className.includes('ant-pro-layout-side'),
    ).toBeTruthy();
    act(() => {
      wrapper.rerender(
        <ProLayout
          location={{
            pathname: '/home/search',
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
    });

    await waitTime(100);
    expect(
      wrapper.baseElement
        .querySelector('.ant-design-pro')
        ?.className.includes('ant-pro-layout-mix'),
    ).toBeTruthy();
    act(() => {
      wrapper.rerender(
        <ProLayout
          location={{
            pathname: '/home',
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
    });
    await waitTime(100);

    expect(
      wrapper.baseElement
        .querySelector('.ant-design-pro')
        ?.className.includes('ant-pro-layout-top'),
    ).toBeTruthy();
  });

  it('🥩 mix layout hideInMenu render right', async () => {
    const wrapper = render(
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
            children: [
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
    await wrapper.findAllByText('列表页');
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('🥩 BasicLayout menu support menu.true', async () => {
    const wrapper = render(
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
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('🥩 ProLayout support current menu', async () => {
    const wrapper = render(
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
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-layout-side'),
    ).toBeTruthy();
    act(() => {
      wrapper.rerender(
        <ProLayout
          location={{
            pathname: '/welcome',
          }}
          menu={{
            loading: true,
          }}
          menuDataRender={() => [
            {
              path: '/welcome',
              name: '欢迎',
              layout: 'top',
            },
          ]}
        />,
      );
    });
    await waitTime(100);
    act(() => {
      wrapper.rerender(
        <ProLayout
          location={{
            pathname: '/welcome',
          }}
          menu={{
            loading: false,
          }}
          menuDataRender={() => [
            {
              path: '/welcome',
              name: '欢迎',
              layout: 'top',
            },
          ]}
        />,
      );
    });
    await waitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-layout-top'),
    ).toBeTruthy();
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
              children: [
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
              children: [
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
    await waitTime(100);
    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu').length,
    ).toBe(2);
    const domParentMenu = await (await html.findAllByText('列表页')).at(0);
    act(() => {
      domParentMenu?.click();
    });
    await waitTime(2000);
    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu-open').length,
    ).toBe(2);
    const domChildMenu = await (await html.findAllByText('二级列表页面')).at(0);
    const domLink = await (await html.findAllByText('AntDesign外链')).at(0);
    act(() => {
      domChildMenu?.click();
      domLink?.click();
    });
    await waitTime(2000);
    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu').length,
    ).toBe(2);
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
              children: [
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
              children: [
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
    await waitTime(100);
    const domParentMenu = await (await html.findAllByText('列表页')).at(0);

    act(() => {
      domParentMenu?.click();
    });
    await waitTime(100);
    const domLink = await (await html.findAllByText('AntDesign外链')).at(0);
    act(() => {
      domLink?.click();
    });
    await waitTime(100);
    expect(fn).toBeCalled();
  });

  it('🥩 ProLayout support menu.request', async () => {
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
                  children: [
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
                  children: [
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

    render(<Demo />);

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    act(() => {
      actionRef.current?.reload();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });

  it('🥩 ProLayout support menu.params', async () => {
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

    const html = render(<ProLayout menu={defaultMenu} />);

    await waitTime(1000);

    expect(fn).toBeCalledTimes(1);

    act(() => {
      html.rerender(
        <ProLayout
          menu={{
            ...defaultMenu,
            params: {
              id: '1212',
            },
          }}
        />,
      );
    });

    await waitTime(100);

    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith({
      id: '1212',
    });
    act(() => {
      html.rerender(
        <ProLayout
          menu={{
            ...defaultMenu,
            params: {
              id: '123',
            },
          }}
        />,
      );
    });

    await waitTime(100);
    expect(fn).toBeCalledTimes(3);
    expect(fn).toBeCalledWith({
      id: '123',
    });

    act(() => {
      html.rerender(
        <ProLayout
          menu={{
            ...defaultMenu,
            params: {
              id: '123',
            },
          }}
        />,
      );
    });

    await waitTime(100);
    expect(fn).toBeCalledTimes(3);
  });

  it('🥩 ProLayout support menu.defaultOpenAll', async () => {
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
              children: [
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
              children: [
                {
                  collapsed: true,
                  menuName: '域买家维度交易',
                  name: '域买家维度交易',
                  path: '/xx',
                  children: [
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
                  children: [
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
    await waitTime(100);

    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu').length,
    ).toBe(3);
    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu-open').length,
    ).toBe(3);
  });

  it('🥩 ProLayout support menu.ignoreFlatMenu', async () => {
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
              children: [
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
              children: [
                {
                  collapsed: true,
                  menuName: '域买家维度交易',
                  name: '域买家维度交易',
                  children: [
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
                  children: [
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
    await waitTime(1200);

    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu').length,
    ).toBe(3);
    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu-open').length,
    ).toBe(3);
    await act(async () => {
      (await html.findByText('月表'))?.parentElement?.click();
    });
    await waitTime(100);
    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu-open').length,
    ).toBe(0);
  });

  it('🥩 formatMessage support', async () => {
    const html = render(
      <ProLayout
        menu={{
          locale: true,
        }}
        route={{
          children: [
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
    await waitTime(200);
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
    expect(
      html.container.querySelector('.ant-btn.ant-btn-primary.ant-btn-lg')
        ?.textContent,
    ).toBe('Login');

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

    expect(
      html.container.querySelector('.ant-btn.ant-btn-primary.ant-btn-lg')
        ?.textContent,
    ).toBe('Login');

    html = render(
      <ConfigProvider locale={en_US}>
        <LoginForm>
          <ProFormText />
        </LoginForm>
      </ConfigProvider>,
    );

    expect(
      html.container.querySelector('.ant-btn.ant-btn-primary.ant-btn-lg')
        ?.textContent,
    ).toBe('Login');
  });

  it('🥩 siderMenu should restore openKeys when collapsed is false', async () => {
    const onCollapse = jest.fn();
    const html = render(
      <ProLayout
        {...bigDefaultProps}
        location={{ pathname: '/list/sub-page/sub-sub-page1' }}
        onCollapse={onCollapse}
        defaultCollapsed={false}
      >
        <div>Hello World</div>
      </ProLayout>,
    );
    await waitTime(1000);

    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu-open').length,
    ).toBe(2);

    act(() => {
      Array.from(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'div.ant-pro-sider-collapsed-button',
        ),
      ).map((item) => item?.click());
    });

    await waitTime(1000);

    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu-open').length,
    ).toBe(0);

    act(() => {
      Array.from(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'div.ant-pro-sider-collapsed-button',
        ),
      ).map((item) => item?.click());
    });

    await waitTime(1000);

    expect(onCollapse).toBeCalledTimes(2);
    expect(
      html.baseElement.querySelectorAll('li.ant-menu-submenu-open').length,
    ).toBe(2);
  });

  it('🥩 ProLayout support suppressSiderWhenMenuEmpty', async () => {
    const handleClick = jest.fn();
    let serviceData = [
      {
        path: '/',
        name: '欢迎',
        routes: [
          {
            path: '/welcome',
            name: 'one',
            routes: [
              {
                path: '/welcome/welcome',
                name: 'two',
                exact: true,
              },
            ],
          },
        ],
      },
      {
        path: '/demo',
        name: '例子',
      },
    ];
    const actionRef = React.createRef<{
      reload: () => void;
    }>();
    const html = render(
      <ProLayout
        // @ts-ignore
        actionRef={actionRef}
        suppressSiderWhenMenuEmpty
        location={{ pathname: '/' }}
        menu={{
          request: async () => {
            return serviceData;
          },
        }}
      >
        <Button
          id="test_btn"
          onClick={() => {
            handleClick();
            serviceData = [];
            actionRef.current?.reload();
          }}
        >
          刷新菜单
        </Button>
      </ProLayout>,
    );

    await waitTime(1000);
    expect(html.baseElement.querySelectorAll('.ant-layout-sider').length).toBe(
      1,
    );
    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#test_btn')?.click();
    });

    await waitTime(1000);
    expect(handleClick).toHaveBeenCalled();
    expect(html.baseElement.querySelectorAll('.ant-layout-sider').length).toBe(
      0,
    );
  });
});
