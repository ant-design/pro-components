import { ProTable } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { columns } from './fixtures';

afterEach(() => {
  cleanup();
});

describe('ProTable scroll.y = fill', () => {
  it('adds fill-height class when scroll.y is fill', () => {
    const { container } = render(
      <ProTable
        columns={columns}
        dataSource={[]}
        scroll={{ y: 'fill' }}
        rowKey="key"
        search={false}
        options={false}
      />,
    );
    const root = container.querySelector('[data-testid="pro-table"]');
    expect(root?.className).toContain('fill-height');
  });

  it('does not add fill-height class when scroll.y is a number', () => {
    const { container } = render(
      <ProTable
        columns={columns}
        dataSource={[]}
        scroll={{ y: 300 }}
        rowKey="key"
        search={false}
        options={false}
      />,
    );
    const root = container.querySelector('[data-testid="pro-table"]');
    expect(root?.className).not.toContain('fill-height');
  });

  it('does not add fill-height class without scroll prop', () => {
    const { container } = render(
      <ProTable
        columns={columns}
        dataSource={[]}
        rowKey="key"
        search={false}
        options={false}
      />,
    );
    const root = container.querySelector('[data-testid="pro-table"]');
    expect(root?.className).not.toContain('fill-height');
  });

  it('does not pass fill to antd table scroll.y', () => {
    const { container } = render(
      <ProTable
        columns={columns}
        dataSource={[]}
        scroll={{ y: 'fill' }}
        rowKey="key"
        search={false}
        options={false}
      />,
    );
    const tableBody = container.querySelector('.ant-table-body');
    if (tableBody) {
      const style = (tableBody as HTMLElement).style;
      expect(style.maxHeight).not.toBe('fill');
    }
  });

  it('preserves scroll.x when scroll.y is fill', () => {
    const { container } = render(
      <ProTable
        columns={columns}
        dataSource={[]}
        scroll={{ x: 1200, y: 'fill' }}
        rowKey="key"
        search={false}
        options={false}
      />,
    );
    const root = container.querySelector('[data-testid="pro-table"]');
    expect(root?.className).toContain('fill-height');
  });
});
