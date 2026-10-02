import { ProList } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ProList custom itemRender grid gutter (#8387)', () => {
  it('keeps container margins and item padding around custom content', () => {
    const { container, getByTestId } = render(
      <ProList
        rowKey="id"
        grid={{ column: 2, gutter: [16, 24] }}
        dataSource={[
          { id: 1, title: 'First' },
          { id: 2, title: 'Second' },
        ]}
        itemRender={(item) => (
          <article data-testid={`custom-${item.id}`}>{item.title}</article>
        )}
      />,
    );

    const grid = container.querySelector<HTMLElement>(
      '.ant-pro-list-grid-container',
    );
    expect(grid?.style.marginInline).toBe('-8px');
    expect(grid?.style.marginBlock).toBe('-12px');

    const wrapper = getByTestId('custom-1').parentElement;
    expect(wrapper?.style.paddingInline).toBe('8px');
    expect(wrapper?.style.paddingBlock).toBe('12px');
    expect(wrapper?.style.flexBasis).toBe('50%');
  });
});
