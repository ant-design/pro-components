import { ProLayout } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { act } from 'react';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { waitForWaitTime } from '../util';
import defaultProps from './defaultProps';

afterEach(() => {
  cleanup();
});

describe('mobile BasicLayout', () => {
  /**
   * 归一化 DOM 序列化结果，剔除环境噪声后再做快照断言：
   * - `css-var-rXX`：cssinjs 样式 hash，与运行顺序相关，每次运行可能不同
   * - `:rXX:`：React useId 生成的自增序号，与组件树挂载顺序相关
   */
  const normalizeHtml = (container: HTMLElement) =>
    container.innerHTML
      .replace(/css-var-r\w+/g, 'css-var')
      .replace(/:r[a-z0-9]+:/g, ':useId:');

  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
    process.env.USE_MEDIA = 'xs';

    Object.defineProperty(global.window, 'matchMedia', {
      value: vi.fn((query) => {
        //  (max-width: 575px)
        return {
          media: query,
          matches: query.includes('max-width: 575px'),
          // 支持最新的 addEventListener API
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          // 保留旧的 API 以向后兼容
          addListener: vi.fn(),
          removeListener: vi.fn(),
        };
      }),
    });
  });

  afterAll(() => {
    process.env.USE_MEDIA = 'md';
    process.env.NODE_ENV = 'dev';
  });

  it('📱 base use', async () => {
    const html = render(
      <ProLayout {...defaultProps} getContainer={false} onCollapse={() => {}}>
        welcome
      </ProLayout>,
    );

    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    // 移动端布局基础渲染：内容、布局根节点应正常渲染
    expect(html.baseElement.textContent).toContain('welcome');
    expect(html.baseElement.querySelector('.ant-pro-layout')).toBeTruthy();
  });

  it('📱 collapsed=false', async () => {
    const html = render(
      <ProLayout {...defaultProps} getContainer={false} collapsed={false}>
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
  });

  it('📱 layout=mix', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        getContainer={false}
        layout="mix"
        collapsed={false}
      >
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    // Submenu collapse motion makes class names non-deterministic; wait until motion classes drop
    await waitFor(
      () => {
        html.baseElement.querySelectorAll('ul.ant-menu-sub').forEach((ul) => {
          if (/ant-motion-collapse-(enter|leave)/.test(ul.className)) {
            throw new Error('menu motion');
          }
        });
      },
      { timeout: 10000 },
    );
    await waitForWaitTime(100);
    expect(normalizeHtml(html.baseElement)).toMatchSnapshot();
  });

  it('📱 hides the collapsed button when an empty menu suppresses the sider', async () => {
    const html = render(
      <ProLayout
        getContainer={false}
        menuDataRender={() => []}
        suppressSiderWhenMenuEmpty
      >
        welcome
      </ProLayout>,
    );

    await html.findByText('welcome');

    expect(
      html.baseElement.querySelector(
        'span.ant-pro-global-header-collapsed-button',
      ),
    ).toBeNull();
  });

  it('📱 layout=mix and splitMenus', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        splitMenus
        getContainer={false}
        layout="mix"
        collapsed={false}
      >
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
  });

  it('📱 layout menuHeaderRender=false', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        collapsed
        getContainer={false}
        layout="mix"
        menuHeaderRender={false}
      >
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    // menuHeaderRender=false 不应渲染 'Ant Design' 默认 logo 文本
    expect(html.baseElement.textContent).not.toContain('Ant Design');
    // 内容仍正常渲染
    expect(html.baseElement.textContent).toContain('welcome');
  });

  it('📱 layout menuHeaderRender', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        collapsed
        getContainer={false}
        layout="mix"
        menuHeaderRender={() => 'title'}
      >
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    // menuHeaderRender 返回的 'title' 文本应出现在文档中
    expect(html.baseElement.textContent).toContain('title');
    expect(html.baseElement.textContent).toContain('welcome');
  });

  it('📱 layout menuHeaderRender with custom title', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        collapsed
        getContainer={false}
        layout="mix"
        menuHeaderRender={() => 'title'}
      >
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    // 与上一个用例配置相同，验证一致性
    expect(html.baseElement.textContent).toContain('title');
    expect(html.baseElement.textContent).toContain('welcome');
  });

  it('📱 layout collapsedButtonRender', async () => {
    const onCollapse = vi.fn();
    const html = render(
      <ProLayout
        {...defaultProps}
        onCollapse={onCollapse}
        collapsed={false}
        collapsedButtonRender={() => {
          return 'div';
        }}
        getContainer={false}
        layout="mix"
      >
        welcome
      </ProLayout>,
    );

    await waitFor(async () => {
      await html.findAllByText('welcome');
    });

    await act(async () => {
      const collapsedButton = html.baseElement?.querySelector<HTMLSpanElement>(
        'span.ant-pro-global-header-collapsed-button',
      );
      if (collapsedButton) {
        collapsedButton.click();
      }
    });

    await waitFor(async () => {
      await html.findAllByText('welcome');
    });

    await act(async () => {
      const mask = html.baseElement?.querySelector<HTMLDivElement>(
        'div.ant-drawer-mask',
      );
      if (mask) {
        mask.click();
      }
    });

    await waitFor(async () => {
      await html.findAllByText('welcome');
    });

    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalled();
    });
  });
});
