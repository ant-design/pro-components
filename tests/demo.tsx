import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import {
  act,
  cleanup,
  render as reactRender,
  waitFor,
} from '@testing-library/react';
import { App } from 'antd';
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

/** 全量 demo 快照时使用的虚拟模块名（勿与 `demos/all` 目录冲突） */
export const DEMO_SNAPSHOT_ALL = '__all__';

export type DemoTestOptions = {
  /**
   * - `true`：跳过该组件下全部 demo 快照
   * - `string[]`：路径子串命中的文件跳过（用于临时屏蔽不稳定用例）
   */
  skip?: boolean | string[];
};

function resolveDemoTsxPaths(component: string): string[] {
  if (component === DEMO_SNAPSHOT_ALL) {
    return glob.sync('./demos/**/[!_]*.tsx');
  }
  return glob.sync(`./demos/${component}/**/[!_]*.tsx`);
}

/**
 * 对 `demos/<component>` 下（或全部）的示例做渲染快照回归。
 * - 文件名以 `_` 开头的 `.tsx` 不会参与快照（本地调试/临时示例可如此命名）。
 */
function demoTest(component: string, options?: DemoTestOptions) {
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

  const files = resolveDemoTsxPaths(component);

  const TestApp = (props: { children: any }) => {
    return (
      <StyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
      >
        <App>
          <div>test</div>
          {props.children}
        </App>
      </StyleProvider>
    );
  };

  const matchMediaSpy = vi.spyOn(window, 'matchMedia');
  matchMediaSpy.mockImplementation(
    (query) =>
      ({
        matches: query === '(max-width: 575px)',
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
        addListener: (cb: (e: { matches: boolean }) => void) => {
          cb({ matches: query === '(max-width: 575px)' });
        },
        removeListener: vi.fn(),
      }) as any,
  );

  const suiteTitle =
    component === DEMO_SNAPSHOT_ALL ? 'all demos' : `${component} demos`;

  describe(suiteTitle, () => {
    beforeAll(() => vi.useFakeTimers());
    afterAll(() => vi.useRealTimers());
    files.forEach((file) => {
      const runCase =
        options?.skip === true ||
        (Array.isArray(options?.skip) &&
          options.skip.some((c) => file.includes(c)))
          ? test.skip
          : test;
      runCase(`📸 renders ${file} correctly`, async () => {
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
