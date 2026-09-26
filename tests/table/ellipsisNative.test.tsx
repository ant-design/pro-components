import { ProTable } from '@ant-design/pro-components';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9664: 纯 ellipsis: true 走 antd Table 原生 CSS 省略，
 * 配置 tooltip / showTitle / copyable 时仍用 Typography.Text 渲染。
 */
describe('ProTable ellipsis rendering paths (#9664)', () => {
  const longText = '我是超长的内容'.repeat(6);
  const dataSource = [{ key: 1, name: longText, addr: longText }];

  it('📦 ellipsis: true 渲染原生 antd 省略（无 Typography 包裹）', async () => {
    const { container } = render(
      <ProTable
        search={false}
        toolBarRender={false}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name', ellipsis: true },
        ]}
        dataSource={dataSource}
        rowKey="key"
      />,
    );
    await waitFor(() => {
      expect(container.querySelector('tbody td')).toBeTruthy();
    });

    // 单元格带 antd 原生省略类
    expect(
      container.querySelector('td.ant-table-cell-ellipsis'),
    ).toBeTruthy();
    // 不再包 Typography
    expect(container.querySelector('.ant-typography')).toBeFalsy();
  });

  it('📦 ellipsis: { showTitle: true } 保持 Typography 渲染', async () => {
    const { container } = render(
      <ProTable
        search={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: { showTitle: true },
          },
        ]}
        dataSource={dataSource}
        rowKey="key"
      />,
    );
    await waitFor(() => {
      expect(container.querySelector('tbody td')).toBeTruthy();
    });

    // Typography 渲染路径保留
    expect(
      container.querySelector('.ant-typography.ant-typography-ellipsis'),
    ).toBeTruthy();
  });

  it('📦 ellipsis + copyable 组合保持 Typography 渲染（复制图标）', async () => {
    const { container } = render(
      <ProTable
        search={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            copyable: true,
          },
        ]}
        dataSource={dataSource}
        rowKey="key"
      />,
    );
    await waitFor(() => {
      expect(container.querySelector('tbody td')).toBeTruthy();
    });

    // copyable 优先走 Typography（含复制按钮）
    expect(container.querySelector('.ant-typography')).toBeTruthy();
    expect(container.querySelector('.ant-typography-copy')).toBeTruthy();
  });

  it('📦 多列混排：原生省略与 Typography 省略并存', async () => {
    const { container } = render(
      <ProTable
        search={false}
        toolBarRender={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
          },
          {
            title: 'Addr',
            dataIndex: 'addr',
            key: 'addr',
            ellipsis: { showTitle: true },
          },
        ]}
        dataSource={dataSource}
        rowKey="key"
      />,
    );
    await waitForWaitTime(200);

    const tds = container.querySelectorAll('tbody td');
    expect(tds.length).toBe(2);
    // 第一列：原生省略
    expect(tds[0].classList.contains('ant-table-cell-ellipsis')).toBe(true);
    // 第二列：Typography 省略
    expect(
      tds[1].querySelector('.ant-typography-ellipsis'),
    ).toBeTruthy();
  });

  it('📦 性能：纯 ellipsis:true 的大数据量表格不渲染 Typography（#8868 场景）', async () => {
    const rows = Array.from({ length: 200 }, (_, i) => ({
      key: i,
      name: `row-${i}-${longText}`,
    }));

    const { container, unmount } = render(
      <ProTable
        search={false}
        toolBarRender={false}
        pagination={false}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name', ellipsis: true },
        ]}
        dataSource={rows}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(container.querySelectorAll('tbody tr').length).toBe(200);
    });

    // 200 行全部走原生省略，整个表格 0 个 Typography 实例
    expect(container.querySelectorAll('.ant-typography').length).toBe(0);
    unmount();
  });
});
