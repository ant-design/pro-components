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
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('💄 config is null', async () => {
    const wrapper = render(<PageContainer />);
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(container).toMatchSnapshot();
  });

  it('⚡️ support fixedHeader', async () => {
    const html = render(<PageContainer title="期贤" fixedHeader />);
    expect(
      html.baseElement.querySelector('.ant-pro-sider-fixed'),
    ).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
      'width: calc(100% - 240px)',
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
      'width: calc(100% - 48px)',
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
    expect(container).toMatchSnapshot();
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
      'width: calc(100% - 240px)',
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
      'width: calc(100% - 48px)',
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
    expect(container).toMatchSnapshot();
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
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
    act(() => {
      wrapper.rerender(<PageContainer />);
    });
    await waitForWaitTime(100);
    act(() => {
      expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();

    const html2 = render(
      <PageContainer extraContent={<div>extraContent</div>} />,
    );
    expect(html2.asFragment()).toMatchSnapshot();
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

    expect(container.querySelectorAll('.custom-className')).toHaveLength(1);
    expect(container).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
