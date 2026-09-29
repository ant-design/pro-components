import { EditableProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  document.body.innerHTML = '';
});

type Row = {
  id: string;
  title?: string;
  children?: Row[];
};

const nestedData: Row[] = [
  {
    id: 'p1',
    title: '父行 1',
    children: [
      { id: 'c1', title: '子行 1' },
      { id: 'c2', title: '子行 2' },
    ],
  },
  { id: 'p2', title: '父行 2' },
];

/**
 * #8662 嵌套表格二级内容(子行)取消编辑时,不应自动触发 onDelete。
 * 根因:快照/记录查找只覆盖顶层 dataSource,子行查不到被当作新增行删除。
 * #7859/#8861 子行编辑时 onValuesChange 的 record 应携带子行自己的业务 id。
 */
describe('EditableProTable nested row edit (#8662/#7859/#8861)', () => {
  it('完整 UI 流程:子行编辑 → 点击取消 → onDelete 不触发、行保留', async () => {
    const user = userEvent.setup();
    const onDeleteFn = vi.fn(async () => undefined);
    const onCancelFn = vi.fn(async () => undefined);

    const Demo = () => {
      const [editableKeys, setEditableKeys] = React.useState<React.Key[]>([]);
      return (
        <EditableProTable<Row>
          rowKey="id"
          defaultValue={nestedData}
          expandable={{ defaultExpandAllRows: true }}
          recordCreatorProps={false}
          editable={{
            editableKeys,
            onChange: setEditableKeys,
            onCancel: onCancelFn,
            onDelete: onDeleteFn,
          }}
          columns={[
            { title: '标题', dataIndex: 'title' },
            {
              title: '操作',
              valueType: 'option',
              render: (_, row) => [
                <a
                  key="edit"
                  data-testid={`edit-${row.id}`}
                  onClick={() => setEditableKeys([row.id])}
                >
                  编辑
                </a>,
              ],
            },
          ]}
        />
      );
    };
    const html = render(<Demo />);
    await waitForWaitTime(400);

    // 展开的子行可见
    expect(html.getByText('子行 1')).toBeTruthy();
    expect(html.getByText('子行 2')).toBeTruthy();

    // 编辑子行 c1
    await user.click(html.getByTestId('edit-c1'));
    await waitForWaitTime(300);
    const input = html.baseElement.querySelector(
      '.ant-table-row input',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('子行 1');

    // 点击取消
    await user.click(html.getByText('取消'));
    await waitForWaitTime(400);

    // 关键断言:取消不应触发 onDelete
    expect(onDeleteFn).not.toHaveBeenCalled();
    expect(onCancelFn.mock.calls[0]?.[0]).toBe('c1');

    // 子行仍然存在
    expect(html.getByText('子行 1')).toBeTruthy();

    html.unmount();
  });

  it('#7859/#8861 子行编辑时 onValuesChange 的 record 携带业务 id', async () => {
    const user = userEvent.setup();
    const records: any[] = [];

    const Demo = () => {
      const [editableKeys, setEditableKeys] = React.useState<React.Key[]>([]);
      return (
        <EditableProTable<Row>
          rowKey="id"
          defaultValue={nestedData}
          expandable={{ defaultExpandAllRows: true }}
          recordCreatorProps={false}
          editable={{
            editableKeys,
            onChange: setEditableKeys,
            onValuesChange: (record) => {
              records.push({ ...record });
            },
          }}
          columns={[
            { title: '标题', dataIndex: 'title' },
            {
              title: '操作',
              valueType: 'option',
              render: (_, row) => [
                <a
                  key="edit"
                  data-testid={`edit-${row.id}`}
                  onClick={() => setEditableKeys([row.id])}
                >
                  编辑
                </a>,
              ],
              editable: false,
            },
          ]}
        />
      );
    };
    const html = render(<Demo />);
    await waitForWaitTime(400);

    // 编辑子行 c1 并修改标题
    await user.click(html.getByTestId('edit-c1'));
    await waitForWaitTime(300);
    const input = html.baseElement.querySelector(
      '.ant-table-row input',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();

    await user.clear(input);
    await user.type(input, '子行 1 改');
    await waitForWaitTime(600);

    // onValuesChange 的 record 应包含子行自己的业务 id
    // (输入过程 debounce 会触发多次,record.title 取决于 debounce 窗口,只验证 id 归属)
    const withId = [...records].reverse().find((r) => r?.id === 'c1');
    expect(withId).toBeTruthy();
    expect(withId.title).toContain('子行 1');

    html.unmount();
  });
});
