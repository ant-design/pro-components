import { DragSortTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

const makeData = (n: number) =>
  Array.from({ length: n }, (_, i) => ({ id: i, name: `row-${i}` }));

/**
 * #8342/#8404 回归: DragSortTable 内部 components/DndContext 引用稳定性。
 * - 无 dragSortKey 时不应注入新 components 对象(避免 antd Table 重挂载)
 * - 有 dragSortKey 时 components 对象在 dataSource 变化时引用保持不变
 */
describe('DragSortTable internal reference stability', () => {
  const setup = (props: Record<string, any>) => {
    const Demo = () => {
      const [data, setData] = useState(makeData(50));
      return (
        <>
          <button data-testid="reload" onClick={() => setData(makeData(50))} />
          <DragSortTable
            rowKey="id"
            columns={[{ dataIndex: 'name', title: 'Name', key: 'sort' }]}
            dataSource={data}
            scroll={{ y: 200 }}
            search={false}
            toolBarRender={false}
            pagination={false}
            {...props}
          />
        </>
      );
    };
    return render(<Demo />);
  };

  it('without dragSortKey the table keeps mounted across reload', async () => {
    const wrapper = setup({});
    await waitForWaitTime(200);
    const h1 = wrapper.container.querySelector('.ant-table-thead');
    wrapper.getByTestId('reload').click();
    await waitForWaitTime(200);
    const h2 = wrapper.container.querySelector('.ant-table-thead');
    expect(h2 === h1).toBe(true);
  });

  it('with dragSortKey the table keeps mounted across reload', async () => {
    const wrapper = setup({ dragSortKey: 'sort' });
    await waitForWaitTime(200);
    const h1 = wrapper.container.querySelector('.ant-table-thead');
    wrapper.getByTestId('reload').click();
    await waitForWaitTime(200);
    const h2 = wrapper.container.querySelector('.ant-table-thead');
    expect(h2 === h1).toBe(true);
  });

  it('with dragSortKey but no scroll the table keeps mounted', async () => {
    const wrapper = setup({ dragSortKey: 'sort', scroll: undefined });
    await waitForWaitTime(200);
    const h1 = wrapper.container.querySelector('.ant-table-thead');
    wrapper.getByTestId('reload').click();
    await waitForWaitTime(200);
    const h2 = wrapper.container.querySelector('.ant-table-thead');
    expect(h2 === h1).toBe(true);
  });
});
