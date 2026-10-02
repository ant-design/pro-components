import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { ActionType } from '../../src';
import { EditableProTable } from '../../src';

/**
 * #9618:ProTable valueType:'money' 编辑模式异常。
 * 在 EditableProTable 行编辑中使用 money 字段不应崩溃,
 * 保存后的值应为数字而非带货币符号的字符串。
 */
describe('#9618 money valueType in edit mode', () => {
  it('EditableProTable money column edits without crash', async () => {
    const actionRef = React.createRef<ActionType>();
    const onSave = vi.fn();

    render(
      <EditableProTable
        rowKey="id"
        actionRef={actionRef}
        recordCreatorProps={false}
        editable={{
          editableKeys: [1],
          onSave: async (_key, row) => {
            onSave(row);
          },
        }}
        value={[{ id: 1, price: 100 }]}
        columns={[
          {
            title: '价格',
            dataIndex: 'price',
            valueType: 'money',
            width: 160,
          },
          {
            title: '操作',
            valueType: 'option',
            width: 120,
          },
        ]}
      />,
    );

    // 编辑态输入框应正常渲染,不崩溃
    const input = await waitFor(() => {
      const el = document.querySelector<HTMLInputElement>(
        '.ant-input-number-input',
      );
      expect(el).toBeTruthy();
      return el!;
    });
    expect(input.value).toContain('100');

    // 修改值
    fireEvent.change(input, { target: { value: '200' } });
    await waitFor(() => {
      expect(input.value).toContain('200');
    });

    // 通过 actionRef 保存
    await waitFor(() => {
      expect(actionRef.current?.saveEditable).toBeTruthy();
    });
    await actionRef.current?.saveEditable(1);
    await new Promise((r) => setTimeout(r, 300));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
    });
    const savedRow = onSave.mock.lastCall?.[0] as any;
    // 保存值应为数字,不应是带 ¥ 的字符串
    expect([200, '200']).toContain(savedRow.price);
  });
});
