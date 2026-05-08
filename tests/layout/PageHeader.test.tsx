import { PageHeader } from '@ant-design/pro-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Breadcrumb, ConfigProvider } from 'antd';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('PageContainer', () => {
  it('💄 base use', async () => {
    const wrapper = render(<PageHeader title="期贤" />);
    // 基础渲染：应正确渲染 title 文本
    expect(
      wrapper.container.querySelector('.ant-page-header-heading-title')
        ?.textContent,
    ).toBe('期贤');
    // 默认应渲染 page-header 容器
    expect(wrapper.container.querySelector('.ant-page-header')).toBeTruthy();
  });

  it('pageHeader should not contain back it back', () => {
    const routes = [
      { path: 'index', breadcrumbName: 'First-level Menu' },
      { path: 'first', breadcrumbName: 'Second-level Menu' },
      { path: 'second', breadcrumbName: 'Third-level Menu' },
    ];
    const { container } = render(
      <PageHeader title="Page Title" breadcrumb={{ routes }} />,
    );
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should have breadcrumb', () => {
    const items = [{ path: 'index', title: 'First-level Menu' }];
    const { container } = render(
      <PageHeader title="Page Title" breadcrumb={{ items }} />,
    );
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should have breadcrumb (component)', () => {
    const routes = [{ path: 'index', breadcrumbName: 'First-level Menu' }];
    const { container } = render(
      <PageHeader
        title="Page Title"
        breadcrumb={<Breadcrumb items={routes} />}
      />,
    );
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader support breadcrumbRender', () => {
    const { container } = render(
      <PageHeader
        title="Page Title"
        avatar={{
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
          alt: 'avatar',
        }}
        breadcrumbRender={() => <div id="test">test</div>}
      />,
    );
    expect(container.querySelectorAll('#test')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader support breadcrumbRender return false', () => {
    const { container } = render(
      <PageHeader title="Page Title" breadcrumbRender={() => false} />,
    );
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader do not has title', () => {
    const items = [{ path: 'index', title: 'First-level Menu' }];
    const { container } = render(
      <PageHeader breadcrumb={{ items }}>test</PageHeader>,
    );
    expect(container.querySelector('.ant-page-header-heading-lef')).toBeFalsy();
    expect(container.querySelector('.ant-page-header-heading')).toBeFalsy();
  });

  it('pageHeader should no contain back', () => {
    const { container } = render(
      <PageHeader title="Page Title" backIcon={false} />,
    );
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should contain back it back', () => {
    const callback = vi.fn(() => true);
    const { container } = render(
      <ConfigProvider direction="rtl">
        <PageHeader title="Page Title" onBack={callback} />
      </ConfigProvider>,
    );
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(1);
  });

  it('pageHeader onBack transfer', () => {
    const callback = vi.fn(() => true);
    const { container } = render(
      <PageHeader title="Page Title" onBack={callback} />,
    );
    fireEvent.click(
      container.querySelector('div.ant-page-header-back-button')!,
    );
    expect(callback).toHaveBeenCalled();
  });

  it('pageHeader should support className', () => {
    const { container } = render(
      <PageHeader title="Page Title" className="not-works" backIcon={false} />,
    );
    // 自定义 className 应附加到 page-header 根节点
    expect(container.firstChild).toHaveClass('not-works');
    expect(container.firstChild).toHaveClass('ant-page-header');
    // backIcon=false 时不应渲染返回按钮
    expect(container.querySelector('.ant-page-header-back')).toBeFalsy();
  });

  it('pageHeader should not render blank dom', () => {
    const { container } = render(<PageHeader title={false} />);
    // title=false 且无其他内容时，不应渲染空白 DOM
    // firstChild 应为 null（或者完全不渲染 page-header）
    expect(container.querySelector('.ant-page-header-heading')).toBeFalsy();
  });

  it('breadcrumbs and back icon can coexist', () => {
    const items = [
      { path: 'index', title: 'First-level Menu' },
      { path: 'first', title: 'Second-level Menu' },
      { path: 'second', title: 'Third-level Menu' },
    ];
    const { container, rerender } = render(
      <PageHeader title="Title" breadcrumb={{ items }} />,
    );
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    rerender(
      <PageHeader title="Title" breadcrumb={{ items }} onBack={() => {}} />,
    );
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
  });

  it('pageHeader should render correctly int RTL direction', () => {
    const { container } = render(<PageHeader title="Page Title" />);
    // 应正确渲染 title
    expect(
      container.querySelector('.ant-page-header-heading-title')?.textContent,
    ).toBe('Page Title');
    // 应渲染 page-header 根节点
    expect(container.firstChild).toHaveClass('ant-page-header');
  });
});
