import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
