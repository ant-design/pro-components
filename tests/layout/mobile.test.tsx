import { ProLayout } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { act } from 'react';
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
      <ProLayout {...defaultProps} getContainer={false} collapsed={false} />,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📱 layout=mix', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        getContainer={false}
        layout="mix"
        collapsed={false}
      />,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📱 layout=mix and splitMenus', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        splitMenus
        getContainer={false}
        layout="mix"
        collapsed={false}
      />,
    );
    await waitFor(async () => {
      await html.findAllByText('welcome');
    });
    expect(html.asFragment()).toMatchSnapshot();
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
    expect(html.asFragment()).toMatchSnapshot();
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
    expect(html.asFragment()).toMatchSnapshot();
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
    expect(html.asFragment()).toMatchSnapshot();
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
      />,
    );

    await waitFor(async () => {
      await html.findAllByText('div');
    });
    act(() => {
      html.baseElement
        ?.querySelector<HTMLSpanElement>(
          'span.ant-pro-global-header-collapsed-button',
        )
        ?.click();
    });

    await waitFor(async () => {
      await html.findAllByText('welcome');
    });

    act(() => {
      html.baseElement
        ?.querySelector<HTMLDivElement>('div.ant-drawer-mask')
        ?.click();
    });

    await waitFor(async () => {
      await html.findAllByText('welcome');
    });

    waitFor(() => {
      expect(onCollapse).toHaveBeenCalled();
    });
  });
});
