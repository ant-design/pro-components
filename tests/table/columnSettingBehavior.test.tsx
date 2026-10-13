import { ProTable } from '@ant-design/pro-components';
import { fireEvent, render } from '@testing-library/react';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

const COLUMNS_COUNT = 30;
const columns = Array.from({ length: COLUMNS_COUNT }, (_, i) => ({
  dataIndex: `col-${i}`,
  title: `列-${i}`,
}));

/**
 * #8841 / #9115 / #8750 列设置(ColumnSetting)行为回归。
 */
describe('ColumnSetting behaviors', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const openColumnSetting = async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ 'col-0': 'a' }]}
        rowKey="col-0"
        search={false}
      />,
    );
    await waitForWaitTime(300);
    // 打开列设置（工具栏齿轮图标）
    const settingBtn = wrapper.container.querySelector(
      '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
    );
    expect(settingBtn).toBeTruthy();
    act(() => {
      fireEvent.click(settingBtn as HTMLElement);
    });
    await waitForWaitTime(300);
    return wrapper;
  };

  it('#8841 长列列表使用虚拟滚动：容器存在且带 maxHeight', async () => {
    await openColumnSetting();
    // rc-tree 的虚拟列表 holder（prefixCls 透传为 `${prefixCls}-list`）
    const holder = document.querySelector('.ant-tree-list-holder');
    expect(holder).toBeTruthy();
    // 虚拟滚动需要高度约束（maxHeight / height）
    const style = (holder as HTMLElement).style;
    const hasHeight =
      style.maxHeight || style.height || (holder as HTMLElement).offsetHeight;
    expect(hasHeight).toBeTruthy();
  });

  it('#8841 可通过 listsHeight 自定义高度', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ 'col-0': 'a' }]}
        rowKey="col-0"
        search={false}
        options={{ setting: { listsHeight: 120 } }}
      />,
    );
    await waitForWaitTime(300);
    const settingBtn = wrapper.container.querySelector(
      '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
    );
    act(() => {
      fireEvent.click(settingBtn as HTMLElement);
    });
    await waitForWaitTime(300);
    const holder = document.querySelector(
      '.ant-tree-list-holder',
    ) as HTMLElement;
    expect(holder).toBeTruthy();
    expect(
      holder.style.maxHeight === '120px' || holder.style.height === '120px',
    ).toBe(true);
    wrapper.unmount();
  });

  it('#8750 多次勾选编辑后点击空白仍可收起', async () => {
    const wrapper = await openColumnSetting();
    const checkboxes = document.querySelectorAll('.ant-tree-checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    // 模拟多次编辑：勾选 → 取消 → 勾选
    for (let i = 0; i < 3; i++) {
      act(() => {
        fireEvent.click(checkboxes[0]);
      });
      await waitForWaitTime(60);
    }

    // 点击空白处
    act(() => {
      fireEvent.mouseDown(document.body);
      fireEvent.mouseUp(document.body);
      fireEvent.click(document.body);
    });
    await waitForWaitTime(500);

    const popover = document.querySelector('.ant-popover');
    const isClosing =
      !popover ||
      popover.className.includes('leave') ||
      popover.className.includes('hidden');
    expect(isClosing).toBe(true);
    wrapper.unmount();
  });

  it('#9115 拖拽接近底部边缘时自动滚动虚拟列表', async () => {
    const wrapper = await openColumnSetting();
    const holder = document.querySelector(
      '.ant-tree-list-holder',
    ) as HTMLElement;
    expect(holder).toBeTruthy();

    const rectSpy = vi.spyOn(holder, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 280,
      left: 0,
      right: 200,
      width: 200,
      height: 280,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

    const rafCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    // 模拟一次完整的 HTML5 拖拽：先 dragStart 让 rc-tree 记录拖拽节点。
    // 注意跳过 rc-tree 的隐藏测量节点（aria-hidden="true"）。
    const allNodes = document.querySelectorAll('.ant-tree-treenode');
    const treeTitle = Array.from(allNodes).find(
      (n) => n.getAttribute('aria-hidden') !== 'true',
    ) as HTMLElement;
    expect(treeTitle).toBeTruthy();
    const dataTransfer = {
      setData: () => {},
      getData: () => '',
      effectAllowed: 'move',
      dropEffect: 'move',
      types: [],
    };
    act(() => {
      fireEvent.dragStart(treeTitle, {
        clientX: 100,
        clientY: 100,
        dataTransfer,
      });
    });
    await waitForWaitTime(50);

    // jsdom 的 DragEvent 构造器不透传 clientY，
    // 手工派发带 clientY 的 dragover 事件（真实浏览器无需此处理）
    const dragOverEvent = new Event('dragover', { bubbles: true });
    Object.defineProperty(dragOverEvent, 'clientY', { value: 272 });
    Object.defineProperty(dragOverEvent, 'clientX', { value: 100 });
    (dragOverEvent as any).dataTransfer = dataTransfer;
    act(() => {
      fireEvent(treeTitle, dragOverEvent);
    });

    expect(rectSpy).toHaveBeenCalled();
    // rAF 循环已启动
    expect(rafCallbacks.length).toBeGreaterThan(0);

    // 执行一帧：scrollTop 应增加 AUTO_SCROLL_STEP(8)
    const before = holder.scrollTop;
    act(() => {
      rafCallbacks[rafCallbacks.length - 1](performance.now());
    });
    expect(holder.scrollTop).toBe(before + 8);

    wrapper.unmount();
  });

  it('#8947 ReactNode 标题与持久化列状态不会写入循环对象', async () => {
    const titleRef = React.createRef<HTMLSpanElement>();
    const storageKey = 'column-setting-circular-title';
    localStorage.removeItem(storageKey);
    const wrapper = render(
      <ProTable
        columns={[
          {
            dataIndex: 'name',
            title: <span ref={titleRef}>名称</span>,
          },
        ]}
        dataSource={[{ id: 1, name: 'Alice' }]}
        rowKey="id"
        search={false}
        columnsState={{
          persistenceKey: storageKey,
          persistenceType: 'localStorage',
        }}
      />,
    );
    await waitForWaitTime(300);
    expect(titleRef.current).toBeTruthy();

    fireEvent.click(
      wrapper.container.querySelector(
        '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
      ) as HTMLElement,
    );
    await waitForWaitTime(200);
    expect(() =>
      fireEvent.click(
        document.querySelector('.ant-tree-checkbox') as HTMLElement,
      ),
    ).not.toThrow();
    await waitForWaitTime(100);

    const persisted = localStorage.getItem(storageKey);
    expect(persisted).toBeTruthy();
    expect(JSON.parse(persisted!)).toEqual(
      expect.objectContaining({ name: expect.any(Object) }),
    );
    expect(persisted).not.toContain('FiberNode');
    wrapper.unmount();
    localStorage.removeItem(storageKey);
  });
});
