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
import defaultProps from './defaultProps';

afterEach(() => {
  cleanup();
});

describe('mobile BasicLayout', () => {
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

  it('📱 layout menuHeaderRender=false', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        collapsed
        getContainer={false}
        layout="side"
        splitMenus
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
        layout="side"
        splitMenus
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
        layout="side"
        splitMenus
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
        layout="side"
        splitMenus
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
