import { ProTable } from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9620: 列设置面板的列标题默认固定 80px 单行省略，
 * 用户希望能按内容自适应单行展示。
 * 锁定行为：`options.setting.listItemTitleRender` 可自定义标题渲染节点。
 */
describe('ProTable columnSetting listItemTitleRender (#9620)', () => {
  const openSetting = async (container: HTMLElement) => {
    act(() => {
      container
        .querySelector<HTMLElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(300);
  };

  it('renders custom title node via listItemTitleRender', async () => {
    const html = render(
      <ProTable
        columns={[
          { title: 'Name', key: 'name', dataIndex: 'name' },
          { title: 'Age', key: 'age', dataIndex: 'age' },
        ]}
        dataSource={[{ key: 1, name: '张三', age: 18 }]}
        rowKey="key"
        options={{
          setting: {
            listItemTitleRender: (title, column) => (
              <span
                data-data-index={String(column.dataIndex)}
                data-testid={`custom-title-${String(column.key)}`}
              >
                {title}
              </span>
            ),
          },
        }}
      />,
    );
    await waitForWaitTime(200);
    await openSetting(html.baseElement);

    const customTitle = html.baseElement.querySelector(
      '[data-testid="custom-title-name"]',
    );
    expect(customTitle).toBeTruthy();
    expect(customTitle?.textContent).toContain('Name');
    expect(customTitle?.getAttribute('data-data-index')).toBe('name');
    // 默认 Typography 省略包装被替换
    const defaultEllipsis =
      html.baseElement.querySelectorAll('.ant-typography-single-ellipsis');
    expect(defaultEllipsis.length).toEqual(0);
  });

  it('keeps default ellipsis behavior without listItemTitleRender', async () => {
    const html = render(
      <ProTable
        columns={[
          { title: 'Name', key: 'name', dataIndex: 'name' },
          { title: 'Age', key: 'age', dataIndex: 'age' },
        ]}
        dataSource={[{ key: 1, name: '张三', age: 18 }]}
        rowKey="key"
        options={{ setting: true }}
      />,
    );
    await waitForWaitTime(200);
    await openSetting(html.baseElement);

    // 默认渲染仍是 Typography 省略节点
    const defaultEllipsis =
      html.baseElement.querySelectorAll('.ant-typography');
    expect(defaultEllipsis.length).toBeGreaterThan(0);
  });
});
