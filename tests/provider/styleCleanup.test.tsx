import { StyleProvider, createCache } from '@ant-design/cssinjs';
import { ProConfigProvider, useStyle } from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { describe, expect, it } from 'vitest';

const Styled = () => {
  useStyle('ThemeCleanupTest', (token) => ({
    '.pro-theme-cleanup-test': { color: token.colorPrimary },
  }));
  return <div className="pro-theme-cleanup-test" />;
};

const Theme = ({ color }: { color: string }) => (
  <ConfigProvider theme={{ hashed: false, token: { colorPrimary: color } }}>
    <ProConfigProvider hashed={false}>
      <Styled />
    </ProConfigProvider>
  </ConfigProvider>
);

const activeStyles = () =>
  Array.from(document.querySelectorAll('style[data-css-hash]')).filter(
    (style) => style.textContent?.includes('.pro-theme-cleanup-test'),
  );

describe('Pro style cleanup', () => {
  it('removes unused styles after repeated theme changes', async () => {
    const view = render(<Theme color="#ff0000" />);
    for (const color of ['#0000ff', '#ff0000', '#0000ff']) {
      await act(async () => {
        view.rerender(<Theme color={color} />);
        await Promise.resolve();
      });
      expect(activeStyles()).toHaveLength(1);
      expect(activeStyles()[0].textContent).toContain(color);
    }
    view.unmount();
    await Promise.resolve();
    expect(activeStyles()).toHaveLength(0);
  });

  it('keeps a shared style until its last consumer unmounts', async () => {
    const view = render(<Theme color="#ff0000" />);
    const second = render(<Theme color="#ff0000" />);
    expect(activeStyles()).toHaveLength(1);
    view.unmount();
    await Promise.resolve();
    expect(activeStyles()).toHaveLength(1);
    second.unmount();
    await Promise.resolve();
    expect(activeStyles()).toHaveLength(0);
  });

  it('keeps a style shared by separate cssinjs caches', async () => {
    const first = render(
      <StyleProvider cache={createCache()}>
        <Theme color="#ff0000" />
      </StyleProvider>,
    );
    const second = render(
      <StyleProvider cache={createCache()}>
        <Theme color="#ff0000" />
      </StyleProvider>,
    );
    expect(activeStyles()).toHaveLength(1);
    first.unmount();
    await Promise.resolve();
    expect(activeStyles()).toHaveLength(1);
    second.unmount();
    await Promise.resolve();
    expect(activeStyles()).toHaveLength(0);
  });

  it('keeps the style when a consumer is replaced in one commit', async () => {
    const view = render(<Theme key="old" color="#ff0000" />);
    await act(async () => {
      view.rerender(<Theme key="new" color="#ff0000" />);
      await Promise.resolve();
    });
    expect(activeStyles()).toHaveLength(1);
    expect(activeStyles()[0].textContent).toContain('#ff0000');
    view.unmount();
    await Promise.resolve();
  });
});
