import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import { ProConfigProvider } from '@ant-design/pro-components';
import {
  act,
  cleanup,
  render as reactRender,
  waitFor,
} from '@testing-library/react';
import { ConfigProvider } from 'antd';
import glob from 'glob';
import MockDate from 'mockdate';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest';

type Options = {
  skip?: boolean;
};

function demoTest(component: string, options?: Options) {
  const LINE_STR_COUNT = 20;
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  ).get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      const html = this.textContent || '';
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
      return lines * 16;
    },
  });

  // Mock getComputedStyle
  const originGetComputedStyle = window.getComputedStyle;

  beforeAll(() => {
    MockDate.set(1479828164000);
  });

  afterEach(() => {
    logSpy.mockReset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    logSpy.mockReset();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });
  // 支持 demos 下的所有非_开头的tsx文件
  const files = glob.sync(`./demos/${component}/**/[!_]*.tsx`);
  files.push(...glob.sync(`./${component}/**/**/[!_]*.tsx`));

  const TestApp = (props: { children: any }) => {
    return (
      <StyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
      >
        <ConfigProvider
          theme={{
            zeroRuntime: true,
            hashed: false,
            cssVar: {
              key: 'pro',
            },
          }}
        >
          <ProConfigProvider hashed={false}>
            <>
              <div>test</div>
              {props.children}
            </>
          </ProConfigProvider>
        </ConfigProvider>
      </StyleProvider>
    );
  };

  const matchMediaSpy = vi.spyOn(window, 'matchMedia');
  matchMediaSpy.mockImplementation(
    (query) =>
      ({
        matches: query === '(max-width: 575px)',
        // 支持最新的 addEventListener API
        addEventListener: vi.fn(
          (event: string, cb: (e: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              cb({
                matches: query === '(max-width: 575px)',
              } as MediaQueryListEvent);
            }
          },
        ),
        removeEventListener: vi.fn(),
        // 保留旧的 API 以向后兼容
        addListener: (cb: (e: { matches: boolean }) => void) => {
          cb({ matches: query === '(max-width: 575px)' });
        },
        removeListener: vi.fn(),
      }) as any,
  );

  describe(`${component} demos`, () => {
    beforeAll(() => vi.useFakeTimers());
    afterAll(() => vi.useRealTimers());
    files.forEach((file) => {
      let testMethod = options?.skip === true ? test.skip : test;
      if (
        Array.isArray(options?.skip) &&
        options?.skip.some((c) => file.includes(c))
      ) {
        testMethod = test.skip;
      }
      testMethod(`📸 renders ${file} correctly`, async () => {
        Math.random = () => 0.8404419276253765;

        const Demo = (await import(`.${file}`)).default;
        const wrapper = reactRender(
          <TestApp>
            <Demo />
          </TestApp>,
        );

        await waitFor(() => {
          return wrapper.findAllByText('test');
        });
        act(() => {
          vi.runAllTimers();
        });
        await waitFor(() => {
          return wrapper.findAllByText('test');
        });

        act(() => {
          vi.runAllTimers();
        });
        await expect(wrapper.asFragment()).toMatchFileSnapshot(
          `snapshot/snapshot-${file
            .split('/')
            .filter((part) => !part.startsWith('_') && !part.startsWith('.'))
            .map((part) => part.replace(/\.tsx$/, ''))
            .join('-')}.html`,
        );
        wrapper.unmount();
        cleanup();
      });
    });
  });
}

export default demoTest;
