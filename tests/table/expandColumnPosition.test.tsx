import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { Table } from 'antd';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8913: Table.EXPAND_COLUMN 位置不正确。
 * 用户把 EXPAND_COLUMN 放在任意列位置，展开列应出现在该位置。
 */
describe('ProTable EXPAND_COLUMN position (#8913)', () => {
  it('expand icon column renders at user-specified position', async () => {
    const html = render(
      <ProTable
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          Table.EXPAND_COLUMN,
          { title: 'Age', dataIndex: 'age', key: 'age' },
        ]}
        dataSource={[{ key: 1, name: '张三', age: 18 }]}
        rowKey="key"
        expandable={{ expandedRowRender: () => <div>expanded</div> }}
        search={false}
        options={false}
      />,
    );
    await waitForWaitTime(300);

    const headerCells = html.container.querySelectorAll(
      'thead .ant-table-cell',
    );
    const titles = Array.from(headerCells).map((c) => c.textContent);
    console.log('header cells:', JSON.stringify(titles));
    // 展开列（无标题）应出现在 Name 与 Age 之间（第二列）
    expect(titles[0]).toContain('Name');
    expect(titles[2]).toContain('Age');
  });
});
