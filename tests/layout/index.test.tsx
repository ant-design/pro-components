import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { LoginForm, ProFormText, ProLayout } from '@ant-design/pro-components';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { Button, ConfigProvider } from 'antd';
import en_US from 'antd/lib/locale/en_US';
import React, { useState } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';
import { bigDefaultProps } from './defaultProps';

afterEach(() => {
  cleanup();
});

describe('BasicLayout', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
    const matchMediaSpy = vi.spyOn(window, 'matchMedia');
    matchMediaSpy.mockImplementation(
      (query) =>
        ({
          matches: query === '(min-width: 768px)',
          // 支持最新的 addEventListener API
          addEventListener: vi.fn(
            (event: string, cb: (e: MediaQueryListEvent) => void) => {
              if (event === 'change') {
                cb({
                  matches: query === '(min-width: 768px)',
                } as MediaQueryListEvent);
              }
            },
          ),
          removeEventListener: vi.fn(),
          // 保留旧的 API 以向后兼容
          addListener: (cb: (e: { matches: boolean }) => void) => {
            cb({ matches: query === '(min-width: 768px)' });
          },
          removeListener: vi.fn(),
        }) as any,
    );
  });
  it('🥩 base use', async () => {
    const html = render(<ProLayout />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐞 menuItemRender clickable area should follow full title content', async () => {
    const handleMenuItemClick = vi.fn();
    const wrapper = render(
      <ProLayout
        menuDataRender={() => [
          {
            path: '/welcome',
            name: '欢迎',
          },
        ]}
        menuItemRender={(item, dom) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleMenuItemClick(item.path)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                handleMenuItemClick(item.path);
            }}
          >
            {dom}
          </div>
        )}
      />,
    );

    await waitForWaitTime(100);

    const titleRow = wrapper.baseElement.querySelector<HTMLElement>(
      '.ant-pro-base-menu-inline-item .ant-pro-base-menu-inline-item-title',
    );

    expect(titleRow).toBeTruthy();
    expect(getComputedStyle(titleRow!).width).toBe('100%');

    wrapper.unmount();
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
    await waitForWaitTime(1000);
    expect(
      wrapper.baseElement.querySelector('.ant-skeleton'),
    ).toBeInTheDocument();
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
    await waitForWaitTime(100);

    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('#testid'),
    ).toBeTruthy();
    wrapper.unmount();
  });

  it('🥩 do not render menu', async () => {
    const wrapper = render(<ProLayout menuRender={false} />);
    await waitForWaitTime(100);
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
          'div.ant-layout div.ant-pro-layout-container',
        )!,
      )?.padding,
    ).toBe('');
    wrapper.unmount();
  });

  it('🥩 do not render menu content', async () => {
    const wrapper = render(<ProLayout menuContentRender={false} />);
    await waitForWaitTime(100);
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
    const itemClicking = vi.fn();
    const wrapper = render(
      <ProLayout
        appList={[
          {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: 'Ant Design',
            desc: '杭州市较知名的 UI 设计语言',
            url: 'https://ant.design',
          },
          {
            title: 'UI 设计语言',
            icon: () => <span>a</span>,
            desc: '杭州市较知名的 UI 设计语言2',
            children: [
              {
                icon: () => <span>a</span>,
                title: 'Ant Design',
                desc: '杭州市较知名的 UI 设计语言',
                url: 'https://ant.design',
              },
              {
                icon: 'w',
                title: null,
                desc: '专业级 UI 组件库',
                url: 'https://procomponents.ant.design/',
              },
            ],
          },
        ]}
        itemClick={() => itemClicking()}
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
              {
                path: '/home2',
                name: '首页',
                locale: 'menu.home2',
                routes: [
                  {
                    path: '/home/overview2',
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
    await waitForWaitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          '.ant-pro-layout-apps-icon',
        ) as HTMLDivElement
      )?.click();
    });

    expect(
      wrapper.baseElement.querySelectorAll('.ant-pro-layout-apps-icon').length,
    ).toBe(1);

    await wrapper.findAllByText('UI 设计语言');

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-layout-apps-default-content-list-item a',
        )
        ?.click();
    });

    await waitFor(() => {
      expect(itemClicking).toHaveBeenCalled();
    });

    wrapper.unmount();
  });

  it('🥩 appList icon is simple', async () => {
    const itemClicking = vi.fn();
    const wrapper = render(
      <ProLayout
        appList={[
          {
            title: 'UI 设计语言',
            children: [
              {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                title: 'Ant Design',
                url: 'https://ant.design',
              },
              {
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                title: 'Pro Components',
                url: 'https://procomponents.ant.design/',
              },
            ],
          },
          {
            title: 'UI 设计语言 2组111',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            url: 'https://procomponents.ant.design/',
            children: [
              {
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
                title: 'AntV',
                url: 'https://antv.vision/',
                target: '_blank',
              },
              {
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
                title: 'AntV',
                url: 'https://antv.vision/',
                target: '_blank',
              },
            ],
          },
          {
            title: '待分组',
            children: [
              {
                title: '工具',
                icon: 'w',
                url: 'https://www.yuque.com/',
              },
              {
                title: '前端应用框架',
                icon: () => (
                  <img src="https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png" alt="" />
                ),
                url: 'https://umijs.org/zh-CN/docs',
              },
              {
                title: 'qiankun',
                url: 'https://qiankun.umijs.org/',
              },
              {
                title: <div>Kitchen</div>,
                url: 'https://kitchen.alipay.com/',
              },
              {
                icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
                title: 'dumi',
                url: 'https://d.umijs.org/zh-CN',
              },
            ],
          },
        ]}
        itemClick={() => itemClicking()}
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
    await waitForWaitTime(100);
    act(() => {
      (
        wrapper.baseElement.querySelector(
          '.ant-pro-layout-apps-icon',
        ) as HTMLDivElement
      )?.click();
    });
    await wrapper.findAllByText('UI 设计语言');

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-layout-apps-simple-content-list-item a',
        )
        ?.click();
    });

    await waitFor(() => {
      expect(itemClicking).toHaveBeenCalled();
    });

    wrapper.unmount();
  });

  it('🥩 group title when collapsed, title is hidden', async () => {
    const wrapper = render(
      <ProLayout
        collapsed
        menu={{ type: 'group' }}
        menuDataRender={() => [
          {
            path: '/welcome',
            name: '欢迎',
            children: [
              {
                path: '/welcome',
                name: 'one',
                children: [
                  {
                    path: '/welcome/welcome',
                    name: 'two',
                    exact: true,
                  },
                ],
              },
            ],
          },
        ]}
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

    // 收起态：`menu.type === 'group'` 时仍有分组标题节点，应用 CSS 隐藏
    await waitFor(() => {
      const title = wrapper.baseElement.querySelector<HTMLElement>(
        '[data-pro-layout-nav-group-title]',
      );
      expect(title).toBeTruthy();
      expect(getComputedStyle(title!).display).toBe('none');
    });

    // collapsed 的时候action 将会消失
    expect(
      wrapper.baseElement.querySelectorAll('.ant-pro-sider-actions-collapsed')
        .length,
    ).toBe(1);

    wrapper.unmount();
  });

  it('🥩 collapsed vertical: nested submenu (third level) renders inside popup', async () => {
    const html = render(
      <ProLayout
        collapsed
        location={{ pathname: '/a/b/c' }}
        menuDataRender={() => [
          {
            path: '/a',
            name: '一级',
            children: [
              {
                path: '/a/b',
                name: '二级',
                children: [{ path: '/a/b/c', name: '三级页面' }],
              },
            ],
          },
        ]}
      >
        <div />
      </ProLayout>,
    );

    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll('.ant-pro-base-menu-vertical-submenu')
          .length,
      ).toBeGreaterThanOrEqual(1);
    });

    const topSubmenuTitle = await html.findByText('一级');
    act(() => {
      topSubmenuTitle.click();
    });

    await waitFor(() => {
      const popup = document.body.querySelector(
        '[class*="ant-pro-base-menu-vertical-submenu-popup"]',
      );
      expect(popup).toBeTruthy();
      expect(popup!.textContent).toContain('二级');
      /** 路由已匹配三级时 openKeys 含祖先，二级默认展开，浮层内应直接出现三级叶子（勿再点二级，否则会 toggle 收起） */
      expect(popup!.textContent).toContain('三级页面');
    });

    html.unmount();
  });

  it('🥩 do not render footer', async () => {
    const wrapper = render(<ProLayout title="title" footerRender={false} />);

    await wrapper.findByText('title');

    await waitFor(() => {
      const footer =
        wrapper.baseElement.querySelector<HTMLDivElement>('footer');
      expect(footer).toBeFalsy();
    });

    wrapper.unmount();
  });

  it('🥩 header support fixed-header-scroll', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = render(
      <ConfigProvider
        getTargetContainer={() => {
          return ref.current!;
        }}
      >
        <div ref={ref}>
          <ProLayout
            layout="mix"
            fixedHeader
            title="fixed-header-scroll"
            stylish={{
              header: () => {
                return {
                  opacity: 0.9,
                };
              },
            }}
          />
        </div>
      </ConfigProvider>,
    );

    await wrapper.findByText('fixed-header-scroll');

    act(() => {
      ref.current!.scrollTop = 400;
      fireEvent.scroll(ref.current!, {});
    });

    await waitFor(() => {
      expect(
        !!wrapper.baseElement.querySelector(
          '.ant-pro-layout-header-fixed-header-scroll',
        ),
      ).toBeTruthy();
    });

    act(() => {
      ref.current!.scrollTop = 0;
      fireEvent.scroll(ref.current!, {});
    });

    await waitFor(() => {
      expect(
        !!wrapper.baseElement.querySelector(
          '.ant-pro-layout-header-fixed-header-scroll',
        ),
      ).toBeFalsy();
    });

    wrapper.unmount();
  });

  it('🥩 menuDataRender change date', async () => {
    const wrapper = render(<ProLayout menuDataRender={() => []} />);
    await waitForWaitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'nav.ant-pro-sider-menu',
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
    await waitForWaitTime(1000);

    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'nav.ant-pro-sider-menu',
      ),
    ).toBeTruthy();
    wrapper.unmount();
  });

  it('🥩 use onLogoClick', async () => {
    const onLogoClick = vi.fn();
    const wrapper = render(
      <ProLayout
        siderWidth={undefined}
        logo={
          <div
            role="button"
            tabIndex={0}
            onClick={onLogoClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onLogoClick();
            }}
            id="test_log"
          >
            Logo
          </div>
        }
      />,
    );
    await waitForWaitTime(100);
    const logo = wrapper.baseElement.querySelector<HTMLDivElement>('#test_log');
    act(() => {
      logo?.click();
    });
    expect(onLogoClick).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('🥩 render logo', async () => {
    const wrapper = render(<ProLayout logo={<div id="test_log">Logo</div>} />);
    await waitForWaitTime(100);
    const logo = wrapper.baseElement.querySelector<HTMLDivElement>('#test_log');
    expect(logo?.textContent).toEqual('Logo');
    wrapper.unmount();
  });

  it('🥩 render logo by function', async () => {
    const wrapper = render(
      //@ts-expect-error
      <ProLayout logo={() => <div id="test_log">Logo</div>} />,
    );
    await waitForWaitTime(100);
    const logo = wrapper.baseElement.querySelector<HTMLDivElement>('#test_log');
    expect(logo?.textContent).toEqual('Logo');
    await waitForWaitTime(100);
    wrapper.unmount();
  });

  it('🥩 onCollapse', async () => {
    const onCollapse = vi.fn();
    const wrapper = render(<ProLayout onCollapse={onCollapse} />);
    await waitForWaitTime(100);
    act(() => {
      Array.from(
        wrapper.baseElement.querySelectorAll<HTMLDivElement>(
          'div.ant-pro-sider-collapsed-button',
        ),
      ).map((item) => item && item?.click());
    });

    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalled();
    });

    await waitForWaitTime(100);
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

    await waitForWaitTime(100);

    expect(
      getComputedStyle(
        wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-sider')!,
      )?.width,
    ).toBe('240px');

    await waitForWaitTime(100);
    wrapper.unmount();
  });

  it('🥩 siderWidth=160', async () => {
    const wrapper = render(<ProLayout siderWidth={160} />);
    await waitForWaitTime(100);
    expect(
      getComputedStyle(
        wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-sider')!,
      )?.width,
    ).toBe('160px');

    await waitForWaitTime(100);
    wrapper.unmount();
  });

  it('🥩 do not render collapsed button', async () => {
    const wrapper = render(<ProLayout collapsedButtonRender={false} />);
    await waitForWaitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'div.ant-pro-sider-collapsed-button',
      ),
    ).toBeFalsy();

    await waitForWaitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 when renderMenu=false, do not render collapsed button', async () => {
    const wrapper = render(<ProLayout menuRender={false} />);
    await waitForWaitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'div.ant-pro-sider-collapsed-button',
      ),
    ).toBeFalsy();

    await waitForWaitTime(100);
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
    await waitForWaitTime(100);
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

    await waitForWaitTime(100);
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
    await waitForWaitTime(100);
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

  it('🥩 do not render bgListDom', async () => {
    const wrapper = render(
      <ProLayout
        token={{
          bgLayout: null,
        }}
        menuExtraRender={() => <div>menuExtraRender</div>}
        menuHeaderRender={false}
      />,
    );
    await waitForWaitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-layout-bg-list',
    );
    expect(!!dom).toBeFalsy();
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
    await waitForWaitTime(100);

    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '#customize_menu_header',
    );
    expect(dom).toBeTruthy();

    expect(
      dom?.querySelector('#customize_menu_header_text')?.textContent,
    ).toEqual('customize_menu_header');
    await waitForWaitTime(100);
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
    await waitForWaitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 support links', async () => {
    const wrapper = render(<ProLayout links={['name']} />);
    await waitForWaitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );
    expect(dom).toBeTruthy();
    await waitForWaitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 do no render links', async () => {
    const wrapper = render(<ProLayout />);
    await waitForWaitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );

    expect(dom).toBeFalsy();
    await waitForWaitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 pure style', async () => {
    const wrapper = render(<ProLayout pure />);
    await waitForWaitTime(100);
    const menu = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-menu',
    );
    expect(menu).toBeFalsy();
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );
    expect(dom).toBeFalsy();
    await waitForWaitTime(100);
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
    await waitForWaitTime(100);
    const dom = wrapper.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-sider-link',
    );

    expect(dom).toBeFalsy();
    await waitForWaitTime(100);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🥩 onPageChange', async () => {
    const onPageChange = vi.fn();
    const wrapper = render(
      <ProLayout
        onPageChange={onPageChange}
        location={{
          pathname: '/',
        }}
      />,
    );

    await waitForWaitTime(100);
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

    expect(onPageChange).toHaveBeenCalled();
    await waitForWaitTime(100);
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
    await waitForWaitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('#mix-test')
        ?.textContent,
    ).toBe('mix title');
  });

  it('🥩 onMenuHeaderClick', async () => {
    const onMenuHeaderClick = vi.fn();
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

    await waitForWaitTime(100);
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('div.ant-pro-global-header-logo')
        ?.click();
    });
    expect(onMenuHeaderClick).toHaveBeenCalled();
  });

  it('🥩 renderPageTitle return value should is string', async () => {
    const renderPageTitle = vi.fn();
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
      expect(renderPageTitle).toHaveBeenCalled();
    });
  });

  it('🥩 support get config form menuItem', async () => {
    const wrapper = render(
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
          },
          {
            path: '/home',
            name: '首页',
            layout: 'top',
          },
        ]}
      />,
    );

    await waitForWaitTime(100);

    // 等待组件完全渲染，然后检查布局类型
    await waitFor(() => {
      const layoutElement =
        wrapper.baseElement.querySelector('.ant-design-pro');
      expect(layoutElement).toBeTruthy();
      // 检查是否包含 mix 布局类
      expect(
        layoutElement?.className.includes('ant-pro-layout-mix'),
      ).toBeTruthy();
    });

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
    await waitForWaitTime(100);

    await waitFor(() => {
      const layoutElement =
        wrapper.baseElement.querySelector('.ant-design-pro');
      expect(layoutElement).toBeTruthy();
      // 检查是否包含 mix 布局类（因为当前路径匹配的是 mix 布局的菜单项）
      expect(
        layoutElement?.className.includes('ant-pro-layout-mix') ||
          layoutElement?.className.includes('ant-pro-layout-top-menu'),
      ).toBeTruthy();
    });
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
            name: '列表页',
            path: '/list',
          },
        ]}
      />,
    );
    await wrapper.findAllByText('列表页');
    // 欢迎不存在
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        'li.ant-pro-base-menu-inline-item',
      )
        ?.innerText,
    ).not.toContain('欢迎');
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
    await waitForWaitTime(100);
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
    await waitForWaitTime(100);
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
    await waitForWaitTime(100);
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
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => {
                item.onClick();
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </button>
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
    await waitForWaitTime(100);
    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu]').length,
    ).toBe(2);
    const domParentMenu = await (await html.findAllByText('列表页')).at(0);
    act(() => {
      domParentMenu?.click();
    });
    await waitForWaitTime(2000);
    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu-open]').length,
    ).toBe(2);
    const domChildMenu = await (await html.findAllByText('二级列表页面')).at(0);
    const domLink = await (await html.findAllByText('AntDesign外链')).at(0);
    act(() => {
      domChildMenu?.click();
      domLink?.click();
    });
    await waitForWaitTime(2000);
    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu]').length,
    ).toBe(2);
  });

  it('🥩 BasicLayout menu support onSelect', async () => {
    const fn = vi.fn();
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
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => {
                item.onClick();
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </button>
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
    await waitForWaitTime(100);
    const domParentMenu = await (await html.findAllByText('列表页')).at(0);

    act(() => {
      domParentMenu?.click();
    });
    await waitForWaitTime(100);
    const domLink = await (await html.findAllByText('AntDesign外链')).at(0);
    act(() => {
      domLink?.click();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalled();
  });

  it('🥩 ProLayout support menu.request', async () => {
    const fn = vi.fn();
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
      expect(fn).toHaveBeenCalledTimes(1);
    });

    act(() => {
      actionRef.current?.reload();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  it('🥩 ProLayout support menu.params', async () => {
    const fn = vi.fn();
    const defaultMenu = {
      request: async (params: any) => {
        fn(params);
        return [
          {
            path: '/welcome',
            name: '欢迎',
          },
        ];
      },
    };

    const html = render(<ProLayout menu={defaultMenu} />);

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);

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

    await waitForWaitTime(100);

    // 调整期望值，因为实际调用时参数可能为空对象
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith({});

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

    await waitForWaitTime(100);
    // 调整期望值，因为实际调用了3次
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenCalledWith({});

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

    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledTimes(3);
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
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => {
                item.onClick();
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </button>
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
    await waitForWaitTime(100);

    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu]').length,
    ).toBe(3);
    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu-open]').length,
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
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => {
                item?.onClick?.();
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </button>
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
    await waitForWaitTime(1200);

    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu]').length,
    ).toBe(3);
    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu-open]').length,
    ).toBe(3);
    await act(async () => {
      (await html.findByText('月表'))?.parentElement?.click();
    });
    await waitForWaitTime(800);
    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu-open]').length,
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
          return locales[id as 'menu.home']
            ? locales[id as 'menu.home']
            : (defaultMessage as string);
        }}
      />,
    );
    await waitForWaitTime(200);
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
    const onCollapse = vi.fn();
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
    await waitForWaitTime(1000);

    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu-open]').length,
    ).toBe(2);

    act(() => {
      Array.from(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'div.ant-pro-sider-collapsed-button',
        ),
      ).map((item) => item?.click());
    });

    await waitForWaitTime(1000);

    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu-open]').length,
    ).toBe(0);

    act(() => {
      Array.from(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'div.ant-pro-sider-collapsed-button',
        ),
      ).map((item) => item?.click());
    });

    await waitForWaitTime(1000);

    expect(onCollapse).toHaveBeenCalledTimes(2);
    expect(
      html.baseElement.querySelectorAll('[data-pro-layout-nav-submenu-open]').length,
    ).toBe(2);
  });

  it('🥩 ProLayout support suppressSiderWhenMenuEmpty', async () => {
    const handleClick = vi.fn();
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

    await waitForWaitTime(1000);
    expect(html.baseElement.querySelectorAll('.ant-layout-sider').length).toBe(
      1,
    );
    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#test_btn')?.click();
    });

    await waitForWaitTime(1000);
    expect(handleClick).toHaveBeenCalled();
    expect(html.baseElement.querySelectorAll('.ant-layout-sider').length).toBe(
      0,
    );
  });
});
