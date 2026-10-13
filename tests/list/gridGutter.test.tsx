import { ProList } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

type Item = { id: string; title: string };

const data: Item[] = [
  { id: '1', title: 'A' },
  { id: '2', title: 'B' },
  { id: '3', title: 'C' },
  { id: '4', title: 'D' },
];

/**
 * #8387 ProList 卡片(grid)模式自定义 itemRender 时 gutter 不生效。
 */
describe('ProList grid gutter with custom itemRender (#8387)', () => {
  it('自定义 itemRender 时 grid gutter 仍然生效', () => {
    const html = render(
      <ProList<Item>
        rowKey="id"
        dataSource={data}
        grid={{ gutter: 16, column: 4 }}
        itemRender={(item) => (
          <div data-testid={`card-${item.id}`}>{item.title}</div>
        )}
      />,
    );

    // grid 容器存在且带负 margin
    const container = html.container.querySelector(
      '.ant-pro-list-grid-container',
    ) as HTMLElement;
    expect(container).toBeTruthy();
    expect(container.style.marginInline).toBe('-8px');

    // 每个 item 被 col 包装且有 gutter padding
    const cols = html.container.querySelectorAll('.ant-pro-list-grid-col');
    expect(cols.length).toBe(4);
    cols.forEach((col) => {
      expect((col as HTMLElement).style.paddingInline).toBe('8px');
    });

    expect(html.getByTestId('card-1')).toBeTruthy();
    expect(html.getByTestId('card-4')).toBeTruthy();
  });

  it('默认渲染(无 itemRender)同样生效', () => {
    const html = render(
      <ProList<Item>
        rowKey="id"
        dataSource={data}
        grid={{ gutter: 16, column: 2 }}
        metas={{
          title: { dataIndex: 'title' },
        }}
      />,
    );
    const container = html.container.querySelector(
      '.ant-pro-list-grid-container',
    ) as HTMLElement;
    expect(container).toBeTruthy();
    expect(container.style.marginInline).toBe('-8px');
    const cols = html.container.querySelectorAll('.ant-pro-list-grid-col');
    expect(cols.length).toBe(4);
  });
});
