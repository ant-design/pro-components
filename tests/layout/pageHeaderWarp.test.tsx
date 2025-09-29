import { cleanup, render } from '@testing-library/react';
import { PageContainer, ProLayout } from '@xxlabs/pro-components';
import { afterEach, describe, expect, it } from 'vitest';
import defaultProps from './defaultProps';

afterEach(() => {
  cleanup();
});

describe('BasicLayout', () => {
  it('base use', () => {
    const { container } = render(
      <ProLayout {...defaultProps}>
        <PageContainer />
      </ProLayout>,
    );
    expect(container).toMatchSnapshot();
  });

  it('content is text', () => {
    const { container } = render(
      <ProLayout {...defaultProps}>
        <PageContainer content="just so so" />
      </ProLayout>,
    );

    expect(container).toMatchSnapshot();
  });

  it('title=false, don not render title view', async () => {
    const { container } = render(
      <ProLayout {...defaultProps}>
        <PageContainer title={false} />
      </ProLayout>,
    );

    expect(container.querySelectorAll('.ant-page-header-heading-title')).toHaveLength(0);
  });

  it('have default title', async () => {
    const { container } = render(
      <ProLayout {...defaultProps}>
        <PageContainer />
      </ProLayout>,
    );

    expect(container.querySelector('.ant-page-header-heading-title')!.innerHTML).toEqual('welcome');
  });

  it('title overrides the default title', async () => {
    const { container } = render(
      <ProLayout {...defaultProps}>
        <PageContainer title="name" />
      </ProLayout>,
    );

    expect(container.querySelector('.ant-page-header-heading-title')!.innerHTML).toEqual('name');
  });

  it('with default prefixCls props TopNavHeader', async () => {
    const { rerender, container } = render(
      <ProLayout {...defaultProps} splitMenus headerContentRender={() => <span />} isMobile={false} layout="mix">
        <PageContainer title="name" />
      </ProLayout>,
    );

    rerender(
      <ProLayout {...defaultProps} splitMenus headerContentRender={() => <span />} isMobile={false} layout="mix">
        <PageContainer title="name" />
      </ProLayout>,
    );
    const domHeader = container.querySelector('.ant-pro-top-nav-header-logo');

    expect(!!domHeader).toBe(true);
  });

  it('without custom prefixCls props TopNavHeader', async () => {
    const prefixCls = 'ant-oh-pro';
    const { container } = render(
      <ProLayout {...defaultProps} layout="top" prefixCls={prefixCls}>
        <PageContainer title="name" />
      </ProLayout>,
    );

    const domHeader = container.querySelector(`.${prefixCls}-top-nav-header-logo`)!;
    expect(!!domHeader).toBe(true);
  });

  it('pageHeaderRender return false', async () => {
    const { container, unmount } = render(
      <ProLayout {...defaultProps} layout="top">
        <PageContainer pageHeaderRender={() => null} title="name" />
      </ProLayout>,
    );

    const domHeader = container.querySelector('ant-page-header');

    expect(!!domHeader).toBeFalsy();
    unmount();
  });

  it('pageHeaderRender is false', async () => {
    const { container, unmount } = render(
      <ProLayout {...defaultProps} layout="top">
        <PageContainer pageHeaderRender={false} title="name" />
      </ProLayout>,
    );

    const domHeader = container.querySelector('ant-page-header');

    expect(!!domHeader).toBeFalsy();
    unmount();
  });
});
