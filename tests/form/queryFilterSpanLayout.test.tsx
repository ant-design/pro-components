import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { BetaSchemaForm } from '../../src';
import type { ProFormColumnsType } from '../../src';

/**
 * #8836:QueryFilter 响应式 span 对象({xs:1,...})时,vertical 布局
 * 不应被强制改写为 horizontal。
 */
describe('#8836 QueryFilter responsive span keeps vertical layout', () => {
  it('span object with layout=vertical stays vertical', () => {
    const columns: ProFormColumnsType[] = [
      { title: 'A', dataIndex: 'a' },
      { title: 'B', dataIndex: 'b' },
    ];

    const { container } = render(
      <BetaSchemaForm
        layoutType="QueryFilter"
        layout="vertical"
        span={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
        columns={columns}
      />,
    );

    // vertical 布局下 label 与控件上下排列(antd 标记 ant-form-item-vertical)
    const verticalItems = container.querySelectorAll(
      '.ant-form-item-vertical',
    );
    expect(verticalItems.length).toBeGreaterThanOrEqual(2);

    // 不应出现 horizontal 标记
    const horizontalItems = container.querySelectorAll(
      '.ant-form-item-horizontal',
    );
    expect(horizontalItems.length).toBe(0);
  });
});
