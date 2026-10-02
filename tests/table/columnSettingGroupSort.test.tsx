import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  hasReorderableSiblings,
  reorderNestedColumns,
} from '../../src/table/components/ColumnSetting';
import { waitForWaitTime } from '../util';

const columns: any[] = [
  { title: 'A', dataIndex: 'A', key: 'A' },
  {
    title: 'GroupL2',
    key: 'group-l2',
    children: [
      { title: 'B', dataIndex: 'B', key: 'B' },
      { title: 'C', dataIndex: 'C', key: 'C' },
      { title: 'E', dataIndex: 'E', key: 'E' },
    ],
  },
  { title: 'D', dataIndex: 'D', key: 'D' },
];

/**
 * #8133 分组表头子列排序:
 * move 将同级 order 写入 columnsMap 后,
 * genProColumnToColumn 应按 order 重排 children,
 * 而不是保持 columns 源数组顺序。
 */
describe('#8133 grouped child column order', () => {
  it('enables dragging when a single root group has reorderable children', () => {
    expect(
      hasReorderableSiblings([
        { key: 'group', children: [{ key: 'B' }, { key: 'C' }] },
      ]),
    ).toBe(true);
    expect(
      hasReorderableSiblings([{ key: 'group', children: [{ key: 'B' }] }]),
    ).toBe(false);
  });

  it('reorders nested siblings with the same calculation used by drag and drop', () => {
    const parent = { key: 'group', children: [] as any[] };
    const children = ['B', 'C', 'E'].map((key) => ({
      key,
      parentKey: 'group',
    }));
    parent.children = children;
    const treeMap = new Map<string, any>([
      ['group', parent],
      ...children.map((node) => [node.key, node] as [string, any]),
    ]);

    const movedDown = reorderNestedColumns({}, treeMap, [parent], 'B', 'E', 2);
    expect(movedDown).toMatchObject({
      C: { order: 0 },
      E: { order: 1 },
      B: { order: 2 },
    });
    const movedFirst = reorderNestedColumns(
      movedDown!,
      treeMap,
      [parent],
      'E',
      'C',
      0,
    );
    expect(movedFirst).toMatchObject({
      B: { order: 0 },
      E: { order: 1 },
      C: { order: 2 },
    });
    const movedToListStart = reorderNestedColumns(
      movedFirst!,
      treeMap,
      [parent],
      'E',
      'B',
      0,
    );
    expect(movedToListStart).toMatchObject({
      E: { order: 0 },
      B: { order: 1 },
      C: { order: 2 },
    });
    expect(
      reorderNestedColumns({}, treeMap, [parent], 'missing', 'B', 1),
    ).toBeUndefined();
  });

  it('children render in columnsMap order when orders are set', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        // 模拟 move 写入的 order:B(0) C(1) E(2) → 重排为 E(2) B(0) C(1)
        columnsState={{
          value: {
            B: { order: 0 },
            C: { order: 1 },
            E: { order: 2 },
          },
        }}
        dataSource={[{ A: '1', B: '2', C: '3', E: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await waitForWaitTime(300);

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );

    // B C E 按 order 升序 → B, C, E(源顺序,order 恰好一致)
    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'B', 'C', 'E']);

    wrapper.unmount();
  });

  it('reordered children follow new order values', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        // order 反转:E(0) C(1) B(2) → 子列渲染顺序应为 E, C, B
        columnsState={{
          value: {
            B: { order: 2 },
            C: { order: 1 },
            E: { order: 0 },
          },
        }}
        dataSource={[{ A: '1', B: '2', C: '3', E: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await waitForWaitTime(300);

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );

    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'E', 'C', 'B']);

    wrapper.unmount();
  });

  it('children without orders keep source order (stable)', async () => {
    const wrapper = render(
      <ProTable
        columns={columns}
        dataSource={[{ A: '1', B: '2', C: '3', E: '4', D: '5' }]}
        rowKey="A"
        search={false}
      />,
    );
    await waitForWaitTime(300);

    const headers = () =>
      Array.from(wrapper.container.querySelectorAll('.ant-table-thead th')).map(
        (th) => th.textContent,
      );

    expect(headers()).toEqual(['A', 'GroupL2', 'D', 'B', 'C', 'E']);

    wrapper.unmount();
  });
});
