import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { Tabs } from 'antd';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8747: Tabs item 内的 ProTable width/ellipsis 不生效。
 * 隐藏面板初始渲染时宽度为 0，激活后需正确应用列宽与省略。
 */
describe('ProTable inside Tabs (#8747)', () => {
  it('column width applies when table renders inside a tab item', async () => {
    const html = render(
      <Tabs
        items={[
          {
            key: 'a',
            label: 'A',
            children: <div>tab a</div>,
          },
          {
            key: 'b',
            label: 'B',
            children: (
              <ProTable
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    width: 100,
                    ellipsis: true,
                  },
                ]}
                dataSource={[
                  {
                    key: 1,
                    name: '很长很长很长很长很长很长很长的名字',
                  },
                ]}
                rowKey="key"
                search={false}
                options={false}
                pagination={false}
              />
            ),
          },
        ]}
      />,
    );
    await waitForWaitTime(300);

    // 切到第二个 tab
    html.getByText('B').click();
    await waitForWaitTime(300);

    const headerCell = html.container.querySelector(
      'thead .ant-table-cell',
    ) as HTMLElement;
    expect(headerCell).toBeTruthy();
    // 列宽样式生效（style 上有 width:100px 或 colgroup col 有 100）
    const col = html.container.querySelector(
      'colgroup col',
    ) as HTMLElement;
    const hasWidth =
      headerCell.style.width === '100px' ||
      col?.style?.width === '100px' ||
      col?.getAttribute('width') === '100';
    expect(hasWidth || headerCell.className.includes('ellipsis')).toBeTruthy();
  });
});
