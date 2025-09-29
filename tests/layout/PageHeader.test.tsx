import { cleanup, fireEvent, render } from '@testing-library/react';
import { PageHeader } from '@xxlabs/pro-components';
import { Breadcrumb, ConfigProvider } from 'antd';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('PageContainer', () => {
  it('💄 base use', async () => {
    const wrapper = render(<PageHeader title="期贤" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('pageHeader should not contain back it back', () => {
    const routes = [
      { path: 'index', breadcrumbName: 'First-level Menu' },
      { path: 'first', breadcrumbName: 'Second-level Menu' },
      { path: 'second', breadcrumbName: 'Third-level Menu' },
    ];
    const { container } = render(<PageHeader breadcrumb={{ routes }} title="Page Title" />);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should have breadcrumb', () => {
    const items = [{ path: 'index', title: 'First-level Menu' }];
    const { container } = render(<PageHeader breadcrumb={{ items }} title="Page Title" />);
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should have breadcrumb (component)', () => {
    const routes = [{ path: 'index', breadcrumbName: 'First-level Menu' }];
    const { container } = render(<PageHeader breadcrumb={<Breadcrumb items={routes} />} title="Page Title" />);
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader support breadcrumbRender', () => {
    const { container } = render(
      <PageHeader
        avatar={{
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
          alt: 'avatar',
        }}
        breadcrumbRender={() => <div id="test">test</div>}
        title="Page Title"
      />,
    );
    expect(container.querySelectorAll('#test')).toHaveLength(1);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader support breadcrumbRender return false', () => {
    const { container } = render(<PageHeader breadcrumbRender={() => false} title="Page Title" />);
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader do not has title', () => {
    const items = [{ path: 'index', title: 'First-level Menu' }];
    const { container } = render(<PageHeader breadcrumb={{ items }}>test</PageHeader>);
    expect(container.querySelector('.ant-page-header-heading-lef')).toBeFalsy();
    expect(container.querySelector('.ant-page-header-heading')).toBeFalsy();
  });

  it('pageHeader should no contain back', () => {
    const { container } = render(<PageHeader backIcon={false} title="Page Title" />);
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
    const { container } = render(<PageHeader title="Page Title" onBack={callback} />);
    fireEvent.click(container.querySelector('div.ant-page-header-back-button')!);
    expect(callback).toHaveBeenCalled();
  });

  it('pageHeader should support className', () => {
    const { container } = render(<PageHeader backIcon={false} className="not-works" title="Page Title" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('pageHeader should not render blank dom', () => {
    const { container } = render(<PageHeader title={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('breadcrumbs and back icon can coexist', () => {
    const items = [
      { path: 'index', title: 'First-level Menu' },
      { path: 'first', title: 'Second-level Menu' },
      { path: 'second', title: 'Third-level Menu' },
    ];
    const { container, rerender } = render(<PageHeader breadcrumb={{ items }} title="Title" />);
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
    rerender(<PageHeader breadcrumb={{ items }} title="Title" onBack={() => {}} />);
    expect(container.querySelectorAll('.ant-breadcrumb')).toHaveLength(1);
  });

  it('pageHeader should render correctly int RTL direction', () => {
    const { container } = render(<PageHeader title="Page Title" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
