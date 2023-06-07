import { PageHeader } from '@ant-design/pro-components';
import { act, fireEvent, render } from '@testing-library/react';
import { Breadcrumb } from 'antd';
import { _rs as onEsResize } from 'rc-resize-observer/es/utils/observerUtil';
import { _rs as onLibResize } from 'rc-resize-observer/lib/utils/observerUtil';

export const triggerResize = (target: Element) => {
  const originGetBoundingClientRect = target.getBoundingClientRect;

  target.getBoundingClientRect = () => ({ width: 510, height: 903 } as DOMRect);

  act(() => {
    onLibResize([{ target } as ResizeObserverEntry]);
    onEsResize([{ target } as ResizeObserverEntry]);
  });

  target.getBoundingClientRect = originGetBoundingClientRect;
};

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
    const callback = jest.fn(() => true);
    const { container } = render(
      <PageHeader title="Page Title" onBack={callback} />,
    );
    expect(container.querySelectorAll('.ant-page-header-back')).toHaveLength(1);
  });

  it('pageHeader onBack transfer', () => {
    const callback = jest.fn(() => true);
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
    expect(container.firstChild).toMatchSnapshot();
  });

  // it('change container width', async () => {
  //   const { container } = render(<PageHeader title="Page Title" extra="extra" />);
  //   triggerResize(container.firstChild as HTMLDivElement);
  //   await waitForWaitTime(1000);
  //   expect(
  //     container.querySelector('div.ant-page-header')?.className.includes('ant-page-header-compact'),
  //   ).toBeTruthy();
  // });
});
