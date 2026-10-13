import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

const dataSource = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  name: `name-${i}-${'x'.repeat(50)}`,
}));

/**
 * #8868 回归: 纯 ellipsis: true(无 tooltip 定制、无 copyable)时,
 * 表格单元格走 antd Table 原生 CSS 省略,不再为每个单元格包 Typography.Text,
 * 大数据量下渲染开销与 antd Table 对齐。
 */
describe('#8868 native ellipsis fast path', () => {
  it('ellipsis:true cells do not wrap Typography.Text', async () => {
    const wrapper = render(
      <ProTable
        columns={[
          { dataIndex: 'name', title: '名称', ellipsis: true },
          {
            dataIndex: 'name2',
            title: '带tooltip省略',
            ellipsis: { showTitle: true },
            render: (_d, record) => record.name,
          },
        ]}
        dataSource={dataSource}
        pagination={false}
        search={false}
        toolBarRender={false}
        rowKey="id"
      />,
    );
    await waitForWaitTime(300);

    const cells = wrapper.container.querySelectorAll('td');
    expect(cells.length).toBe(60);

    // 纯 ellipsis:true 列:不应渲染 Typography(ant-typography)包装
    const typographyNodes =
      wrapper.container.querySelectorAll('.ant-typography');
    // 仅第二个列(ellipsis 对象,需要 tooltip)可以包 Typography;第一列必须 0 个
    // 统计:第一列 30 个单元格都不含 ant-typography
    let firstColumnTypography = 0;
    cells.forEach((cell, idx) => {
      if (idx % 2 === 0 && cell.querySelector('.ant-typography')) {
        firstColumnTypography += 1;
      }
    });
    expect(firstColumnTypography).toBe(0);

    // 原生省略由 antd 透传 ellipsis 到列上(单元格带 ant-table-cell-ellipsis 类)
    const nativeEllipsisCells =
      wrapper.container.querySelectorAll('td.ant-table-cell-ellipsis');
    expect(nativeEllipsisCells.length).toBeGreaterThanOrEqual(30);
  });
});
