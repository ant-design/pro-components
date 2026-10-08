import { PageLoading } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('PageLoading prop stripping', () => {
  it('剥离 react-loadable 字段，不透传到 DOM；合法 Spin props 仍生效', () => {
    const retry = vi.fn();
    const { container } = render(
      <PageLoading
        isLoading
        pastDelay
        timedOut
        error={new Error('load failed')}
        retry={retry}
        spinning
        tip="加载中"
        className="money-page-loading"
        data-testid="page-loading-spin"
      />,
    );

    const html = container.innerHTML;
    expect(html).not.toContain('isLoading');
    expect(html).not.toContain('pastDelay');
    expect(html).not.toContain('timedOut');
    expect(html).not.toContain('load failed');
    expect(html).not.toContain('retry');

    // antd Spin 仍收到合法 props
    expect(container.querySelector('.money-page-loading')).toBeTruthy();
    expect(container.textContent).toContain('加载中');
    expect(retry).not.toHaveBeenCalled();
  });
});
