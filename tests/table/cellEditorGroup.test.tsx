import { CellEditorTable } from '@ant-design/pro-components';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

type Row = { id: number; name: string; age: number };

const columns: any[] = [
  {
    title: 'Base Info',
    children: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Age', dataIndex: 'age' },
    ],
  },
  { title: 'ID', dataIndex: 'id', editable: false },
];

/**
 * #8880 分组表头下 CellEditorTable 双击单元格无法进入编辑态:
 * onDoubleClick 只注入到了顶层列,分组列的叶子列(children)没有 onCell。
 */
describe('#8880 CellEditorTable with grouped header', () => {
  it('double click on grouped child cell enters edit mode', async () => {
    const wrapper = render(
      <CellEditorTable<Row>
        rowKey="id"
        columns={columns}
        value={[{ id: 1, name: 'Alice', age: 20 }]}
      />,
    );
    await waitForWaitTime(300);

    // 初始:无输入框(全部只读)
    expect(wrapper.container.querySelectorAll('input').length).toBe(0);

    // 双击分组表头下的 Name 单元格(跳过 antd 的 measure 行)
    const nameCell = wrapper.container.querySelectorAll(
      'tr.ant-table-row td',
    )[0];
    expect(nameCell.textContent).toBe('Alice');
    act(() => {
      fireEvent.doubleClick(nameCell);
    });
    await waitForWaitTime(300);

    // Name 列进入编辑态:出现输入框且值为 Alice
    const input = wrapper.container.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('Alice');

    wrapper.unmount();
  });

  it('double click on flat column cell still enters edit mode', async () => {
    const wrapper = render(
      <CellEditorTable<Row>
        rowKey="id"
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ]}
        value={[{ id: 1, name: 'Alice', age: 20 }]}
      />,
    );
    await waitForWaitTime(300);

    expect(wrapper.container.querySelectorAll('input').length).toBe(0);
    const nameCell = wrapper.container.querySelectorAll(
      'tr.ant-table-row td',
    )[0];
    act(() => {
      fireEvent.doubleClick(nameCell);
    });
    await waitForWaitTime(300);
    const input = wrapper.container.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('Alice');

    wrapper.unmount();
  });

  it('keeps duplicate child dataIndex columns isolated by their parent path', async () => {
    const wrapper = render(
      <CellEditorTable<Row>
        rowKey="id"
        columns={[
          {
            title: 'Primary',
            key: 'primary',
            children: [
              { title: 'Name', key: 'primary-name', dataIndex: 'name' },
            ],
          },
          {
            title: 'Secondary',
            key: 'secondary',
            children: [
              { title: 'Name again', key: 'secondary-name', dataIndex: 'name' },
            ],
          },
        ]}
        value={[{ id: 1, name: 'Alice', age: 20 }]}
      />,
    );
    await waitForWaitTime(300);
    const cells = wrapper.container.querySelectorAll('tr.ant-table-row td');
    act(() => fireEvent.doubleClick(cells[0]));
    await waitForWaitTime(300);
    expect(wrapper.container.querySelectorAll('input')).toHaveLength(1);
    wrapper.unmount();
  });
});
