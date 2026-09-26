import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProTable } from '../../src';
import type { ProColumns } from '../../src';

/**
 * #8978 valueType: 'select' + ellipsis + copyable 同时使用时省略失效
 * 根因：FieldSelectRead 输出 Fragment 列表，Typography.Text 的 ellipsis
 * 无法作用于多节点子级。修复：用单个 span 包裹。
 */
describe('#8978 select + ellipsis + copyable', () => {
  it('select 只读渲染被 span 包裹，ellipsis 可生效', () => {
    const columns: ProColumns[] = [
      {
        title: '单号',
        dataIndex: 'bizNo',
        valueType: 'select',
        ellipsis: true,
        copyable: true,
        width: 180,
        valueEnum: {
          CN202409260000000001: { text: 'CN202409260000000001' },
          CN202409260000000002: { text: 'CN202409260000000002' },
        },
      },
    ];
    const dataSource = [{ key: 1, bizNo: 'CN202409260000000001' }];

    const { container } = render(
      <ProTable
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        search={false}
      />,
    );

    // 单元格内存在 Typography.Text 包裹的省略结构
    const cell = container.querySelector('.ant-table-tbody .ant-table-cell');
    expect(cell?.querySelector('.ant-typography')).toBeTruthy();
    // #8978 修复点：枚举渲染结果被单个 span 包裹（不再是裸 Fragment）
    expect(cell?.querySelector('.pro-field-select-read')).toBeTruthy();
    // copyable 图标存在
    expect(cell?.querySelectorAll('[aria-label="copy"]').length).toBe(1);
  });
});
