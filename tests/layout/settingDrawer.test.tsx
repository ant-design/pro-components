import { SettingDrawer } from '@ant-design/pro-components';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { defaultSettings } from './defaultSettings';

afterEach(() => {
  cleanup();
});

describe('settingDrawer.test', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
    process.env.USE_MEDIA = 'md';

    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4437.0 Safari/537.36 Edg/91.0.831.1',
        clipboard: {
          writeText: async () => {
            return true;
          },
        },
      },
    });
  });

  it('🌺 base user', () => {
    const html = render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        getContainer={false}
        collapse
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🌺 settings = undefined', () => {
    const html = render(
      <SettingDrawer
        disableUrlParams
        settings={undefined as any}
        getContainer={false}
        collapse
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🌺 hideColors = true', () => {
    const html = render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        colorList={false}
        getContainer={false}
        collapse
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🌺 colorList key is undefined', () => {
    render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        colorList={[
          {
            key: '',
            color: 'red',
          },
        ]}
        getContainer={false}
        collapse
      />,
    );
  });

  it('🌺  theme color Change', async () => {
    const onSettingChange = vi.fn();
    const colorList = [
      { key: 'dust', color: '#F5222D' },
      { key: 'volcano', color: '#FA541C' },
      { key: 'sunset', color: '#FAAD14' },
      { key: 'cyan', color: '#13C2C2' },
      { key: 'green', color: '#52C41A' },
      { key: 'geekblue', color: '#2F54EB' },
      { key: 'purple', color: '#722ED1' },
      { key: 'qixian', color: '#F52225' },
      { key: 'test', color: '#722ED2' },
    ];
    const { container, unmount } = render(
      <SettingDrawer
        disableUrlParams
        colorList={colorList}
        settings={defaultSettings}
        collapse
        getContainer={false}
        onSettingChange={(setting) => onSettingChange(setting.colorPrimary)}
      />,
    );

    fireEvent.click(
      container.querySelectorAll(
        'div.ant-pro-setting-drawer-theme-color-block',
      )[0],
    );
    expect(onSettingChange).toBeCalledWith('#1677FF');

    fireEvent.click(
      container.querySelectorAll(
        'div.ant-pro-setting-drawer-theme-color-block',
      )[1],
    );

    expect(onSettingChange).toBeCalledWith('#F5222D');
    expect(
      container.querySelectorAll(
        'div.ant-pro-setting-drawer-theme-color-block',
      ),
    ).toHaveLength(9);
    unmount();
  });

  it('🌺 hideHintAlert = true', () => {
    const html = render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        hideHintAlert
        getContainer={false}
        collapse
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🌺 initState form query', async () => {
    const fn = vi.fn();
    const { container, unmount } = render(
      <div>
        <SettingDrawer
          disableUrlParams={false}
          getContainer={false}
          collapse
          onSettingChange={(setting) => {
            fn(setting);
          }}
        />
      </div>,
    );

    fireEvent.click(container.querySelector('.ant-btn.ant-btn-block')!);
    fireEvent.click(container.querySelector('div.ant-drawer-mask')!);

    expect(fn).toBeCalled();
    expect(fn).toBeCalledWith({
      navTheme: 'realDark',
      layout: 'mix',
      contentWidth: 'Fluid',
      fixedHeader: true,
      fixSiderbar: true,
      colorPrimary: '#1677FF',
      splitMenus: false,
    });
    unmount();
  });

  it('🌺 hideCopyButton = true', () => {
    const html = render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        hideCopyButton
        getContainer={false}
        collapse
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🌺 clipboard throw error', async () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4437.0 Safari/537.36 Edg/91.0.831.1',
        clipboard: {
          writeText: async () => {
            throw new Error('error');
          },
        },
      },
    });
    const fn = vi.fn();
    const { container, unmount } = render(
      <SettingDrawer
        disableUrlParams
        getContainer={false}
        collapse
        onSettingChange={() => {
          fn();
        }}
      />,
    );

    fireEvent.click(container.querySelector('.ant-btn.ant-btn-block')!);
    expect(fn).toBeCalled();
    unmount();
  });

  it('🌺 onCollapseChange', async () => {
    const onCollapseChange = vi.fn();
    const { container } = render(
      <SettingDrawer
        disableUrlParams
        settings={{
          ...defaultSettings,
          // @ts-ignore
          menuRender: true,
          footerRender: false,
        }}
        collapse
        getContainer={false}
        onCollapseChange={onCollapseChange}
      />,
    );

    fireEvent.click(container.querySelector('.ant-pro-setting-drawer-handle')!);
    expect(onCollapseChange).toHaveBeenCalled();
  });

  it('🌺 onLayout Change', async () => {
    const onSettingChange = vi.fn();
    const { container } = render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        collapse
        getContainer={false}
        onSettingChange={(setting) => onSettingChange(setting.layout)}
      />,
    );

    fireEvent.click(
      container.querySelectorAll(
        'div.ant-pro-setting-drawer-block-checkbox-layout-item',
      )[2],
    );

    expect(onSettingChange).toBeCalledWith('mix');

    fireEvent.click(
      container.querySelectorAll(
        'div.ant-pro-setting-drawer-block-checkbox-layout-item',
      )[1],
    );

    expect(onSettingChange).toBeCalledWith('top');
  });

  it('🌺 fix-siderbar Change', async () => {
    const onSettingChange = vi.fn();
    const { container } = render(
      <SettingDrawer
        disableUrlParams
        collapse
        getContainer={false}
        onSettingChange={(setting) => {
          onSettingChange(setting.fixSiderbar);
        }}
      />,
    );

    fireEvent.click(container.querySelector('button.fix-siderbar')!);

    expect(onSettingChange).toBeCalledWith(true);

    fireEvent.click(container.querySelector('button.fix-siderbar')!);

    expect(onSettingChange).toBeCalledWith(false);
  });

  it('🌺 content-width change', async () => {
    const onSettingChange = vi.fn();
    const { container } = render(
      <SettingDrawer
        disableUrlParams
        collapse
        settings={{
          layout: 'top',
        }}
        getContainer={false}
        onSettingChange={(setting) => {
          onSettingChange(setting.contentWidth);
        }}
      />,
    );

    fireEvent.mouseDown(
      container
        .querySelector('div.ant-select.content-width')!
        .querySelector('.ant-select-selector')!,
    );

    expect(onSettingChange).toBeCalledWith('Fluid');
  });

  it('🌺 splitMenu change', async () => {
    const onSettingChange = vi.fn();
    const { container } = render(
      <SettingDrawer
        disableUrlParams
        collapse
        settings={{
          layout: 'mix',
        }}
        getContainer={false}
        onSettingChange={(setting) => {
          onSettingChange(setting.splitMenus);
        }}
      />,
    );

    fireEvent.click(container.querySelector('button.split-menus')!);

    expect(onSettingChange).toBeCalledWith(true);
  });

  it('🌺 fixed-header Change', async () => {
    const onSettingChange = vi.fn();
    const { container } = render(
      <SettingDrawer
        disableUrlParams
        collapse
        getContainer={false}
        onSettingChange={(setting) => {
          onSettingChange(setting.fixedHeader);
        }}
      />,
    );

    fireEvent.click(container.querySelector('button.fixed-header')!);

    expect(onSettingChange).toBeCalledWith(true);

    fireEvent.click(container.querySelector('button.fixed-header')!);

    expect(onSettingChange).toBeCalledWith(false);
  });

  it('🌺 theme Change', async () => {
    const onSettingChange = vi.fn();
    const { container } = render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        collapse
        enableDarkTheme
        getContainer={false}
        onSettingChange={(setting) => onSettingChange(setting.navTheme)}
      />,
    );

    fireEvent.click(
      container.querySelectorAll(
        'div.ant-pro-setting-drawer-block-checkbox-theme-item',
      )[0],
    );

    expect(onSettingChange).toBeCalledWith('light');

    fireEvent.click(
      container.querySelectorAll(
        'div.ant-pro-setting-drawer-block-checkbox-theme-item',
      )[1],
    );

    expect(onSettingChange).toBeCalledWith('realDark');
  });

  it('🌺 colorWeak Change', async () => {
    const onSettingChange = vi.fn();
    document.body.appendChild(document.createElement('div'));
    const { container, rerender } = render(
      <SettingDrawer
        disableUrlParams
        colorList={[]}
        settings={{
          ...defaultSettings,
          navTheme: 'realDark',
          menuRender: false,
        }}
        collapse
        getContainer={false}
        onSettingChange={(setting) => {
          onSettingChange(setting.colorWeak);
        }}
      />,
    );

    fireEvent.click(container.querySelector('button.color-weak')!);
    expect(onSettingChange).toBeCalledWith(true);

    rerender(
      <SettingDrawer
        disableUrlParams
        colorList={[]}
        settings={{ ...defaultSettings, colorWeak: true }}
        collapse
        getContainer={false}
        onSettingChange={(setting) => {
          onSettingChange(setting.colorWeak);
        }}
      />,
    );

    fireEvent.click(container.querySelector('button.color-weak')!);
    expect(onSettingChange).toBeCalledWith(false);
  });

  ['header', 'footer', 'menu', 'menuHeader'].map((key) => {
    it(`🌺 ${key} regional config change`, async () => {
      const fn = vi.fn();
      const { container, unmount } = render(
        <SettingDrawer
          disableUrlParams
          onSettingChange={(s) => {
            if (s[`${key}Render` as 'headerRender'] === false) {
              fn(key);
            }
          }}
          getContainer={false}
          collapse
        />,
      );

      fireEvent.click(container.querySelector(`button.regional-${key}`)!);

      expect(fn).toBeCalledWith(key);
      unmount();
    });
  });

  it('🌺 onLanguageChange support', async () => {
    let fn: Function | null = null;
    const addEventListenerSpy = vi
      .spyOn(document, 'addEventListener')
      .mockImplementation((eventName, eventFn) => {
        if (eventName === 'languagechange') {
          //@ts-expect-error
          fn = eventFn;
        }
      });
    const html = render(
      <SettingDrawer
        disableUrlParams
        settings={defaultSettings}
        getContainer={false}
        collapse
      />,
    );
    await html.findAllByText('整体风格设置');

    act(() => {
      window.localStorage.setItem('umi_locale', 'en-US');
    });

    act(() => {
      fn?.();
      html.rerender(
        <SettingDrawer
          disableUrlParams
          settings={defaultSettings}
          getContainer={false}
          collapse
        />,
      );
    });

    addEventListenerSpy.mockRestore();

    await waitFor(() => {
      expect(
        (
          html.baseElement.querySelectorAll(
            '.ant-pro-setting-drawer-body-title',
          )[0] as HTMLHeadingElement
        ).textContent,
      ).toEqual('Page style setting');
    });

    html.unmount();

    window.localStorage.setItem('umi_locale', 'zh-CN');
  });
});
