import { ProTable } from '@ant-design/pro-components';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

type Col = {
  title: string;
  dataIndex?: string;
  key?: string;
  children?: Col[];
};

const leaf = (name: string): Col => ({
  title: name,
  dataIndex: name,
  key: name,
});

const columns: any[] = [
  leaf('A'),
  {
    title: 'GroupL2',
    key: 'group-l2',
    children: [
      leaf('B'),
      {
        title: 'GroupL3',
        key: 'group-l3',
        children: [leaf('C1'), leaf('C2')],
      },
    ],
  },
  leaf('D'),
];

// #8988 variant: children WITHOUT explicit key (dataIndex only)
const columnsNoKey: any[] = [
  { title: 'A', dataIndex: 'A' },
  {
    title: 'GroupL2',
    dataIndex: 'group-l2',
    children: [
      { title: 'B', dataIndex: 'B' },
      {
        title: 'GroupL3',
        dataIndex: 'group-l3',
        children: [
          { title: 'C1', dataIndex: 'C1' },
          { title: 'C2', dataIndex: 'C2' },
        ],
      },
    ],
  },
  { title: 'D', dataIndex: 'D' },
];

const openSetting = async (wrapper: ReturnType<typeof render>) => {
  await waitForWaitTime(300);
  act(() => {
    fireEvent.click(
      wrapper.container.querySelector(
        '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
      ) as HTMLElement,
    );
  });
  await waitForWaitTime(300);
};

const expandByTitle = async (title: string) => {
  const node = Array.from(
    document.querySelectorAll(
      '.ant-pro-table-column-setting-overlay [role="treeitem"]',
    ),
  ).find((n) => n.textContent === title);
  const sw = node?.querySelector('.ant-tree-switcher');
  if (!sw) return;
  act(() => {
    fireEvent.click(sw as HTMLElement);
  });
  await waitForWaitTime(400);
};

const visibleTreeItems = () =>
  Array.from(
    document.querySelectorAll(
      '.ant-pro-table-column-setting-overlay [role="treeitem"]',
    ),
  ).filter((n) => n.getAttribute('aria-hidden') !== 'true');

/**
 * #8988 多级表头分组 + 列设置:
 * - 子分组(如 L2 > L3)不能被标记为叶子,否则列设置树无法展开,
 *   三级及以下的列永远无法显示/勾选。
 */
