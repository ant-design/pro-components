import { render, mount } from 'enzyme';
import React from 'react';
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

  it('⚡️ support footer', async () => {
    const html = render(
      <PageContainer
        title="期贤"
        footer={[
          <button type="button" key="button">
            right
          </button>,
        ]}
      />,
    );
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
    wrapper.setProps({
      collapsed: true,
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper?.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('calc(100% - 48px)');

    wrapper.setProps({
      layout: 'top',
    });

    expect(wrapper?.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('100%');
    expect(wrapper.render()).toMatchSnapshot();
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
    wrapper.setProps({
      collapsed: true,
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('calc(100% - 48px)');

    wrapper.setProps({
      layout: 'top',
    });
    expect(wrapper.find('.ant-pro-footer-bar')?.props()?.style?.width).toBe('100%');
    expect(wrapper.render()).toMatchSnapshot();
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
    expect(wrapper.render()).toMatchSnapshot();

    wrapper.setProps({
      footer: undefined,
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🐲 prolayout support breadcrumbProps', async () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
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
    expect(wrapper.render()).toMatchSnapshot();

    wrapper.setProps({
      header: { footer: undefined },
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🐲  tabList and onTabChange is run', async () => {
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

  it('content is text and title is null', () => {
    const html = render(<PageContainer content="just so so" />);
    expect(html).toMatchSnapshot();

    const html2 = render(<PageContainer extraContent={<div>extraContent</div>} />);
    expect(html2).toMatchSnapshot();
  });
});
