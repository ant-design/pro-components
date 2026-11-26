import {
  ProCard,
  ProConfigProvider,
  ProForm,
  ProLayout,
  ProTable,
  useStyle,
} from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { describe, expect, it } from 'vitest';
import { extractProStyle } from '../../src/static-style-extract';

const Styled = () => {
  useStyle('ProZeroRuntimeTest', () => ({
    '.pro-zero-runtime-test': { color: 'red' },
  }));
  return <div className="pro-zero-runtime-test">content</div>;
};

const App = ({ zeroRuntime }: { zeroRuntime: boolean }) => (
  <ConfigProvider theme={{ hashed: false, zeroRuntime }}>
    <ProConfigProvider>
      <Styled />
    </ProConfigProvider>
  </ConfigProvider>
);

describe('Pro zeroRuntime', () => {
  it('does not inject Pro styles at runtime', () => {
    const view = render(<App zeroRuntime />);
    expect(view.container.querySelector('.pro-zero-runtime-test')).toBeTruthy();
    expect(
      Array.from(document.querySelectorAll('style[data-css-hash]')).some(
        (style) => style.textContent?.includes('.pro-zero-runtime-test'),
      ),
    ).toBe(false);
    view.unmount();
  });

  it('allows Pro styles to be extracted at build time', () => {
    expect(extractProStyle(<App zeroRuntime={false} />)).toContain(
      '.pro-zero-runtime-test',
    );
    expect(extractProStyle(<App zeroRuntime />)).not.toContain(
      '.pro-zero-runtime-test',
    );
  });

  it('extracts styles from a real Pro component', () => {
    const css = extractProStyle(
      <ConfigProvider theme={{ hashed: false }}>
        <ProCard title="Example">Content</ProCard>
      </ConfigProvider>,
    );
    expect(css).toContain('.ant-pro-card');
  });

  it('includes custom theme CSS variables for the first paint', () => {
    const css = extractProStyle(
      <ConfigProvider
        theme={{ hashed: false, token: { colorPrimary: '#123456' } }}
      >
        <ProCard title="Example">Content</ProCard>
      </ConfigProvider>,
    );
    expect(css).toContain('--ant-color-primary:#123456');
  });

  it('extracts Layout, Form, and Table styles', () => {
    const css = extractProStyle(
      <ConfigProvider theme={{ hashed: false }}>
        <>
          <ProLayout
            route={{ routes: [{ path: '/', name: 'Home' }] }}
            location={{ pathname: '/' }}
          >
            Content
          </ProLayout>
          <ProForm submitter={false} />
          <ProTable
            columns={[{ dataIndex: 'name', title: 'Name' }]}
            dataSource={[]}
            pagination={false}
          />
        </>
      </ConfigProvider>,
    );
    expect(css).toContain('.ant-pro-layout');
    expect(css).toContain('.ant-pro-form');
    expect(css).toContain('.ant-pro-table');
  });

  it('uses CSS variables and color-mix for theme-dependent Pro styles', () => {
    const css = extractProStyle(
      <ConfigProvider theme={{ hashed: false, cssVar: {} }}>
        <ProConfigProvider>
          <ProLayout location={{ pathname: '/' }}>
            <ProTable
              columns={[{ dataIndex: 'name', title: 'Name' }]}
              dataSource={[]}
              pagination={false}
            />
          </ProLayout>
        </ProConfigProvider>
      </ConfigProvider>,
    );
    expect(css).toMatch(
      /\.ant-pro-layout-bg-list\{[^}]*var\(--ant-color-bg-container\)/,
    );
    expect(css).toMatch(
      /\.ant-pro-table-search\{[^}]*var\(--ant-color-bg-container\)/,
    );
    expect(css).toContain('color-mix(in srgb, var(--ant-color-text-base)');
    expect(css).not.toMatch(/NaN|undefined|\[object Object\]|var\([^)]*\)px/);
  });

  it('follows the antd 6 default CSS variable mode', () => {
    const css = extractProStyle(
      <ConfigProvider theme={{ hashed: false }}>
        <ProCard title="Example">Content</ProCard>
      </ConfigProvider>,
    );
    expect(css).toContain('--ant-color-primary:#1677ff');
    expect(css).toMatch(
      /\.ant-pro-card\.ant-pro-card-legacy\{[^}]*background-color:var\(--ant-color-bg-container\)/,
    );
  });

  it('uses the configured class and CSS variable prefixes', () => {
    const css = extractProStyle(
      <ConfigProvider
        prefixCls="topiam"
        theme={{ hashed: false, cssVar: { prefix: 'topiam' } }}
      >
        <ProConfigProvider>
          <ProTable
            columns={[{ dataIndex: 'name', title: 'Name' }]}
            dataSource={[]}
            pagination={false}
          />
        </ProConfigProvider>
      </ConfigProvider>,
    );
    expect(css).toContain('.topiam-pro-table-search');
    expect(css).toContain('var(--topiam-color-bg-container)');
    expect(css).not.toContain('.ant-pro-');
    expect(css).not.toContain('var(--ant-');
  });
});
