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

  it('前端分页:相同城市跨页时不延续合并,每页独立计算且单元格不隐藏', async () => {
    // 3 个上海跨页:第 3 个上海落在第 2 页,不能与第 1 页的上海组合并
    const data: Row[] = [
      { key: '1', city: '上海', name: '张三' },
      { key: '2', city: '上海', name: '李四' },
      { key: '3', city: '上海', name: '赵六' },
      { key: '4', city: '北京', name: '王五' },
    ];
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={{ pageSize: 2 }}
        dataSource={data}
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
      expect(rows.length).toBe(2);
      // 第 2 页首个上海是上一页合并组的延续,但必须独立完整渲染:
      // 城市单元格不能被隐藏(rowspan=0),否则该列出现空白
      const row1Cells = rows[0].querySelectorAll('td');
      expect(row1Cells.length).toBe(2);
      expect(row1Cells[0].textContent).toBe('上海');
      expect(row1Cells[0].getAttribute('rowspan')).not.toBe('0');
      // 北京同样正常渲染
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells.length).toBe(2);
      expect(row2Cells[0].textContent).toBe('北京');
    });
  });

  it('开启合并且未显式传 bordered 时保持 antd 默认无边框,合并不改变边框行为', async () => {
    const baseProps = {
      rowKey: 'key' as const,
      search: false as const,
      options: false as const,
      pagination: false as const,
      dataSource: baseData,
      columns: [
        { title: '城市', dataIndex: 'city', autoMerge: true },
        { title: '姓名', dataIndex: 'name' },
      ] as ProColumns<Row>[],
    };

    // 未传 bordered:bordered 是 antd 的核心视觉属性,与合并逻辑正交,
    // 开启合并不应悄悄反转 antd 默认值
    const { container, unmount } = render(<ProTable<Row> {...baseProps} />);
    await waitFor(() => {
      expect(getBodyRows(container).length).toBe(3);
    });
    expect(container.querySelector('.ant-table-bordered')).toBeFalsy();
    unmount();

    // 显式 bordered={true}:正常透传生效
    const { container: container2 } = render(
      <ProTable<Row> {...baseProps} bordered={true} />,
    );
    await waitFor(() => {
      expect(container2.querySelector('.ant-table-bordered')).toBeTruthy();
    });
  });

  it('未开启合并时 bordered 保持 antd 默认行为(不默认开启)', async () => {
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        dataSource={baseData}
        columns={[
          { title: '城市', dataIndex: 'city' },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );
    await waitFor(() => {
      expect(getBodyRows(container).length).toBe(3);
    });
    expect(container.querySelector('.ant-table-bordered')).toBeFalsy();
  });

  it('手动服务端分页(无 request,dataSource 为当前页)时不重复切片,同值正常合并', async () => {
    // 用户自行分页:不传 request,dataSource 只含当前页数据,pagination 带 total。
    // antd 对 dataSource.length < total 且 <= pageSize 的数据视为当前页直接渲染,
    // 合并计算必须保持相同语义,不能再按页码切片(否则切空、合并丢失)
    const pageData: Row[] = [
      { key: '3', city: '上海', name: '赵六' },
      { key: '4', city: '上海', name: '王五' },
    ];
    const { container } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={{ current: 2, pageSize: 2, total: 4 }}
        dataSource={pageData}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(2);
      // 当前页两条上海应合并:首行 rowspan=2,第二行城市单元格隐藏
      const row1Cells = rows[0].querySelectorAll('td');
      expect(row1Cells[0].textContent).toBe('上海');
      expect(row1Cells[0].getAttribute('rowspan')).toBe('2');
      const row2Cells = rows[1].querySelectorAll('td');
      expect(row2Cells.length).toBe(1);
      expect(row2Cells[0].textContent).toBe('王五');
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
      expect(rows[0].querySelector('td')!.getAttribute('rowspan')).not.toBe(
        '2',
      );
    });
  });

  it('本地排序激活时数据刷新:顺序无法保证则跳过该页合并,不错误隐藏单元格', async () => {
    const nameSorter = (a: Row, b: Row) => (a.name < b.name ? -1 : 1);
    const columns: ProColumns<Row>[] = [
      { title: '城市', dataIndex: 'city', autoMerge: true },
      { title: '姓名', dataIndex: 'name', sorter: nameSorter },
    ];
    const data1: Row[] = [
      { key: '1', city: '上海', name: 'a1' },
      { key: '2', city: '北京', name: 'a2' },
      { key: '3', city: '上海', name: 'a3' },
    ];
    const { container, rerender } = render(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        dataSource={data1}
        columns={columns}
      />,
    );

    // 激活本地排序(升序)
    await userEvent.click(
      container.querySelector('.ant-table-column-sorter-up')!,
    );
    await waitFor(() => {
      expect(getBodyRows(container).length).toBe(3);
    });

    // 数据刷新:新数据原始顺序 [上海a, 上海z, 北京m](上海相邻),
    // 但排序后显示顺序为 [上海a, 北京m, 上海z](上海不相邻)。
    // 若按已过期的原始顺序计算,row1 上海 rowspan=2 会盖住 row2 的北京单元格
    const data2: Row[] = [
      { key: '4', city: '上海', name: 'a' },
      { key: '5', city: '上海', name: 'z' },
      { key: '6', city: '北京', name: 'm' },
    ];
    rerender(
      <ProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        dataSource={data2}
        columns={columns}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      // 排序仍生效:第二行应是北京
      expect(rows[1].querySelector('td')!.textContent).toBe('北京');
      // 顺序无法保证 → 跳过本页合并:所有单元格完整渲染,无跨行
      rows.forEach((row) => {
        expect(row.querySelectorAll('td').length).toBe(2);
      });
      expect(container.querySelector('[rowspan="2"]')).toBeNull();
    });
  });

  it('request 服务端翻页后按新页数据计算合并', async () => {
    const page1: Row[] = [
      { key: '1', city: '北京', name: '张三' },
      { key: '2', city: '北京', name: '李四' },
    ];
    const page2: Row[] = [
      { key: '3', city: '上海', name: '王五' },
      { key: '4', city: '上海', name: '赵六' },
    ];
    const { container } = render(
      <ProTable<Row, { current?: number }>
        rowKey="key"
        search={false}
        options={false}
        pagination={{ pageSize: 2 }}
        request={async (params) => ({
          data: params.current === 2 ? page2 : page1,
          success: true,
          total: 4,
        })}
        columns={[
          { title: '城市', dataIndex: 'city', autoMerge: true },
          { title: '姓名', dataIndex: 'name' },
        ]}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(2);
      expect(rows[0].querySelector('td')!.textContent).toBe('北京');
      expect(rows[0].querySelector('td')!.getAttribute('rowspan')).toBe('2');
    });

    await userEvent.click(container.querySelector('.ant-pagination-item-2')!);

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(2);
      // 第二页两个上海正常合并,不残留第一页的合并信息
      expect(rows[0].querySelector('td')!.textContent).toBe('上海');
      expect(rows[0].querySelector('td')!.getAttribute('rowspan')).toBe('2');
      expect(rows[1].querySelectorAll('td').length).toBe(1);
    });
  });

  it('可编辑表格本地排序激活时编辑保存回流数据,跳过该页合并', async () => {
    const nameSorter = (a: Row, b: Row) => (a.name < b.name ? -1 : 1);
    const columns: ProColumns<Row>[] = [
      { title: '城市', dataIndex: 'city', autoMerge: true },
      { title: '姓名', dataIndex: 'name', sorter: nameSorter },
    ];
    // 故意让初始顺序与排序后不同,确保排序激活可观察
    const data1: Row[] = [
      { key: '1', city: '北京', name: 'a2' },
      { key: '2', city: '上海', name: 'a1' },
    ];
    const { container, rerender } = render(
      <EditableProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        recordCreatorProps={false}
        value={data1}
        editable={{ editableKeys: ['2'], type: 'multiple' }}
        columns={columns}
      />,
    );

    // 激活本地排序(升序):显示顺序变为 [上海a1, 北京a2]
    await userEvent.click(
      container.querySelector('.ant-table-column-sorter-up')!,
    );
    await waitFor(() => {
      expect(
        container.querySelector('.ant-table-column-sorter-up'),
      ).toHaveClass('active');
    });

    // 编辑保存后回流新数据:原始顺序 [上海a, 上海z, 北京m](上海相邻),
    // 排序激活下显示顺序为 [上海a, 北京m, 上海z](上海不相邻)。
    // 若按已过期的原始顺序计算,row1 上海 rowspan=2 会盖住 row2 的北京单元格
    const data2: Row[] = [
      { key: '1', city: '上海', name: 'a' },
      { key: '2', city: '上海', name: 'z' },
      { key: '3', city: '北京', name: 'm' },
    ];
    rerender(
      <EditableProTable<Row>
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        recordCreatorProps={false}
        value={data2}
        editable={{ editableKeys: [], type: 'multiple' }}
        columns={columns}
      />,
    );

    await waitFor(() => {
      const rows = getBodyRows(container);
      expect(rows.length).toBe(3);
      // 跳过合并:不出现跨行单元格,排序后的北京行完整渲染
      expect(container.querySelector('[rowspan="2"]')).toBeNull();
      const cityCells = Array.from(rows).map(
        (row) => row.querySelector('td')!.textContent,
      );
      expect(cityCells).toContain('北京');
    });
  });
});

