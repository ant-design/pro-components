import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React, { memo, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

const dataSource = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  name: `row-${i}`,
}));

let cellRenderCount = 0;

const columns = [
  { dataIndex: 'id', title: 'ID' },
  {
    dataIndex: 'spy',
    title: 'spy',
    render: (_dom: any, record: any) => {
      cellRenderCount += 1;
      return record.name;
    },
  },
];

/**
 * #8054/#9150 回归: keepalive 路由切换(外层重渲染)时,
 * ProTable 内部传给 ProConfigProvider 的 valueTypeMap 引用必须稳定,
 * 否则 context 重建导致表格整树级联重渲染。
 * 修复: ProTable 内部对 valueTypeMap 做 useMemo(仅 context.valueTypeMap 变化时重建)。
 */
describe('#8054 stable valueTypeMap on provider rerender', () => {
  it('memoized ProTable cells do not re-render when parent re-renders', async () => {
    cellRenderCount = 0;
    const IsolatedTable = memo(() => (
      <ProTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        search={false}
        toolBarRender={false}
        rowKey="id"
      />
    ));
    IsolatedTable.displayName = 'IsolatedTable';

    const Wrapper = () => {
      const [, setTick] = useState(0);
      return (
        <div>
          <IsolatedTable />
          <button data-testid="btn" onClick={() => setTick((t) => t + 1)} />
        </div>
      );
    };

    const wrapper = render(<Wrapper />);
    await waitForWaitTime(300);
    expect(cellRenderCount).toBe(5);

    // 模拟 keepalive 路由切换引起的外层状态更新
    wrapper.getByTestId('btn').click();
    await waitForWaitTime(200);
    // props 未变化的 memo 子树不应重新渲染单元格
    expect(cellRenderCount).toBe(5);
  });
});
