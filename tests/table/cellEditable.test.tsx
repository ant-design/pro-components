import type {
  EditableProTableProps,
  ProColumns,
} from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { act, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

interface Row {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const dataSource: Row[] = [
  { key: '1', name: 'Alice', age: 18, address: 'London' },
  { key: '2', name: 'Bob', age: 22, address: 'Paris' },
];

const baseProps: EditableProTableProps<Row, any> = {
  rowKey: 'key',
  value: dataSource,
  columns: [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'Option',
      valueType: 'option',
      key: 'option',
      render: () => [<a key="edit">edit</a>],
    },
  ],
  search: false,
};

/**
 * #9643 方案 A：editableKeys 支持 cell 粒度复合键 `${rowKey}:${dataIndex}`。
 * 行级 key 完全向后兼容。
 */
describe('EditableProTable cell-level editableKeys (#9643)', () => {
  it('📦 cell 复合键只激活对应单元格', async () => {
    const { container } = render(
      <EditableProTable
        {...baseProps}
        editable={{ editableKeys: ['1:name'] }}
      />,
    );
    await waitForWaitTime(200);

    const inputs = container.querySelectorAll('tbody input');
    // 只有 name 列出现输入框
    expect(inputs.length).toBe(1);
    expect((inputs[0] as HTMLInputElement).value).toBe('Alice');
  });

  it('📦 cell 编辑时 option 列不渲染保存/取消按钮', async () => {
    const { container } = render(
      <EditableProTable
        {...baseProps}
        editable={{ editableKeys: ['1:name'] }}
      />,
    );
    await waitForWaitTime(200);

    // 无保存/取消按钮（行级未激活）
    expect(container.textContent).not.toContain('保 存');
    expect(container.textContent).not.toContain('取 消');
  });

  it('📦 行级 key 仍渲染整行编辑 + 操作按钮（向后兼容）', async () => {
    const { container } = render(
      <EditableProTable {...baseProps} editable={{ editableKeys: ['1'] }} />,
    );
    await waitForWaitTime(200);

    // name + age 都进入编辑
    expect(container.querySelectorAll('tbody input').length).toBe(2);
    expect(container.textContent).toContain('保存');
    expect(container.textContent).toContain('取消');
  });

  it('📦 cell 与行级 key 混用', async () => {
    const { container } = render(
      <EditableProTable
        {...baseProps}
        editable={{ editableKeys: ['1:name', '2:age'] }}
      />,
    );
    await waitForWaitTime(200);

    const inputs = container.querySelectorAll('tbody input');
    expect(inputs.length).toBe(2);
    expect((inputs[0] as HTMLInputElement).value).toBe('Alice');
    expect((inputs[1] as HTMLInputElement).value).toBe('22');
  });
});

/**
 * #9043 / #9643 方案 C：onCell 返回的 td props 透出编辑状态。
 */
describe('ProTable onCell editing state (#9043)', () => {
  it('📦 编辑行/单元格的 td 带 data-editing 属性', async () => {
    const { container } = render(
      <EditableProTable
        {...baseProps}
        editable={{ editableKeys: ['1:name'] }}
      />,
    );
    await waitForWaitTime(200);

    const row1 = container.querySelector('tbody tr');
    expect(row1).toBeTruthy();
    const editingTds = container.querySelectorAll(
      'td[data-editing="true"]',
    );
    // 整行标记编辑中
    expect(editingTds.length).toBeGreaterThan(0);

    // cell 级激活的列带复合键
    const cellEditingTds = container.querySelectorAll(
      'td[data-cell-editing]',
    );
    expect(cellEditingTds.length).toBe(3);
    expect(
      (cellEditingTds[0] as HTMLElement).dataset.cellEditing,
    ).toBe('1:name');
  });

  it('📦 非编辑行不带 data-editing', async () => {
    const { container } = render(
      <EditableProTable
        {...baseProps}
        editable={{ editableKeys: ['1:name'] }}
      />,
    );
    await waitForWaitTime(200);

    // 找到包含 Bob 的数据行（跳过测量行/表头）
    const dataRows = Array.from(
      container.querySelectorAll('tbody tr.ant-table-row'),
    );
    expect(dataRows.length).toBe(2);
    // 第二行（Bob）无编辑标记
    const row2Tds = dataRows[1].querySelectorAll('td');
    row2Tds.forEach((td) => {
      expect(td.hasAttribute('data-editing')).toBe(false);
    });
  });

  it('📦 用户 onCell 的返回值被保留', async () => {
    const { container } = render(
      <EditableProTable
        {...baseProps}
        columns={(baseProps.columns as ProColumns<Row>[] | undefined)?.map(
          (c) => ({
            ...c,
            onCell: (() => ({
              'data-custom': 'yes',
            })) as ProColumns<Row>['onCell'],
          }),
        )}
        editable={{ editableKeys: ['1:name'] }}
      />,
    );
    await waitForWaitTime(200);

    const td = container.querySelector('td[data-custom="yes"]');
    expect(td).toBeTruthy();
  });
});
