import { BetaSchemaForm } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8850: 官网 Schema 表单 demo 切换布局方式（Form -> LightFilter）报错。
 * 锁定行为：BetaSchemaForm 切换 layoutType 不崩溃。
 */
describe('BetaSchemaForm layout switch (#8850)', () => {
  it('switching layoutType from Form to LightFilter does not crash', async () => {
    const columns = [
      { title: '标题', dataIndex: 'title', valueType: 'text' },
      {
        title: '状态',
        dataIndex: 'state',
        valueType: 'select',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          open: { text: '未解决', status: 'Error' },
        },
        initialValue: 'all',
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        valueType: 'dateRange',
      },
    ];

    // 先以 Form 渲染
    const html = render(
      <BetaSchemaForm layoutType="Form" columns={columns} />,
    );
    await waitForWaitTime(200);

    // 切换为 LightFilter（不重新挂载，模拟 demo 中的受控切换）
    html.rerender(
      <BetaSchemaForm layoutType="LightFilter" columns={columns} />,
    );
    await waitForWaitTime(200);

    // 再切回 Form
    html.rerender(<BetaSchemaForm layoutType="Form" columns={columns} />);
    await waitForWaitTime(200);

    expect(html.container.innerHTML.length).toBeGreaterThan(0);
  });
});
