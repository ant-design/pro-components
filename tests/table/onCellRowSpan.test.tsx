import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8701: 文档未列出 onCell 且缺少合并单元格示例。
 * 锁定行为：onCell 返回 rowSpan 可合并单元格（rowSpan=0 时单元格不渲染）。
 */
describe('ProTable onCell colspan/rowspan (#8701)', () => {
  it('merges cells via onCell rowSpan', async () => {
    const html = render(
      <ProTable
        columns={[
          { title: 'Name', dataIndex: 'name' },
          {
            title: 'Age',
            dataIndex: 'age',
            onCell: (_, index = 0) => {
              if (index === 0) return { rowSpan: 2 };
              if (index === 1) return { rowSpan: 0 };
              return {};
            },
          },
        ]}
        dataSource={[
          { key: 1, name: 'A', age: 10 },
          { key: 2, name: 'B', age: 10 },
          { key: 3, name: 'C', age: 20 },
        ]}
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
      />,
    );
    await waitForWaitTime(300);

    const bodyRows = html.container.querySelectorAll('tbody tr');
    expect(bodyRows.length).toEqual(3);

    // 第一行 Age 单元格带 rowSpan=2，第二行 Age 单元格不渲染（只剩 Name）
    const firstAgeCell = bodyRows[0].querySelectorAll('td')[1] as HTMLElement;
    expect(firstAgeCell.getAttribute('rowspan')).toEqual('2');

    const secondRowCells = bodyRows[1].querySelectorAll('td');
    expect(secondRowCells.length).toEqual(1);
  });
});
