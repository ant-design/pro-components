import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { BetaSchemaForm } from '../../src';
import type { ProFormColumnsType } from '../../src';

/**
 * #8397:BetaSchemaForm 的 QueryFilter 布局下,columns 的 hidden 字段
 * 不应占用栅格位置(不渲染占位 Col),且隐藏项由 ant-form-item-hidden 隐藏。
 */
describe('#8397 BetaSchemaForm QueryFilter hidden', () => {
  it('hidden column does not occupy grid space', () => {
    const columns: ProFormColumnsType[] = [
      {
        title: '可见字段',
        dataIndex: 'visible',
      },
      {
        title: '隐藏字段',
        dataIndex: 'hiddenField',
        hidden: true,
        dependencies: ['visible'],
      },
      {
        title: '可见字段2',
        dataIndex: 'visible2',
      },
    ];

    const { container } = render(
      <BetaSchemaForm
        layoutType="QueryFilter"
        defaultCollapsed={false}
        columns={columns}
      />,
    );

    // hidden 项标记为 ant-form-item-hidden(CSS 隐藏,jsdom 中仍在 DOM)
    const hiddenItems = container.querySelectorAll(
      '.ant-form-item.ant-form-item-hidden',
    );
    expect(hiddenItems.length).toBe(2);

    // 核心断言:hidden 字段不产生栅格占位 Col。
    // QueryFilter 行的直接子 Col 中,只有 2 个字段 Col + 1 个 actions Col;
    // 隐藏项被 processQueryFilterItems 移除(itemDom: null)。
    const rowCols = container.querySelectorAll(
      '.ant-pro-query-filter-row > .ant-col',
    );
    expect(rowCols.length).toBe(3);

    // 每个 Col 都不应包含 hidden 的表单项(隐藏项不进栅格)
    rowCols.forEach((col) => {
      expect(col.querySelector('.ant-form-item-hidden')).toBeNull();
    });
  });

  it('does not count hidden columns toward the collapse budget', () => {
    const columns: ProFormColumnsType[] = [
      { title: '隐藏字段', dataIndex: 'hidden', hidden: true },
      { title: '可见字段A', dataIndex: 'visibleA' },
      { title: '可见字段B', dataIndex: 'visibleB' },
    ];

    const { container } = render(
      <BetaSchemaForm
        layoutType="QueryFilter"
        defaultCollapsed
        defaultFormItemsNumber={2}
        columns={columns}
      />,
    );

    expect(container.querySelector('input[id$="_visibleA"]')).toBeTruthy();
    expect(container.querySelector('input[id$="_visibleB"]')).toBeTruthy();
  });
});
