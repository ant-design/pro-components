import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8694: valueEnum + ellipsis 同用时显示异常。
 * 锁定行为：单元格展示 valueEnum 转换后的文本（Badge/文本），
 * 省略时 tooltip 显示同样转换后的文本而非原始值。
 */
describe('ProTable valueEnum + ellipsis (#8694)', () => {
  it('cell text uses valueEnum label, not raw value', async () => {
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            ellipsis: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
            },
          },
        ]}
        dataSource={[
          { id: 1, status: 0 },
          { id: 2, status: 1 },
        ]}
        rowKey="id"
        search={false}
        options={false}
      />,
    );
    await waitForWaitTime(300);

    const text = html.baseElement.textContent ?? '';
    expect(text).toContain('关闭');
    expect(text).toContain('运行中');
  });
});
