import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProTable } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

type Row = { key: string; city: string; area?: string; name: string };

const baseData: Row[] = [
  { key: '1', city: '上海', area: '浦东', name: '张三' },
  { key: '2', city: '上海', area: '浦东', name: '李四' },
  { key: '3', city: '北京', area: '海淀', name: '王五' },
];

const getBodyRows = (container: HTMLElement) =>
  container.querySelectorAll('.ant-table-tbody > tr.ant-table-row');

describe('ProTable autoMerge 同值单元格纵向自动合并 (#9770)', () => {
  it('列配置 autoMerge:true 时当前页连续同值单元格纵向合并', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        dataSource={baseData}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(3);
      // 上海合并两行：组首行 rowspan=2
      const row1Cells = rows[0].querySelectorAll('td');
      expect(row1Cells[0].textContent).toBe('上海');
      expect(row1Cells[0].getAttribute('rowspan')).toBe('2');
      // 第二行城市单元格不渲染，首个 td 为姓名列
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells.length).toBe(1);
      expect(row2Cells[0].textContent).toBe('李四');
      // 北京独立成行
      const row3Cells = rows[2].querySelectorAll('td');
      expect(row3Cells.length).toBe(2);
      expect(row3Cells[0].textContent).toBe('北京');
    });
  });

  it('表级 mergeFields 批量指定合并字段', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        mergeFields={['city']}
        dataSource={baseData}
        columns={[
          { title: '城市', dataIndex: 'city' },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows[0].querySelector('td')!.getAttribute('rowspan')).toBe('2');
      expect(rows[1].querySelectorAll('td').length).toBe(1);
    });
  });

  it('多级依次合并：子级字段不跨父级组合并', async () => {
    const data: Row[] = [
      { key: '1', city: '上海', area: '浦东', name: '张三' },
      { key: '2', city: '上海', area: '浦东', name: '李四' },
      { key: '3', city: '北京', area: '浦东', name: '王五' },
    ];
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        mergeFields={['city', 'area']}
        dataSource={data}
        columns={[
          { title: '城市', dataIndex: 'city' },
          { title: '区域', dataIndex: 'area' },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      // city: 上海合并前两行
      expect(rows[0].querySelectorAll('td')[0].getAttribute('rowspan')).toBe(
        '2',
      );
      // area: 上海组内浦东合并前两行；北京组的浦东不跨城市组合并
      expect(rows[0].querySelectorAll('td')[1].getAttribute('rowspan')).toBe(
        '2',
      );
      const row3Cells = rows[2].querySelectorAll('td');
      expect(row3Cells[0].textContent).toBe('北京');
      expect(row3Cells[1].textContent).toBe('浦东');
      expect(row3Cells[1].getAttribute('rowspan')).not.toBe('0');
    });
  });

  it('request 服务端分页场景下合并当前页数据', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        request={async () => ({
          data: baseData,
          success: true,
          total: 3,
        })}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(3);
      expect(rows[0].querySelector('td')!.getAttribute('rowspan')).toBe('2');
      expect(rows[1].querySelectorAll('td').length).toBe(1);
    });
  });

  it('用户手动 onCell 显式返回 rowSpan 时优先于 autoMerge', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        dataSource={baseData}
        columns={[
          {
            title: '城市',
            dataIndex: 'city',
            autoMerge: true,
            onCell: () => ({ rowSpan: 1 }),
          },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      // 用户强制 rowSpan=1，三行城市单元格都渲染
      expect(rows[0].querySelectorAll('td').length).toBe(2);
      expect(rows[1].querySelectorAll('td').length).toBe(2);
      expect(rows[1].querySelector('td')!.textContent).toBe('上海');
    });
  });

  it('与 rowSelection 复选框列兼容', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        rowSelection={{}}
        dataSource={baseData}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      // 首列为复选框，第二列为合并后的城市
      const row1Cells = rows[0].querySelectorAll('td');
      expect(row1Cells[1].textContent).toBe('上海');
      expect(row1Cells[1].getAttribute('rowspan')).toBe('2');
      // 第二行只剩复选框与姓名
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells.length).toBe(2);
      expect(row2Cells[1].textContent).toBe('李四');
    });
  });

  it('前端分页切换后自动重新计算合并信息', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={{ pageSize: 2 }}
        dataSource={baseData}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(2);
      expect(rows[0].querySelector('td')!.getAttribute('rowspan')).toBe('2');
    });

    await userEvent.click(container.querySelector('.ant-pagination-item-2')!);

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(1);
      // 第二页只有北京，不合并、不隐藏单元格
      expect(rows[0].querySelectorAll('td').length).toBe(2);
      expect(rows[0].querySelector('td')!.textContent).toBe('北京');
    });
  });

  it('前端排序后自动重新计算合并信息', async () => {
    const columns: ProColumns<Row>[] = [
      {
        title: '城市',
        dataIndex: 'city',
        autoMerge: true,
        // 显式定义排序：北京在前，避免 localeCompare 的环境差异
        sorter: (a, b) => (a.city === b.city ? 0 : a.city === '北京' ? -1 : 1),
      },
      { title: '姓名', dataIndex: 'name' },
    ];
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        dataSource={baseData}
        columns={columns}
      />,
    );

    await waitFor(() => {
      expect(
        getBodyRows(container)[0].querySelector('td')!.getAttribute('rowspan'),
      ).toBe('2');
    });

    await userEvent.click(
      container.querySelector('.ant-table-column-sorter-up')!,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      // 排序后顺序为 北京、上海、上海：北京不合并，上海合并后两行
      const row1Cells = rows[0].querySelectorAll('td');
      expect(row1Cells[0].textContent).toBe('北京');
      expect(row1Cells.length).toBe(2);
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells[0].textContent).toBe('上海');
      expect(row2Cells[0].getAttribute('rowspan')).toBe('2');
      const row3Cells = rows[2].querySelectorAll('td');
      expect(row3Cells.length).toBe(1);
      expect(row3Cells[0].textContent).toBe('李四');
    });
  });

  it('与 expandable 展开行兼容：顶层行合并，展开内容不受影响', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => <span>详情-{record.name}</span>,
        }}
        dataSource={baseData}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(3);
      // 首列为展开图标列，城市列合并前两行
      const row1Cells = rows[0].querySelectorAll('td');
      expect(row1Cells[1].textContent).toBe('上海');
      expect(row1Cells[1].getAttribute('rowspan')).toBe('2');
      // 第二行城市单元格不渲染：展开图标列 + 姓名列
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells.length).toBe(2);
      expect(row2Cells[1].textContent).toBe('李四');
    });
  });

  it('树形数据不支持自动合并：跳过合并并警告，所有单元格正常渲染', async () => {
    const treeData: (Row & { children?: Row[] })[] = [
      {
        key: '1',
        city: '上海',
        name: '张三',
        children: [{ key: '1-1', city: '上海', name: '子行' }],
      },
      { key: '2', city: '上海', name: '李四' },
    ];
    const { container } = render(
      <ProTable<Row & { children?: Row[] }>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        defaultExpandAllRows
        dataSource={treeData}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      // 两个顶层行 + 一个展开的树形子行
      expect(rows.length).toBe(3);
      // 树形数据下不合并：顶层第二行(李四)的城市单元格正常渲染，
      // 避免父行跨行 td 与子行 td 冲突导致列错位
      const li4Row = Array.from(rows).find((row) =>
        row.textContent?.includes('李四'),
      )!;
      const li4Cells = li4Row.querySelectorAll('td');
      expect(li4Cells.length).toBe(2);
      expect(li4Cells[0].textContent).toBe('上海');
      // 树形子行同样完整渲染
      const childRow = Array.from(rows).find((row) =>
        row.textContent?.includes('子行'),
      )!;
      expect(childRow.querySelectorAll('td').length).toBe(2);
    });
  });

  it('排序键与合并键不同时，前端排序后仍按排序结果重算合并', async () => {
    // 初始顺序中上海不相邻，不合并；按姓名排序后上海相邻，应合并
    const data: Row[] = [
      { key: '1', city: '上海', name: 'banana' },
      { key: '2', city: '北京', name: 'apple' },
      { key: '3', city: '上海', name: 'cherry' },
    ];
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        dataSource={data}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          {
            title: '姓名',
            dataIndex: 'name',
            sorter: (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
          },
        ]}
      />,
    );

    await waitFor(() => {
      expect(getBodyRows(container).length).toBe(3);
    });

    await userEvent.click(
      container.querySelector('.ant-table-column-sorter-up')!,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      // 排序后:北京(apple)、上海(banana)、上海(cherry)
      expect(rows[0].querySelector('td')!.textContent).toBe('北京');
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells[0].textContent).toBe('上海');
      expect(row2Cells[0].getAttribute('rowspan')).toBe('2');
      // 第三行城市单元格被合并隐藏,首个 td 是姓名
      const row3Cells = rows[2].querySelectorAll('td');
      expect(row3Cells.length).toBe(1);
      expect(row3Cells[0].textContent).toBe('cherry');
    });
  });

  it('列本地筛选后按筛选结果重算合并,不残留隐藏单元格', async () => {
    // 初始上海合并(apple+banana);筛掉 apple 后 banana 行的城市单元格必须正常渲染
    const data: Row[] = [
      { key: '1', city: '上海', name: 'apple' },
      { key: '2', city: '上海', name: 'banana' },
      { key: '3', city: '北京', name: 'cherry' },
    ];
    const { container, baseElement } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        dataSource={data}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          {
            title: '姓名',
            dataIndex: 'name',
            filters: [{ text: 'banana', value: 'banana' }],
            onFilter: (value, record) => record.name === value,
          },
        ]}
      />,
    );

    await waitFor(() => {
      expect(
        getBodyRows(container)[0]
          .querySelector('td')!
          .getAttribute('rowspan'),
      ).toBe('2');
    });

    // 打开筛选面板,勾选 banana 并确认
    await userEvent.click(
      container.querySelector('.ant-table-filter-trigger')!,
    );
    const option = await waitFor(() => {
      const item = Array.from(
        baseElement.querySelectorAll(
          '.ant-table-filter-dropdown .ant-dropdown-menu-item',
        ),
      ).find((el) => el.textContent?.includes('banana'));
      expect(item).toBeTruthy();
      return item as HTMLElement;
    });
    await userEvent.click(option);
    const okButton = Array.from(
      baseElement.querySelectorAll('.ant-table-filter-dropdown-btns button'),
    ).find((el) => el.className.includes('primary')) as HTMLElement;
    await userEvent.click(okButton);

    await waitFor(() => {
      const rows = getBodyRows(container);
      // 筛选后只剩上海(banana)一行,城市单元格正常渲染且不被隐藏
      expect(rows.length).toBe(1);
      const cells = rows[0].querySelectorAll('td');
      expect(cells.length).toBe(2);
      expect(cells[0].textContent).toBe('上海');
    });
  });

  it('可编辑表格中编辑中的行不参与合并，编辑行单元格不被隐藏', async () => {
    const data: Row[] = [
      { key: '1', city: '上海', name: '张三' },
      { key: '2', city: '上海', name: '李四' },
    ];
    const { container } = render(
      <EditableProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        recordCreatorProps={false}
        value={data}
        editable={{ editableKeys: ['2'], type: 'multiple' }}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(2);
      // 第二行处于编辑状态：城市单元格不被合并隐藏(否则编辑输入框不可见)
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells.length).toBe(2);
      // 第一行因组合并被打断,也不再跨行
      expect(
        rows[0].querySelector('td')!.getAttribute('rowspan'),
      ).not.toBe('2');
    });
  });
});

