﻿import { cleanup, render, waitFor } from '@testing-library/react';
import { ProLayout } from '@xxlabs/pro-components';
import { act } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
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
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📱 collapsed=false', async () => {
    const html = render(
      <ProLayout {...defaultProps} collapsed={false} getContainer={false}>
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
  });

  it('📱 layout=mix', async () => {
    const html = render(
      <ProLayout {...defaultProps} collapsed={false} getContainer={false} layout="mix">
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📱 layout=mix and splitMenus', async () => {
    const html = render(
      <ProLayout {...defaultProps} splitMenus collapsed={false} getContainer={false} layout="mix">
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
  });

  it('📱 layout menuHeaderRender=false', async () => {
    const html = render(
      <ProLayout {...defaultProps} collapsed getContainer={false} layout="mix" menuHeaderRender={false}>
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📱 layout menuHeaderRender', async () => {
    const html = render(
      <ProLayout {...defaultProps} collapsed getContainer={false} layout="mix" menuHeaderRender={() => 'title'}>
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📱 layout menuHeaderRender with custom title', async () => {
    const html = render(
      <ProLayout {...defaultProps} collapsed getContainer={false} layout="mix" menuHeaderRender={() => 'title'}>
        welcome
      </ProLayout>,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📱 layout collapsedButtonRender', async () => {
    const onCollapse = vi.fn();
    const html = render(
      <ProLayout
        {...defaultProps}
        collapsed={false}
        collapsedButtonRender={() => {
          return 'div';
        }}
        getContainer={false}
        layout="mix"
        onCollapse={onCollapse}
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
      const mask = html.baseElement?.querySelector<HTMLDivElement>('div.ant-drawer-mask');
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
