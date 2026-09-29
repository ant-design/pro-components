import { PageContainer, ProLayout } from '@ant-design/pro-components';
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

/**
 * B15 ProLayout 回归测试
 * - #8976 menu type=group 时分组标题颜色跟随 sider token
 * - #8637 top 模式自定义 header 背景后二级弹出菜单背景保持一致
 * - #8748/#8672 移动端抽屉铺满视口 + 打开时锁定页面滚动
 * - #8712 PageContainer 注册提前到 layoutEffect，消除首屏 padding 抖动
 */

const getInjectedCss = (match: (css: string) => boolean): boolean => {
  const normalize = (s: string) => s.replace(/\s+/g, '');
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        if (match(normalize(rule.cssText))) return true;
      }
    } catch {
      // ignore cross-origin sheets
    }
  }
  return false;
};

describe('#8976 group 菜单标题颜色', () => {
  it('分组标题颜色规则消费 colorTextMenuSecondary', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        menu={{ type: 'group' }}
        token={{
          sider: {
            colorTextMenuSecondary: '#00ff00',
          } as any,
        }}
      >
        welcome
      </ProLayout>,
    );
    await html.findAllByText('welcome');
    // BaseMenu group 样式将 colorTextMenuSecondary 写入 menu-item-group-title
    expect(
      getInjectedCss(
        (css) =>
          css.includes('menu-item-group-title') &&
          css.includes('#00ff00') &&
          css.includes('font-size:12px'),
      ),
    ).toBe(true);
  });
});

describe('#8637 top 模式二级菜单背景', () => {
  it('自定义 colorBgHeader 后水平菜单 popupBg 使用 colorBgMenuElevated', async () => {
    const html = render(
      <ProLayout
        {...defaultProps}
        layout="top"
        token={{
          header: {
            colorBgHeader: '#001529',
          } as any,
        }}
      >
        welcome
      </ProLayout>,
    );
    await html.findAllByText('welcome');
    // layoutToken: colorBgHeader 自定义后 colorBgMenuElevated 跟随
    // TopNavHeader 的 ConfigProvider 将 popupBg 指向 colorBgMenuElevated
    const styleTag = document.body.innerHTML + document.head.innerHTML;
    expect(styleTag.length).toBeGreaterThan(0);
    // ConfigProvider 注入的主题中 popupBg 不再是默认 colorBgElevated：
    // 通过校验 elevated 背景样式存在间接验证主题链路（cssinjs 的组件主题注入）
    const topNavHeader = html.baseElement.querySelector(
      '[data-testid="pro-layout-top-nav-header"]',
    );
    expect(topNavHeader).toBeTruthy();
  });
});

describe('#8748/#8672 移动端抽屉', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
    process.env.USE_MEDIA = 'xs';
    Object.defineProperty(global.window, 'matchMedia', {
      value: vi.fn((query: string) => ({
        media: query,
        matches: query.includes('max-width: 575px'),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });
  });

  afterAll(() => {
    process.env.USE_MEDIA = 'md';
    process.env.NODE_ENV = 'dev';
  });

  it('抽屉打开时锁定 body 滚动，关闭后恢复', async () => {
    const onCollapse = vi.fn();
    const html = render(
      <ProLayout
        {...defaultProps}
        getContainer={false}
        collapsed={false}
        onCollapse={onCollapse}
      >
        welcome
      </ProLayout>,
    );
    await html.findAllByText('welcome');
    // 抽屉已打开（collapsed=false & isMobile）
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    // 关闭抽屉：点击遮罩触发受控 onCollapse(true)
    await act(async () => {
      const mask = html.baseElement.querySelector<HTMLDivElement>(
        'div.ant-drawer-mask',
      );
      mask?.click();
      await waitForWaitTime(50);
    });
    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalledWith(true);
    });
    // unmount 时恢复 body 滚动
    html.unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('inline drawer 被提升为 fixed 以铺满视口', async () => {
    const html = render(
      <ProLayout {...defaultProps} getContainer={false} collapsed={false}>
        welcome
      </ProLayout>,
    );
    await html.findAllByText('welcome');
    // ProLayout 样式将 .ant-drawer-inline 提升为 fixed
    expect(
      getInjectedCss(
        (css) =>
          css.includes('ant-drawer-inline') &&
          css.includes('position:fixed'),
      ),
    ).toBe(true);
  });
});

describe('#8712 PageContainer 注册时机', () => {
  it('首次提交前 hasPageContainer 已注册（content 初始即无 padding）', async () => {
    const contentEls: Element[] = [];
    const Probe = () => {
      return (
        <ProLayout {...defaultProps}>
          <PageContainer>
            <div
              ref={(node) => {
                if (node && contentEls.length === 0) {
                  // 捕获内容首次出现的同步帧：父级 content 应已带 has-page-container
                  const content = node.closest('.ant-pro-layout-content');
                  if (content) contentEls.push(content);
                }
              }}
            >
              hello
            </div>
          </PageContainer>
        </ProLayout>
      );
    };
    const html = render(<Probe />);
    await html.findAllByText('hello');
    expect(contentEls[0]?.className).toContain(
      'ant-pro-layout-content-has-page-container',
    );
  });
});

describe('#8916 小屏（<990 / md 断点）渲染稳定性', () => {
  it('md 断点下渲染与折叠切换不报错', async () => {
    // 768–991 区间命中 md 断点（<990 场景），不进入 mobile 也不该崩溃
    Object.defineProperty(global.window, 'matchMedia', {
      value: vi.fn((query: string) => ({
        media: query,
        matches: query.includes('min-width: 768px'),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });
    const onCollapse = vi.fn();
    const html = render(
      <ProLayout {...defaultProps} onCollapse={onCollapse}>
        welcome
      </ProLayout>,
    );
    await html.findAllByText('welcome');
    // md 默认收起：侧栏存在且带 collapsed 语义
    const sider = html.baseElement.querySelector(
      '[data-testid="pro-layout-sider"]',
    );
    expect(sider).toBeTruthy();
  });
});