describe('#8988 multi-level header in ColumnSetting', () => {
  it('group nodes at any depth are expandable (isLeaf follows children)', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ A: '1', B: '2', C1: '3', C2: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await openSetting(wrapper);

    // L2 展开前:顶层 3 个节点
    expect(visibleTreeItems().length).toBe(3);

    await expandByTitle('GroupL2');
    // L2 展开后:B 与 L3 可见,L3 仍可展开(带 switcher 且非 leaf)
    const items = visibleTreeItems();
    expect(items.length).toBe(5);
    const l3 = items.find((n) => n.textContent === 'GroupL3');
    expect(l3).toBeTruthy();
    // L3 是分组节点:aria-expanded 存在(非叶子),且有展开开关
    expect(l3!.getAttribute('aria-expanded')).toBe('false');
    expect(l3!.querySelector('.ant-tree-switcher_close')).toBeTruthy();

    wrapper.unmount();
  });

  it('unchecking a parent group hides the whole group column', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ A: '1', B: '2', C1: '3', C2: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await openSetting(wrapper);

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );
    expect(headers()).toEqual([
      'A',
      'GroupL2',
      'D',
      'B',
      'GroupL3',
      'C1',
      'C2',
    ]);

    // 取消勾选 GroupL2 整组
    const l2 = visibleTreeItems().find((n) => n.textContent === 'GroupL2');
    act(() => {
      fireEvent.click(l2?.querySelector('.ant-tree-checkbox') as HTMLElement);
    });
    await waitForWaitTime(300);
    // 整组从表头移除
    expect(headers()).toEqual(['A', 'D']);

    // 重新勾选,整组恢复
    const l2Again = visibleTreeItems().find((n) => n.textContent === 'GroupL2');
    act(() => {
      fireEvent.click(
        l2Again?.querySelector('.ant-tree-checkbox') as HTMLElement,
      );
    });
    await waitForWaitTime(300);
    expect(headers()).toEqual([
      'A',
      'GroupL2',
      'D',
      'B',
      'GroupL3',
      'C1',
      'C2',
    ]);

    wrapper.unmount();
  });

  it('dataIndex-only nested columns: hiding group and restoring works', async () => {
    const wrapper = render(
      <ProTable
        columns={columnsNoKey}
        dataSource={[{ A: '1', B: '2', C1: '3', C2: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await openSetting(wrapper);

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );
    // 初始表头完整
    expect(headers()).toEqual([
      'A',
      'GroupL2',
      'D',
      'B',
      'GroupL3',
      'C1',
      'C2',
    ]);

    // 展开分组后取消勾选子列 B(dataIndex-only key 场景)
    await expandByTitle('GroupL2');
    const itemB = visibleTreeItems().find((n) => n.textContent === 'B');
    act(() => {
      fireEvent.click(
        itemB?.querySelector('.ant-tree-checkbox') as HTMLElement,
      );
    });
    await waitForWaitTime(300);
    // B 从表头移除
    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'GroupL3', 'C1', 'C2']);

    wrapper.unmount();
  });

  it('scenario 2: with parent group hidden, checking a child shows it again', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ A: '1', B: '2', C1: '3', C2: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await openSetting(wrapper);

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );
    expect(headers()).toEqual([
      'A',
      'GroupL2',
      'D',
      'B',
      'GroupL3',
      'C1',
      'C2',
    ]);

    // 1) 取消 B
    await expandByTitle('GroupL2');
    const itemB = () => visibleTreeItems().find((n) => n.textContent === 'B');
    act(() => {
      fireEvent.click(
        itemB()?.querySelector('.ant-tree-checkbox') as HTMLElement,
      );
    });
    await waitForWaitTime(300);
    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'GroupL3', 'C1', 'C2']);

    // 2) 取消 L3 分组 → L2 下全部隐藏 → L2 自动隐藏
    const l3 = visibleTreeItems().find((n) => n.textContent === 'GroupL3');
    act(() => {
      fireEvent.click(l3?.querySelector('.ant-tree-checkbox') as HTMLElement);
    });
    await waitForWaitTime(300);
    expect(headers()).toEqual(['A', 'D']);

    // 3) 重新勾选 B → 父分组恢复显示,且只含 B
    act(() => {
      fireEvent.click(
        itemB()?.querySelector('.ant-tree-checkbox') as HTMLElement,
      );
    });
    await waitForWaitTime(300);
    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'B']);

    wrapper.unmount();
  });

  it('scenario 1: unchecking all children of a group hides the group', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ A: '1', B: '2', C1: '3', C2: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await openSetting(wrapper);

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );
    expect(headers()).toEqual([
      'A',
      'GroupL2',
      'D',
      'B',
      'GroupL3',
      'C1',
      'C2',
    ]);

    // 展开并依次取消勾选所有子列(B)
    await expandByTitle('GroupL2');
    const itemB = visibleTreeItems().find((n) => n.textContent === 'B');
    act(() => {
      fireEvent.click(
        itemB?.querySelector('.ant-tree-checkbox') as HTMLElement,
      );
    });
    await waitForWaitTime(300);
    // B 隐藏,但分组里还有 L3 子组 → 分组保留
    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'GroupL3', 'C1', 'C2']);

    // 再取消 L3 分组整组 → L2 下所有子项都隐藏 → L2 分组自动隐藏
    const l3 = visibleTreeItems().find((n) => n.textContent === 'GroupL3');
    act(() => {
      fireEvent.click(l3?.querySelector('.ant-tree-checkbox') as HTMLElement);
    });
    await waitForWaitTime(300);
    expect(headers()).toEqual(['A', 'D']);

    wrapper.unmount();
  });

  it('checking a deep leaf restores every hidden ancestor', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ A: '1', B: '2', C1: '3', C2: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await openSetting(wrapper);
    await expandByTitle('GroupL2');
    await expandByTitle('GroupL3');

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );
    const l2 = visibleTreeItems().find(
      (node) => node.textContent === 'GroupL2',
    );
    act(() => {
      fireEvent.click(l2?.querySelector('.ant-tree-checkbox') as HTMLElement);
    });
    await waitForWaitTime(300);
    expect(headers()).toEqual(['A', 'D']);

    for (const title of ['GroupL2', 'GroupL3']) {
      const node = visibleTreeItems().find(
        (item) => item.textContent === title,
      );
      if (node?.getAttribute('aria-expanded') === 'false') {
        act(() => {
          fireEvent.click(
            node.querySelector('.ant-tree-switcher') as HTMLElement,
          );
        });
        await waitForWaitTime(200);
      }
    }
    const c1 = visibleTreeItems().find((node) => node.textContent === 'C1');
    expect(c1).toBeTruthy();
    act(() => {
      fireEvent.click(c1?.querySelector('.ant-tree-checkbox') as HTMLElement);
    });
    await waitForWaitTime(300);
    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'GroupL3', 'C1']);
    wrapper.unmount();
  });
});
