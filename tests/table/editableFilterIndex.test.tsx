import { EditableProTable, ProForm } from '@ant-design/pro-components';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

type Row = {
  id: React.Key;
  title?: string;
  state?: string;
};

const dataSource: Row[] = [
  { id: '1', title: 'row-1', state: 'open' },
  { id: '2', title: 'row-2', state: 'closed' },
  { id: '3', title: 'row-3', state: 'open' },
];

/**
 * #8930 name 模式 + 表格筛选后，编辑行的表单 namePath 使用了
 * 展示 index 而非 dataSource 真实 index，导致编辑数据错乱。
 */
describe('EditableProTable filter + name mode (#8930)', () => {
  it('筛选后编辑行,表单字段绑定到正确的数据行', async () => {
    const user = userEvent.setup();

    const Demo = () => {
      const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
      return (
        <ProForm
          submitter={false}
          initialValues={{ table: dataSource }}
        >
          <EditableProTable<Row>
            rowKey="id"
            name="table"
            recordCreatorProps={false}
            editable={{
              editableKeys,
              onChange: setEditableKeys,
            }}
            columns={[
              { title: '标题', dataIndex: 'title' },
              {
                title: '状态',
                dataIndex: 'state',
                filters: true,
                onFilter: true,
                valueEnum: {
                  open: { text: '进行中' },
                  closed: { text: '已关闭' },
                },
              },
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
        </ProForm>
      );
    };
    const html = render(<Demo />);

    await waitFor(() => {
      expect(html.getByText('row-1')).toBeTruthy();
      expect(html.getByText('row-2')).toBeTruthy();
      expect(html.getByText('row-3')).toBeTruthy();
    });

    // 打开筛选面板:状态列只保留「已关闭」
    const trigger = html.baseElement.querySelector(
      '.ant-table-filter-trigger',
    ) as HTMLElement;
    expect(trigger).toBeTruthy();
    await user.click(trigger);
    const closedOption = await waitFor(() => {
      const option = Array.from(
        html.baseElement.querySelectorAll(
          '.ant-table-filter-dropdown .ant-dropdown-menu-item',
        ),
      ).find((el) => el.textContent?.includes('已关闭'));
      expect(option).toBeTruthy();
      return option as HTMLElement;
    });
    await user.click(closedOption);
    const okBtn = Array.from(
      html.baseElement.querySelectorAll(
        '.ant-table-filter-dropdown-btns button',
      ),
    ).find((el) => el.className.includes('primary')) as HTMLElement;
    expect(okBtn).toBeTruthy();
    await user.click(okBtn);

    // 筛选后只剩 id=2 的行(展示 index 0,真实 index 1)
    await waitFor(() => {
      expect(html.queryByText('row-1')).toBeNull();
      expect(html.queryByText('row-3')).toBeNull();
      expect(html.getByText('row-2')).toBeTruthy();
    });

    // 进入编辑态
    await user.click(html.getByTestId('edit-2'));
    await waitFor(() => {
      expect(html.baseElement.querySelector('.ant-table-cell input')).toBeTruthy();
    });

    // 标题输入框当前值应该是 row-2 的 title,而不是展示 index 0 对应的 row-1
    // (title 列为纯 text,渲染为无 id 的 input;按值定位)
    const titleInput = Array.from(
      html.baseElement.querySelectorAll('.ant-table-cell input'),
    ).find((i) => !i.id) as HTMLInputElement;
    expect(titleInput).toBeTruthy();
    expect(titleInput.value).toBe('row-2');
  });
});
