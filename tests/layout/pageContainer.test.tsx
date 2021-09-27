import { render, mount } from 'enzyme';
import React, { useEffect, useMemo, useState } from 'react';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import BasicLayout, { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('PageContainer', () => {
  it('💄 base use', async () => {
    const html = render(<PageContainer title="期贤" />);
    expect(html).toMatchSnapshot();
  });

  it('💄 config is null', async () => {
    const html = render(<PageContainer />);
    expect(html).toMatchSnapshot();
  });

  it('💄 title,ghost,header,breadcrumbRender = false', async () => {
    const html = mount(
      <PageContainer title={false} ghost={false} header={undefined} breadcrumbRender={false}>
        qixian
      </PageContainer>,
    );
    expect(html.find('.ant-page-header').exists()).toBeFalsy();
  });

  it('⚡️ support footer', async () => {
    const wrapper = mount(
      <PageContainer
        title="期贤"
        footer={[
          <button type="button" key="button">
            right
          </button>,
        ]}
      />,
    );
    expect(wrapper?.find('.ant-pro-page-container-with-footer').length).toBe(1);
    const html = wrapper.render();
    expect(html).toMatchSnapshot();
  });

  it('⚡️ support fixedHeader', async () => {
    const html = render(<PageContainer title="期贤" fixedHeader />);
    expect(html).toMatchSnapshot();
  });

  it('⚡️ support fixHeader', async () => {
    const html = render(<PageContainer title="期贤" fixHeader />);
    expect(html).toMatchSnapshot();
  });

  it('⚡️ support loading', async () => {
    const html = render(<PageContainer title="期贤" loading />);
    expect(html).toMatchSnapshot();
  });

  it('⚡️ support more loading props', async () => {
    const html = render(<PageContainer title="期贤" loading={{ spinning: true, tip: '加载中' }} />);
    expect(html).toMatchSnapshot();
  });

  it('🔥 support footer and breadcrumb', async () => {
    const html = render(
      <PageContainer
        title="期贤"
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'home',
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
    expect(html).toMatchSnapshot();
  });

  it('🔥 footer bar support extra', async () => {
    const html = render(
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
    expect(html).toMatchSnapshot();
  });

  it('🔥 footer bar support renderContent', async () => {
    const html = render(
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
    expect(html).toMatchSnapshot();
  });

  it('🐲 footer should know width', async () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout>
        <PageContainer
          title="期贤"
          footer={[
            <button type="button" key="button">
              qixian
            </button>,
          ]}
        />
      </BasicLayout>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper?.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('calc(100% - 208px)');
    act(() => {
      wrapper.setProps({
        collapsed: true,
      });
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper?.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('calc(100% - 48px)');
    act(() => {
      wrapper.setProps({
        layout: 'top',
      });
    });
    expect(wrapper?.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('100%');
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('🐲 FooterToolbar should know width', async () => {
    const wrapper = mount<BasicLayoutProps>(
      <BasicLayout>
        <PageContainer>
          <FooterToolbar>
            <button type="button" key="button">
              qixian
            </button>
          </FooterToolbar>
        </PageContainer>
      </BasicLayout>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper?.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('calc(100% - 208px)');
    act(() => {
      wrapper.setProps({
        collapsed: true,
      });
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('calc(100% - 48px)');
    act(() => {
      wrapper.setProps({
        layout: 'top',
      });
    });
    expect(wrapper.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('100%');
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
    // test useUseEffect render function
    act(() => {
      wrapper.unmount();
    });
  });

  it('🐲 footer is null, do not render footerToolbar ', async () => {
    const wrapper = mount(
      <PageContainer
        footer={[
          <button type="button" key="button">
            qixian
          </button>,
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
    act(() => {
      wrapper.setProps({
        footer: undefined,
      });
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('🐲 prolayout support breadcrumbProps', async () => {
    const wrapper = render(
      <BasicLayout
        breadcrumbProps={{
          separator: '>',
          routes: [
            {
              path: 'index',
              breadcrumbName: 'home',
            },
            {
              path: 'first',
              breadcrumbName: 'first',
              children: [
                {
                  path: '/general',
                  breadcrumbName: 'General',
                },
                {
                  path: '/layout',
                  breadcrumbName: 'Layout',
                },
                {
                  path: '/navigation',
                  breadcrumbName: 'Navigation',
                },
              ],
            },
            {
              path: 'second',
              breadcrumbName: 'second',
            },
          ],
        }}
      >
        <PageContainer />
      </BasicLayout>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('🐲 header.footer is null, do not render footerToolbar ', async () => {
    const wrapper = mount(
      <PageContainer
        footer={[
          <button type="button" key="button">
            qixian
          </button>,
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-footer-bar').exists()).toBeTruthy();
    act(() => {
      wrapper.setProps({ footer: undefined });
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-footer-bar').exists()).toBeFalsy();
  });

  it('🐲 tabList and onTabChange is run', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <PageContainer
        title="标题"
        onTabChange={fn}
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-tabs-nav-list .ant-tabs-tab').at(1).simulate('click');
    });

    expect(fn).toBeCalledWith('info');
  });

  it('🐲 content is text and title is null', () => {
    const html = render(<PageContainer content="just so so" />);
    expect(html).toMatchSnapshot();

    const html2 = render(<PageContainer extraContent={<div>extraContent</div>} />);
    expect(html2).toMatchSnapshot();
  });

  it('🐛 className prop should not be passed to its page header, fix #3493', async () => {
    const wrapper = mount(
      <PageContainer
        className="custom-className"
        header={{
          title: '页面标题',
        }}
      />,
    );
    // 对于 enzyme 3.x，透传下去的 className，直接 find 的结果数为 2，同时包含 React 组件实例和 DOM 节点，需要用 hostNodes() 方法筛选出 DOM 节点
    // issue: https://github.com/enzymejs/enzyme/issues/836#issuecomment-401260477
    expect(wrapper?.find('.custom-className').hostNodes().length).toBe(1);
    const html = wrapper.render();
    expect(html).toMatchSnapshot();
  });

  it('🌛 PageContainer with custom loading', async (done) => {
    const App = () => {
      const loadingDom = useMemo(
        () => (
          <div id="customLoading" style={{ color: 'red', padding: '30px', textAlign: 'center' }}>
            自定义加载...
          </div>
        ),
        [],
      );
      const [loading, setLoading] = useState<React.ReactNode | false>(loadingDom);
      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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

    const wrapper = mount(<App />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#customLoading').length).toBe(1);
    const html = wrapper.render();
    expect(html).toMatchSnapshot();
    act(() => {
      setTimeout(() => {
        expect(wrapper.find('#customLoading').length).toBe(0);
      }, 1000);
      done();
    });
  });
});
