import { DragSortTable } from '@ant-design/pro-components';
import { fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

const makeData = (n: number) =>
  Array.from({ length: n }, (_, i) => ({ id: i, name: `row-${i}` }));

/**
 * #8342 回归: DragSortTable 设置 scroll.y 后重新取数,表头不应闪烁。
 * 根因: DndContext 包装组件身份随 dataSource 变化而改变(函数组件引用不稳),
 * React 卸载重挂整棵子树(含整个表格),scroll.y 固定表头重建即闪烁。
 * 修复: 包装组件改为稳定引用(useRefFunction),onDragEnd 经 ref 读取最新值。
 */
describe('#8342 DragSortTable scroll.y header flicker', () => {
  it('keeps table body mounted (stable component refs) across data reload', async () => {
    const Demo = () => {
      const [data, setData] = useState(makeData(50));
      return (
        <>
          <button data-testid="reload" onClick={() => setData(makeData(50))}>
            reload
          </button>
          <DragSortTable
            rowKey="id"
            dragSortKey="sort"
            columns={[{ dataIndex: 'name', title: 'Name', key: 'sort' }]}
            dataSource={data}
            scroll={{ y: 200 }}
            search={false}
            toolBarRender={false}
            pagination={false}
          />
        </>
      );
    };
    const wrapper = render(<Demo />);
    await waitForWaitTime(300);

    const headerBefore = wrapper.container.querySelector('.ant-table-thead');
    const bodyBefore = wrapper.container.querySelector('.ant-table-tbody');
    expect(headerBefore).toBeTruthy();
    expect(bodyBefore).toBeTruthy();

    // 重新取数
    wrapper.getByTestId('reload').click();
    await waitForWaitTime(300);

    const headerAfter = wrapper.container.querySelector('.ant-table-thead');
    const bodyAfter = wrapper.container.querySelector('.ant-table-tbody');

    // 头/体应是同一个 DOM 节点(未重挂载) —— 重挂载会导致闪烁
    expect(headerAfter).toBe(headerBefore);
    expect(bodyAfter).toBe(bodyBefore);
  });

  it('#8404 keeps both scroll axes when row selection changes', async () => {
    const Demo = () => {
      const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
      return (
        <DragSortTable
          rowKey="id"
          dragSortKey="sort"
          columns={Array.from({ length: 10 }, (_, index) => ({
            dataIndex: index === 0 ? 'name' : `field-${index}`,
            title: `Column ${index}`,
            key: index === 0 ? 'sort' : `field-${index}`,
            width: 160,
          }))}
          dataSource={makeData(20)}
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          scroll={{ x: 1600, y: 200 }}
          search={false}
          toolBarRender={false}
          pagination={false}
        />
      );
    };
    const wrapper = render(<Demo />);
    await waitForWaitTime(300);

    const body = wrapper.container.querySelector(
      '.ant-table-body',
    ) as HTMLElement;
    expect(body).toBeTruthy();
    body.scrollLeft = 180;
    body.scrollTop = 40;

    const checkbox = wrapper.container.querySelector(
      '.ant-table-tbody .ant-checkbox-input',
    ) as HTMLInputElement;
    fireEvent.click(checkbox);
    await waitForWaitTime(200);

    expect(wrapper.container.querySelector('.ant-table-body')).toBe(body);
    expect(body.scrollLeft).toBe(180);
    expect(body.scrollTop).toBe(40);
  });
});
