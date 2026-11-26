// @vitest-environment node
import {
  ProCard,
  ProConfigProvider,
  useStyle,
} from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';
import { describe, expect, it } from 'vitest';
import {
  extractAllProStyle,
  extractProStyle,
  proStyleComponentNames,
} from '../../src/static-style-extract';

describe('full ProComponents static style extraction', () => {
  it('extracts a component manifest while production zeroRuntime is enabled', () => {
    const css = extractAllProStyle({
      includes: ['ProLayout', 'ProTable'],
      customTheme: { zeroRuntime: true },
    });
    expect(css).toMatch(
      /\.ant-pro-layout-bg-list\{[^}]*var\(--ant-color-bg-container\)/,
    );
    expect(css).toMatch(
      /\.ant-pro-table-search\{[^}]*var\(--ant-color-bg-container\)/,
    );
    expect(css).not.toContain('<style');
    expect(css).not.toMatch(/NaN|undefined|\[object Object\]|var\([^)]*\)px/);
  });

  it('extracts only Pro styles without antd rules or theme token declarations', () => {
    const css = extractAllProStyle({ includes: ['ProCard', 'ProTable'] });
    expect(css).not.toContain('@layer antd-pro');
    expect(css).toContain('.ant-pro-card');
    expect(css).toContain('.ant-pro-table-search');
    expect(css).not.toContain('@layer antd{');
    expect(css).not.toMatch(/\.ant-btn\{/);
    expect(css).not.toMatch(/--[\w-]+:[^;]*(#[\da-f]{3,8}|rgba?\()/i);
    expect(css).not.toMatch(/(^|})\s*\.css-var-[\w-]+/);
    expect(css).toContain('var(--ant-color-bg-container)');

    const layeredCss = extractAllProStyle({
      includes: ['ProCard'],
      layer: true,
    });
    expect(layeredCss).toContain('@layer antd-pro{');
  });

  it('extracts every built-in styled family as valid, variable-based CSS', () => {
    const css = extractAllProStyle();
    expect(proStyleComponentNames.length).toBeGreaterThanOrEqual(24);
    for (const selector of [
      '.ant-pro-layout-bg-list',
      '.ant-pro-table-search',
      '.ant-pro-form',
      '.ant-pro-card',
      '.ant-pro-checkcard',
      '.ant-pro-list',
      '.ant-pro-help',
      '.ant-pro-field-readonly-textarea',
    ]) {
      expect(css).toContain(selector);
    }
    expect(css).toContain('color-mix(in srgb, var(--ant-color-text-base)');
    expect(css).not.toMatch(/@media[^{]*(?:min|max)-width:\s*\d+\)/);
    expect(css).not.toMatch(/NaN|undefined|\[object Object\]|var\([^)]*\)px/);
  });

  it('supports filtering, custom renderers, themes and both prefixes', () => {
    const css = extractAllProStyle({
      prefixCls: 'topiam',
      includes: ['ProTable', 'CustomState'],
      excludes: ['ProLayout'],
      customTheme: {
        zeroRuntime: true,
        token: { colorPrimary: '#123456' },
      },
      customizeRender: {
        CustomState: () => <ProCard title="Custom">Content</ProCard>,
      },
      wrap: (node) => (
        <ProConfigProvider token={{ colorInfo: '#123456' }}>
          {node}
        </ProConfigProvider>
      ),
    });
    expect(css).toContain('.topiam-pro-table-search');
    expect(css).toContain('var(--topiam-color-bg-container)');
    expect(css).not.toContain('.topiam-pro-layout-bg-list');
    expect(css).not.toContain('.ant-pro-');
    expect(css).not.toContain('var(--ant-');
  });

  it('preserves explicit ProConfigProvider tokens provided by wrap', () => {
    const CustomStyledWidget = () => {
      const { wrapSSR } = useStyle('CustomWrapTokenWidget', (token) => ({
        '.custom-wrap-token-widget': {
          fontSize: token.fontSize,
        },
      }));
      return wrapSSR(<div className="custom-wrap-token-widget" />);
    };
    const css = extractAllProStyle({
      prefixCls: 'topiam',
      includes: ['CustomWrapTokenWidget'],
      customizeRender: {
        CustomWrapTokenWidget: () => <CustomStyledWidget />,
      },
      wrap: (node) => (
        <ProConfigProvider token={{ fontSize: 42 }}>{node}</ProConfigProvider>
      ),
    });
    expect(css).toMatch(/\.custom-wrap-token-widget\{[^}]*font-size:42px/);
  });

  it('preserves variable references under dark and compact algorithms', () => {
    const css = extractAllProStyle({
      includes: ['ProLayout', 'ProTable', 'CheckCard'],
      customTheme: {
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        token: { colorPrimary: '#123456' },
      },
    });
    expect(css).toMatch(
      /\.ant-pro-layout-bg-list\{[^}]*var\(--ant-color-bg-container\)/,
    );
    expect(css).toMatch(/calc\(var\(--ant-border-radius\) \+ 4px\)/);
    expect(css).not.toMatch(/NaN|undefined|\[object Object\]|var\([^)]*\)px/);
  });

  it('preserves the legacy node-only extraction API', () => {
    expect(
      extractProStyle(
        <ConfigProvider theme={{ hashed: false, zeroRuntime: true }}>
          <ProCard title="Card" />
        </ConfigProvider>,
      ),
    ).not.toContain('.ant-pro-card');
    expect(
      extractProStyle(
        <ConfigProvider theme={{ hashed: false, zeroRuntime: false }}>
          <ProCard title="Card" />
        </ConfigProvider>,
      ),
    ).toContain('.ant-pro-card');
  });
});
