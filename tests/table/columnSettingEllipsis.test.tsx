import { ProTable } from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9121: 关闭列设置再重新打开后，ellipsis 列的省略号和 Tooltip 失效。
 * 锁定行为：列设置中的任何操作（勾选/取消/重置/重新打开）后，
 * 表格内 ellipsis 渲染保持不变。
 */
describe('ProTable columnSetting ellipsis (#9121)', () => {
  it('ellipsis rendering survives column setting reopen', async () => {
    const html = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            ellipsis: true,
          },
        ]}
        dataSource={[
          { key: 1, name: '我是超长的名称我是超长的名称我是超长的名称' },
        ]}
        rowKey="key"
      />,
    );
    await waitForWaitTime(200);

    // 只统计表格主体内的省略元素
    const countEllipsis = () =>
      html.baseElement.querySelectorAll(
        '.ant-table-cell .ant-typography-ellipsis',
      ).length;
    expect(countEllipsis()).toBe(1);

    const toggleSetting = () =>
      act(() => {
        html.baseElement
          .querySelector<HTMLElement>(
            '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
          )
          ?.click();
      });

    // 打开列设置
    toggleSetting();
    await waitForWaitTime(300);
    expect(countEllipsis()).toBe(1);

    // 关闭列设置
    toggleSetting();
    await waitForWaitTime(300);
    expect(countEllipsis()).toBe(1);

    // 再次打开（#9121：重新打开后省略号失效）
    toggleSetting();
    await waitForWaitTime(300);
    expect(countEllipsis()).toBe(1);
  });

  it('ellipsis rendering survives toggling column visibility and reset', async () => {
    const html = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            ellipsis: true,
          },
          { title: 'Age', key: 'age', dataIndex: 'age' },
        ]}
        dataSource={[
          {
            key: 1,
            name: '我是超长的名称我是超长的名称我是超长的名称',
            age: 18,
          },
        ]}
        rowKey="key"
      />,
    );
    await waitForWaitTime(200);

    const countEllipsis = () =>
      html.baseElement.querySelectorAll(
        '.ant-table-cell .ant-typography-ellipsis',
      ).length;
    expect(countEllipsis()).toBe(1);

    // 打开列设置
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(300);

    // 取消勾选 Name 列
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-column-setting-list .ant-tree-checkbox',
        )
        ?.click();
    });
    await waitForWaitTime(300);
    expect(countEllipsis()).toBe(0);

    // 重新勾选 Name 列
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-column-setting-list .ant-tree-checkbox',
        )
        ?.click();
    });
    await waitForWaitTime(300);
    expect(countEllipsis()).toBe(1);

    // 点击重置按钮
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-column-setting-action-rest-button',
        )
        ?.click();
    });
    await waitForWaitTime(300);
    expect(countEllipsis()).toBe(1);
  });
});
