import {
  FooterToolbar,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Button, Skeleton } from 'antd';
import React, { act, useEffect, useMemo, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

describe('PageContainer', () => {
  it('💄 base use', async () => {
    const wrapper = render(<PageContainer title="期贤" />);
    // 应正确渲染 title 文本
    expect(
      wrapper.container.querySelector('.ant-page-header-heading-title')
        ?.textContent,
    ).toBe('期贤');
    // 应渲染 PageContainer 与 page-header
    expect(
      wrapper.container.querySelector('.ant-pro-page-container'),
    ).toBeTruthy();
    expect(wrapper.container.querySelector('.ant-page-header')).toBeTruthy();
  });

  it('💄 config is null', async () => {
    const wrapper = render(<PageContainer />);
    // 无 props 时仍应渲染 PageContainer 容器
    expect(
      wrapper.container.querySelector('.ant-pro-page-container'),
    ).toBeTruthy();
  });

  it('💄 title,ghost,header,breadcrumbRender = false', async () => {
    const { container } = render(
      <PageContainer
        title={false}
        ghost={false}
        header={undefined}
        breadcrumbRender={false}
      >
        qixian
      </PageContainer>,
    );
    expect(!!container.querySelectorAll('.ant-page-header').length).toBeFalsy();
  });

  it('💄 has PageContainer className', async () => {
    const Demo = () => {
      const [state, setState] = useState(0);
      return (
        <ProLayout>
          <Button
            onClick={() => {
              setState((num) => num + 1);
            }}
          >
            切换
          </Button>
          {state > 0 && state < 3 ? (
            <PageContainer
              title={false}
              ghost={false}
              header={undefined}
              breadcrumbRender={false}
            >
              qixian
            </PageContainer>
          ) : null}
          {state > 1 && state < 4 ? (
            <PageContainer
              title={false}
              ghost={false}
              header={undefined}
              breadcrumbRender={false}
            >
              qixian2
            </PageContainer>
          ) : null}
        </ProLayout>
      );
    };
    const html = render(<Demo />);

    expect(
      !!html.baseElement.querySelector(
        '.ant-pro-layout-content-has-page-container',
      ),
    ).toBeFalsy();

    await act(async () => {
      (await html.findByText('切 换'))?.click?.();
    });

    expect(
      !!html.baseElement.querySelector(
        '.ant-pro-layout-content-has-page-container',
      ),
    ).toBeTruthy();

    await act(async () => {
      (await html.findByText('切 换'))?.click?.();
    });

    expect(
      !!html.baseElement.querySelector(
        '.ant-pro-layout-content-has-page-container',
      ),
    ).toBeTruthy();

    await act(async () => {
      (await html.findByText('切 换'))?.click?.();
    });

    expect(
      !!html.baseElement.querySelector(
        '.ant-pro-layout-content-has-page-container',
      ),
    ).toBeTruthy();

    await act(async () => {
      (await html.findByText('切 换'))?.click?.();
    });

    expect(
      !!html.baseElement.querySelector(
        'ant-pro-layout-content-has-page-container',
      ),
    ).toBeFalsy();
  });

  it('💄 pageContainer support breadcrumbRender', async () => {
    const { container } = render(
      <PageContainer breadcrumbRender={() => <div>这里是面包屑</div>}>
        content
      </PageContainer>,
    );

    expect(
      container
        .querySelectorAll('.ant-page-header-has-breadcrumb')[0]
        .querySelector('div'),
    ).toHaveTextContent('这里是面包屑');
  });

  it('💄 pageContainer support tabBarExtraContent', async () => {
    const { container } = render(
      <PageContainer tabBarExtraContent="测试">content</PageContainer>,
    );

    expect(
      container.querySelectorAll('.ant-tabs-extra-content')[0],
    ).toHaveTextContent('测试');
  });

  it('⚡️ support footer', async () => {
    const { container } = render(
      <PageContainer
        title="期贤"
        footer={[
          <button type="button" key="button">
            right
          </button>,
        ]}
      />,
    );

    expect(
      container.querySelectorAll('.ant-pro-page-container-with-footer'),
    ).toHaveLength(1);
    // 应渲染 footer 区域，且包含传入的 button
    const footerBar = container.querySelector('.ant-pro-footer-bar');
    expect(footerBar).toBeTruthy();
    expect(footerBar?.textContent).toContain('right');
  });

  it('⚡️ support fixedHeader', async () => {
    const html = render(<PageContainer title="期贤" fixedHeader />);
    // fixedHeader=true 时不应渲染 sider-fixed（因为外层无 ProLayout）
    // 但 page-header 应固定渲染并显示 title
    expect(
      html.baseElement.querySelector('.ant-page-header-heading-title')
        ?.textContent,
    ).toBe('期贤');
  });

  it('⚡️ support loading', async () => {
    const html = render(<PageContainer title="期贤" loading={<Skeleton />} />);
    expect(html.baseElement.querySelector('.ant-skeleton')).toBeInTheDocument();
  });

  it('⚡️ support more loading props', async () => {
    const wrapper = render(
      <PageContainer
        title="期贤"
        loading={{ spinning: true, tip: '加载中' }}
      />,
    );
    // loading 对象形式应渲染 spin + tip 文本
    expect(wrapper.container.querySelector('.ant-spin')).toBeTruthy();
    expect(wrapper.container.querySelector('.ant-spin-spinning')).toBeTruthy();
    // tip 文本应正常渲染（antd 中文之间会插入空格）
    expect(wrapper.container.textContent?.replace(/\s/g, '')).toContain(
      '加载中',
    );
  });

  it('🔥 support footer and breadcrumb', async () => {
    const wrapper = render(
      <PageContainer
        title="期贤"
        breadcrumb={{
          items: [
            {
              path: '/',
              title: 'home',
            },
          ],
        }}
        footer={[
          <button key="right" type="button">
            right
          </button>,
        ]}
      />,
    );
    // 应同时渲染 breadcrumb 与 footer
    expect(wrapper.container.querySelector('.ant-breadcrumb')).toBeTruthy();
    expect(wrapper.container.querySelector('.ant-pro-footer-bar')).toBeTruthy();
    // breadcrumb 内应包含 home 文本
    expect(
      wrapper.container.querySelector('.ant-breadcrumb')?.textContent,
    ).toContain('home');
  });

  it('🔥 footer bar support extra', async () => {
    const wrapper = render(
      <FooterToolbar
        className="qixian_footer"
        extra={
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="logo"
          />
        }
      >
        <button key="button" type="button">
          right
        </button>
      </FooterToolbar>,
    );
    // 自定义 className 应附加到 footer-bar
    const footerBar = wrapper.container.querySelector('.qixian_footer');
    expect(footerBar).toBeTruthy();
    // extra 中的 img 应渲染
    expect(wrapper.container.querySelector('img[alt="logo"]')).toBeTruthy();
    // children 中的 button 应渲染
    expect(wrapper.container.querySelector('button')).toBeTruthy();
  });

  it('🔥 footer bar support renderContent', async () => {
    const wrapper = render(
      <FooterToolbar
        className="qixian_footer"
        extra={
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="logo"
          />
        }
        renderContent={() => {
          return 'home_toolbar';
        }}
      >
        <button key="button" type="button">
          right
        </button>
      </FooterToolbar>,
    );
    // renderContent 返回的文本应替代 children 渲染
    expect(wrapper.container.textContent).toContain('home_toolbar');
    // children button 不应渲染
    expect(wrapper.container.querySelector('button')).toBeFalsy();
  });

  it('🐲 footer should know width', async () => {
    const { container, rerender } = render(
      <ProLayout>
        <PageContainer
          title="期贤"
          footer={[
            <button type="button" key="button">
              qixian
            </button>,
          ]}
        />
      </ProLayout>,
    );

    expect(container.querySelector('.ant-pro-footer-bar')).toHaveStyle(
      'width: calc(100% - 235px)',
    );

    rerender(
      <ProLayout collapsed>
        <PageContainer
          title="期贤"
          footer={[
            <button type="button" key="button">
              qixian
            </button>,
          ]}
        />
      </ProLayout>,
    );

    expect(container.querySelector('.ant-pro-footer-bar')).toHaveStyle(
      'width: calc(100% - 64px)',
    );

    rerender(
      <ProLayout layout="top">
        <PageContainer
          title="期贤"
          footer={[
            <button type="button" key="button">
              qixian
            </button>,
          ]}
        />
      </ProLayout>,
    );

    expect(container.querySelector('.ant-pro-footer-bar')).toHaveStyle(
      'width: 100%',
    );
    // layout="top" 时 footer-bar 宽度撑满，且仍渲染传入按钮
    expect(
      container.querySelector('.ant-pro-footer-bar')?.textContent,
    ).toContain('qixian');
  });

  it('🐲 FooterToolbar should know width', async () => {
    const { container, rerender, unmount } = render(
      <ProLayout>
        <PageContainer>
          <FooterToolbar
            stylish={() => {
              return {
                height: '100%',
              };
            }}
          >
            <button type="button" key="button">
              qixian
            </button>
          </FooterToolbar>
        </PageContainer>
      </ProLayout>,
    );
    expect(container.querySelector('.ant-pro-footer-bar')).toHaveStyle(
      'width: calc(100% - 235px)',
    );

    rerender(
      <ProLayout collapsed>
        <PageContainer>
          <FooterToolbar>
            <button type="button" key="button">
              qixian
            </button>
          </FooterToolbar>
        </PageContainer>
      </ProLayout>,
    );

    expect(container.querySelector('.ant-pro-footer-bar')).toHaveStyle(
      'width: calc(100% - 64px)',
    );

    rerender(
      <ProLayout layout="top">
        <PageContainer>
          <FooterToolbar>
            <button type="button" key="button">
              qixian
            </button>
          </FooterToolbar>
        </PageContainer>
      </ProLayout>,
    );

    expect(container.querySelector('.ant-pro-footer-bar')).toHaveStyle(
      'width: 100%',
    );
    // 三次 rerender 后，footer-bar 仍正常渲染，且按钮仍存在
    expect(container.querySelector('.ant-pro-footer-bar')).toBeTruthy();
    expect(container.querySelector('button')?.textContent).toBe('qixian');
    // test useUseEffect render function
    unmount();
  });

  it('🐲 footer is null, do not render footerToolbar ', async () => {
    const wrapper = render(
      <PageContainer
        footer={[
          <button type="button" key="button">
            qixian
          </button>,
        ]}
      />,
    );
    await waitForWaitTime(100);
    act(() => {
      // 有 footer 时应渲染 footer-bar
      expect(
        wrapper.container.querySelector('.ant-pro-footer-bar'),
      ).toBeTruthy();
      expect(wrapper.container.querySelector('button')?.textContent).toBe(
        'qixian',
      );
    });
    act(() => {
      wrapper.rerender(<PageContainer />);
    });
    await waitForWaitTime(100);
    act(() => {
      // 移除 footer 后，footer-bar 应被销毁
      expect(
        wrapper.container.querySelector('.ant-pro-footer-bar'),
      ).toBeFalsy();
    });
  });

  it('🐲 pro-layout support breadcrumbProps', async () => {
    const wrapper = render(
      <ProLayout
        breadcrumbProps={{
          separator: '>',
          items: [
            {
              path: 'index',
              title: 'home',
            },
            {
              path: 'first',
              title: 'first',
              children: [
                {
                  path: '/general',
                  title: 'General',
                },
                {
                  path: '/layout',
                  title: 'Layout',
                },
                {
                  path: '/navigation',
                  title: 'Navigation',
                },
              ],
            },
            {
              path: 'second',
              title: 'second',
            },
          ],
        }}
      >
        <PageContainer />
      </ProLayout>,
    );
    // breadcrumbProps 应正确渲染，包含 home/first/second 各级菜单
    const breadcrumb = wrapper.baseElement.querySelector('.ant-breadcrumb');
    expect(breadcrumb).toBeTruthy();
    expect(breadcrumb?.textContent).toContain('home');
    expect(breadcrumb?.textContent).toContain('first');
    expect(breadcrumb?.textContent).toContain('second');
    // 自定义 separator '>' 应生效
    expect(
      wrapper.baseElement.querySelectorAll('.ant-breadcrumb-separator').length,
    ).toBeGreaterThan(0);
  });

  it('🐲 header.footer is null, do not render footerToolbar ', async () => {
    const { container, rerender } = render(
      <PageContainer
        footer={[
          <button type="button" key="button">
            qixian
          </button>,
        ]}
      />,
    );

    expect(container.querySelector('.ant-pro-footer-bar')).toBeTruthy();

    rerender(<PageContainer footer={undefined} />);

    expect(container.querySelector('.ant-pro-footer-bar')).toBeFalsy();
  });

  it('🐲 tabList and onTabChange is run', async () => {
    const fn = vi.fn();
    const { container } = render(
      <PageContainer
        title="标题"
        onTabChange={fn}
        tabProps={{
          type: 'card',
        }}
        tabList={[
          {
            tab: '基本信息',
            key: 'base',
          },
          {
            tab: '详细信息',
            key: 'info',
          },
        ]}
      />,
    );

    // In Ant Design v5, the tab button is inside a div with role="tab"
    const tabs = container.querySelectorAll('[role="tab"]');
    fireEvent.click(tabs[1]);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('info');
    });
  });

  it('🐲 content is text and title is null', () => {
    const wrapper = render(<PageContainer content="just so so" />);
    // content 文本应正常渲染
    expect(wrapper.container.textContent).toContain('just so so');
    // 无 title 时不应渲染 title 元素
    expect(
      wrapper.container.querySelector('.ant-page-header-heading-title')
        ?.textContent,
    ).toBeFalsy();

    const html2 = render(
      <PageContainer extraContent={<div>extraContent</div>} />,
    );
    // extraContent 应渲染
    expect(html2.container.textContent).toContain('extraContent');
  });

  it('🐛 className prop should not be passed to its page header, fix #3493', async () => {
    const { container } = render(
      <PageContainer
        className="custom-className"
        header={{
          title: '页面标题',
        }}
      />,
    );

    // className 只应附加到 PageContainer 根节点，不应传递到 page-header（fix #3493）
    expect(container.querySelectorAll('.custom-className')).toHaveLength(1);
    // page-header 不应带 custom-className
    expect(
      container
        .querySelector('.ant-page-header')
        ?.classList.contains('custom-className'),
    ).toBe(false);
    // header.title 应渲染
    expect(
      container.querySelector('.ant-page-header-heading-title')?.textContent,
    ).toBe('页面标题');
  });

  it('🌛 PageContainer with custom loading', async () => {
    const App = () => {
      const loadingDom = useMemo(
        () => (
          <div
            id="customLoading"
            style={{ color: 'red', padding: '30px', textAlign: 'center' }}
          >
            自定义加载...
          </div>
        ),
        [],
      );
      const [loading, setLoading] = useState<React.ReactNode | false>(
        loadingDom,
      );
      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }, []);
      return (
        <PageContainer
          loading={loading}
          className="custom-className"
          header={{
            title: '页面标题',
          }}
        />
      );
    };

    const wrapper = render(<App />);
    await waitForWaitTime(100);
    expect(wrapper.baseElement.querySelectorAll('#customLoading').length).toBe(
      1,
    );
    // 自定义 loading dom 文本应被渲染
    expect(wrapper.baseElement.textContent).toContain('自定义加载...');
    await waitForWaitTime(1000);
    expect(wrapper.baseElement.querySelectorAll('#customLoading').length).toBe(
      0,
    );
  });

  it('🐛 breadcrumbRender and restProps?.header?.breadcrumbRender', async () => {
    const html = render(
      <PageContainer
        className="custom-className"
        breadcrumbRender={false}
        header={{
          breadcrumbRender: () => 'diss',
        }}
      />,
    );

    // 当 breadcrumbRender={false} 时，面包屑应该被禁用
    expect(
      html.container.querySelector('.ant-page-header-has-breadcrumb'),
    ).toBeNull();

    html.rerender(
      <PageContainer
        className="custom-className"
        header={{
          breadcrumbRender: () => 'diss',
        }}
      />,
    );
    expect(
      html.container.getElementsByClassName('ant-page-header-has-breadcrumb')[0]
        .innerHTML,
    ).toBe('diss');
  });
});
